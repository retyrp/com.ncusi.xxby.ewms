package com.ncusi.xxby.ewms.serviceimpl.util;

import java.util.HashMap;
import java.util.Map;

import org.apache.http.HttpResponse;
import org.springframework.stereotype.Service;

import com.ncusi.xxby.ewms.model.cache.CacheManager;
import com.ncusi.xxby.ewms.model.other.Settings;
import com.ncusi.xxby.ewms.service.util.Identity;

@Service
public class IdentityImpl implements Identity {

	private Settings s;

	public String identity(String cardNo, String name) {
		s = (Settings) CacheManager.getContent("Settings").getValue();
		String host = s.getIdentityHost();
		String path = s.getIdentityPath();
		String method = s.getIdentityMethod();
		String appcode = s.getIdentityAppcode();
		Map<String, String> headers = new HashMap<String, String>();
		// 最后在header中的格式(中间是英文空格)为Authorization:APPCODE
		// 83359fd73fe94948385f570e3c139105
		headers.put("Authorization", "APPCODE " + appcode);
		Map<String, String> querys = new HashMap<String, String>();
		querys.put("cardno", cardNo);
		querys.put("name", name);

		try {
			/**
			 * 重要提示如下: HttpUtils请从
			 * https://github.com/aliyun/api-gateway-demo-sign-java/blob/master/src/main/java/com/aliyun/api/gateway/demo/util/HttpUtils.java
			 * 下载
			 *
			 * 相应的依赖请参照
			 * https://github.com/aliyun/api-gateway-demo-sign-java/blob/master/pom.xml
			 */
			HttpResponse response = ApiUtil.doGet(host, path, method, headers, querys);
			return response.toString();
			// 获取response的body
			// System.out.println(EntityUtils.toString(response.getEntity()));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "fail";
	}

}
