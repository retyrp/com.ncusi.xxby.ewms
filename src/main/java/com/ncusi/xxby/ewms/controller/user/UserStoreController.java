package com.ncusi.xxby.ewms.controller.user;

import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ncusi.xxby.ewms.model.cache.CacheUserManager;
import com.ncusi.xxby.ewms.model.other.AddressUtil;
import com.ncusi.xxby.ewms.model.other.Op;
import com.ncusi.xxby.ewms.model.other.Price;
import com.ncusi.xxby.ewms.model.user.User;
import com.ncusi.xxby.ewms.model.user.UserAddress;
import com.ncusi.xxby.ewms.model.warehouse.InInfo;
import com.ncusi.xxby.ewms.model.warehouse.Out;
import com.ncusi.xxby.ewms.model.warehouse.Store;
import com.ncusi.xxby.ewms.model.warehouse.StoreInfo;
import com.ncusi.xxby.ewms.service.user.OperationInService;
import com.ncusi.xxby.ewms.service.user.OperationOutService;
import com.ncusi.xxby.ewms.service.user.OpertaionStatusServer;
import com.ncusi.xxby.ewms.service.user.UserAddressService;
import com.ncusi.xxby.ewms.service.user.UserStoreSearchService;
import com.ncusi.xxby.ewms.service.util.OperationCodeService;
import com.ncusi.xxby.ewms.service.util.PriceService;
import com.ncusi.xxby.ewms.service.warehouse.StoreInfoService;
import com.ncusi.xxby.ewms.service.warehouse.StoreStatusService;

@Controller
@RequestMapping("/UserStore/")
public class UserStoreController {

