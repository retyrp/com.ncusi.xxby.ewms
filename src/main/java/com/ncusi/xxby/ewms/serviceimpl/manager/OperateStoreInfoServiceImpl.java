package com.ncusi.xxby.ewms.serviceimpl.manager;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ncusi.xxby.ewms.mapper.StoreMapper;
import com.ncusi.xxby.ewms.model.warehouse.StoreInfo;
import com.ncusi.xxby.ewms.service.manager.OperateStoreInfoService;
import com.ncusi.xxby.ewms.service.util.AccountValidatorUtil;

@Service("operateStoreInfoServiceImpl")
public class OperateStoreInfoServiceImpl implements OperateStoreInfoService {

	@Resource
	private StoreMapper sm;

	@Override
	public List<StoreInfo> getInfo() {
		StoreInfo info = new StoreInfo();
		return sm.getStoreInfo(info);

	}

	@Override
	public boolean add(StoreInfo info) {
		sm.insertStore(info);
		return true;
	}

	@Override
	public boolean delete(StoreInfo info) {
		sm.deleteStoreInfo(info);
		return true;
	}

	@Override
	public boolean update(StoreInfo info) {
		sm.updateStoreInfo(info);
		return true;
	}

	@Override
	public List<StoreInfo> getInfo(String key) {
		StoreInfo info = new StoreInfo();
		if (AccountValidatorUtil.isChinese(key))
			info.setName(key);
		else
			info.setCode(key);
		return sm.getStoreInfoPlus(info);
	}

}
