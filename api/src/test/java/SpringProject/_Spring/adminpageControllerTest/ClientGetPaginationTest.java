package SpringProject._Spring.adminpageControllerTest;

import SpringProject._Spring.MailSenderTestConfig;
import SpringProject._Spring.controller.AdminpageController;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Client;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.authentication.ClientService;
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
import org.springframework.data.domain.Sort;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithAnonymousUser;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import java.sql.Timestamp;
import java.util.List;

import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = AdminpageController.class)
@Import({SecurityConfig.class, MailSenderTestConfig.class})
@AutoConfigureMockMvc
@WithMockUser(authorities = "SCOPE_ROLE_ADMIN")
public class ClientGetPaginationTest {

    @Autowired
    private MockMvc mockMvc;

    @MockitoBean
    private ClientService clientService;
    @MockitoBean
    private VetService vetService;

    //happy path
    @Test
    void getAllClientsPage_whenValid_thenReturnAnd200() throws Exception {
        // given
        Client client = new Client("John", "Doe", "123-456-7890", Timestamp.valueOf("2023-01-01 10:00:00"));
        client.setId(1L);
        Account account = new Account();
        account.setId(1L);
        client.setAccount(account);

        List<Client> clientList = List.of(client);
        Page<Client> clientPage = new PageImpl<>(clientList, PageRequest.of(0, 10), 1);

        when(clientService.findAllClientsPage(0, 10, null)).thenReturn(clientPage);

        //when
        mockMvc.perform(get("/api/adminpage/clients/pagination")
                        .param("page", "0")
                        .param("size", "10")
                        .contentType(MediaType.APPLICATION_JSON))
                //then
                .andExpect(status().isOk())
                .andExpectAll(
                        jsonPath("data.content").isArray(),
                        jsonPath("data.content", Matchers.hasSize(1)),
                        jsonPath("data.content[0].id").value(1L),
                        jsonPath("data.content[0].firstName").value("John"),
                        jsonPath("data.content[0].lastName").value("Doe"),
                        jsonPath("data.content[0].phoneNumber").value("123-456-7890"),
                        jsonPath("data.totalPages").value(1),
                        jsonPath("data.totalElements").value(1),
                        jsonPath("data.currentPage").value(0),
                        jsonPath("data.pageSize").value(10),
                        jsonPath("message").doesNotExist()
                );

        Mockito.verify(clientService, times(1)).findAllClientsPage(0, 10, null);
    }

    //happy path
    @Test
    void getAllClientsPage_whenValidWithSort_thenReturnSortedAnd200() throws Exception {
        //given
        Client client = new Client("test", "testaitis", "987-654-3210", Timestamp.valueOf("2023-02-02 12:00:00"));
        client.setId(1L);
        Account account = new Account();
        account.setId(1L);
        client.setAccount(account);

        List<Client> clientList = List.of(client);
        Page<Client> clientPage = new PageImpl<>(clientList, PageRequest.of(0, 10, Sort.by("firstName")), 1);

        when(clientService.findAllClientsPage(0, 10, "firstName")).thenReturn(clientPage);

        //when
        mockMvc.perform(get("/api/adminpage/clients/pagination")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sort", "firstName")
                        .contentType(MediaType.APPLICATION_JSON))
                //then
                .andExpect(status().isOk())
                .andExpectAll(
                        jsonPath("data.content").isArray(),
                        jsonPath("data.content", Matchers.hasSize(1)),
                        jsonPath("data.content[0].id").value(1L),
                        jsonPath("data.content[0].firstName").value("test"),
                        jsonPath("data.content[0].lastName").value("testaitis"),
                        jsonPath("data.content[0].phoneNumber").value("987-654-3210"),
                        jsonPath("data.totalPages").value(1),
                        jsonPath("data.totalElements").value(1),
                        jsonPath("data.currentPage").value(0),
                        jsonPath("data.pageSize").value(10),
                        jsonPath("message").doesNotExist()
                );

        Mockito.verify(clientService, times(1)).findAllClientsPage(0, 10, "firstName");
    }

    //unhappy path
    @Test
    @WithAnonymousUser
    void getAllClientsPage_whenUnauthorized_thenReturnAnd401() throws Exception {
        //given
        //when
        mockMvc.perform(get("/api/adminpage/clients/pagination")
                        .param("page", "0")
                        .param("size", "10")
                        .param("sort", "firstName"))
                //then
                .andExpect(status().isUnauthorized());

        Mockito.verify(clientService, times(0)).findAllClientsPage(0, 10, "firstName");
    }

    //unhappy path
    @Test
    void getAllClientsPage_whenInvalidPage_thenReturn400() throws Exception {
        //given
        //when
        mockMvc.perform(get("/api/adminpage/clients/pagination")
                        .param("page", "-1")
                        .param("size", "10")
                        .contentType(MediaType.APPLICATION_JSON))
                //then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("success").value(false))
                .andExpect(jsonPath("message").exists())
                .andExpect(jsonPath("data").doesNotExist());

        Mockito.verify(clientService, times(0)).findAllClientsPage(-1, 10, null);
    }

    //unhappy path
    @Test
    void getAllClientsPage_whenInvalidSize_thenReturn400() throws Exception {
        //given
        //when
        mockMvc.perform(get("/api/adminpage/clients/pagination")
                        .param("page", "0")
                        .param("size", "0")
                        .contentType(MediaType.APPLICATION_JSON))
                //then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("success").value(false))
                .andExpect(jsonPath("message").exists())
                .andExpect(jsonPath("data").doesNotExist());

        Mockito.verify(clientService, times(0)).findAllClientsPage(0, 0, null);
    }

    //unhappy path
    @Test
    void getAllClientsPage_whenEmptyList_thenReturnEmptyAnd200() throws Exception {
        //given
        Page<Client> emptyPage = new PageImpl<>(List.of(), PageRequest.of(0, 10), 0);

        when(clientService.findAllClientsPage(0, 10, null)).thenReturn(emptyPage);

        //when
        mockMvc.perform(get("/api/adminpage/clients/pagination")
                        .param("page", "0")
                        .param("size", "10")
                        .contentType(MediaType.APPLICATION_JSON))
                //then
                .andExpect(status().isOk())
                .andExpect(jsonPath("data.content").isArray())
                .andExpect(jsonPath("data.content", Matchers.hasSize(0)))
                .andExpect(jsonPath("data.totalPages").value(0))
                .andExpect(jsonPath("data.totalElements").value(0))
                .andExpect(jsonPath("data.currentPage").value(0))
                .andExpect(jsonPath("data.pageSize").value(10))
                .andExpect(jsonPath("message").value("Client list is empty"))
                .andExpect(jsonPath("success").value(true));

        Mockito.verify(clientService, times(1)).findAllClientsPage(0, 10, null);
    }
}
