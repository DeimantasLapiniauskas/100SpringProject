package SpringProject._Spring.productControllerTest;

import SpringProject._Spring.controller.ProductController;
import SpringProject._Spring.dto.product.ProductRequestDTO;
import SpringProject._Spring.dto.product.category.CategoryDTO;
import SpringProject._Spring.exceptions.NameAlreadyExistsException;
import SpringProject._Spring.model.product.Category;
import SpringProject._Spring.model.product.Product;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.hamcrest.Matchers.either;
import static org.hamcrest.Matchers.equalTo;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@WebMvcTest(controllers = ProductController.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc
@WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
public class ProductPostTest {

    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private ProductService productService;
    @Autowired
    private ObjectMapper objectMapper;

    //happy path
    @Test
    void addProduct_whenValid_thenReturnAnd201() throws Exception {
        //given
        ProductRequestDTO productRequestDTO = new ProductRequestDTO("Name", "Description", BigDecimal.valueOf(10.0), 10, List.of(new CategoryDTO("Test")), "url");

        Product product = new Product("Name", "Description", BigDecimal.valueOf(10.0), 10, List.of(new Category("TestCategory")), "url");
        product.setId(1L);

        when(productService.addNewProduct(productRequestDTO)).thenReturn(product);

        //when
        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productRequestDTO)))
                //given
                .andExpect(status().isCreated())
                .andExpectAll(
                        jsonPath("name").value("Name"),
                        jsonPath("description").value("Description"),
                        jsonPath("price").value("10.0"),
                        jsonPath("stockQuantity").value(10)
                );

        Mockito.verify(productService, times(1)).addNewProduct(productRequestDTO);
    }

    //unhappy path
    @Test
    void addProduct_whenNameAlreadyExists_thenReturnAnd400() throws Exception {
        //given
        ProductRequestDTO productRequestDTO = new ProductRequestDTO("Name", "Description", BigDecimal.valueOf(10.0), 10, List.of(new CategoryDTO("Test")), "url");

        when(productService.addNewProduct(productRequestDTO)).thenThrow(new NameAlreadyExistsException("Product", productRequestDTO.name()));
        //when
        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productRequestDTO)))
                //given
                .andExpect(status().isBadRequest())
                .andExpectAll(
                        jsonPath("data").isEmpty(),
                        jsonPath("message").value("Product: Name 'Name' already exists"),
                        jsonPath("success").value(false)
                );

        Mockito.verify(productService, times(1)).addNewProduct(productRequestDTO);
    }

    //unhappy path
    @Test
    void addProduct_whenInvalidRequest_thenReturnAnd400() throws Exception {
        //given
        ProductRequestDTO productRequestDTO = new ProductRequestDTO("Nameупвып", "", BigDecimal.valueOf(-1.0), -1, List.of(new CategoryDTO("Test")), "url");

        //when
        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productRequestDTO)))
                //given
                .andExpect(status().isBadRequest())
                .andExpectAll(
                        jsonPath("message").exists(),
                        jsonPath("success").value(false),
                        jsonPath("data.name").value("Name can only contain letters, numbers, punctuation, quotes, and symbols (!@#$%^&*())"),
                        jsonPath("data.description").value(
                                either(equalTo("Description can't be empty!"))
                                        .or(equalTo("Description can only contain letters, numbers, punctuation, quotes, and symbols (!@#$%^&*())"))
                        ),
                        jsonPath("data.price").value("Price must be zero or positive!"),
                        jsonPath("data.stockQuantity").value("Stock quantity must be zero or greater!")
                );

        Mockito.verify(productService, times(0)).addNewProduct(productRequestDTO);
    }

    //unhappy path
    @Test
    @WithAnonymousUser
    void addProduct_whenUnauthorized_thenReturnAnd401() throws Exception {
        //given
        ProductRequestDTO productRequestDTO = new ProductRequestDTO("Name", "Description", BigDecimal.valueOf(10.0), 10, List.of(new CategoryDTO("Test")), "url");
        //when
        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productRequestDTO)))
                //then
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());

        Mockito.verify(productService, times(0)).addNewProduct(productRequestDTO);
    }

    //unhappy path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void addProducts_whenClient_thenReturnAnd403() throws Exception {
        //given
        ProductRequestDTO productRequestDTO = new ProductRequestDTO("Name", "Description", BigDecimal.valueOf(10.0), 10, List.of(new CategoryDTO("Test")), "url");
        //when
        mockMvc.perform(post("/api/products")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productRequestDTO)))
                //then
                .andExpect(status().isForbidden())
                .andExpectAll(
                        jsonPath("data").isEmpty(),
                        jsonPath("message").value("Access Denied"),
                        jsonPath("success").value(false)
                );

        Mockito.verify(productService, times(0)).addNewProduct(productRequestDTO);
    }
}
