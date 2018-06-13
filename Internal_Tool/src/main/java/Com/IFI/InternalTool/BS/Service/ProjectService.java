package Com.IFI.InternalTool.BS.Service;

import java.util.List;

import Com.IFI.InternalTool.DS.Model.Project;
import Com.IFI.InternalTool.DS.Model.Project_Manager;

public interface ProjectService {
	List<Project> getAllProject();
	Long saveProject(Project project);
	Boolean deleteProject(long project_id);
	Project getProjectById(long project_id);
	List<Project_Manager> getProjectManagerByEmp(long employee_id,long project_id);
	List<Long> getProjectByEmp(long employee_id);

}
