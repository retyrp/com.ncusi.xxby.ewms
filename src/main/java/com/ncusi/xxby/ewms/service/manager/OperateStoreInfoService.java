package com.ncusi.xxby.ewms.service.manager;

import java.util.List;

import com.ncusi.xxby.ewms.model.warehouse.StoreInfo;

public interface OperateStoreInfoService {

	/**
	 * 查看所有仓库信息
	 * 
	 * @return
	 */
	public List<StoreInfo> getInfo();

	public List<StoreInfo> getInfo(String key);

	/**
	 * 添加仓库
	 * 
	 * @param info
	 * @return
	 */
	public boolean add(StoreInfo info);

	/**
	 * 删除仓库
	 * 
	 * @param info
	 * @return
	 */
	public boolean delete(StoreInfo info);

	/**
	 * 更新仓库信息
	 * 
	 * @param info
	 * @return
	 */
	public boolean update(StoreInfo info);

}
