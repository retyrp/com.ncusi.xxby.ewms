package com.ncusi.xxby.ewms.controller.manager;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ncusi.xxby.ewms.model.manager.Manager;
import com.ncusi.xxby.ewms.model.warehouse.Move;
import com.ncusi.xxby.ewms.service.manager.ManagerAccountService;
import com.ncusi.xxby.ewms.service.manager.ManagerStoreSearchService;
import com.ncusi.xxby.ewms.service.manager.OperateStoreInfoService;
import com.ncusi.xxby.ewms.service.manager.OperateStoreMoveService;
import com.ncusi.xxby.ewms.service.manager.StoreGroupService;

@Controller
@RequestMapping("/Manager/1/")
public class ManagerService_bController {

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
	 * 移库申请
	 * 
	 * @param m
	 * @return
	 */
	@RequestMapping("applyMove.do")
	public @ResponseBody Map applyMove(Move m) {
		Map<String, String> map = new HashMap<>();
		Manager u = (Manager) request.getSession().getAttribute("manager");
		OperateStoreMoveServiceImpl.addMove(u, m);
		map.put("result", "Done");
		return map;
	}
}
