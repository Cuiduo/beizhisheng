webpackJsonp([4],{Didj:function(n,t,e){n.exports=e.p+"static/img/layer_Background.b516a8c.png"},LqzL:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,"\n.el-col-2[data-v-69f3c23b]{\n\twidth: 140px;\n}\n",""])},"T+/8":function(n,t,e){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("Pl8J"),i=e.n(o),a=e("wLCt"),r=e.n(a),s=e("Didj"),l=e.n(s),c=e("i8gj"),d=e.n(c),p=e("M9A7"),g=e("lbHh"),h=e.n(g),f=(e("rrUs"),{name:"login",data:function(){return{logo:void 0,img_code:d.a,carousel:[],hospitalName:"",checked:void 0,layer_Background:l.a,loginForm:{username:"",password:""},loginRules:{username:[{required:!0,trigger:"blur",message:"请输入正确的手机号"}],password:[{required:!0,trigger:"blur",message:"请输入正确的密码"}]},loading:!1,news:null,pwdType:"password"}},created:function(){this.getNews(),console.log("请联系开发人员"),h.a.get("username")&&(this.checked=!0,this.loginForm.username=h.a.get("username"));var n=h.a.get("hospitalId");n?(this.getLogo(n),this.getHospitalName(n),this.carousel.push(r.a)):(this.logo=i.a,this.carousel.push(r.a),this.hospitalName="")},methods:{rememberUsername:function(){this.checked?h.a.set("username",this.loginForm.username):h.a.set("username","")},getNews:function(){var n=this;Object(p.g)().then(function(t){n.news=t.data})},getLogo:function(){var n=this;Object(p.f)(h.a.get("hospitalId")).then(function(t){n.logo=t.data.imgSrc}).catch(function(){n.logo=i.a})},getBanner:function(){var n=this;Object(p.b)(h.a.get("hospitalId")).then(function(t){n.carousel.push(t.data.imgSrc)}).catch(function(){n.carousel.push(r.a)})},getHospitalName:function(){var n=this;Object(p.c)(h.a.get("hospitalId")).then(function(t){n.hospitalName=t.data.hospitalName}).catch(function(){n.hospitalName=""})},showPwd:function(){"password"===this.pwdType?this.pwdType="":this.pwdType="password"},handleLogin:function(){var n=this;this.$refs.loginForm.validate(function(t){if(!t)return!1;n.loading=!0,n.rememberUsername(),n.$store.dispatch("Login",n.loginForm).then(function(){n.loading=!1,n.$router.push({path:"/"})}).catch(function(){n.loading=!1})})}}}),u={render:function(){var n=this,t=n.$createElement,e=n._self._c||t;return e("div",{staticClass:"login-container"},[e("el-container",[e("el-header",{staticClass:"login-header",attrs:{height:"70px"}},[e("el-row",{attrs:{gutter:20}},[e("el-col",{staticStyle:{"text-align":"left"},attrs:{offset:1,span:19}},[e("span",{staticClass:"logo_text",style:n.hospitalName?"border-right: 1px solid #666666;padding-right: 10px;font-weight: 600;color: #666666;":""},[n._v(n._s(n.hospitalName))]),n._v("\n            "),e("span",{staticStyle:{color:"#5C5C5C","font-size":"20px"}},[n._v("儿童健康发育测评云平台")])])],1)],1),n._v(" "),e("el-main",[e("div",{staticClass:"main_1"},[e("div",{staticClass:"block"},[e("el-carousel",{attrs:{trigger:"click",height:"520px"}},n._l(n.carousel,function(n){return e("el-carousel-item",{key:n},[e("img",{staticClass:"carousel_img",attrs:{src:n}})])})),n._v(" "),e("el-form",{ref:"loginForm",staticClass:"login-form",attrs:{autoComplete:"on",model:n.loginForm,rules:n.loginRules,"label-position":"left"}},[e("p",{staticClass:"title"},[n._v("用户登录")]),n._v(" "),e("el-form-item",{attrs:{prop:"username"}},[e("span",{staticClass:"svg-container svg-container_login"},[n._v("\n        手机号\n      ")]),n._v(" "),e("span",{staticClass:"span_vertical"},[n._v("|")]),n._v(" "),e("el-input",{attrs:{name:"username",type:"text",autoComplete:"off",placeholder:"请输入"},model:{value:n.loginForm.username,callback:function(t){n.$set(n.loginForm,"username",t)},expression:"loginForm.username"}})],1),n._v(" "),e("el-form-item",{attrs:{prop:"password"}},[e("span",{staticClass:"svg-container"},[n._v("\n       密   码\n      ")]),n._v(" "),e("span",{staticClass:"span_vertical"},[n._v("|")]),n._v(" "),e("el-input",{attrs:{name:"password",type:n.pwdType,autoComplete:"on",placeholder:"请输入"},nativeOn:{keyup:function(t){return"button"in t||!n._k(t.keyCode,"enter",13,t.key,"Enter")?n.handleLogin(t):null}},model:{value:n.loginForm.password,callback:function(t){n.$set(n.loginForm,"password",t)},expression:"loginForm.password"}}),n._v(" "),e("span",{staticClass:"show-pwd",on:{click:n.showPwd}},[e("svg-icon",{attrs:{"icon-class":"eye"}})],1)],1),n._v(" "),e("el-form-item",{staticStyle:{background:"transparent",border:"0"}},[e("el-col",{attrs:{span:7}},[e("el-button",{staticClass:"form-button",staticStyle:{width:"100%"},attrs:{type:"primary",loading:n.loading},nativeOn:{click:function(t){return t.preventDefault(),n.handleLogin(t)}}},[n._v("\n                    登录\n                  ")])],1),n._v(" "),e("el-col",{attrs:{span:5,offset:1}},[e("el-checkbox",{on:{change:function(t){n.rememberUsername()}},model:{value:n.checked,callback:function(t){n.checked=t},expression:"checked"}},[n._v("记住手机号码")])],1)],1)],1)],1)]),n._v(" "),e("div",{staticClass:"main_2",style:{backgroundImage:"url("+n.layer_Background+")"}},[e("el-row",{staticStyle:{height:"100%"},attrs:{gutter:20}},[e("el-col",{attrs:{xs:11,sm:8,md:11,lg:11,xl:12,offset:2}},[e("div",{staticClass:"information"},[n._v("最新动态")]),n._v(" "),e("div",{staticClass:"information_content"},n._l(n.news,function(t,o){return e("el-card",{key:o,staticClass:"box-card",style:0===o?"border-bottom:1px dashed #000000;padding-top:20px":"padding-top:20px"},[e("div",{staticClass:"clearfix",attrs:{slot:"header"},slot:"header"},[e("span",[n._v(n._s(t.title))])]),n._v(" "),e("div",{staticClass:"text item"},[n._v("\n                  "+n._s(t.content)+"\n                ")])])}))]),n._v(" "),e("el-col",{attrs:{xs:20,sm:3,md:9,lg:1,xl:1,offset:2}},[e("div",{staticClass:"two_code_div"},[e("div",{staticClass:"two_code"},[e("p",{staticStyle:{"line-height":"0"}},[n._v("扫码获取更多服务")]),n._v(" "),e("p",[e("img",{staticStyle:{width:"144px"},attrs:{src:n.img_code,width:"50%"}})])])])])],1)],1)]),n._v(" "),e("el-footer",{staticClass:"footer",attrs:{height:"50px;"}},[n._v("Copyright  All Right Reserved by 协顺祥(2018)  "),e("span",{staticStyle:{"padding-left":"5px"}},[n._v("京ICP备17051522号-1")])])],1)],1)},staticRenderFns:[]};var m=e("VU/8")(f,u,!1,function(n){e("ln2J")},"data-v-69f3c23b",null);t.default=m.exports},Zy77:function(n,t,e){(n.exports=e("FZ+f")(!1)).push([n.i,'.el-row {\n  margin-left: 0 !important;\n  margin-right: 0 !important; }\n\n.login-header {\n  z-index: 100;\n  position: absolute;\n  width: 100%;\n  background-color: rgba(255, 255, 255, 0.7);\n  color: #333;\n  text-align: center;\n  line-height: 70px; }\n\n.logo {\n  background-color: #fff;\n  width: 130px;\n  height: 130px;\n  border-radius: 50%;\n  margin-top: -30px;\n  text-align: center;\n  border: 1px solid #eceff0;\n  -webkit-box-shadow: #dfe6e9 2px 0 30px 0;\n          box-shadow: #dfe6e9 2px 0 30px 0; }\n\n.logo_img {\n  background-color: #fff;\n  width: 102%;\n  height: 100%;\n  margin-left: -1px;\n  border-radius: 50%;\n  overflow: hidden; }\n\n.logo_div {\n  position: absolute;\n  float: right;\n  padding-left: 60%;\n  margin-top: -30%;\n  z-index: 100; }\n\n.logo_text {\n  text-align: left;\n  font-size: 20px;\n  margin-left: 0; }\n\n.carousel_img {\n  display: inline-block;\n  height: 100%;\n  width: 100%;\n  background-size: auto 100%; }\n\n.footer {\n  background-color: #264167;\n  color: #fff;\n  text-align: center;\n  line-height: 50px;\n  font-size: 14px; }\n\n.el-aside {\n  background-color: #D3DCE6;\n  color: #333;\n  text-align: center;\n  line-height: 200px; }\n\n.el-main {\n  background-color: #E9EEF3;\n  color: #333;\n  text-align: center;\n  line-height: 100%;\n  padding: 0; }\n\n.main_2 {\n  height: 500px;\n  width: 100%;\n  background-repeat: no-repeat;\n  background-size: cover; }\n\n.el-carousel__button {\n  width: 7px;\n  height: 7px;\n  border-radius: 50%;\n  border: none; }\n\n.el-carousel__indicator.is-active button {\n  background-color: #7bcce2; }\n\n.title {\n  color: #5a5a5a;\n  font-size: 18px; }\n\n.form-button {\n  background: #0099cc;\n  border-color: #0099cc;\n  color: #fff; }\n\n.el-button--primary:focus, .el-button--primary:hover {\n  background: #0099cc;\n  border-color: #0099cc;\n  color: #fff; }\n\n.el-checkbox__label {\n  color: #6a81a9; }\n\n.el-checkbox__inner {\n  background-color: rgba(255, 255, 255, 0.7); }\n\n.span_vertical {\n  color: #b9b9b9; }\n\n.information {\n  background-color: #5185d0;\n  color: #fff;\n  width: 170px;\n  height: 10%;\n  border-radius: 0 0 6px 6px;\n  line-height: 56px;\n  font-size: 20px; }\n\n.information_content {\n  text-align: left; }\n\n.item {\n  line-height: 25px;\n  margin-bottom: 18px; }\n\n.clearfix:before,\n.clearfix:after {\n  display: table;\n  content: ""; }\n\n.clearfix:after {\n  clear: both; }\n\n.box-card {\n  width: 97%;\n  border: none;\n  background-color: transparent; }\n\n.el-card.is-always-shadow, .el-card.is-hover-shadow:focus, .el-card.is-hover-shadow:hover {\n  -webkit-box-shadow: none;\n  box-shadow: none; }\n\n.solid {\n  border-bottom: dashed #b5b5b5; }\n\n.el-card__header {\n  border-bottom: none;\n  padding: 18px 0;\n  color: #7D7D7D; }\n\n.el-card__body {\n  padding: 0;\n  color: #7D7D7D; }\n\n.two_code_div {\n  position: absolute;\n  float: right;\n  height: 100%;\n  width: 388px;\n  right: 6.5%;\n  background-color: rgba(93, 206, 229, 0.3); }\n\n.two_code {\n  padding: 20px;\n  padding-top: 40px;\n  color: #5185d0;\n  margin: auto;\n  position: absolute;\n  top: 0;\n  left: 0;\n  bottom: 0;\n  right: 0;\n  background-color: #ffffff;\n  width: 219px;\n  height: 253px;\n  border-radius: 5px;\n  line-height: 25px; }\n\n.login-container .el-input {\n  display: inline-block;\n  height: 30px;\n  width: 65%; }\n\n.login-container .el-input input {\n    background: #ffffff;\n    border: 0;\n    -webkit-appearance: none;\n    border-radius: 0;\n    color: #000;\n    height: 30px; }\n\n.login-container .el-input input:-webkit-autofill {\n      -webkit-box-shadow: 0 0 0 1000px #ffffff inset !important;\n      -webkit-text-fill-color: #000 !important; }\n\n.login-container .el-form-item {\n  border: 1px solid rgba(255, 255, 255, 0.1);\n  background: #ffffff;\n  border-radius: 5px;\n  color: #454545;\n  height: 30px;\n  width: 244px; }\n\n.el-form-item__content {\n  line-height: 30px;\n  height: 30px; }\n\n.login-container {\n  height: 100%;\n  width: 100%; }\n\n.login-container .login-form {\n    position: absolute;\n    border-radius: 5px;\n    background-color: rgba(255, 255, 255, 0.7);\n    color: #333;\n    text-align: center;\n    right: 9%;\n    width: 290px;\n    padding: 0 22px 15px 22px;\n    top: 120px;\n    z-index: 100;\n    height: 206px; }\n\n.login-container .tips {\n    font-size: 14px;\n    color: #fff;\n    margin-bottom: 10px; }\n\n.login-container .tips span:first-of-type {\n      margin-right: 16px; }\n\n.login-container .svg-container {\n    border: 1px;\n    color: #2d4f8c;\n    vertical-align: middle;\n    display: inline-block; }\n\n.login-container .show-pwd {\n    position: absolute;\n    right: 10px;\n    top: 7px;\n    font-size: 16px;\n    color: #2d4f8c;\n    cursor: pointer;\n    -webkit-user-select: none;\n       -moz-user-select: none;\n        -ms-user-select: none;\n            user-select: none;\n    display: none; }\n\n.el-col-offset-1 {\n  /* margin-left: 4.16667%; */\n  margin-left: 50px; }\n',""])},i8gj:function(n,t,e){n.exports=e.p+"static/img/two-code.8f184fb.jpg"},ln2J:function(n,t,e){var o=e("LqzL");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e("rjj0")("0c6133cc",o,!0)},rrUs:function(n,t,e){var o=e("Zy77");"string"==typeof o&&(o=[[n.i,o,""]]),o.locals&&(n.exports=o.locals);e("rjj0")("251b5c1b",o,!0)},wLCt:function(n,t,e){n.exports=e.p+"static/img/loginbn.a2ae22e.png"}});