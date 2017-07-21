package com.ncusi.xxby.ewms.controller.manager;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ncusi.xxby.ewms.model.manager.Manager;
import com.ncusi.xxby.ewms.model.manager.ManagerInfo;
import com.ncusi.xxby.ewms.model.manager.ManagerUtil;
import com.ncusi.xxby.ewms.model.other.Op;
import com.ncusi.xxby.ewms.model.other.Price;
import com.ncusi.xxby.ewms.model.warehouse.Move;
import com.ncusi.xxby.ewms.model.warehouse.StoreInfo;
import com.ncusi.xxby.ewms.service.manager.ManagerAccountService;
import com.ncusi.xxby.ewms.service.manager.ManagerStoreSearchService;
import com.ncusi.xxby.ewms.service.manager.OperateStoreInfoService;
import com.ncusi.xxby.ewms.service.manager.OperateStoreMoveService;
import com.ncusi.xxby.ewms.service.manager.StoreGroupService;
import com.ncusi.xxby.ewms.serviceimpl.util.TimeCenterFactory;

@Controller
@RequestMapping("/Manager/0/")
public class ManagerSrevice_aController {
	@Resource
	private ManagerAccountService managerAccountServiceImpl;
	@Resource
	private StoreGroupService storeGroupServiceImpl;
	@Resource
	private OperateStoreInfoService operateStoreInfoServiceImpl;
	@Resource
	private ManagerStoreSearchService managerStoreSearchServiceImpl;
	@Resource
	private OperateStoreMoveService OperateStoreMoveServiceImpl;

	private HttpServletRequest request;
	private HttpServletResponse response;
	private HttpSession session;

	@ModelAttribute
	public void serReqAndRes(HttpServletRequest request, HttpServletResponse response) {
		this.request = request;
		this.response = response;
		this.session = request.getSession();
	}

	/**
	 * 添加员工
	 * 
	 * @param u
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "add.do", method = RequestMethod.POST)
	public @ResponseBody Map add(ManagerUtil mu) {
		Map<String, String> map = new HashMap<>();
		Manager m = new Manager();
		ManagerInfo mInfo = new ManagerInfo();
		m.setPassword("123456");
		mInfo.setAddress(mu.getAddress());
		mInfo.setBirth(TimeCenterFactory.getSqlTime(mu.getBirth()));
		mInfo.setCredit(mu.getCridet());
		mInfo.setMail(mu.getMail());
		mInfo.setName(mu.getName());
		mInfo.setOther(mu.getRemark());
		mInfo.setSex(mu.getSex());
		mInfo.setStar(1);
		mInfo.setWarehouseID(mu.getWarehouse());
		mInfo.setPhone(mu.getPhone());
		managerAccountServiceImpl.register(m, mInfo);
		map.put("result", "Done");
		return map;
	}

	/**
	 * 查询员工
	 * 
	 * @param s
	 * @return
	 */
	@RequestMapping(value = "search.do", method = RequestMethod.POST)
	public @ResponseBody Map search(String s) {
		Map<String, List<ManagerUtil>> map = new HashMap<>();
		map.put("result", managerAccountServiceImpl.search(s));
		return map;
	}

	/**
	 * 删除员工
	 * 
	 * @param s
	 * @return
	 */
	@RequestMapping(value = "delete.do", method = RequestMethod.POST)
	public @ResponseBody Map delete(String s) {
		Map<String, String> map = new HashMap<>();
		Manager m = new Manager();
		m.setID(s);
		managerAccountServiceImpl.delMember(m);
		map.put("result", "Done");
		return map;
	}

	/**
	 * 修改权限/修改密码
	 * 
	 * @param m
	 * @return
	 */
	@RequestMapping("update.do")
	public @ResponseBody Map update(Manager m) {
		Map<String, String> map = new HashMap<>();
		managerAccountServiceImpl.updatePwd(m);
		map.put("result", "Done");
		return map;
	}

	/**
	 * 商品组查询
	 * 
	 * @param m
	 * @return
	 */
	@RequestMapping("groupCat.do")
	public @ResponseBody Map groupCat(String s) {
		Map<String, List<Price>> map = new HashMap<>();
		if (s == null)
			map.put("result", storeGroupServiceImpl.getGroup());
		else
			map.put("result", storeGroupServiceImpl.getGroup(s));
		return map;
	}

