package com.ncusi.xxby.ewms.serviceimpl.warehouse;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.ncusi.xxby.ewms.mapper.ExpressMapper;
import com.ncusi.xxby.ewms.mapper.OtherMapper;
import com.ncusi.xxby.ewms.model.cache.Cache;
import com.ncusi.xxby.ewms.model.cache.CacheManager;
import com.ncusi.xxby.ewms.model.cache.CacheUserManager;
import com.ncusi.xxby.ewms.model.express.Auto;
import com.ncusi.xxby.ewms.model.express.Express;
import com.ncusi.xxby.ewms.model.other.Op;
import com.ncusi.xxby.ewms.service.warehouse.StoreStatusService;

@Service("storeStatusServiceImpl")
public class StoreStatusServiceImpl implements StoreStatusService {

	@Resource
	private OtherMapper om;
	@Resource
	private ExpressMapper em;

	@Override
	public Op getStatus(String operationCode) {
		Op o = new Op();
		o.setCode(operationCode);
		o = om.searchOp(o).get(0);
		return o;
	}

	@Override
	public Object handler(String operationCode) {
		Op o = getStatus(operationCode);
		Auto a = new Auto();
		a.setCode(operationCode);
		Express e = getContent(CacheManager.getContentExpress("ExpressInfos").getValue(), operationCode);
		CacheUserManager c = new CacheUserManager();
		if (o.getWay().equals("Y")) {
			c.setStatus(e.getState());
			c.setManagerID(e.getName());
			c.setOperationCode(operationCode);
			c.setUserID(o.getUserID());
			return c;
		} else {
			Cache cache = CacheManager.getContent(operationCode);
			if (cache != null)
				return cache.getValue();
			else {
				c.setStatus(o.getState());
				c.setManagerID("暂无");
				c.setOperationCode(operationCode);
				c.setUserID(o.getUserID());
				return c;
			}
		}
	}

	@Cacheable(value = "default", key = "getContent")
	public Express getContent(List<Express> l, String s) {
		for (int i = 0; i < l.size(); i++) {
			if (l.get(i).getCode().equals(s))
				return l.get(i);
		}
		return null;

	}

	@Override
	public String test(String s) {
		// TODO Auto-generated method stub
		return null;
	}

}
