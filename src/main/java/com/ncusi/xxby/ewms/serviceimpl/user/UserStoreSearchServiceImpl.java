package com.ncusi.xxby.ewms.serviceimpl.user;

import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ncusi.xxby.ewms.mapper.StoreMapper;
import com.ncusi.xxby.ewms.model.user.User;
import com.ncusi.xxby.ewms.model.user.UserOutInfo;
import com.ncusi.xxby.ewms.model.warehouse.InInfo;
import com.ncusi.xxby.ewms.model.warehouse.InLog;
import com.ncusi.xxby.ewms.model.warehouse.Out;
import com.ncusi.xxby.ewms.model.warehouse.OutLog;
import com.ncusi.xxby.ewms.model.warehouse.Store;
import com.ncusi.xxby.ewms.service.user.UserStoreSearchService;
import com.ncusi.xxby.ewms.serviceimpl.util.RandomString;
import com.ncusi.xxby.ewms.serviceimpl.util.TimeCenterFactory;

@Service("userStoreSearchService")
public class UserStoreSearchServiceImpl implements UserStoreSearchService {

	@Resource
	private StoreMapper sm;

	@Override
	public List<Store> getStore(User u) {
		Store s = new Store();
		s.setUserID(u.getId());
		return sm.getStore(s);
	}

	@Override
	public List<InLog> getInLog(User u) {
		List<InLog> li = new ArrayList<InLog>();
		InLog i = new InLog();
		i.setUserID(u.getId());
		li.addAll(sm.getInLog(i));
		return li;
	}

	@Override
	public List<OutLog> getOutLog(User u) {
		List<OutLog> lo = new ArrayList<OutLog>();
		OutLog o = new OutLog();
		o.setUserID(u.getId());
		lo.addAll(sm.getOutLog(o));
		return lo;
	}

	@Override
	public List<Object> getLogByTime(User u, Timestamp t) {
		List<Object> li = new ArrayList<Object>();
		InLog i = new InLog();
		OutLog o = new OutLog();
		i.setUserID(u.getId());
		i.setDate(t);
		o.setDate(t);
		o.setUserID(u.getId());
		li.addAll(sm.getInLog(i));
		li.addAll(sm.getOutLog(o));
		return li;
	}

	@Override
	public Map<String, List<Object>> getLogPlus(User u, String s) {
		Map<String, List<Object>> m = new HashMap<String, List<Object>>();
		Store store = new Store();
		store.setUserID(u.getId());
		List<Object> l1 = new ArrayList<Object>();
		List<Object> l2 = new ArrayList<Object>();
		List<Object> l3 = new ArrayList<Object>();
		List<Object> l4 = new ArrayList<Object>();
		List<Object> l5 = new ArrayList<Object>();

		InLog i = new InLog();
		i.setUserID(u.getId());
		OutLog o = new OutLog();
		o.setUserID(u.getId());
		InInfo in = new InInfo();
		in.setUserID(u.getId());
		Out out = new Out();
		out.setUserID(u.getId());
		UserOutInfo outInfo = new UserOutInfo();
		List<UserOutInfo> outInfoL = new ArrayList<UserOutInfo>();

		if (TimeCenterFactory.checkStand(s)) {

			Timestamp t = TimeCenterFactory.getSqlTime(s);
			System.out.println(t.toString());

			i.setUserID(u.getId());
			i.setDate(t);
			o.setDate(t);
			o.setUserID(u.getId());
			l2.addAll(sm.getInLog(i));
			l3.addAll(sm.getOutLog(o));
		} else if (RandomString.isChinese(s)) {
			s = "%" + s + "%";
			store.setName(s);
			List<Store> l = sm.getStore(store);
			l1.addAll(l);

			i.setGoodName(s);
			l2.addAll(sm.getInLog(i));

			o.setGoodName(s);
			l3.addAll(sm.getOutLog(o));

			in.setGoodName(s);
			l4.addAll(sm.getInInfo(in));

			List<Out> otmp;
			for (Store st : l) {
				out.setGoodID(st.getCode());
				otmp = sm.getOut(out);
				for (int tmp = 0; tmp < otmp.size(); tmp++) {
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
			l5.addAll(outInfoL);
		}

		else if (s == null || s.equals("") || s.isEmpty()) {
			List<Store> l = sm.getStore(store);
			l1.addAll(l);

			l2.addAll(sm.getInLog(i));

			l3.addAll(sm.getOutLog(o));

			l4.addAll(sm.getInInfo(in));

			List<Out> otmp;
			for (Store st : l) {
				out.setGoodID(st.getCode());
				otmp = sm.getOut(out);
				for (int tmp = 0; tmp < otmp.size(); tmp++) {
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
			l5.addAll(outInfoL);
		}

		else {
			s = "%" + s + "%";
			store.setGoodID(s);
			List<Store> l = sm.getStore(store);
			l1.addAll(l);

			i.setGoodID(s);
			l2.addAll(sm.getInLog(i));

			o.setGoodID(s);
			l3.addAll(sm.getOutLog(o));

			in.setOpCode(s);
			l4.addAll(sm.getInInfo(in));

			out.setOpCode(s);
			List<Out> otmp = sm.getOut(out);

			for (int tmp = 0; tmp < otmp.size(); tmp++) {
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
			l5.addAll(outInfoL);
		}
		m.put("history_in", l2);
		m.put("history_out", l3);
		m.put("history_store", l1);
		m.put("history_ininfo", l4);
		m.put("history_outinfo", l5);
		return m;
		// return null;
	}

}
