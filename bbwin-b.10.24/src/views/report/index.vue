<template>
  <div class="report-container">

    <div class="report-medical">
      <el-row :gutter="20" :class="isPrint">
        <el-col :span="24"><breadcrumb></breadcrumb></el-col>
      </el-row>
      <div class="report-title">
        <p style="font-weight: 500;font-size: 18px;">{{hospitalName}}</p>
        <p style="font-weight: 600;font-size: 20px;">{{testName[testId]}}&nbsp;检查报告单</p>
      </div>
    </div>

    <div class="appBackground" :style="{backgroundImage: 'url(' + appBackground + ')' }">
      <div :class="medicalPrint">
        <div class="filter-container">
          <div :class="infoPrint" :style="{backgroundImage: 'url(' + background + ')' }">
            <el-row :gutter="20" :style="{ 'padding-left': printStatus ? '0%':'25%'}">
              <el-col :span="16" class="filter-info-basic">
                <h3>小儿基本信息</h3>
                <!--<div class="filter-info-line"></div>-->

                <div class="divTable">
                  　　　　<div class="divTable-row divTable-row-header">
                  　　　　　　<div :class="divPrint">姓名</div>
                  　　　　　　<div :class="divPrint">性别</div>
                  　　　　　　<div :class="divPrint">出生日期</div>
                  　　　　　　<div :class="divPrint">月龄</div>
                  　　　　　　<div :class="divPrint">检查日期</div>
                  　　　　</div>
                  <div class="divTable-row">
                    　　　　　　<div :class="divPrint">{{info.babyName}}</div>
                    　　　　　　<div :class="divPrint"><span v-if="info.babyGenderName===1">男</span>
                                 <span v-else>女</span></div>
                    　　　　　　<div :class="divPrint">{{info.babyBirthday}}</div>
                    　　　　　　<div :class="divPrint">{{info.monthAge}}</div>
                    　　　　　　<div :class="divPrint">{{checkTime}}</div>
                    　　　　</div>
                  　　</div>
              </el-col>
            </el-row>
          </div>
          <div class="filter-results">
            <el-row v-if="this.testId===1" style="background-color: #f5f5f5;">
              <el-col :span="24">
                <div :class="infoBasicPrint">智龄：{{dq}}<span style="padding-left: 6%">发育商DQ：{{growth}}</span></div>
              </el-col>
            </el-row>
            <el-row v-if="this.testId===2 || this.testId===16" style="background-color: #f5f5f5;">
              <el-col :span="24">
                <div :class="infoBasicPrint">被访问者与儿童的关系：{{answerRelation}}</div>
              </el-col>
            </el-row>
            <div v-if="this.testId !==19" style="font-weight: 600;" :class="textPrint">评测结果</div>

            <table :class="rtPrint" v-if="this.testId===1">
              <tr>
                <th>月龄 \ 项目</th>
                <th>大运动</th>
                <th>精细动作</th>
                <th>适应能力</th>
                <th>语言</th>
                <th>社交行为</th>
              </tr>
              <tr v-for="item in list">
                <td>{{item.month}}</td><td>{{item.movement}}</td><td>{{item.sports}}</td>
                <td>{{item.action}}</td><td>{{item.adapt}}</td><td>{{item.social}}</td>
              </tr>
            </table>

              <table :class="rtPrint" v-if="this.testId===2">
                <tr>
                  <th>测试项目</th>
                  <th>育儿观念</th>
                  <th>关注和接纳</th>
                  <th>规矩或自我<br/>调控能力</th>
                  <th>养育关系<br/>和沟通</th>
                  <th>学习环境</th>
                  <th>语言环境</th>
                  <th>玩耍和娱乐</th>
                  <th>安全和<br/>居住环境</th>
                  <th>总和</th>
                </tr>
                <tr v-for="item in list">
                  <td>{{item.project}}</td><td>{{item.a1}}</td><td>{{item.a2}}</td><td>{{item.a3}}</td><td>{{item.a4}}</td>
                  <td>{{item.a5}}</td><td>{{item.a6}}</td><td>{{item.a7}}</td><td>{{item.a8}}</td><td>{{item.sum}}</td>
                </tr>
              </table>

            <table :class="rtPrint" v-if="this.testId===16">
              <tr>
                <th>项目</th>
                <th>关注度</th>
                <th>接纳</th>
                <th>养育环境</th>
                <th>学习材料</th>
                <th>参与</th>
                <th>生活的丰富多样性</th>
                <th>总和</th>
              </tr>
              <tr v-for="item in list">
                <td>{{item.project}}</td><td>{{item.a1}}</td><td>{{item.a2}}</td><td>{{item.a3}}</td><td>{{item.a4}}</td>
                <td>{{item.a5}}</td><td>{{item.a6}}</td><td>{{item.sum}}</td>
              </tr>
            </table>

            <el-row v-if="this.testId===17">
            <table :class="rtPrint">
              <tr>
                <th>领域</th>
                <th>SC</th>
                <th width="60px">L</th>
                <th>M</th>
                <th width="60px">E</th>
                <th>T</th>
                <th width="60px">GK</th>
                <th>粗分</th>
                <th>能力商</th>
              </tr>
              <tr v-for="item in list">
                <td>{{item.project}}</td><td>{{item.a1}}</td><td>{{item.a2}}</td><td>{{item.a3}}</td><td>{{item.a4}}</td>
                <td>{{item.a5}}</td><td>{{item.a6}}</td><td>{{item.sum}}</td><td>{{item.ability}}</td>
              </tr>
            </table>
              <el-row>
                <el-col class="explain" :span="7" :offset="1">*　SC(Self-Cognition)自我认识</el-col>
                <el-col class="explain" :span="7" :offset="1">*　M(memory)记忆</el-col>
                <el-col class="explain" :span="8">*　L(Locomotion)运动</el-col>
              </el-row>
              <el-row>
                <el-col class="explain" :span="7" :offset="1">*　E(Espial)观察</el-col>
                <el-col class="explain" :span="7" :offset="1">*　T(Thought)思维</el-col>
                <el-col class="explain" :span="8">*　GK(General-Knowledge)常识</el-col>
              </el-row>
            </el-row>

            <el-row v-if="this.testId===18">
            <table :class="rtPrint">
              <tr>
                <th>领域</th>
                <th>SH</th>
                <th width="60px">L</th>
                <th>O</th>
                <th width="60px">C</th>
                <th>S</th>
                <th width="60px">SD</th>
                <th>粗分</th>
                <th>标准分</th>
              </tr>
              <tr v-for="item in list">
                <td>{{item.project}}</td><td>{{item.a1}}</td><td>{{item.a2}}</td><td>{{item.a3}}</td><td>{{item.a4}}</td>
                <td>{{item.a5}}</td><td>{{item.a6}}</td><td>{{item.sum}}</td><td>{{item.ability}}</td>
              </tr>
            </table>
              <el-row>
                <el-col class="explain" :span="7" :offset="1">*　SH(Self-help)独立生活能力</el-col>
                <el-col class="explain" :span="7" :offset="1">*　L(Locomotion)运动能力</el-col>
                <el-col class="explain" :span="8">*　O(Occupation)作业操作</el-col>
              </el-row>
              <el-row>

                <el-col class="explain" :span="7" :offset="1">*　C(Communication)交往</el-col>
                <el-col class="explain" :span="7" :offset="1">*　S(Socialization)参加集体活动</el-col>
                <el-col class="explain" :span="8">*　SD(Self-Direction)自我管理</el-col>
              </el-row>
            </el-row>
            <el-row class="filter-chart-text">
              <el-col class="chart-text" :span="12">评定结果<span v-if="this.testId===17">扇形图</span><span v-else>柱状图</span></el-col>
              <el-col class="chart-text" :span="12" :class="chartTextPrint">评定结果网状图</el-col>
            </el-row>



            <el-row v-if="this.testId===1 "    :class="this.rowWidth" >
              <el-col :span="12" class="vLine">
                <div :class="chartPrint1"><vue-highcharts  :options="options0_6_0" ref="lineCharts0_6_0"  style="position:relative;left:50%;margin-left:-200px;width: 350px;"></vue-highcharts></div>
              </el-col>
              <el-col :span="12" >
                <div :class="chartPrint"><raddar-chart class="text2" style="position:relative;left:50%;margin-left:-200px;width: 350px;" :bar-data="barData"></raddar-chart></div>
              </el-col>
            </el-row>


            <el-row v-if="this.testId===2 " :class="this.rowWidth">
              <el-col :span="12" class="vLine">
                <div :class="chartPrint1"><vue-highcharts :options="options3_6" ref="lineCharts3_6" style="position:relative;left:50%;margin-left:-220px;width: 350px;"></vue-highcharts></div>
              </el-col>
              
              <el-col :span="12">
                <div :class="chartPrint"><raddar-chart3_6  style="position:relative;left:50%;margin-left:-200px;width: 350px;" :bar-data="barData"></raddar-chart3_6></div>
              </el-col>
            </el-row>

            <el-row v-if="this.testId===16" :class="this.rowWidth" >
              <el-col :span="12" class="vLine">
                <div :class="chartPrint1"><vue-highcharts :options="options0_2" ref="lineCharts0_2"  style="position:relative;left:50%;margin-left:-230px;width: 350px;" ></vue-highcharts></div>
              </el-col>
              <el-col :span="12">
                <div :class="chartPrint"><raddar-chart0_2  style="position:relative;left:50%;margin-left:-200px;width: 350px;"  :bar-data="barData"></raddar-chart0_2></div>
              </el-col>
            </el-row>

            <el-row v-if="this.testId===17" :class="this.rowWidth"  >
              <el-col :span="12" class="vLine">
                <div :style="!printStatus?'padding: 5% 5% 5% 22%':''" class="printStyleSeven"><bar-chart5_0 :bar-data="barData" style="position:relative;left:50%;margin-left:-230px;top:50px;width: 360px;" ></bar-chart5_0></div>
              </el-col>
              <el-col :span="12">
                <div class="printStyleSeven"><raddar-chart5_0 :bar-data="barData" style="position:relative;left:50%;margin-left:-180px;width: 350px;top:50px;" ></raddar-chart5_0></div>
              </el-col>
            </el-row>

            <el-row v-if="this.testId===18" :class="this.rowWidth" >
              <el-col :span="12" class="vLine">
                <div :class="chartPrint1"><bar-chart1_3_2 :bar-data="barData"  style="position:relative;left:50%;margin-left:-200px;width: 350px;" ></bar-chart1_3_2></div>
              </el-col>
              <el-col :span="12">
                <div :class="chartPrint"><raddar-chart1_3_2 :bar-data="barData"  style="position:relative;left:50%;margin-left:-200px;width: 350px;" ></raddar-chart1_3_2></div>
              </el-col>
            </el-row>

            <el-row v-if="this.testId===19" :class="this.rowWidth" >
              <el-col :span="12" class="vLine">
                <div  :style="!printStatus?'padding: 5% 5% 5% 30%':''" class="printStyleNight"><bar-chart-cognize :bar-data="barData" style="position:relative;left:50%;margin-left:-220px;top:50px;width: 300px;"></bar-chart-cognize></div>
              </el-col>
              <el-col :span="12">
                <div :class="chartPrint"><raddar-chart-cognize :bar-data="barData" style="position:relative;left:50%;margin-left:-180px;width: 360px;"></raddar-chart-cognize></div>
              </el-col>
            </el-row>

            <el-row v-if="this.testId===17 || this.testId===18 || this.testId===19" style="background-color: #f5f5f5;padding-top: 2%;">
              <el-col :span="24">
                <div style="background-color: #ffff;padding: 1%;">评定结果：{{evaluation}}</div>
              </el-col>
            </el-row>
            <div :class="textPrint">医生评价及建议</div>
            <div class="comments">
              <div class="comments-content">
                <!--<el-row class="bLine" v-if="this.testId===1" :class="isPrint">
                  <el-col :span="18" class="vLine">
                    <div :class="chartPrint">
                      <el-tabs tab-position="left" style="height: 200px;">
                        <el-tab-pane label="大运动" style="overflow: scroll;height: 200px;overflow-x: hidden;">
                          <p v-for="item in type1">
                            <el-radio v-model="typeValue1" :label="item.remarks">
                              <span style="word-break: normal;white-space: pre-wrap;word-wrap: break-word;overflow: hidden;">{{item.remarks}}</span>
                            </el-radio>
                          </p>
                        </el-tab-pane>
                        <el-tab-pane label="精细运动" style="overflow: scroll;height: 200px;overflow-x: hidden;">
                          <p v-for="item in type2">
                            <el-radio v-model="typeValue2" :label="item.remarks">
                              <span style="word-break: normal;white-space: pre-wrap;word-wrap: break-word;overflow: hidden;">{{item.remarks}}</span>
                            </el-radio>
                          </p>
                        </el-tab-pane>
                        <el-tab-pane label="适应能力" style="overflow: scroll;height: 200px;overflow-x: hidden;">
                          <p v-for="item in type3">
                            <el-radio v-model="typeValue3" :label="item.remarks">
                              <span style="word-break: normal;white-space: pre-wrap;word-wrap: break-word;overflow: hidden;">{{item.remarks}}</span></el-radio>
                          </p>
                        </el-tab-pane>
                        <el-tab-pane label="语言" style="overflow: scroll;height: 200px;overflow-x: hidden;">
                          <p v-for="item in type4">
                            <el-radio v-model="typeValue4" :label="item.remarks">
                              <span style="word-break: normal;white-space: pre-wrap;word-wrap: break-word;overflow: hidden;">{{item.remarks}}</span>
                            </el-radio>
                          </p>
                        </el-tab-pane>
                        <el-tab-pane label="社交能力" style="overflow: scroll;height: 200px;overflow-x: hidden;">
                          <p v-for="item in type5">
                            <el-radio v-model="typeValue5" :label="item.remarks">
                              <span style="word-break: normal;white-space: pre-wrap;word-wrap: break-word;overflow: hidden;">{{item.remarks}}</span>
                            </el-radio>
                          </p>
                        </el-tab-pane>
                      </el-tabs>
                    </div>
                  </el-col>
                  <el-col :span="6">
                    <div class="filter-chart comments-button"><el-button type="danger" @click="addReviews">添加</el-button></div>
                  </el-col>
                </el-row>-->

                <div class="comments-reviews">
                  <el-input type="textarea" v-model="pushData.advice" ref='advice' :rows="2" @change="saveReviews" resize="none" :autosize="{ minRows: 5, maxRows: 2 }" :placeholder="!printStatus?'请选择评语或者直接输入':''"></el-input>
                </div>

              </div>
              <div :class="peoplePrint">测评者：_____________</div>
            </div>
          </div>
        </div>
        <el-row :gutter="20" :style="{ 'display': !printStatus ? 'none':''}" >
          <el-col :span="15"><img :src="report_code" class="report-code">
            <el-col :span="10" class="report-footer-text"><span style="font-weight: 600;">扫一扫</span><br/>
              <span class="report-footer-span" >更了解你的宝宝</span></el-col>
          </el-col>
        </el-row>



        <el-row :gutter="20" class="evaluation-button" :class="isPrint">
          <el-col :span="24"><el-button type="primary" :loading="loading" @click="print">打印</el-button></el-col>
        </el-row>

      <!-- <div  :class="isPrint">

          <el-tabs  style="height: 200px;">
            <el-tab-pane label="用户管理">
              <el-tabs :tab-position="tabPosition" style="height: 200px;">
                <el-tab-pane label="大运动">
                  <p>大运动1</p>
                  <p>大运动2</p>
                  <p>大运动3</p>
                </el-tab-pane>
                <el-tab-pane label="精细运动">精细运动</el-tab-pane>
                <el-tab-pane label="适应能力">适应能力</el-tab-pane>
                <el-tab-pane label="语言">语言</el-tab-pane>
              </el-tabs>
            </el-tab-pane>
            <el-tab-pane label="配置管理">配置管理</el-tab-pane>
            <el-tab-pane label="角色管理">角色管理</el-tab-pane>
            <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
          </el-tabs>
        </div> -->










      </div>
      <div :class="isPrint" class="recommendBox">
        <div class="recommend">
          <div style="border-bottom: 1px solid #CECECE;height:580px;">
              <div  style="font-weight: 600;" :class="textPrint">医生推荐</div>
              <div style="height:400px;width:70%;float:left;">
                  <div  style="font-weight: 600;" class="textTitle">2月龄 <span>(其他月份训练游戏正在完善中，敬请期待)</span></div>
                  <el-row :gutter="20" class="filter-row"  :style="{ 'margin': '0'}">
                    <el-col :span="12"  v-for="(item, index) in chooseData" :key="index"
                      :style="{ 'padding-top': index > 1 ? '5%':'0%','margin-right':index%2 != 1? '0':'0'}">
                      <a @click="chosed(item)">
                      <el-card :body-style="{ padding: '0' }" class="filter-card-container">
                        <!-- <img :src="item.status===1?evaluating:evaluating1" class="filter-card-image"> -->
                        <div class="filter-card-text">
                          <div class="cartTitle" :class="{ active: item.status }" style="">{{item.testName}}</span></div>
                          <div class="cartTitles"  style="padding:20px 10px">{{item.testName2}}</span></div>

                        </div>
                      </el-card>
                      </a>
                    </el-col>
                  </el-row>
                </div>
                <div style="width:6%;float:left;height: 484px;text-align:center;line-height: 484px;">
                    <img  :src="JT" alt="">
                </div>
                <div class="rightBox" style="width:22%;height:488px;float: left;background:#ffffff;border-radius: 10px">
                  <span class="demonstration">预览</span>
                  <div v-show="defaults" style="text-align:center;padding-top:160px">

                    <p>
                       请选择“训练游戏”，
                    </p>
                    <p>
                      看看家长用手机都能看到什么。
                    </p>
                  </div>
                  <el-carousel trigger="click" height="410px" :autoplay="false" arrow="never" indicator-position="outside">
                    <el-carousel-item v-for="(item,index) in newData" :key='index'>
                      <!-- <h1 :style="{backgroundImage: 'url(' + commodImg + ')' }">{{ item }}</h1> -->
                      <div class="commendcontent" >
                        <!-- <div>
                          <img style="width:100%;display:block" :src="commodImg" alt="">
                        </div> -->
                        <div class="commendcontentc">
                            <div class="mainBox">
                              <img :src='item.testImg'>
                              <!-- <h3>{{item.testName}}</h3>
                              <h6>（大运动）</h6>
                              <h5>活动材料</h5>
                              <p style="text-align:center">
                               {{item.testName2}}
                              </p>
                              <h5>游戏方法</h5>
                              <p>
                                1.可以选在家里进行，利用小凳子、小沙发墩、小架子等在屋里设置一些障碍，在终点处放一些宝宝平时爱玩的玩具。
                              </p>
                              <p>
                                2.把宝宝放在开始游戏的地方，告诉宝宝要走哪里去。当宝宝表示没有听明白的时候，父母可以自己先示范一遍，但记得动作不要太迅速，要慢吞吞地，尽量符合宝宝的年龄和走路习惯，然后站在终点处，示意宝宝开始了。
                              </p>
                              <p>
                                3.宝宝在障碍处爬上爬下的时候，难免会摔倒、磕着，但只要不是很严重，妈妈都可以站在终点处鼓励宝宝自己主动爬起来，继续游戏。宝宝最终到达终点的时候，给宝宝一个鼓励。
                              </p>
                              <p>
                                <img class="lianImg" :src='item.testImg'/>
                              </p> -->
                            </div>
                        </div>
                      </div>
                    </el-carousel-item>
                  </el-carousel>
                </div>
          </div>
          <div style="text-align:center;height:50px;line-height:50px;">
            <el-col :span="24"><el-button type="primary" @click="open4">推荐给家长</el-button></el-col>
            <p style="color:#6B6B6B">(“训练游戏“部分不在纸质报告中体现，请提示家长扫一扫下方二维码)</p>
          </div>


        </div>

      </div>
    </div>

    <el-row :gutter="20" class="report-footer" :class="isPrint">
      <el-col :span="2" class="report-footer-code"><img :src="img_code" class="report-footer-img"> </el-col>
      <el-col :span="6" class="report-footer-text"><span style="font-weight: 600;">扫一扫</span><br/>
        <span class="report-footer-span">获取更多专属游戏及训练</span></el-col>
    </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import appBackground from '@/assets/dashboard/background-2.png'
  import manBackground from '@/assets/background/gender_1.png'
  import chosed from '@/assets/report/an.png'
  import JT from '@/assets/report/JT.png'
  import tu from '@/assets/report/tu.png'
  import tuijian1 from '@/assets/report/tuijian1.png'
  import tuijian2 from '@/assets/report/tuijian2.png'
  import tuijian3 from '@/assets/report/tuijian3.png'
  import tuijian4 from '@/assets/report/tuijian4.png'
  import tuijian5 from '@/assets/report/tuijian5.png'
  import commodImg from '@/assets/report/commodImg.png'
  import womanBackground from '@/assets/background/gender_2.png'
  import manAvatar from '@/assets/report/manAvatar.png'
  import womenAvatar from '@/assets/report/womenAvatar.png'
  import report_code from '@/assets/report/report_code.jpg'
  import VueHighcharts from 'vue2-highcharts'
  import Highcharts from 'highcharts'
  import HighchartsMore from 'highcharts/highcharts-more'
  import SolidGauge from 'highcharts/modules/solid-gauge.js'
  import BarChart from './components/BarChart'
  import RaddarChart from './components/RaddarChart'
  import BarChart3_6 from './components/BarChart3_6'
  import RaddarChart3_6 from './components/RaddarChart3_6'
  import BarChart0_2 from './components/BarChart0_2'
  import RaddarChart0_2 from './components/RaddarChart0_2'
  import BarChart5_0 from './components/BarChart5_0'
  import RaddarChart5_0 from './components/RaddarChart5_0'
  import BarChart1_3_2 from './components/BarChart1_3_2'
  import RaddarChart1_3_2 from './components/RaddarChart1_3_2'
  import img_code from '@/assets/dashboard/code.png'
  import BarChartCognize from './components/BarChartCognize'
  import RaddarChartCognize from './components/RaddarChartCognize'
  import { recordDetail, showResult0_6, showResult3_6, showResult0_2, showResult50,
    showResultCognize, showResultDdst, showResult132, saveTestRecord, getTestRecord } from '@/api/report'
  /* import reportData from '@/views/report/reportData'*/
  import store from '@/store'

  export default {
    data() {
      return {
        id: 0,
        chartId: '',
        tu:tu,
        testId: 0,
        babyId: 0,
        isPrint: '',
        printRowWidth:false,
        divPrint: 'divTable-content',
        infoBasicPrint: 'infoBasic',
        infoPrint: 'filter-info',
        textPrint: 'filter-text',
        rtPrint: 'rt',
        commodImg:commodImg,
        tjtest:'#DAF3FD',
        chartPrint1: 'filter-chart1',
        chartTextPrint: '',
        chartPrint: 'filter-chart',
        medicalPrint: 'filter-medical',
        peoplePrint: 'comments-people',
        rowWidth:'rowWidth',
        chooseData: [{ testId: 1, testName: '小猫喵喵叫', testName2: '综合能力游戏', status: 0 , index:0 , testImg : tuijian1},
        { testId: 16, testName: '小飞机', testName2: '综合能力游戏', status: 0 , index:1, testImg : tuijian2},
        { testId: 20, testName: '彩色头巾', testName2: '综合能力游戏', status: 0 , index:2, testImg : tuijian3},
        // { testId: 2, testName: '礼貌用语天天练', testName2: '大运动-精细运动-适应能力', status: 0 , index:3},
        { testId: 17, testName: '伸手够物', testName2: '我的课程', status: 0 , index:4, testImg : tuijian4},
        { testId: 19, testName: '学骑大马', testName2: '其他专家课程', status: 0 , index:5 ,testImg : tuijian5}],
        // { testId: 18, testName: '婴儿-初中生', testName2: '其他专家课程', status: 0 , index:6},
        // { testId: 21, testName: '小儿智能发育筛查', testName2: '其他专家课程', status: 0 , index:7},
        newData:[],
        tabPrint: false,
        tablePrint: false,
        printStatus: false,
        options0_6_0: {
          chart: {
            type: 'column'
          },
          credits: {
            enabled: false
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: [
              '大运动',
              '精细动作',
              '适应能力',
              '语言',
              '社交行为'
            ]
          },
          yAxis: [{
            min: 0,
            plotLines: [{
              color: 'blue',
              value: undefined,
              width: 2
            }],
            title: {
              text: '智龄'
            }
          }, {
            title: {
              text: '发育商（DQ）'
            },
            labels: {
              useHTML: true,
              formatter: function() {
                if (this.value === 70) {
                  return '<span style="color:red">' +
                    this.value + '</span>'
                }
                if (this.value === 85) {
                  return '<span style="color:orange;">' +
                    this.value + '</span>'
                }
                if (this.value === 115) {
                  return '<span style="color:blue">' +
                    this.value + '</span>'
                }
                if (this.value === 130) {
                  return '<span style="color:green">' +
                    this.value + '</span>'
                }
                if (this.value === 0) {
                  return '<span style="color:#ddd">' +
                    this.value + '</span>'
                }
              }
            },
            tickPositions: [0, 70, 85, 115, 130],
            opposite: true
          }],
          legend: {
            shadow: false
          },
          tooltip: {
            shared: true
          },
          plotOptions: {
            column: {
              grouping: false,
              shadow: false,
              borderWidth: 0
            }
          },
          series: []
        },
        options3_6: {
          chart: {
            type: 'column'
          },
          title: {
            text: ''
          },
          credits: {
            enabled: false
          },
          xAxis: {
            categories: ['育儿观念', '关注和接纳', '规矩或自我调控能力', '养育关系和沟通', '学习环境', '语言环境', '玩耍和娱乐', '安全和居住环境', '总和']
          },
          yAxis: {
            min: 0,
            title: {
              text: '评分结果'
            }
          },
          tooltip: {
            pointFormat: '',
            shared: true
          },
          plotOptions: {
            column: {
              stacking: 'percent'
            }
          },
          legend: {
            enabled: false
          },
          series: []
        },
        options0_2: {
          chart: {
            type: 'column'
          },
          credits: {
            enabled: false
          },
          title: {
            text: ''
          },
          xAxis: {
            categories: ['关注度', '接纳', '养育环境', '学习材料', '参与', '生活的丰富多样性', '总分']
          },
          yAxis: {
            min: 0,
            title: {
              text: '评分结果'
            }
          },
          tooltip: {
            pointFormat: '',
            shared: true
          },
          plotOptions: {
            column: {
              stacking: 'percent'
            }
          },
          legend: {
            enabled: false
          },
          series: []
        },
        options5_0: {
          chart: {
            type: 'solidgauge'
          },
          title: null,
          pane: {
            center: ['50%', '80%'],
            size: '100%',
            startAngle: -90,
            endAngle: 90,
            background: {
              backgroundColor: '#EEE',
              innerRadius: '60%',
              outerRadius: '100%',
              shape: 'arc'
            }
          },
          tooltip: {
            enabled: false
          },
          yAxis: {
            min: 0,
            max: 150,
            stops: [
              [0.47, 'red'], // red
              [0.57, 'orange'], // orange
              [0.77, 'blue'], // blue
              [0.87, 'green'] // green
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 150,
            tickWidth: 1,
            tickLength: 50,
            tickColor: '#ddd',
            tickPositions: [0, 70, 85, 115, 130, 150],
            title: {
              y: -70
            },
            labels: {
              y: 10,
              useHTML: true,
              formatter: function() {
                if (this.value === 70) {
                  return '<span style="color:red;position: absolute;top: -40px;">' +
                    this.value + '</span>'
                }
                if (this.value === 85) {
                  return '<span style="color:orange;position: absolute;top: -40px;">' +
                    this.value + '</span>'
                }
                if (this.value === 115) {
                  return '<span style="color:blue;position: absolute;top: -45px;">' +
                    this.value + '</span>'
                }
                if (this.value === 130) {
                  return '<span style="color:green;position: absolute;top: -55px;">' +
                    this.value + '</span>'
                }
                if (this.value === 0) {
                  return '<span style="color:#ddd">' +
                    this.value + '</span>'
                }
                if (this.value === 150) {
                  return '<span style="color:#ddd">' +
                    this.value + '</span>'
                }
              }
            }
          },
          plotOptions: {
            solidgauge: {
              dataLabels: {
                y: 5,
                borderWidth: 0,
                useHTML: true
              }
            }
          },
          credits: {
            enabled: false
          },
          series: [{
            name: '能力商',
            data: [50],
            dataLabels: {
              format: '<div style="text-align:center;z-index:100;background-color:#fff"><span style="font-size:25px;color:' +
              ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
              '<span style="font-size:12px;color:silver">能力商</span></div>'
            }
          }]
        },
        appBackground: appBackground,
        JT:JT,
        flag:true,
        defaults:true,
        manBackground: manBackground,
        womanBackground: womanBackground,
        background: manBackground,
        manAvatar: manAvatar,
        womenAvatar: womenAvatar,
        report_code: report_code,
        avatar: manAvatar,
        img_code: img_code,
        barData: {},
        testName: {},
        multipleSelection: [],
        type1: [],
        type2: [],
        type3: [],
        type4: [],
        type5: [],
        typeValue1: undefined,
        typeValue2: undefined,
        typeValue3: undefined,
        typeValue4: undefined,
        typeValue5: undefined,
        pushData: {
          testId: 0,
          advice: '',
          resultId: 0,
          evaluator: ''
        },
        list: null,
        listData: null,

        info: {},
        listLoading: true,
        evaluation: '',
        answerRelation: '',
        dq: '',
        growth: '',
        checkTime: '',
        loading: null
      }
    },
    computed: {
      ...mapGetters([
        'hospitalData',
        'hospitalName'
      ]),
      classObj() {
        return {
          tabPrint: this.tabPrint,
          tablePrint: this.tablePrint
        }
      }
    },
    components: {
      Highcharts,
      HighchartsMore,
      SolidGauge,
      VueHighcharts,
      RaddarChartCognize,
      BarChartCognize,
      RaddarChart1_3_2,
      BarChart1_3_2,
      Breadcrumb,
      BarChart,
      RaddarChart,
      BarChart3_6,
      RaddarChart3_6,
      BarChart0_2,
      RaddarChart0_2,
      BarChart5_0,
      RaddarChart5_0
    },
    created() {
      this.id = this.$route.query.id
      this.testId = parseInt(this.$route.query.testId)
      this.getTestRecord()
      this.handleTestName()
      if (this.testId === 1) {
        this.showResult0_6()
      } else if (this.testId === 2) {
        this.showResult3_6()
      } else if (this.testId === 16) {
        this.showResult0_2()
      } else if (this.testId === 17) {
        this.showResult50()
      } else if (this.testId === 18) {
        this.showResult132()
      } else if (this.testId === 19) {
        this.showResultCognize()
      } else if (this.testId === 20) {
        this.showResultDdst()
      }


    },
    methods: {
      handleTestName() {
        const data = this.hospitalData
        for (const i in this.hospitalData) {
          this.$set(this.testName, data[i].testId, data[i].testName)
        }
      },
      open4() {
        const h = this.$createElement;
        if (this.flag) {
          if (this.newData.length>0) {
              this.$msgbox({
                title: '消息',
                message: h('p', { style: 'text-align:center;padding-top:10px;padding-bottom:0' }, [
                  h('span', { style: 'color: #4F4F4F;padding:10px' }, '温馨提示：'),
                  h('p', { style: 'color: #4F4F4F;padding:10px;width:70%;margin:0 auto' }, '推选成功后则不可修改推荐内容,请仔细确认后推荐。')
                ]),
                showCancelButton: true,
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                beforeClose: (action, instance, done) => {
                  if (action === 'confirm') {
                    instance.confirmButtonLoading = true;
                    instance.confirmButtonText = '提交中';
                    setTimeout(() => {
                      done();
                      setTimeout(() => {
                        instance.confirmButtonLoading = false;
                      }, 300);
                    }, 300);
                  } else {
                    done();
                  }
                }
              }).then(action => {
                this.$message({
                  type: 'info',
                  message: '推荐成功 ',
                  type: 'success'
                });
                this.flag = false;
              });
          } else {
            this.$message({
                message: '推荐课程不能为空',
                center: true,
                type: 'warning'
              });
          }
        } else {
           this.$message({
                message: '您已提交过推荐，不可再次推荐',
                center: true,
                type: 'warning'
              });
        }


      },
      chosed(index){

        if (this.flag) {
           if (!index.status) {

              if (this.newData.length>4) {
                this.$message({
                  message: '最多只能选择五个',
                  center: true,
                  type: 'warning'
                });
              } else {
                index.status=!index.status;
                this.defaults = false;
                this.newData.unshift(index);
                this.$message({
                  message: '再次点击取消选中',
                  center: true,
                  type: 'success'
                });
              }

            } else {
              index.status=!index.status;

              let that = index.index;
              for (let index = 0; index < this.newData.length; index++) {
                console.log(this.newData[index].index);
                if (this.newData[index].index==that) {
                  this.newData.splice(index,1)
                }
              };
              if (this.newData.length==0) {
                this.defaults = true;
              }
            }
        } else {
          this.$message({
            message: '您已提交过推荐，不可再次推荐',
            center: true,
            type: 'warning'
          });
        }

      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      showResult0_6() {
        this.list = null
        this.listLoading = true
        showResult0_6(this.id).then(response => {
          this.listData = response.data
          this.checkTime = this.listData.checkTime
          this.dq = this.listData.dq
          this.growth = this.listData.growth.toFixed(1)
          this.list = [
            { month: '智龄（月）', movement: this.listData.scoreSport.toFixed(1),
              sports: this.listData.scoreAct.toFixed(1),
              action: this.listData.scoreAdapt.toFixed(1),
              adapt: this.listData.scoreLanguage.toFixed(1),
              social: this.listData.scoreSocial.toFixed(1) },
            { month: '单项发育商（DQ）',
              movement: parseInt(this.listData.scoreSportDq),
              sports: parseInt(this.listData.scoreActDq),
              action: parseInt(this.listData.scoreAdaptDq),
              adapt: parseInt(this.listData.scoreLanguageDq),
              social: parseInt(this.listData.scoreSocialDq) }]
          this.$set(this.barData, 'c', [parseInt(this.listData.scoreSportDq), parseInt(this.listData.scoreSocialDq), parseInt(this.listData.scoreLanguageDq),
            parseInt(this.listData.scoreAdaptDq), parseInt(this.listData.scoreActDq)])
          this.babyId = this.listData.result.babyid

          this.listLoading = false
          this.infoData()
          setTimeout(() => {
            const lineCharts0_6_0 = this.$refs.lineCharts0_6_0
            this.options0_6_0.yAxis[0].plotLines[0].value = this.info.monthAge
            lineCharts0_6_0.addSeries({ name: '智龄', color: '#004e90', data: [parseInt(this.listData.scoreSport), parseInt(this.listData.scoreAct),
              parseInt(this.listData.scoreAdapt), parseInt(this.listData.scoreLanguage), parseInt(this.listData.scoreSocial)], pointPadding: 0.3, pointPlacement: -0.2 })
            lineCharts0_6_0.addSeries({ name: '发育商', color: '#ff9800', data: [parseInt(this.listData.scoreSportDq), parseInt(this.listData.scoreActDq), parseInt(this.listData.scoreAdaptDq),
              parseInt(this.listData.scoreLanguageDq), parseInt(this.listData.scoreSocialDq)], pointPadding: 0.3, pointPlacement: 0.2, yAxis: 1 })
            /* const lineCharts0_6_1 = this.$refs.lineCharts0_6_1
            let a = [parseInt(this.listData.scoreSportDq), parseInt(this.listData.scoreActDq), parseInt(this.listData.scoreAdaptDq),
              parseInt(this.listData.scoreLanguageDq), parseInt(this.listData.scoreSocialDq)]
            a = a.sort()
            let max = a[0]
            if (max < 100) {
              max = 120
            } else if (max < 150) {
              max = 150
            } else if (max < 200) {
              max = 200
            }
            this.options0_6_1.yAxis.max = max
            lineCharts0_6_1.addSeries({ name: '发育商', data: [parseInt(this.listData.scoreSportDq), parseInt(this.listData.scoreActDq), parseInt(this.listData.scoreAdaptDq),
                parseInt(this.listData.scoreLanguageDq), parseInt(this.listData.scoreSocialDq)], pointPlacement: 'on' })*/

            /* let month = 0
            for (const index in reportData) {
              if (index <= this.info.monthAge) {
                month = index
              }
            }
            const monthData = reportData[month]
            for (const i in monthData) {
              if (monthData[i].type === 1) {
                this.type1.push(monthData[i])
              } else if (monthData[i].type === 2) {
                this.type2.push(monthData[i])
              } else if (monthData[i].type === 3) {
                this.type3.push(monthData[i])
              } else if (monthData[i].type === 4) {
                this.type4.push(monthData[i])
              } else if (monthData[i].type === 5) {
                this.type5.push(monthData[i])
              }
            }*/
          }, 1000)
        })
      },
      showResult3_6() {
        this.list = null
        this.listLoading = true
        showResult3_6(this.id).then(response => {
          this.listData = response.data
          this.checkTime = this.listData.checkTime
          this.answerRelation = this.listData.result3_6.answerRelation
          const result3_6 = this.listData.result3_6
          const a1 = +(parseInt(result3_6.a1) / 12).toFixed(2)
          const a2 = (parseInt(result3_6.a2) / 12).toFixed(2)
          const a3 = (parseInt(result3_6.a3) / 12).toFixed(2)
          const a4 = (parseInt(result3_6.a4) / 14).toFixed(2)
          const a5 = (parseInt(result3_6.a5) / 12).toFixed(2)
          const a6 = (parseInt(result3_6.a6) / 10).toFixed(2)
          const a7 = (parseInt(result3_6.a7) / 16).toFixed(2)
          const a8 = (parseInt(result3_6.a8) / 12).toFixed(2)
          const p0 = this.listData.p0.split('~')
          const p1 = this.listData.result3_6.p1.split('~')
          const p2 = this.listData.result3_6.p2.split('~')
          const p3 = this.listData.result3_6.p3.split('~')
          const p4 = this.listData.result3_6.p4.split('~')
          const p5 = this.listData.result3_6.p5.split('~')
          const p6 = this.listData.result3_6.p6.split('~')
          const p7 = this.listData.result3_6.p7.split('~')
          const p8 = this.listData.result3_6.p8.split('~')
          const r1 = this.listData.result3_6.r1
          const r2 = this.listData.result3_6.r2
          const r3 = this.listData.result3_6.r3
          const r4 = this.listData.result3_6.r4
          const r5 = this.listData.result3_6.r5
          const r6 = this.listData.result3_6.r6
          const r7 = this.listData.result3_6.r7
          const r8 = this.listData.result3_6.r8
          const data1 = [p1[1] <= 50 ? p1[1] : '-', p2[1] <= 50 ? p2[1] : '-', p3[1] <= 50 ? p3[1] : '-', p4[1] <= 50 ? p4[1] : '-',
            p5[1] <= 50 ? p5[1] : '-', p6[1] <= 50 ? p6[1] : '-', p7[1] <= 50 ? p7[1] : '-', p8[1] <= 50 ? p8[1] : '-', p0[1] <= 50 ? p0[1] : '-']
          const data2 = [p1[1] > 50 ? p1[1] - p1[0] : '-', p2[1] > 50 ? p2[1] - p2[0] : '-', p3[1] > 50 ? p3[1] - p3[0] : '-', p4[1] > 50 ? p4[1] - p4[0] : '-',
            p5[1] > 50 ? p5[1] - p5[0] : '-', p6[1] > 50 ? p6[1] - p6[0] : '-', p7[1] > 50 ? p7[1] - p7[0] : '-', p8[1] > 50 ? p8[1] - p8[0] : '-', p0[1] > 50 ? p0[1] - p0[0] : '-']
          this.list = [
            {
              project: '个人得分', a1: this.listData.result3_6.a1, a2: this.listData.result3_6.a2, a3: this.listData.result3_6.a3, a4: this.listData.result3_6.a4,
              a5: this.listData.result3_6.a5, a6: this.listData.result3_6.a6, a7: this.listData.result3_6.a7, a8: this.listData.result3_6.a8, sum: this.listData.a0
            },
            { project: '应得分', a1: 12, a2: 12, a3: 12, a4: 14, a5: 12, a6: 10, a7: 16, a8: 12, sum: 100 },
            {
              project: '百分位数范围', a1: this.listData.result3_6.p1, a2: this.listData.result3_6.p2, a3: this.listData.result3_6.p3, a4: this.listData.result3_6.p4,
              a5: this.listData.result3_6.p5, a6: this.listData.result3_6.p6, a7: this.listData.result3_6.p7, a8: this.listData.result3_6.p8, sum: this.listData.p0
            },
            {
              project: '评估意见', a1: r1, a2: r2, a3: r3, a4: r4, a5: r5, a6: r6, a7: r7, a8: r8, sum: this.listData.r0
            }]
          this.$set(this.barData, 'a1', [p1[0], p2[0], p3[0], p4[0], p5[0], p6[0], p7[0], p8[0], p0[0]])
          this.$set(this.barData, 'a2', data1)
          this.$set(this.barData, 'a3', data2)
          this.$set(this.barData, 'b', [a1, a8, a7, a6, a5, a4, a3, a2])
          this.babyId = this.listData.result3_6.babyId
          this.listLoading = false
          this.infoData()

          setTimeout(() => {
            const pArr = []
            pArr.push(parseInt(p1[0]))
            pArr.push(parseInt(p2[0]))
            pArr.push(parseInt(p3[0]))
            pArr.push(parseInt(p4[0]))
            pArr.push(parseInt(p5[0]))
            pArr.push(parseInt(p6[0]))
            pArr.push(parseInt(p7[0]))
            pArr.push(parseInt(p8[0]))
            pArr.push(parseInt(p0[0]))
            const series = [{
              name: '',
              data: [],
              color: 'white',
              borderWidth: 1,
              borderColor: 'black'
            }, {
              name: '',
              data: [],
              color: 'green',
              borderWidth: 1,
              borderColor: 'black'
            }, {
              name: '',
              data: [],
              color: 'blue',
              borderWidth: 1,
              borderColor: 'black'
            }, {
              name: '',
              data: [],
              color: 'orange',
              borderWidth: 1,
              borderColor: 'black'
            }, {
              name: '',
              data: [],
              color: 'red',
              borderWidth: 1,
              borderColor: 'black'
            }, {
              name: '',
              data: [],
              color: 'white',
              borderWidth: 1,
              borderColor: 'black'
            }]

            // 填充series
            for (let i = 0, len = pArr.length; i < len; i++) {
              switch (pArr[i]) {
                case 0:
                  series[0].data.push(50)
                  series[1].data.push(0)
                  series[2].data.push(0)
                  series[3].data.push(0)
                  series[4].data.push(50)
                  series[5].data.push(0)
                  break
                case 50:
                  series[0].data.push(25)
                  series[1].data.push(0)
                  series[2].data.push(0)
                  series[3].data.push(25)
                  series[4].data.push(0)
                  series[5].data.push(50)
                  break
                case 75:
                  series[0].data.push(10)
                  series[1].data.push(0)
                  series[2].data.push(15)
                  series[3].data.push(0)
                  series[4].data.push(0)
                  series[5].data.push(75)
                  break
                case 90:
                  series[0].data.push(0)
                  series[1].data.push(10)
                  series[2].data.push(0)
                  series[3].data.push(0)
                  series[4].data.push(0)
                  series[5].data.push(90)
                  break
                default:
              }
            }
            const lineCharts3_6 = this.$refs.lineCharts3_6
            lineCharts3_6.addSeries(series[0])
            lineCharts3_6.addSeries(series[1])
            lineCharts3_6.addSeries(series[2])
            lineCharts3_6.addSeries(series[3])
            lineCharts3_6.addSeries(series[4])
            lineCharts3_6.addSeries(series[5])
          }, 1000)
        })
      },
      showResult0_2() {
        this.list = null
        this.listLoading = true
        showResult0_2(this.id).then(response => {
          this.listData = response.data
          this.checkTime = this.listData.checkTime
          this.answerRelation = this.listData.result0_2.answerRelation
          const result0_2 = this.listData.result0_2
          const a1 = +(parseInt(result0_2.a1) / 11).toFixed(2)
          const a2 = (parseInt(result0_2.a2) / 8).toFixed(2)
          const a3 = (parseInt(result0_2.a3) / 6).toFixed(2)
          const a4 = (parseInt(result0_2.a4) / 9).toFixed(2)
          const a5 = (parseInt(result0_2.a5) / 6).toFixed(2)
          const a6 = (parseInt(result0_2.a6) / 5).toFixed(2)
          const p0 = this.listData.p0.split('~')
          const p1 = this.listData.result0_2.p1.split('~')
          const p2 = this.listData.result0_2.p2.split('~')
          const p3 = this.listData.result0_2.p3.split('~')
          const p4 = this.listData.result0_2.p4.split('~')
          const p5 = this.listData.result0_2.p5.split('~')
          const p6 = this.listData.result0_2.p6.split('~')
          const data1 = [p1[1] <= 50 ? p1[1] : '-', p2[1] <= 50 ? p2[1] : '-', p3[1] <= 50 ? p3[1] : '-', p4[1] <= 50 ? p4[1] : '-',
            p5[1] <= 50 ? p5[1] : '-', p6[1] <= 50 ? p6[1] : '-', p0[1] <= 50 ? p0[1] : '-']
          const data2 = [p1[1] > 50 ? p1[1] - p1[0] : '-', p2[1] > 50 ? p2[1] - p2[0] : '-', p3[1] > 50 ? p3[1] - p3[0] : '-', p4[1] > 50 ? p4[1] - p4[0] : '-',
            p5[1] > 50 ? p5[1] - p5[0] : '-', p6[1] > 50 ? p6[1] - p6[0] : '-', p0[1] > 50 ? p0[1] - p0[0] : '-']
          this.list = [
            {
              project: '个人得分', a1: this.listData.result0_2.a1, a2: this.listData.result0_2.a2, a3: this.listData.result0_2.a3, a4: this.listData.result0_2.a4,
              a5: this.listData.result0_2.a5, a6: this.listData.result0_2.a6, sum: this.listData.a0
            },
            { project: '应得分', a1: 11, a2: 8, a3: 6, a4: 9, a5: 6, a6: 5, sum: 45 },
            {
              project: '百分位数范围', a1: this.listData.result0_2.p1, a2: this.listData.result0_2.p2, a3: this.listData.result0_2.p3, a4: this.listData.result0_2.p4,
              a5: this.listData.result0_2.p5, a6: this.listData.result0_2.p6, a7: this.listData.result0_2.p7, a8: this.listData.result0_2.p8, sum: this.listData.p0
            },
            {
              project: '评估意见', a1: this.listData.result0_2.r1, a2: this.listData.result0_2.r2, a3: this.listData.result0_2.r3, a4: this.listData.result0_2.r4,
              a5: this.listData.result0_2.r5, a6: this.listData.result0_2.r6, sum: this.listData.r0
            }]
          this.$set(this.barData, 'a1', [p1[0], p2[0], p3[0], p4[0], p5[0], p6[0], p0[0]])
          this.$set(this.barData, 'a2', data1)
          this.$set(this.barData, 'a3', data2)
          this.$set(this.barData, 'b', [a1, a6, a5, a4, a3, a2])
          this.babyId = this.listData.result0_2.babyId
          this.listLoading = false
          this.infoData()

          setTimeout(() => {
            const pArr = []
            pArr.push(parseInt(p1[0]))
            pArr.push(parseInt(p2[0]))
            pArr.push(parseInt(p3[0]))
            pArr.push(parseInt(p4[0]))
            pArr.push(parseInt(p5[0]))
            pArr.push(parseInt(p6[0]))
            pArr.push(parseInt(p0[0]))
            const series = [{
              name: '',
              data: [],
              color: 'white',
              borderWidth: 1,
              borderColor: 'black'
            }, {
              name: '',
              data: [],
              color: 'green',
              borderWidth: 1,
              borderColor: 'black'
            }, {
              name: '',
              data: [],
              color: 'blue',
              borderWidth: 1,
              borderColor: 'black'
            }, {
              name: '',
              data: [],
              color: 'orange',
              borderWidth: 1,
              borderColor: 'black'
            }, {
              name: '',
              data: [],
              color: 'red',
              borderWidth: 1,
              borderColor: 'black'
            }, {
              name: '',
              data: [],
              color: 'white',
              borderWidth: 1,
              borderColor: 'black'
            }]

            // 填充series
            for (let i = 0, len = pArr.length; i < len; i++) {
              switch (pArr[i]) {
                case 0:
                  series[0].data.push(50)
                  series[1].data.push(0)
                  series[2].data.push(0)
                  series[3].data.push(0)
                  series[4].data.push(50)
                  series[5].data.push(0)
                  break
                case 50:
                  series[0].data.push(25)
                  series[1].data.push(0)
                  series[2].data.push(0)
                  series[3].data.push(25)
                  series[4].data.push(0)
                  series[5].data.push(50)
                  break
                case 75:
                  series[0].data.push(10)
                  series[1].data.push(0)
                  series[2].data.push(15)
                  series[3].data.push(0)
                  series[4].data.push(0)
                  series[5].data.push(75)
                  break
                case 90:
                  series[0].data.push(0)
                  series[1].data.push(10)
                  series[2].data.push(0)
                  series[3].data.push(0)
                  series[4].data.push(0)
                  series[5].data.push(90)
                  break
                default:
              }
            }
            const lineCharts0_2 = this.$refs.lineCharts0_2
            lineCharts0_2.addSeries(series[0])
            lineCharts0_2.addSeries(series[1])
            lineCharts0_2.addSeries(series[2])
            lineCharts0_2.addSeries(series[3])
            lineCharts0_2.addSeries(series[4])
            lineCharts0_2.addSeries(series[5])
          }, 1000)
        })
      },
      showResult50() {
        this.list = null
        this.listLoading = true
        showResult50(this.id).then(response => {
          this.listData = response.data
          this.checkTime = this.listData.checkTime
          const result50 = this.listData.result50
          const a1 = +(parseInt(result50.a1) / 13).toFixed(2)
          const a2 = (parseInt(result50.a2) / 13).toFixed(2)
          const a3 = (parseInt(result50.a3) / 4).toFixed(2)
          const a4 = (parseInt(result50.a4) / 6).toFixed(2)
          const a5 = (parseInt(result50.a5) / 9).toFixed(2)
          const a6 = (parseInt(result50.a6) / 5).toFixed(2)
          this.list = [
            {
              project: '得分',
              a1: this.listData.result50.a1,
              a2: this.listData.result50.a2,
              a3: this.listData.result50.a3,
              a4: this.listData.result50.a4,
              a5: this.listData.result50.a5,
              a6: this.listData.result50.a6,
              sum: this.listData.a0,
              ability: this.listData.result50.talent
            }]
          this.$set(this.barData, 'a', parseInt(result50.talent))
          this.$set(this.barData, 'b', [a1, a6, a5, a4, a3, a2])
          this.evaluation = this.listData.result50.level
          this.babyId = this.listData.result50.babyId
          this.listLoading = false
          this.infoData()

          /* const lineCharts5_0 = this.$refs.lineCharts5_0
          lineCharts5_0.addSeries({
            name: '能力商',
            data: [parseInt(result50.talent)],
            dataLabels: {
              format: '<div style="text-align:center;z-index:100;background-color:#fff"><span style="font-size:25px;color:' + ((VueHighcharts.theme && VueHighcharts.theme.contrastTextColor) || 'black') + '">{y}</span><br/>' +
              '<span style="font-size:12px;color:silver">能力商</span></div>'
            }
          })*/
        })
      },
      showResult132() {
        this.list = null
        this.listLoading = true
        showResult132(this.id).then(response => {
          this.listData = response.data
          this.checkTime = this.listData.checkTime
          const result132 = this.listData.result132
          const a1 = parseInt(result132.a1)
          const a2 = parseInt(result132.a2)
          const a3 = parseInt(result132.a3)
          const a4 = parseInt(result132.a4)
          const a5 = parseInt(result132.a5)
          const a6 = parseInt(result132.a6)
          const sum = parseInt(this.listData.a0)
          const b1 = +(parseInt(a1) / 30).toFixed(2)
          const b2 = +(parseInt(a2) / 18).toFixed(2)
          const b3 = +(parseInt(a3) / 19).toFixed(2)
          const b4 = +(parseInt(a4) / 22).toFixed(2)
          const b5 = +(parseInt(a5) / 24).toFixed(2)
          const b6 = +(parseInt(a6) / 19).toFixed(2)
          this.list = [
            {
              project: '得分',
              a1: a1,
              a2: a2,
              a3: a3,
              a4: a4,
              a5: a5,
              a6: a6,
              sum: sum,
              ability: this.listData.normal
            }]
          this.$set(this.barData, 'c', [30, 18, 19, 22, 24, 19, 132])
          this.$set(this.barData, 'a', [a1, a2, a3, a4, a5, a6, sum])
          this.$set(this.barData, 'b', [b1, b6, b5, b4, b3, b2])
          this.evaluation = this.listData.level
          this.babyId = this.listData.result132.babyId
          this.listLoading = false
          this.infoData()
        })
      },
      showResultCognize() {
        this.list = null
        this.listLoading = true
        showResultCognize(this.id).then(response => {
          this.listData = response.data
          this.checkTime = this.listData.checkTime
          this.$set(this.barData, 'a', parseInt(this.listData.talent))
          this.$set(this.barData, 'b', this.listData.percent)
          this.babyId = this.listData.resultCognize.babyId
          this.evaluation = this.listData.evaluation
          this.listLoading = false
          this.infoData()
        })
      },
      showResultDdst() {
        this.list = null
        this.listLoading = true
        showResultDdst(this.id).then(response => {
          this.listData = response.data
          this.checkTime = this.listData.checkTime
          this.list = [
            {
              month: ['智龄（月）', '单项发育商（DQ）'],
              movement: [this.listData.scoreAct, this.listData.scoreActDq],
              sports: [this.listData.scoreSport, this.listData.scoreSportDq],
              action: [this.listData.scoreAdapt, this.listData.scoreAdaptDq],
              adapt: [this.listData.scoreLanguage, this.listData.scoreLanguageDq],
              social: [this.listData.scoreSocial, this.listData.scoreSocialDq]
            }]
          this.babyId = this.listData.resultDdst.babyId
          this.listLoading = false
          this.infoData()
        })
      },
      infoData() {
        recordDetail(this.babyId).then(response => {
          this.info = response.data
          this.avatar = response.data.babyGenderName === 1 ? this.manAvatar : this.womenAvatar
          this.background = response.data.babyGenderName === 1 ? this.manBackground : this.womanBackground
        })
      },
      print() {

          this.isPrint = 'isPrint'
        this.divPrint = 'divPrint'
        this.infoPrint = 'infoPrint'

        this.infoBasicPrint = 'infoBasicPrint'
        this.textPrint = 'textPrint'
        this.rtPrint = 'rtPrint'
        // this.chartPrint = 'chartPrint'
        // this.chartPrint1 = 'chartPrint1'

        this.medicalPrint = 'medicalPrint'
        this.peoplePrint = 'peoplePrint'
        this.chartTextPrint = 'chartTextPrint'
        this.tabPrint = true
        this.tablePrint = true
        this.printStatus = true
        store.dispatch('IsPrint', true)

        setTimeout(() => {
          window.print()
          this.isPrint = ''

          this.divPrint = 'divTable-content'
          this.infoPrint = 'filter-info'
          this.infoBasicPrint = 'infoBasic'
          this.textPrint = 'filter-text'
          this.rtPrint = 'rt'
          this.chartPrint1 = 'filter-chart1'
          this.chartPrint = 'filter-chart'
          this.medicalPrint = 'filter-medical'
          this.peoplePrint = 'comments-people'
          this.chartTextPrint = ''
          this.tabPrint = false
          this.tablePrint = false
          this.printStatus = false

          store.dispatch('IsPrint', false)
        }, 500)
      },
      goPage() {
        this.$router.push({ path: '/report/add' })
      },
      addReviews() {
        let text = ''
        if (this.typeValue1) {
          text += this.typeValue1
        }
        if (this.typeValue2) {
          text += '\n' + this.typeValue2
        }
        if (this.typeValue3) {
          text += '\n' + this.typeValue3
        }
        if (this.typeValue4) {
          text += '\n' + this.typeValue4
        }
        if (this.typeValue5) {
          text += '\n' + this.typeValue5
        }
        this.pushData.advice = text
        this.saveTestRecord()
      },
      saveReviews(value) {
        const text = value.split('\n')
        if (text.length > 4) {
          this.pushData.advice = ''
          for (let i = 0; i < 4; i++) {
            this.pushData.advice += (i > 0 ? '\n' : '') + text[i]
          }
        }
        this.saveTestRecord()
      },
      saveTestRecord() {
        if (this.pushData.advice) {
          this.pushData.resultId = this.id
          this.pushData.testId = this.testId
          saveTestRecord(this.pushData).then((response) => {

          })
        }
      },
      getTestRecord() {
        getTestRecord(this.testId, this.id).then(response => {
          this.pushData.advice = response.data.advice
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  .commendcontent{
    width: 100%;
    height: 376px;
    background-size: contain;
    background-repeat: no-repeat;
    background-color: #FFC300;
    position: relative;
    top: 0;
    left: 0;
    overflow-y: scroll;
  }
  .commendcontentc{

    height: 300px;
    background: #ffffff;
    // margin: 0 10px;
    border-radius: 10px;
    // position: absolute;
    // top: 172px;
    // left: 0;
  }
  .mainBox{
	width: 100%;
	height: auto;
	background: #FFFFFF;
  // border-radius:8px;
  // margin-bottom: 30px;
}
.mainBox img{
  width: 100%;
}
.commendcontentc h3{
	color: #F5A623;
  padding-bottom: 0;
  text-align: center;
  padding-top: 30px;
  margin: 0;

}
.commendcontentc h6{
	color: #9B9B9B;
	font-size: 0.14rem;
  text-align: center;
  margin-top: 8px;
}
.commendcontentc h5{
	color: #4A4A4A;
	// font-size: 0.18rem;
	text-align: center;
	font-weight: 800;
	padding: 0.2rem 0 0.18rem 0;
}
.commendcontentc p{
	color: #828282;
	// font-size: 0.18rem;
	padding: 0 0.16rem 0.18rem;
}
.commendcontentc p img{
  width: 100%;
}
  .demonstration{
    text-align: center;
    font-weight: 600;
    color: #4F4F4F;
    font-size: 18px;
    display: block;
    margin: 13px 0;
  }
  .el-carousel__item:nth-child(2n) {
    background-color: #ffffff;
    padding: 20px
  }

  .el-carousel__item:nth-child(2n+1) {
    background-color: #ffffff;
    padding: 20px
  }
  .textTitle{
    // text-align: center;
    padding-left: 28px;
    font-size: 18px;
    background-color: #E6F2F7;
    color: #4f4f4f;
    line-height: 45px;
    width: 100%;
    float: left;
    border-top-left-radius:10px;
    border-top-right-radius:10px;
    span{
      font-size: 12px;
      // font-weight: 500;
      color: #4F4F4F;
      padding-left: 10px;
    }
  }
  .cartTitle{
    height: 60px;
    line-height: 40px;
    font-weight: 600;background:#DAF3FD;padding:5px 10px;color:#5A8EA3;
  }
   .active{
    background: url('../../assets/report/an.png') no-repeat;
    background-size: 104%;
    background-position: -8px;
    background-position-y: -8px;
    color: #83C37E;
  }
  .cartTitles{
    // line-height: 40px;
    padding: 20px 10px;
  }
  .chart-text{
    font-weight: 600;
    font-size: 18px;
  }
  .report{
    &-container{
      background-color: #e3f2f8;
      margin-top: -3%;
    }
    &-medical{
      padding: 4% 5% 0 5%;
    }
    &-title{
      text-align: center;
      font-size: 20px;
    }
    &-button{
      float: right;
      margin-top: 4%;
    }

    &-footer{
      height: 120px;
      background-color: #aadbf4;
      margin-left: 0 !important;
      margin-right: 0 !important;
      &-text{
        color: #5185d0;
        text-align: left;
        padding-top: 2%;
      }
      &-text{
        line-height: 22px;
        font-size: 15px;
      }
      &-code{
        background-color: #aadbf4;
        height: 100%;
        margin-top: -1%;
        border-radius: 10px;
        margin-left: 5%;
        text-align: center;
        padding: 0.5%;
      }
      &-img{
        width: 100%;
      }
    }
  }
	.divTable{
		border-top: 1px solid #9ec3d061;
		padding-top: 20px;
		width: 100%;
	}
  .evaluation{
    &-container{
      background-color: #e3f2f8;
      margin-top: -3%;
    }
    &-medical{
      padding: 4% 5% 0 5%;
    }
    &-button{
      float: right;
      margin-top: 4%;
    }
  }

  .filter{
    &-container{
      width: 100%;
      background-color: #fff;
      margin-top: 2%;
      border-radius: 10px;
      &-radio{
        margin-left: 5%;
      }
      &-a{
        padding-left: 5%;
      }

    }
    &-medical{
      padding: 0 5% 10% 5%;
      min-height: 445px;
    }
    &-results{
      padding-top: 2%;
    }
    &-info{
      padding-top: 5%;
      height: 200px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position-y: bottom;
      width: 100%;
      z-index:-10;
      zoom: 1;
      &-basic{
        margin-top: -2%;
        width: 100%;
      }
      &-line{
        height: 1px;
        background-color: #9ec3d061;
        margin: 15px 5px;
      }
    }
    &-avatarFrame{
      background-color: #fff;
      width: 130px;
      height: 130px;
      border-radius: 50%;
      margin-top: -30px;
      text-align: center;
      border: 1px solid #eceff0;
      -webkit-box-shadow: #a8b2b9 6px 0 30px -12px;
      box-shadow: #a8b2b9 6px 0 30px -12px;
    }
    &-avatar{
      width: 120%;
      height: 117%;
      margin-left: -10%;
      margin-top: -16%;
    }
    &-text{
      text-align: center;
      font-size: 18px;
      background-color: #f5f5f5;
      color: #4f4f4f;
      line-height: 60px;
    }
    &-chart1{
      padding: 5% 5% 5% 15%;
      &-text{
        text-align: center;
        font-size: 18px;
        background-color: #f5f5f5;
        color: #4f4f4f;
        line-height: 60px;
      }
    }
    &-chart{
      padding: 8% 5% 5% 10%;
      &-text{
        text-align: center;
        font-size: 18px;
        background-color: #f5f5f5;
        color: #4f4f4f;
        line-height: 60px;

      }
    }
    &-tips{
      font-size: 18px;
      color: #4f4f4f;
      padding-bottom: 1%;
    }
    &-row{
      margin-bottom: 4%;
      background: #ffffff;
      width: 100%;
      height: 440px;
      overflow-y: scroll;
      padding: 20px;
      float: left;
    }
    &-card{
      &-container{
        background: #ffffff;
      }
      &-text{
        // padding: 16px;
        // text-align: center;
        height: 120px;
        // line-height: 25px;
      }
      &-image{
        width: 100%;
        display: block;
      }
    }
  }
  .appBackground {
    background-size: 100%;
    background-repeat: no-repeat;
    background-position-y: bottom;
    width: 100%;
    height: 100%;
    z-index:-10;
    zoom: 1;
  }

  .divTable{
    display:table;
    border-collapse:separate;
    /*width: 100%;*/
    &-row {
      display:table-row;
      &-header{
        font-weight:600;
        height: 35px;
      }
    }
    &-row div {
      display:table-cell;
    }
    &-content{
      width: 18.5%;
    }
  }
	.divTable .divTable-content:nth-of-type(5){
		/*background: red;*/
		/*width: 10%;*/
	}
  .vLine{
    border-right: solid #e5e5e5;

  }
  .bLine{
    border-bottom: solid #e5e5e5;
  }
  .recommendBox{
    padding: 0 5% 10% 5%;
  }
  .recommend{
    padding: 0 5% 8% 5%;
    background-color: #f5f5f5;
    min-height:650px;
    border-bottom: 1px solid #CECECE;
  }
  .comments{
    padding: 0 5% 8% 5%;
    background-color: #f5f5f5;
    &-content{
      background-color: #ffffff;
      border-radius: 10px;
    }
    &-reviews{
      height: 105px;
    }
    &-people{
      padding-top: 4%;
      float: right;
    }
    &-button{
      text-align: center;
      padding-top: 45%;
    }
  }
  .infoBasic{
    background-color: #ffff;
    padding-bottom: 1.5%;
    padding-left: 1%;
  }
  .report{
    &-code{
      width: 25%;
      float: left;
      margin-top: -10%;
    }
  }

  .rt{
    width: 100%;
    border-collapse: collapse;
    border-left: 1px solid #ebeef5;
    border-top: 1px solid #ebeef5;
    border-right: 1px solid #ebeef5;
  }

  .rt tr th {
    padding: 12px 0;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    border-bottom: 1px solid #ebeef5;
    position: relative;
    word-wrap: normal;
    text-overflow: ellipsis;
    vertical-align: middle;
    box-sizing: border-box;
  }

  .rt tr td {
    text-align: center;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    padding: 12px 0;
    border-bottom: 1px solid #ebeef5;
  }

  .rt-table{
    width: 100%;
  }

  .explain{
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    padding: 12px 0;
  }
  .test{
    width: 76%;
  }
  .text2{
    width: 76%;
  }
  @media print {
    .rowWidth{
      height:500px;
      min-width: 1100px;
      overflow: hidden;
      left: 0;
      position: relative;
    }
    .filter-chart-text{
      margin-top: 50px;
    }
    .filter-text{
      margin-top: 30px;
    }

    .filter-chart1 {
      position: relative;
      top: 15%;
      left:-30px;

    }


    .filter-chart{
      position: relative;
      top: 15%;
      right:-30px;

    }
    .printStyleSeven{
      position: relative;
      top: 16%;
      right:-30px;

    }
    .printStyleNight{
      position: relative;
      top: 17%;
      left:50px;
    }

  }

</style>
<style media="print">


  @page { margin: 0; }
  .divPrint{
    width: 18.4%;
  }


  .infoPrint{
    height: 120px;
    background-size: cover;
    background-repeat: no-repeat;
    background-position-y: bottom;
    width: 100%;
    z-index:-10;
    zoom: 1;
  }
  .infoBasicPrint{
    background-color: #ffff;
  }
  .textPrint{
    text-align: center;
    font-size: 18px;
    background-color: #f5f5f5;
    color: #4f4f4f;
    line-height: 45px;
  }
  /*.chartPrint{*/

  /*}*/
  /*.vue-highcharts{
  	width: 560px;
  }*/
  .medicalPrint {
    padding: 0.5% 5% 4% 5%;
    min-height: 445px;
  }

  .peoplePrint {
    padding-top: 12%;
    float: right;
  }
  .tabPrint{
    margin-top: -2%;
    border: 1px solid #000000;
  }


  .tablePrint .cell {
    line-height: 15px;
  }
  .chartTextPrint{
    padding-left: 16%;

  }

  .rtPrint{
    width: 100%;
    border-collapse: collapse;
    border-left: 1px solid #000000;
    border-top: 1px solid #000000;
  }

  .rtPrint tr th {
    padding: 12px 0;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    color: #333333;
    border-bottom: 1px solid #000000;
    border-right: 1px solid #000000;
    position: relative;
    word-wrap: normal;
    text-overflow: ellipsis;
    vertical-align: middle;
    box-sizing: border-box;
  }

  .rtPrint tr td {
    text-align: center;
    box-sizing: border-box;
    white-space: normal;
    word-break: break-all;
    padding: 12px 0;
    border-bottom: 1px solid #000000;
    border-right: 1px solid #000000;
  }

</style>
