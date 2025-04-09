package SpringProject._Spring.productControllerTest;

import SpringProject._Spring.controller.ProductController;
import SpringProject._Spring.exceptions.NotFoundException;
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

import static org.mockito.Mockito.*;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.delete;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;


@WebMvcTest(controllers = ProductController.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc
@WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
public class ProductDeleteTest {

    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private ProductService productService;

    //happy path
    @Test
    void deleteProduct_whenValid_thenReturnAnd204() throws Exception {
        //given
        doNothing().when(productService).deleteProduct(1L);
        //when
        mockMvc.perform(delete("/api/products/{id}", 1L))
                //then
                .andExpect(status().isNoContent())
                .andExpectAll(
                        jsonPath("data").doesNotExist(),
                        jsonPath("message").isEmpty(),
                        jsonPath("success").value(true)
                );

        Mockito.verify(productService, times(1)).deleteProduct(1L);
    }

    //unhappy path
    @Test
    void deleteProduct_whenNoProductFound_thenReturnAnd404() throws Exception {
        //given
        doThrow(new NotFoundException("Product with id '1' not found")).when(productService).deleteProduct(1L);
        //when
        mockMvc.perform(delete("/api/products/{id}", 1L))
                //then
                .andExpect(status().isNotFound())
                .andExpectAll(
                        jsonPath("data").doesNotExist(),
                        jsonPath("message").value("Product with id '1' not found"),
                        jsonPath("success").value(false)
                );

        Mockito.verify(productService, times(1)).deleteProduct(1L);
    }

    //unhappy path
    @Test
    @WithAnonymousUser
    void deleteProduct_whenUnauthorized_thenReturnAnd401() throws Exception {
        //given
        //when
        mockMvc.perform(delete("/api/products/1"))
                //then
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());

        Mockito.verify(productService, times(0)).deleteProduct(1L);
    }
}
