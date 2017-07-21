package com.ncusi.xxby.ewms.serviceimpl.manager;

import javax.annotation.Resource;

import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ncusi.xxby.ewms.mapper.OtherMapper;
import com.ncusi.xxby.ewms.mapper.StoreMapper;
import com.ncusi.xxby.ewms.model.other.UserOCode;
import com.ncusi.xxby.ewms.model.warehouse.InInfo;
import com.ncusi.xxby.ewms.model.warehouse.InLog;
import com.ncusi.xxby.ewms.model.warehouse.Out;
import com.ncusi.xxby.ewms.model.warehouse.OutLog;
import com.ncusi.xxby.ewms.model.warehouse.Store;
import com.ncusi.xxby.ewms.model.warehouse.StoreBox;
import com.ncusi.xxby.ewms.service.manager.OperateStoreService;
import com.ncusi.xxby.ewms.serviceimpl.util.RandomString;
import com.ncusi.xxby.ewms.serviceimpl.util.TimeCenterFactory;

@Service("operateStoreServiceImpl")
public class OperateStoreServiceImpl implements OperateStoreService {

	@Resource
	private StoreMapper sm;
	@Resource
	private OtherMapper om;

	@Override
	@Transactional
	@Cacheable(value = "manager", key = "#uid")
	public InInfo storeInHandler(String uid, String id) {
		System.out.println("Cache未读取");
		InInfo i = new InInfo();
		i.setCode(uid);
		i = sm.getInInfo(i).get(0);
		if (i.getGoodID().equals("-"))
			i.setGoodID(RandomString.getStringTime(i.getUserID()));
		return i;

	}

	@Override
	@Transactional
	@Cacheable(value = "manager", key = "#uid")
	public Out storeOutHandler(String uid, String id) {
		Out o = new Out();
		o.setCode(uid);
		if (sm.getOut(o) == null)
			return null;
		o = sm.getOut(o).get(0);
		return o;
	}

	@Override
	@Transactional
	public StoreBox createBox(String uid, String id, InInfo i) {
		Store s = getStoreIn(i);
		StoreBox sb = new StoreBox();
		sb.setAdminID(id);
		sb.setClassID(s.getClassID());
		sb.setCode(RandomString.getStringTime(s.getWarehouseID()));
		sb.setGoodsID(s.getCode());
		sb.setSource("用户入库");
		sb.setTimeIn(TimeCenterFactory.getSqlTime());
		sb.setWarehouseID(s.getWarehouseID());
		sm.insertBox(sb);
		return sb;
	}

	@Override
	@Transactional
	public StoreBox getBox(String uid, String id, Out o, Store s) {
		StoreBox sb = new StoreBox();
		sb.setGoodsID(s.getCode());
		sb = sm.getBox(sb).get(0);
		sm.deleteBox(sb);
		return sb;
	}

	@Override
	@CacheEvict(value = "manager", key = "#uid")
	public void storeInLog(String uid, String id, InInfo inInfo, Store s) {
		Store token = new Store();
		InInfo out = new InInfo();
		UserOCode uo = new UserOCode();
		InLog i = new InLog();
		i.setAdminID(id);
		i.setClassID(inInfo.getClassID());
		i.setCode(RandomString.getStringTime());
		i.setDate(TimeCenterFactory.getSqlTime());
		i.setGoodID(inInfo.getGoodID());
		i.setGoodName(inInfo.getGoodName());
		i.setOpcode(inInfo.getOpCode());
		i.setPrice(inInfo.getPrice());
		i.setQuantity(inInfo.getQuantity());
		i.setRemark(inInfo.getRemark());
		i.setUserID(inInfo.getUserID());
		i.setWarehouseID(inInfo.getWarehouseID());
		i.setSource("用户入库");
		token.setCode(s.getCode());
		if (sm.getStore(token).isEmpty())
			sm.insertStoreS(s);
		else
			sm.updateStoreS(s);
		sm.insertInLog(i);
		uo.setOpCode(i.getOpcode());
		for (UserOCode code : om.searchUserOCode(uo))
			om.deleteUserOCode(code);
		out.setCode(uid);
		sm.deleteInInfo(out);
	}

	@Override
	@CacheEvict(value = "manager", key = "#uid")
	public void storeOutLog(String uid, String id, Out inInfo, Store s) {
		OutLog i = new OutLog();
		Out out = new Out();
		UserOCode uo = new UserOCode();
		i.setAdminID(id);
		i.setClassID(s.getClassID());
		i.setCode(RandomString.getStringTime(id));
		i.setDate(TimeCenterFactory.getSqlTime());
		i.setGoodID(s.getCode());
		i.setGoodName(s.getName());
		i.setOpID(inInfo.getOpCode());
		i.setPrice(s.getPrice());
		i.setQuantity(inInfo.getQuantity());
		i.setRemark(inInfo.getRemark());
		i.setUserID(inInfo.getUserID());
		i.setWarehouseID(inInfo.getWarehouseID());
		i.setAim("用户出库");
		s.setQuantity(s.getQuantity() - inInfo.getQuantity());
		if (s.getQuantity() == 0)
			sm.deleteStoreS(s);
		else
			sm.updateStoreS(s);
		sm.insertOutLog(i);
		uo.setOpCode(i.getOpID());
		for (UserOCode code : om.searchUserOCode(uo))
			om.deleteUserOCode(code);
		out.setCode(uid);
		sm.deleteOut(out);
	}

	@Override
	public Store getStoreIn(InInfo i) {
		Store s = new Store();
		s.setClassID(i.getClassID());
		s.setCode(i.getGoodID());
		s.setGoodID(i.gettGoodID());
		s.setName(i.getGoodName());
		s.setPrice(i.getPrice());
		s.setQuantity(i.getQuantity());
		s.setRemark(i.getRemark());
		s.setUserID(i.getUserID());
		s.setWarehouseID(i.getWarehouseID());
		return s;
	}

	@Override
	public Store getStoreOut(Out i) {
		Store s = new Store();
		s.setCode(i.getGoodID());
		s = sm.getStore(s).get(0);
		return s;
	}

	@Override
	public void storeHandler(String uid, String id) {
		if (uid.split(":")[0].equals("in"))
			storeInHandler(uid.split(":")[1], id);
		else
			storeOutHandler(uid.split(":")[1], id);

	}

}
