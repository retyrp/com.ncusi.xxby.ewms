package com.ncusi.xxby.ewms.mapper;

import java.util.List;

import com.ncusi.xxby.ewms.model.manager.Manager;
import com.ncusi.xxby.ewms.model.manager.ManagerInfo;
import com.ncusi.xxby.ewms.model.manager.ManagerLog;
import com.ncusi.xxby.ewms.model.manager.ManagerMark;

public interface ManagerMapper {

	// 登录
	public Manager login_manager(Manager m);

	// 添加
	public int add(Manager m);

	// 添加信息
	public int addInfo(ManagerInfo m);

	// 查询
	public List<Manager> search(Manager m);

	// 查询信息
	public List<ManagerInfo> searchInfo(ManagerInfo m);

	// 删除
	public int delete(Manager m);

	// 修改
	public int update(Manager m);

	public int updateInfo(ManagerInfo m);

	// 操作记录添加
	public int insertManagerLog(ManagerLog m);

	// 操作记录删除
	public int deleteManagerLog(ManagerLog m);

	// 操作记录查询
	public List<ManagerLog> searchManagerLog(ManagerLog m);

	// 评分查询
	public List<ManagerMark> searchManagerMark(ManagerMark m);

	// 评分修改
	public int updateManagerMark(ManagerMark m);

	// 评分添加
	public int insertManagerMark(ManagerMark m);

	// 评分删除
	public int deleteManagerMark(ManagerMark m);
}
