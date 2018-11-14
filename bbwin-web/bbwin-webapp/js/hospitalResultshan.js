//训练详情
$('.recommendOne').click(function() {
	window.location.href = 'report.html'
});
$('.recommendTwo').click(function() {
	window.location.href = 'reportTwo.html'
});
$('.recommendThree').click(function() {
	window.location.href = 'reportThree.html'
});
//数据初始化

var barData = '',
	value = '',
	valueColor = '',
	token = localStorage.openId;
var index = getQueryString('index');
var reportType = getQueryString('reportType');
//去测评
$('.footerTop a').click(function() {
	window.location.href = '../index.html?openId=' + token;
});
//婴幼儿认知
showResultCognize(index, reportType)

function showResultCognize(index, reportType) {
	nameDate = [{
		text: 'SH',
		max: 1
	}, {
		text: 'SD',
		max: 1
	}, {
		text: 'S',
		max: 1
	}, {
		text: 'C',
		max: 1
	}, {
		text: 'O',
		max: 1
	}, {
		text: 'L',
		max: 1
	}];
	//获取数据图
	$.ajax({
		type: "get",
		url: url + "weChat/report/b/" + index + "/" + reportType,
		async: false,
		success: function(data) {
			//console.log(data);
			var str = '';
			var listData = data.data;
			$('.babyName').html(listData.babyInfo.babyName);
			$('.babyBirthday').html(listData.babyInfo.babyBirthDay);
			$('.resultBox h6').html('评定结果：' + listData.resultDetail.evaluation);
			if(listData.babyInfo.babySex == 1) {
				$('.babyGenderName').html('男');
				$('.header').attr('src', '../img/boyImg.png')
			} else {
				$('.babyGenderName').html('女');
				$('.header').attr('src', '../img/grilImg.png')
			}
			if(data.data.docAdvice == '') {
				$('.specialistBox p').html('无');
			} else {
				$('.specialistBox p').html(data.data.docAdvice);
			}
			barData = parseInt(listData.resultDetail.talent);
			value = parseInt(listData.resultDetail.talent) / 150
			if(value <= 0.47) {
				valueColor = 'red'
			} else if(value <= 0.57) {
				valueColor = 'orange'
			} else if(value <= 0.77) {
				valueColor = 'blue'
			} else if(value <= 0.87) {
				valueColor = 'green'
			} else if(value >= 0.87) {
				valueColor = 'green'
			}
		}
	});
}

var myChart = echarts.init(document.getElementById('main'));
// 指定图表的配置项和数据
var option = {
	backgroundColor: '#F5F8FF',
	grid: {
		left: '8%',
		right: '0',
		bottom: '1%',
		containLabel: true
	},
	series: [{

			name: '刻度',
			type: 'gauge',
			radius: '100%',
			center: ['50%', '60%'],
			min: 0,
			max: 150,
			splitNumber: 5, // 刻度数量
			startAngle: 180,
			endAngle: 0,
			axisLine: {
				show: true,
				lineStyle: {
					width: 1,
					color: [
						[1, 'rgba(0,0,0,0)']
					]
				}
			}, // 仪表盘轴线
			axisLabel: {
				show: true,
				color: '#000',
				distance: 20
			}, // 刻度标签。
			axisTick: {
				show: false,
				lineStyle: {
					color: '#F5F8FF',
					width: 1
				},
				length: -8
			}, // 刻度样式
			splitLine: {
				show: false,
				length: -35,
				lineStyle: {
					color: '#F5F8FF'
				}
			}, // 分隔线样式
			detail: {
				show: false
			},
			pointer: {
				show: false
			}
		},
		{

			type: 'gauge',
			radius: '90%',
			center: ['50%', '60%'],
			splitNumber: 0, // 刻度数量
			startAngle: 180,
			endAngle: 0,
			axisLine: {
				show: true,
				lineStyle: {
					width: 30,
					color: [
						[
							value, new echarts.graphic.LinearGradient(
								0, 0, 1, 0, [{
										offset: 0,
										color: valueColor
									},
									{
										offset: 1,
										color: valueColor
									}
								]
							)
						],
						[
							1, 'rgb(238, 238, 238)'
						]
					]
				}
			},
			// 分隔线样式。
			splitLine: {
				show: false
			},
			axisLabel: {
				show: false
			},
			axisTick: {
				show: false
			},
			pointer: {
				show: false
			},
			title: {
				show: true,
				offsetCenter: [0, '-20%'], // x, y，单位px
				textStyle: {
					color: '#000',
					fontSize: 13
				}
			},
			// 仪表盘详情，用于显示数据。
			detail: {
				show: true,
				offsetCenter: [0, 0],
				color: '#000',
				formatter: function(params) {
					return params
				},
				textStyle: {
					fontSize: 20
				}
			},
			data: [{
				name: '能力商',
				value: barData
			}]
		}
	]
};
myChart.setOption(option);