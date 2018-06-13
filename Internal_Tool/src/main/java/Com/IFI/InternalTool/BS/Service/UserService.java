package Com.IFI.InternalTool.BS.Service;

import java.util.List;

import Com.IFI.InternalTool.DS.Model.Employee;

public interface UserService {
	Employee findUserByUserName(String username);
	List<String> getRolesByUserName(String username);
}
