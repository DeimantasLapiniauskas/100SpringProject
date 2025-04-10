package SpringProject._Spring.accountControllerTest;

import SpringProject._Spring.controller.accountController.AccountControllerPut;
import SpringProject._Spring.dto.authentication.password.PasswordUpdateDTO;
import SpringProject._Spring.model.authentication.Account;
import SpringProject._Spring.model.authentication.Role;
import SpringProject._Spring.security.SecurityConfig;
import SpringProject._Spring.service.authentication.AccountService;
import SpringProject._Spring.service.authentication.ClientService;
import SpringProject._Spring.service.authentication.VetService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.mockito.ArgumentMatchers;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.put;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import java.util.List;
import java.util.Optional;

@WebMvcTest(controllers = AccountControllerPut.class)
@Import(SecurityConfig.class)
@AutoConfigureMockMvc
public class AccountAuthenticatedPUTTest {

    @Autowired
    private MockMvc mockMvc;
    @MockitoBean
    private AccountService accountService;
    @MockitoBean
    private VetService vetService;
    @MockitoBean
    private ClientService clientService;
    @MockitoBean
    private PasswordEncoder passwordEncoder;
    @Autowired
    private ObjectMapper objectMapper;

    //happy path
    @Test
    void updateAccountPassword_whenValidRequest_thenReturnAnd200() throws Exception {
        //given
        Account account = new Account("test@example.com", "oldPassword1", List.of(new Role("ROLE_CLIENT")));
        account.setId(1L);

        PasswordUpdateDTO passwordUpdateDTO = new PasswordUpdateDTO("newPassword1");

        when(accountService.findAccountById(1L)).thenReturn(Optional.of(account));
        when(passwordEncoder.encode("newPassword")).thenReturn("hashedNewPassword1");

        //context: since this endpoint uses Authentication getPrinciple() it needs authentication to exist to convert
        //it to Account, other ways of doing this test need file structure or code structure changes, so I chose this way - A.T.

//        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(account, null, account.getAuthorities());
//        SecurityContextHolder.getContext().setAuthentication(auth);

        //The way it was previously done had several issues, and made it very hard to expand. Use this instead -  D.L.
        UserDetails principal = User.withUsername("admin")
                .password("password")
                .roles("ADMIN")
                .authorities(new SimpleGrantedAuthority("SCOPE_ROLE_ADMIN"))
                .build();
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(account,
                "password", principal.getAuthorities()));
        SecurityContextHolder.setContext(securityContext);

        //when
        mockMvc.perform(put("/api/account/password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(passwordUpdateDTO)))
                //then
                .andExpect(status().isOk())
                .andExpect(jsonPath("data").value("You have successfully updated your password!"));

        Mockito.verify(accountService, times(1)).saveAccount(ArgumentMatchers.any(Account.class));
    }

    //unhappy path
    @Test
    void updateAccountPassword_whenNotAuthenticated_thenReturnAnd401() throws Exception {
        //given
        PasswordUpdateDTO passwordUpdateDTO = new PasswordUpdateDTO("newPassword1");

        //when
        mockMvc.perform(put("/api/account/password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(passwordUpdateDTO)))
                //then
                .andExpect(status().isUnauthorized())
                .andExpect(jsonPath("$").doesNotExist());

        Mockito.verify(accountService, times(0)).saveAccount(ArgumentMatchers.any(Account.class));
    }

    //unhappy path
    @Test
    void updateAccountPassword_whenAccountIdNotFound_thenReturn404() throws Exception {
        //given
        Account account = new Account("test@example.com", "oldPassword1", List.of(new Role("ROLE_CLIENT")));
        account.setId(1L);

        PasswordUpdateDTO passwordUpdateDTO = new PasswordUpdateDTO("newPassword1");

        when(accountService.existsAccountById(account.getId())).thenReturn(false);
        when(accountService.findAccountById(1L)).thenReturn(Optional.empty());

        UserDetails principal = User.withUsername("admin")
                .password("password")
                .roles("ADMIN")
                .authorities(new SimpleGrantedAuthority("SCOPE_ROLE_ADMIN"))
                .build();
        SecurityContext securityContext = SecurityContextHolder.createEmptyContext();
        securityContext.setAuthentication(new UsernamePasswordAuthenticationToken(account,
                "password", principal.getAuthorities()));
        SecurityContextHolder.setContext(securityContext);

        //when
        mockMvc.perform(put("/api/account/password/"+account.getId())
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(passwordUpdateDTO)))
                //then
                .andExpect(status().isNotFound())
                .andExpect(jsonPath("message").value("Account not found!"));

        Mockito.verify(accountService, times(0)).saveAccount(ArgumentMatchers.any(Account.class));
    }

    //unhappy path
    @Test
    void updateAccountPassword_whenPasswordIsInvalid_thenReturnAnd400() throws Exception {
        //given
        Account account = new Account("test@example.com", "oldPassword1", List.of(new Role("ROLE_CLIENT")));
        account.setId(1L);

        PasswordUpdateDTO passwordUpdateDTO = new PasswordUpdateDTO("a1");

        when(accountService.findAccountById(1L)).thenReturn(Optional.empty());

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(account, null, account.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);

        //when
        mockMvc.perform(put("/api/account/password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(passwordUpdateDTO)))
                //then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("data.newPassword").value("Your password is either too" +
                        " short or too long! Min length is 8, max is 50 symbols"));

        passwordUpdateDTO = new PasswordUpdateDTO("aaaaaaaaaa");

        mockMvc.perform(put("/api/account/password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(passwordUpdateDTO)))
                //then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("data.newPassword").value("Your password must contain at least one number, one letter, and it only accepts those and the regular qwerty keyboard symbols!"));

    }

    //unhappy path
    @Test
    void updateAccountPassword_whenPasswordIsNull_thenReturnAnd400() throws Exception {
        //given
        Account account = new Account("test@example.com", "oldPassword1", List.of(new Role("ROLE_CLIENT")));
        account.setId(1L);

        PasswordUpdateDTO passwordUpdateDTO = new PasswordUpdateDTO(null);

        when(accountService.findAccountById(1L)).thenReturn(Optional.empty());

        UsernamePasswordAuthenticationToken auth = new UsernamePasswordAuthenticationToken(account, null, account.getAuthorities());
        SecurityContextHolder.getContext().setAuthentication(auth);

        //when
        mockMvc.perform(put("/api/account/password")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(objectMapper.writeValueAsString(passwordUpdateDTO)))
                //then
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("data.newPassword").value("Password can not be null!"));
    }
}
