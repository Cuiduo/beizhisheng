<template>
  <div class="report-container">

    <div class="report-medical">
      <el-row :gutter="20">
        <el-col :span="24"><breadcrumb></breadcrumb></el-col>
      </el-row>
    </div>

    <div class="appBackground" :style="{backgroundImage: 'url(' + appBackground + ')' }">
      <div class="filter-medical">
        <div class="filter-container">
          <div class="filter-info" :style="{backgroundImage: 'url(' + background + ')' }">
            <el-row :gutter="20" style="padding-left: 25%">
              <el-col :span="16" class="filter-info-basic">
                <h3>小儿基本信息</h3>
<!--                <div class="filter-info-line"></div>-->

                <div class="divTable">
                  　　　　<div class="divTable-row divTable-row-header">
                  　　　　　　<div class="divTable-content">姓名</div>
                  　　　　　　<div class="divTable-content">性别</div>
                  　　　　　　<div class="divTable-content">出生日期</div>
                  　　　　　　<div class="divTable-content">月龄</div>
                  　　　　　　<div class="divTable-content">父亲姓名</div>
                  　　　　　　<div class="divTable-content">母亲姓名</div>
                  　　　　</div>
                  <div class="divTable-row">
                    　　　　　　<div class="divTable-content">{{info.babyName}}</div>
                    　　　　　　<div class="divTable-content"><span v-if="info.babyGenderName===1">男</span>
                    <span v-else>女</span></div>
                    　　　　　　<div class="divTable-content">{{info.babyBirthday}}</div>
                    　　　　　　<div class="divTable-content">{{info.monthAge}}</div>
                    　　　　　　<div class="divTable-content">{{info.fatherName}}</div>
                    　　　　　　<div class="divTable-content">{{info.motherName}}</div>
                    　　　　</div>
                  　　</div>
              </el-col>
            </el-row>
          </div>
          <div class="filter-results">
            <el-table  :class="comeon" :data="list"  v-loading.body="listLoading" element-loading-text="Loading"  fit highlight-current-row
                      empty-text="暂无数据" @selection-change="handleSelectionChange">
              <el-table-column prop="testid" label="已测评项目"  >

                <template slot-scope="scope">
                  <div style="padding:0 30px">
                    <span>{{testName[parseInt(scope.row.testid?scope.row.testid:scope.row.testId)]}}</span><span style="float: right">检查日期：{{scope.row.createTime}}</span>
                    <div class="line" style="margin: 5px;"></div>
                    <!--<div v-if="parseInt(scope.row.testid?scope.row.testid:scope.row.testId) === 1">
                      <el-col :offset="0" :xs="0" :sm="12" :md="8" :lg="3" :xl="1">
                        <p style="text-align: center;line-height: 0;">关键指标</p>
                        <p style="text-align: center;">{{scope.row.scoreAct}}</p>
                      </el-col>
                      <el-col :offset="3" :xs="8" :sm="12" :md="8" :lg="3" :xl="1">
                        <p style="text-align: center;line-height: 0;">关键指标</p>
                        <p style="text-align: center;">{{scope.row.scoreAdapt}}</p>
                      </el-col>
                      <el-col :offset="3" :xs="8" :sm="12" :md="8" :lg="3" :xl="1">
                        <p style="text-align: center;line-height: 0;">关键指标</p>
                        <p style="text-align: center;">{{scope.row.scoreLanguage}}</p>
                      </el-col>
                    </div>-->
                    <div v-if="parseInt(scope.row.testid?scope.row.testid:scope.row.testId) === 2">
                      <el-col :span="4">
                        <p style="text-align: center;">个人得分</p>
                        <p style="text-align: center;">{{scope.row.a1+scope.row.a2+scope.row.a3+scope.row.a4+scope.row.a5+scope.row.a6+scope.row.a7+scope.row.a8}}</p>
                      </el-col>
                      <el-col :offset="3" :span="4">
                        <p style="text-align: center;">应得分</p>
                        <p style="text-align: center;">100</p>
                      </el-col>
                    </div>

                    <div v-if="parseInt(scope.row.testid?scope.row.testid:scope.row.testId) === 16">
                      <el-col :span="4">
                        <p style="text-align: center;">个人得分</p>
                        <p style="text-align: center;">{{scope.row.a1+scope.row.a2+scope.row.a3+scope.row.a4+scope.row.a5+scope.row.a6}}</p>
                      </el-col>
                      <el-col :offset="3" :span="4">
                        <p style="text-align: center;">应得分</p>
                        <p style="text-align: center;">45</p>
                      </el-col>
                    </div>
                    <div v-if="parseInt(scope.row.testid?scope.row.testid:scope.row.testId) === 17">
                      <el-col :span="4">
                        <p style="text-align: center;">能力商</p>
                        <p style="text-align: center;">{{scope.row.talent}}</p>
                      </el-col>
                    </div>
                    <div v-if="parseInt(scope.row.testid?scope.row.testid:scope.row.testId) === 18"></div>
                    <div v-if="parseInt(scope.row.testid?scope.row.testid:scope.row.testId) === 19"></div>
                    <div v-if="parseInt(scope.row.testid?scope.row.testid:scope.row.testId) === 20">
                      <el-col :span="4">
                        <p style="text-align: center;">个人得分</p>
                        <p style="text-align: center;">{{scope.row.a1+scope.row.a2+scope.row.a3+scope.row.a4+scope.row.a5+scope.row.a6}}</p>
                      </el-col>
                      <el-col :offset="3" :span="4">
                        <p style="text-align: center;">应得分</p>
                        <p style="text-align: center;">45</p>
                      </el-col>
                    </div>
                    <div v-if="parseInt(scope.row.testid?scope.row.testid:scope.row.testId) === 21"></div>
                    <div style="float: right;margin-top: 1.5%;">
                      <el-button type="info" plain @click="goInfo(scope.row.id,parseInt(scope.row.testid?scope.row.testid:scope.row.testId))">查看报告</el-button>
                      <el-button type="primary" @click="goTest(parseInt(scope.row.testid?scope.row.testid:scope.row.testId))">再测一次</el-button></div>
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <!--<el-row :gutter="20" style="padding-top: 2%;">
          <el-col :span="24"><el-button type="primary" @click="goChoose()">新建测评</el-button></el-col>
        </el-row>-->
      </div>
    </div>

  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import appBackground from '@/assets/dashboard/background-2.png'
  import manBackground from '@/assets/background/gender_1.png'
  import womanBackground from '@/assets/background/gender_2.png'
  import manAvatar from '@/assets/report/manAvatar.png'
  import womenAvatar from '@/assets/report/womenAvatar.png'
  import { fetchDataList, recordDetail } from '@/api/info'

  export default {
    data() {
      return {
        id: 0,
        babyId: 0,
        itemRadio: [],
        appBackground: appBackground,
        manBackground: manBackground,
        womanBackground: womanBackground,
        background: manBackground,
        manAvatar: manAvatar,
        womenAvatar: womenAvatar,
        avatar: manAvatar,
				comeon:'comeon',
        testName: {},
        multipleSelection: [],
        list: null,
        allList: [],
        info: {},
        listLoading: true,
        loading: null
      }
    },
    computed: {
      ...mapGetters([
        'hospitalData'
      ])
    },
    components: {
      Breadcrumb
    },
    created() {
      this.id = this.$route.query.id
      this.babyId = this.$route.query.babyId
      this.handleTestName()
      this.infoData()
      this.fetchData()
    },
    methods: {
      handleTestName() {
        const data = this.hospitalData
        for (const i in this.hospitalData) {
          this.$set(this.testName, data[i].testId, data[i].testName)
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      fetchData() {
        this.list = null
        this.listLoading = true
        fetchDataList(this.babyId).then(response => {
          if (response.data.resultList.length > 0) {
            this._setData(response.data.resultList)
          }
          if (response.data.result0_2List.length > 0) {
            this._setData(response.data.result0_2List)
          }
          if (response.data.result0_3List.length > 0) {
            this._setData(response.data.result0_3List)
          }
          if (response.data.result3_6List.length > 0) {
            this._setData(response.data.result3_6List)
          }
          if (response.data.result50List.length > 0) {
            this._setData(response.data.result50List)
          }
          if (response.data.result132List.length > 0) {
            this._setData(response.data.result132List)
          }
          if (response.data.resultCognizeList.length > 0) {
            this._setData(response.data.resultCognizeList)
          }
          if (response.data.resultDdstList.length > 0) {
            this._setData(response.data.resultDdstList)
          }
          this.list = this.allList
          this.listLoading = false
        })
      },
      _setData(data) {
        for (const i in data) {
          this.allList.push(data[i])
        }
      },
      infoData() {
        recordDetail(this.babyId).then(response => {
          this.info = response.data
          this.avatar = response.data.babyGenderName === 1 ? this.manAvatar : this.womenAvatar
          this.background = response.data.babyGenderName === 1 ? this.manBackground : this.womanBackground
        })
      },
      goInfo(id, testId) {
        this.$router.push({ path: '/report/index', query: { id: id, testId: testId }})
      },
      goChoose() {
        this.$router.push({ path: '/record/view/choose', query: { babyId: this.babyId }})
      },
      goTest(testId) {
        if (testId === 1) {
          this.$router.push({ path: '/evaluation/index', query: { babyId: this.babyId, testId: testId }})
        } else if (testId === 2) {
          this.$router.push({ path: '/evaluation/index3-6', query: { babyId: this.babyId, testId: testId }})
        } else if (testId === 16) {
          this.$router.push({ path: '/evaluation/index0-2', query: { babyId: this.babyId, testId: testId }})
        } else if (testId === 17) {
          this.$router.push({ path: '/evaluation/index5-0', query: { babyId: this.babyId, testId: testId }})
        } else if (testId === 18) {
          this.$router.push({ path: '/evaluation/index1-3-2', query: { babyId: this.babyId, testId: testId }})
        } else if (testId === 19) {
          this.$router.push({ path: '/evaluation/index-cognize', query: { babyId: this.babyId, testId: testId }})
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
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
      min-height: 785px;
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
        width: 98%;
        min-width: 680px;
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
      padding: 5% 5% 5% 20%;
      &-text{
        text-align: center;
        font-size: 18px;
        background-color: #f5f5f5;
        color: #4f4f4f;
        line-height: 60px;
      }
    }
    &-chart{
      padding: 5%;
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
    }
    &-card{
      &-container{
        background: linear-gradient(to right, white , #f5f5f5);
      }
      &-text{
        padding: 16px;
        text-align: center;
        height: 80px;
        line-height: 25px;
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
		border-top: 1px solid #9ec3d061;
		padding-top: 20px;
	}
  .vLine{
    border-right: solid #e5e5e5;
  }
  .bLine{
    border-bottom: solid #e5e5e5;
  }

  .comments{
    padding: 0 5% 2% 5%;
    background-color: #f5f5f5;
    &-content{
      background-color: #ffffff;
      border-radius: 10px;
    }
    &-reviews{
      height: 100px;
      padding-top: 2%;
      padding-left: 2%;
    }
    &-button{
      text-align: center;
      padding-top: 45%;
    }
  }
</style>
