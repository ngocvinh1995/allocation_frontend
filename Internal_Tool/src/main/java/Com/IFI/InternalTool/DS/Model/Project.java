package Com.IFI.InternalTool.DS.Model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name="project")
public class Project implements Serializable {
	@Id
	@Column(name = "project_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long project_id;
	@Column(name = "name")
	private String name;
	@Column(name = "group_id")
	private String group_id;
	@Column(name="status")
	private boolean status;
	@Column(name = "description")
	private String description;
	@JsonFormat(pattern="dd/MM/yyyy")
	@Column(name="start_date")
	private Date start_date;
	@JsonFormat(pattern="dd/MM/yyyy")
	@Column(name="end_date")
	private Date end_date;
	public long getProject_id() {
		return project_id;
	}
	public void setProject_id(long project_id) {
		this.project_id = project_id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	@ManyToOne(cascade = CascadeType.ALL)
	public String getGroup_id() {
		return group_id;
	}
	public void setGroup_id(String group_id) {
		this.group_id = group_id;
	}
	public boolean isStatus() {
		return status;
	}
	public void setStatus(boolean status) {
		this.status = status;
	}
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public Date getStart_date() {
		return start_date;
	}
	public void setStart_date(Date start_date) {
		this.start_date = start_date;
	}
	public Date getEnd_date() {
		return end_date;
	}
	public void setEnd_date(Date end_date) {
		this.end_date = end_date;
	}
	public Project(String name, String group_id, boolean status, String description, Date start_date, Date end_date) {
		super();
		this.name = name;
		this.group_id = group_id;
		this.status = status;
		this.description = description;
		this.start_date = start_date;
		this.end_date = end_date;
	}
	public Project() {
		super();
	}
	
}
