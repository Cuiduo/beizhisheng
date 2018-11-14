//监听微信返回
pushHistory();
//window.addEventListener("popstate", function(e) {
//	//alert("我监听到了浏览器的返回按钮事件啦");//根据自己的需求实现自己的功能
//	if (bool) {
//		$('#cover').show();
//	$('.tipBox').show();
//	} else{
//		return
//	}
//	
////	WeixinJSBridge.call('closeWindow');
//	//window.location.href='http://www.baidu.com'
//}, false);
var test = getQueryString('test');
var bool = true;
if (test!==null) {
	console.log(test)
	window.addEventListener("popstate", function(e) {
		if(bool) {
			$('#cover').show();
			$('.tipBox').show();
		}
	}, false);
}



function pushHistory() {
	var state = {
		title: "title",
		url: "#"
	};
	window.history.pushState(state, "title", "#");
}
//做题
var openId = localStorage.openId,
	babyAge = localStorage.babyAge,
	babyId = localStorage.babyId;
$.ajax({
	type: "get",
	url: url + "weChat/questionBank/" + openId + '/' + babyAge,
	async: true,
	success: function(data) {
		console.log(data);
		var str = '',
			postJson = [];
		var a = '';
		var datas = data.data.currentTime;
		$('footer span').html(datas);
		for(var i = 0; i < data.data.resultData.length; i++) {
			var desc = data.data.resultData[i].desc
			a = data.data.resultData[i];
			delete a.desc;
			str += '<li class="bigLi" dataid=' + JSON.stringify(a) + '>' +
				'<h3>' + (i + 1) + '.' + desc + '：</h3>' +
				'<ul class="questionUl">' +
				'<li ansId="A">能</li>' +
				'<li ansId="B">不能</li>' +
				'<li ansId="C">偶尔能</li>' +
				'</ul>' +
				'<div class="nextbt">下一题</div>' +
				'</li>';
		}
		$('.bigUl').html(str);
		$('.bigLi:last-child .nextbt').html('完成测评  查看结果')
		nextQuestion(question);
		$('.bigLi:not(:last-child) .nextbt').click(function() {
			if($(this).siblings().find("li").is(".chosed")) {
				question++;
				nextQuestion(question);
				var jsons = JSON.parse($(this).closest('.bigLi').attr('dataid'));
				delete jsons.desc;
				jsons.ansId = $(this).siblings().find('.chosed').attr('ansid');
				postJson.push(jsons);
			} else {
				return false;
			}
		});

		//选择答案
		$(".questionUl li").click(function() {
			$(this).addClass("chosed").siblings().removeClass();
			$(this).parent().siblings('.nextbt').addClass('nextbtChosed');

		});

		//最后一题选择答案
		$(".bigLi:last-child .questionUl li").click(function() {
			$(this).addClass("chosed").siblings().removeClass();
			$(this).parent().siblings('.nextbt').addClass('nextbtLast');
		});

		//提交答案
		$('.bigLi:last-child .nextbt').click(function() {
			if($(this).siblings().find("li").is(".chosed")) {
				var jsons = JSON.parse($(this).closest('.bigLi').attr('dataid'));
				console.log(jsons);
				delete jsons.desc;
				jsons.ansId = $(this).siblings().find('.chosed').attr('ansid');
				postJson.push(jsons);
				console.log(postJson);
				babyId = localStorage.babyId;
				var strJson = JSON.stringify(postJson);
				$.ajax({
					type: "post",
					url: url + "weChat/saveDatermain/" + babyId + '/' + openId,
					contentType: "application/json",
					data: JSON.stringify(postJson),
					async: true,
					success: function(data) {
						console.log(data);
						if(data.data.reportException == 0 && data.data.isCorrelation == 0) {
							localStorage.index = data.data.currentReportId;
							window.location.href = 'appraisalResult.html?openId='+openId+'&isCorrelation='+data.data.isCorrelation+'&test=1';
						} else if(data.data.reportException == 0 && data.data.isCorrelation == -1) {
							localStorage.index = data.data.currentReportId;
							window.location.href = 'phone.html?openId='+openId+'&isCorrelation='+data.data.isCorrelation+'&test=1';
						} else if(data.data.reportException == -1 && data.data.isCorrelation == 0) {
							localStorage.index = data.data.currentReportId;
							localStorage.reportException = data.data.reportException;
							window.location.href = 'abnormal.html?openId='+openId+'&isCorrelation='+data.data.isCorrelation+'&test=1';
						} else if(data.data.reportException == -1 && data.data.isCorrelation == -1) {
							localStorage.reportException = data.data.reportException;
							localStorage.index = data.data.currentReportId;
							window.location.href = 'phone.html?openId='+openId+'&isCorrelation='+data.data.isCorrelation+'&test=1';
						}

					}
				});

			} else {
				return false;
			}
		})
	}
});
var question = 0;

function nextQuestion(question) {
	$(".bigLi").hide();
	$(".bigLi").eq(question).show();
}

//取消
$('.tipBox div span:nth-of-type(2)').click(function() {
	$('.tipBox').hide()
	$('#cover').hide();
	pushHistory();
});

$('.tipBox div span:nth-of-type(1)').click(function() {
	window.location.href = '../index.html?index=3&openId='+openId+'&test=1';
});

//显示函数
function showpho() {
	$(".tips").show();
	setTimeout(hidpho, 1000);
	return
}
//隐藏函数
function hidpho() {
	$(".tips").hide();
}