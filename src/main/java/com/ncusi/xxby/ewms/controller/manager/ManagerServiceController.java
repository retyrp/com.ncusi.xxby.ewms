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

import com.alibaba.fastjson.JSON;
import com.ncusi.xxby.ewms.model.cache.CacheManager;
import com.ncusi.xxby.ewms.model.cache.CacheUserManager;
import com.ncusi.xxby.ewms.model.manager.Manager;
import com.ncusi.xxby.ewms.model.manager.ManagerInfo;
import com.ncusi.xxby.ewms.model.manager.ManagerUtil;
import com.ncusi.xxby.ewms.model.other.AddressUtil;
import com.ncusi.xxby.ewms.model.other.Price;
import com.ncusi.xxby.ewms.model.warehouse.InInfo;
import com.ncusi.xxby.ewms.model.warehouse.Out;
import com.ncusi.xxby.ewms.model.warehouse.Store;
import com.ncusi.xxby.ewms.model.warehouse.StoreBox;
import com.ncusi.xxby.ewms.model.warehouse.StoreInfo;
import com.ncusi.xxby.ewms.service.manager.ManagerAccountService;
import com.ncusi.xxby.ewms.service.manager.ManagerStoreSearchService;
import com.ncusi.xxby.ewms.service.manager.OperateStoreInOutService;
import com.ncusi.xxby.ewms.service.manager.OperateStoreService;
import com.ncusi.xxby.ewms.service.user.OpertaionStatusServer;
import com.ncusi.xxby.ewms.service.util.PriceService;
import com.ncusi.xxby.ewms.service.warehouse.StoreInfoService;

@Controller
@RequestMapping("/Manager/2/")
public class ManagerServiceController {
	@Resource
	private OpertaionStatusServer catOperationStatus;
	@Resource
	private OperateStoreInOutService operateStoreInOutServiceImpl;
	@Resource
	private ManagerAccountService managerAccountServiceImpl;
	@Resource
	private ManagerStoreSearchService managerStoreSearchServiceImpl;
	@Resource
	private PriceService priceServiceImpl;
	@Resource
	private StoreInfoService getstoreInfoServiceImpl;
	@Resource
	private OperateStoreService operateStoreServiceImpl;

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
	 * 登录
	 * 
	 * @param u
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/login")
	public @ResponseBody Manager login(Manager u) throws Exception {
		System.out.println(JSON.toJSONString(u));
		request.setCharacterEncoding("utf-8");
		Manager data = new Manager();

		if (((Manager) request.getSession().getAttribute("manager")) != null)
			u.setID(((Manager) request.getSession().getAttribute("manager")).getID());
		u = managerAccountServiceImpl.login(u.getID(), u.getPassword());
		if (u == null)
			data.setID("Error");
		else {
			HttpSession hs = request.getSession(); // 把用户名存到session中
			u.setPassword("");
			hs.setAttribute("manager", u);
			data.setID("Success");
			// 跳转到成功页面
		}
		return data;
	}

	/**
	 * 登录
	 * 
	 * @param u
	 * @return
	 * @throws Exception
	 */
	@RequestMapping("/access")
	public @ResponseBody Manager access(Manager u) {
		if (((Manager) request.getSession().getAttribute("manager")) != null)
			return ((Manager) request.getSession().getAttribute("manager"));
		return null;
	}

	/**
	 * 登出
	 * 
	 * @return
	 */
	@RequestMapping("/logout")
	public @ResponseBody Map logout() {
		Map<String, String> m = new HashMap<String, String>();
		if (session.getAttribute("manager") == null) {
			m.put("data", "Manager.html");
		} else {
			CacheManager.invalidate(((Manager) request.getSession().getAttribute("manager")).getID());
			session.removeAttribute("manager");
			m.put("data", "Manager.html");
		}
		return m;
	}

	/**
	 * 出入库操作 设置缓存
	 * 
	 * @param c
	 * @return
	 */
	@RequestMapping(value = "setOperateStatus.do", method = RequestMethod.POST)
	public @ResponseBody String setOperationStatus(CacheUserManager c) {
		// Object u = request.getSession().getAttribute("user");
		catOperationStatus.doCache(c, 24);
		return "Done";
	}

	/**
	 * 出入库操作 执行
	 * 
	 * @param c
	 * @return
	 */
	@RequestMapping(value = "doOperationStore.do", method = RequestMethod.POST)
	public @ResponseBody Map doOperationStore(String info) {
		Map<String, List<Object>> m = new HashMap();
		Manager u = (Manager) request.getSession().getAttribute("manager");
		operateStoreInOutServiceImpl.checkCode(info, u);
		m = operateStoreInOutServiceImpl.operateByCode(info, u);
		return m;
	}

	/**
	 * 库存任务
	 * 
	 * @param info
	 * @return
	 */
	@RequestMapping(value = "getStoreUndo.do", method = RequestMethod.POST)
	public @ResponseBody Map<String, List<Object>> getStoreUndo(String info) {
		Manager u = (Manager) request.getSession().getAttribute("manager");
		return managerStoreSearchServiceImpl.getStoreUndo(info,
				((ManagerInfo) CacheManager.getContent(u.getID()).getValue()).getWarehouseID());
	}

	/**
	 * 取得商品组信息
	 * 
	 * @return
	 */

	@RequestMapping(value = "getGoodCapture.do", method = RequestMethod.POST)
	public @ResponseBody Map<String, List<Price>> getGoodCapture() {
		Map<String, List<Price>> m = new HashMap<String, List<Price>>();
		List<Price> l = priceServiceImpl.getGoodCapture();
		m.put("goodCapture", l);
		return m;
	}

