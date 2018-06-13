package Com.IFI.InternalTool.DS.Model;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
@Entity
@Table(name="employee")
public class Employee implements Serializable{
	@Id
	@Column(name = "employee_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long employee_id;
	@Column(name = "username")
	private String username;
	@JsonProperty(access = Access.WRITE_ONLY)  //can not read password
	@Column(name = "password")
	private String password;
	
	@Column(name="is_active")
	private boolean is_active;

	@Column(name = "fullname")
	private String fullname;
	@Column(name="email")
	private String email;
	@Column(name="code")
	private String code;
	@Column (name="group_id")
	private String group_id;
	@Column(name = "address")
	private String address;
	@Column(name="age")
	private int age;
	@Column(name = "phone")
	private String phone;

	public Employee() {
		
	}

	//setter getter
	
	
	public long getEmployee_id() {
		return employee_id;
	}



	public void setEmployee_id(Long employee_id) {
		this.employee_id = employee_id;
	}


	public String getUsername() {
		return username;
	}


	public void setUsername(String username) {
		this.username = username;
	}


	public String getPassword() {
		return password;
	}


	public void setPassword(String password) {
		this.password = password;
	}


	public boolean isIs_active() {
		return is_active;
	}


	public void setIs_active(boolean is_active) {
		this.is_active = is_active;
	}


	public String getCode() {
		return code;
	}


	public void setCode(String code) {
		this.code = code;
	}


	public String getGroup_id() {
		return group_id;
	}


	public void setGroup_id(String group_id) {
		this.group_id = group_id;
	}


	public String getFullname() {
		return fullname;
	}


	public void setFullname(String fullname) {
		this.fullname = fullname;
	}


	public String getAddress() {
		return address;
	}


	public void setAddress(String address) {
		this.address = address;
	}


	public int getAge() {
		return age;
	}


	public void setAge(int age) {
		this.age = age;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getPhone() {
		return phone;
	}


	public void setPhone(String phone) {
		this.phone = phone;
	}

	public Employee(String username, String password, boolean is_active, String code, String group_id, String fullname,
			String address, int age, String email, String phone) {
		super();
		this.username = username;
		this.password = password;
		this.is_active = is_active;
		this.code = code;
		this.group_id = group_id;
		this.fullname = fullname;
		this.address = address;
		this.age = age;
		this.email = email;
		this.phone = phone;
	}
	
	public Employee(Employee employee) {
		this.username = employee.username;
		this.password = employee.password;
		this.is_active = employee.is_active;
		this.code = employee.code;
		this.group_id = employee.group_id;
		this.fullname = employee.fullname;
		this.address = employee.address;
		this.age = employee.age;
		this.email = employee.email;
		this.phone = employee.phone;
	}

	
}
