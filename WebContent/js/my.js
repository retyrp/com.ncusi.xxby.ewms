	var curent;
	var data;
	var InfoAPI, SeleAPI, SeleInfoAPI;
	$(document).ready(function() {

	    //初始化商品信息表
	    InfoAPI = $('.myTableInfo').DataTable({

	        //	"searching":false,
	        "bLengthChange": false,
	        "iDisplayLength": 8,
	        "oLanguage": {
	            "sZeroRecords": "对不起，查询不到任何相关数据",
	            "sInfo": "共 _TOTAL_条记录",
	            "sInfoEmtpy": "找不到相关数据",
	            "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
	            "sProcessing": "正在加载中...",
	            "sSearch": "查询",
	            "oPaginate": {
	                "sFirst": "第一页",
	                "sPrevious": " 上一页 ",
	                "sNext": " 下一页 ",
	                "sLast": " 最后一页 "
	            },
	            "sLengthMenu": "<div class='before' >每页显示</div>" + "<select  id='sele2' class='form-control input-xsmall'>" +
	                '<option value="2">2</option>' +
	                '<option value="4">4</option>' +
	                '<option value="6">6</option>' +
	                '<option value="8">8</option>' +
	                '<option value="10">10</option>' +
	                '<option value="12">12</option>' +
	                "</select><div class='behind'>条记录</div>",

	        }
	    });
	    //给商品信息表 每一行添加click事件
	    $('.myTableInfo tbody').on('click', 'tr', function() {
	        //	alert("tr");
	        //	var name = $('td', this).eq(0).text();//取出第一列的数据

	        curent = this.rowIndex;
	        InfoAPI.column(7).visible(true).draw(false);

	        var name = this.cells[0].childNodes[0].textContent; //获取此行第一个单元格的值，childNodes[0]指此单元格子节点的第一个子节点  
	        var id = this.cells[1].childNodes[0].textContent; ////获取此行第二个单元格的值  
	        var price = this.cells[2].childNodes[0].textContent; ////获取此行第三个单元格的值 
	        var catolog = this.cells[3].childNodes[0].textContent; ////获取此行第四个单元格的值  
	        var type = this.cells[4].childNodes[0].textContent; //
	        var num = this.cells[5].childNodes[0].textContent; //库存数量
	        var mask = this.cells[6].childNodes[0].textContent;
	        var code = this.cells[7].childNodes[0].textContent;

	        InfoAPI.column(7).visible(false).draw(false);

	        //赋值
	        $("#INconfirm label ")[0].innerHTML = name;
	        $("#INconfirm label ")[1].innerHTML = id;
	        $("#INconfirm label ")[2].innerHTML = price;
	        $("#INconfirm label ")[3].innerHTML = catolog;
	        $("#INconfirm label ")[4].innerHTML = type;
	        $("#INconfirm label ")[5].innerHTML = mask;
	        $("#INconfirm label ")[6].innerHTML = code;


	        //赋值
	        $("#OUTconfirm label ")[0].innerHTML = name;
	        $("#OUTconfirm label ")[1].innerHTML = id;
	        $("#OUTconfirm label ")[2].innerHTML = price;
	        $("#OUTconfirm label ")[3].innerHTML = catolog;
	        $("#OUTconfirm label ")[4].innerHTML = type;
	        $("#OUTconfirm label ")[5].innerHTML = mask;
	        $("#OUTconfirm label ")[6].innerHTML = code;

	        $("#OUTconfirm input ")[0].value = ""; //清空输入框			

	        $("#INconfirm input ")[0].value = ""; //清空输入框			

	        //	alert(TeacherName+CourseType+CourseName);
	    });
	    //给商品信息表 每个td添加click事件
	    $('.myTableInfo tbody').on('click', 'td', function() {
	        var col = this.cellIndex;
	        if (col < 3) {
	            $(".mask").removeClass("hidden");
	            $("#INconfirm").removeClass("hidden");
	        } else {
	            $(".mask").removeClass("hidden");
	            $("#OUTconfirm").removeClass("hidden");
	        }
	    });
	    getAddressUser();

	    //初始化所选商品表
	    SeleAPI = $('.myTableSele').DataTable({


	        //		"data":data,//数据源	
	        "searching": false, //不显示搜素框
	        "bLengthChange": false,
	        "iDisplayLength": 8,
	        "oLanguage": {
	            "sZeroRecords": "没有添加任何商品",
	            "sInfo": "共 _TOTAL_条记录",
	            "sInfoEmtpy": "找不到相关数据",
	            "sInfoFiltered": "",
	            "sProcessing": "正在加载中...",
	            "sSearch": "",
	            "oPaginate": {
	                "sFirst": "第一页",
	                "sPrevious": " 上一页 ",
	                "sNext": " 下一页 ",
	                "sLast": " 最后一页 "
	            },
	            "sLengthMenu": "<div class='before' >每页显示</div>" + "<select  id='sele2' class='form-control input-xsmall'>" +
	                '<option value="2">2</option>' +
	                '<option value="4">4</option>' +
	                '<option value="6">6</option>' +
	                '<option value="8">8</option>' +
	                '<option value="10">10</option>' +
	                '<option value="12">12</option>' +
	                "</select><div class='behind'>条记录</div>",

	        }



	    });
	    SeleAPI.column(7).visible(false).draw(false);
	    $('#confirm_1').attr('disabled', 'true');
	    //给所选商品表的每一行添加click事件
	    $('.myTableSele tbody').on('click', 'tr', function() {

	        //给点击的行 添加selected类
	        if ($(this).hasClass('selected')) {
	            $(this).removeClass('selected');
	        } else {
	            SeleAPI.$('tr.selected').removeClass('selected');
	            $(this).addClass('selected');
	        }

	        var name = this.cells[0].childNodes[0].textContent; //获取此行第一个单元格的值，childNodes[0]指此单元格子节点的第一个子节点  
	        var id = this.cells[1].childNodes[0].textContent; ////获取此行第二个单元格的值  
	        var price = this.cells[2].childNodes[0].textContent; ////获取此行第三个单元格的值 
	        var catolog = this.cells[3].childNodes[0].textContent; ////获取此行第四个单元格的值  
	        var type = this.cells[4].childNodes[0].textContent; //
	        var num = this.cells[5].childNodes[0].textContent; //数量
	        var mask = this.cells[6].childNodes[0].textContent;
	        var code = this.cells[7].childNodes[0].textContent;

	        //赋值
	        $("#SELEconfirm label ")[0].innerHTML = name;
	        $("#SELEconfirm label ")[1].innerHTML = id;
	        $("#SELEconfirm label ")[2].innerHTML = price;
	        $("#SELEconfirm label ")[3].innerHTML = catolog;
	        $("#SELEconfirm label ")[4].innerHTML = type;
	        $("#SELEconfirm label ")[5].innerHTML = mask;
	        $("#SELEconfirm label ")[6].innerHTML = code;

	        $("#SELEconfirm input ")[0].value = num;

	        $("#SELEconfirm").removeClass("hidden");
	        $(".mask").removeClass("hidden");

	    });


	    //初始化查询到的商品信息表
	    SeleInfoAPI = $('.mySeleTableInfo').DataTable({

	        //	"searching":false,
	        "bLengthChange": false,
	        "iDisplayLength": 8,
	        "oLanguage": {
	            "sZeroRecords": "对不起，查询不到任何相关数据",
	            "sInfo": "共 _TOTAL_条记录",
	            "sInfoEmtpy": "找不到相关数据",
	            "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
	            "sProcessing": "正在加载中...",
	            "sSearch": "查询",
	            "oPaginate": {
	                "sFirst": "第一页",
	                "sPrevious": " 上一页 ",
	                "sNext": " 下一页 ",
	                "sLast": " 最后一页 "
	            },
	            "sLengthMenu": "<div class='before' >每页显示</div>" + "<select  id='sele2' class='form-control input-xsmall'>" +
	                '<option value="2">2</option>' +
	                '<option value="4">4</option>' +
	                '<option value="6">6</option>' +
	                '<option value="8">8</option>' +
	                '<option value="10">10</option>' +
	                '<option value="12">12</option>' +
	                "</select><div class='behind'>条记录</div>",

	        }
	    });

	    //radio 改变事件 
	    $('input[type=radio][name=inType]').change(function() {

	        if (this.value == 1) {
	            $('#confirm_1').attr('disabled', 'true');
	            $("#city_5").removeClass("hidden");
	            $(".userAddress").addClass("hidden");
	            $(".addAddress").addClass("hidden");
	        } else {
	            var b = document.getElementById("selAddressUser");
	            if ('-1' == $('#selAddressUser option:selected').val());
	            else
	                $('#confirm_1').removeAttr('disabled');

	            $("#city_5").addClass("hidden");
	            $(".userAddress").removeClass("hidden");
	            $(".addAddress").addClass("hidden");
	        }
	    });

	    //隐藏表中的列
	    getGoodCapture();

	});


	$(document).ready(function() {
	    var dat = [];
	    $.ajax({
	        data: null,
	        type: "post",
	        dataType: 'json',
	        cache: false,
	        async: false,
	        url: "./UserStore/getStoreUser.do",
	        error: function(data) {
	            alert("请先登录！");
	            window.location.href = "login.html";
	        },
	        success: function(data) {
	            for (var i = 0; i < data.getStoreUserInfo.length; i++) {
	                var va = { 'name': data.getStoreUserInfo[i].name, 'value': data.getStoreUserInfo[i].quantity, color: '#4572a7' };
	                dat.push(va);
	            }
	        }
	    });
	    //给搜索框添加样式
	    $("input[type=search]").addClass("form-control");
	    $(function() {

	        var chart = new iChart.Column2D({
	            render: 'canvasDiv',
	            data: dat,
	            title: {
	                text: '您的当前库存',
	                color: '#3e576f'
	            },
	            subtitle: {
	                text: '',
	                color: '#6d869f'
	            },

	            width: 800,
	            height: 400,
	            label: {
	                fontsize: 11,
	                color: '#666666'
	            },
	            animation: true, //开启过渡动画
	            animation_duration: 800, //800ms完成动画
	            shadow: true,
	            shadow_blur: 2,
	            shadow_color: '#aaaaaa',
	            shadow_offsetx: 1,
	            shadow_offsety: 0,
	            column_width: 62,
	            sub_option: {
	                listeners: {
	                    parseText: function(r, t) {
	                        return t;
	                    }
	                },
	                label: {
	                    fontsize: 11,
	                    fontweight: 600,
	                    color: '#4572a7'
	                },
	                border: {
	                    width: 2,
	                    color: '#ffffff'
	                }
	            },
	            coordinate: {
	                background_color: null,
	                grid_color: '#c0c0c0',
	                width: 680,
	                axis: {
	                    color: '#c0d0e0',
	                    width: [0, 0, 1, 0]
	                },
	                scale: [{
	                    position: 'left',
	                    start_scale: 0,
	                    end_scale: 2000,
	                    scale_space: 200,
	                    scale_enable: false,
	                    label: {
	                        fontsize: 11,
	                        color: '#666666'
	                    }
	                }]
	            }
	        });

	        /**
	         *利用自定义组件构造左侧说明文本。
	         */
	        chart.plugin(new iChart.Custom({
	            drawFn: function() {
	                /**
	                 *计算位置
	                 */
	                var coo = chart.getCoordinate(),
	                    x = coo.get('originx'),
	                    y = coo.get('originy'),
	                    H = coo.height;
	                /**
	                 *在左侧的位置，设置逆时针90度的旋转，渲染文字。
	                 */
	                chart.target.textAlign('center')
	                    .textBaseline('middle')
	                    .textFont('600 13px Verdana')
	                    .fillText('库存总量', x - 40, y + H / 2, false, '#6d869f', false, false, false, -90);

	            }
	        }));

	        chart.draw();
	    });

	    /*动态折线图 */
	    $(function() {
	        var flow = [];
	        var ass = [];
	        var labels = [];
	        var info = "";
	        $.ajax({
	            data: info,
	            type: "post",
	            dataType: 'json',
	            // contentType: "application/json",
	            cache: false,
	            async: false,
	            url: "./UserStore/getStoreUserPlus.do",
	            error: function(data) {
	                alert("请先登录！");
	                window.location.href = "login.html";
	            },
	            success: function(data) {

	                var newDate = new Date();

	                for (var i = 0; i < data.history_in.length; i++) {
	                    newDate.setTime(data.history_in[i].date);
	                    flow.push(data.history_in[i].quantity);
	                    ass.push(data.history_in[i].goodName);
	                    labels.push(newDate.toLocaleString());
	                }


	                for (var i = 0; i < data.history_out.length; i++) {
	                    newDate.setTime(data.history_out[i].date);
	                    flow.push(data.history_out[i].quantity);
	                    ass.push(data.history_out[i].goodName);
	                    labels.push(newDate.toLocaleString());
	                }

	            }
	        });

	        var data = [{
	            name: 'PV',
	            value: flow,
	            color: '#1e90ff',
	            line_width: 2
	        }];

	        var chart = new iChart.LineBasic2D({
	            render: 'canvasDiv1',
	            data: data,
	            align: 'center',
	            title: {
	                text: '出入库数量',
	                font: '微软雅黑',
	                fontsize: 24,
	                color: '#b4b4b4'
	            },
	            subtitle: {
	                text: '提供您的当前库存申请',
	                font: '微软雅黑',
	                color: '#b4b4b4'
	            },

	            width: 800,
	            height: 400,
	            shadow: true,
	            shadow_color: '#ffffff',
	            shadow_blur: 8,
	            shadow_offsetx: 0,
	            shadow_offsety: 0,
	            background_color: '#FFFFFF',
	            animation: true, //开启过渡动画
	            animation_duration: 600, //600ms完成动画
	            tip: {
	                enable: true,
	                shadow: true,
	                listeners: {
	                    //tip:提示框对象、name:数据名称、value:数据值、text:当前文本、i:数据点的索引
	                    parseText: function(tip, name, value, text, i) {
	                        return "<span style='color:#005268;font-size:12px;'>" + ass[i] + "数量:<br/>" +
	                            "</span><span style='color:#005268;font-size:20px;'>" + value + "箱</span>";
	                    }
	                }
	            },
	            //交叉线
	            crosshair: {
	                enable: true,
	                line_color: '#ec4646'
	            },
	            //
	            sub_option: {
	                smooth: true,
	                label: false,
	                hollow: false,
	                hollow_inside: false,
	                point_size: 8
	            },
	            //坐标轴
	            coordinate: {
	                width: 640,
	                height: 260,
	                striped_factor: 0.18,
	                grid_color: '#4e4e4e',
	                axis: {
	                    color: '#b1b1b1',
	                    width: [0, 0, 4, 4]
	                },
	                scale: [{
	                    position: 'left',
	                    start_scale: 0,
	                    end_scale: 2000,
	                    scale_space: 200,
	                    scale_size: 2,
	                    scale_enable: false,
	                    label: { color: '#9d987a', font: '微软雅黑', fontsize: 11, fontweight: 600 },
	                    scale_color: '#9f9f9f'
	                }, {
	                    position: 'bottom',
	                    label: { color: '#9d987a', font: '微软雅黑', fontsize: 11, fontweight: 600 },
	                    scale_enable: false,
	                    labels: labels
	                }]
	            }
	        });
	        //利用自定义组件构造左侧说明文本
	        chart.plugin(new iChart.Custom({
	            drawFn: function() {
	                //计算位置
	                var coo = chart.getCoordinate(),
	                    x = coo.get('originx'),
	                    y = coo.get('originy'),
	                    w = coo.width,
	                    h = coo.height;
	                //在左上侧的位置，渲染一个单位的文字
	                chart.target.textAlign('start')
	                    .textBaseline('bottom')
	                    .textFont('600 11px 微软雅黑')
	                    .fillText('单位箱', x - 40, y - 12, false, '#9d987a')
	                    .textBaseline('top')
	                    .fillText('', x + w + 12, y + h + 10, false, '#9d987a');

	            }
	        }));
	        //开始画图
	        chart.draw();
	    });



	});
	/*点击导航栏的效果*/
	function show_welcome_section() {
	    $("#welcome_section").removeClass("hidden");
	    setTimeout(function() {
	        $("#email_subscribe_section").addClass("hidden");
	        $("#InOrOut").addClass("hidden");
	        $("#my_info_section").addClass("hidden");
	        $("#IOcode").addClass("hidden");
	        $("#bbTable").addClass("hidden");
	    }, 500);

	    recovery();

	}

	function show_my_info_section() {
	    $("#my_info_section").removeClass("hidden");
	    setTimeout(function() {
	        $("#welcome_section").addClass("hidden");
	        $("#email_subscribe_section").addClass("hidden");
	        $("#InOrOut").addClass("hidden");
	        $("#IOcode").addClass("hidden");
	        $("#bbTable").addClass("hidden");
	    }, 500);
	    recovery();
	}

	function show_email_subscribe_section() {
	    $("#email_subscribe_section").removeClass("hidden");
	    setTimeout(function() {
	        $("#welcome_section").addClass("hidden");
	        $("#InOrOut").addClass("hidden");
	        $("#my_info_section").addClass("hidden");
	        $("#IOcode").addClass("hidden");
	        $("#bbTable").addClass("hidden");
	    }, 500);

	    recovery();
	}

	function show_InOrOut() {
	    $(".loading").removeClass("hidden");
	    $("#InOrOut").removeClass("hidden");
	    setTimeout(function() {
	        $("#welcome_section").addClass("hidden");
	        $("#email_subscribe_section").addClass("hidden");
	        $("#my_info_section").addClass("hidden");
	        $("#IOcode").addClass("hidden");
	        $("#bbTable").addClass("hidden");
	    }, 500);
	    SeleInfoAPI.clear().draw(true);
	    InfoAPI.clear().draw(true);
	    var info = $(".search_input").val();
	    InfoAPI.column(7).visible(false).draw(false);
	    $.ajax({
	        data: info,
	        type: "post",
	        dataType: 'json',
	        cache: false,
	        async: true,
	        url: "./UserStore/getStoreUser.do",
	        error: function(data) {
	            alert("请先登录！");
	            window.location.href = "login.html";
	        },
	        success: function(data) {
	            var vi = JSON.stringify(data);
	            var newDate = new Date();
	            var goodID;
	            var warehouseID;
	            var quantity;
	            var remark;
	            var code;
	            var name;
	            var price;
	            var classID;

	            for (var i = 0; i < data.getStoreUserInfo.length; i++) {
	                code = data.getStoreUserInfo[i].code;
	                warehouseID = data.getStoreUserInfo[i].warehouseID;
	                name = data.getStoreUserInfo[i].name;
	                goodID = data.getStoreUserInfo[i].goodID;
	                price = data.getStoreUserInfo[i].price;
	                classID = goodCapture[data.getStoreUserInfo[i].classID - 1].name;
	                quantity = data.getStoreUserInfo[i].quantity;
	                remark = data.getStoreUserInfo[i].remark;
	                InfoAPI.row.add([name, goodID, price, classID, quantity, warehouseID, remark, code]).draw(false);
	                //$(".mySeleTableInfo tbody tr ")[data.history_out.length+data.history_in.length+i].style.color="red";
	            }
	        }
	    });
	    $(".loading").addClass("hidden");
	    recovery();
	}

	function show_IOcode() {
	    $("#IOcode").removeClass("hidden");
	    setTimeout(function() {
	        $("#welcome_section").addClass("hidden");
	        $("#email_subscribe_section").addClass("hidden");
	        $("#InOrOut").addClass("hidden");
	        $("#my_info_section").addClass("hidden");
	    }, 500);
	    recovery();
	}
	///////////////////////////////////////////////////////
	var flag = 1; //标志变量 

	//所选商品表的伸缩
	$(document).ready(function() {
	    $(".ellipsis").dblclick(function() {
	        //  alert(flag);
	        if (flag == 1) /*修改2  删除这一行*/ { /*修改2  删除这一行*/
	            $(".ellipsis").animate({
	                left: '0px',
	                height: '+=0px',
	                width: '+=590px'
	            });
	            $(".cover").addClass("hidden");
	            flag = 2;
	        }
	    });

	    $(".glyphicon-arrow-left").click(function() {
	        //  alert(flag);
	        if (flag == 2) {
	            $(".ellipsis").animate({
	                left: '0px',
	                height: '+=0px',
	                width: '-=590px'
	            });

	            flag = 1;
	        }
	    });
	});


	function showCover() {

	    if ($(".ellipsis").css("width") == "230px" && checked == "false") //如果是小窗口
	    {
	        $(".cover").removeClass("hidden");
	        //			alert($(".ellipsis").css("width"));
	    }

	}

	function disCover() {
	    $(".cover").addClass("hidden");

	}

	// 隐藏
	function disINconfirm() {
	    $("#INconfirm").addClass("hidden");
	    $(".mask").addClass("hidden"); /*修改 添加这一行*/

	}
	// 隐藏
	function disOUTconfirm() {
	    $("#OUTconfirm").addClass("hidden");
	    $(".mask").addClass("hidden"); /*修改 添加这一行*/

	}

	function disSELEconfirm() {
	    $("#SELEconfirm").addClass("hidden");
	    $(".mask").addClass("hidden"); /*修改 添加这一行*/
	    flag = 2;

	}

	function disop() {
	    $(".operate_border").addClass("hidden");
	    $(".mask").addClass("hidden"); /*修改 添加这一行*/
	}

	function disaddsp() {
	    $(".addsp").addClass("hidden");
	    $(".mask").addClass("hidden"); /*修改 添加这一行*/
	}
	//提交数据
	function submitForm() {
	    SeleAPI.column(7).visible(true).draw(false);
	    var infoArray = [];
	    var InInfo = new Object();
	    var warehouseID;
	    var val = $('input:radio[name="inType"]:checked').val();
	    if (val == 2) //需要送取货服务
	    {
	        warehouseID = "Y:" + $("#selAddressUser option:selected").val();
	        // var info=new Object();
	        // info.code=null;
	        // info.opCode=null;
	        // info.warehouseID=$("#warehouseArea option:selected").val();
	        // info.goodID=
	        //     $("#selAddressUser option:selected").val();

	        // var prov = $("#prov5 option:selected").text(); //获取下拉框中选择的数据
	        // var city = $("#city5 option:selected").text(); //获取下拉框中选择的数据
	        // var area5 = $("#area5 option:selected").text(); //获取下拉框中选择的数据
	        // var detailAds = $(".detailAds").val(); //详细地址
	    }
	    if (val == 1) //不需要送取货服务
	    {
	        warehouseID = "N:" + $("#warehouseArea option:selected").val();
	    }

	    for (var i = 0; i < SeleAPI.rows().data().length; i++) {
	        InInfo.goodName = SeleAPI.rows().data()[i][0];
	        InInfo.tGoodID = SeleAPI.rows().data()[i][1];
	        InInfo.price = SeleAPI.rows().data()[i][2];
	        for (var g = 0; g < goodCapture.length; g++) {
	            if (goodCapture[g].name == SeleAPI.rows().data()[i][3])
	                InInfo.classID = goodCapture[g].code;
	        }
	        InInfo.quantity = Number(SeleAPI.rows().data()[i][5]);
	        InInfo.remark = SeleAPI.rows().data()[i][6];
	        InInfo.goodID = SeleAPI.rows().data()[i][7];
	        InInfo.code = SeleAPI.rows().data()[i][8];
	        InInfo.opCode = "#";
	        InInfo.userID = "#";
	        InInfo.warehouseID = warehouseID;
	        infoArray.push(InInfo);
	    }

	    $.ajax({
	        data: JSON.stringify(infoArray),
	        type: "post",
	        dataType: 'json',
	        contentType: "application/json",
	        url: 'UserStore/upStoreUser.do',
	        cache: false,
	        async: true,
	        error: function(data) {
	            alert("请先登录！");
	            window.location.href = "login.html";
	        },
	        success: function(data) {
	            alert(data.back_upStoreUser);
	        }
	    });
	    var num = SeleAPI.page.info().recordsTotal; //数据的总行数

	    for (var i = 0; i < num; i++) //遍历表格中的数据
	    {
	        var sendData = SeleAPI.row(i).data();
	    }
	    for (var i = 0; i < num; i++) //清空表格中的数据
	    {
	        SeleAPI.row().remove().draw(false); //删除默认第一行
	    }

	    $(".operate_border").removeClass("hidden"); //显示操作码框
	    $(".mask").removeClass("hidden"); /*修改 添加这一行*/
	}

	function submitClean() {
	    var num = SeleAPI.page.info().recordsTotal;
	    for (var i = 0; i < num; i++) //清空表格中的数据
	    {
	        SeleAPI.row().remove().draw(false); //删除默认第一行
	    }
	}

	//入库 添加
	/*修改 修改的函数 添加了 判断 只有在输入是数字是才会添加 否则 alert */
	function addSeleIn() {
	    var isNumber = inputChange2();
	    if (isNumber == true) {
	        SeleAPI.row.add([
	            $("#INconfirm label ")[0].innerHTML,
	            $("#INconfirm label ")[1].innerHTML,
	            $("#INconfirm label ")[2].innerHTML,
	            $("#INconfirm label ")[3].innerHTML,
	            $("#INconfirm label ")[4].innerHTML,

	            $("#INconfirm input ")[0].value,
	            $("#INconfirm label ")[5].innerHTML,
	            $("#INconfirm label ")[6].innerHTML,
	            "入库",
	        ]).draw(false);
	        $("#INconfirm").addClass("hidden");
	        $(".mask").addClass("hidden"); /*修改 添加这一行*/
	    }
	}
	//出库 添加
	/*修改 修改的函数 添加了 判断 只有在输入是数字是才会添加 否则 alert */
	function addSeleOut() {
	    var isNumber = inputChange3();
	    var b = $("#OUTconfirm label ")[4].innerHTML;
	    var a = $("#OUTconfirm input ")[0].value;
	    if (parseInt(a) > parseInt(b))
	        a = b;
	    if (isNumber == true) {
	        SeleAPI.row.add([
	            $("#OUTconfirm label ")[0].innerHTML,
	            $("#OUTconfirm label ")[1].innerHTML,
	            $("#OUTconfirm label ")[2].innerHTML,
	            $("#OUTconfirm label ")[3].innerHTML,
	            $("#OUTconfirm label ")[4].innerHTML,

	            a,
	            $("#OUTconfirm label ")[5].innerHTML,
	            $("#OUTconfirm label ")[6].innerHTML,
	            "出库",
	        ]).draw(false);
	        $("#OUTconfirm").addClass("hidden");
	        $(".mask").addClass("hidden");
	    }
	}

	function showaddsp() {
	    $(".addsp").removeClass("hidden");
	    $(".mask").removeClass("hidden");
	}

	//ajax 例子
	function show(type) {
	    $(".select").removeClass("hidden");
	    //		alert(type);	
	    $("#IO").text(type);


	    $("#username").slideToggle();
	    $("#pwd").slideToggle();
	    var info = new Array();
	    var store = new Object();
	    store.uid = "002";
	    store.pwd = "123";
	    info[0] = store;

	    //	alert(info[0].uid.toString()+":"+info.length);

	    //	alert(JSON.stringify(info));


	    $.ajax({
	        data: info,
	        type: "GET",
	        dataType: 'json',
	        url: "./UserStore/getStoreUser.do",
	        error: function(data) {
	            alert("出错了！！:" + data.msg);
	        },
	        success: function(data) {
	            var vi = JSON.stringify(data);

	            for (var i = 0; i < data.length; i++) {
	                var name = data.getStoreUserInfo[i].name;
	                var goodID = data.getStoreUserInfo[i].goodID;
	                var price = data.getStoreUserInfo[i].price;
	                var classID = data.getStoreUserInfo[i].classID;
	                var remark = data.getStoreUserInfo[i].remark;
	                API4.row.add([name, goodID, price, classID, "箱", remark]).draw(false);
	            }
	        }
	    });


	    API4.row.add([123, 123, 123, 123, 1234, 123]).draw(false);


	}

	/*修改 修改的函数 添加了 判断 只有在输入是数字是才会修改 否则 alert */
	function alterTableSele() {
	    var isNumber = inputChange();
	    if (isNumber == true) {
	        sTable.rows[curent].cells[5].innerHTML = $("#SELEconfirm input ")[0].value;

	        $("#SELEconfirm").addClass("hidden");
	        $(".mask").addClass("hidden");
	        flag = 2;
	    }
	}

	function deleteRowSele() {
	    //	sInput.deleteRow(curent);

	    SeleAPI.row('.selected').remove().draw(false);
	    $("#SELEconfirm").addClass("hidden");
	    $(".mask").addClass("hidden");
	    flag = 2;
	}

	//手动添加一行数据
	function add() {
	    SeleAPI.row.add([
	        $(".addsp input:eq(0)").val(),
	        $(".addsp input:eq(1)").val(),
	        $(".addsp input:eq(2)").val(),
	        $(".addsp select option:selected").text(),
	        '-',
	        $(".addsp input:eq(3)").val(),
	        "备注:" + $(".addsp input:eq(4)").val(),
	        '-',
	        "入库"
	    ]).draw(false);

	    $(".addsp").addClass("hidden");
	    $(".mask").addClass("hidden");
	}





	/////////////////
	var t;
	//查询数据
	function chaxun() {
	    // var num = SeleInfoAPI.page.info().recordsTotal; //数据的总行数
	    // for (var i = 1; i <= num; i++) {
	    //     SeleInfoAPI.row().remove().draw(false); //删除默认第一行
	    // }


	    $("#welcomediv").addClass("hidden");
	    $(".InputOrOutput").removeClass("hidden");
	    $(".ellipsis").addClass("hidden");
	    $("#div_right").addClass("hidden");

	    var info = { "info": $("#search_input").val() };
	    $.ajax({
	        data: info,
	        type: "post",
	        dataType: 'json',
	        // contentType: "application/json",
	        cache: false,
	        async: true,
	        url: "./UserStore/getStoreUserPlus.do",
	        error: function(data) {
	            alert("请先登录！");
	            window.location.href = "login.html";
	        },
	        success: function(data) {
	            SeleInfoAPI.clear().draw(true);
	            var vi = data;
	            var newDate = new Date();
	            var goodID;
	            var warehouseID;
	            var operationCode;
	            var quantity;
	            var date;
	            var remark;
	            var code;
	            var name;
	            var price;
	            var classID;

	            for (var i = 0; i < data.history_store.length; i++) {
	                warehouseID = data.history_store[i].warehouseID;
	                name = data.history_store[i].name;
	                goodID = data.history_store[i].goodID;
	                price = data.history_store[i].price;
	                classID = goodCapture[data.history_store[i].classID - 1].name;
	                quantity = data.history_store[i].quantity;
	                remark = data.history_store[i].remark;
	                SeleInfoAPI.row.add([name, goodID, price, classID, quantity, warehouseID, '-', '-', remark, '库存中']).draw(false);
	                //$(".mySeleTableInfo tbody tr ")[data.history_out.length+data.history_in.length+i].style.color="red";
	            }

	            for (var i = 0; i < data.history_in.length; i++) {
	                goodID = data.history_in[i].goodID;
	                goodName = data.history_in[i].goodName;
	                operationCode = data.history_in[i].opcode;
	                warehouseID = data.history_in[i].warehouseID;
	                quantity = data.history_in[i].quantity;
	                classID = goodCapture[data.history_in[i].classID - 1].name;
	                price = data.history_in[i].price;
	                newDate.setTime(data.history_in[i].date);
	                date = newDate.toLocaleString();
	                remark = data.history_in[i].remark;
	                SeleInfoAPI.row.add([goodName, goodID, price, classID, quantity, warehouseID, date, operationCode, remark, '已入库']).draw(false);
	                //$(".mySeleTableInfo tbody tr ")[data.history_out.length+i].style.color="#595959";
	            }


	            for (var i = 0; i < data.history_out.length; i++) {
	                goodName = data.history_out[i].goodName;
	                goodID = data.history_out[i].goodID;
	                price = data.history_out[i].price;
	                classID = goodCapture[data.history_out[i].classID - 1].name;
	                warehouseID = data.history_out[i].warehouseID;
	                operationCode = data.history_out[i].opID;
	                quantity = data.history_out[i].quantity;
	                newDate.setTime(data.history_out[i].date);
	                date = newDate.toLocaleString();
	                remark = data.history_out[i].remark;
	                SeleInfoAPI.row.add([goodName, goodID, price, classID, quantity, warehouseID, date, operationCode, remark, '已出库']).draw(false);
	                //$(".mySeleTableInfo tbody tr ")[i].style.color="gray";
	            }

	            for (var i = 0; i < data.history_ininfo.length; i++) {
	                warehouseID = data.history_ininfo[i].warehouseID;
	                name = data.history_ininfo[i].goodName;
	                goodID = data.history_ininfo[i].tGoodID;
	                price = data.history_ininfo[i].price;
	                classID = goodCapture[data.history_ininfo[i].classID - 1].name;
	                quantity = data.history_ininfo[i].quantity;
	                remark = data.history_ininfo[i].remark;
	                operationCode = data.history_ininfo[i].opCode;
	                SeleInfoAPI.row.add([name, goodID, price, classID, quantity, warehouseID, '-', operationCode, remark, '待入库']).draw(false);
	                //$(".mySeleTableInfo tbody tr ")[data.history_out.length+data.history_in.length+i].style.color="red";
	            }

	            for (var i = 0; i < data.history_outinfo.length; i++) {
	                warehouseID = data.history_outinfo[i].warehouseID;
	                name = data.history_outinfo[i].goodName;
	                goodID = data.history_outinfo[i].tGoodID;
	                price = data.history_outinfo[i].price;
	                classID = goodCapture[data.history_outinfo[i].classID - 1].name;
	                quantity = data.history_outinfo[i].quantity;
	                remark = data.history_outinfo[i].remark;
	                operationCode = data.history_outinfo[i].opCode;
	                SeleInfoAPI.row.add([name, goodID, price, classID, quantity, warehouseID, '-', operationCode, remark, '待出库']).draw(false);
	                //$(".mySeleTableInfo tbody tr ")[data.history_out.length+data.history_in.length+i].style.color="red";
	            }
	            $(".loading").addClass("hidden");
	        }
	    });

	}
	//出入库
	function InputOrOutput() {
	    $("#welcomediv").addClass("hidden");
	    $(".InputOrOutput").addClass("hidden");
	    $(".ellipsis").removeClass("hidden");
	    $("#div_right").removeClass("hidden");
	}

	function over(id) {
	    $(".welcome>div>div:eq(" + id + ")").css("background", "rgba(23, 110, 134, 0.5)");
	    $("#" + (id + 1) + (id + 1)).removeClass("hidden");
	    //		$(".welcome img:eq("+id+")").css("opacity": "0.2","-webkit-transform":"scale(1)","transform": "scale(1)");
	}

	function out(id) {

	    t = setTimeout("out2(" + id + ")", 200);
	}

	function out2(id) {
	    $(".welcome>div>div:eq(" + id + ")").css("background", "rgba(255, 255, 255, 0.5)");
	    $("#" + (id + 1) + (id + 1)).addClass("hidden");


	}

	function over2() {
	    clearTimeout(t);
	}

	function showCover() {

	    if ($(".ellipsis").css("width") == "230px" && checked == "false") //如果是小窗口
	    {
	        $(".cover").removeClass("hidden");
	        //			alert($(".ellipsis").css("width"));
	    }

	}

	function disCover() {
	    $(".cover").addClass("hidden");
	}

	var checked = "false";

	function is_checked() {
	    var statues = $("#checked").is(':checked');
	    //	alert(statues);
	    if (statues) {
	        checked = "ture";
	    } else {
	        checked = "false";
	    }
	}

	function showAddAddress() {
	    $(".userAddress").addClass("hidden");
	    $(".addAddress").removeClass("hidden");

	}

	function addAddress() {

	    var info = new Object();
	    info.address = $('#prov5 option:selected').text() + '%' + $('#city5 option:selected').text() + '%' + $('#area5 option:selected').text() + ":" + $('#inputAddress').val();
	    $.ajax({
	        data: info,
	        type: "post",
	        dataType: 'json',
	        url: "./UserStore/addAddressUser.do",
	        cache: true,
	        async: true,
	        error: function(data) {
	            alert("请先登录！");
	            window.location.href = "login.html";
	        },
	        success: function(data) {
	            alert("添加成功" + data.data);
	        }
	    });
	}
	/*修改  添加函数校验*/

	function inputChange() {
	    var test = $("#SELEconfirm input ")[0].value; //获取输入框的值
	    if (!isNaN(test) && (test != "")) /*修改2 修改判断条件*/ {
	        /*修改2 修改整个函数体*/
	        test = parseInt(test) + 1 - 1;
	        $("#SELEconfirm input")[0].value = test;
	        if (test > 0 && test < 10000)
	            return true;
	        else {
	            alert("数据不在0~~9999");
	            return false;
	        }
	    } else {
	        alert("不是数字或输入为空"); /*修改2 修改提示信息*/
	        return false;
	    }
	}
	/*修改  添加函数校验*/

	function inputChange2() {
	    var test = $("#INconfirm input ")[0].value; //获取输入框的值

	    if ((!isNaN(test)) && (test != "")) /*修改2 修改判断条件*/ {
	        /*修改2 修改整个函数体*/
	        test = parseInt(test) + 1 - 1;
	        $("#INconfirm input")[0].value = test;
	        if (test > 0 && test < 10000)
	            return true;
	        else {
	            alert("数据不在0~~9999");
	            return false;
	        }
	    } else {
	        alert("不是数字或输入为空"); /*修改2 修改提示信息*/
	        return false;
	    }
	}
	/*修改  添加函数校验*/

	function inputChange3() {
	    var test = $("#OUTconfirm input ")[0].value; //获取输入框的值
	    if (!isNaN(test) && (test != "")) /*修改2 修改判断条件*/ {
	        /*修改2 修改整个函数体*/
	        test = parseInt(test) + 1 - 1;
	        $("#OUTconfirm input")[0].value = test;
	        if (test > 0 && test < 10000)
	            return true;
	        else {
	            alert("数据不在0~~9999");
	            return false;
	        }
	    } else {
	        alert("不是数字或输入为空"); /*修改2 修改提示信息*/
	        return false;
	    }
	}


	/*修改2 添加下面两个函数*/
	$(document).ready(function() {
	    //加的效果
	    $(".add").click(function() {
	        var n = $(this).prev().val();
	        var num = parseInt(n) + 1;
	        if (num == 0) { return; }
	        $(this).prev().val(num);
	    });
	    //减的效果
	    $(".jian").click(function() {
	        var n = $(this).next().val();
	        var num = parseInt(n) - 1;
	        if (num == 0) { return }
	        $(this).next().val(num);
	    });
	})

	//倒计时

	var countdown = 60;

	function settime(val) {
	    if (countdown == 0) {
	        val.removeAttr("disabled");
	        val.val("重新生成");
	        countdown = 60;
	    } else {
	        val.attr('disabled', "true");
	        val.val("重新生成(" + countdown + ")");
	        countdown--;

	        setTimeout(function() { settime(val) }, 1000);
	    }

	}
	//返回操作状态
	function getOperateStatus() {
	    var info = { "operateCode": $("#contact_name_opcode").val() };
	    $.ajax({
	        data: info,
	        type: "post",
	        dataType: 'json',
	        url: 'UserStore/getCodeNumber.do',
	        cache: false,
	        async: true,
	        error: function(data) {
	            window.location.href = "login.html";
	        },
	        success: function(data) {
	            $("#operateStatus").val(data.status);
	            $("#operateManager").val(data.managerID);
	        }
	    });
	}
	//提交操作码
	function createIOcode() {
	    //若果成功执行下面的代码
	    $("#IOmessage").addClass("hidden");
	    $("#IOcreate").removeClass("hidden");
	    $("#evaluate").removeClass("hidden");
	    //如果失败执行下面的代码
	    //	$("#IOmessage").addClass("hidden");
	    //	$("#errorPage").removeClass("hidden");
	    var info = { "operateCode": $("#contact_name_opcode").val() };
	    $.ajax({
	        data: info,
	        type: "post",
	        dataType: 'json',
	        url: 'UserStore/getCodeNumber.do',
	        cache: false,
	        async: true,
	        error: function(data) {
	            window.location.href = "login.html";
	        },
	        success: function(data) {
	            $("#userOCode").val(data.data);
	        }
	    });
	    var btn = $("#re_send");
	    settime(btn); //倒计时
	}
	//恢复”生成出入库操作码“界面布局
	function recovery() {
	    $("#IOmessage").removeClass("hidden");
	    $("#IOcreate").addClass("hidden");
	    $("#evaluate").addClass("hidden");
	}

	//左侧导航栏（显示与隐藏）

	var win = $(window);
	var element1 = $("#InOrOut");
	var element2 = $("#IOcode");
	var element3 = $("#email_subscribe_section");
	//element.offset().top + element.height() <= win.scrollTop()+0.5*win.height()
	win.scroll(function() {

	    if (element1.offset().top >= win.scrollTop() + 0.4 * win.height() || element1.offset().top + element1.height() <= win.scrollTop() + 0.5 * win.height())
	    //不在第一个div中
	    {
	        if (element2.offset().top >= win.scrollTop() + 0.4 * win.height() || element2.offset().top + element2.height() <= win.scrollTop() + 0.5 * win.height())
	        //不在第二个div中
	        {
	            if (element3.offset().top >= win.scrollTop() + 0.4 * win.height() || element3.offset().top + element3.height() <= win.scrollTop() + 0.5 * win.height())
	            //不在第三个div中
	            {
	                $("#nav_side").addClass("hidden");
	            } else {
	                $("#nav_side").removeClass("hidden");
	            }
	        } else {
	            $("#nav_side").removeClass("hidden");
	        }
	    } else {
	        $("#nav_side").removeClass("hidden");

	    }
	})



	/*左侧导航栏  结束*/

	//提交评价
	function sub_evaluate() {
	    var evaluate;
	    if ($("#starScore1").is(":checked")) {
	        evaluate = 1;
	    }
	    if ($("#starScore2").is(":checked")) {
	        evaluate = 2;
	    }
	    if ($("#starScore3").is(":checked")) {
	        evaluate = 3;
	    }
	    if ($("#starScore4").is(":checked")) {
	        evaluate = 4;
	    }
	    if ($("#starScore5").is(":checked")) {
	        evaluate = 5;
	    }

	}

	//左侧导航栏
	var sq_Or_zk_flag = 1;

	function sq_Or_zk() {
	    if (sq_Or_zk_flag == 1) {
	        $("#nav_menu").animate({
	            width: "0px",
	        });
	        $("#nav_side i").removeClass("glyphicon-chevron-left");
	        $("#nav_side i").addClass("glyphicon-chevron-right");
	        sq_Or_zk_flag = 2;
	    } else {
	        if (sq_Or_zk_flag == 2) {

	            $("#nav_menu").animate({
	                width: "112px",
	            });
	            $("#nav_side i").removeClass("glyphicon-chevron-right");
	            $("#nav_side i").addClass("glyphicon-chevron-left");
	            sq_Or_zk_flag = 1;
	        }
	    }
	}
	//重新生成操作码
	function regenerate() {
	    var btn = $("#re_send");
	    settime(btn); //倒计时
	}

	function logout() {
	    $.ajax({
	        data: null,
	        type: "post",
	        dataType: 'json',
	        url: 'user/logout',
	        cache: false,
	        async: true,
	        error: function(data) {
	            window.location.href = "login.html";
	        },
	        success: function(data) {
	            window.location.href = data.data;
	        }
	    });
	}

	function getGoodCapture() {
	    var temp_ajax;
	    $.ajax({
	        data: temp_ajax,
	        type: "post",
	        dataType: 'json',
	        url: "./UserStore/getGoodCapture.do",
	        cache: true,
	        async: true,
	        error: function(data) {},
	        success: function(data) {
	            goodCapture = data.goodCapture;
	            $("#classID").empty();
	            var b = document.getElementById("classID");
	            for (var v = 0; v < goodCapture.length; v++) {
	                b.options.add(new Option(goodCapture[v].name, goodCapture[v].code));
	            }
	        }
	    });
	}

	function getAddressUser() {
	    $.ajax({
	        data: null,
	        type: "post",
	        dataType: 'json',
	        url: "./UserStore/getAddressUser.do",
	        cache: true,
	        async: true,
	        error: function(data) {
	            alert("请先登录！");
	            window.location.href = "login.html";
	        },
	        success: function(data) {
	            $("#selAddressUser").empty();
	            var b = document.getElementById("selAddressUser");
	            if (data.userAddress.length == 0) {
	                $('#confirm_1').attr('disabled', 'true');
	                b.options.add(new Option("尚未添加地址，请先添加地址", "-1"));
	            } else {
	                $('#confirm_1').removeAttr('disabled');
	                for (var v = 0; v < data.userAddress.length; v++) {
	                    //if(data.warehouse[v].state)
	                    b.options.add(new Option(data.userAddress[v].address, data.userAddress[v].indexA + ':' + data.userAddress[v].warehouseID));
	                }
	            }
	        }
	    });
	}

	function show_bbTable() {
	    $("#bbTable").removeClass("hidden");
	    setTimeout(function() {
	        $("#email_subscribe_section").addClass("hidden");
	        $("#InOrOut").addClass("hidden");
	        $("#my_info_section").addClass("hidden");
	        $("#IOcode").addClass("hidden");
	        $("#welcome_section").addClass("hidden");
	    }, 500);

	    recovery();
	}

	function addressWarehouse() {
	    var address = new Object();;
	    address.address = $('#prov6 option:selected').text() + '%' + $('#city6 option:selected').text() + '%' + $('#area6 option:selected').text();
	    $.ajax({
	        data: address,
	        type: "post",
	        dataType: 'json',
	        url: "./UserStore/getWarehouse.do",
	        cache: true,
	        async: true,
	        error: function(data) {
	            alert("请先登录！");
	            window.location.href = "login.html";
	        },
	        success: function(data) {
	            $("#warehouseArea").empty();
	            var b = document.getElementById("warehouseArea");
	            if (data.warehouse.length == 0) {
	                $('#confirm_1').attr('disabled', 'true');
	                b.options.add(new Option("所选地区暂无服务", "-1"));
	            } else {
	                $('#confirm_1').removeAttr('disabled');
	                for (var v = 0; v < data.warehouse.length; v++) {
	                    //if(data.warehouse[v].state)
	                    b.options.add(new Option(data.warehouse[v].name, data.warehouse[v].code));
	                }
	            }
	        }
	    });
	}