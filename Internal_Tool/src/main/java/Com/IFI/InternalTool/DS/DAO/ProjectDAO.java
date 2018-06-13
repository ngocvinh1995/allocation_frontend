package Com.IFI.InternalTool.DS.DAO;

import java.util.List;

import org.springframework.stereotype.Repository;

import Com.IFI.InternalTool.DS.Model.Project;
import Com.IFI.InternalTool.DS.Model.Project_Manager;

@Repository
public interface ProjectDAO {
	List<Project> getAllProject();
	Long saveProject(Project project);
	Boolean deleteProject(long project_id);
	Project getProjectById(long project_id);
	List<Project_Manager> getProjectManagerByEmp(long employee_id,long project_id);
	List<Long> getProjectByEmp(long employee_id);
}
