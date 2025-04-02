package SpringProject._Spring.vetControllerTest;

import SpringProject._Spring.controller.VetController;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Vet;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.authentication.VetService;
import org.hamcrest.Matchers;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.time.LocalDate;
import java.util.List;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = VetController.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc
@WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
public class VetGetPaginationTest {

    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private VetService vetService;

    //happy path
    @Test
    void getAllVetsPage_whenValid_thenReturnAnd200() throws Exception {
        //given
        Vet vet = new Vet("John", "Doe", "123-456-7890", "Surgery", "VET123", LocalDate.of(2020, 1, 1));
        vet.setId(1L);
        Account account = new Account();
        account.setId(1L);
        vet.setAccount(account);

        List<Vet> vetList = List.of(vet);
        Page<Vet> vetPage = new PageImpl<>(vetList, PageRequest.of(0, 10), 1);

        when(vetService.findAllVetsPage(0, 10, null)).thenReturn(vetPage);

        //when
        mockMvc.perform(get("/api/adminpage/vets/pagination")
                        .param("page", "0")
                        .param("size", "10")
                        .contentType(MediaType.APPLICATION_JSON))
                //then
                .andExpect(status().isOk())
                .andExpectAll(
                        (jsonPath("$.data.content").isArray()),
                        (jsonPath("$.data.content", Matchers.hasSize(1))),
                        (jsonPath("$.data.content[0].id").value(1L)),
                        (jsonPath("$.data.content[0].firstName").value("John")),
                        (jsonPath("$.data.totalPages").value(1)),
                        (jsonPath("$.data.totalElements").value(1)),
                        (jsonPath("$.data.currentPage").value(0)),
                        (jsonPath("$.data.pageSize").value(10)),
                        (jsonPath("$.message").doesNotExist()));

        Mockito.verify(vetService, times(1)).findAllVetsPage(0, 10, null);
    }

}
