//改变 显示页
function page_change(id) {
    removeActive();
    $("#page_" + id + "_nav").addClass("active-menu");
    disAllPage();
    $("#page_" + id).css('display', 'block');
}


//移除所有的active-menu类
function removeActive() {
    $("#page_info_nav").removeClass("active-menu");
    $("#page_worker_info_nav").removeClass("active-menu");
    $("#page_InOrOut_nav").removeClass("active-menu");
    $("#page_stock_part_nav").removeClass("active-menu");
    $("#page_stock_all_nav").removeClass("active-menu");
    $("#page_apply_move_nav").removeClass("active-menu");
    $("#page_select_move_nav").removeClass("active-menu");
    $("#page_store_manager_nav").removeClass("active-menu");
    $("#page_store_task_nav").removeClass("active-menu");
    $("#page_goods_manager_nav").removeClass("active-menu");
    $("#page_operate_task_nav").removeClass("active-menu");


}
//隐藏所有的页
function disAllPage() {
    $("#page_info").css('display', 'none'); //个人信息
    $("#page_worker_info").css('display', 'none'); //员工信息管理
    $("#page_InOrOut").css('display', 'none'); //出入库
    $("#page_stock_part").css('display', 'none'); //部分库存
    $("#page_stock_all").css('display', 'none'); //全部库存
    $("#page_apply_move").css('display', 'none'); //申请移库
    $("#page_select_move").css('display', 'none'); //移库查询
    $("#page_store_manager").css('display', 'none'); //库存管理
    $("#page_store_task").css('display', 'none'); //库存任务
    $("#page_goods_manager").css('display', 'none'); //库存任务
    $("#page_operate_task").css('display', 'none'); //日志

}

