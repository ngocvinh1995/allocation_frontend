package Com.IFI.InternalTool.BS.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Com.IFI.InternalTool.BS.Service.ProjectService;
import Com.IFI.InternalTool.DS.DAO.ProjectDAO;
import Com.IFI.InternalTool.DS.Model.Project;
import Com.IFI.InternalTool.DS.Model.Project_Manager;
@Service("ProjectService")
public class ProjectServiceImpl implements ProjectService{
	@Autowired
	ProjectDAO projectDAO;
	@Override
	public List<Project> getAllProject() {
		return projectDAO.getAllProject(); 
	}

	@Override
	public Long saveProject(Project project) {
		return projectDAO.saveProject(project);
	}

	@Override
	public Boolean deleteProject(long project_id) {
		return projectDAO.deleteProject(project_id);
	}

	@Override
	public Project getProjectById(long project_id) {
		return projectDAO.getProjectById(project_id);
	}

	@Override
	public List<Project_Manager> getProjectManagerByEmp(long employee_id,long project_id) {
		return projectDAO.getProjectManagerByEmp(employee_id,project_id);
	}
	
	@Override
	public List<Long> getProjectByEmp(long employee_id) {
		return projectDAO.getProjectByEmp(employee_id);
	}
	
}
