package SpringProject._Spring.productControllerTest;

import SpringProject._Spring.controller.ProductController;
import SpringProject._Spring.dto.product.ProductPageResponseDTO;
import SpringProject._Spring.dto.product.ProductPageResult;
import SpringProject._Spring.dto.product.ProductResponseDTO;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.ProductService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.hamcrest.Matchers;
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
import java.util.List;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = ProductController.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc
public class ProductGetPaginationTest {

    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private ProductService productService;
    @Autowired
    private ObjectMapper objectMapper;

    //happy path
    @Test
    @WithMockUser(authorities = "SCOPE_ROLE_CLIENT")
    void getProductsPage_whenValid_thenReturnAnd200() throws Exception {
        //given
        ProductPageResponseDTO productPageResponseDTO = new ProductPageResponseDTO(
                List.of(new ProductResponseDTO("Name", "Description", BigDecimal.valueOf(10.0), 10)),
                1,
                6,
                0,
                10
        );

        ProductPageResult productPageResult = new ProductPageResult(productPageResponseDTO, null);

        when(productService.findAllProductsPage(0, 10, null)).thenReturn(productPageResult);

        //when
        mockMvc.perform(get("/api/products/pagination")
                        .param("page", "0")
                        .param("size", "10")
                        .contentType(MediaType.APPLICATION_JSON))
                //then
                .andExpect(status().isOk())
                .andExpectAll(
                        jsonPath("data.content").isArray(),
                        jsonPath("data.content", Matchers.hasSize(1)),
                        jsonPath("data.content[0].name").value("Name"),
                        jsonPath("data.content[0].description").value("Description"),
                        jsonPath("data.content[0].price").value(10.0),
                        jsonPath("data.content[0].stockQuantity").value(10),
                        jsonPath("data.totalPages").value(1),
                        jsonPath("data.totalElements").value(6),
                        jsonPath("data.currentPage").value(0),
                        jsonPath("data.pageSize").value(10),
                        jsonPath("message").doesNotExist()
                );

        Mockito.verify(productService, times(1)).findAllProductsPage(0, 10, null);
    }
}
