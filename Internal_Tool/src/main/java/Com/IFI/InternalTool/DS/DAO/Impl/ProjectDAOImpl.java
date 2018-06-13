package Com.IFI.InternalTool.DS.DAO.Impl;

import java.util.List;

import javax.persistence.EntityManagerFactory;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.Transaction;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import Com.IFI.InternalTool.DS.DAO.ProjectDAO;
import Com.IFI.InternalTool.DS.Model.Project;
import Com.IFI.InternalTool.DS.Model.Project_Manager;
@Repository("ProjectDAO")
@Transactional
public class ProjectDAOImpl implements ProjectDAO {
	@Autowired
	private EntityManagerFactory entityManagerFactory;
	@Override
	public List<Project> getAllProject() {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "FROM Project";
		Query query = session.createQuery(hql);
		List<Project> list = query.list();
		session.close();
		return list;
	}
	
	@Override
	public Long saveProject(Project project) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		Transaction tx = null;
		tx=session.beginTransaction();
		session.saveOrUpdate(project);
		tx.commit();
		session.close();
		return project.getProject_id();
	}

	@Override
	public Boolean deleteProject(long project_id) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		Transaction tx = null;
		tx=session.beginTransaction();
		String hql = "Delete from Project where project_id=:project_id";
		Query query = session.createQuery(hql);
		query.setParameter("project_id", project_id);
		int row=query.executeUpdate();
		tx.commit();
		session.close();
		if(row==0) {
			return false;
		}
		else return true;
	}

	@Override
	public Project getProjectById(long project_id) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "FROM Project where project_id=:project_id and status=true";
		Query query = session.createQuery(hql);
		query.setParameter("project_id", project_id);
		Project pro = (Project) query.uniqueResult();
		session.close();
		return pro;
	}

	@Override
	public List<Project_Manager> getProjectManagerByEmp(long employee_id,long project_id) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "Select distinct p FROM Project_Manager p where p.employee_id=:employee_id and p.project_id=:project_id";
		Query query = session.createQuery(hql);
		query.setParameter("employee_id", employee_id);
		query.setParameter("project_id", project_id);
		List<Project_Manager> list=query.list();
		return list;
	}
	
	@Override
	public List<Long> getProjectByEmp(long employee_id) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "Select distinct p.project_id FROM Project_Manager p LEFT JOIN Vacation AS v ON p.employee_id=v.employee_id where p.employee_id=:employee_id";
		Query query = session.createQuery(hql);
		query.setParameter("employee_id", employee_id);
		List<Long> list=query.list();
		return list;
	}


}
