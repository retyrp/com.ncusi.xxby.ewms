var curent;
var data;
var InfoAPI, SeleAPI, SeleInfoAPI;
var goodCapture;

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


// 隐藏
function disINconfirm() {
    $("#INconfirm").addClass("hidden");
    $(".mask").addClass("hidden");
}
// 隐藏
function disOUTconfirm() {
    $("#OUTconfirm").addClass("hidden");
    $(".mask").addClass("hidden");
}

function disSELEconfirm() {
    $("#SELEconfirm").addClass("hidden");
    $(".mask").addClass("hidden");
    flag = 2;
}

function disop() {
    $(".operate_border").addClass("hidden");
    $(".mask").addClass("hidden");
}

function disaddsp() {
    $(".addsp").addClass("hidden");
    $(".mask").addClass("hidden");
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
    SeleAPI.column(7).visible(false).draw(false);
    $(".operate_border").removeClass("hidden"); //显示操作码框
    $(".mask").removeClass("hidden");
}


//入库 添加
function addSeleIn() {
    $("#cover1").height($("#tableleft1").height());
    var isNumber = inputChange2();
    var a = $("#INconfirm input ")[0].value;
    if (a > $("#INconfirm label ")[4].innerHTML)
        a = $("#INconfirm label ")[4].innerHTML;
    if (isNumber == true) {
        SeleAPI.row.add([
            $("#INconfirm label ")[0].innerHTML,
            $("#INconfirm label ")[1].innerHTML,
            $("#INconfirm label ")[2].innerHTML,
            $("#INconfirm label ")[3].innerHTML,
            $("#INconfirm label ")[4].innerHTML,

            a,
            $("#INconfirm label ")[5].innerHTML,
            $("#INconfirm label ")[6].innerHTML,
            "入库",
        ]).draw(false);
        $("#INconfirm").addClass("hidden");
        $(".mask").addClass("hidden");
    } //else {
    //     alert("不是数字  输入不合法");
    // }
}
//出库 添加
function addSeleOut() {
    var isNumber = inputChange3();
    if (isNumber == true) {
        SeleAPI.row.add([
            $("#OUTconfirm label ")[0].innerHTML,
            $("#OUTconfirm label ")[1].innerHTML,
            $("#OUTconfirm label ")[2].innerHTML,
            $("#OUTconfirm label ")[3].innerHTML,
            $("#OUTconfirm label ")[4].innerHTML,

            $("#OUTconfirm input ")[0].value,
            $("#OUTconfirm label ")[5].innerHTML,
            $("#OUTconfirm label ")[6].innerHTML,
            "出库",
        ]).draw(false);
        $("#OUTconfirm").addClass("hidden");
        $(".mask").addClass("hidden");
    } //else {
    //     alert("输入数据不合法");
    // }
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
        cache: false,
        async: true,
        error: function(data) {
            alert("请先登录！");
            window.location.href = "login.html";
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


function alterTableSele() {
    var isNumber = inputChange();
    if (isNumber == true) {
        sTable.rows[curent].cells[5].innerHTML = $("#SELEconfirm input ")[0].value;

        $("#SELEconfirm").addClass("hidden");
        $(".mask").addClass("hidden");

        flag = 2;
    } //else {
    //     alert("输入数据不合法");
    // }
}

function deleteRowSele() {
    //	sInput.deleteRow(curent);

    SeleAPI.row('.selected').remove().draw(false);
    $("#SELEconfirm").addClass("hidden");
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


//////////////////////////////////////////////////////////
var flag = 1; //标志变量

//所选商品表的伸缩
$(document).ready(function() {
    $(".ellipsis").dblclick(function() {
        //  alert(flag);
        if (flag == 1) {
            $(".ellipsis").animate({
                left: '0px',
                height: '+=0px',
                width: '+=570px'
            });
            $(".cover").addClass("hidden");
            flag = 2;
        } //else {
        // if (flag == 2) {
        //     $(".ellipsis").animate({
        //         left: '0px',
        //         height: '+=0px',
        //         width: '-=570px'
        //     });

        //     flag = 1;
        // }
        // }
    });
    $(".glyphicon-arrow-left").click(function() {
        //  alert(flag);
        if (flag == 2) {
            $(".ellipsis").animate({
                left: '0px',
                height: '+=0px',
                width: '-=570px'
            });

            flag = 1;
        }
    });
});



/////////////////
var t;
//查询数据
function chaxun() {
    $(".loading").removeClass("hidden");
    $("#welcomediv").addClass("hidden");
    $(".InputOrOutput").removeClass("hidden");
    $(".ellipsis").addClass("hidden");
    $("#div_right").addClass("hidden");

    var info = { "info": $(".search_input ").val() };
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
    $(".loading").removeClass("hidden");
    $("#welcomediv").addClass("hidden");
    $(".InputOrOutput").addClass("hidden");
    $(".ellipsis").removeClass("hidden");
    $("#div_right").removeClass("hidden");
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
//添加地址
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

function showAddAddress() {
    $('#confirm_1').attr('disabled', 'true');
    $(".userAddress").addClass("hidden");
    $(".addAddress").removeClass("hidden");
}

function inputChange() {
    var test = $("#SELEconfirm input ")[0].value; //获取输入框的值
    if (!isNaN(test) && (test != "")) {
        test = parseInt(test) + 1 - 1;
        $("#SELEconfirm input")[0].value = test;
        if (test > 0 && test < 10000)
            return true;
        else {
            alert("数据不在0~~9999");
            return false;
        }
    } else {
        alert("不是数字或输入为空");
        return false;
    }
}
/*修改  添加函数校验*/

function inputChange2() {
    var test = $("#INconfirm input ")[0].value; //获取输入框的值
    if ((!isNaN(test)) && (test != "")) {
        test = parseInt(test) + 1 - 1;
        $("#INconfirm input")[0].value = test;
        if (test > 0 && test < 10000)
            return true;
        else {
            alert("数据不在0~~9999");
            return false;
        }
        return true;
    } else {
        alert("不是数字或输入为空");
        return false;
    }
}
/*修改  添加函数校验*/

function inputChange3() {
    var test = $("#OUTconfirm input ")[0].value; //获取输入框的值
    if (!isNaN(test) && (test != "")) {
        test = parseInt(test) + 1 - 1;
        $("#OUTconfirm input")[0].value = test;
        if (test > 0 && test < 10000)
            return true;
        else {
            alert("数据不在0~~9999");
            return false;
        }
        return true;
    } else {
        alert("不是数字或输入为空");
        return false;
    }
}
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

function clear() {
    var num = SeleAPI.page.info().recordsTotal; //数据的总行数

    for (var i = 0; i < num; i++) //遍历表格中的数据
    {
        var sendData = SeleAPI.row(i).data();
    }
    for (var i = 0; i < num; i++) //清空表格中的数据
    {
        SeleAPI.row().remove().draw(false); //删除默认第一行
    }
    SeleAPI.column(7).visible(false).draw(false);
}

function logout() {
    $.ajax({
        data: login,
        type: "post",
        dataType: 'json',
        url: 'user/logout.do',
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