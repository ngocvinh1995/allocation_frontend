package Com.IFI.InternalTool.BS.Service;

import java.util.List;

import Com.IFI.InternalTool.DS.Model.Employee;
import Com.IFI.InternalTool.DS.Model.Group_IFI;

public interface EmployeeService {

	List<Employee>  getAllEmployee(int page, int pageSize,String sortedColumn,Boolean desc);
	Long saveEmployee(Employee employee);
	Boolean deleteEmployee(long employee_id);
	Employee getEmployeeById(long employee_id);
	List<Group_IFI>  getAllGroup();
	List<Long> getEmployeeByManager(long manager_id);
	Long getEmployeeIdAuthenticated();
}
