package com.ncusi.xxby.ewms.service.manager;

import java.util.List;

import com.ncusi.xxby.ewms.model.other.Price;

public interface StoreGroupService {

	/**
	 * 查询商品组
	 * 
	 * @return
	 */
	public List<Price> getGroup();

	public List<Price> getGroup(String key);

	/**
	 * 更新商品组
	 * 
	 * @return
	 */
	public boolean updateGroup(Price p, String id);

	/**
	 * 添加商品组
	 * 
	 * @return
	 */
	public boolean addGroup(Price p, String id);

	/**
	 * 删除商品组
	 * 
	 * @return
	 */
	public boolean delGroup(Price p, String id);
}
