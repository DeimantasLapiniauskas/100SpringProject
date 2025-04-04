package SpringProject._Spring.productControllerTest;

import SpringProject._Spring.controller.ProductController;
import SpringProject._Spring.dto.product.ProductRequestDTO;
import SpringProject._Spring.exceptions.NameAlreadyExistsException;
import SpringProject._Spring.model.Product;
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
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

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
        ProductRequestDTO productRequestDTO = new ProductRequestDTO("Name", "Description", BigDecimal.valueOf(10.0), 10);

        Product product = new Product("Name", "Description", BigDecimal.valueOf(10.0), 10);
        product.setId(1L);

        when(productService.addNewProduct(productRequestDTO)).thenReturn(product);

        //when
        mockMvc.perform(post("/api/products/add")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productRequestDTO)))
                //given
                .andExpect(status().isCreated())
                .andExpectAll(
                        jsonPath("id").value("1"),
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
        ProductRequestDTO productRequestDTO = new ProductRequestDTO("Name", "Description", BigDecimal.valueOf(10.0), 10);

        when(productService.addNewProduct(productRequestDTO)).thenThrow(new NameAlreadyExistsException("Product", productRequestDTO.name()));
        //when
        mockMvc.perform(post("/api/products/add")
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
}
