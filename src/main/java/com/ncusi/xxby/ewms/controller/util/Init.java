package com.ncusi.xxby.ewms.controller.util;

import javax.annotation.Resource;

import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextRefreshedEvent;
import org.springframework.stereotype.Component;

import com.ncusi.xxby.ewms.mapper.ExpressMapper;
import com.ncusi.xxby.ewms.model.cache.CacheManager;
import com.ncusi.xxby.ewms.model.express.Express;
import com.ncusi.xxby.ewms.model.other.Settings;
import com.ncusi.xxby.ewms.service.manager.StoreGroupService;

@Component
public class Init implements ApplicationListener<ContextRefreshedEvent> {

	@Resource
	private ExpressMapper em;
	@Resource
	private StoreGroupService storeGroupServiceImpl;

	@Override
	public void onApplicationEvent(ContextRefreshedEvent arg0) {
		Express e = new Express();
		Settings s = new Settings();
		// 这里设置一下短信apicode
		s.setSmsAppcode("");
		CacheManager.putContent("Settings", s);
		CacheManager.putContentPrice("PriceInfos", storeGroupServiceImpl.getGroup());
		CacheManager.putContentExpress("ExpressInfos", em.searchExpress(e));

	}

}
