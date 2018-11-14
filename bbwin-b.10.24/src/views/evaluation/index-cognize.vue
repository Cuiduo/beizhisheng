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
              <el-table class="cognizeTab tab-evaluation" :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row
                        empty-text="暂无数据" @selection-change="handleSelectionChange" :span-method="objectSpanMethod" :row-class-name="tableRowClassName">
                <el-table-column prop="ordinal" label="起点" align="center" header-align="center" width="100px">
                  <template slot-scope="scope">{{scope.row.starting}}</template>
                </el-table-column>
                <el-table-column prop="ordinal" label="NO." align="center" header-align="center" width="100px"></el-table-column>
                <el-table-column prop="description" label="项目" width="600px"></el-table-column>
                <el-table-column label="得分" align="center" header-align="center" width="200px"><template slot-scope="scope">
                  <el-row>
                    <el-radio-group v-model="itemRadio[scope.row.ordinal]" @change="passReasons(scope.row,$event)">
                      <el-radio-button label="1">A</el-radio-button>
                      <el-radio-button label="0">B</el-radio-button>
                    </el-radio-group>
                  </el-row></template>
                 </el-table-column>
                <el-table-column label="备注" align="center" header-align="center"><template slot-scope="scope">
                  <el-input type="textarea" placeholder="请输入" :autosize="{ minRows: 2, maxRows: 6 }" @change="handleFailedDataSave($event, scope.row)"></el-input>
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
        <el-form-item label="姓名：">{{info.babyName}}</el-form-item>
        <el-form-item label="月龄：">{{info.monthAge}}</el-form-item>
        <el-form-item label="得分：">{{pushData.score}}</el-form-item>
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
  import { fetchDataList, recordDetail, saveData } from '@/api/evaluation-cognize'

    ;(function() {
  })()

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
          score: 0
        },
        starts: {
          'A': 1,
          'B': 3,
          'C': 3,
          'D': 7,
          'E': 16,
          'F': 19,
          'G': 22,
          'H': 25,
          'I': 31,
          'J': 34,
          'K': 40,
          'L': 45,
          'M': 45,
          'N': 56,
          'O': 60,
          'P': 63,
          'Q': 67
        },
        startsMonth: {
          'A': 1,
          'B': 2,
          'C': 3,
          'D': 4,
          'E': 5,
          'F': 6,
          'G': 8,
          'H': 10,
          'I': 13,
          'J': 16,
          'K': 19,
          'L': 22,
          'M': 25,
          'N': 28,
          'O': 32,
          'P': 38,
          'Q': 42
        },
        startsMonths: [
          { 'A': 1 },
          { 'B': 2 },
          { 'C': 3 },
          { 'D': 4 },
          { 'E': 5 },
          { 'F': 6 },
          { 'G': 8 },
          { 'H': 10 },
          { 'I': 13 },
          { 'J': 16 },
          { 'K': 19 },
          { 'L': 22 },
          { 'M': 25 },
          { 'N': 28 },
          { 'O': 32 },
          { 'P': 38 },
          { 'Q': 42 }
        ],
        score: 0,
        topVal: 0,
        typeSum: 6,
        dialogVisible: false,
        clickData: [],
        answerProcess: [],
        infoType: {},
        info: {},
        multipleSelection: [],
        answerPass: [],
        answerNotPass: [],
        notPass: true,
        list: [],
        listLoading: true,
        loading: null,
        title: undefined,
        lastValue: 0,
        hasContact: [],
        contactArray: [],
        contactDot: [],
        temMonthAge: undefined,
        day: undefined,
        ageSection: undefined,
        onMonthAge: undefined,
        clickDataSum: 0,
        notMeet: 0
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
      tableRowClassName({ row, rowIndex }) {
        if (row.ordinal === this.temMonthAge) {
          return 'warning-row'
        }
        return ''
      },
      returnTop() {
        // this.$refs.table.bodyWrapper.scrollTop =0;
        // this.$refs.table.bodyWrapper.scrollTop =this.$refs.table.bodyWrapper.scrollHeight;
        this.topVal = document.querySelector('.warning-row').getBoundingClientRect().top
        window.scrollTo(0, this.topVal)
      },
      findKey(value) {
        let item = ''
        Object.keys(this.starts).find(k => {
          if (this.starts[k] === value) {
            item += k
          }
        })
        return item
      },
      objectSpanMethod({ row, column, rowIndex, columnIndex }) {
        if (this.contactArray && columnIndex === 0) {
          const _row = this.contactArray[rowIndex]
          const _col = _row > 0 ? 1 : 0
          return {
            rowspan: _row,
            colspan: _col
          }
        }
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
        if (parseInt(val) === 1) {
          this.answerPass.push(item.ordinal)

          // 取消未选中
          this.removeArray(this.answerNotPass, item.ordinal)
        } else {
          this.answerNotPass.push(item.ordinal)

          // 取消已选中
          this.removeArray(this.answerPass, item.ordinal)

          if (this.notPass && item.ordinal < (this.temMonthAge + 3)) {
            this.temMonthAge = this.onMonthAge
            this.tableRowClassName
            window.scrollTo(0, this.topVal - 300)
            this.notPass = false
          }
        }

        const answerNotPassIndex = this.isAnswerPass(this.answerNotPass, 4)
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
      isAnswerPass(item, val) {
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
            if (oIndex >= val) {
              successStatus = false
            }
          } else if (index - data[i] < -1 && successStatus) {
            oIndex = 0
          }
          index = data[i]
        }
        // 连续通过10道题
        return oIndex >= val ? pass : 0
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
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      fetchData() {
        this.listLoading = true
        fetchDataList(this.testId).then(response => {
          const data = response.data
          this.list = data
          this.list.filter((item, i) => {
            const startingData = this.findKey(item.ordinal)
            if (startingData) {
              this.lastValue = startingData
            }
            item.starting = startingData !== '' ? startingData : this.lastValue
            this.answerProcess.push(i + 1)
            this.$set(this.pushData, 'desc' + item.ordinal, '')
            this.itemRadio.push('score' + item.ordinal)
          })
          this._normalize(this.list)
          this.listLoading = false
          setTimeout(() => {
            this.returnTop()
          }, 3000)
        })
      },
      _normalize(data) {
        for (const i in data) {
          if (parseInt(i) === 0) {
            this.contactArray.push(1)
            this.contactDot = 0
          } else {
            if (data[i].starting === data[i - 1].starting) {
              this.contactArray[this.contactDot] += 1
              this.contactArray.push(0)
            } else {
              this.contactArray.push(1)
              this.contactDot = i
            }
          }
        }
      },
      infoData() {
        recordDetail(this.babyId).then(response => {
          this.info = response.data
          // 计算用户出生日期到现在一共多少天
          this.day = this.getElapsedDay(this.info.babyBirthday)
          // 计算用户所在月龄段
          this.getAgeSection()
          this.avatar = response.data.babyGenderName === 1 ? this.manAvatar : this.womenAvatar
          this.background = response.data.babyGenderName === 1 ? this.manBackground : this.womanBackground

          Object.keys(this.starts).find(k => {
            if (this.starts[this.ageSection] > this.starts[k]) {
              this.onMonthAge = this.starts[k]
            }
          })
          this.temMonthAge = this.starts[this.ageSection]
        })
      },
      getElapsedDay(val) {
        const time = Date.parse(new Date())
        const lastTime = Date.parse(val)
        const day = parseInt((time - lastTime) / (1000 * 60 * 60 * 24))
        return day
      },
      getAgeSection() {
        if (this.day >= 16 && this.day <= 45) {
          this.ageSection = 'A'
        } else if (this.day >= 46 && this.day <= 75) {
          this.ageSection = 'B'
        } else if (this.day >= 76 && this.day <= 105) {
          this.ageSection = 'C'
        } else if (this.day >= 106 && this.day <= 135) {
          this.ageSection = 'D'
        } else if (this.day >= 136 && this.day <= 165) {
          this.ageSection = 'E'
        } else if (this.day >= 166 && this.day <= 195) {
          this.ageSection = 'F'
        } else if (this.day >= 196 && this.day <= 270) {
          this.ageSection = 'F'
        } else if (this.day >= 271 && this.day <= 330) {
          this.ageSection = 'H'
        } else if (this.day >= 331 && this.day <= 405) {
          this.ageSection = 'I'
        } else if (this.day >= 406 && this.day <= 495) {
          this.ageSection = 'J'
        } else if (this.day >= 496 && this.day <= 585) {
          this.ageSection = 'K'
        } else if (this.day >= 586 && this.day <= 675) {
          this.ageSection = 'L'
        } else if (this.day >= 676 && this.day <= 765) {
          this.ageSection = 'M'
        } else if (this.day >= 766 && this.day <= 855) {
          this.ageSection = 'N'
        } else if (this.day >= 856 && this.day <= 990) {
          this.ageSection = 'O'
        } else if (this.day >= 991 && this.day <= 1170) {
          this.ageSection = 'P'
        } else if (this.day >= 1171 && this.day <= 1275) {
          this.ageSection = 'Q'
        }
      },
      preview() {
        this.calculateFractions()
        this.dialogVisible = true
      },
      calculateFractions() {
        this.pushData.score = this.temMonthAge - 1
        for (const i in this.list) {
          const score = parseInt(this.itemRadio[this.list[i].ordinal])
          if (score) {
            this.pushData.score += score
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
        this.loading = true;
        console.log(this.pushData);
        saveData(this.pushData).then((response) => {
          this.$message({
            message: '提交成功!', type: 'success', duration: 1000,
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
