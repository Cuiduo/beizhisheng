//播放视频
var player = videojs('my-player',{
    muted: true,
    controls : true,  
    loop : true,
    // 更多配置.....
});

var player2 = videojs('my-player2',{
    muted: true,
    controls : true,  
    loop : true,
    // 更多配置.....
});

var test = getQueryString('test');
var bool = true;
if(test !== null) {
	pushHistory();
	window.addEventListener("popstate", function(e) {
		WeixinJSBridge.call('closeWindow');
	}, false);
}

function pushHistory() {
	var state = {
		title: "title",
		url: "#"
	};
	window.history.pushState(state, "title", "#");
}


//框架初始化
var slide2 = '',
	slide3 = '',
	slide4 = '',
	index = 0;
	if (typeof getQueryString('index') != 'undefined'||getQueryString('index')!=undefined) {
		index = getQueryString('index')
	}
	var openId = getQueryString("openId");
	localStorage.openId = openId;
	$('.cower').click(function(){
		$(this).hide();
		$('.codeBox').hide();
	});
	$.ajax({
			type:"get",
			url:url+"weChat/getCorrelation/"+openId,
			async:false,
			success:function(data){
				//console.log(data);
				var data = data.data;
				localStorage.babyAge = data.babyAge;
				//判断做没做手机关联
				if (data.babyAge==-1) {
					
				}else if(data.babyAge<3){
					
				}else if(data.babyAge>36){
					
				}else{
					localStorage.index=data.latestReportId;
					localStorage.babyId = data.babyId;
					$('.slide2').remove();
					//location.href='src/judge.html?babyAge='+data.babyAge+'&firstFlag='+data.firstFlag;
				}
			}
	});
	//开始测评
	$('.gotest .nextbt').click(function(){
		
			$.ajax({
				type:"get",
				url:url+"weChat/getCorrelation/"+openId,
				async:true,
				success:function(data){
					console.log(data);
					var data = data.data;
					localStorage.babyAge = data.babyAge;
					//判断做没做手机关联
					localStorage.index=data.latestReportId;
					localStorage.babyId = data.babyId;
					if (data.firstFlag) {
						location.href='src/question.html?test=1';
					} else{
						location.href='src/judge.html?babyAge='+data.babyAge+'&firstFlag='+data.firstFlag;
					}
					
				}
			});
		
	})
var swiper = new Swiper('.swiper-container', {
	direction: 'vertical',
	initialSlide: index,
	longSwipesRatio: 0.1,
	observer: true,
	allowSwipeToNext : true,
	observeParents: true,
//	touchRatio : 0.3,
	longSwipes : true,
	onTouchStart: function(swiper,even){
		if ($('.swiper-slide').is('.slide2')) {
			if (swiper.activeIndex==1) {
				swiper.params.allowSwipeToNext=false; 
				//swiper.init();
			} else{
				swiper.params.allowSwipeToNext=true; 
			}
		}
    },
	onSlideChangeEnd: function(swiper) {
		if ($('.swiper-slide').is('.slide2')) {
			if (swiper.activeIndex==1) {
				swiper.params.allowSwipeToNext=false; 
				//swiper.init();
			} else{
				swiper.params.allowSwipeToNext=true; 
			}
		} else{
			
		}
		if (swiper.activeIndex==8) {
			player.pause();
		} else if(swiper.activeIndex==7){
			player2.pause();
		}
		
		
		//					if (swiper.activeIndex==1) {
		//						if (slide2=='') {
		//							$.ajax({
		//								type:"get",
		//								url:"http://prod.bbwin.com.cn/login/getNews",
		//								async:true,
		//								success:function(data){
		//									//console.log(data.data);
		//									slide2=data.data;
		//									console.log(slide2[0].content)
		//									$('.slide2').html(slide2[0].content);
		////									swiper.init();
		//								}
		//							});
		//						}
		//					} else{
		//						console.log('回显数据不用请求')
		//					}
		// swiper.activeIndex 这个就是索引， 从 0 开始！ 可看一共有多少元素！
	},
});
//第二屏宝宝名字
$("#babyName").blur(function(){
    var username = /^[\u4E00-\u9FA5A-Za-z]+$/;
	if ($(this).val().length>20) {
    	$(this).focus();
    	return false;
	} else{
		if(!username.test($("#babyName").val())){
        	$(this).val("");
        	$(this).focus();
        	return false;
        }
	}
    
});

//选择男孩女孩
var babyGender = 1;
$('.babyHead').click(function(){
	$(this).attr('src','../img/boyschose.png');
	$('.babyHeadg').attr('src','../img/grils.png');
	babyGender = 1;
})
$('.babyHeadg').click(function(){
	babyGender = 0;
	$(this).attr('src','../img/grillschose.png');
	$('.babyHead').attr('src','../img/boys.png');
})

$('.affirm .nextbt').click(function(){
	if ($('.guanxi option:selected').val()=='') {
		$('.tipss').html('请完善信息');
		showpho();
		return;
	}
	if ($('#babyName').val()=='') {
		$('.tipss').html('请完善信息');
		showpho();
		return;
	}
	$.ajax({
		type:"post",
		url:url+"weChat/insertBaby",
		async:true,
		contentType: "application/json",
		data: JSON.stringify({
			birthday:'2018-4-6',
			relation:$('.guanxi option:selected').val(),
			openId:openId,
			babyName:$('#babyName').val(),
			babySex:babyGender
		}),
		success:function(data){
			console.log(data);
			if (data.status==200) {
				localStorage.babyId = data.data.babyId;
				localStorage.babyAge = data.data.monthAge;
				swiper.params.allowSwipeToNext=true; 
				swiper.slideTo(2);
			} else{
				return false;
			}
			
		}
	});
	
});
//显示函数
function showpho(){
    $(".tipss").show();
    setTimeout(hidpho,1000);
}
//隐藏函数
function hidpho(){
    $(".tipss").hide();
}
//区域可以滑动
var startScroll, touchStart, touchCurrent;
swiper.slides.on("touchstart", function(e) {
	startScroll = this.scrollTop;
	touchStart = e.targetTouches[0].pageY
}, true);
swiper.slides.on("touchmove", function(e) {
	touchCurrent = e.targetTouches[0].pageY;
	var touchesDiff = touchCurrent - touchStart;
	var slide = this;
	var onlyScrolling = (slide.scrollHeight > slide.offsetHeight) && ((touchesDiff < 0 && startScroll === 0) || (touchesDiff > 0 && startScroll === (slide.scrollHeight - slide.offsetHeight)) || (startScroll > 0 && startScroll < (slide.scrollHeight - slide.offsetHeight)));
	if(onlyScrolling) {
		e.stopPropagation()
	}
}, true);


//选择男孩女孩
var babyGender = 1;
$('.babyHead').click(function(){
	$(this).attr('src','img/boyschose.png');
	$('.babyHeadg').attr('src','img/grils.png');
	babyGender = 1;
})
$('.babyHeadg').click(function(){
	babyGender = 0;
	$(this).attr('src','img/grillschose.png');
	$('.babyHead').attr('src','img/boys.png');
})