	/**
	 * 商品组修改
	 * 
	 * @param m
	 * @return
	 */
	@RequestMapping("groupUpdate.do")
	public @ResponseBody Map groupUpdate(Price p) {
		Map<String, String> map = new HashMap<>();
		Manager u = (Manager) request.getSession().getAttribute("manager");
		storeGroupServiceImpl.updateGroup(p, u.getID());
		map.put("result", "Done");
		return map;
	}

	/**
	 * 商品组添加
	 * 
	 * @param m
	 * @return
	 */
	@RequestMapping("groupAdd.do")
	public @ResponseBody Map groupAdd(Price p) {
		Map<String, String> map = new HashMap<>();
		Manager u = (Manager) request.getSession().getAttribute("manager");
		storeGroupServiceImpl.addGroup(p, u.getID());
		map.put("result", "Done");
		return map;
	}

	/**
	 * 商品组删除
	 * 
	 * @param m
	 * @return
	 */
	@RequestMapping("groupDel.do")
	public @ResponseBody Map groupDel(Price p) {
		Map<String, String> map = new HashMap<>();
		Manager u = (Manager) request.getSession().getAttribute("manager");
		storeGroupServiceImpl.delGroup(p, u.getID());
		map.put("result", "Done");
		return map;
	}

	/**
	 * 仓库查询
	 * 
	 * @param m
	 * @return
	 */
	@RequestMapping("warehouseCat.do")
	public @ResponseBody Map warehouseCat(String s) {
		Map<String, List<StoreInfo>> map = new HashMap<>();
		if (s == null || s.isEmpty() || s == "")
			map.put("result", operateStoreInfoServiceImpl.getInfo());
		else
			map.put("result", operateStoreInfoServiceImpl.getInfo(s));
		return map;
	}

	/**
	 * 仓库修改
	 * 
	 * @param m
	 * @return
	 */
	@RequestMapping("warehouseUpdate.do")
	public @ResponseBody Map warehouseUpdate(StoreInfo info) {
		Map<String, String> map = new HashMap<>();
		operateStoreInfoServiceImpl.update(info);
		map.put("result", "Done");
		return map;
	}

	/**
	 * 仓库添加
	 * 
	 * @param m
	 * @return
	 */
	@RequestMapping("warehouseAdd.do")
	public @ResponseBody Map warehouseAdd(StoreInfo info) {
		Map<String, String> map = new HashMap<>();
		operateStoreInfoServiceImpl.add(info);
		map.put("result", "Done");
		return map;
	}

	/**
	 * 仓库删除
	 * 
	 * @param m
	 * @return
	 */
	@RequestMapping("warehouseDel.do")
	public @ResponseBody Map warehouseDel(StoreInfo info) {
		Map<String, String> map = new HashMap<>();
		operateStoreInfoServiceImpl.delete(info);
		map.put("result", "Done");
		return map;
	}

	/**
	 * 日志查询
	 * 
	 * @param m
	 * @return
	 */
	@RequestMapping("logCat.do")
	public @ResponseBody Map logCat(String s) {
		Map<String, List<Object>> map = new HashMap<>();
		return managerStoreSearchServiceImpl.LogCat(s);
	}

	/**
	 * 同意移库申请
	 * 
	 * @param m
	 * @return
	 */
	@RequestMapping("checkApply.do")
	public @ResponseBody Map checkApply(Move m) {
		Map<String, String> map = new HashMap<>();
		Manager u = (Manager) request.getSession().getAttribute("manager");
		Op o = new Op();
		o.setUserID(u.getID());
		OperateStoreMoveServiceImpl.checkApply(m, u.getID());
		return map;
	}

	/**
	 * 移库取消
	 * 
	 * @param m
	 * @return
	 */
	@RequestMapping("delMove.do")
	public @ResponseBody Map delMove(String s) {
		Map<String, String> map = new HashMap<>();
		OperateStoreMoveServiceImpl.deleteMove(s);
		map.put("result", "Done");
		return map;
	}

	/**
	 * 移库查询
	 * 
	 * @param m
	 * @return
	 */
	@RequestMapping("catMove.do")
	public @ResponseBody Map catMove(String s) {
		Map<String, List<Move>> map = new HashMap<>();
		map.put("result", OperateStoreMoveServiceImpl.search(s));
		return map;
	}
}
