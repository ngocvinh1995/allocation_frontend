package Com.IFI.InternalTool.DS.Model;

public class UserBean {
	private String token;
	private Employee username;
	private String message;

	

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
	}

	public Employee getUsername() {
		return username;
	}

	public void setUsername(Employee username) {
		this.username = username;
	}
}
