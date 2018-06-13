package Com.IFI.InternalTool.DS.DAO;

import java.util.List;

import org.springframework.stereotype.Repository;

import Com.IFI.InternalTool.DS.Model.Employee;
import Com.IFI.InternalTool.DS.Model.Group_IFI;
@Repository
public interface EmployeeDAO{
	List<Employee> getAllEmployee(int page,int pageSize,String sortedColumn,Boolean desc);
	Long saveEmployee(Employee employee);
	Boolean deleteEmployee(long employee_id);
	Employee getEmployeeById(long employee_id);
	List<Group_IFI> getAllGroup();
	List<Long> getEmployeeByManager(long manager_id);
}
