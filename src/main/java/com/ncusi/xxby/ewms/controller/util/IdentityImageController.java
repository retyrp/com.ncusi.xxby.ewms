package com.ncusi.xxby.ewms.controller.util;

import java.awt.image.BufferedImage;
import java.io.IOException;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ncusi.xxby.ewms.serviceimpl.util.IdentityImage;

@Controller
public class IdentityImageController {

	@Resource
	private IdentityImage v;

	@RequestMapping("Image.do")
	public void IdentityImg(HttpServletRequest request, HttpServletResponse response) throws IOException {
		/*
		 * 1.生成验证码 2.把验证码上的文本存在session中 3.把验证码图片发送给客户端
		 */
		BufferedImage image = v.getImage(); // 获取验证码
		request.getSession().setAttribute("text", v.getText()); // 将验证码的文本存在session中
		v.output(image, response.getOutputStream());// 将验证码图片响应给客户端
	}
}
