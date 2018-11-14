<template>
  <div class="dashboard-container">
    <div class="dashboard-background" :style="{backgroundImage: 'url(' + background + ')' }"></div>
    <div class="dashboard-medical">
      <el-row :gutter="20">
        <el-col :offset="1" :span="2"><div class="dashboard-medicalContent"><svg-icon class="dashboard-medicalImg" icon-class="medicalImg" /></div></el-col>
        <el-col :span="6" class="dashboard-medicalText">病历{{recordNum}}个</el-col>
        <el-col :span="12" style="float: right;text-align: right;" class="dashboard-medicalBut">
          <el-button type="danger"  @click="newRecords()">新建病历</el-button>
          <el-button type="primary" @click="goPage()">病历管理</el-button>
        </el-col>
      </el-row>
      <div class="line"></div>
      <div class="evaluation">
        <div class="evaluation-text">最近测评</div>
        <el-row :gutter="20">
          <el-col :span="6" v-for="(item, index) in filterData(hospitalData)" :key="index" :offset="index > 0 ? 3 : 0">
            <el-card shadow="hover" :body-style="{ padding: '0px' }">
              <div class="evaluation-card-content">
                <span class="evaluation-card-title">{{item.testName}}</span><br/>
                <span class="evaluation-card-item"></span>
              </div>
              <div class="evaluation-card-button">
                <span class="evaluation-card-span">{{item.useTimes}}人次</span>
                <el-button type="primary" @click="goPage(item.testId)">已测病历</el-button></div>
            </el-card>
          </el-col>
        </el-row>
      </div>
      <div class="line"></div>
      <div class="allEvaluation">
        <div class="allEvaluation-text">全部测评</div>
        <div class="allEvaluation-parent">
        <div class="allEvaluation-select">
          <el-radio-group  v-model="selectAge" @change="updateAge">
            <el-radio-button label="0">全部</el-radio-button>
            <el-radio-button label="1">0-3岁</el-radio-button>
            <el-radio-button label="2">4-6岁</el-radio-button>
            <el-radio-button label="3">7-18岁</el-radio-button>
          </el-radio-group>
        </div>
        </div>
      </div>
    </div>
      <div class="allEvaluation-border">
        <div class="allEvaluation-border-arrow" v-bind:style="{'left':arrowLeft}"></div>
      </div>
    <!--<div class="allEvaluation-background" :style="{backgroundImage: 'url(' + background_2 + ')' }"></div>-->
    <div class="allEvaluation-medical">
      <el-row :gutter="20" :style="{ 'height': isHeight ? '409px':''}" >
        <el-col :span="6" v-for="(item, index) in allFilterData(hospitalData)" :key="index"
                :offset="index > 0 ? index === 3 ||index === 6?0:3 : 0" :style="{ 'padding-top': index > 2 ? '5%':'0%'}">
          <el-card shadow="hover" :body-style="{ padding: '0px' }">
            <div class="allEvaluation-card-content">
              <span class="allEvaluation-card-title">{{item.testName}}</span><br/>
              <span class="allEvaluation-card-item"></span>
            </div>
            <div class="allEvaluation-card-line"></div>
            <div class="allEvaluation-card-button">
              <span class="allEvaluation-card-span">{{item.useTimes}}人次</span>
              <el-button type="primary" @click="goPage(item.testId)">已测病历</el-button></div>
          </el-card>
        </el-col>
      </el-row>
    </div>
      <el-row :gutter="20" class="allEvaluation-footer">
        <el-col :span="2" class="allEvaluation-footer-code"><img :src="img_code" class="allEvaluation-footer-img"> </el-col>
        <el-col :span="18" class="allEvaluation-footer-text">
          <!-- 扫码关注更多儿保资讯<br/> -->
          <span class="allEvaluation-footer-span">
          <!-- ——————————<br/> -->
          扫码获取更多服务<br/>
          <!-- 《父母育儿评估测量表》技术培训 -->
          </span>
          
        </el-col>
      </el-row>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import background from '@/assets/dashboard/background.png'
  import background_2 from '@/assets/dashboard/background-2.png'
  import img_code from '@/assets/dashboard/code.png'
  import { getLastCheck, getRecordNum } from '@/api/dashboard'
  export default {
    data() {
      return {
        background: background,
        background_2: background_2,
        img_code: img_code,
        selectAge: '0',
        arrowLeft: '37.5%',
        lastData: [],
        showData: [],
        recordNum: undefined,
        isHeight: false
      }
    },
    name: 'dashboard',
    computed: {
      ...mapGetters([
        'hospitalData'
      ])
    },
    created() {
      this.getRecordNum()
      this.getLastCheck()
      this.setShowData()
    },
    methods: {
      newRecords() {
        this.$router.push({ path: '/record/view/add' })
      },
      goPage(id) {
        if (id > 0) {
          this.$router.push({ path: '/record/hasRecord', query: { testId: id }})
        } else {
          this.$router.push({ path: '/record/hasRecord' })
        }
      },
      setShowData() {
        for (const i in this.hospitalData) {
          this.showData.push(this.hospitalData[i].testId)
        }
      },
      getLastCheck() {
        getLastCheck().then(response => {
          this.lastData = response.data.splice(0, 3)
        })
      },
      getRecordNum() {
        getRecordNum().then(response => {
          this.recordNum = response.data
        })
      },
      filterData(data) {
        return data.filter(item => {
          return this.lastData.indexOf('' + item.testId) >= 0
        })
      },
      allFilterData(data) {
        return data.filter(item => {
          return this.showData.indexOf(item.testId) >= 0
        })
      },
      /**
       * 更改月龄
       */
      updateAge() {
        this.isHeight = false
        if (this.selectAge === '0') {
          this.arrowLeft = '37.5%'
          this.showData = [1, 2, 16, 17, 18, 19, 20, 21]
        } else if (this.selectAge === '1') {
          this.arrowLeft = '44%'
          this.showData = [1, 2, 16, 18, 19, 20, 21]
        } else if (this.selectAge === '2') {
          this.arrowLeft = '51%'
          this.showData = [1, 2, 17, 18, 21]
        } else {
          this.arrowLeft = '58%'
          this.showData = [1, 17, 18]
          this.isHeight = true
        }
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.line{
		margin: 10px 5px 35px 5px;
	}
	.el-button--primary{
		padding: 8px 20px;
	}
	.el-radio-button{

	}
	
  .dashboard {
    &-container {}
    &-background {
      position: absolute;
      width: 100%;
      height: 100%;
      background-size: cover;
      z-index:-10;
      zoom: 1;
      background-repeat: no-repeat;
      margin-top: -8%;
    }
    &-medical{
      padding: 1% 4% 0 4%;
    }
    &-medicalContent{
      background-color: #e6f2f7;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      text-align: center;
    }
    &-medicalImg{
      margin-top: 20%;
      width: 100%;
      height: 60%;
    }
    &-medicalText{
      padding-left: 0 !important;
      line-height: 60px;
      font-size: 20px;
      color: #3d5c8a;
      padding-right: 5%;
      margin-left: 2%;
    }
    &-medicalBut{
      padding-left: 9% !important;
      padding-top: 10px;
       padding-right: 0 !important;
    }
  }

  .evaluation{
    /*padding-top: 1%;*/

    &-text{
      text-align: center;
      font-size: 20px;
      padding-bottom: 30px;
      color: #4f4f4f;
      font-weight: 600;
    }
    &-card{
      &-content{
        padding: 7% 7% 5% 7%;
        height: 115px;
        line-height: 22px;
      }
      &-button{
        background-color: #d4ecf7;
        text-align: right;
        padding: 3% 5% 3% 0;
      }
      &-title{
        font-size: 15px;
      }
      &-item {
        font-size: 12px;
        padding: 18px 0;
      }
      &-span{
        color: #5185d0;
        font-size: 18px;
        padding-right: 2px;
      }
    }
  }


  .allEvaluation{
    /*padding-top: 1%;*/
    &-text{
      text-align: center;
      font-size: 20px;
      padding-bottom: 30px;
      color: #4f4f4f;
      font-weight: 600;
    }
    &-parent{
      position:relative;
      width:100%;
      margin-bottom: 3%;
    }
    &-select{
      margin: auto;
      border-radius: 30px;
      background-color: #e6f2f7;
      width: 32%;
    }
    &-border{
      position: relative;
      border-radius: 55% 70% 0 0;
      background-color: #e6f2f7;
      width: 100%;
      height: 50px;
      &-arrow {
        content: '';
        position: absolute;
        top: -45%;
        border-left: 30px solid transparent;
        border-right: 30px solid transparent;
        border-bottom: 30px solid #e6f2f7;
      }
    }

    &-medical{
      padding: 3% 4% 4% 4%;
      background: url(../../assets/dashboard/background-2.png) no-repeat;
      background-size: cover;
    }

    &-card{
      &-content{
        padding: 7% 7% 5% 7%;
        height: 115px;
        line-height: 22px;
      }
      &-button{
        background-color: #fdfefe;
        text-align: right;
        padding: 3% 5% 3% 0;
      }
      &-title{
        font-size: 15px;
      }
      &-item {
        font-size: 12px;
        padding: 18px 0;
      }
      &-span{
        color: #65a1ba;
        font-size: 18px;
        padding-right: 2px;
      }
      &-line{
        height: 1px;
        background-color: #e0e6ed;
        margin: 0 20px;
      }
    }

    &-row2{
      padding-top: 5%;
    }

    &-background {
      position: absolute;
      width: 100%;
      height: 680px;
      background-size: cover;
      z-index:-10;
      zoom: 1;
      background-repeat: no-repeat;
      margin-top: -2%;
    }

    &-footer{
      height: 120px;
      background-color: #aadbf4;
      margin-left: 0 !important;
      margin-right: 0 !important;
      &-text{
        float: right;
        color: #5185d0;
        text-align: right;
        padding-top: 2%;
      }
      &-text{
        line-height: 22px;
        font-size: 15px;
      }
      &-code{
        width: 8%;
        float: right;
        background-color: #aadbf4;
        height: 100%;
        margin-top: -1.5%;
        border-radius: 10px;
        margin-right: 5%;
        text-align: center;
        padding: 0.5%;
      }
      &-img{
        width: 100%;
      }
    }
  }

</style>
