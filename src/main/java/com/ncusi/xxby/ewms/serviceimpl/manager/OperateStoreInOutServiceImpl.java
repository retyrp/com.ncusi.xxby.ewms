package com.ncusi.xxby.ewms.serviceimpl.manager;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.ncusi.xxby.ewms.mapper.OtherMapper;
import com.ncusi.xxby.ewms.mapper.StoreMapper;
import com.ncusi.xxby.ewms.model.manager.Manager;
import com.ncusi.xxby.ewms.model.other.UserOCode;
import com.ncusi.xxby.ewms.model.user.UserOutInfo;
import com.ncusi.xxby.ewms.model.warehouse.InInfo;
import com.ncusi.xxby.ewms.model.warehouse.Out;
import com.ncusi.xxby.ewms.model.warehouse.Store;
import com.ncusi.xxby.ewms.service.manager.OperateStoreInOutService;

@Service("operateStoreInOutServiceImpl")
public class OperateStoreInOutServiceImpl implements OperateStoreInOutService {

	@Resource
	private StoreMapper sm;
	@Resource
	private OtherMapper om;

	@Override
	public Map<String, List<Object>> operateByCode(String s, Manager ma) {
		Map<String, List<Object>> m = new HashMap<String, List<Object>>();
		List<Object> l1 = new ArrayList<Object>();
		List<Object> l2 = new ArrayList<Object>();
		UserOutInfo outInfo = new UserOutInfo();
		Store store = new Store();
		List<UserOutInfo> outInfoL = new ArrayList<UserOutInfo>();
		InInfo in = new InInfo();
		Out out = new Out();

		UserOCode u = new UserOCode();
		u.setoCode(s);
		if (om.searchUserOCode(u).size() != 0) {
			s = om.searchUserOCode(u).get(0).getOpCode();
			in.setOpCode(s);
			out.setOpCode(s);

			List<Store> l = sm.getStore(store);
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
			l1.addAll(sm.getInInfo(in));
			l2.addAll(outInfoL);
		}
		m.put("operation_out", l2);
		m.put("operation_in", l1);
		return m;
	}

	@Override
	public void checkCode(String s, Manager ma) {
		InInfo in = new InInfo();
		Out out = new Out();
		UserOCode u = new UserOCode();
		u.setoCode(s);
		if (om.searchUserOCode(u).size() != 0) {
			s = om.searchUserOCode(u).get(0).getOpCode();
			in.setOpCode(s);
			out.setOpCode(s);
		}
		if (sm.getInInfo(in).size() == 0 && sm.getOut(out).size() == 0)
			om.deleteUserOCode(u);
	}

}
