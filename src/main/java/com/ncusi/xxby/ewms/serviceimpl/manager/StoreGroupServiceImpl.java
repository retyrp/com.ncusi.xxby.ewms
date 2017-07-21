package com.ncusi.xxby.ewms.serviceimpl.manager;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ncusi.xxby.ewms.mapper.OtherMapper;
import com.ncusi.xxby.ewms.model.cache.CacheManager;
import com.ncusi.xxby.ewms.model.other.Price;
import com.ncusi.xxby.ewms.service.manager.StoreGroupService;
import com.ncusi.xxby.ewms.service.util.AccountValidatorUtil;

@Service("storeGroupServiceImpl")
public class StoreGroupServiceImpl implements StoreGroupService {

	@Resource
	private OtherMapper om;

	@Override
	public List<Price> getGroup() {
		Price p = new Price();
		return om.searchPrice(p);
	}

	@Override
	public boolean updateGroup(Price p, String id) {
		om.updatePrice(p);
		CacheManager.invalidate("PriceInfos");
		CacheManager.putContentPrice("PriceInfos", getGroup());
		return true;
	}

	@Override
	public boolean addGroup(Price p, String id) {
		p.setCode(getGroup().size() + 1);
		om.insertPrice(p);
		CacheManager.invalidate("PriceInfos");
		CacheManager.putContentPrice("PriceInfos", getGroup());
		return true;
	}

	@Override
	public boolean delGroup(Price p, String id) {
		om.deletePrice(p);
		CacheManager.invalidate("PriceInfos");
		CacheManager.putContentPrice("PriceInfos", getGroup());
		return true;
	}

	@Override
	public List<Price> getGroup(String key) {
		Price p = new Price();
		if (AccountValidatorUtil.isChinese(key))
			p.setName(key);
		return om.searchPrice(p);
	}

}
