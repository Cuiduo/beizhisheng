<style scoped>
	.el-col-2{
		width: 140px;
	}
</style>
<template>
  <div class="login-container">
    <el-container>
      <el-header class="login-header" height="70px">
        <el-row :gutter="20">
          <el-col :offset="1" :span="19" style="text-align: left;">
            <span class="logo_text" :style="hospitalName?'border-right: 1px solid #666666;padding-right: 10px;font-weight: 600;color: #666666;':''">{{hospitalName}}</span>
            &nbsp;&nbsp;<span style="color: #5C5C5C;font-size: 20px;">儿童健康发育测评云平台</span></el-col>
        </el-row>
      </el-header>
      <el-main>
        <div class="main_1">
          <div class="block">
            <el-carousel trigger="click" height="520px">
              <el-carousel-item v-for="item in carousel" :key="item">
                <img :src="item" class="carousel_img">
              </el-carousel-item>
            </el-carousel>
              <el-form class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
                <p class="title">用户登录</p>
                <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          手机号
        </span>
                  <span class="span_vertical">|</span>
                  <el-input name="username" type="text" v-model="loginForm.username" autoComplete="off" placeholder="请输入" />
                </el-form-item>
                <el-form-item prop="password">
        <span class="svg-container">
         密&nbsp;&nbsp;&nbsp;码
        </span>
                  <span class="span_vertical">|</span>
                  <el-input name="password" :type="pwdType" @keyup.enter.native="handleLogin" v-model="loginForm.password" autoComplete="on"
                            placeholder="请输入"></el-input>
                  <span class="show-pwd" @click="showPwd"><svg-icon icon-class="eye" /></span>
                </el-form-item>
                <el-form-item style="background: transparent;border:0">
                  <el-col :span="7">
                    <el-button type="primary" style="width:100%;" class="form-button" :loading="loading" @click.native.prevent="handleLogin">
                      登录
                    </el-button>
                  </el-col>
                  <el-col :span="5" :offset="1">
                    <el-checkbox v-model="checked" @change="rememberUsername()">记住手机号码</el-checkbox>
                  </el-col>
                </el-form-item>
              </el-form>
          </div>
        </div>
        <div class="main_2"  :style="{backgroundImage: 'url(' + layer_Background + ')' }">
          <el-row :gutter="20" style="height: 100%;">
            <el-col :xs="11" :sm="8" :md="11" :lg="11" :xl="12" :offset="2">
              <div class="information">最新动态</div>
              <div class="information_content">
                <el-card v-for="(item,index) in news" :key="index" class="box-card" :style="index===0?'border-bottom:1px dashed #000000;padding-top:20px':'padding-top:20px'">
                  <div slot="header" class="clearfix">
                    <span>{{item.title}}</span>
                  </div>
                  <div class="text item">
                    {{item.content}}
                  </div>
                </el-card>
              </div>
            </el-col>
            <el-col :xs="20" :sm="3" :md="9" :lg="1" :xl="1" :offset="2"><div class="two_code_div">
              <div class="two_code">
                <p style="line-height: 0;">扫码获取更多服务</p>
                <p><img style="width: 144px;" :src="img_code" width="50%"></p>
                <!-- <p style="line-height: 20px;margin-top: -10px;">《父母育儿评估测量表》</p> -->
              </div>
            </div></el-col>
          </el-row>
        </div>
      </el-main>
      <el-footer class="footer" height="50px;">Copyright  All Right Reserved by 协顺祥(2018)  <span style="padding-left: 5px;">京ICP备17051522号-1</span></el-footer>
    </el-container>
  </div>
</template>

<script>
  import logo from '@/assets/logo/logo.png'
  /* import carousel from '@/assets/login/carousel.png'*/
  import carousel from '@/assets/login/loginbn.png'
  import layer_Background from '@/assets/login/layer_Background.png'
  import img_code from '@/assets/login/two-code.jpg'
  import { getNews, getLogo, getBanner, getHospitalName } from '@/api/login'
  import Cookies from 'js-cookie'
  import './index.scss'

  export default {
    name: 'login',
    data() {
      return {
        logo: undefined,
        img_code: img_code,
        carousel: [],
        hospitalName: '',
        checked: undefined,
        layer_Background: layer_Background,
        loginForm: {
          username: '',
          password: ''
        },
        loginRules: {
          username: [{ required: true, trigger: 'blur', message: '请输入正确的手机号' }],
          password: [{ required: true, trigger: 'blur', message: '请输入正确的密码' }]
        },
        loading: false,
        news: null,
        pwdType: 'password'
      }
    },
    created() {
      this.getNews();
      console.log("请联系开发人员")
      if (Cookies.get('username')) {
        this.checked = true
        this.loginForm.username = Cookies.get('username')
      }

      const hospitalId = Cookies.get('hospitalId')
      if (hospitalId) {
        this.getLogo(hospitalId)
        // this.getBanner(hospitalId)
        this.getHospitalName(hospitalId)
        this.carousel.push(carousel)
      } else {
        this.logo = logo
        this.carousel.push(carousel)
        this.hospitalName = ''
      }
    },
    methods: {
      rememberUsername() {
        if (this.checked) {
          Cookies.set('username', this.loginForm.username)
        } else {
          Cookies.set('username', '')
        }
      },
      getNews() {
        getNews().then(response => {
          this.news = response.data
        })
      },
      getLogo() {
        getLogo(Cookies.get('hospitalId')).then(response => {
          this.logo = response.data.imgSrc
        }).catch(() => {
          this.logo = logo
        })
      },
      getBanner() {
        getBanner(Cookies.get('hospitalId')).then(response => {
          this.carousel.push(response.data.imgSrc)
        }).catch(() => {
          this.carousel.push(carousel)
        })
      },
      getHospitalName() {
        getHospitalName(Cookies.get('hospitalId')).then(response => {
          this.hospitalName = response.data.hospitalName
        }).catch(() => {
          this.hospitalName = ''
        })
      },
      showPwd() {
        if (this.pwdType === 'password') {
          this.pwdType = ''
        } else {
          this.pwdType = 'password'
        }
      },
      handleLogin: function() {
        this.$refs.loginForm.validate(valid => {
          if (valid) {
            this.loading = true
            this.rememberUsername()
            this.$store.dispatch('Login', this.loginForm).then(() => {
              this.loading = false
              this.$router.push({ path: '/' })
            }).catch(() => {
              this.loading = false
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>
