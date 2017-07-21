package com.ncusi.xxby.ewms.serviceimpl.util;

import java.util.Date;
import java.util.Random;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import org.springframework.stereotype.Service;

@Service
public class RandomString {

	private static char[] basicString = ("0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")
			.toCharArray();

	private static char[] basicNumber = ("0123456789").toCharArray();

	/**
	 * 随机组合码
	 * 
	 * @param length长度
	 * @return
	 */
	public static String rdmString(int length) {
		char[] needString = new char[length];
		for (int i = 0; i < length; i++) {
			int number = new Random().nextInt(61);// 随机0-61的数字
			needString[i] = basicString[number];
		}
		return new String(needString);
	}

	/**
	 * 随机数字组合码
	 * 
	 * @param length
	 * @return
	 */
	public static String rdmNumber(int length) {
		char[] needString = new char[length];
		for (int i = 0; i < length; i++) {
			int number = new Random().nextInt(9);// 随机0-61的数字
			needString[i] = basicString[number];
		}
		return new String(needString);
	}

	/**
	 * 取得流水号
	 * 
	 * @param s
	 *            关键字
	 * @return 长度：20+关键字
	 */
	public static String getStringTime(String s) {
		String reg = "[^0-9]";
		Pattern p = Pattern.compile(reg);
		if (s == null)
			s = "";
		return rdmString(3)
				+ ((p.matcher((new java.sql.Timestamp((new Date().getTime()))).toString())).replaceAll("").trim() + s);
	}

	public static String getStringTime() {
		String reg = "[^0-9]";
		Pattern p = Pattern.compile(reg);
		return rdmString(3)
				+ ((p.matcher((new java.sql.Timestamp((new Date().getTime()))).toString())).replaceAll("").trim());
	}

	/**
	 * 是否包含汉字
	 * 
	 * @param str
	 * @return
	 */
	public static boolean isChinese(String str) {
		if (str != null && str != "") {
			String regEx = "[\u4e00-\u9fa5]";
			Pattern pat = Pattern.compile(regEx);
			Matcher matcher = pat.matcher(str);
			if (matcher.find())
				return true;
			return false;
		} else
			return false;
	}

	// @Test
	// public void test() {
	// System.out.println(getStringTime("").length());
	// }

}
