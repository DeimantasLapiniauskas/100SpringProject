package SpringProject._Spring.productControllerTest;

import SpringProject._Spring.MailSenderTestConfig;
import SpringProject._Spring.controller.ProductController;
import SpringProject._Spring.exceptions.NotFoundException;
import SpringProject._Spring.model.Product;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.ProductService;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ProductController.class)
@Import({SecurityConfig.class, MailSenderTestConfig.class})
@AutoConfigureMockMvc
@WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
public class ProductGetByIdTest {

    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private ProductService productService;

    //happy path
    @Test
    void getProductById_whenValid_thenReturnAnd200() throws Exception {
        //given
        Product product = new Product("test", "testDescr", BigDecimal.valueOf(10.0), 12);
        product.setId(1L);

        when(productService.findProductById(1L)).thenReturn(product);
        //when
        mockMvc.perform(get("/api/products/{id}", 1L))
                //given
                .andExpect(status().isOk())
                .andExpectAll(
                        jsonPath("data").exists(),
                        jsonPath("data.name").value("test"),
                        jsonPath("data.description").value("testDescr"),
                        jsonPath("data.price").value("10.0"),
                        jsonPath("data.stockQuantity").value(12),
                        jsonPath("message").isEmpty(),
                        jsonPath("success").value(true)
                );

        Mockito.verify(productService, times(1)).findProductById(1L);
    }

    //unhappy path
    @Test
    void getProductById_whenNoProductFound_thenReturnAnd404() throws Exception {
        //given
        when(productService.findProductById(1L)).thenThrow(new NotFoundException("Product not found!"));
        //when
        mockMvc.perform(get("/api/products/{id}", 1L))
                //then
                .andExpect(status().isNotFound())
                .andExpectAll(
                        jsonPath("data").doesNotExist(),
                        jsonPath("message").value("Product not found!"),
                        jsonPath("success").value(false)
                );

        Mockito.verify(productService, times(1)).findProductById(1L);
    }

    //unhappy path
    @Test
    @WithAnonymousUser
    void getProductById_whenUnauthenticated_thenReturnAnd401() throws Exception {
        //given
        //when
        mockMvc.perform(get("/api/products/{id}", 1L))
                //then
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());

        Mockito.verify(productService, times(0)).findProductById(1L);
    }
}
