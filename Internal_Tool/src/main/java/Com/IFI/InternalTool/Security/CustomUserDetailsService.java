package Com.IFI.InternalTool.Security;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import Com.IFI.InternalTool.DS.DAO.EmployeeDAO;
import Com.IFI.InternalTool.DS.DAO.UserDAO;
import Com.IFI.InternalTool.DS.Model.Employee;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    UserDAO userDAO;
    @Autowired
    EmployeeDAO employeeDAO;
    @Override
    @Transactional
    public UserDetails loadUserByUsername(String username)
            throws BadCredentialsException ,DisabledException {
        // Let people login with either username
    	Employee user = userDAO.findUserByUserName(username);
        if( user ==null) {
            throw new BadCredentialsException ("User not found with username : " + username);
        }
        if (!user.isIs_active()) {
            throw new DisabledException("User is not active, please contact Admin!");
          }
        List<String> userRoles=userDAO.getRolesByUserName(username);
        return new UserPrincipal(user,userRoles);
    }

    // This method is used by JWTAuthenticationFilter
    @Transactional
    public UserDetails loadUserById(Long id) throws UsernameNotFoundException {
    	Employee user = employeeDAO.getEmployeeById(id);

    	if(user==null) {
    		new UsernameNotFoundException("User not found with id : " + id);
    	}
        return new UserPrincipal(user,userDAO.getRolesByUserName(user.getUsername()));
    }
    
	 
}