package com.ncusi.xxby.ewms.serviceimpl.manager;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ncusi.xxby.ewms.mapper.ManagerMapper;
import com.ncusi.xxby.ewms.mapper.OtherMapper;
import com.ncusi.xxby.ewms.mapper.StoreMapper;
import com.ncusi.xxby.ewms.model.manager.ManagerInfo;
import com.ncusi.xxby.ewms.model.manager.ManagerLog;
import com.ncusi.xxby.ewms.model.user.UserOutInfo;
import com.ncusi.xxby.ewms.model.warehouse.InInfo;
import com.ncusi.xxby.ewms.model.warehouse.Out;
import com.ncusi.xxby.ewms.model.warehouse.Store;
import com.ncusi.xxby.ewms.service.manager.ManagerStoreSearchService;
import com.ncusi.xxby.ewms.serviceimpl.util.RandomString;
import com.ncusi.xxby.ewms.serviceimpl.util.TimeCenterFactory;

@Service("managerStoreSearchServiceImpl")
public class ManagerStoreSearchServiceImpl implements ManagerStoreSearchService {

	@Resource
	private OtherMapper om;
	@Resource
	private StoreMapper sm;
	@Resource
	private ManagerMapper mm;

	@Override
	public Map<String, List<Object>> getStoreUndo(String s, String warehouse) {
		Map<String, List<Object>> m = new HashMap<String, List<Object>>();
		List<Object> l1 = new ArrayList<Object>();
		List<Object> l2 = new ArrayList<Object>();
		Store store = new Store();
		InInfo in = new InInfo();
		Out out = new Out();
		List<UserOutInfo> outInfoL = new ArrayList<UserOutInfo>();
		in.setWarehouseID(warehouse);
		out.setWarehouseID(warehouse);

		if (RandomString.isChinese(s)) {
			s = "%" + s + "%";
			store.setWarehouseID(warehouse);
			store.setName(s);
			List<Store> l = sm.getStore(store);

			in.setGoodName(s);

			List<Out> otmp;
			for (Store st : l) {
				out.setGoodID(st.getCode());
				otmp = sm.getOut(out);
				for (int tmp = 0; tmp < otmp.size(); tmp++) {
					UserOutInfo outInfo = new UserOutInfo();
					outInfo.setClassID(st.getClassID());
					outInfo.setCode(otmp.get(tmp).getCode());
					outInfo.setGoodID(otmp.get(tmp).getGoodID());
					outInfo.setGoodName(st.getName());
					outInfo.setOpCode(otmp.get(tmp).getOpCode());
					outInfo.setPrice(st.getPrice());
					outInfo.setQuantity(otmp.get(tmp).getQuantity());
					outInfo.setRemark(otmp.get(tmp).getRemark());
					outInfo.settGoodID(st.getGoodID());
					outInfo.setUserID(st.getUserID());
					outInfo.setWarehouseID(otmp.get(tmp).getWarehouseID());

					outInfoL.add(outInfo);
				}
			}
			l1.addAll(sm.getInInfo(in));
			l2.addAll(outInfoL);
		}

		else if (s == null || s.equals("") || s.isEmpty()) {
			store.setWarehouseID(warehouse);
			List<Store> l = sm.getStore(store);
			List<Out> otmp;
			for (Store st : l) {
				out.setGoodID(st.getCode());
				otmp = sm.getOut(out);
				for (int tmp = 0; tmp < otmp.size(); tmp++) {
					UserOutInfo outInfo = new UserOutInfo();
					outInfo.setClassID(st.getClassID());
					outInfo.setCode(otmp.get(tmp).getCode());
					outInfo.setGoodID(otmp.get(tmp).getGoodID());
					outInfo.setGoodName(st.getName());
					outInfo.setOpCode(otmp.get(tmp).getOpCode());
					outInfo.setPrice(st.getPrice());
					outInfo.setQuantity(otmp.get(tmp).getQuantity());
					outInfo.setRemark(otmp.get(tmp).getRemark());
					outInfo.settGoodID(st.getGoodID());
					outInfo.setUserID(st.getUserID());
					outInfo.setWarehouseID(otmp.get(tmp).getWarehouseID());
					outInfoL.add(outInfo);
				}
			}
			l1.addAll(sm.getInInfo(in));
			l2.addAll(outInfoL);
		}

		else {
			store.setWarehouseID(warehouse);
			in.setGoodID(s);
			out.setGoodID(s);
			List<Store> l = sm.getStore(store);
			List<Out> otmp = sm.getOut(out);
			for (int tmp = 0; tmp < otmp.size(); tmp++) {
				UserOutInfo outInfo = new UserOutInfo();
				Store st = new Store();
				for (Store stt : l)
					if (otmp.get(tmp).getGoodID().equals(stt.getCode()))
						st = stt;
				outInfo.setClassID(st.getClassID());
				outInfo.setCode(otmp.get(tmp).getCode());
				outInfo.setGoodID(otmp.get(tmp).getGoodID());
				outInfo.setGoodName(st.getName());
				outInfo.setOpCode(otmp.get(tmp).getOpCode());
				outInfo.setPrice(st.getPrice());
				outInfo.setQuantity(otmp.get(tmp).getQuantity());
				outInfo.setRemark(otmp.get(tmp).getRemark());
				outInfo.settGoodID(st.getGoodID());
				outInfo.setUserID(st.getUserID());
				outInfo.setWarehouseID(otmp.get(tmp).getWarehouseID());

				outInfoL.add(outInfo);
			}
			l1.addAll(sm.getInInfo(in));
			l2.addAll(outInfoL);
		}

		m.put("operation_out", l2);
		m.put("operation_in", l1);
		return m;
	}

	@Override
	public Map<String, List<Object>> LogCat(String s) {
		Map<String, List<Object>> m = new HashMap<String, List<Object>>();
		List<Object> l1 = new ArrayList<Object>();
		ManagerLog ml = new ManagerLog();

		if (TimeCenterFactory.checkStand(s)) {

			Timestamp t = TimeCenterFactory.getSqlTime(s);
			ml.setDate(t);
			l1.addAll(mm.searchManagerLog(ml));
		} else if (RandomString.isChinese(s)) {
			s = "%" + s + "%";
			ml.setType(s);
			l1.addAll(mm.searchManagerLog(ml));
		}

		else if (s == null || s.equals("") || s.isEmpty()) {
			l1.addAll(mm.searchManagerLog(ml));
		}

		else {
			ml.setManagerID(s);
			l1.addAll(mm.searchManagerLog(ml));
		}

		m.put("log", l1);
		return m;
	}

	@Override
	public boolean LogClear() {
		// TODO Auto-generated method stub
		return false;
	}

	@Override
	public Map getStore(String store) {
		Map<String, List<Store>> map = new HashMap();
		ManagerInfo info = new ManagerInfo();
		info.setID(store);
		info = mm.searchInfo(info).get(0);
		Store s = new Store();
		s.setWarehouseID(info.getWarehouseID());
		sm.getStore(s);
		map.put("result", sm.getStore(s));
		return map;
	}

}
