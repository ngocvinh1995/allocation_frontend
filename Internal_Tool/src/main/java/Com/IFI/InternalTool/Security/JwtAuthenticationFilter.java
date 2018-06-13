package Com.IFI.InternalTool.Security;

import static Com.IFI.InternalTool.Security.Constants.HEADER_STRING;
import static Com.IFI.InternalTool.Security.Constants.TOKEN_PREFIX;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import Com.IFI.InternalTool.DS.DAO.UserDAO;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.SignatureException;

public class JwtAuthenticationFilter extends OncePerRequestFilter {

    @Autowired
    private JwtTokenUtil jwtTokenUtil;
    @Autowired
    private UserDAO userDAO;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    private static final Logger logger = LoggerFactory.getLogger(JwtAuthenticationFilter.class);

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
    	 String header = request.getHeader(HEADER_STRING);
         String username = null;
         String authToken = null;
         if (header != null && header.startsWith(TOKEN_PREFIX)) {
             authToken = header.replace(TOKEN_PREFIX,"");
             try {
                 username = jwtTokenUtil.getUsernameFromToken(authToken);
             } catch (IllegalArgumentException e) {
                 logger.error("an error occured during getting username from token", e);
             } catch (ExpiredJwtException e) {
                 logger.warn("the token is expired and not valid anymore", e);
             } catch(SignatureException e){
                 logger.error("Authentication Failed. Username or Password not valid.");
             }
         } else {
             logger.warn("couldn't find bearer string, will ignore the header");
         }
         
         if (username != null && SecurityContextHolder.getContext().getAuthentication() == null) {

             UserDetails userDetails = customUserDetailsService.loadUserByUsername(username);
             List<String> list=userDAO.getRolesByUserName(username);
        	 List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
             for(String l:list) {
                 authorities.add(new SimpleGrantedAuthority(l));
             }
             
             if (jwtTokenUtil.validateToken(authToken, userDetails)) {
                 UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(userDetails, null,authorities);
                 authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
                 logger.info("authenticated user " + username + ", setting security context");
                 SecurityContextHolder.getContext().setAuthentication(authentication);
             }
         }
         filterChain.doFilter(request,response);
    }
    

}