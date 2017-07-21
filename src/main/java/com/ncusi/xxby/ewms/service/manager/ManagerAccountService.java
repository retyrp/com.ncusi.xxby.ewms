package com.ncusi.xxby.ewms.service.manager;

import java.util.List;

import com.ncusi.xxby.ewms.model.manager.Manager;
import com.ncusi.xxby.ewms.model.manager.ManagerInfo;
import com.ncusi.xxby.ewms.model.manager.ManagerUtil;

/**
 * 管理员账户服务接口
 * 
 * @author retyr
 *
 */
public interface ManagerAccountService {
	/**
	 * 员工登录
	 * 
	 * @param key
	 * @param pwd
	 * @return
	 */
	public Manager login(String key, String pwd);

	/**
	 * 添加员工
	 * 
	 * @param m
	 * @return
	 */
	public boolean register(Manager m, ManagerInfo mInfo);

	/**
	 * 查询员工
	 * 
	 * @param s
	 * @return
	 */
	public List<ManagerUtil> search(String s);

	/**
	 * 修改员工信息
	 * 
	 * @param m
	 * @return
	 */
	public boolean updateInfo(ManagerInfo m);

	/**
	 * 修改密码
	 * 
	 * @param m
	 * @return
	 */
	public boolean updatePwd(Manager m);

	/**
	 * 注销员工账号
	 * 
	 * @param m
	 * @return
	 */
	public boolean delMember(Manager m);

	/**
	 * 申请
	 * 
	 * @param s
	 * @return
	 */
	public String apply(String s, String id);

	/**
	 * 检验
	 * 
	 * @param s
	 * @return
	 */
	public boolean check(String s, String id);

}