	@Resource
	private OperationInService OperationInServiceImpl;
	@Resource
	private UserStoreSearchService userStoreSearchServiceImpl;
	@Resource
	private PriceService priceServiceImpl;
	@Resource
	private StoreInfoService getstoreInfoServiceImpl;
	@Resource
	private UserAddressService userAddressService;
	@Resource
	private OperationOutService operationOutServiceImpl;
	@Resource
	private OpertaionStatusServer catOperationStatus;
	@Resource
	private StoreStatusService storeStatusServiceImpl;
	@Resource
	private OperationCodeService operationCodeService;

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
	 * 返回价格
	 * 
	 * @return
	 */
	@RequestMapping(value = "prePriceDo.do", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> preInInfoDo(InInfo i, int days) {
		Map<String, Object> m = new HashMap<String, Object>();
		m.put("price", OperationInServiceImpl.getPriceIn(i).multiply(BigDecimal.valueOf(days)).toString());
		return m;
	}

	/**
	 * 提交入库
	 */
	@RequestMapping(value = "inDone.do", method = RequestMethod.POST)
	public @ResponseBody Map<String, Object> in(InInfo i, Op o) {
		Object u = request.getSession().getAttribute("user");
		Map<String, Object> m = new HashMap<String, Object>();
		o.setState("准备中");
		o.setUserID(((User) u).getId());
		i = OperationInServiceImpl.operateIn((User) u, i, o);
		m.put("in_info", i);
		return m;
	}

	/**
	 * 查询用户当前仓库商品
	 */
	@RequestMapping(value = "getStoreUser.do", method = RequestMethod.POST)
	public @ResponseBody Map<String, List<Store>> getStoreUser() {
		Object u = request.getSession().getAttribute("user");
		Map<String, List<Store>> m = new HashMap<String, List<Store>>();
		List<Store> l = userStoreSearchServiceImpl.getStore((User) u);
		m.put("getStoreUserInfo", l);
		return m;
	}

	/**
	 * 按条件查询库存和记录
	 * 
	 * @param request
	 * @param response
	 * @param info
	 * @return
	 */
	@RequestMapping(value = "getStoreUserPlus.do", method = RequestMethod.POST)
	public @ResponseBody Map<String, List<Object>> getStoreUserPlus(String info) {
		Object u = request.getSession().getAttribute("user");
		return userStoreSearchServiceImpl.getLogPlus((User) u, info);
	}

	/**
	 * 按条件查询当前申请
	 * 
	 * @param info
	 * @return
	 */
	@RequestMapping(value = "getStoreUserUndo.do", method = RequestMethod.POST)
	public @ResponseBody Map<String, List<Object>> getStoreUserUndo(String info) {
		Object u = request.getSession().getAttribute("user");
		return userStoreSearchServiceImpl.getLogPlus((User) u, info);
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

	/**
	 * 获取用户地址列表
	 * 
	 * @param request
	 * @param response
	 * @return
	 */
	@RequestMapping(value = "getAddressUser.do", method = RequestMethod.POST)
	public @ResponseBody Map<String, List<UserAddress>> getAddress() {
		Object u = request.getSession().getAttribute("user");
		Map<String, List<UserAddress>> m = new HashMap<String, List<UserAddress>>();
		List<UserAddress> l = userAddressService.getAddress((User) u);
		m.put("userAddress", l);
		return m;
	}

	/**
	 * 添加用户地址
	 * 
	 * @param request
	 * @param response
	 * @param ua
	 * @return
	 */

	@RequestMapping(value = "addAddressUser.do", method = RequestMethod.POST)
	public @ResponseBody Map addAddress(UserAddress ua) {
		Map<String, String> m = new HashMap<String, String>();
		Object u = request.getSession().getAttribute("user");
		ua.setUserId(((User) u).getId());
		if (userAddressService.addAddress(ua))
			m.put("data", "Success");
		else
			m.put("data", "Fail");

		return m;
	}

	/**
	 * 提交库存申请（一次提交多次相同地址的库存操作申请）
	 * 
	 * @param infoArray
	 * @return
	 */
	@RequestMapping(value = "upStoreUser.do", method = RequestMethod.POST)
	public @ResponseBody Map<String, String> upStoreUser(@RequestBody List<InInfo> infoArray) {
		Map<String, String> m = new HashMap<String, String>();
		Op o = new Op();
		User u = (User) request.getSession().getAttribute("user");
		String[] temp = infoArray.get(0).getWarehouseID().split(":");
		o.setUserID(u.getId());
		o.setWay(temp[0]);
		String tempString;
		if (temp[0].equals("Y"))
			tempString = "送取货:";
		else
			tempString = "自取送:";
		o.setAddress(temp[1]);
		for (InInfo i : infoArray) {
			if (i.getCode().equals("出库")) {
				Out out = new Out();
				out.setGoodID(i.getGoodID());
				out.setQuantity(i.getQuantity());
				out.setRemark(tempString + i.getRemark().split(":")[1]);
				out.setUserID(u.getId());
				if (o.getWay().equals("N"))
					out.setWarehouseID(temp[1]);
				else
					out.setWarehouseID(temp[2]);
				out = operationOutServiceImpl.operateOut(u, out, o);
				operationOutServiceImpl.operationOutDo(u, out);
			} else {
				i.setRemark(tempString + i.getRemark().split(":")[1]);
				i.setUserID(u.getId());
				if (o.getWay().equals("N"))
					i.setWarehouseID(temp[1]);
				else
					i.setWarehouseID(temp[2]);
				i = OperationInServiceImpl.operateIn(u, i, o);
				System.out.println(OperationInServiceImpl.doOperationIn(u, i));
			}
		}
		m.put("back_upStoreUser", "Success");
		return m;
	}

	/**
	 * 获取缓存状态
	 * 
	 * @param operateCode
	 * @return
	 */
	@RequestMapping(value = "getOperateStatus.do", method = RequestMethod.POST)
	public @ResponseBody CacheUserManager catOperationStatus(String operateCode) {
		return (CacheUserManager) storeStatusServiceImpl.handler(operateCode);
	}

	/**
	 * 获取临时六位数字码
	 * 
	 * @param operateCode
	 * @return
	 */

	@RequestMapping(value = "getCodeNumber.do", method = RequestMethod.POST)
	public @ResponseBody Map getCodeNumber(String operateCode) {
		Map<String, String> m = new HashMap<String, String>();
		m.put("data", operationCodeService.getCodeNumber(operateCode));
		return m;
	}
}
