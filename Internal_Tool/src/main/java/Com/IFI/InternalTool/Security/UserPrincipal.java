package Com.IFI.InternalTool.Security;

import java.util.Collection;
import java.util.List;

import org.springframework.security.authentication.DisabledException;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;

import Com.IFI.InternalTool.DS.Model.Employee;

public class UserPrincipal extends Employee implements UserDetails {
	

	private static final long serialVersionUID = 1L;
	private List<String> userRoles;

    public UserPrincipal(Employee employee,List<String> userRoles) {
        super(employee);
		this.userRoles=userRoles;
    }
    
    @Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		
		String roles=StringUtils.collectionToCommaDelimitedString(userRoles);			
		return AuthorityUtils.commaSeparatedStringToAuthorityList(roles);
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}
	@Override
	public boolean isAccountNonLocked() {
		return true;
	}
	
	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}
	@Override
	public boolean isEnabled() {
		return super.isIs_active();
	}


	@Override
	public String getUsername() {
		return super.getUsername();
	}
	@Override
	public long getEmployee_id() {
		return super.getEmployee_id();
	}
	

}
