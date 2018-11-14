var appid = 'wx7781d1c8b61164be',
	token = localStorage.openId;
token = getQueryString('openId');
//获取数据
getMsg();

function getMsg() {
	$.ajax({
		type: "get",
		url: url + "weChat/getBabyInfo/" + token,
		async: true,
		success: function(data) {
			$('.babyName').html(data.data.babyName);
			$('.babyBirthday').html(data.data.babyBirthday);
			if(data.data.babyGenderName == 1) {
				$('.babyGenderName').html('男');
				$('.header').attr('src', '../img/TX M.png')
			} else {
				$('.babyGenderName').html('女');
				$('.header').attr('src', '../img/TX W.png')
			}
		}
	});
	$.ajax({
		type: "get",
		url: url + "weChat/reports/" + token,
		async: true,
		success: function(data) {
			var str = '<div class="noHospital noFamily"><i class="timeBar"></i><h4>贝智生将定期为您推送专业测评！</h4></div>',
				str2 = '';
			for(var i = 0; i < data.data.length; i++) {
				if(data.data[i].reportCategory == 0) {
					str = '<div class="familyTest familyTestfirst">' +
						'<a href="appraisalResult.html?index=' + data.data[i].index + '"><i class="timeBar"></i>' +
						'<dl>' +
						'<dt>发育测评</dt>' +
						'<dd><span><img src="../img/timeicon.png"/></span>' + data.data[i].createAt + '</dd>' +
						'</dl>' +
						'<span class="latest">最新测评</span></a>' +
						'</div>'
				} else {
					str2 += '<li class="hospitalLi">'
					if(data.data[i].reportCategory == 7) {
						str2 += '<a href="hospitalResultshan.html?index=' + data.data[i].index + '&reportType=' + data.data[i].reportCategory + '"><div class="familyTest">'
					} else {
						str2 += '<a href="hospitalResult.html?index=' + data.data[i].index + '&reportType=' + data.data[i].reportCategory + '"><div class="familyTest">'
					}

					str2 += '<i class="timeBar"></i>' +
						'<dl>' +
						'<dt>' + data.data[i].name + '</dt>' +
						'<dd><span><img src="../img/timeicon.png"/></span>' + data.data[i].createAt + '</dd>' +
						'</dl>'
					'</div>'
					'</li>'
				}
			}
			$('.reportC').html(str);
			str2 += '<li class="hospitalLi"><div style="display: block;" class="noHospital noTest"><i class="timeBar"></i><h4>已显示全部</h4></div></li>'
			$('.hospitalTest ul').html(str2);
			if(str2 == '') {
				$('.noTest').show();
			} else {

			}
		}
	});
}

$('.hospitalLi').click(function() {
	window.location.href = 'hospitalResult.html';
})