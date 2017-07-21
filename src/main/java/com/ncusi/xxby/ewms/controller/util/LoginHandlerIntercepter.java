package com.ncusi.xxby.ewms.controller.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import com.ncusi.xxby.ewms.model.user.User;

public class LoginHandlerIntercepter implements HandlerInterceptor {

	@Override
	public void afterCompletion(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, Exception arg3)
			throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public void postHandle(HttpServletRequest arg0, HttpServletResponse arg1, Object arg2, ModelAndView arg3)
			throws Exception {
		// TODO Auto-generated method stub

	}

	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse arg1, Object arg2) throws Exception {
		String requestURI = request.getRequestURI();
		if (requestURI.indexOf(".do") > 0) {
			// 说明处在编辑的页面
			HttpSession session = request.getSession();
			User username = (User) session.getAttribute("user");
			if (username != null) {
				// 登陆成功的用户
				return true;
			} else {
				// 没有登陆，转向登陆界面
				request.getRequestDispatcher("/login.jsp").forward(request, arg1);
				return false;
			}
		} else {
			return true;
		}
	}

}
