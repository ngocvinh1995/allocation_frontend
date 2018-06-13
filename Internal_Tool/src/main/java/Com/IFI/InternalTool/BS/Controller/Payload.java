package Com.IFI.InternalTool.BS.Controller;

public class Payload {
	private String code;
	private String status;
	private String description;
	private Object data;
	private Integer pages;
	public Integer getPages() {
		return pages;
	}
	public void setPages(Integer pages) {
		this.pages = pages;
	}
	public String getCode() {
		return code;
	}
	public void setCode(String code) {
		this.code = code;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Object getData() {
		return data;
	}
	public void setData(Object data) {
		this.data = data;
	}
	public Payload() {
		super();
	}
	public Payload(String code, String status, String description, Object data) {
		super();
		this.code = code;
		this.status = status;
		this.description = description;
		this.data = data;
	}
}