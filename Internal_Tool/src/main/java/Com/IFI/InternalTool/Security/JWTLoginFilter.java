package Com.IFI.InternalTool.Security;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.AbstractAuthenticationProcessingFilter;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;

import com.fasterxml.jackson.databind.ObjectMapper;

import Com.IFI.InternalTool.DS.DAO.UserDAO;
import Com.IFI.InternalTool.DS.Model.Employee;

public class JWTLoginFilter extends AbstractAuthenticationProcessingFilter{
	@Autowired
	UserDAO userDAO;
		
	public JWTLoginFilter(String url, AuthenticationManager authManager) {
        super(new AntPathRequestMatcher(url));
        setAuthenticationManager(authManager);
    }
	
	@Override
    public Authentication attemptAuthentication(
            HttpServletRequest req, HttpServletResponse res)
            throws AuthenticationException, IOException, ServletException {
       UserPrincipal user = new ObjectMapper().readValue(req.getInputStream(),UserPrincipal.class);
       List<String> list= userDAO.getRolesByUserName(user.getUsername());
       List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
       for(String l:list) {
           authorities.add(new SimpleGrantedAuthority(l));
       }
        return getAuthenticationManager().authenticate(
                new UsernamePasswordAuthenticationToken(
                        user.getUsername(),
                        user.getPassword(),
                        authorities
                )
        );
    }
	


	@Override
	    protected void successfulAuthentication(
	            HttpServletRequest req,
	            HttpServletResponse res, FilterChain chain,
	            Authentication auth) throws IOException, ServletException {
	            JwtTokenUtil jwtTokenUtil=new JwtTokenUtil();
	            Employee user=(Employee) auth.getPrincipal();
	            jwtTokenUtil.generateToken(user);
	    }
}
