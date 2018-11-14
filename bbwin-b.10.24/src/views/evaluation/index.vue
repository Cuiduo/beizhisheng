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
          <p style="padding-left: 10px">注:量表中有R的项目表示该测查项目可以询问家长。</p>
          <div class="filter-results" style="padding: 0">
            <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row
                      empty-text="暂无数据" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName" :class="topTableStatus?'topTable':''">
              <el-table-column prop="month" label="月龄 \ 项目" align="center" header-align="center" width="100px"></el-table-column>
              <el-table-column label="大运动" header-align="center">
                <template slot-scope="scope">
                  <p v-for="item in scope.row.movement">
                    {{item.ordinal+'.'+item.description}}
                    <br/>
                    <el-row>
                      <el-col :span="12"><el-checkbox v-model="item.score" :label="item.extend1" class="success_radio" @change="passReasons(item)">通过</el-checkbox></el-col>
                      <el-col :span="12"><a @click="failReasons(item,item.ordinal)" class="answer-a" :class="{ aRed:item.changeRed === item.ordinal}">不通过</a></el-col>
                    </el-row>
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="精细动作" header-align="center">
                <template slot-scope="scope">
                  <p v-for="(item) in scope.row.sports">
                    {{item.ordinal+'.'+item.description}}
                    <br/>
                    <el-row>
                      <el-col :span="12"><el-checkbox v-model="item.score" :label="item.extend1" class="success_radio" @change="passReasons(item)">通过</el-checkbox></el-col>
                      <el-col :span="12"><a @click="failReasons(item,item.ordinal)" class="answer-a" :class="{ aRed:item.changeRed === item.ordinal}">不通过</a></el-col>
                    </el-row>
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="适应能力" header-align="center">
                <template slot-scope="scope">
                  <p v-for="(item) in scope.row.action">
                    {{item.ordinal+'.'+item.description}}
                    <br/>
                    <el-row>
                      <el-col :span="12"><el-checkbox v-model="item.score" :label="item.extend1" class="success_radio" @change="passReasons(item)">通过</el-checkbox></el-col>
                      <el-col :span="12"><a @click="failReasons(item,item.ordinal)" class="answer-a" :class="{ aRed:item.changeRed === item.ordinal}">不通过</a></el-col>
                    </el-row>
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="语言" header-align="center">
                <template slot-scope="scope">
                  <p v-for="(item) in scope.row.adapt">
                    {{item.ordinal+'.'+item.description}}
                    <br/>
                    <el-row>
                      <el-col :span="12"><el-checkbox v-model="item.score" :label="item.extend1" class="success_radio" @change="passReasons(item)">通过</el-checkbox></el-col>
                      <el-col :span="12"><a @click="failReasons(item,item.ordinal)" class="answer-a" :class="{ aRed:item.changeRed === item.ordinal}">不通过</a></el-col>
                    </el-row>
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="社交行为" header-align="center">
                <template slot-scope="scope">
                  <p v-for="(item) in scope.row.social">
                    {{item.ordinal+'.'+item.description}}
                    <br/>
                    <el-row>
                      <el-col :span="12"><el-checkbox v-model="item.score" :label="item.extend1" class="success_radio" @change="passReasons(item)">通过</el-checkbox></el-col>
                      <el-col :span="12"><a @click="failReasons(item,item.ordinal)" class="answer-a" :class="{ aRed:item.changeRed === item.ordinal}">不通过</a></el-col>
                    </el-row>
                  </p>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="evaluation-button">
          <div class="evaluation-button-left"><el-button type="primary" @click="preview">预览</el-button></div>
          <div class="evaluation-button-right"><el-button type="primary" :loading="loading" @click="handleCreateSave">保存</el-button></div>
        </div>
      </div>
    </div>

    <el-dialog :title="temporaryData.dialogTitle" :visible.sync="temporaryData.dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false" width="500px">
      <el-form ref="addEditPopForm" :model="temporaryData" label-position="left" label-width="100px">
        <p v-for="domain in temporaryData.domains">
          <el-radio v-model="temporaryData.failRadio" :label="domain.test">{{domain.test}}</el-radio>
        </p>
        <p class="other">
          <el-radio v-model="temporaryData.failRadio" label="0">其他原因&nbsp;<el-input v-model="temporaryData.otherReasons"></el-input></el-radio>
        </p>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="temporaryData.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFailedDataSave">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog title="预览" :visible.sync="dialogVisible" width="409px">
      <el-form class="preview" label-position="right" label-width="55%">
        <el-form-item label="大运动：">{{pushData.scoreSport}}</el-form-item>
        <el-form-item label="精细动作：">{{pushData.scoreAct}}</el-form-item>
        <el-form-item label="适应能力：">{{pushData.scoreAdapt}}</el-form-item>
        <el-form-item label="语言：">{{pushData.scoreLanguage}}</el-form-item>
        <el-form-item label="社交行为：">{{pushData.scoreSocial}}</el-form-item>
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
  import { fetchDataList, recordDetail, saveData } from '@/api/evaluation'

  export default {
    data() {
      return {
        babyId: 0,
        testId: 0,
        appBackground: appBackground,
        manBackground: manBackground,
        womanBackground: womanBackground,
        background: manBackground,
        manAvatar: manAvatar,
        womenAvatar: womenAvatar,
        avatar: manAvatar,
        listData: {},
        pushData: {
          babyid: 0,
          scoreSport: 0,
          scoreAct: 0,
          scoreAdapt: 0,
          scoreLanguage: 0,
          scoreSocial: 0,
          dq: 0,
          growth: 0
        },
        temporaryData: {
          dialogTitle: undefined,
          dialogFormVisible: false,
          domains: [],
          failRadio: undefined,
          ordinal: undefined,
          otherReasons: undefined
        },
        score: 0,
        typeSum: 5,
        dialogVisible: false,
        clickData: [],
        clickDataSum: [],
        answerProcess: {},
        monthAnswer: 0,
        monthSum: {},
        info: {},
        multipleSelection: [],
        list: [],
        monthNum: [],
        listLoading: true,
        loading: null,
        title: undefined,
        temMonthAge: undefined,
        topTableStatus: false
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
      this.pushData.babyid = this.babyId
      this.testId = parseInt(this.$route.query.testId)
      this.getTitle()
      this.infoData()
      this.fetchData()
    },
    mounted() { // 给window添加一个滚动滚动监听事件
      window.addEventListener('scroll', this.handleScroll)
    },
    methods: {
      handleScroll() { // 改变元素#searchBar的top值
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
        if (scrollTop >= 350) {
          this.topTableStatus = true
        } else {
          this.topTableStatus = false
        }
      },
      getTitle() {
        for (const i in this.hospitalData) {
          if (this.hospitalData[i].testId === this.testId) {
            this.title = this.hospitalData[i].testName
          }
        }
      },
      /**
       * 给当前月龄赋值
       */
      tableRowClassName({ row, rowIndex }) {
        if (row.month === this.temMonthAge) {
          return 'warning-row'
        }
        return ''
      },
      /**
       * 跳转到指定位置
       */
      returnTop() {
        const topVal = document.querySelector('.warning-row').getBoundingClientRect().top - 30
        window.scrollTo(0, topVal)
      },
      /**
       * 通过
       */
      passReasons(item) {
        if (item.score) {
          item.changeRed = -1
          this.clickData.push(item.ordinal)
          this.$set(this.pushData, 'score' + item.ordinal, parseFloat(item.extend1))
          this.$set(this.pushData, 'reason' + item.ordinal, '')
          const indexSum = this.clickDataSum.indexOf(item.ordinal)
          if (indexSum === -1) {
            this.clickDataSum.push(item.ordinal)
            this.$set(this.answerProcess, item.month, this.answerProcess[item.month] + 1)

            this._ifAnswer()
          }
          // this.typeScore(item, 'add')
        } else {
          this.$set(this.pushData, 'score' + item.ordinal, 0)
          // this.typeScore(item, 'remove')
          const index = this.clickDataSum.indexOf(item.ordinal)
          if (index !== -1) {
            this.clickDataSum.splice(index, 1)
            this.$set(this.answerProcess, item.month, this.answerProcess[item.month] - 1)
          }
        }
      },
      /* typeScore(item, val) {
        const index = this.clickData.indexOf(item.ordinal)
        if (index >= 0) {
          if (val === 'remove') {
            this.clickData.splice(index, 1)
          }
        }
        const indexSum = this.clickDataSum.indexOf(item.ordinal)
        if (indexSum === -1) {
          this.clickDataSum.push(item.ordinal)
          this.$set(this.answerProcess, item.month, this.answerProcess[item.month] + 1)

          this._ifAnswer()
        }
      },*/
      /**
       * 不通过
       */
      failReasons(item, index) {
        item.score = false
        const _index = this.clickDataSum.indexOf(item.ordinal)
        if (_index !== -1) {
          this.clickDataSum.splice(_index, 1)
          this.$set(this.answerProcess, item.month, this.answerProcess[item.month] - 1)
        }
        item.changeRed = index
        // this.typeScore(item, 'remove')
        this.$set(this.pushData, 'score' + item.ordinal, 0)
        this.temporaryData.dialogTitle = '请选择不通过原因'
        this.temporaryData.dialogFormVisible = true
        this.temporaryData.domains = []
        this.temporaryData.failRadio = undefined
        this.temporaryData.otherReasons = undefined
        this.temporaryData.ordinal = item.ordinal
        const reasons = item.reasons.split(';')
        for (let i = 0; i < reasons.length; i++) {
          this.addDomain(reasons[i])
        }
      },
      addDomain(reasons) {
        const data = reasons || '其他原因'
        this.temporaryData.domains.push({
          test: data
        })
      },
      handleFailedDataSave() {
        const name = 'reason' + this.temporaryData.ordinal
        const idValue = this.temporaryData.failRadio === '0' ? this.temporaryData.otherReasons : this.temporaryData.failRadio
        this.$set(this.pushData, name, idValue)

        this.temporaryData.dialogFormVisible = false
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      /**
       * 获取表格数据
       */
      fetchData() {
        this.list = null
        this.listLoading = true
        fetchDataList(this.testId).then(response => {
          const data = response.data
          // 按照类型拼装数据  一共5类
          data.filter((item) => {
            if (item.month === this.info.monthAge) {
              this.temMonthAge = item.month
            } else if (this.info.monthAge > item.month) {
              this.temMonthAge = item.month
            }
            if (!this.listData[item.month]) {
              this.$set(this.answerProcess, item.month, 0)
              this.$set(this.monthSum, item.month, 0)
              this.monthNum.push(item.month)
              this.listData[item.month] = { month: item.month, movement: [], sports: [], action: [], adapt: [], social: [] }
            }
            this.restructuring(item)
          })
          const item = []
          for (const i in this.listData) {
            item.push(this.listData[i])
          }
          this.list = item
          this.listLoading = false
          setTimeout(() => {
            this.returnTop()
          }, 4000)
        })
      },
      /**
       * 获取用户基本信息
       */
      infoData() {
        recordDetail(this.babyId).then(response => {
          this.info = response.data
          this.avatar = response.data.babyGenderName === 1 ? this.manAvatar : this.womenAvatar
          this.background = response.data.babyGenderName === 1 ? this.manBackground : this.womanBackground
        })
      },
      /**
       * 数据push到每个类型数组
       */
      restructuring(data) {
        const _listData = this.listData[data.month]
        _listData.month = data.month
        this.$set(this.pushData, 'score' + data.ordinal, 0)
        this.$set(this.monthSum, data.month, this.monthSum[data.month] + 1)
        data.score = false
        if (data.type === 1) {
          _listData.movement.push(data)
        } else if (data.type === 2) {
          _listData.sports.push(data)
        } else if (data.type === 3) {
          _listData.action.push(data)
        } else if (data.type === 4) {
          _listData.adapt.push(data)
        } else if (data.type === 5) {
          _listData.social.push(data)
        }
      },
      /**
       *  预览
       */
      preview() {
        if (this.scoreAnswer()) {
          this.dialogVisible = true
        }
      },
      _ifAnswer() {
        /* let _index = 0
        for (const key in this.monthSum) {
          if (parseInt(key) > parseInt(this.temMonthAge)) {
            if (this.answerProcess[key] >= this.monthSum[key]) {
              _index++
            }
          }
        }
        if (_index >= 2) {
          this.$notify({
            title: '警告',
            message: '停止答题，自动提交',
            type: 'warning'
          })
          this.saveData()
        }*/
      },
      /**
       * 计算总得分
       */
      scoreAnswer() {
        this.pushData.scoreSport = 0
        this.pushData.scoreAct = 0
        this.pushData.scoreAdapt = 0
        this.pushData.scoreLanguage = 0
        this.pushData.scoreSocial = 0

        this.monthAnswer = 0
        let orderIndex = 0
        // 判断用户连续打完2行
        for (const key in this.monthSum) {
          if (this.answerProcess[key] >= this.monthSum[key]) {
            if (this.monthNum.indexOf(parseInt(key)) - orderIndex === 1) {
              this.monthAnswer = parseInt(key)
            }
            orderIndex = this.monthNum.indexOf(parseInt(key))
          }
        }

        // 判断每个年龄段最高分，连续选择两个月龄段
        const movementAnswer = []
        const sportsAnswer = []
        const actionAnswer = []
        const adaptAnswer = []
        const socialAnswer = []
        for (let i = 0; i < this.monthNum.length; i++) {
          if (this.isTwoMonthAnswer(this.listData[this.monthNum[i]].movement)) {
            movementAnswer.push({ number: i, value: this.monthNum[i] })
          }
          if (this.isTwoMonthAnswer(this.listData[this.monthNum[i]].sports)) {
            sportsAnswer.push({ number: i, value: this.monthNum[i] })
          }
          if (this.isTwoMonthAnswer(this.listData[this.monthNum[i]].action)) {
            actionAnswer.push({ number: i, value: this.monthNum[i] })
          }
          if (this.isTwoMonthAnswer(this.listData[this.monthNum[i]].adapt)) {
            adaptAnswer.push({ number: i, value: this.monthNum[i] })
          }
          if (this.isTwoMonthAnswer(this.listData[this.monthNum[i]].social)) {
            socialAnswer.push({ number: i, value: this.monthNum[i] })
          }
        }
        // 成功，获取当前月龄赋值到每个得分
        const movementMonth = this.isTwoMonth(movementAnswer)
        const sportsMonth = this.isTwoMonth(sportsAnswer)
        const actionMonth = this.isTwoMonth(actionAnswer)
        const adaptMonth = this.isTwoMonth(adaptAnswer)
        const socialMonth = this.isTwoMonth(socialAnswer)
        if (movementMonth === 0) {
          this.$message({ showClose: true, message: '大运动的题目未完成!', type: 'warning' })
          return false
        }
        if (sportsMonth === 0) {
          this.$message({ showClose: true, message: '精细动作的题目未完成!', type: 'warning' })
          return false
        }
        if (actionMonth === 0) {
          this.$message({ showClose: true, message: '适应能力的题目未完成!', type: 'warning' })
          return false
        }
        if (adaptMonth === 0) {
          this.$message({ showClose: true, message: '语言的题目未完成!', type: 'warning' })
          return false
        }
        if (socialMonth === 0) {
          this.$message({ showClose: true, message: '社交行为的题目未完成!', type: 'warning' })
          return false
        }
        this.pushData.scoreSport = movementMonth
        this.pushData.scoreAct = sportsMonth
        this.pushData.scoreAdapt = actionMonth
        this.pushData.scoreLanguage = adaptMonth
        this.pushData.scoreSocial = socialMonth

        // 计算每个年龄段的基础得分
        const movementIndex = this.monthNum.indexOf(movementMonth) + 1
        for (let i = movementIndex; i < this.monthNum.length; i++) {
          this.typeScore(this.listData[this.monthNum[i]].movement)
        }
        const sportsIndex = this.monthNum.indexOf(sportsMonth) + 1
        for (let i = sportsIndex; i < this.monthNum.length; i++) {
          this.typeScore(this.listData[this.monthNum[i]].sports)
        }
        const actionIndex = this.monthNum.indexOf(actionMonth) + 1
        for (let i = actionIndex; i < this.monthNum.length; i++) {
          this.typeScore(this.listData[this.monthNum[i]].action)
        }
        const adaptIndex = this.monthNum.indexOf(adaptMonth) + 1
        for (let i = adaptIndex; i < this.monthNum.length; i++) {
          this.typeScore(this.listData[this.monthNum[i]].adapt)
        }
        const socialIndex = this.monthNum.indexOf(socialMonth) + 1
        for (let i = socialIndex; i < this.monthNum.length; i++) {
          this.typeScore(this.listData[this.monthNum[i]].social)
        }
        return true
      },
      /**
       * 计算月龄
       * @param data
       * @returns {number}
       */
      isTwoMonth(data) {
        let index = 0
        let month = 0
        let minStatus = true
        if (data.length >= 2) {
          for (const i in data) {
            if ((index - data[i].number) === -1) {
              // 按照当前月龄，不是实际月龄 > 月龄  否则 获取最大的
              if (this.temMonthAge > data[i].value) {
                month = data[i].value
                minStatus = false
              } else if (minStatus) {
                month = data[i].value
              }
            }
            index = data[i].number
          }
        }
        return month
      },
      /**
       * 判断用户每个月龄是否都答题
       * @param data
       * @returns {boolean}
       */
      isTwoMonthAnswer(data) {
        let index = 0
        for (let i = 0; i < data.length; i++) {
          if (data[i].score) {
            index++
          }
        }
        return index === data.length
      },
      /**
       * 获取每道题的基础得分
       * @param data
       */
      typeScore(data) {
        for (let i = 0; i < data.length; i++) {
          if (data[i].score) {
            const score = parseFloat(data[i].extend1)
            const type = parseInt(data[i].type)
            if (type === 1) {
              this.pushData.scoreSport += score
            } else if (type === 2) {
              this.pushData.scoreAct += score
            } else if (type === 3) {
              this.pushData.scoreAdapt += score
            } else if (type === 4) {
              this.pushData.scoreLanguage += score
            } else if (type === 5) {
              this.pushData.scoreSocial += score
            }
          }
        }
      },
      /**
       * 是否有答题
       * @returns {boolean}
       */
      questionsNumber() {
        let index = 0
        for (const key in this.monthSum) {
          if (this.answerProcess[key] >= this.monthSum[key]) {
            index++
          }
        }
        return index >= 2
      },
      /**
       * 预提交 计算最后得分点
       * @returns {boolean}
       */
      handleCreateSave() {
        if (!this.scoreAnswer()) {
          return false
        }
        this.score = this.pushData.scoreAct + this.pushData.scoreAdapt + this.pushData.scoreLanguage + this.pushData.scoreSocial + this.pushData.scoreSport
        this.pushData.dq = this.score / this.typeSum
        this.pushData.growth = (this.pushData.dq / parseInt(this.info.monthAge)) * 100
        this.$confirm('确定保存本测评?', '', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.saveData()
        }).catch(() => {

        })
      },
      /**
       * 提交数据
       */
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
      /**
       * 跳转页面
       * @param id
       */
      goPage(id) {
        this.$router.push({ path: '/report/index', query: { id: id, testId: this.testId }})
      }
    },
    destroyed() { // 离开该页面需要移除这个监听的事件
      window.removeEventListener('scroll', this.handleScroll)
    }
  }

</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.other .el-input{
		width: 70% !important;
		margin-left: 10px !important;
	}
  .report {
    &-container {
      background-color: #e3f2f8;
      margin-top: -3%;
    }
    &-medical {
      padding: 4% 5% 0 5%;
    }
    &-title {
      text-align: center;
      font-size: 20px;
      font-weight: 600;
    }
    &-button {
      float: right;
      margin-top: 4%;
    }
  }

  .evaluation {
    &-container {
      background-color: #e3f2f8;
      margin-top: -3%;
    }
    &-medical {
      padding: 4% 5% 0 5%;
    }
    &-button {
      margin-top: 4%;
      &-left {
        float: left;
      }
      &-right {
        float: right;
      }
    }
  }

  .filter {
    &-container {
      width: 100%;
      background-color: #fff;
      margin-top: 2%;
      border-radius: 10px;
      &-radio {
        margin-left: 5%;
      }
      &-a {
        padding-left: 5%;
      }
      &-jokes {
        line-height: 30px;
        padding: 2%;
      }
    }
    &-medical {
      padding: 0 5% 10% 5%;
      min-height: 445px;
    }
    &-results {
      padding-top: 2%;
    }
    &-info {
      padding-top: 5%;
      height: 200px;
      background-size: cover;
      background-repeat: no-repeat;
      background-position-y: bottom;
      width: 100%;
      z-index: -10;
      zoom: 1;
      &-basic {
        margin-top: -2%;
        width: 98%;
        min-width: 660px;
      }
      &-line {
        height: 1px;
        background-color: #9ec3d061;
        margin: 15px 5px;
      }
    }
    &-avatarFrame {
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
    &-avatar {
      width: 120%;
      height: 117%;
      margin-left: -10%;
      margin-top: -16%;
    }
    &-text {
      text-align: center;
      font-size: 20px;
      background-color: #f5f5f5;
      color: #4f4f4f;
      line-height: 60px;
    }
    &-chart {
      padding: 5%;
      &-text {
        text-align: center;
        font-size: 20px;
        background-color: #f5f5f5;
        color: #4f4f4f;
        line-height: 60px;
      }
    }
    &-tips {
      font-size: 18px;
      color: #4f4f4f;
      padding-bottom: 1%;
    }
    &-row {
      margin-bottom: 4%;
    }
    &-card {
      &-container {
        background: linear-gradient(to right, white, #f5f5f5);
      }
      &-text {
        padding: 16px;
        text-align: center;
        height: 80px;
        line-height: 25px;
      }
      &-image {
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
    z-index: -10;
    zoom: 1;
  }

  .answer {
    &-a {
      color: #8da0ca;
    }
  }

  .aRed {
    color: #c96c71;
  }

</style>
