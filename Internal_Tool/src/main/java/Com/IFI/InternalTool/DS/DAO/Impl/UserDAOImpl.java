package Com.IFI.InternalTool.DS.DAO.Impl;

import java.util.List;

import javax.persistence.EntityManagerFactory;
import javax.transaction.Transactional;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.hibernate.query.Query;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import Com.IFI.InternalTool.DS.DAO.UserDAO;
import Com.IFI.InternalTool.DS.Model.Employee;
@Repository("UserDAO")
@Transactional
public class UserDAOImpl implements UserDAO{
	@Autowired
	private EntityManagerFactory entityManagerFactory;
	@Override
	public Employee findUserByUserName(String username) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "FROM Employee where username=:username ";
		Query query = session.createQuery(hql);
		query.setParameter("username", username);
		Employee e=(Employee) query.uniqueResult();
		session.close();
		return e;
	}
	@Override
	public List<String> getRolesByUserName(String username) {
		Session session = entityManagerFactory.unwrap(SessionFactory.class).openSession();
		String hql = "Select r.name from Role as r INNER JOIN User_Role AS ur ON r.role_id=ur.role_id INNER JOIN Employee AS e ON e.employee_id=ur.employee_id where e.username=:username ";
		Query query = session.createQuery(hql);
		query.setParameter("username", username);
		List<String> list=query.list();
		session.close();//phai close
		return list;
	}
	
}
