var a, b, c, d, e;

$(function () {

	ajaxTest();
})

function ajaxTest() {

	$.ajax({
		data: "data",
		type: "GET",
		dataType: 'json',
		url: "./get",
		error: function (data) {
			alert("出错了！！:" + data.msg);
		},
		success: function (data) {
			a = data.animal.uid;
			b = data.animal.name;
			c = data.animal.pwd;
			var v = JSON.stringify(data);
		}
	});
}

function login() {
	$("#username").slideToggle();
	$("#pwd").slideToggle();
	var info = new Object();
	info.name = $("#username").val();
	info.uid="002";
	info.pwd="123";
	alert(info);
	alert(JSON.stringify(info));
	$.ajax({
		data: info,
		type: "GET",
		dataType: 'json',
		url: "./login",
		error: function (data) {
			alert("出错了！！:" + data.msg);
		},
		success: function (data) {
			var vi = JSON.stringify(data);
			alert(vi);
			$("#div1").append(
				"<div>" + "UID:" + data.animal.uid.toString() + "</div>" +
				"<div>" + "名称:" + data.animal.name.toString() + "</div>" +
				"<div>" + "密码:" + data.animal.pwd.toString() + "</div>");
		}
	});
}

function getStoreInfo(){
	var info = JSON.parse($(form1).val)
	$.ajax({
		data: info,
		type: "POST",
		dataType: 'json',
		url: "./store",
		error: function (data) {
			alert("出错了！！:" + data.msg);
		},
		success: function (data) {
			var vi = JSON.stringify(data);
			alert(vi);
		}
	});
}