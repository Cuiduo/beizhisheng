//var url = 'http://192.168.1.197:8080/';
//开发
//var url = 'http://saysocool.s1.natapp.cc/';
//测试
//var url = 'http://gat.bbwin.com.cn/proxy/bbwin-wechat/';
//内测
//var url = 'http://pre.bbwin.com.cn/proxy/bbwin-wechat/';
//正式
var url = 'http://online.bbwin.com.cn/proxy/bbwin-wechat/';

//获取jssdk参数
var jssdk = url+"weChats/authorize/getWxJSConfig/";
var appid = 'wx7781d1c8b61164be',
	token = localStorage.openId;
var wxurl = window.location.href.split('#')[0];
//分享
function share() {
	$.ajax({ //获取微信的签名等参数
		type: 'get',
		url: url+'weChats/authorize/getWxJSConfig',
		dataType: "json",
		data: {
			url: wxurl,
			openId: token
		},
		success: function(data) {
//			console.log(data.data);
			var data = data.data;
			var timestamp = data.timestamp;
			var nonceStr = data.nonceStr;
			var signature = data.signature;
			wx.config({
				debug: false,
				appId: appid,
				timestamp: timestamp,
				nonceStr: nonceStr,
				signature: signature,
				jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage']
			});
			wx.error(function(res) {
				//console.log(res)
			});
		},
		error: function(e) {
			console.log(e)
		}
	})
	wx.ready(function() {
		wx.onMenuShareTimeline({
			title: '贝智生',
			link: 'http://baby.bbwin.com.cn/index.html',
			imgUrl: 'http://baby.bbwin.com.cn/img/logo.png',
			success: function(e) {
				//alert(e)
			},
			cancel: function(e) {
				//alert(e)
				// 用户取消分享后执行的回调函数
			}
		});
		wx.onMenuShareAppMessage({
			title: '贝智生',
			desc: '贝智生健康发育训练智能平台',
			link: 'http://baby.bbwin.com.cn/index.html',
			imgUrl: 'http://baby.bbwin.com.cn/img/logo.png',
			success: function(e) {
				//alert(e)
			},
			cancel: function(e) {
				//alert(e)
			}
		});
	});
}

//share();

//end
function getQueryString(name, str) { 
	str = str || decodeURIComponent(window.location.search);
	var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
	var r = str.substr(1).match(reg);
	if(r != null) {
		return unescape(r[2]);
	}
	return null;
}
