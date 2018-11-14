var openId = localStorage.openId;
var test = getQueryString('test');
var bool = true;
if(test !== null) {
	pushHistory();
	window.addEventListener("popstate", function(e) {
		window.location.href = '../index.html?index=5&openId=' + openId + '&test=1';
	}, false);
}

function pushHistory() {
	var state = {
		title: "title",
		url: "#"
	};
	window.history.pushState(state, "title", "#");
}
var barData = [];
var index = getQueryString('index');
//			index = 10;
//获取测试结果
getMsg();

function getMsg() {
	$.ajax({
		type: "get",
		url: url + "weChat/report/c/" + index,
		async: false,
		success: function(data) {
			//						console.log(data);
			var listData = data.data,
				str = '';
			$('.normal h6').html('您的宝宝智龄达到' + listData.summaryAverage + '个月')
			$('.babyName').html(listData.babyName);
			$('.birthDay').html(listData.birthDay);
			if(listData.babySex == 1) {
				$('.babySex').html('男');
				$('.header').attr('src', '../img/TX M.png');
			} else {
				$('.babySex').html('女');
				$('.header').attr('src', '../img/TX W.png');
			}
			if(data.data.docAdvice = '') {
				$('.specialistBox p').html('无');
			} else {
				$('.specialistBox p').html(data.data.docAdvice);
			}
			barData.push(parseInt(listData.growthSport));
			barData.push(parseInt(listData.growthSocial));
			barData.push(parseInt(listData.growthLanguage));
			barData.push(parseInt(listData.growthAdapt));
			barData.push(parseInt(listData.growthAct));
			$('.normal p').html('总评： ' + listData.summary);
			for(var i = 0; i < listData.recommendedTrainingEntityList.length; i++) {
				str += '<li>' +
					'<h6>' + listData.recommendedTrainingEntityList[i].capacityName + '</h6>' +
					'<p>' + listData.recommendedTrainingEntityList[i].areaDesc + '</p>' +
					'<div class="cardBox"  dataid="' + listData.recommendedTrainingEntityList[i].capacityType + '" datacurrentGrowthMonth="' + listData.recommendedTrainingEntityList[i].currentGrowthMonth + '">' +
					'<h5>推荐训练</h5>'
				if(listData.recommendedTrainingEntityList[i].trainEntityList.length > 3) {

					for(var j = 0; j < 3; j++) {
						str += '<p><span></span>' + listData.recommendedTrainingEntityList[i].trainEntityList[j].trainName + '<i>共' + listData.recommendedTrainingEntityList[i].trainEntityList.length + '条</i></p>'
					}

				} else {
					for(var j = 0; j < listData.recommendedTrainingEntityList[i].trainEntityList.length; j++) {
						str += '<p class="copy' + listData.recommendedTrainingEntityList[i].trainEntityList.length + '"><span></span>' + listData.recommendedTrainingEntityList[i].trainEntityList[j].trainName + '</p>'
					}
				}
				str += '<div class="detailBox">' +
					'详情' +
					'<span><img style="width: 0.08rem;float: right;" src="../img/jt.png"/></span>' +
					'</div>' +
					'</div>' +
					'</li>'
			}

			$('.resultBox ul').html(str)
			$('.copy2').closest('.cardBox').addClass('cardBox2');
			$('.copy1').closest('.cardBox').addClass('cardBox1');
		}
	});
}

$('.cardBox').click(function() {
	window.location.href = 'drill.html?capacityType=' + $(this).attr('dataid') + '&currentGrowthMonth=' + $(this).attr('datacurrentgrowthmonth');
})
require.config({
	paths: {
		echarts: 'http://echarts.baidu.com/build/dist'
	}
});
// 基于准备好的dom，初始化echarts实例
require(
	[
		'echarts',
		'echarts/chart/radar' // 使用柱状图就加载bar模块，按需加载
	],
	function(ec) {
		var myChart = ec.init(document.getElementById('main'));
		var option = {
			title: {
				// text: '清单费用构成',
				textStyle: {
					fontWeight: 'normal',
					fontSize: '14',
					color: '#6dd7d9'
				},
				x: 'center',
				y: '15'
			},
			tooltip: {
				trigger: 'axis',
				padding: 10,
				formatter: function(params) {
					var data = '';
					$.each(params, function(index, item) {
						data += item.name + ':' + item.value + '<br/>';
					});
					return params[0].indicator + '<br/>' + data;
				}
			},
			polar: [{
				radius: 95, //半径
				center: ['50%', '50%'], // 图的位置
				name: {
					// show: true, // 是否文字
					// formatter: null, // 文字的显示形式
					textStyle: {
						color: '#999' // 文字颜色
					}
				},
				indicator: [{
						text: '大运动',
						max: 130
					},
					{
						text: '社交行为',
						max: 130
					},
					{
						text: '语言',
						max: 130
					},
					{
						text: '适应能力',
						max: 130
					},
					{
						text: '精细\n动作',
						max: 130
					},
				],
			}],
			calculable: true,
			series: [{

				name: '',
				type: 'radar',
				symbol: 'emptyCircle',
				symbolSize: 4,
				itemStyle: {
					normal: {
						color: 'rgb(109,215,217)',
						areaStyle: {
							type: 'default',
							color: "rgba(109,215,217,0.5)"
						},
					}
				},
				calculable: false,
				data: [{
					value: barData,
					name: '结果',
				}, ]
			}]
		};

		// 为echarts对象加载数据 
		myChart.setOption(option);
	}
);