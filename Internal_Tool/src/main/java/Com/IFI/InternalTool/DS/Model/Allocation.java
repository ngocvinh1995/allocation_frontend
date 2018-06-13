package Com.IFI.InternalTool.DS.Model;

import java.io.Serializable;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name="allocation")
public class Allocation implements Serializable{
	@Id
	@Column(name = "allocation_id")
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private long allocation_id;
	@Column(name = "project_id")
	private long project_id;
	@Column(name = "employee_id")
	private long employee_id;
	@Column(name = "month")
	private int month;
	@Column(name = "year")
	private int year;
	@Column(name = "allocation_plan")
	private float allocation_plan;
	@Column(name = "expect")
	private float expect;
	@Column(name = "start_date")
	private Date start_date;
	@Column(name = "end_date")
	private Date end_date;
	public Allocation(long project_id, long employee_id, int month, int year, float allocation_plan, float expect,
			Date start_date, Date end_date) {
		super();
		this.project_id = project_id;
		this.employee_id = employee_id;
		this.month = month;
		this.year = year;
		this.allocation_plan = allocation_plan;
		this.expect = expect;
		this.start_date = start_date;
		this.end_date = end_date;
	}
	public Allocation() {
		super();
	}
	public long getAllocation_id() {
		return allocation_id;
	}
	public void setAllocation_id(long allocation_id) {
		this.allocation_id = allocation_id;
	}
	public long getProject_id() {
		return project_id;
	}
	public void setProject_id(long project_id) {
		this.project_id = project_id;
	}
	public long getEmployee_id() {
		return employee_id;
	}
	public void setEmployee_id(long employee_id) {
		this.employee_id = employee_id;
	}
	public int getMonth() {
		return month;
	}
	public void setMonth(int month) {
		this.month = month;
	}
	public int getYear() {
		return year;
	}
	public void setYear(int year) {
		this.year = year;
	}
	public float getAllocation_plan() {
		return allocation_plan;
	}
	public void setAllocation_plan(float allocation_plan) {
		this.allocation_plan = allocation_plan;
	}
	public float getExpect() {
		return expect;
	}
	public void setExpect(float expect) {
		this.expect = expect;
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
	
	

}
