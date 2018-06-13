package Com.IFI.InternalTool.Payloads;

public class Payload {
    private Boolean success;
    private String message;
    private String code;
	private String status;
	private Object data;

	public Payload() {}
	
	public Payload(final Object data, final String status, final String code,final String message, final Boolean success) {
		this.data=data;
		this.status=status;
		this.code=code;
		this.message=message;
		this.success=success;
	}
	
    public Payload(Boolean success, String message) {
        this.success = success;
        this.message = message;
    }

    public Boolean getSuccess() {
        return success;
    }

    public void setPayLoad(final Object data, final String status, final String code,final String message, final Boolean success) {
		this.data=data;
		this.status=status;
		this.code=code;
		this.message=message;
		this.success=success;
	}
    
    public void setSuccess(Boolean success) {
        this.success = success;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
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

	public Object getData() {
		return data;
	}

	public void setData(Object data) {
		this.data = data;
	}
    
}
