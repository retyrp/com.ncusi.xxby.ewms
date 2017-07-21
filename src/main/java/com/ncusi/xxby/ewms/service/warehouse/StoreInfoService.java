package com.ncusi.xxby.ewms.service.warehouse;

import java.util.List;

import com.ncusi.xxby.ewms.model.warehouse.StoreInfo;

public interface StoreInfoService {

	/**
	 * 获取仓库信息 根据地址
	 * 
	 * @param s
	 * @return
	 */
	public List<StoreInfo> getWarehouseByAddress(String s);

}
