//训练详情
			$('.recommendOne').click(function(){
				window.location.href='report.html'
			});
			$('.recommendTwo').click(function(){
				window.location.href='reportTwo.html'
			});
			$('.recommendThree').click(function(){
				window.location.href='reportThree.html'
			});
			var barData = [];
			var nameDate = [];
			var token = localStorage.openId;
			//去测评
			$('.footerTop a').click(function(){
				window.location.href='../index.html?openId='+token;
			});
			//获取0-6的数据
			//showResult0_6()
			var index = getQueryString('index');
			var reportType = getQueryString('reportType');
			if (reportType==1) {
				showResult0_6(index,reportType);
				$('.normal h3').html('0-6岁小儿神经心理发育检查表')
			} else if(reportType==2){
				showResult0_2(index,reportType)
				$('.normal h3').html('家庭养育（0-2岁）')
			} else if(reportType==4){
				showResult3_6(index,reportType)
				$('.normal h3').html('父母育儿评估量表（3-6岁）')
			} else if(reportType==5){
				showResult5_0(index,reportType)
				$('.normal h3').html('学前50项智力筛查')
			} else if(reportType==6){
				showResult132(index,reportType)
				$('.normal h3').html('婴儿-初中学生生活能力量表')
			}
			function showResult0_6(index,reportType){
				nameDate = [{text: '大运动',max: 130},{text: '社交行为',max: 130},{text: '语言',max: 130},{text: '适应能力',max: 130},{text: '精细\n动作',max: 130}];
				//获取建议
				//获取数据图
				barData = [];
				$.ajax({
					type:"get",
					url:url+"weChat/report/b/"+index+"/"+reportType,
					async:false,
					success:function(data){
//						console.log(data);
						var str = '';
						var listData = data.data;
						$('.babyName').html(listData.babyInfo.babyName);
						$('.babyBirthday').html(listData.babyInfo.babyBirthDay);
						if (listData.babyInfo.babySex==1) {
							$('.babyGenderName').html('男');
							$('.header').attr('src','../img/boyImg.png')
						} else{
							$('.babyGenderName').html('女');
							$('.header').attr('src','../img/grilImg.png')
						}
						if (data.data.docAdvice=='') {
							$('.specialistBox p').html('无');
						} else{
							$('.specialistBox p').html(data.data.docAdvice);
						}
						barData.push(parseInt(listData.reportData.scoreSportDq));
						barData.push(parseInt(listData.reportData.scoreSocialDq));
						barData.push(parseInt(listData.reportData.scoreLanguageDq));
						barData.push(parseInt(listData.reportData.scoreAdaptDq));
						barData.push(parseInt(listData.reportData.scoreActDq));
						str = '<tr>'+
									'<th>测评项/得分项</th>'+
									'<th>智龄(月)</th>'+
									'<th>发育商(DQ)</th>'+
								'</tr>'+
								'<tr>'+
									'<td>大运动</td>'+
									'<td>'+listData.reportData.scoreSport.toFixed(1)+'</td>'+
									'<td>'+listData.reportData.scoreSportDq.toFixed(1)+'</td>'+
								'</tr>'+
								'<tr>'+
									'<td>精细运动</td>'+
									'<td>'+listData.reportData.scoreAct.toFixed(1)+'</td>'+
									'<td>'+listData.reportData.scoreActDq.toFixed(1)+'</td>'+
								'</tr>'+
								'<tr>'+
									'<td>适应能力</td>'+
									'<td>'+listData.reportData.scoreAdapt.toFixed(1)+'</td>'+
									'<td>'+listData.reportData.scoreAdaptDq.toFixed(1)+'</td>'+
								'</tr>'+
								'<tr>'+
									'<td>语言</td>'+
									'<td>'+listData.reportData.scoreLanguage.toFixed(1)+'</td>'+
									'<td>'+listData.reportData.scoreLanguageDq.toFixed(1)+'</td>'+
								'</tr>'+
								'<tr>'+
									'<td>社交行为</td>'+
									'<td>'+listData.reportData.scoreSocial.toFixed(1)+'</td>'+
									'<td>'+listData.reportData.scoreSocialDq.toFixed(1)+'</td>'+
								'</tr>'+
								'<tr>'+
									'<td>综合</td>'+
									'<td>'+listData.reportData.dq.toFixed(1)+'</td>'+
									'<td>'+listData.reportData.growth.toFixed(1)+'</td>'+
								'</tr>';
						$('.resultTable').html(str)
					}
				});
			}
			//0-2测试结果
			//showResult0_2();
			function showResult0_2(index,reportType){
				nameDate = [{text: '关注度',max: 1},{text: '生活的\n丰富多样性',max: 1},{text: '参与',max: 1},{text: '学习材料',max: 1},{text: '养育环境',max: 1},{text: '接纳',max: 1}];
				$.ajax({
					type:"get",
					url:url+"weChat/report/b/"+index+"/"+reportType,
					async:false,
					success:function(data){
//						console.log(data);
						var str = '';
						var listData = data.data;
						$('.babyName').html(listData.babyInfo.babyName);
						$('.babyBirthday').html(listData.babyInfo.babyBirthDay);
						$('.normal h6').html('被访问者与儿童的关系：'+listData.reportData.resultDetail.answerRelation);
						if (listData.babyInfo.babySex==1) {
							$('.babyGenderName').html('男');
							$('.header').attr('src','../img/boyImg.png')
						} else{
							$('.babyGenderName').html('女');
							$('.header').attr('src','../img/grilImg.png')
						}
						if (data.data.docAdvice=='') {
							$('.specialistBox p').html('无');
						} else{
							$('.specialistBox p').html(data.data.docAdvice);
						}
						barData.push((parseInt(listData.reportData.resultDetail.a1) / 11).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a6) / 5).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a5) / 6).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a4) / 9).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a3) / 6).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a2) / 8).toFixed(2));
						
						
						
						
							str = '<tr>'+
										'<th>测评项/<br />得分项</th>'+
										'<th>个人得分</th>'+
										'<th>应得分</th>'+
										'<th>百分位数范围</th>'+
										'<th>评估意见</th>'+
									'</tr>'+
									'<tr>'+
										'<td>关注度</td>'+
										'<td>'+listData.reportData.resultDetail.a1+'</td>'+
										'<td>'+11+'</td>'+
										'<td>'+listData.reportData.resultDetail.p1+'</td>'+
										'<td>'+listData.reportData.resultDetail.r1+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>接纳</td>'+
										'<td>'+listData.reportData.resultDetail.a2+'</td>'+
										'<td>'+8+'</td>'+
										'<td>'+listData.reportData.resultDetail.p2+'</td>'+
										'<td>'+listData.reportData.resultDetail.r2+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>养育环境</td>'+
										'<td>'+listData.reportData.resultDetail.a3+'</td>'+
										'<td>'+6+'</td>'+
										'<td>'+listData.reportData.resultDetail.p3+'</td>'+
										'<td>'+listData.reportData.resultDetail.r3+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>学习材料</td>'+
										'<td>'+listData.reportData.resultDetail.a4+'</td>'+
										'<td>'+9+'</td>'+
										'<td>'+listData.reportData.resultDetail.p4+'</td>'+
										'<td>'+listData.reportData.resultDetail.r4+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>参与</td>'+
										'<td>'+listData.reportData.resultDetail.a5+'</td>'+
										'<td>'+6+'</td>'+
										'<td>'+listData.reportData.resultDetail.p5+'</td>'+
										'<td>'+listData.reportData.resultDetail.r5+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>生活的<br />丰富多样性</td>'+
										'<td>'+listData.reportData.resultDetail.a6+'</td>'+
										'<td>'+5+'</td>'+
										'<td>'+listData.reportData.resultDetail.p6+'</td>'+
										'<td>'+listData.reportData.resultDetail.r6+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>总和</td>'+
										'<td>'+listData.reportData.a0+'</td>'+
										'<td>'+45+'</td>'+
										'<td>'+listData.reportData.p0+'</td>'+
										'<td>'+listData.reportData.r0+'</td>'+
									'</tr>'
									
							$('.resultTable').html(str)
					}
				});
			}
			
			//3-6测试结果
			//showResult3_6();
			function showResult3_6(index,reportType){
				nameDate = [{text: '育儿观念',max: 1},{text: '安全和居住环境',max: 1},{text: '玩耍和娱乐',max: 1},{text: '语言环境',max: 1},{text: '学习环境',max: 1},{text: '养育关系\n和沟通',max: 1},{text: '规矩或\n自我调控\n能力',max: 1},{text: '关注和接纳',max: 1}];
				//获取数据图
				$.ajax({
					type:"get",
					url:url+"weChat/report/b/"+index+"/"+reportType,
					async:false,
					headers: {
				        "token":token,
				    },
					data:{
						id:36
					},
					success:function(data){
//						console.log(data);
						var str = '';
						var listData = data.data;
						$('.babyName').html(listData.babyInfo.babyName);
						$('.babyBirthday').html(listData.babyInfo.babyBirthDay);
						$('.normal h6').html('被访问者与儿童的关系：'+listData.reportData.resultDetail.answerRelation);
						if (listData.babyInfo.babySex==1) {
							$('.babyGenderName').html('男');
							$('.header').attr('src','../img/boyImg.png')
						} else{
							$('.babyGenderName').html('女');
							$('.header').attr('src','../img/grilImg.png')
						}
						if (data.data.docAdvice=='') {
							$('.specialistBox p').html('无');
						} else{
							$('.specialistBox p').html(data.data.docAdvice);
						}
						barData.push((parseInt(listData.reportData.resultDetail.a1) / 12).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a8) / 12).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a7) / 16).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a6) / 10).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a5) / 12).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a4) / 14).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a3) / 12).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a2) / 12).toFixed(2));
							str = '<tr>'+
										'<th>测试项目</th>'+
										'<th>个人得分</th>'+
										'<th>应得分</th>'+
										'<th>百分位数范围</th>'+
										'<th>评估意见</th>'+
									'</tr>'+
									'<tr>'+
										'<td>育儿观念</td>'+
										'<td>'+listData.reportData.resultDetail.a1+'</td>'+
										'<td>'+12+'</td>'+
										'<td>'+listData.reportData.resultDetail.p1+'</td>'+
										'<td>'+listData.reportData.resultDetail.r1+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>关注和接纳</td>'+
										'<td>'+listData.reportData.resultDetail.a2+'</td>'+
										'<td>'+12+'</td>'+
										'<td>'+listData.reportData.resultDetail.p2+'</td>'+
										'<td>'+listData.reportData.resultDetail.r2+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>规矩或自我<br />调控能力</td>'+
										'<td>'+listData.reportData.resultDetail.a3+'</td>'+
										'<td>'+12+'</td>'+
										'<td>'+listData.reportData.resultDetail.p3+'</td>'+
										'<td>'+listData.reportData.resultDetail.r3+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>养育关系和沟通</td>'+
										'<td>'+listData.reportData.resultDetail.a4+'</td>'+
										'<td>'+14+'</td>'+
										'<td>'+listData.reportData.resultDetail.p4+'</td>'+
										'<td>'+listData.reportData.resultDetail.r4+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>学习环境</td>'+
										'<td>'+listData.reportData.resultDetail.a5+'</td>'+
										'<td>'+12+'</td>'+
										'<td>'+listData.reportData.resultDetail.p5+'</td>'+
										'<td>'+listData.reportData.resultDetail.r5+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>语言环境</td>'+
										'<td>'+listData.reportData.resultDetail.a6+'</td>'+
										'<td>'+10+'</td>'+
										'<td>'+listData.reportData.resultDetail.p6+'</td>'+
										'<td>'+listData.reportData.resultDetail.r6+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>玩耍和娱乐</td>'+
										'<td>'+listData.reportData.resultDetail.a7+'</td>'+
										'<td>'+16+'</td>'+
										'<td>'+listData.reportData.resultDetail.p7+'</td>'+
										'<td>'+listData.reportData.resultDetail.r7+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>安全和居住环境</td>'+
										'<td>'+listData.reportData.resultDetail.a8+'</td>'+
										'<td>'+12+'</td>'+
										'<td>'+listData.reportData.resultDetail.p8+'</td>'+
										'<td>'+listData.reportData.resultDetail.r8+'</td>'+
									'</tr>'+
									'<tr>'+
										'<td>总和</td>'+
										'<td>'+listData.reportData.a0+'</td>'+
										'<td>'+100+'</td>'+
										'<td>'+listData.reportData.p0+'</td>'+
										'<td>'+listData.reportData.r0+'</td>'+
									'</tr>'
									
							$('.resultTable').html(str)
					}
				});
			}
			//学前50题测
			//showResult5_0()
			function showResult5_0(index,reportType){
				nameDate = [{text: 'SC',max: 1},{text: 'GK',max: 1},{text: 'T',max: 1},{text: 'E',max: 1},{text: 'M',max: 1},{text: 'L',max: 1}];
				//获取数据图
				$.ajax({
					type:"get",
					url:url+"weChat/report/b/"+index+"/"+reportType,
					async:false,
					success:function(data){
//						console.log(data);
						var str = '';
						var listData = data.data;
						var strin = '<div class="annotation"><h6>注释：</h6><ul><li><span>*SC(Self-Cognition)自我认识</span><span>*E(Espial)观察</span></li><li><span>*L(Locomotion)运动</span><span>*T(Thought)思维</span></li>	<li><span>*M(memory)记忆</span><span>*GK(General-Knowledge)常识</span></li></ul></div>';
						$('.normal').append(strin);
						$('.babyName').html(listData.babyInfo.babyName);
						$('.normal h6').html('评定结果：'+listData.reportData.resultDetail.level);
						$('.babyBirthday').html(listData.babyInfo.babyBirthDay);
						if (listData.babyInfo.babySex==1) {
							$('.babyGenderName').html('男');
							$('.header').attr('src','../img/boyImg.png')
						} else{
							$('.babyGenderName').html('女');
							$('.header').attr('src','../img/grilImg.png')
						}
						if (data.data.docAdvice=='') {
							$('.specialistBox p').html('无');
						} else{
							$('.specialistBox p').html(data.data.docAdvice);
						}
						barData.push((parseInt(listData.reportData.resultDetail.a1) / 13).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a6) / 5).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a5) / 9).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a4) / 6).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a3) / 4).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a2) / 13).toFixed(2));
							str = '<tr>'+
										'<th>领域</th>'+
										'<th>SC</th>'+
										'<th>L</th>'+
										'<th>M</th>'+
										'<th>E</th>'+
										'<th>T</th>'+
										'<th>GK</th>'+
										'<th>粗分</th>'+
										'<th>能力商</th>'+
									'</tr>'+
									'<tr>'+
										'<td>得分</td>'+
										'<td>'+listData.reportData.resultDetail.a1+'</td>'+
										'<td>'+listData.reportData.resultDetail.a2+'</td>'+
										'<td>'+listData.reportData.resultDetail.a3+'</td>'+
										'<td>'+listData.reportData.resultDetail.a4+'</td>'+
										'<td>'+listData.reportData.resultDetail.a5+'</td>'+
										'<td>'+listData.reportData.resultDetail.a6+'</td>'+
										'<td>'+listData.reportData.a0+'</td>'+
										'<td>'+listData.reportData.talent+'</td>'+
									'</tr>'
									
							$('.resultTable').html(str)
					}
				});
			}
			//婴儿-初中
			//showResult132();
			function showResult132(index,reportType){
				nameDate = [{text: 'SH',max: 1},{text: 'SD',max: 1},{text: 'S',max: 1},{text: 'C',max: 1},{text: 'O',max: 1},{text: 'L',max: 1}];
				//获取数据图
				$.ajax({
					type:"get",
					url:url+"weChat/report/b/"+index+"/"+reportType,
					async:false,
					headers: {
				        "token":token,
				    },
					data:{
						id:70
					},
					success:function(data){
//						console.log(data);
						var str = '';
						var listData = data.data;
						var strin = '<div class="annotation"><h6>注释：</h6><ul><li><span>*SH(Self-help)独立生活能力</span><span>*L(Locomotion)运动能力</span></li><li><span>*O(Occupation)作业操作</span><span>*C(Communication)交往</span></li>	<li><span>*S(Socialization)参加集体活动</span><span>*SD(Self-Direction)自我管理</span></li></ul></div>';
						$('.babyName').html(listData.babyInfo.babyName);
						$('.normal h6').html('评定结果：'+listData.reportData.resultDetail.level);
						$('.babyBirthday').html(listData.babyInfo.babyBirthDay);
						if (listData.babyInfo.babySex==1) {
							$('.babyGenderName').html('男');
							$('.header').attr('src','../img/boyImg.png')
						} else{
							$('.babyGenderName').html('女');
							$('.header').attr('src','../img/grilImg.png')
						}
						if (data.data.docAdvice=='') {
							$('.specialistBox p').html('无');
						} else{
							$('.specialistBox p').html(data.data.docAdvice);
						}
						barData.push((parseInt(listData.reportData.resultDetail.a1) / 30).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a6) / 19).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a5) / 24).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a4) / 22).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a3) / 19).toFixed(2));
						barData.push((parseInt(listData.reportData.resultDetail.a2) / 18).toFixed(2));
						$('.normal').append(strin)
							str = '<tr>'+
										'<th>领域</th>'+
										'<th>SH</th>'+
										'<th>L</th>'+
										'<th>O</th>'+
										'<th>C</th>'+
										'<th>S</th>'+
										'<th>SD</th>'+
										'<th>粗分</th>'+
										'<th>标准分</th>'+
									'</tr>'+
									'<tr>'+
										'<td>得分</td>'+
										'<td>'+listData.reportData.resultDetail.a1+'</td>'+
										'<td>'+listData.reportData.resultDetail.a2+'</td>'+
										'<td>'+listData.reportData.resultDetail.a3+'</td>'+
										'<td>'+listData.reportData.resultDetail.a4+'</td>'+
										'<td>'+listData.reportData.resultDetail.a5+'</td>'+
										'<td>'+listData.reportData.resultDetail.a6+'</td>'+
										'<td>'+listData.reportData.a0+'</td>'+
										'<td>'+listData.reportData.normal+'</td>'+
									'</tr>'
									
							$('.resultTable').html(str)
					}
				});
			}
//			console.log(barData);
//			console.log(nameDate)
			require.config({
				paths: {
					echarts: 'http://echarts.baidu.com/build/dist'
				}
			});
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
							radius: 100, //半径
							center: ['50%', '50%'], // 图的位置
							name: {
								// show: true, // 是否文字
								// formatter: null, // 文字的显示形式
								textStyle: {
									color: '#999' // 文字颜色
								}
							},
							indicator: nameDate,
						}],
//						calculable: true,
						series: [{
							name: '',
							type: 'radar',
							symbol: 'emptyCircle',
							symbolSize: 2,
//							calculable: true,
							itemStyle: {
								normal: {
									color:'rgb(109,215,217)',
									areaStyle: {
										type: 'default',
										color: "rgba(109,215,217,0.5)"
									}
								}
							},
							data: [{
									value: barData,
									name: '结果',
								},
							]
						}]
					};
					
					// 为echarts对象加载数据 
					myChart.setOption(option);
				}
			);