	/**
	 * 查询用户当前仓库商品
	 */
	@RequestMapping(value = "getStore.do", method = RequestMethod.POST)
	public @ResponseBody Map getStore() {
		Manager u = (Manager) request.getSession().getAttribute("manager");
		return managerStoreSearchServiceImpl.getStore(u.getID());
	}

	/**
	 * 入库执行完成
	 * 
	 * @param address
	 * @return
	 */
	@RequestMapping(value = "store.do", method = RequestMethod.POST)
	public @ResponseBody Map<String, String> store(String info) {
		Map<String, String> m = new HashMap<String, String>();
		Manager u = (Manager) request.getSession().getAttribute("manager");
		if (info.split(":")[0].equals("in")) {
			// 订单价格计算
			InInfo inInfo = operateStoreServiceImpl.storeInHandler(info.split(":")[1], u.getID());
			Store s = operateStoreServiceImpl.getStoreIn(inInfo);
			operateStoreServiceImpl.storeInLog(info.split(":")[1], u.getID(), inInfo, s);
		} else {
			Out inInfo = operateStoreServiceImpl.storeOutHandler(info.split(":")[1], u.getID());
			Store s = operateStoreServiceImpl.getStoreOut(inInfo);
			operateStoreServiceImpl.storeOutLog(info.split(":")[1], u.getID(), inInfo, s);
		}
		m.put("result", "Done");
		return m;
	}

	/**
	 * 入库执行 返回Storebox
	 * 
	 * @param address
	 * @return
	 */
	@RequestMapping(value = "insertStorebox.do", method = RequestMethod.POST)
	public @ResponseBody Map<String, StoreBox> insertStoreBox(String info) {
		Map<String, StoreBox> m = new HashMap<String, StoreBox>();
		Manager u = (Manager) request.getSession().getAttribute("manager");
		if (info.split(":")[0].equals("in")) {
			// 订单价格计算
			m.put("result", operateStoreServiceImpl.createBox(info.split(":")[1], u.getID(),
					operateStoreServiceImpl.storeInHandler(info.split(":")[1], u.getID())));
		} else {
			Out o = operateStoreServiceImpl.storeOutHandler(info.split(":")[1], u.getID());
			Store s = operateStoreServiceImpl.getStoreOut(o);
			m.put("result", operateStoreServiceImpl.getBox(info.split(":")[1], u.getID(), o, s));
		}
		return m;
	}

	/**
	 * 查询个人信息
	 * 
	 * @param s
	 * @return
	 */
	@RequestMapping(value = "search.do", method = RequestMethod.POST)
	public @ResponseBody Map search(String s) {
		Map<String, List<ManagerUtil>> map = new HashMap<>();
		Manager u = (Manager) request.getSession().getAttribute("manager");
		s = u.getID();
		map.put("result", managerAccountServiceImpl.search(s));
		return map;
	}

	/**
	 * 修改个人信息
	 * 
	 * @param s
	 * @return
	 */
	@RequestMapping(value = "update.do", method = RequestMethod.POST)
	public @ResponseBody Map update(ManagerInfo s) {
		String result = "";
		Map<String, String> map = new HashMap<>();
		Manager u = (Manager) request.getSession().getAttribute("manager");
		if (s.getPhone() != null && !s.getPhone().isEmpty() && s.getPhone() != "") {
			result = managerAccountServiceImpl.apply(s.getPhone(), u.getID());
		} else if (s.getMail() != null && !s.getMail().isEmpty() && s.getMail() != "") {
			result = managerAccountServiceImpl.apply(s.getMail(), u.getID());
		} else {
			s.setID(u.getID());
			managerAccountServiceImpl.updateInfo(s);
			result = "Done";
		}
		map.put("result", result);
		return map;
	}

	/**
	 * 修改个人信息-校检
	 * 
	 * @param s
	 * @return
	 */
	@RequestMapping(value = "check.do", method = RequestMethod.POST)
	public @ResponseBody Map check(String code) {
		Map<String, String> map = new HashMap<>();
		Manager u = (Manager) request.getSession().getAttribute("manager");
		if (managerAccountServiceImpl.check(code, u.getID()))
			map.put("result", "Success");
		else
			map.put("result", "Error");
		return map;
	}

	/**
	 * 修改密码
	 * 
	 * @param m
	 * @return
	 */
	@RequestMapping(value = "updatePWD.do", method = RequestMethod.POST)
	public @ResponseBody Map update(Manager m) {
		Map<String, String> map = new HashMap<>();
		managerAccountServiceImpl.updatePwd(m);
		map.put("result", "Done");
		return map;
	}

	/**
	 * 修改权限/修改密码
	 * 
	 * @param m
	 * @return
	 */
	@RequestMapping("updatepwd.do")
	public @ResponseBody Map updatepwd(Manager m) {
		Manager u = (Manager) request.getSession().getAttribute("manager");
		m.setID(u.getID());
		Map<String, String> map = new HashMap<>();
		managerAccountServiceImpl.updatePwd(m);
		map.put("result", "Done");
		return map;
	}

	/**
	 * 获取仓库信息
	 * 
	 * @param address
	 * @return
	 */
	@RequestMapping(value = "getWarehouse.do", method = RequestMethod.POST)
	public @ResponseBody Map<String, List<StoreInfo>> getWarehouse(AddressUtil address) {
		Map<String, List<StoreInfo>> m = new HashMap<String, List<StoreInfo>>();
		List<StoreInfo> l = getstoreInfoServiceImpl.getWarehouseByAddress(address.getAddress());
		m.put("warehouse", l);
		return m;
	}

}
