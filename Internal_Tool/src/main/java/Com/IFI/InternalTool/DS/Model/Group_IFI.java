package Com.IFI.InternalTool.DS.Model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="group_ifi")
public class Group_IFI implements Serializable  {
	@Id
	@Column(name = "group_id")
	private String group_id;
	@Column(name = "name")
	private String name;
	public String getGroup_id() {
		return group_id;
	}
	public void setGroup_id(String group_id) {
		this.group_id = group_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public Group_IFI() {
		super();
	}
	public Group_IFI(String group_id, String name) {
		super();
		this.group_id = group_id;
		this.name = name;
	}
	
}
