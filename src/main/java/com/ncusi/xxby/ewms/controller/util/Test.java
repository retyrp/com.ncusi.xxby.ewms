package com.ncusi.xxby.ewms.controller.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ncusi.xxby.ewms.model.other.Op;
import com.ncusi.xxby.ewms.model.user.User;
import com.ncusi.xxby.ewms.model.user.UserAddress;
import com.ncusi.xxby.ewms.model.warehouse.InInfo;
import com.ncusi.xxby.ewms.model.warehouse.InLog;
import com.ncusi.xxby.ewms.service.user.OperationInService;
import com.ncusi.xxby.ewms.service.user.UserAddressService;
import com.ncusi.xxby.ewms.service.user.UserStoreSearchService;
import com.ncusi.xxby.ewms.serviceimpl.util.TimeCenterFactory;
import com.ncusi.xxby.ewms.serviceimpl.util.Valuation;

@Controller
public class Test {

	@Resource
	private Valuation v;
	@Resource(name = "OperationInServiceImpl")
	private OperationInService operationInServiceImpl;
	@Resource
	private UserAddressService userAddressServiceImpl;
	@Resource
	private UserStoreSearchService userStoreSearchServiceImpl;

	@RequestMapping("aaaa")
	public String test() {
		InInfo i = new InInfo();
		i.setClassID(1);
		i.setQuantity(10);
		return v.getPriceIn(i).toString();
	}

	@RequestMapping("aaa")
	public void test2() {
		User u = new User();
		u.setId("001");
		u.setMail("792836095@qq.com");
		u.setName("刘强东");
		u.setPassword("123");
		u.setPhone("123456");
		Op o = new Op();
		o.setUserID(u.getId());
		o.setAddress("测试地址1");
		o.setWay("用户");
		InInfo i = new InInfo();
		i = operationInServiceImpl.operateIn(u, i, o);
		operationInServiceImpl.doOperationIn(u, i);
	}

	@RequestMapping("bbb")
	public @ResponseBody Map<String, List<UserAddress>> getAddress(HttpServletRequest request,
			HttpServletResponse response) {
		// User u = (User) request.getSession().getAttribute("user");
		User u = new User();
		u.setId("001");
		Map<String, List<UserAddress>> m = new HashMap<String, List<UserAddress>>();
		List<UserAddress> list_ua = userAddressServiceImpl.getAddress(u);
		m.put("user_address", list_ua);
		return m;
	}

	@RequestMapping("ccc")
	public @ResponseBody Map<String, List<InLog>> getInfo(HttpServletRequest request, HttpServletResponse response) {
		// User u = (User) request.getSession().getAttribute("user");
		User u = new User();
		u.setId("001");
		Map<String, List<InLog>> m = new HashMap<String, List<InLog>>();
		List<InLog> list_ua = userStoreSearchServiceImpl.getInLog(u);
		System.out.println(list_ua);
		m.put("user_store_history", list_ua);
		return m;
	}

	@RequestMapping("ddd")
	public @ResponseBody Map<String, List<Object>> getInfobytime(HttpServletRequest request,
			HttpServletResponse response) {
		// User u = (User) request.getSession().getAttribute("user");
		User u = new User();
		u.setId("001");
		Map<String, List<Object>> m = new HashMap<String, List<Object>>();
		List<Object> list_ua = userStoreSearchServiceImpl.getLogByTime(u, TimeCenterFactory.getSqlTime());
		System.out.println(list_ua);
		m.put("user_store_history", list_ua);
		return m;
	}

}
