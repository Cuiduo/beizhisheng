//监听微信返回

var test = getQueryString('test');
var bool = true;
if(test !== null) {
	pushHistory();
	console.log(test)
	window.addEventListener("popstate", function(e) {
		if(bool) {
			$('#cover').show();
			$('.tipBox').show();
		}
	}, false);
}

//取消
$('.tipBox div span:nth-of-type(2)').click(function() {
	$('.tipBox').hide()
	$('#cover').hide();
	pushHistory();
});

$('.tipBox div span:nth-of-type(1)').click(function() {
	window.location.href = '../index.html?index=5&openId=' + openId +'&test=1';
});

function pushHistory() {
	var state = {
		title: "title",
		url: ""
	};
	window.history.pushState(state, "title", "");
}

var countdown = 60,
	openId = getQueryString("openId");
var isCorrelation = getQueryString('isCorrelation');
if(isCorrelation == 0) {
	window.location.href = 'result.html'
}
var isPhone = /^1[3|4|5|7|8|9][0-9]{9}$/;
var obj = $("#sendCode");
var phonetest = false;
$('#sendCode').click(function() {
	send();
})

function send() {
	if(!isPhone.test($("#phoneNum").val())) {
		$('.tips').html('请输入正确的手机号')
		showpho();
		return;
	}
	phonetest = true;
	settime(obj);
	$.ajax({
		type: "get",
		url: url + "weChat/sendVerificationCode/" + $("#phoneNum").val(),
		async: true,
		success: function(data) {
			if(data.data.sendResult == '同一手机号验证码短信发送超出5条') {
				$('.tips').html('同一手机号验证码短信发送超出5条');
				showpho();
			}
		}
	});
}

function settime(obj) { //发送验证码倒计时
	if(countdown == 0) {
		obj.attr('disabled', false);
		obj.val("获取验证码");
		$("#sendCode").css("background", "#4D84FF")
		countdown = 60;
		return;
	} else {
		obj.attr('disabled', true);
		obj.val(countdown + "秒");
		countdown--;
		$("#sendCode").css("background", "#C3C3C3")
	}
	setTimeout(function() {
		settime(obj)
	}, 1000)
}

//检测报告
$('.nextbt').click(function() {
	if(phonetest && $('#codeNum').val().length > 0) {
		$.ajax({
			type:"post",
			url:url+"weChat/updateBaby",
			async:true,
			contentType: "application/json",
			data:JSON.stringify({
				"mobile": $("#phoneNum").val(),
				"verificationCode": $('#codeNum').val(),
				"babyId": localStorage.babyId,
				"openId": openId
			}),
			success:function(data){
				console.log(data);
				if (test!== null) {
					if (data.data.updateFlag) {
						$.ajax({
							type:"get",
							url:url+"weChat/getCorrelation/"+openId,
							async:true,
							success:function(data){   
								//localStorage.index=data.data.latestReportId;
								if (data.data.latestReportId==0) {
									window.location.href='abnormal.html?test=1';
								} else{
									window.location.href='appraisalResult.html?test=1&index='+data.data.latestReportId;
								}
							}
						})
					}
				} else{
					$.ajax({
						type: "post",
						url: url + "weChat/setCorrelation/" + openId,
						async: true,
						contentType: "application/json",
						data: JSON.stringify({
							"mobile": $("#phoneNum").val(),
							"verificationCode": $('#codeNum').val(),
							"babyId": localStorage.babyId,
							"openId": openId
						}),
						success: function(data) {
							console.log(data);
							if(data.data.isCorrelation == 0) {
								window.location.href = 'result.html?openId=' + openId;
							} else {
								$('.tips').html('暂无数据');
								showpho();
							}
						}
					});
				}
			}
		})
	} else if(!phonetest) {
		$('.tips').html('请先获取验证码');
		showpho();
	} else {
		$('.tips').html('请输入验证码');
		showpho();
	}
})
//显示函数
function showpho() {
	$(".tips").show();
	setTimeout(hidpho, 1000);
}
//隐藏函数
function hidpho() {
	$(".tips").hide();
}