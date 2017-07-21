package com.ncusi.xxby.ewms.serviceimpl.warehouse;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ncusi.xxby.ewms.mapper.StoreMapper;
import com.ncusi.xxby.ewms.model.warehouse.StoreInfo;
import com.ncusi.xxby.ewms.service.warehouse.StoreInfoService;

@Service("getstoreInfoServiceImpl")
public class StoreInfoServiceImpl implements StoreInfoService {

	@Resource
	private StoreMapper sm;

	@Override
	public List<StoreInfo> getWarehouseByAddress(String s) {
		StoreInfo si = new StoreInfo();
		si.setAddress("%" + s + "%");
		return sm.getStoreInfoPlus(si);
	}

}
