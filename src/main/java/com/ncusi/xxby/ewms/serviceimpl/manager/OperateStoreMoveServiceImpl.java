package com.ncusi.xxby.ewms.serviceimpl.manager;

import java.util.ArrayList;
import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.ncusi.xxby.ewms.mapper.ManagerMapper;
import com.ncusi.xxby.ewms.mapper.OtherMapper;
import com.ncusi.xxby.ewms.mapper.StoreMapper;
import com.ncusi.xxby.ewms.model.manager.Manager;
import com.ncusi.xxby.ewms.model.manager.ManagerInfo;
import com.ncusi.xxby.ewms.model.other.Op;
import com.ncusi.xxby.ewms.model.user.User;
import com.ncusi.xxby.ewms.model.warehouse.InInfo;
import com.ncusi.xxby.ewms.model.warehouse.Move;
import com.ncusi.xxby.ewms.model.warehouse.MoveInfo;
import com.ncusi.xxby.ewms.model.warehouse.Out;
import com.ncusi.xxby.ewms.model.warehouse.Store;
import com.ncusi.xxby.ewms.service.manager.OperateStoreMoveService;
import com.ncusi.xxby.ewms.serviceimpl.util.RandomString;
import com.ncusi.xxby.ewms.serviceimpl.util.TimeCenterFactory;

@Service("operateStoreMoveServiceImpl")
public class OperateStoreMoveServiceImpl implements OperateStoreMoveService {

	@Resource
	private StoreMapper sm;
	@Resource
	private ManagerMapper mm;
	@Resource
	private OtherMapper om;

	@Override
	public List<Move> search(String w) {
		Move m = new Move();
		Move m1 = new Move();
		Move m2 = new Move();
		Move m3 = new Move();
		Move m4 = new Move();
		List<Move> result = new ArrayList<Move>();
		if (TimeCenterFactory.checkStand(w)) {
			m.setDate(TimeCenterFactory.getSqlTime(w));
			result.addAll(sm.getMove(m));
		} else if (!w.isEmpty()) {

			m1.setAimID(w);
			m2.setGoodID(w);
			m3.setOpID(w);
			m4.setSourceID(w);
			result.addAll(sm.getMove(m1));
			result.addAll(sm.getMove(m2));
			result.addAll(sm.getMove(m3));
			result.addAll(sm.getMove(m4));
		} else {
			result.addAll(sm.getMove(m));
		}

		return result;
	}

	@Override
	@Transactional
	public void addMove(Manager m, Move move) {
		ManagerInfo info = new ManagerInfo();
		info.setID(m.getID());
		move.setSourceID(mm.searchInfo(info).get(0).getWarehouseID());
		move.setState(0);
		move.setCode(RandomString.getStringTime("move"));
		move.setDate(TimeCenterFactory.getSqlTime());
		move.setOpID(m.getID());
		sm.insertMove(move);
	}

	@Override
	@Transactional
	public void deleteMove(String key) {
		// TODO Auto-generated method stub
		Move m = new Move();
		m.setCode(key);
		sm.deleteMove(m);
	}

	@Override
	public List<MoveInfo> Logcat(String w) {
		MoveInfo m = new MoveInfo();
		MoveInfo m1 = new MoveInfo();
		MoveInfo m2 = new MoveInfo();
		MoveInfo m3 = new MoveInfo();
		MoveInfo m4 = new MoveInfo();
		List<MoveInfo> result = new ArrayList<MoveInfo>();
		if (TimeCenterFactory.checkStand(w)) {
			m.setDate(TimeCenterFactory.getSqlTime(w));
			result.addAll(sm.getMoveInfo(m));
		} else if (!w.isEmpty()) {

			m1.setAimID(w);
			m2.setGoodID(w);
			m3.setOpID(w);
			m4.setSourceID(w);
			result.addAll(sm.getMoveInfo(m1));
			result.addAll(sm.getMoveInfo(m2));
			result.addAll(sm.getMoveInfo(m3));
			result.addAll(sm.getMoveInfo(m4));
		} else {
			result.addAll(sm.getMoveInfo(m));
		}

		return result;
	}

	@Override
	@Transactional
	public void addLog(MoveInfo info) {
		info.setCode(RandomString.getStringTime("moveinfo"));
		info.setDate(TimeCenterFactory.getSqlTime());
		sm.insertMoveInfo(info);
	}

	@Override
	@Transactional
	public void delete(String key) {
		// TODO Auto-generated method stub
		MoveInfo m = new MoveInfo();
		m.setCode(key);
		sm.deleteMoveInfo(m);
	}

	@Override
	@Transactional
	public void checkApply(Move m, String managerID) {
		MoveInfo info = new MoveInfo();
		m = sm.getMove(m).get(0);
		info.setCode(RandomString.getStringTime("moveinfo"));
		info.setDate(TimeCenterFactory.getSqlTime());
		info.setAimID(m.getAimID());
		info.setOpID(m.getOpID());
		info.setGoodID(m.getGoodID());
		info.setQuantity(m.getQuantity());
		info.setSourceID(m.getSourceID());
		info.setState(m.getState());
		sm.insertMoveInfo(info);

		ManagerInfo minfo = new ManagerInfo();
		minfo.setID(managerID);
		minfo = mm.searchInfo(minfo).get(0);

		Op o = new Op();
		o.setUserID(m.getOpID());
		o.setWay("N");
		o.setState("准备中");
		o.setAddress(m.getAimID());
		Out out = new Out();
		out.setGoodID(m.getGoodID());
		out.setQuantity(m.getQuantity());
		out.setRemark("移库");
		out.setUserID(m.getOpID());
		out.setWarehouseID(m.getSourceID());
		User u = new User();
		u.setId(m.getOpID());
		u.setMail(minfo.getMail());
		o.setCode(RandomString.getStringTime());
		om.insertOp(o);
		out.setCode(RandomString.getStringTime(m.getOpID()));
		out.setOpCode(o.getCode());
		sm.insertOut(out);
		String temp = "用户您好，您的出库申请已完成. 操作码为：【" + out.getOpCode() + "】";
		// try {
		// EmailSend.sendMail(temp, u.getMail());
		// } catch (Exception e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }

		Store store = new Store();
		store.setCode(m.getGoodID());
		store = sm.getStore(store).get(0);
		InInfo in = new InInfo();
		in.setUserID(m.getOpID());
		in.setWarehouseID(m.getAimID());
		in.setGoodID(m.getGoodID());
		in.setGoodName(store.getName());
		in.setPrice(store.getPrice());
		in.settGoodID(store.getGoodID());
		in.setClassID(store.getClassID());
		in.setQuantity(m.getQuantity());
		in.setRemark("移库");
		o.setCode(RandomString.getStringTime());
		om.insertOp(o);
		in.setOpCode(o.getCode());
		in.setCode(RandomString.getStringTime(m.getOpID()));
		sm.insertInInfo(in);
		String temp2 = "用户您好，您的出库申请已完成. 操作码为：【" + in.getOpCode() + "】";
		// try {
		// EmailSend.sendMail(temp2, u.getMail());
		// } catch (Exception e) {
		// // TODO Auto-generated catch block
		// e.printStackTrace();
		// }
		sm.deleteMove(m);
	}

}
