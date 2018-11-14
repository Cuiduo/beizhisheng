<template>
  <div class="evaluation-container">

    <div class="evaluation-medical">
      <el-row :gutter="20">
        <el-col :span="24"><breadcrumb></breadcrumb></el-col>
      </el-row>
      <div class="report-title">
        <span>{{title}}</span>
      </div>
    </div>

    <div class="appBackground" :style="{backgroundImage: 'url(' + appBackground + ')' }">
      <div class="filter-medical">
        <div class="filter-container">
          <div class="filter-info" :style="{backgroundImage: 'url(' + background + ')' }">
            <el-row :gutter="20" style="padding-left: 25%">
              <el-col :span="16" class="filter-info-basic">
                <h3>小儿基本信息</h3>
                <div class="filter-info-line"></div>

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
            <div class="filter-results">
              <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row
                        empty-text="暂无数据" :span-method="objectSpanMethod" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName">
                <el-table-column prop="ordinal" label="No." align="center" header-align="center" width="130px"></el-table-column>
                <el-table-column prop="qid" label="项目" align="center" header-align="center" width="100px">>
                  <template slot-scope="scope">{{removeChinese(infoType[scope.row.type])}}</template></el-table-column>
                <el-table-column prop="description" label="测试题目" width="600px"></el-table-column>
                <el-table-column label="符合" align="center" header-align="center" width="150px">>
                  <template slot-scope="scope">
                    <p v-if="scope.row.qid"><el-radio v-model="itemRadio[scope.row.ordinal]" class="success_radio" label="1" @change="passReasons(scope.row,0)">符合</el-radio> </p>
                  </template></el-table-column>
                <el-table-column label="不符合" align="center" header-align="center" width="150px"><template slot-scope="scope">
                  <p v-if="scope.row.qid"><el-radio v-model="itemRadio[scope.row.ordinal]" label="0" class="filter_radio" @change="passReasons(scope.row,1)">不符合</el-radio></p>
                </template></el-table-column>
                <el-table-column label="儿童回答答案" align="center" header-align="center"><template slot-scope="scope">
                  <el-input v-if="scope.row.qid" type="textarea" placeholder="请输入" :autosize="{ minRows: 2, maxRows: 6 }" @change="handleFailedDataSave($event, scope.row)"></el-input>
                </template></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="evaluation-button">
          <div class="evaluation-button-left"><el-button type="primary" @click="preview">预览</el-button></div>
          <div class="evaluation-button-right"><el-button type="primary" :loading="loading" @click="handleCreateSave">保存</el-button></div>
        </div>
      </div>
    </div>


    <el-dialog title="预览" :visible.sync="dialogVisible" width="30%">
      <el-form class="preview" label-position="right" label-width="55%">
        <el-form-item label="SH：">{{pushData.a1}}</el-form-item>
        <el-form-item label="L：">{{pushData.a2}}</el-form-item>
        <el-form-item label="O：">{{pushData.a3}}</el-form-item>
        <el-form-item label="C：">{{pushData.a4}}</el-form-item>
        <el-form-item label="S：">{{pushData.a5}}</el-form-item>
        <el-form-item label="SD：">{{pushData.a6}}</el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
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
  import { fetchDataList, recordDetail, saveData, checkType } from '@/api/evaluation1-3-2'

  export default {
    data() {
      return {
        babyId: 0,
        testId: 0,
        itemRadio: [],
        appBackground: appBackground,
        manBackground: manBackground,
        womanBackground: womanBackground,
        background: manBackground,
        manAvatar: manAvatar,
        womenAvatar: womenAvatar,
        avatar: manAvatar,
        listData: {},
        pushData: {
          babyId: 0,
          a1: 0,
          a2: 0,
          a3: 0,
          a4: 0,
          a5: 0,
          a6: 0
        },
        map: [1, 20, 42, 64, 81, 97, 114],
        ends: [19, 41, 63, 80, 96, 113],
        ageLine: [6, 24, 42, 60, 78, 102, 126],
        monthData: {
          1: '6月-1岁11月',
          2: '2岁-3岁5月',
          3: '3岁6月-4岁11月',
          4: '5岁-6岁5月',
          5: '6岁6月-8岁5月',
          6: '8岁6月-10岁5月',
          7: '10岁6月- 17岁'
        },
        temporaryData: {
          dialogTitle: undefined,
          dialogFormVisible: false,
          domains: [{
            value: ''
          }],
          failRadio: undefined,
          ordinal: undefined,
          otherReasons: undefined,
          otherReasons1: undefined
        },
        score: 0,
        typeSum: 8,
        dialogVisible: false,
        clickData: [],
        answerPass: [],
        answerNotPass: [],
        info: {},
        infoType: {},
        multipleSelection: [],
        list: [],
        listLoading: true,
        loading: null,
        title: undefined,
        topVal: 0,
        temMonthAge: undefined
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
      this.babyId = this.$route.query.babyId
      this.pushData.babyId = this.babyId
      this.testId = parseInt(this.$route.query.testId)
      this.getTitle()
      this.infoData()
      this.checkType()
      this.fetchData()
    },
    methods: {
      getTitle() {
        for (const i in this.hospitalData) {
          if (this.hospitalData[i].testId === this.testId) {
            this.title = this.hospitalData[i].testName
          }
        }
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {

      },
      removeChinese(strValue) {
        if (strValue != null && strValue !== '') {
          return strValue.split('（')[0]
        }
      },
      checkType() {
        checkType().then(response => {
          this.infoType = response.data
        })
      },
      /**
       * 删除数组
       */
      removeArray(data, index) {
        const i = data.indexOf(index)
        if (i >= 0) {
          data.splice(i, 1)
        }
      },
      passReasons(item, val) {
        // 通过  不通过
        if (val === 0) {
          this.answerPass.push(item.ordinal)

          // 取消未选中
          this.removeArray(this.answerNotPass, item.ordinal)
        } else {
          this.answerNotPass.push(item.ordinal)

          // 取消已选中
          this.removeArray(this.answerPass, item.ordinal)

          if (item.ordinal < (this.temMonthAge + 10)) {
            this.temMonthAge += -10
            this.tableRowClassName
            this.topVal += -800
            window.scrollTo(0, this.topVal)
          }
        }

        const answerPassIndex = this.isAnswerPass(this.answerPass)

        // 判断是否连续通过答题10道
        if (answerPassIndex > 0) {
          this.setAnswerPass(answerPassIndex)
        }

        const answerNotPassIndex = this.isAnswerPass(this.answerNotPass)
        // 判断是否连续不通过答题10道  直接提交答案
        if (answerNotPassIndex > 0) {
          this.$notify({
            title: '警告',
            message: '检查结束，提交中...',
            type: 'warning'
          })
          this.calculateFractions()
          this.saveData()
        }
      },
      isAnswerPass(item) {
        const data = this.bubble(item)
        let index = 0
        let oIndex = 0
        let pass = 0
        let status = true
        let successStatus = true
        for (let i = 0; i < data.length; i++) {
          if (index - data[i] === -1) {
            if (status) {
              pass = index
              status = false
            }
            oIndex++
            if (oIndex >= 9) {
              successStatus = false
            }
          } else if (index - data[i] < -1 && successStatus) {
            oIndex = 0
          }
          index = data[i]
        }
        // 连续通过10道题
        return oIndex >= 9 ? pass : 0
      },
      setAnswerPass(answerPassIndex) {
        for (let i = 1; i < answerPassIndex; i++) {
          this.$set(this.itemRadio, i, '1')
        }
      },
      bubble(arr) {
        let s
        for (let i = 0; i < arr.length; i++) {
          for (let j = 0; j < arr.length; j++) {
            if (arr[j] > arr[j + 1]) {
              s = arr[j]; arr[j] = arr[j + 1]
              arr[j + 1] = s
            }
          }
        }
        return arr
      },
      handleFailedDataSave(val, row) {
        this.$set(this.pushData, 'desc' + row.ordinal, val)
      },
      tableRowClassName({ row }) {
        if (row.ordinal === this.temMonthAge) {
          return 'warning-row'
        }
        return ''
      },
      returnTop() {
        this.topVal = document.querySelector('.warning-row').getBoundingClientRect().top
        window.scrollTo(0, this.topVal)
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      fetchData() {
        this.listLoading = true
        fetchDataList(this.testId).then(response => {
          this.list = response.data
          this.list.filter((item) => {
            this.$set(this.pushData, 'desc' + item.ordinal, '')
            this.itemRadio.push('score' + item.ordinal)
          })
          this.list.splice(0, 0, { 'ordinal': this.monthData[1], 'month': 1 })
          this.list.splice(20, 0, { 'ordinal': this.monthData[2], 'month': 2 })
          this.list.splice(43, 0, { 'ordinal': this.monthData[3], 'month': 3 })
          this.list.splice(66, 0, { 'ordinal': this.monthData[4], 'month': 4 })
          this.list.splice(84, 0, { 'ordinal': this.monthData[5], 'month': 5 })
          this.list.splice(101, 0, { 'ordinal': this.monthData[6], 'month': 6 })
          this.list.splice(119, 0, { 'ordinal': this.monthData[7], 'month': 7 })
          this.listLoading = false
          setTimeout(() => {
            this.returnTop()
          }, 3000)
        })
      },
      infoData() {
        recordDetail(this.babyId).then(response => {
          this.info = response.data
          this.avatar = response.data.babyGenderName === 1 ? this.manAvatar : this.womenAvatar
          this.background = response.data.babyGenderName === 1 ? this.manBackground : this.womanBackground
          this.temMonthAge = this.getRange().start
        })
      },
      /**
       * 计算当前年龄 所在答题组
       */
      getRange() {
        const days = parseInt(this.info.monthAge)
        const range = {
          start: 0,
          end: 0
        }
        if (days < 24) {
          range.start = 1
          range.end = 19
        } else if (days < 42) {
          range.start = 20
          range.end = 41
        } else if (days < 60) {
          range.start = 42
          range.end = 63
        } else if (days < 78) {
          range.start = 64
          range.end = 80
        } else if (days < 102) {
          range.start = 81
          range.end = 96
        } else if (days < 126) {
          range.start = 97
          range.end = 113
        } else {
          range.start = 114
          range.end = 132
        }
        return range
      },
      preview() {
        this.calculateFractions()
        this.dialogVisible = true
      },
      calculateFractions() {
        this.pushData.a1 = 0
        this.pushData.a2 = 0
        this.pushData.a3 = 0
        this.pushData.a4 = 0
        this.pushData.a5 = 0
        this.pushData.a6 = 0
        for (const i in this.list) {
          const score = parseInt(this.itemRadio[this.list[i].ordinal])
          const type = this.list[i].type
          if (score) {
            if (type === 41) {
              this.pushData.a1 += score
            } else if (type === 42) {
              this.pushData.a2 += score
            } else if (type === 43) {
              this.pushData.a3 += score
            } else if (type === 44) {
              this.pushData.a4 += score
            } else if (type === 45) {
              this.pushData.a5 += score
            } else if (type === 46) {
              this.pushData.a6 += score
            }
          }
        }
      },
      questionsNumber() {
        return this.answerPass.length > 0
      },
      handleCreateSave() {
        if (!this.questionsNumber()) {
          this.$message({ showClose: true, message: '请答题!', type: 'warning' })
          return false
        }
        this.calculateFractions()
        this.$confirm('确定保存本测评?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.saveData()
        }).catch(() => {

        })
      },
      saveData() {
        this.loading = true
        saveData(this.pushData).then((response) => {
          this.$message({ message: '提交成功!', type: 'success', duration: 1000,
            onClose: () => {
              this.goPage(response.data)
            }
          })
          this.loading = false
        }).catch(e => {
          this.loading = false
          this.$message({ showClose: true, message: e, type: 'error' })
        })
      },
      goPage(id) {
        this.$router.push({ path: '/report/index', query: { id: id, testId: this.testId }})
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
      margin-top: 4%;
      &-left{
        float: left;
      }
      &-right{
        float: right;
      }
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
      &-jokes{
        line-height: 30px;
        padding: 2%;
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
      font-size: 20px;
      background-color: #f5f5f5;
      color: #4f4f4f;
      line-height: 60px;
    }
    &-chart{
      padding: 5%;
      &-text{
        text-align: center;
        font-size: 20px;
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
</style>
