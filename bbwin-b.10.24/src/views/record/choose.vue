<template>
  <div class="record-container">

    <div class="record-medical">
      <el-row :gutter="20">
        <el-col :span="24"><breadcrumb></breadcrumb></el-col>
      </el-row>
      <el-row v-if="type==='add'" :gutter="20">
        <el-col :span="24"><el-button type="primary" @click="newRecords"><img style="width: 15px; vertical-align: bottom;margin-right: 5px;" :src="addimg"/>继续新建病历</el-button></el-col>
      </el-row>
    </div>

    <div class="appBackground" :style="{backgroundImage: 'url(' + appBackground + ')' }">
      <div class="filter-medical">
        <div class="filter-container">
          <div class="filter-text" style="font-weight: 600;">请选择测评项目</div>
          <div class="line"></div>
          <el-row :gutter="20" class="filter-row">
            <el-col :span="6" :class="cords" v-for="(item, index) in chooseData" :key="index"
              :offset="index > 0 ? index === 3 ||index === 6?0:3 : 0" :style="{ 'padding-top': index > 2 ? '5%':'0%'}">
              <a @click="goEvaluation(item.testId)">
              <el-card :body-style="{ padding: '0px' }" class="filter-card-container">
                <img :src="item.status===1?evaluating:evaluating1" class="filter-card-image">
                <div class="filter-card-text">
                  <span>{{item.testName}}</span>
                  <br/>
                  <span>{{item.testName2}}</span>
                </div>
              </el-card>
              </a>
            </el-col>

          </el-row>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import Breadcrumb from '@/components/Breadcrumb'
  import appBackground from '@/assets/dashboard/background-2.png'
  import evaluating from '@/assets/record/evaluating.png'
  import evaluating1 from '@/assets/record/evaluating1.png'
  import { testMonth } from '@/api/recordChoose'
	import addimg from '@/assets/dashboard/add.png'
  export default {
    data() {
      return {
        babyId: 0,
        type: '',
        appBackground: appBackground,
        evaluating: evaluating,
        addimg: addimg,
        evaluating1: evaluating1,
        cords:'cords',
        chooseData: []
      }
    },
    components: {
      Breadcrumb
    },
    computed: {
      ...mapGetters([
        'hospitalData'
      ])
    },
    created() {
      this.babyId = this.$route.query.babyId
      this.type = this.$route.query.type
      this.chooseData = [
        { testId: 1, testName: '0-6岁小儿', testName2: '神经心理发育测查', status: 1 },
        { testId: 16, testName: '（0-2岁）', testName2: '家庭养育', status: 1 },
        { testId: 2, testName: '（3-6岁）', testName2: '父母育儿评估量表', status: 1 },
        { testId: 17, testName: '', testName2: '学前50项智力筛查', status: 1 },
        { testId: 19, testName: '', testName2: '婴幼儿认知测定量表', status: 1 },
        { testId: 18, testName: '婴儿-初中生', testName2: '生活能力量表', status: 1 },
        { testId: 20, testName: '(0-3岁)父母育儿评估量表', testName2: '即将开放，敬请期待…', status: 0 },
        { testId: 21, testName: '小儿智能发育筛查', testName2: '即将开放，敬请期待…', status: 0 },
        { testId: 0, testName: '更多测评即将开放', testName2: '敬请期待…', status: 0 }]
    },
    methods: {
      newRecords() {
        this.$router.push({ path: '/record/view/add' })
      },
      goEvaluation(testId) {
        if (testId === 20 || testId === 21) {
          this.$message({ message: '正在测试中，敬请期待！', type: 'warning' })
          return false
        }
        testMonth(this.babyId, testId).then(response => {
          if (response.data) {
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
          } else {
            this.$message({ message: '该儿童不在本系统测查月龄范围之内', type: 'warning' })
          }
        })
      },
      goPage() {
        this.$router.push({ path: '/record/add' })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.cords{
		width: 22.8%;
    min-height: 220px;
	}
  .record{
    &-container{
      background-color: #e3f2f8;
      margin-top: -3%;
    }
    &-medical{
      padding: 4% 5% 0 5%;
    }
  }
	.line{
		margin:20px 5px 35px 5px;
	}
	/*.filter-card-text*/
  .filter{
    &-container{
      width: 100%;
      background-color: #fff;
      margin-top: 2%;
      border-radius: 10px;
      padding:20px 2% 2%;
    }
    &-medical{
      padding: 0 5% 10% 5%;
      min-height: 445px;
    }
    &-text{
      text-align: center;
      font-size: 20px;
      color: #4f4f4f;
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
        min-height: 60px;
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
</style>
