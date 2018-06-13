package Com.IFI.InternalTool.DS.DAO;

import java.util.List;

import org.springframework.stereotype.Repository;

import Com.IFI.InternalTool.DS.Model.Employee;
@Repository
public interface UserDAO {

	Employee findUserByUserName(String username);
	List<String> getRolesByUserName(String username);
}