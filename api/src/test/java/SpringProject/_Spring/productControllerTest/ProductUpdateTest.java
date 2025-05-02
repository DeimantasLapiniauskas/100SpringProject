package SpringProject._Spring.productControllerTest;

import SpringProject._Spring.MailSenderTestConfig;
import SpringProject._Spring.controller.ProductController;
import SpringProject._Spring.dto.product.ProductRequestDTO;
import SpringProject._Spring.dto.product.category.CategoryDTO;
import SpringProject._Spring.exceptions.NotFoundException;
import SpringProject._Spring.model.product.Category;
import SpringProject._Spring.model.product.Product;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;
import software.amazon.awssdk.services.s3.S3Client;

import java.math.BigDecimal;
import java.util.List;

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ProductController.class)
@Import({SecurityConfig.class, MailSenderTestConfig.class})
@AutoConfigureMockMvc
@WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
public class ProductUpdateTest {

    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private ProductService productService;
    @Autowired
    private ObjectMapper objectMapper;
    @MockitoBean
    private S3Client s3Client;

    //happy path
    @Test
    void updateProduct_whenValid_thenReturnAnd200() throws Exception {
        //given
        ProductRequestDTO productRequestDTO = new ProductRequestDTO("Test", "TestDescr", BigDecimal.valueOf(10.0), 15, List.of(new CategoryDTO("Test")), "url");

        Product product = new Product("Test", "TestDescr", BigDecimal.valueOf(10.0), 15, List.of(new Category("String")), "url");
        product.setId(1L);

        when(productService.updateProduct(1L, productRequestDTO)).thenReturn(product);
        //when
        mockMvc.perform(put("/api/products/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productRequestDTO)))
                //then
                .andExpect(status().isOk())
                .andExpectAll(
                        jsonPath("data.id").value(1),
                        jsonPath("data.name").value("Test"),
                        jsonPath("data.description").value("TestDescr"),
                        jsonPath("data.price").value(10.0),
                        jsonPath("data.stockQuantity").value(15),
                        jsonPath("message").value("Product updated successfully"),
                        jsonPath("success").value(true)
                );

        verify(productService, times(1)).updateProduct(1L, productRequestDTO);
    }

    //unhappy path
    @Test
    void updateProduct_whenInvalidRequest_thenReturnAnd400() throws Exception {
        //given
        ProductRequestDTO productRequestDTO = new ProductRequestDTO("Testвыапып", "TestDescrпфвпы", BigDecimal.valueOf(-1), -10, List.of(new CategoryDTO("Test")), "url");

        //when
        mockMvc.perform(put("/api/products/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productRequestDTO)))
                //then
                .andExpect(status().isBadRequest())
                .andExpectAll(
                        jsonPath("data.name").value("Name can only contain letters, numbers, punctuation, quotes, and symbols (!@#$%^&*()-’:;+®/)"),
                        jsonPath("data.description").value("Description can only contain letters, numbers, punctuation, quotes, and symbols (:;!@#$%^&*()-’:;+®/)"),
                        jsonPath("data.price").value("Price must be zero or positive!"),
                        jsonPath("data.stockQuantity").value("Stock quantity must be zero or greater!"),
                        jsonPath("message").value("Validation failed"),
                        jsonPath("success").value(false)
                );

        verify(productService, times(0)).updateProduct(1L, productRequestDTO);
    }

    //unhappy path
    @Test
    @WithAnonymousUser
    void updateProduct_whenUnauthorized_thenReturnAnd401() throws Exception {
        //given
        //when
        mockMvc.perform(put("/api/products/{id}", 1L))
                //then
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());

        verify(productService, times(0)).updateProduct(eq(1L), any());
    }

    //unhappy path
    @Test
    void updateProduct_whenProductNotFound_thenReturnAnd404() throws Exception {
        //given
        ProductRequestDTO productRequestDTO = new ProductRequestDTO("Test", "TestDescr", BigDecimal.valueOf(10.0), 15, List.of(new CategoryDTO("Test")), "url");

        when(productService.updateProduct(1L, productRequestDTO)).thenThrow(new NotFoundException("Product with id '1' not found"));
        //when
        mockMvc.perform(put("/api/products/{id}", 1L)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(productRequestDTO)))
                //then
                .andExpect(status().isNotFound())
                .andExpectAll(
                        jsonPath("data").doesNotExist(),
                        jsonPath("message").value("Product with id '1' not found"),
                        jsonPath("success").value(false)
                );
    }
}
