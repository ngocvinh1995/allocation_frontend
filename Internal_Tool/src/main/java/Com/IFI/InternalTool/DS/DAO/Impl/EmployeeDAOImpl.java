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

import Com.IFI.InternalTool.DS.DAO.EmployeeDAO;
import Com.IFI.InternalTool.DS.Model.Employee;
import Com.IFI.InternalTool.DS.Model.Group_IFI;
@Repository("EmployeeDAO")
@Transactional
public class EmployeeDAOImpl implements EmployeeDAO{
	
	@Autowired
	private EntityManagerFactory entityManagerFactory;
	@Override
	public List<Employee> getAllEmployee(int page,int pageSize,String sortedColumn,Boolean desc) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "FROM Employee ";
		if(sortedColumn != null && desc != null){
			String order = "";
			if(desc){
				order = "desc";
			}
			hql +="ORDER BY "+ sortedColumn + " " +  order;
		}
		Query query = session.createQuery(hql);
		query.setFirstResult((page-1)*pageSize);
		query.setFetchSize(pageSize);
		query.setMaxResults(pageSize);
		List<Employee> list = query.list();
		if(list.size() > pageSize){
			return list = list.subList(0, pageSize);
		}
		session.close();
		return list;
	}
	//save or update
	@Override
	public Long saveEmployee(Employee employee) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		Transaction tx = null;
		tx=session.beginTransaction();
		session.saveOrUpdate(employee);
		tx.commit();
		session.close();
		return employee.getEmployee_id();
	}
	@Override
	public Boolean deleteEmployee(long employee_id) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		Transaction tx = null;
		tx=session.beginTransaction();
		String hql = "Delete from Employee where employee_id=:employee_id";
		Query query = session.createQuery(hql);
		query.setParameter("employee_id", employee_id);
		int row=query.executeUpdate();
		tx.commit();
		session.close();
		if(row==0) {
			return false;
		}
		else return true;
	}
	@Override
	public Employee getEmployeeById(long employee_id) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "FROM Employee where employee_id=:employee_id";
		Query query = session.createQuery(hql);
		query.setParameter("employee_id", employee_id);
		Employee emp = (Employee) query.uniqueResult();
		session.close();
		return emp;
	}
	@Override
	public List<Group_IFI> getAllGroup() {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "FROM Group_IFI";
		Query query = session.createQuery(hql);
		List<Group_IFI> list = query.list();
		session.close();
		return list;
	}
	@Override
	public List<Long> getEmployeeByManager(long manager_id) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "Select distinct employee_id from Project_Manager where manager_id=:manager_id";
		Query query = session.createQuery(hql);
		query.setParameter("manager_id", manager_id);
		List<Long> list=query.list();
		session.close();
		return list;
	}
	
	

}