//	
var curentRow;
var InOrOutAPI, worker_info_deleteAPI, worker_auth_alterAPI, InfoAPI, SeleAPI, select_moveAPI, stock_partAPI, store_managerAPI, store_taskAPI, goods_managerAPI, operate_logAPI;
$(document).ready(function() {

    $.ajax({
        data: null,
        type: "post",
        dataType: 'json',
        url: 'Manager/2/access',
        cache: false,
        async: true,
        error: function(data) {
            level = 2;
        },
        success: function(data) {
            $(".adm_login").addClass("hidden");

            var level = data.access;
            if (level == 2) {}
            if (level == 1) {
                $(".level_2").removeClass("hidden");
            }
            if (level == 0) {
                $(".level_2").removeClass("hidden");
                $(".level_3").removeClass("hidden");
            }

        }
    });
    //初始化“库存任务表”
    store_taskAPI = $(".store_task").DataTable({

        "oLanguage": {
            "sZeroRecords": "没有查到库存任务",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_条记录",
            "sInfoEmtpy": "找不到相关数据",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
            "sProcessing": "正在加载中...",
            "sSearch": "搜索",
            "oPaginate": {
                "sFirst": "第一页",
                "sPrevious": " 上一页 ",
                "sNext": " 下一页 ",
                "sLast": " 最后一页 "
            },
            "sLengthMenu": "<div style='float:left;padding-top:5px;' class='before' >每页显示</div>" + "<select  style='float:left;width:70px;' id='sele2' class='form-control input-xsmall'>" +
                '<option value="2">2</option>' +
                '<option value="4">4</option>' +
                '<option value="6">6</option>' +
                '<option value="8">8</option>' +
                '<option value="10">10</option>' +
                '<option value="12">12</option>' +
                "</select><div  style='float:left;padding-top:5px;' class='behind'>条记录</div>",

        }
    });
    //给“库存任务表” 每一行添加click事件
    $('.store_task tbody').on('click', 'tr', function() {

        curentRow = this.rowIndex; //获取当前的行

        $("#store_task_confirm").removeClass("hidden"); //显示弹出框
        $(".mask").removeClass("hidden"); //显示遮罩层

        var context1 = this.cells[0].childNodes[0].textContent; //获取此行第一个单元格的值，childNodes[0]指此单元格子节点的第一个子节点  
        var context2 = this.cells[1].childNodes[0].textContent; ////获取此行第二个单元格的值  
        var context3 = this.cells[2].childNodes[0].textContent; ////获取此行第三个单元格的值 
        var context4 = this.cells[3].childNodes[0].textContent; ////获取此行第四个单元格的值  
        var context5 = this.cells[4].childNodes[0].textContent; //
        var context6 = this.cells[5].childNodes[0].textContent; //库存数量
        var context7 = this.cells[6].childNodes[0].textContent;
        var context8 = this.cells[7].childNodes[0].textContent;
        var context9 = this.cells[8].childNodes[0].textContent;
        var context10 = this.cells[9].childNodes[0].textContent;
        //赋值
        $("#store_task_confirm input ")[0].value = context1;
        $("#store_task_confirm input ")[1].value = context2;
        $("#store_task_confirm input ")[2].value = context3;
        $("#store_task_confirm input ")[3].value = context4;
        $("#store_task_confirm input ")[4].value = context5;
        $("#store_task_confirm input ")[5].value = context6;
        $("#store_task_confirm input ")[6].value = context7;
        $("#store_task_confirm input ")[7].value = context8;
        $("#store_task_confirm input ")[8].value = context9;
        $("#store_task_confirm input ")[9].value = context10;

    });
    //初始化“出/入库明细表”
    InOrOutAPI = $('.InOrOut').DataTable({
        "oLanguage": {
            "sZeroRecords": "没有查到商品信息",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_条记录",
            "sInfoEmtpy": "找不到相关数据",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
            "sProcessing": "正在加载中...",
            "sSearch": "结果中搜索",
            "oPaginate": {
                "sFirst": "第一页",
                "sPrevious": " 上一页 ",
                "sNext": " 下一页 ",
                "sLast": " 最后一页 "
            },
            "sLengthMenu": "<div style='float:left;padding-top:5px;' class='before' >每页显示</div>" + "<select  style='float:left;width:70px;' id='sele2' class='form-control input-xsmall'>" +
                '<option value="2">2</option>' +
                '<option value="4">4</option>' +
                '<option value="6">6</option>' +
                '<option value="8">8</option>' +
                '<option value="10">10</option>' +
                '<option value="12">12</option>' +
                "</select><div  style='float:left;padding-top:5px;' class='behind'>条记录</div>",

        }
    });


    //初始化“删除员工表”
    worker_info_deleteAPI = $(".worker_info_delete").DataTable({

        "searching": false,
        "bLengthChange": false,
        "iDisplayLength": 8,
        "oLanguage": {
            "sZeroRecords": "没有查到相应员工",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_条记录",
            "sInfoEmtpy": "找不到相关数据",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
            "sProcessing": "正在加载中...",
            "sSearch": "搜索",
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
    //给“删除员工表” 每一行添加click事件
    $('.worker_info_delete tbody').on('click', 'tr', function() {

        curentRow = this.rowIndex; //获取当前的行

        $("#worker_info_add_confirm").removeClass("hidden"); //显示弹出框
        $(".mask").removeClass("hidden"); //显示遮罩层

        var ID = this.cells[0].childNodes[0].textContent; //获取此行第一个单元格的值，childNodes[0]指此单元格子节点的第一个子节点  
        var name = this.cells[1].childNodes[0].textContent; ////获取此行第二个单元格的值  
        var sex = this.cells[2].childNodes[0].textContent; ////获取此行第三个单元格的值 
        var birth = this.cells[3].childNodes[0].textContent; ////获取此行第四个单元格的值  
        var phone = this.cells[4].childNodes[0].textContent; //
        var email = this.cells[5].childNodes[0].textContent; //库存数量
        var addresss = this.cells[6].childNodes[0].textContent;
        var store = this.cells[7].childNodes[0].textContent;
        var estimate = this.cells[8].childNodes[0].textContent;
        var remark = this.cells[9].childNodes[0].textContent;
        //赋值
        $("#worker_info_add_confirm label ")[0].innerHTML = ID;
        $("#worker_info_add_confirm label ")[1].innerHTML = name;
        $("#worker_info_add_confirm label ")[2].innerHTML = sex;
        $("#worker_info_add_confirm label ")[3].innerHTML = birth;
        $("#worker_info_add_confirm label ")[4].innerHTML = phone;
        $("#worker_info_add_confirm label ")[5].innerHTML = email;
        $("#worker_info_add_confirm label ")[6].innerHTML = addresss;
        $("#worker_info_add_confirm label ")[7].innerHTML = store;
        $("#worker_info_add_confirm label ")[8].innerHTML = estimate;
        $("#worker_info_add_confirm label ")[9].innerHTML = remark;

    });
    //初始化“权限修改表”
    worker_auth_alterAPI = $(".worker_auth_alter").DataTable({

        "searching": false,
        "bLengthChange": false,
        "iDisplayLength": 8,
        "oLanguage": {
            "sZeroRecords": "没有查到相应员工",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_条记录",
            "sInfoEmtpy": "找不到相关数据",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
            "sProcessing": "正在加载中...",
            "sSearch": "搜索",
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
    //给“权限修改” 每一行添加click事件
    $('.worker_auth_alter tbody').on('click', 'tr', function() {

        curentRow = this.rowIndex; //获取当前的行

        $("#worker_auth_alter_confirm").removeClass("hidden"); //显示弹出框
        $(".mask").removeClass("hidden"); //显示遮罩层

        var ID = this.cells[0].childNodes[0].textContent; //获取此行第一个单元格的值，childNodes[0]指此单元格子节点的第一个子节点  
        var name = this.cells[1].childNodes[0].textContent; ////获取此行第二个单元格的值  
        var sex = this.cells[2].childNodes[0].textContent; ////获取此行第三个单元格的值 
        var birth = this.cells[3].childNodes[0].textContent; ////获取此行第四个单元格的值  
        var phone = this.cells[4].childNodes[0].textContent; //
        var email = this.cells[5].childNodes[0].textContent; //库存数量
        var addresss = this.cells[6].childNodes[0].textContent;
        var store = this.cells[7].childNodes[0].textContent;
        var estimate = this.cells[8].childNodes[0].textContent;
        var remark = this.cells[9].childNodes[0].textContent;
        var auto = this.cells[10].childNodes[0].textContent;
        //赋值
        $("#worker_auth_alter_confirm label ")[0].innerHTML = ID;
        $("#worker_auth_alter_confirm label ")[1].innerHTML = name;
        $("#worker_auth_alter_confirm label ")[2].innerHTML = sex;
        $("#worker_auth_alter_confirm label ")[3].innerHTML = birth;
        $("#worker_auth_alter_confirm label ")[4].innerHTML = phone;
        $("#worker_auth_alter_confirm label ")[5].innerHTML = email;
        $("#worker_auth_alter_confirm label ")[6].innerHTML = addresss;
        $("#worker_auth_alter_confirm label ")[7].innerHTML = store;
        $("#worker_auth_alter_confirm label ")[8].innerHTML = estimate;
        $("#worker_auth_alter_confirm label ")[9].innerHTML = remark;
        $("#worker_auth_alter_confirm input ")[0].value = auto;

    });


    //初始化“部分库存表”
    stock_partAPI = $(".stock_part").DataTable({

        "searching": false,
        "bLengthChange": false,
        "iDisplayLength": 8,
        "oLanguage": {
            "sZeroRecords": "没有商品信息",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_条记录",
            "sInfoEmtpy": "找不到相关数据",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
            "sProcessing": "正在加载中...",
            "sSearch": "结果中搜索",
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


    //初始化“移库查询表”
    select_moveAPI = $(".select_move").DataTable({

        "searching": false,
        "bLengthChange": false,
        "iDisplayLength": 8,
        "oLanguage": {
            "sZeroRecords": "没有查到相应操作",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_条记录",
            "sInfoEmtpy": "找不到相关数据",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
            "sProcessing": "正在加载中...",
            "sSearch": "搜索",
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

    //给“移库查询” 每一行添加click事件
    $('.select_move tbody').on('click', 'tr', function() {

        curentRow = this.rowIndex; //获取当前的行

    });
    getGoodCapture();


    //初始化“仓库管理表”
    store_managerAPI = $(".store_manager").DataTable({

        "searching": false,
        "bLengthChange": false,
        "iDisplayLength": 8,
        "oLanguage": {
            "sZeroRecords": "没有查到相应仓库",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_条记录",
            "sInfoEmtpy": "找不到相关数据",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
            "sProcessing": "正在加载中...",
            "sSearch": "搜索",
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
    //给“仓库管理表” 每一行添加click事件
    $('.store_manager tbody').on('click', 'tr', function() {

        curentRow = this.rowIndex; //获取当前的行

        $("#store_manager_confirm").removeClass("hidden"); //显示弹出框
        $(".mask").removeClass("hidden"); //显示遮罩层

        var context1 = this.cells[0].childNodes[0].textContent; //获取此行第一个单元格的值，childNodes[0]指此单元格子节点的第一个子节点  
        var context2 = this.cells[1].childNodes[0].textContent; ////获取此行第二个单元格的值  
        var context3 = this.cells[2].childNodes[0].textContent; ////获取此行第三个单元格的值 
        var context4 = this.cells[3].childNodes[0].textContent; ////获取此行第四个单元格的值  
        var context5 = this.cells[4].childNodes[0].textContent; //
        var context6 = this.cells[5].childNodes[0].textContent; //库存数量
        var context7 = this.cells[6].childNodes[0].textContent;


        //赋值
        $("#store_manager_confirm input ")[0].value = context1;
        $("#store_manager_confirm input ")[1].value = context2;
        $("#store_manager_confirm input ")[2].value = context3;
        $("#store_manager_confirm input ")[3].value = context4;
        $("#store_manager_confirm input ")[4].value = context5;
        $("#store_manager_confirm input ")[5].value = context6;
        $("#store_manager_confirm input ")[6].value = context7;



    });


    //初始化“商品管理表”
    goods_managerAPI = $(".goods_manager").DataTable({

        "searching": false,
        "bLengthChange": false,
        "iDisplayLength": 8,
        "oLanguage": {
            "sZeroRecords": "请添加商品操作内容",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_条记录",
            "sInfoEmtpy": "找不到相关数据",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
            "sProcessing": "正在加载中...",
            "sSearch": "搜索",
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
    //给“商品管理表” 每一行添加click事件
    $('.goods_manager tbody').on('click', 'tr', function() {

        curentRow = this.rowIndex; //获取当前的行

        $("#goods_manager_confirm").removeClass("hidden"); //显示弹出框
        $(".mask").removeClass("hidden"); //显示遮罩层

        var context1 = this.cells[0].childNodes[0].textContent; //获取此行第一个单元格的值，childNodes[0]指此单元格子节点的第一个子节点  
        var context2 = this.cells[1].childNodes[0].textContent; ////获取此行第二个单元格的值  
        var context3 = this.cells[2].childNodes[0].textContent; ////获取此行第三个单元格的值 
        var context4 = this.cells[3].childNodes[0].textContent; ////获取此行第四个单元格的值  


        //赋值
        $("#goods_manager_confirm input ")[0].value = context1;
        $("#goods_manager_confirm input ")[1].value = context2;
        $("#goods_manager_confirm input ")[2].value = context3;
        $("#goods_manager_confirm input ")[3].value = context4;


    });


    //初始化“操作日志表”
    operate_logAPI = $(".operate_log").DataTable({

        "bLengthChange": false,
        "iDisplayLength": 8,
        "oLanguage": {
            "sZeroRecords": "没有查到相应日志",
            "sInfo": "当前显示 _START_ 到 _END_ 条，共 _TOTAL_条记录",
            "sInfoEmtpy": "找不到相关数据",
            "sInfoFiltered": "数据表中共为 _MAX_ 条记录)",
            "sProcessing": "正在加载中...",
            "sSearch": "结果中查询",
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



    ///////
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
            "sSearch": "结果中查询",
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

        var name = this.cells[0].childNodes[0].textContent; //获取此行第一个单元格的值，childNodes[0]指此单元格子节点的第一个子节点  
        var id = this.cells[1].childNodes[0].textContent; ////获取此行第二个单元格的值  
        var price = this.cells[2].childNodes[0].textContent; ////获取此行第三个单元格的值 
        var catolog = this.cells[3].childNodes[0].textContent; ////获取此行第四个单元格的值  
        var type = this.cells[4].childNodes[0].textContent; //
        var num = this.cells[5].childNodes[0].textContent; //库存数量


        //赋值
        $("#INconfirm label ")[0].innerHTML = name;
        $("#INconfirm label ")[1].innerHTML = id;
        $("#INconfirm label ")[2].innerHTML = price;
        $("#INconfirm label ")[3].innerHTML = catolog;
        $("#INconfirm label ")[4].innerHTML = type;
        $("#INconfirm label ")[5].innerHTML = num;

        $("#INconfirm input ")[0].value = ""; //清空输入框	

        //	alert(TeacherName+CourseType+CourseName);
    });
    //给商品信息表 每个td添加click事件

    /*修改*/
    $('.myTableInfo').on('click', 'td', function() {
        var col = this.cellIndex;
        $(".mask").removeClass("hidden"); /*修改 添加这一行*/
        $("#INconfirm").removeClass("hidden");
    });


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
    //给所选商品表的每一行添加click事件
    $('.myTableSele tbody').on('click', 'tr', function() {

        curent = this.rowIndex;

        flag = 3;

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
        $(".mask").removeClass("hidden"); /*修改 添加这一行*/

    });

    //radio 改变事件 
    $('input[type=radio][name=inType]').change(function() {
        if (this.value == 1) {
            $("#city_5").removeClass("hidden");
            $(".userAddress").addClass("hidden");
            $(".addAddress").addClass("hidden");
        } else {

            $("#city_5").addClass("hidden");
            $(".userAddress").removeClass("hidden");
            $(".addAddress").addClass("hidden");
        }
    });

});


//////////////////////
var flag = 1; //标志变量 

//所选商品表的伸缩
$(document).ready(function() {
    $(".ellipsis").dblclick(function() {
        //  alert(flag);
        if (flag == 1) /*修改2  删除这一行*/ { /*修改2  删除这一行*/
            $(".ellipsis").animate({
                left: '0px',
                height: '+=0px',
                width: '+=570px'
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
                width: '-=570px'
            });

            flag = 1;
        }

    });
});

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


    var num = SeleAPI.page.info().recordsTotal; //数据的总行数

    $(".operate_border").removeClass("hidden"); //显示操作码框
    $(".mask").removeClass("hidden"); /*修改 添加这一行*/
    var c = [];
    for (var i = 0; i < num; i++) {} {
        var v = new Object();
        v.goodID = SeleAPI.row(0).data()[0];
        v.aimID = $("#warehouseArea option:selected").val();
        v.quantity = SeleAPI.row(0).data()[4];
        v.d;
        v.e;
        v.f;
        v.g;
        v.h;
        c.push(v);
    }
    $.ajax({
        data: v,
        type: "post",
        dataType: 'json',
        url: 'Manager/1/applyMove.do',
        cache: false,
        async: true,
        error: function(data) {
            alert(JSON.stringify(data));
        },
        success: function(data) {
            alert(JSON.stringify(data));
        }
    });

    for (var i = 0; i < num; i++) //清空表格中的数据
    {
        SeleAPI.row().remove().draw(false); //删除默认第一行
    }
}


//入库 添加
/*修改 修改的函数 添加了 判断 只有在输入是数字是才会添加 否则 alert */
function addSeleIn() {
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
            a,
            $("#INconfirm label ")[5].innerHTML,
            '移库'
        ]).draw(false);
        $("#INconfirm").addClass("hidden");
        $(".mask").addClass("hidden"); /*修改 添加这一行*/
    }
    /*修改2  删除下面的else 提示信息在inputchange中做*/
    /*		else
    		{
    			alert("输入数据不合法");
    		}
    */

}
//出库 添加
/*修改 修改的函数 添加了 判断 只有在输入是数字是才会添加 否则 alert */
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
    }
    /*修改2  删除下面的else 提示信息在inputchange中做*/
    /*		else
    		{
    			alert("输入数据不合法");
    		}
    */
}

function showaddsp() {
    $(".addsp").removeClass("hidden");
    $(".mask").removeClass("hidden");
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
    /*修改2  删除下面的else 提示信息在inputchange中做*/
    /*		else
    		{
    			alert("输入数据不合法");
    		}
    */
}

function deleteRowSele() {
    //	sInput.deleteRow(curent);

    SeleAPI.row('.selected').remove().draw(false);
    $("#SELEconfirm").addClass("hidden");
    $(".mask").addClass("hidden");
    flag = 2;
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


//switch 开关改变
function swith_change() {
    if ($("#radio").is(':checked')) //开关打开 单选框选中
    {
        $(".maskAll").removeClass("hidden");
    }
}
//检测输入框是否为空
function check_input() {

    if ($("#need_check").val() == "") {
        $("#need_change_button").attr("disabled", "true");
    } else {
        $("#need_change_button").removeAttr("disabled");
    }
}
/*第一页 库存任务*/ ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//点击库存查询按钮 执行
function store_task_select() {
    var inputData = $("#store_task input")[0].value;
    // if (inputData != "") {
    //     store_task_add(); //向表中插入数据
    // } else {
    //     alert("请输入数据");
    //     var num = store_taskAPI.page.info().recordsTotal; //数据的总行数
    //     for (var i = 0; i < num; i++) //清除表中的所有数据
    //     {
    //         store_taskAPI.row().remove().draw(false);
    //     }
    // }
    $(".loading").removeClass("hidden");
    var info = { "info": inputData };
    $.ajax({
        data: info,
        type: "post",
        dataType: 'json',
        // contentType: "application/json",
        cache: false,
        async: true,
        url: "Manager/2/getStoreUndo.do",
        error: function(data) {
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            store_taskAPI.clear().draw(true);
            var vi = data;
            var newDate = new Date();
            var tgoodID;
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


            for (var i = 0; i < data.operation_in.length; i++) {
                code = data.operation_in[i].code;
                warehouseID = data.operation_in[i].warehouseID;
                name = data.operation_in[i].goodName;
                tgoodID = data.operation_in[i].tGoodID;
                goodID = data.operation_in[i].GoodID;
                if (goodID == null)
                    goodID = '-';
                price = data.operation_in[i].price;
                classID = goodCapture[data.operation_in[i].classID - 1].name;
                quantity = data.operation_in[i].quantity;
                remark = data.operation_in[i].remark;
                store_taskAPI.row.add([code, name, goodID, price, classID, quantity, warehouseID, tgoodID, remark, '待入库']).draw(false);
                //$(".mySeleTableInfo tbody tr ")[data.history_out.length+data.history_in.length+i].style.color="red";
            }
            for (var i = 0; i < data.operation_out.length; i++) {
                code = data.operation_out[i].code;
                warehouseID = data.operation_out[i].warehouseID;
                name = data.operation_out[i].goodName;
                tgoodID = data.operation_out[i].tGoodID;
                goodID = data.operation_out[i].GoodID;
                if (goodID == null)
                    goodID = '-';
                price = data.operation_out[i].price;
                classID = goodCapture[data.operation_out[i].classID - 1].name;
                quantity = data.operation_out[i].quantity;
                remark = data.operation_out[i].remark;
                store_taskAPI.row.add([code, name, goodID, price, classID, quantity, warehouseID, tgoodID, remark, '待出库']).draw(false);
                //$(".mySeleTableInfo tbody tr ")[data.history_out.length+data.history_in.length+i].style.color="red";
            }
            $(".loading").addClass("hidden");
        }
    });

}
//通过这个函数向“移库查询中标”中添加数据
function store_task_add() {
    var num = 5; //插入数据的总条数

    for (var i = 1; i <= num; i++) //循环插入
    {
        store_taskAPI.row.add([
            i,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
        ]).draw(false);
    }
}

//confirm 删除
function store_task_confirm_delete() {
    var data = store_taskAPI.row(curentRow - 1).data(); //获取要删除的这一行的数据
    //	alert(data);
    store_taskAPI.row(curentRow - 1).remove().draw(false);
    $("#store_task_confirm").addClass("hidden"); //隐藏弹出框
    $(".mask").addClass("hidden"); //隐藏遮罩层
}
//confirm 修改
function store_task_confirm_alter() {
    //	worker_auth_alter_table.rows[curentRow].cells[10].innerHTML=$("#worker_auth_alter_confirm input ")[0].value;//修改表中数据
    for (var i = 0; i < 10; i++) {
        var test = $("#store_task_confirm input")[i].value;
        //		alert(test);
        store_task_table.rows[curentRow].cells[i].innerHTML = test;
    }
    $("#store_task_confirm").addClass("hidden"); //隐藏弹出框
    $(".mask").addClass("hidden"); //隐藏遮罩层
}
//confirm  取消
function store_task_confirm_cancel() {
    $("#store_task_confirm").addClass("hidden"); //隐藏弹出框
    $(".mask").addClass("hidden"); //隐藏遮罩层
}
/*第一页 库存任务（结束）*/
/*第二页 出/入库操作*/ ///////////////////////////////////////////////////////////////////////////////////////////////////////////////

//点击查询按钮执行的操作
function show_inventory() {
    $(".loading").addClass("hidden");
    var inputData = $("#page_InOrOut .header input").val(); //获取用户输入的出/入库码
    $("#page_InOrOut .header input").val(""); //清除输入
    if (inputData != "") //判断输入用户输入的数据是否为空
    {
        $("#inventory").removeClass("hidden"); //显示“出入库商品明细”

        $(".loading").removeClass("hidden");
        var info = { "info": inputData };
        $.ajax({
            data: info,
            type: "post",
            dataType: 'json',
            // contentType: "application/json",
            cache: false,
            async: true,
            url: "Manager/2/doOperationStore.do",
            error: function(data) {
                $(".adm_login").removeClass("hidden");
            },
            success: function(data) {
                InOrOutAPI.clear().draw(true);
                var vi = data;
                var newDate = new Date();
                var tgoodID;
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


                for (var i = 1; i <= data.operation_in.length; i++) {
                    code = data.operation_in[i - 1].code;
                    warehouseID = data.operation_in[i - 1].warehouseID;
                    name = data.operation_in[i - 1].goodName;
                    tgoodID = data.operation_in[i - 1].tGoodID;
                    goodID = data.operation_in[i - 1].GoodID;
                    if (goodID == null)
                        goodID = '-';
                    price = data.operation_in[i - 1].price;
                    classID = goodCapture[data.operation_in[i - 1].classID - 1].name;
                    quantity = data.operation_in[i - 1].quantity;
                    remark = data.operation_in[i - 1].remark;
                    InOrOutAPI.row.add([code, name, goodID, price, classID, quantity, warehouseID, tgoodID, remark, '待入库', "<input type='button' value='装箱'name='" + i + ":in:" + code + "' onclick='success(this.name)' ></input> <input name='" + i + ":in:" + code + "' type='button' value='完成入库' onclick='fail(this.name)'></input>", ]).draw(false);
                    //$(".mySeleTableInfo tbody tr ")[data.history_out.length+data.history_in.length+i].style.color="red";
                }

                for (var i = 1; i <= data.operation_out.length; i++) {
                    code = data.operation_out[i - 1].code;
                    warehouseID = data.operation_out[i - 1].warehouseID;
                    name = data.operation_out[i - 1].goodName;
                    tgoodID = data.operation_out[i - 1].tGoodID;
                    goodID = data.operation_out[i - 1].GoodID;
                    if (goodID == null)
                        goodID = '-';
                    price = data.operation_out[i - 1].price;
                    classID = goodCapture[data.operation_out[i - 1].classID - 1].name;
                    quantity = data.operation_out[i - 1].quantity;
                    remark = data.operation_out[i - 1].remark;
                    // var o = document.createElement('input');
                    // o.type = 'button';
                    // o.value = '装箱';
                    // o.setAttribute("onclick", "test(this.name)");
                    InOrOutAPI.row.add([code, name, goodID, price, classID, quantity, warehouseID, tgoodID, remark, '待出库', "<input type='button' value='出箱' name='" + i + ":out:" + code + "' onclick='success(this.name)' ></input> <input type='button' name='" + i + ":out:" + code + "' value='完成出库' onclick='fail(this.name)'></input>", ]).draw(false);
                    //$(".mySeleTableInfo tbody tr ")[data.history_out.length+data.history_in.length+i].style.color="red";
                }
                $(".loading").addClass("hidden");
            }
        });

    } else //为空弹出提示 并且不进行操作
    {
        alert("请输入数据");
        $("#inventory").addClass("hidden"); //隐藏“出入库商品明细”
    }

}
//通过这个函数向“出入库明细表” 中添加数据
function add_inventory() {
    var num = 5; //插入数据的总条数

    for (var i = 1; i <= num; i++) //循环插入
    {
        InOrOutAPI.row.add([
            i,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            "<input type='button' value='完成' onclick='success(" + i + ")' ></input> <input type='button' value='上报' onclick='fail(" + i + ")'></input>",
        ]).draw(false);
    }
}

function success(id) {
    //	alert(id);
    var flag = id.split(":")[1];
    var i = id.split(":")[0];
    id = id.split(":")[2];
    $(".InOrOut tr ")[i].style.backgroundColor = "green"; //改变颜色 
    id = flag + ":" + id;
    var info = { "info": id };
    $.ajax({
        data: info,
        type: "post",
        dataType: 'json',
        url: 'Manager/2/insertStorebox.do',
        cache: false,
        async: true,
        error: function(data) {
            alert(JSON.stringify(data));
        },
        success: function(data) {
            alert(JSON.stringify(data));
        }
    });
    calculate_and_change();
}

function fail(id) {
    //	alert(id);

    var flag = id.split(":")[1];
    var i = id.split(":")[0];
    id = id.split(":")[2];
    $(".InOrOut tr ")[i].style.backgroundColor = "red"; //改变颜色
    id = flag + ":" + id;
    var info = { "info": id };
    $.ajax({
        data: info,
        type: "post",
        dataType: 'json',
        url: 'Manager/2/store.do',
        cache: false,
        async: true,
        error: function(data) {
            alert(JSON.stringify(data));
        },
        success: function(data) {
            alert(JSON.stringify(data));
        }
    });
    calculate_and_change();
}
var size = 0;

function calculate_and_change() {
    size = 0;
    var num = InOrOutAPI.page.info().recordsTotal; //数据的总行数
    for (var i = 0; i < num; i++) {
        var color = $(".InOrOut tbody tr").style.backgroundColor; //获取背景颜色
        if (color == "green" || color == "red") {
            size = size + 1;
        }
        if (size == num) {
            $("#com_button").removeAttr("disabled");
            size = 0;
        }
    }


}

function operate_complete() {
    var num = InOrOutAPI.page.info().recordsTotal; //数据的总行数
    for (var i = 0; i < num; i++) {
        var color = $(".InOrOut tbody tr ")[i].style.backgroundColor; //获取背景颜色
        if (color == "green") //判断背景颜色
        {
            var data = InOrOutAPI.row(i).data(); //获取数据
        }
    }
    for (var i = 0; i < num; i++) //清除表中的所有数据
    {
        InOrOutAPI.row().remove().draw(false);
    }
}

function operate_cancel() {
    $("#inventory").addClass("hidden"); //隐藏“出入库商品明细”
}
/*第二页 出/入库操作 (结束)*/

/*第三页 员工信息管理*/ ///////////////////////////////////////////////////////////////////////////////////////////////////////
function show_worker_info_add() {
    $("#worker_info_add").removeClass("hidden");
    setTimeout(function() {
        $("#worker_info_delete").addClass("hidden");
        $("#worker_info_alter").addClass("hidden");
    }, 500);


}

function show_worker_info_delete() {
    $("#worker_info_delete").removeClass("hidden");
    setTimeout(function() {
        $("#worker_info_add").addClass("hidden");
        $("#worker_info_alter").addClass("hidden");
    }, 500);
}

function show_worker_auth_alter() {
    $("#worker_auth_alter").removeClass("hidden");
    setTimeout(function() {
        $("#worker_info_delete").addClass("hidden");
        $("#worker_info_add").addClass("hidden");
    }, 500);
}
//确认添加
function worker_info_add() {

    var v = new Object();
    v.code = '';
    v.name = $("#worker_info input")[1].value;
    v.sex = $("#worker_info input")[2].value;
    v.birth = $("#worker_info input")[3].value;
    v.phone = $("#worker_info input")[4].value;
    v.mail = $("#worker_info input")[5].value;
    v.address = $("#worker_info input")[6].value;
    v.cridet = $("#worker_info input")[7].value;
    v.warehouse = $("#worker_info input")[8].value;;
    v.star = 0;
    v.remark = $("#worker_info input")[10].value;
    $.ajax({
        data: v,
        type: "post",
        dataType: 'json',
        url: 'Manager/0/add.do',
        cache: false,
        async: true,
        error: function(data) {
            $(".loading").addClass("hidden");
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            alert("操作完成");
        }
    });

    for (var i = 0; i < 11; i++) //清除输入的数据
    {
        $("#worker_info input")[i].value = ""; //清空输入框中的数据
    }


}
//取消
function worker_info_cancel() {
    for (var i = 0; i < 11; i++) {
        $("#worker_info input")[i].value = ""; //清空输入框中的数据
    }
    $("#worker_info_add").addClass("hidden");
}
//删除之前的查询
function worker_info_delete_select() {

    var inputData = $("#worker_info_delete input")[0].value; //获取输入框中的值
    $(".loading").removeClass("hidden");
    var info = { 's': inputData }
    $.ajax({
        data: info,
        type: "post",
        dataType: 'json',
        url: 'Manager/0/search.do',
        cache: false,
        async: true,
        error: function(data) {
            $(".loading").addClass("hidden");
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            var newDate = new Date();
            worker_info_deleteAPI.clear().draw(true);

            for (var i = 0; i < data.result.length; i++) {
                worker_info_deleteAPI.row.add([
                    data.result[i].id,
                    data.result[i].name,
                    data.result[i].sex,
                    data.result[i].birth,
                    data.result[i].phone,
                    data.result[i].mail,
                    data.result[i].address,
                    data.result[i].warehouse,
                    data.result[i].star,
                    data.result[i].remark
                ]).draw(false);
            }
            $(".loading").addClass("hidden");
        }
    });

}
//通过这个方法向"删除表"中添加数据
function worker_info_delete_add() {
    var num = 5; //插入数据的总条数

    for (var i = 1; i <= num; i++) //循环插入
    {
        worker_info_deleteAPI.row.add([
            i,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
        ]).draw(false);
    }
}
//确认删除
function worker_info_delete_complete() {
    //	alert(curentRow);
    var data = worker_info_deleteAPI.row(curentRow - 1).data(); //获取要删除的这一行的数据
    //	alert(data);
    worker_info_deleteAPI.row(curentRow - 1).remove().draw(false);
    $("#worker_info_add_confirm").addClass("hidden"); //隐藏弹出框
    $(".mask").addClass("hidden"); //隐藏遮罩层
    var v = {
        "s": document.getElementById('shanchuyuangong').innerHTML
    };
    $.ajax({
        data: v,
        type: "post",
        dataType: 'json',
        url: 'Manager/0/delete.do',
        cache: false,
        async: true,
        error: function(data) {
            $(".loading").addClass("hidden");
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            alert(JSON.stringify(data));
        }
    });
}
//取消
function worker_info_delete_cancel() {
    $("#worker_info_add_confirm").addClass("hidden"); //显示弹出框
    $(".mask").addClass("hidden"); //显示遮罩层
}
//修改之前的查询
function worker_auth_alter_select() {
    var inputData = $("#worker_auth_alter input")[0].value; //获取输入框中的值
    $(".loading").removeClass("hidden");
    var info = { 's': inputData }
    $.ajax({
        data: info,
        type: "post",
        dataType: 'json',
        url: 'Manager/0/search.do',
        cache: false,
        async: true,
        error: function(data) {
            $(".loading").addClass("hidden");
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {

            var newDate = new Date();
            worker_auth_alterAPI.clear().draw(true);

            for (var i = 0; i < data.result.length; i++) {
                worker_auth_alterAPI.row.add([
                    data.result[i].id,
                    data.result[i].name,
                    data.result[i].sex,
                    data.result[i].birth,
                    data.result[i].phone,
                    data.result[i].mail,
                    data.result[i].address,
                    data.result[i].warehouse,
                    data.result[i].star,
                    data.result[i].remark,
                    '*',
                ]).draw(false);
            }
            $(".loading").addClass("hidden");
        }
    });

}
//通过这个方法向"修改权限表"中添加数据
function worker_auth_alter_add() {
    var num = 5; //插入数据的总条数

    for (var i = 1; i <= num; i++) //循环插入
    {
        worker_auth_alterAPI.row.add([
            i,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            9,
            10,
            11,
        ]).draw(false);
    }
}
//确认修改
function worker_auth_alter_complete() {
    //	alert(curentRow);
    //	alert($("#worker_auth_alter_confirm input ")[0].value);
    worker_auth_alter_table.rows[curentRow].cells[10].innerHTML = $("#worker_auth_alter_confirm input ")[0].value; //修改表中数据
    $("#worker_auth_alter_confirm").addClass("hidden"); //隐藏弹出框
    $(".mask").addClass("hidden"); //隐藏遮罩层

    var v = new Object();
    v.ID = document.getElementById('xiugaiyuangong').innerHTML;
    v.access = $("#worker_auth_alter_confirm input ")[0].value;
    v.c;
    $.ajax({
        data: v,
        type: "post",
        dataType: 'json',
        url: 'Manager/0/update.do',
        cache: false,
        async: true,
        error: function(data) {
            $(".loading").addClass("hidden");
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            alert(JSON.stringify(data));
        }
    });

}
//取消
function worker_auth_alter_cancel() {
    $("#worker_auth_alter_confirm").addClass("hidden"); //隐藏弹出框
    $(".mask").addClass("hidden"); //隐藏遮罩层
}
/*第三页 员工信息管理（结束）*/

/*第四页 库存盘点*/ ////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//下拉框改变的时候触发这个事件
function selectchange() {
    var value = $("#page_stock_part select option:selected").text(); //获取下拉框中 选中的值
    //	alert(value);	
    add_stock_part();
}
//通过这个函数向“部分盘点表中添加数据” 中添加数据
function add_stock_part() {
    var num = 5; //插入数据的总条数

    for (var i = 1; i <= num; i++) //循环插入
    {
        stock_partAPI.row.add([
            i,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            "<input type='button' value='完成' onclick='stock_part_success(" + i + ")' ></input> <input type='button' value='上报' onclick='stock_part_fail(" + i + ")'></input>",
        ]).draw(false);
    }
}

function stock_part_success(id) {
    //	alert(id);
    $(".stock_part tr ")[id].style.backgroundColor = "green"; //改变颜色
    calculate_and_change2();

}

function stock_part_fail(id) {
    //	alert(id);
    $(".stock_part tr ")[id].style.backgroundColor = "red"; //改变颜色
    calculate_and_change2();
}

function calculate_and_change2() {
    size = 0;

    var num = stock_partAPI.page.info().recordsTotal; //数据的总行数

    for (var i = 0; i < num; i++) {
        var color = $(".stock_part tbody tr")[i].style.backgroundColor; //获取背景颜色
        if (color == "green" || color == "red") {
            size = size + 1;
        }

        if (size == num) {
            $("#com_button2").removeAttr("disabled");
            size = 0;
        }
    }
}

function stock_part_complete() {
    var num = stock_partAPI.page.info().recordsTotal; //数据的总行数
    for (var i = 0; i < num; i++) {
        var color = $(".stock_part tbody tr ")[i].style.backgroundColor; //获取背景颜色
        if (color == "green") //判断背景颜色
        {
            var data = stock_partAPI.row(i).data(); //获取数据
        }
    }
    for (var i = 0; i < num; i++) //清除表中的所有数据
    {
        stock_partAPI.row().remove().draw(false);
    }
}

function stock_part_cancel() {
    var num = stock_partAPI.page.info().recordsTotal; //数据的总行数
    for (var i = 0; i < num; i++) //清除表中的所有数据
    {
        stock_partAPI.row().remove().draw(false);
    }
}
/*第四页 库存盘点(结束)*/


/*第五页 移库*/ //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*库存查询*/
//点击库存查询按钮 执行
function select_move() {
    $(".loading").removeClass("hidden");
    var inputData = $("#page_select_move input")[0].value;
    var info = { 's': inputData }
    $.ajax({
        data: info,
        type: "post",
        dataType: 'json',
        url: 'Manager/0/catMove.do',
        cache: false,
        async: true,
        error: function(data) {
            $(".loading").addClass("hidden");
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            var newDate = new Date();
            select_moveAPI.clear().draw(true);

            for (var i = 0; i < data.result.length; i++) {
                newDate.setTime(data.result[i].date);
                select_moveAPI.row.add([
                    data.result[i].code,
                    data.result[i].opID,
                    data.result[i].aimID,
                    data.result[i].sourceID,
                    date = newDate.toLocaleString(),
                    data.result[i].goodID,
                    data.result[i].quantity,
                    "<input type='button' value='批准' name=" + data.result[i].code + " onclick='move_success(this.name)' ></input> <input type='button' value='否决' name=" + data.result[i].code + " onclick='move_fail(this.name)'></input>"
                ]).draw(false);
            }
            $(".loading").addClass("hidden");
        }
    });
}

function move_success(code) {
    var v = new Object();
    v.code = code;
    v.a;
    v.b;
    v.c;
    v.d;
    v.e;
    $.ajax({
        data: v,
        type: "post",
        dataType: 'json',
        url: 'Manager/0/checkApply.do',
        cache: false,
        async: true,
        error: function(data) {
            $(".loading").addClass("hidden");
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            alert("操作完成");
        }
    });

}

function move_fail(code) {
    var v = new Object();
    v.code = code;
    v.a;
    v.b;
    v.c;
    v.d;
    v.e;
    $.ajax({
        data: v,
        type: "post",
        dataType: 'json',
        url: 'Manager/0/checkApply.do',
        cache: false,
        async: true,
        error: function(data) {
            $(".loading").addClass("hidden");
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            alert("操作完成");
        }
    });
}
//通过这个函数向“移库查询中标”中添加数据
function select_move_add() {
    var num = 5; //插入数据的总条数

    for (var i = 1; i <= num; i++) //循环插入
    {
        select_moveAPI.row.add([
            i,
            2,
            3,
            4,
            5,
            6,
            7,
            8,
            "<input type='button' value='完成' onclick='success(" + i + ")' ></input> <input type='button' value='上报' onclick='fail(" + i + ")'></input>",

        ]).draw(false);
    }
}
/*第五页 移库（结束）*/


/*第六页 仓库管理*/ ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//仓库管理
function show_store_add() {
    $("#store_add").removeClass("hidden");
    setTimeout(function() {
        $("#store_rud").addClass("hidden");
    }, 500);
}

function show_store_rud() {
    $("#store_rud").removeClass("hidden");
    setTimeout(function() {
        $("#store_add").addClass("hidden");
    }, 500);


}
//点击“添加”按钮 添加仓库
function store_add() {
    $(".loading").removeClass("hidden");
    var info = new Object();
    info.code = $("#store_info input")[0].value;
    info.name = $("#store_info input")[1].value;
    info.address = $("#store_info input")[2].value;
    info.managerID = $("#store_info input")[3].value;
    info.kind = $("#store_info input")[4].value;
    info.area = $("#store_info input")[5].value;
    info.state = '关闭';
    $.ajax({
        data: info,
        type: "post",
        dataType: 'json',
        url: 'Manager/0/warehouseAdd.do',
        cache: false,
        async: true,
        error: function(data) {
            $(".loading").addClass("hidden");
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            for (var i = 0; i < 6; i++) //清除输入的数据
            {
                $("#store_info input")[i].value = ""; //清空输入框中的数据
            }
            store_manager_select();
            $(".loading").addClass("hidden");
        }
    });
}
//点击“取消”按钮 
function store_cancel() {
    for (var i = 0; i < 6; i++) //清除输入的数据
    {
        $("#store_info input")[i].value = ""; //清空输入框中的数据
    }
    $("#store_add").addClass("hidden"); //隐藏添加框
}
//点击查询按钮
function store_manager_select() {
    $(".loading").removeClass("hidden");
    var inputData = $("#store_rud input")[0].value;
    var info = { "info": inputData };
    var newDate = new Date();
    $.ajax({
        data: info,
        type: "post",
        dataType: 'json',
        url: 'Manager/0/warehouseCat.do',
        cache: false,
        async: true,
        error: function(data) {
            $(".loading").addClass("hidden");
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            store_managerAPI.clear().draw(true);
            for (var i = 0; i < data.result.length; i++) {
                store_managerAPI.row.add([
                    data.result[i].code,
                    data.result[i].name,
                    data.result[i].address,
                    data.result[i].managerID,
                    data.result[i].kind,
                    data.result[i].area,
                    data.result[i].state,
                ]).draw(false);
            }
            $(".loading").addClass("hidden");
            store_cancel();
        }
    });
}
//通过这个函数向“仓库管理表”中添加数据
function store_manager_add() {}
//confirm 删除
function store_manager_confirm_delete() {
    var data = store_managerAPI.row(curentRow - 1).data(); //获取要删除的这一行的数据
    var v = new Object();
    //	alert(data);
    store_managerAPI.row(curentRow - 1).remove().draw(false);
    $("#store_manager_confirm").addClass("hidden"); //隐藏弹出框
    $(".mask").addClass("hidden"); //隐藏遮罩层
    v.code = data[0];
    v.a;
    v.b;
    v.c;
    v.d;
    v.e;
    $.ajax({
        data: v,
        type: "post",
        dataType: 'json',
        url: 'Manager/0/warehouseDel.do',
        cache: false,
        async: true,
        error: function(data) {
            $(".loading").addClass("hidden");
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            store_manager_select();
            $(".loading").addClass("hidden");
        }
    });
}
//confirm 修改
function store_manager_confirm_alter() {
    //	worker_auth_alter_table.rows[curentRow].cells[10].innerHTML=$("#worker_auth_alter_confirm input ")[0].value;//修改表中数据
    var info = new Object();
    info.code = $("#store_manager_confirm input ")[0].value;
    info.name = $("#store_manager_confirm input ")[1].value;
    info.address = $("#store_manager_confirm input ")[2].value;
    info.managerID = $("#store_manager_confirm input ")[3].value;
    info.kind = $("#store_manager_confirm input ")[4].value;
    info.area = $("#store_manager_confirm input ")[5].value;
    info.state = $("#store_manager_confirm input ")[6].value;
    $.ajax({
        data: info,
        type: "post",
        dataType: 'json',
        url: 'Manager/0/warehouseUpdate.do',
        cache: false,
        async: true,
        error: function(data) {
            $(".loading").addClass("hidden");
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            store_manager_select();
            $(".loading").addClass("hidden");
        }
    });
}
//confirm  取消
function store_manager_confirm_cancel() {
    $("#store_manager_confirm").addClass("hidden"); //隐藏弹出框
    $(".mask").addClass("hidden"); //隐藏遮罩层
}
/*仓库管理（结束）*/

/*第七页 商品管理*/ ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function show_goods_manager_add() {
    $("#goods_manager_add").removeClass("hidden");
    setTimeout(function() {
        $("#goods_manager_rud").addClass("hidden");
    }, 500);
}

function show_goods_manager_rud() {
    $("#goods_manager_rud").removeClass("hidden");
    setTimeout(function() {
        $("#goods_manager_add").addClass("hidden");
    }, 500);

}
//确认添加商品组
function group_info_add() {

    var temp = new Object();
    temp.name = $("#goods_manager_add input")[1].value;
    temp.price = $("#goods_manager_add input")[2].value;
    temp.script = $("#goods_manager_add input")[3].value;
    $.ajax({
        data: temp,
        type: "post",
        dataType: 'json',
        url: "./Manager/0/groupAdd.do",
        cache: false,
        async: true,
        error: function(data) {
            JSON.stringify(data);
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            goods_manager_select();
        }
    });
}
//取消添加商品
function group_info_cancel() {
    $("#goods_manager_add input")[0].value = "";
    $("#goods_manager_add input")[1].value = "";
    $("#goods_manager_add input")[2].value = "";
    $("#goods_manager_add input")[3].value = "";
    $("#goods_manager_add").addClass("hidden");
}
//点击查询按钮
function goods_manager_select() {

    $(".loading").removeClass("hidden");
    var inputData = $("#goods_manager_rud input")[0].value;
    var info = { "info": inputData };
    var newDate = new Date();
    $.ajax({
        data: info,
        type: "post",
        dataType: 'json',
        url: 'Manager/0/groupCat.do',
        cache: false,
        async: true,
        error: function(data) {
            $(".loading").addClass("hidden");
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            goods_managerAPI.clear().draw(true);
            for (var i = 0; i < data.result.length; i++) {

                goods_managerAPI.row.add([
                    data.result[i].code,
                    data.result[i].name,

                    data.result[i].price,
                    data.result[i].script,
                ]).draw(false);
            }
            $(".loading").addClass("hidden");
        }
    });
}
//通过这个方法向“商品管理表”中添加数据
function goods_manager_add() {
    var num = 5; //插入数据的总条数

    for (var i = 1; i <= num; i++) //循环插入
    {
        goods_managerAPI.row.add([
            i,
            2,
            3,
            4,
        ]).draw(false);
    }
}
//confirm 删除
function goods_manager_confirm_delete() {
    var data = goods_managerAPI.row(curentRow - 1).data(); //获取要删除的这一行的数据
    //	alert(data);
    goods_managerAPI.row(curentRow - 1).remove().draw(false);
    $("#goods_manager_confirm").addClass("hidden"); //隐藏弹出框
    $(".mask").addClass("hidden"); //隐藏遮罩层
}
//confirm 修改
function goods_manager_confirm_alter() {
    //	worker_auth_alter_table.rows[curentRow].cells[10].innerHTML=$("#worker_auth_alter_confirm input ")[0].value;//修改表中数据
    $("#goods_manager_confirm").addClass("hidden"); //隐藏弹出框
    $(".mask").addClass("hidden"); //隐藏遮罩层

    var temp = new Object();
    temp.code = $("#form-control-group").val();
    temp.name = $("#form-control-group1").val();
    temp.price = $("#form-control-group2").val();
    temp.script = $("#form-control-group3").val();
    $.ajax({
        data: temp,
        type: "post",
        dataType: 'json',
        url: "Manager/0/groupUpdate.do",
        cache: false,
        async: true,
        error: function(data) {
            alert(JSON.stringify(data));
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            goods_manager_select();
        }
    });
}
//confirm  取消
function goods_manager_confirm_cancel() {
    $("#goods_manager_confirm").addClass("hidden"); //隐藏弹出框
    $(".mask").addClass("hidden"); //隐藏遮罩层
}

/*第七页 商品管理（结束）*/
/*第八页 操作日志*/ ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

//点击查询按钮
function operate_log_select() {
    $(".loading").removeClass("hidden");
    var inputData = $("#operate_log input")[0].value;
    var info = { "info": inputData };
    var newDate = new Date();
    $.ajax({
        data: info,
        type: "post",
        dataType: 'json',
        url: 'Manager/0/logCat.do',
        cache: false,
        async: true,
        error: function(data) {
            $(".loading").addClass("hidden");
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            date = newDate.toLocaleString();
            operate_logAPI.clear().draw(true);
            for (var i = 0; i < data.log.length; i++) {
                newDate.setTime(data.log[i].date);
                operate_logAPI.row.add([
                    data.log[i].code,
                    data.log[i].managerID,
                    date = newDate.toLocaleString(),
                    data.log[i].results,
                    data.log[i].type,
                    data.log[i].info,
                ]).draw(false);
            }
            $(".loading").addClass("hidden");
        }
    });
}
//通过这个方法向“商品管理表”中添加数据
function operate_log_add() {
    var num = 5; //插入数据的总条数

    for (var i = 1; i <= num; i++) //循环插入
    {
        operate_logAPI.row.add([
            i,
            2,
            3,
            4,
            5,
            6,
        ]).draw(false);
    }
}
//confirm 删除
function operate_log_confirm_delete() {
    var data = operate_logAPI.row(curentRow - 1).data(); //获取要删除的这一行的数据
    //	alert(data);
    operate_logAPI.row(curentRow - 1).remove().draw(false);
    $("#operate_log_confirm").addClass("hidden"); //隐藏弹出框
    $(".mask").addClass("hidden"); //隐藏遮罩层
}
//confirm 修改
function operate_log_confirm_alter() {
    //	worker_auth_alter_table.rows[curentRow].cells[10].innerHTML=$("#worker_auth_alter_confirm input ")[0].value;//修改表中数据
    for (var i = 0; i < 6; i++) {
        var test = $("#operate_log_confirm input ")[i].value;
        //		alert(test);
        operate_log_table.rows[curentRow].cells[i].innerHTML = test;
    }
    $("#operate_log_confirm").addClass("hidden"); //隐藏弹出框
    $(".mask").addClass("hidden"); //隐藏遮罩层
}
//confirm  取消
function operate_log_confirm_cancel() {
    $("#operate_log_confirm").addClass("hidden"); //隐藏弹出框
    $(".mask").addClass("hidden"); //隐藏遮罩层
}

/*第八页 操作日志（结束）*/


/*第九页 个人信息*/ /////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//个人信息模块
var phone, email;

function show_my_info() {
    $("#adm_info").removeClass("hidden");
    setTimeout(function() {
        $("#alter_pwd").addClass("hidden");

    }, 500);

    //从数据库中读取我的信息
    $.ajax({
        data: null,
        type: "post",
        dataType: 'json',
        url: "Manager/2/search.do",
        cache: true,
        async: true,
        error: function(data) {
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            var info = data.result[0];
            $("#adm_info input")[0].value = info.id;
            $("#adm_info input")[1].value = info.name;
            $("#adm_info input")[2].value = info.sex;
            $("#adm_info input")[3].value = info.birth;
            $("#adm_info input")[4].value = info.phone;
            phone = info.phone;
            email = info.mail;
            $("#adm_info input")[5].value = info.mail;
            $("#adm_info input")[6].value = info.address;
            $("#adm_info input")[7].value = info.cridet;
            $("#adm_info input")[8].value = info.warehouse;
            $("#adm_info input")[9].value = info.star;
            $("#adm_info input")[10].value = info.remark;

            // for (var i = 0; i < 11; i++) {
            //     $("#adm_info input")[i].value = data.result[i];
            // }
        }
    });

    //显示

}

function show_alter_pwd() {
    $("#alter_pwd").removeClass("hidden");
    setTimeout(function() {
        $("#adm_info").addClass("hidden");

    }, 500);
}
var phone2;
var email2;
//确认修改个人信息
function my_info_alter() {
    var temp_ajax = new Object();

    phone2 = $("#adm_info input")[4].value;
    email2 = $("#adm_info input")[5].value;
    if (phone != phone2) {
        $("#if_connect_change_confirm").removeClass("hidden");
        $(".mask").removeClass("hidden");
        fanshi();
    }
    if (email != email2) {
        $("#if_connect_change_confirm").removeClass("hidden");
        $(".mask").removeClass("hidden");
        fanshi();
    }
    temp_ajax.phone = '';
    temp_ajax.mail = '';
    temp_ajax.name = $("#adm_info input")[1].value;
    temp_ajax.sex = $("#adm_info input")[2].value;
    temp_ajax.birth = $("#adm_info input")[3].value;
    temp_ajax.address = $("#adm_info input")[6].value;
    temp_ajax.other = $("#adm_info input")[10].value;
    $.ajax({
        data: temp_ajax,
        type: "post",
        dataType: 'json',
        url: "./Manager/2/update.do",
        cache: false,
        async: true,
        error: function(data) {
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            show_my_info();
        }
    });

}

//下拉款改变时
function fanshi() {
    if ($("#if_connect_change_confirm select")[0].value == "手机验证") {
        $("#if_connect_change_confirm input")[0].value = phone;

    } else {
        $("#if_connect_change_confirm input")[0].value = email;
    }
}
//显示 输入验证码的框
function show_yanzhenma() {
    var s = new Object();
    s.name = '';
    s.sex = '';
    s.phone = '';
    s.mail = '';
    // 
    // 
    s.address = $("#adm_info input")[6].value;
    s.other = $("#adm_info input")[10].value;
    if (phone2 != null && phone2 != '' && phone != phone2)
        s.phone = phone2;
    if (email2 != null && email2 != '' && email != email2)
        s.mail = email2;
    if ($("#if_connect_change_confirm select")[0].value == "手机验证");

    else
    ;
    $("#input_yzm").removeClass("hidden");
    $.ajax({
        data: s,
        type: "post",
        dataType: 'json',
        url: "./Manager/2/update.do",
        cache: false,
        async: true,
        error: function(data) {
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            alert(JSON.stringify(data));
        }
    });
}

function checkCode() {
    var code = { 'code': $('#checkcode').val() };
    $.ajax({
        data: code,
        type: "post",
        dataType: 'json',
        url: "./Manager/2/check.do",
        cache: false,
        async: true,
        error: function(data) {
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            $("#if_connect_change_confirm").addClass("hidden");
            $(".mask").addClass("hidden");
            JSON.stringify(data);
            show_my_info();

        }
    });
}
//取消修改
function dis_if_connect_change_confirm() {
    $("#input_yzm").addClass("hidden");
    $("#if_connect_change_confirm").addClass("hidden");
    $(".mask").addClass("hidden");
    $("#adm_info input")[4].value = phone;
    $("#adm_info input")[5].value = email;
}
//取消修改个人信息
function my_info_cancel() {
    $("#adm_info").addClass("hidden");
}
//密码修改
function my_info_pwd_alter() {
    var old_pwd = $("#alter_pwd input")[0].value;
    var new_pwd1 = $("#alter_pwd input")[1].value;
    var new_pwd2 = $("#alter_pwd input")[2].value;
    if (old_pwd != "" && new_pwd1 != "" && new_pwd2 != "") {
        if (new_pwd1 == new_pwd2) {
            var info = new Object();
            info.id;
            info.password = new_pwd1;
            info.c;
            $.ajax({
                data: info,
                type: "post",
                dataType: 'json',
                url: 'Manager/2/updatepwd.do',
                cache: false,
                async: true,
                error: function(data) {
                    alert(JSON.stringify(data));
                },
                success: function(data) {
                    alert(JSON.stringify(data));
                }
            });
            alert("校验成功");
        } else { alert("前后两次输入的密码不一致"); }
    } else {
        alert("输入不能空");
    }
}
//取消修改密码
function my_info_pwd_cancel() {
    $("#alter_pwd").addClass("hidden");
}
/*个人信息模块(结束)*/

function getGoodCapture() {
    var temp_ajax;
    $.ajax({
        data: temp_ajax,
        type: "post",
        dataType: 'json',
        url: "./Manager/2/getGoodCapture.do",
        cache: true,
        async: true,
        error: function(data) {
            $(".adm_login").removeClass("hidden");
        },
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

function login() {
    var login = new Object();
    login.ID = $("#username").val();
    login.password = $("#password").val();
    $.ajax({
        data: login,
        type: "post",
        dataType: 'json',
        url: 'Manager/2/login',
        cache: false,
        async: true,
        error: function(data) {
            alert(JSON.stringify(data));
        },
        success: function(data) {
            if (data.id == "Success") {
                window.location.href = 'Manager.html';
            } else alert('账户或密码有误')
        }
    });
}

function unlock() {
    var login = new Object();
    login.ID = '';
    login.password = $("#lockpwd").val();
    $.ajax({
        data: login,
        type: "post",
        dataType: 'json',
        url: 'Manager/2/login',
        cache: false,
        async: true,
        error: function(data) {
            alert('请检查网络');
        },
        success: function(data) {
            if (data.id == "Success") {
                $("#radio").removeAttr('checked')
                $(".maskAll").addClass("hidden");
            } else alert('密码有误')
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
        url: "Manager/2/getWarehouse.do",
        cache: true,
        async: true,
        error: function(data) {
            alert(JSON.stringify(data));
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

function InputOrOutput() {
    $(".loading").removeClass("hidden");
    InfoAPI.clear().draw(true);
    $.ajax({
        data: null,
        type: "post",
        dataType: 'json',
        cache: false,
        async: true,
        url: "Manager/2/getStore.do",
        error: function(data) {
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            alert(JSON.stringify(data));
            for (var i = 0; i < data.result.length; i++) {
                InfoAPI.row.add([data.result[i].code, data.result[i].name, data.result[i].goodID, goodCapture[data.result[i].classID - 1].name, data.result[i].quantity, data.result[i].userID]).draw(false);
                //$(".mySeleTableInfo tbody tr ")[data.history_out.length+data.history_in.length+i].style.color="red";
            }
        }
    });
    $(".loading").addClass("hidden");
}

function checkstore() {
    $(".loading").removeClass("hidden");
    stock_partAPI.clear().draw(true);
    $.ajax({
        data: null,
        type: "post",
        dataType: 'json',
        cache: false,
        async: true,
        url: "Manager/2/getStore.do",
        error: function(data) {
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            alert(JSON.stringify(data));
            for (var i = 0; i < data.result.length; i++) {
                stock_partAPI.row.add([data.result[i].code, data.result[i].name, data.result[i].goodID, data.result[i].price, goodCapture[data.result[i].classID - 1].name, data.result[i].quantity, data.result[i].remark, ]).draw(false);
                //$(".mySeleTableInfo tbody tr ")[data.history_out.length+data.history_in.length+i].style.color="red";
            }
        }
    });
    $(".loading").addClass("hidden");
}

function logout() {
    $.ajax({
        data: null,
        type: "post",
        dataType: 'json',
        cache: false,
        async: true,
        url: "Manager/2/logout",
        error: function(data) {
            $(".adm_login").removeClass("hidden");
        },
        success: function(data) {
            window.location.href = 'Manager.html';
        }
    });
}