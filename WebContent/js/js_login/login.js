$(document).ready(function() {
    $(".login_manner_tab .chk-radio").click(function() {
        $(this).addClass("chk-checked").siblings().removeClass("chk-checked");
        if ($(this).hasClass("manner_tab1")) {
            $(".login_manner1").show();
            $(".login_manner2").hide()
        } else {
            if ($(this).hasClass("manner_tab2")) {
                $(".login_manner1").hide();
                $(".login_manner2").show()
            }
        }
    }).next("span").click(function() {
        $(this).prev("div").click()
    })

    $("#person1").click("on",
        function() {
            $("#person1").addClass("current");
            $("#company1").removeClass("current");

            $("#company").css('display', 'none');
            $("#person").css('display', 'block');
        });
    $("#company1").click("on",
        function() {
            $("#company1").addClass("current");
            $("#person1").removeClass("current");

            $("#company").css('display', 'block');
            $("#person").css('display', 'none');
        });
    $("#comRemember").click(function() {
        if ($(this).hasClass("chk-checked")) {
            $(this).removeClass("chk-checked").siblings("label").html("记住我")
        } else {
            $(this).addClass("chk-checked").siblings("label").html("为保障账号安全，公共场所不建议启用")
        }
    });
    $("#comRemember2").click(function() {
        if ($(this).hasClass("chk-checked")) {
            $(this).removeClass("chk-checked").siblings("label").html("记住我")
        } else {
            $(this).addClass("chk-checked").siblings("label").html("为保障账号安全，公共场所不建议启用")
        }
    });
});

function ctrl() {
    var img = document.getElementById("vimage");
    //切换验证码的原理是点击就重新将src设置一下，但是浏览器有缓存，所以我们需要在后面添加                     一个参数来让浏览器不断发送请求，后面加的参数为时间，因为时间是不断变化的
    img.src = "Image.do?a=" + new Date().getTime();

}

function login() {
    var login = new Object();
    login.id = $("#username").val();
    login.name = '';
    login.password = $("#password").val();
    login.phone = '';
    login.mail = $("#verifyCode").val();
    $.ajax({
        data: login,
        type: "post",
        dataType: 'json',
        url: 'user/login',
        cache: false,
        async: true,
        error: function(data) {
            alert('验证码错误');
            window.location.href = 'login.html';
        },
        success: function(data) {
            if (data.id == 'Error:验证码错误') {
                alert('验证码错误');
                window.location.href = "login.html";
            } else
                window.location.href = data.phone;
        }
    });
}