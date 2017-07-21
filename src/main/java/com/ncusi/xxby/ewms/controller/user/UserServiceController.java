package com.ncusi.xxby.ewms.controller.user;

import java.io.IOException;
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
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.fastjson.JSON;
import com.ncusi.xxby.ewms.model.user.User;
import com.ncusi.xxby.ewms.model.user.UserAddress;
import com.ncusi.xxby.ewms.service.user.UserAccountService;
import com.ncusi.xxby.ewms.service.user.UserAddressService;

@Controller
@RequestMapping("/user")
public class UserServiceController {

	@Resource
	private UserAccountService userAccountServiceImpl;
	@Resource
	private UserAddressService userAddressServiceImpl;

	private HttpServletRequest request;
	private HttpServletResponse response;
	private HttpSession session;

	@ModelAttribute
	public void serReqAndRes(HttpServletRequest request, HttpServletResponse response) {
		response.setCharacterEncoding("UTF-8");
		response.setContentType("text/html;charset=UTF-8");
		this.request = request;
		this.response = response;
		this.session = request.getSession();
	}

	@RequestMapping("/login")
	public @ResponseBody User login(User u) throws Exception {
		System.out.println(JSON.toJSONString(u));
		request.setCharacterEncoding("utf-8");
		User data = new User();
		String session_vcode = (String) request.getSession().getAttribute("text"); // 从session中获取真正的验证码
		String form_vcode = u.getMail();// 获取用户输入的验证码
		if (!(session_vcode.equalsIgnoreCase(form_vcode))) // 进行判断
		{
			data.setId("Error:验证码错误"); // 如果错误就将错误信息发送给客户端
			return data;
		} else {
			u = userAccountServiceImpl.login(u.getId(), u.getPassword());
			if (u.getId().equals("Error"))
				data.setPhone("login.html?error=loginError");
			else {
				HttpSession hs = request.getSession(); // 把用户名存到session中
				hs.setAttribute("user", u);
				if (u.getPassword().contains("个人"))
					data.setPhone("index.html");
				else
					data.setPhone("individual_homepage.html");
			}
			return data;// 跳转到成功页面
		}
	}

	@RequestMapping("/loginPlus")
	public @ResponseBody User loginPlus(User u) throws Exception {
		System.out.println(JSON.toJSONString(u));
		request.setCharacterEncoding("utf-8");
		User data = new User();
		String session_vcode = (String) request.getSession().getAttribute("text"); // 从session中获取真正的验证码
		String form_vcode = u.getMail();// 获取用户输入的验证码
		if (!(session_vcode.equalsIgnoreCase(form_vcode))) // 进行判断
		{
			data.setId("Error:验证码错误"); // 如果错误就将错误信息发送给客户端
			data.setPhone("login.html?error=loginError");
			return data;
		} else {
			u = userAccountServiceImpl.login(u.getId(), u.getPassword());
			if (u.getId().equals("Error"))
				data.setPhone("login.html?error=loginError");
			else {
				HttpSession hs = request.getSession(); // 把用户名存到session中
				u.setPassword("");
				hs.setAttribute("user", u);
				data.setPhone("individual_homepage.html");
			}
			return data;// 跳转到成功页面
		}
	}

	/**
	 * 退出登录
	 * 
	 * @return
	 * @throws IOException
	 */

	@RequestMapping("/logout")
	public @ResponseBody Map logout() {
		Map<String, String> m = new HashMap<String, String>();
		if (session.getAttribute("user") == null) {
			m.put("data", "login.html");
		} else {
			session.removeAttribute("user");
			m.put("data", "login.html");
		}
		return m;
	}

	/**
	 * 注册
	 * 
	 * @param u
	 * @return
	 */
	@RequestMapping("/register")
	public @ResponseBody Map register(User u) {
		// 这里 u.getId()当做验证码 u.getName()当做注册类别
		String session_vcode = (String) request.getSession().getAttribute("text"); // 从session中获取真正的验证码
		String form_vcode = u.getName().split(":")[1];// 获取用户输入的验证码
		Map<String, String> m = new HashMap<String, String>();
		if (!(session_vcode.equalsIgnoreCase(form_vcode))) // 进行判断
		{
			m.put("data", "Error:验证码错误"); // 如果错误就将错误信息发送给客户端
		} else {
			if (userAccountServiceImpl.preRegister(u.getPhone(), u.getMail())) {
				if (userAccountServiceImpl.register(u.getPhone(), u.getId(), u.getPassword(), u.getMail(),
						u.getName().split(":")[0]))
					m.put("data", "Success");
				else
					m.put("data", "fail");
			} else
				m.put("data", "Error:手机或邮箱已注册，请登录");
		}
		return m;
	}

	@RequestMapping("/getCheckCodePhone.do")
	public @ResponseBody Map getCheckCodePhone(String phone) {
		Map<String, String> m = new HashMap<String, String>();
		// 这里 u.getId()当做验证码 u.getName()当做注册类别
		if (userAccountServiceImpl.phoneChange(phone))
			m.put("data", "Success");
		else
			m.put("data", "fail");
		return m;

	}

	/**
	 * 查询用户所有地址
	 * 
	 * @return
	 */
	@RequestMapping("/getAddressAll")
	public @ResponseBody Map<String, List<UserAddress>> getAddress(HttpServletRequest request,
			HttpServletResponse response) {
		User u = (User) request.getSession().getAttribute("user");
		Map<String, List<UserAddress>> m = new HashMap<String, List<UserAddress>>();
		List<UserAddress> list_ua = userAddressServiceImpl.getAddress(u);
		m.put("user_address", list_ua);
		return m;
	}

	/**
	 * 添加用户地址
	 * 
	 * @return
	 */
	@RequestMapping("/addUserAddress")
	public @ResponseBody String addAddress(UserAddress ua) {
		if (userAddressServiceImpl.addAddress(ua))
			return "Success";
		return "fail";
	}

	/**
	 * 删除用户地址
	 * 
	 * @param ua
	 * @return
	 */
	@RequestMapping("/deleteUserAddress")
	public @ResponseBody String deleteAddress(UserAddress ua) {
		if (userAddressServiceImpl.deleteAddress(ua))
			return "Success";
		return "fail";
	}

	/**
	 * 更新用户地址
	 * 
	 * @param ua
	 * @return
	 */
	@RequestMapping("/updateUserAddress")
	public @ResponseBody String updateAddress(UserAddress ua) {
		if (userAddressServiceImpl.updateAddress(ua))
			return "Success";
		return "fail";
	}

	@RequestMapping("/test")
	public String test() {
		System.out.println("Success！");
		return "../test";
	}

}
