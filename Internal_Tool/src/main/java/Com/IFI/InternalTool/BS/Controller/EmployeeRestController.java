package Com.IFI.InternalTool.BS.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import Com.IFI.InternalTool.BS.Service.EmployeeService;
import Com.IFI.InternalTool.DS.Model.Employee;
import Com.IFI.InternalTool.DS.Model.Group_IFI;
@RestController
@RequestMapping("/api")
public class EmployeeRestController {
	

	/*-----------Begin Employee MainRestController--------*/
	@Autowired
	EmployeeService employeeService;

	// get all employee data
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/employees")
	public List<Employee> getAllEmployee(@RequestParam ("page") int page,
										 @RequestParam ("pageSize") int pageSize,
										 @RequestParam ("sortedColumn") String sortedColumn,
										 @RequestParam ("desc") Boolean desc) {
			return employeeService.getAllEmployee(page,pageSize,sortedColumn,desc);
		
	}

	// get all Group data
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/groups")
	public List<Group_IFI> getAllGroup() {
		return employeeService.getAllGroup();
	}

	// get employee by id
	@PreAuthorize("hasRole('ADMIN')")
	@GetMapping("/employees/{employee_id}")
	public @ResponseBody Payload getEmployeeById(@PathVariable long employee_id) {
		Payload message = new Payload();
		if(employeeService.getEmployeeById(employee_id)!=null) {
			message.setDescription("Get employee successfully");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setData(employeeService.getEmployeeById(employee_id));
		}
		else {
			message.setDescription("Employee not found");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setData(employeeService.getEmployeeById(employee_id));
		}
		
		return message;
	}
	// save or update employee

	@PostMapping("/employees")
	public @ResponseBody Payload saveEmployee(@RequestBody Employee employee) {
		Payload message = new Payload();
			try {
			employeeService.saveEmployee(employee);
			message.setDescription("Save or Update employee successfully");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setData(employee);
			}
			catch (Exception ex) {
				message.setDescription(ex.getMessage());
				message.setCode("Error");
				message.setStatus("Error");
			}
		return message;
	}

	// delete employee by id
	@PreAuthorize("hasRole('ADMIN')")
	@DeleteMapping("/employees/{employee_id}")
	public @ResponseBody Payload deleteEmployee(@PathVariable long employee_id) {
		Payload message = new Payload();
			if(employeeService.deleteEmployee(employee_id)==true)
			{
			message.setDescription("Delete employee successfully");
			message.setCode("CODE OK!");
			message.setStatus("OK!");
			message.setData("");
		} 
		else   {
			message.setDescription("Can not delete! Employee not found");
			message.setCode("OK");
			message.setStatus("OK");
			}
		
		return message;
	}
	/*-----------End Employee MainRestController--------*/
}
