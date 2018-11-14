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
              <el-table :data="list_11" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row
                        empty-text="暂无数据" @selection-change="handleSelectionChange" class="tab-evaluation3-6">
                <el-table-column prop="description" label="育儿观念"></el-table-column>
                <el-table-column label="得分" align="center" header-align="center" width="300px">
                  <template slot-scope="scope">
                    <el-row>
                      <el-radio-group v-model="itemRadio[scope.row.ordinal]" @change="passReasons(scope.row)">
                        <el-radio-button label="2">A</el-radio-button>
                        <el-radio-button label="1">B</el-radio-button>
                        <el-radio-button label="0">C</el-radio-button>
                      </el-radio-group>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="答题记录" align="center" header-align="center" width="200px">
                  <template slot-scope="scope"><a @click="failReasons(scope.row)" class="answer-a" :class="{ aRed:scope.row.changeRed === scope.row.ordinal}">请选择答案</a></template>
                </el-table-column>
              </el-table>
              <el-table :data="list_12" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row
                        empty-text="暂无数据" @selection-change="handleSelectionChange" class="tab-evaluation3-6">
                <el-table-column prop="description" label="关注和接纳"></el-table-column>
                <el-table-column label="得分" align="center" header-align="center" width="300px">
                  <template slot-scope="scope">
                    <el-row>
                      <el-radio-group v-model="itemRadio[scope.row.ordinal]" @change="passReasons(scope.row)">
                        <el-radio-button label="2">A</el-radio-button>
                        <el-radio-button label="1">B</el-radio-button>
                        <el-radio-button label="0">C</el-radio-button>
                      </el-radio-group>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="答题记录" align="center" header-align="center" width="200px">
                  <template slot-scope="scope"><a @click="failReasons(scope.row)" class="answer-a" :class="{ aRed:scope.row.changeRed === scope.row.ordinal}">请选择答案</a></template>
                </el-table-column>
              </el-table>
              <el-table :data="list_13" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row
                        empty-text="暂无数据" @selection-change="handleSelectionChange" class="tab-evaluation3-6">
                <el-table-column prop="description" label="规矩或自我调控能力"></el-table-column>
                <el-table-column label="得分" align="center" header-align="center" width="300px">
                  <template slot-scope="scope">
                    <el-row>
                      <el-radio-group v-model="itemRadio[scope.row.ordinal]" @change="passReasons(scope.row)">
                        <el-radio-button label="2">A</el-radio-button>
                        <el-radio-button label="1">B</el-radio-button>
                        <el-radio-button label="0">C</el-radio-button>
                      </el-radio-group>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="答题记录" align="center" header-align="center" width="200px">
                  <template slot-scope="scope"><a @click="failReasons(scope.row)" class="answer-a" :class="{ aRed:scope.row.changeRed === scope.row.ordinal}">请选择答案</a></template>
                </el-table-column>
              </el-table>
              <el-table :data="list_14" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row
                        empty-text="暂无数据" @selection-change="handleSelectionChange" class="tab-evaluation3-6">
                <el-table-column prop="description" label="养育关系和沟通"></el-table-column>
                <el-table-column label="得分" align="center" header-align="center" width="300px">
                  <template slot-scope="scope">
                    <el-row>
                      <el-radio-group v-model="itemRadio[scope.row.ordinal]" @change="passReasons(scope.row)">
                        <el-radio-button label="2">A</el-radio-button>
                        <el-radio-button label="1">B</el-radio-button>
                        <el-radio-button label="0">C</el-radio-button>
                      </el-radio-group>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="答题记录" align="center" header-align="center" width="200px">
                  <template slot-scope="scope"><a @click="failReasons(scope.row)" class="answer-a" :class="{ aRed:scope.row.changeRed === scope.row.ordinal}">请选择答案</a></template>
                </el-table-column>
              </el-table>
              <el-table :data="list_15" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row
                                   empty-text="暂无数据" @selection-change="handleSelectionChange" class="tab-evaluation3-6">
              <el-table-column prop="description" label="学习环境"></el-table-column>
              <el-table-column label="得分" align="center" header-align="center" width="300px">
                <template slot-scope="scope">
                  <el-row>
                    <el-radio-group v-model="itemRadio[scope.row.ordinal]" @change="passReasons(scope.row)">
                      <el-radio-button label="2">A</el-radio-button>
                      <el-radio-button label="1">B</el-radio-button>
                      <el-radio-button label="0">C</el-radio-button>
                    </el-radio-group>
                  </el-row>
                </template>
              </el-table-column>
              <el-table-column label="答题记录" align="center" header-align="center" width="200px">
                <template slot-scope="scope"><a @click="failReasons(scope.row)" class="answer-a" :class="{ aRed:scope.row.changeRed === scope.row.ordinal}">请选择答案</a></template>
              </el-table-column>
            </el-table>
              <el-table :data="list_16" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row
                        empty-text="暂无数据" @selection-change="handleSelectionChange" class="tab-evaluation3-6">
                <el-table-column prop="description" label="语言环境"></el-table-column>
                <el-table-column label="得分" align="center" header-align="center" width="300px">
                  <template slot-scope="scope">
                    <el-row>
                      <el-radio-group v-model="itemRadio[scope.row.ordinal]" @change="passReasons(scope.row)">
                        <el-radio-button label="2">A</el-radio-button>
                        <el-radio-button label="1">B</el-radio-button>
                        <el-radio-button label="0">C</el-radio-button>
                      </el-radio-group>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="答题记录" align="center" header-align="center" width="200px">
                  <template slot-scope="scope"><a @click="failReasons(scope.row)" class="answer-a" :class="{ aRed:scope.row.changeRed === scope.row.ordinal}">请选择答案</a></template>
                </el-table-column>
              </el-table>
              <el-table :data="list_17" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row
                        empty-text="暂无数据" @selection-change="handleSelectionChange" class="tab-evaluation3-6">
                <el-table-column prop="description" label="玩耍和娱乐"></el-table-column>
                <el-table-column label="得分" align="center" header-align="center" width="300px">
                  <template slot-scope="scope">
                    <el-row>
                      <el-radio-group v-model="itemRadio[scope.row.ordinal]" @change="passReasons(scope.row)">
                        <el-radio-button label="2">A</el-radio-button>
                        <el-radio-button label="1">B</el-radio-button>
                        <el-radio-button label="0">C</el-radio-button>
                      </el-radio-group>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="答题记录" align="center" header-align="center" width="200px">
                  <template slot-scope="scope"><a @click="failReasons(scope.row)" class="answer-a" :class="{ aRed:scope.row.changeRed === scope.row.ordinal}">请选择答案</a></template>
                </el-table-column>
              </el-table>
              <el-table :data="list_18" v-loading.body="listLoading" element-loading-text="Loading" border fit highlight-current-row
                        empty-text="暂无数据" @selection-change="handleSelectionChange" class="tab-evaluation3-6">
                <el-table-column prop="description" label="安全和居住环境"></el-table-column>
                <el-table-column label="得分" align="center" header-align="center" width="300px">
                  <template slot-scope="scope">
                    <el-row>
                      <el-radio-group v-model="itemRadio[scope.row.ordinal]" @change="passReasons(scope.row)">
                        <el-radio-button label="2">A</el-radio-button>
                        <el-radio-button label="1">B</el-radio-button>
                        <el-radio-button label="0">C</el-radio-button>
                      </el-radio-group>
                    </el-row>
                  </template>
                </el-table-column>
                <el-table-column label="答题记录" align="center" header-align="center" width="200px">
                  <template slot-scope="scope"><a @click="failReasons(scope.row)" class="answer-a" :class="{ aRed:scope.row.changeRed === scope.row.ordinal}">请选择答案</a></template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
        <div class="evaluation-button">
          <div class="evaluation-button-left"><el-button type="primary" @click="preview">预览</el-button></div>
          <div class="evaluation-button-right">
            被访者与儿童的关系：<el-select v-model="pushData.answerRelation" placeholder="请选择" style="width: 200px;">
              <el-option label="爸爸" value="爸爸"></el-option>
              <el-option label="妈妈" value="妈妈"></el-option>
              <el-option label="爷爷" value="爷爷"></el-option>
              <el-option label="奶奶" value="奶奶"></el-option>
              <el-option label="姥爷" value="姥爷"></el-option>
              <el-option label="姥姥" value="姥姥"></el-option>
              <el-option label="叔叔" value="叔叔"></el-option>
              <el-option label="婶婶" value="婶婶"></el-option>
              <el-option label="姑姑" value="姑姑"></el-option>
              <el-option label="姑父" value="姑父"></el-option>
              <el-option label="舅舅" value="舅舅"></el-option>
              <el-option label="舅妈" value="舅妈"></el-option>
              <el-option label="阿姨" value="阿姨"></el-option>
              <el-option label="姨夫" value="姨夫"></el-option>
              <el-option label="哥哥" value="哥哥"></el-option>
              <el-option label="姐姐" value="姐姐"></el-option>
              <el-option label="保姆" value="保姆"></el-option>
            </el-select>
            &nbsp;&nbsp;&nbsp;
            <el-button type="primary" :loading="loading" @click="handleCreateSave">保存</el-button></div>
        </div>
      </div>
    </div>

    <el-dialog :title="temporaryData.dialogTitle" :visible.sync="temporaryData.dialogFormVisible"
               :close-on-click-modal="false" :close-on-press-escape="false" width="40%">

        <el-row :gutter="20">
        <el-col :span="24">
          <el-form ref="addEditPopForm" :model="temporaryData" label-position="left" label-width="100px">
          <el-checkbox-group v-model="temporaryData.failRadio">
            <el-col :span="24">
              <p v-for="(domain,index) in temporaryData.domains" style="padding-bottom: 10%">
                <el-col :span="24">
                  <el-checkbox :label="domain.id">{{domain.test}}</el-checkbox>
                  <el-input ref="domains" :key="domain.key" :prop="'domains.' + index + '.value'"></el-input>
                  <el-input v-if="domain.test==='其他原因'" v-model="temporaryData.otherReasons"></el-input>
                </el-col>
              </p>
            </el-col>
          </el-checkbox-group>
         </el-form>
        </el-col>
        </el-row>
      <span slot="footer" class="dialog-footer">
    <el-button @click="temporaryData.dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFailedDataSave">确 定</el-button>
  </span>
    </el-dialog>

    <el-dialog title="预览" :visible.sync="dialogVisible" width="30%">
      <el-form class="preview" label-position="right" label-width="55%">
        <el-form-item label="育儿观念：">{{pushData.a1}}</el-form-item>
        <el-form-item label="关注和接纳：">{{pushData.a2}}</el-form-item>
        <el-form-item label="规矩或自我调控能力：">{{pushData.a3}}</el-form-item>
        <el-form-item label="养育关系和沟通：">{{pushData.a4}}</el-form-item>
        <el-form-item label="学习环境：">{{pushData.a5}}</el-form-item>
        <el-form-item label="语言环境：">{{pushData.a6}}</el-form-item>
        <el-form-item label="玩耍和娱乐：">{{pushData.a7}}</el-form-item>
        <el-form-item label="安全和居住环境：">{{pushData.a8}}</el-form-item>
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
  import { fetchDataList, recordDetail, saveData } from '@/api/evaluation3-6'

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
          answerRelation: '爸爸',
          a1: 0,
          a2: 0,
          a3: 0,
          a4: 0,
          a5: 0,
          a6: 0,
          a7: 0,
          a8: 0
        },
        temporaryData: {
          dialogTitle: undefined,
          dialogFormVisible: false,
          domains: [{
            value: ''
          }],
          failRadio: [],
          ordinal: undefined,
          otherReasons: undefined,
          otherReasons1: undefined
        },
        score: 0,
        typeSum: 8,
        dialogVisible: false,
        clickData: [],
        answerProcess: [],
        info: {},
        multipleSelection: [],
        list_11: [],
        list_12: [],
        list_13: [],
        list_14: [],
        list_15: [],
        list_16: [],
        list_17: [],
        list_18: [],
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
      passReasons(item) {
        const i = this.answerProcess.indexOf(item.ordinal)
        if (i >= 0) {
          this.answerProcess.splice(i, 1)
        }
      },
      failReasons(item) {
        item.changeRed = item.ordinal
        this.temporaryData.dialogTitle = '请选择答题记录'
        this.temporaryData.dialogFormVisible = true
        this.temporaryData.domains = []
        this.temporaryData.failRadio = []
        this.temporaryData.otherReasons = undefined
        this.temporaryData.otherReasons1 = undefined
        this.temporaryData.ordinal = item.ordinal
        const reasons = item.reasons.split(';')
        const reasonsData = []
        for (const i in reasons) {
          if (reasons[i]) {
            reasonsData.push(reasons[i])
          }
        }
        reasonsData.push('其他原因')
        for (let i = 0; i < reasonsData.length; i++) {
          if (reasonsData[i]) {
            this.addDomain(i, reasonsData[i])
            if (this.$refs['domains']) {
              if (this.$refs['domains'][i]) {
                this.$refs['domains'][i].$data.currentValue = ''
              }
            }
          }
        }
      },
      addDomain(index, reasons) {
        this.temporaryData.domains.push({
          id: index,
          test: reasons
        })
      },
      handleFailedDataSave() {
        const val = this.bubble(this.temporaryData.failRadio)
        let idValue = ''
        let idValue1 = ''
        for (const i in val) {
          idValue += (idValue ? ',' : '') + this.temporaryData.domains[val[i]].test
          idValue1 += (idValue1 ? ',' : '') + this.$refs['domains'][val[i]].$data.currentValue
          if (this.temporaryData.domains[val[i]].test === '其他原因') {
            idValue1 += (idValue1 ? ',' : '') + this.temporaryData.otherReasons
          }
        }
        this.$set(this.pushData, 'reason' + this.temporaryData.ordinal, idValue)
        this.$set(this.pushData, 'desc' + this.temporaryData.ordinal, idValue1)
        this.temporaryData.dialogFormVisible = false
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
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      fetchData() {
        this.listLoading = true
        fetchDataList(this.testId).then(response => {
          this.list = response.data
          this.list.filter((item, i) => {
            this.answerProcess.push(i + 1)
            this.$set(this.pushData, 'reason' + item.ordinal, '')
            this.$set(this.pushData, 'desc' + item.ordinal, '')
            this.itemRadio.push('score' + item.ordinal)
            this.restructuring(item)
          })
          this.listLoading = false
        })
      },
      restructuring(data) {
        if (data.type === 11) {
          this.list_11.push(data)
        } else if (data.type === 12) {
          this.list_12.push(data)
        } else if (data.type === 13) {
          this.list_13.push(data)
        } else if (data.type === 14) {
          this.list_14.push(data)
        } else if (data.type === 15) {
          this.list_15.push(data)
        } else if (data.type === 16) {
          this.list_16.push(data)
        } else if (data.type === 17) {
          this.list_17.push(data)
        } else if (data.type === 18) {
          this.list_18.push(data)
        }
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
        this.pushData.a7 = 0
        this.pushData.a8 = 0
        for (const i in this.list) {
          const score = parseInt(this.itemRadio[this.list[i].ordinal])
          const type = this.list[i].type
          if (score) {
            if (type === 11) {
              this.pushData.a1 += score
            } else if (type === 12) {
              this.pushData.a2 += score
            } else if (type === 13) {
              this.pushData.a3 += score
            } else if (type === 14) {
              this.pushData.a4 += score
            } else if (type === 15) {
              this.pushData.a5 += score
            } else if (type === 16) {
              this.pushData.a6 += score
            } else if (type === 17) {
              this.pushData.a7 += score
            } else if (type === 18) {
              this.pushData.a8 += score
            }
          }
        }
      },
      handleCreateSave() {
        if (this.answerProcess.length > 0) {
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
.el-input{
	margin: 10px 0;
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

  .answer{
    &-a{
      color: #8da0ca;
    }
  }
  .aRed {
    color: #c96c71;
  }
</style>
