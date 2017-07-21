package com.ncusi.xxby.ewms.serviceimpl;

import org.springframework.stereotype.Service;

import com.ncusi.xxby.ewms.model.cache.Cache;
import com.ncusi.xxby.ewms.model.cache.CacheConstant;
import com.ncusi.xxby.ewms.model.cache.CacheManager;
import com.ncusi.xxby.ewms.model.cache.CacheUserManager;
import com.ncusi.xxby.ewms.service.user.OpertaionStatusServer;

@Service("catOperationStatus")
public class CatOperationStatus implements OpertaionStatusServer {

	public void doCache(CacheUserManager content, long time) {
		CacheManager.putContent(content.getOperationCode(), content, time * CacheConstant.EXPIRE_AFTER_ONE_HOUR);
	}

	@Override
	public Cache getCache(CacheUserManager content) {
		return CacheManager.getContent(content.getOperationCode());

	}

	@Override
	public boolean delCache(CacheUserManager content) {
		// TODO Auto-generated method stub
		CacheManager.invalidate(content.getOperationCode());
		return true;

	}

	@Override
	public Cache getCache(String operationCode) {
		return CacheManager.getContent(operationCode);
	}
}
