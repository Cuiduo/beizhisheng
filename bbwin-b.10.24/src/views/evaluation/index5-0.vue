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
              <el-table ref="singleTable" :data="list" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row
                        empty-text="暂无数据" @selection-change="handleSelectionChange" :row-class-name="tableRowClassName">
                <el-table-column prop="ordinal" label="NO." align="center" header-align="center" width="60px"></el-table-column>
                <el-table-column prop="qid" label="项目" align="center" header-align="center" width="100px">
                  <template slot-scope="scope">{{removeChinese(infoType[scope.row.type])}}</template></el-table-column>
                <el-table-column prop="description" label="测试题目" width="600px"></el-table-column>
                <el-table-column label="符合" align="center" header-align="center"><template slot-scope="scope">
                    <p><el-radio v-model="itemRadio[scope.row.ordinal]" label="1" @change="passReasons(scope.row)" class="success_radio">符合</el-radio> </p></template></el-table-column>
                <el-table-column label="不符合" align="center" header-align="center"><template slot-scope="scope">
                    <p><el-radio v-model="itemRadio[scope.row.ordinal]" label="0" @change="passReasons(scope.row)" class="filter_radio">不符合</el-radio></p></template></el-table-column>
                <el-table-column label="儿童回答答案" align="center" header-align="center"><template slot-scope="scope">
                    <el-input type="textarea" placeholder="请输入" :autosize="{ minRows: 2, maxRows: 6 }" @change="handleFailedDataSave($event, scope.row)"></el-input>
                  </template></el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="filter-container filter-container-jokes">&nbsp;&nbsp;&nbsp;公鸡和免子、鸭子、松鼠住在一起，有一天早上，兔子来找公鸡说:“我要上街买萝卜,借一只篮子给我用吧”! 公鸡说:“我自己要用，不借”。 中午，鸭子来找公鸡说:“公鸡哥哥，你嘴巴尖尖的，帮我解一下衣服上的扣子吧!”公鸡说:“我要吃饭了，没有空”。 到了晚上，松鼠米找公鸡说:“我明天早上要上山砍柴，你早一些叫我起床吧”。公鸡说:“我没有力气，不高兴叫”。 过了一天，刮大风、下大雨，把公鸡的屋项掀掉了，  公鸡急得又跳又叫，正在着急的时候，兔子，鸭子，松鼠一起赶来了，帮助公鸡修理屋顶。 没过多久，风停了，雨住了，屋顶也修好了，公鸡看着这一切，脸一下子红了。  </div>
        <div class="evaluation-button">
          <div class="evaluation-button-left"><el-button type="primary" @click="preview">预览</el-button></div>
          <div class="evaluation-button-right"><el-button type="primary" :loading="loading" @click="handleCreateSave">保存</el-button></div>
        </div>
      </div>
    </div>

    <el-dialog
      title="预览"
      :visible.sync="dialogVisible"
      width="30%">
      <el-form class="preview" label-position="right" label-width="55%">
        <el-form-item label="SC：">{{pushData.a1}}</el-form-item>
        <el-form-item label="L：">{{pushData.a2}}</el-form-item>
        <el-form-item label="M：">{{pushData.a3}}</el-form-item>
        <el-form-item label="E：">{{pushData.a4}}</el-form-item>
        <el-form-item label="T：">{{pushData.a5}}</el-form-item>
        <el-form-item label="GK：">{{pushData.a6}}</el-form-item>
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
  import { fetchDataList, recordDetail, saveData, checkType } from '@/api/evaluation5-0'

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
        score: 0,
        typeSum: 6,
        dialogVisible: false,
        clickData: [],
        answerProcess: [],
        infoType: {},
        info: {},
        multipleSelection: [],
        isHighlight: false,
        list: [],
        listLoading: true,
        loading: null,
        title: undefined
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
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row)
      },
      getTitle() {
        for (const i in this.hospitalData) {
          if (this.hospitalData[i].testId === this.testId) {
            this.title = this.hospitalData[i].testName
          }
        }
      },
      removeChinese(strValue) {
        if (strValue != null && strValue !== '') {
          const reg = /[\u4e00-\u9fa5]/g
          const pattern = new RegExp("&mdash;|[`~!@#%$^&*()=+\\|{}':;\",\\[\\].<>/?~！@#￥…&*（）＆×～（）—＋＝＂＜＞，．／＼｛｝＿《》＠—|{}【】‘；：”“'。，、？]", 'g')
          return strValue.replace(reg, '').replace(pattern, '')
        } else { return '' }
      },
      checkType() {
        checkType().then(response => {
          this.infoType = response.data
        })
      },
      passReasons(item) {
        const i = this.answerProcess.indexOf(item.ordinal)
        if (i >= 0) {
          this.answerProcess.splice(i, 1)
        }
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
            this.answerProcess.push(i + 1)
            this.$set(this.pushData, 'desc' + item.ordinal, '')
            this.itemRadio.push('score' + item.ordinal)
          })
          this.listLoading = false
        })
      },
      infoData() {
        recordDetail(this.babyId).then(response => {
          this.info = response.data
          this.avatar = response.data.babyGenderName === 1 ? this.manAvatar : this.womenAvatar
          this.background = response.data.babyGenderName === 1 ? this.manBackground : this.womanBackground
        })
      },
      preview() {
        if (this.answerProcess.length > 0) {
          this.$message({ showClose: true, message: '有题目未完成!', type: 'warning' })
          return false
        }
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
            if (type === 31) {
              this.pushData.a1 += score
            } else if (type === 32) {
              this.pushData.a2 += score
            } else if (type === 33) {
              this.pushData.a3 += score
            } else if (type === 34) {
              this.pushData.a4 += score
            } else if (type === 35) {
              this.pushData.a5 += score
            } else if (type === 36) {
              this.pushData.a6 += score
            }
          }
        }
      },
      tableRowClassName({ row, rowIndex }) {
        if (this.isHighlight) {
          for (const index in this.answerProcess) {
            const i = this.answerProcess.indexOf(this.answerProcess[index])
            if (i >= 0) {
              if (row.ordinal === this.answerProcess[index]) {
                return 'warning-row'
              }
            }
          }
        }
      },
      handleCreateSave() {
        if (this.answerProcess.length > 0) {
          this.isHighlight = true
          this.tableRowClassName
          this.$message({ showClose: true, message: '有题目未完成!', type: 'warning' })
          return false
        }
        this.calculateFractions()
        this.$confirm('确定保存本测评?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
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
        }).catch(() => {

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
        /*min-width: 895px;*/
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
