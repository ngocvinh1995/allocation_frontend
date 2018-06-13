package Com.IFI.InternalTool.BS.Service.Impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import Com.IFI.InternalTool.BS.Service.UserService;
import Com.IFI.InternalTool.DS.DAO.UserDAO;
import Com.IFI.InternalTool.DS.Model.Employee;
@Service("UserService")
public class UserServiceImpl implements UserService{
	@Autowired
	UserDAO userDAO;
	
	@Override
	public Employee findUserByUserName(String username) {
		return userDAO.findUserByUserName(username);
	}

	@Override
	public List<String> getRolesByUserName(String username) {
		return userDAO.getRolesByUserName(username);
	}

}
