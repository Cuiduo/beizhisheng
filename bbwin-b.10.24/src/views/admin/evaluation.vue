<template >
  <div style="padding:20px;">
    <div class="filter-container">
      <div class="filter-text">测评查询</div>
      <div class="line"></div>
      <el-form :model="searchData" ref="searchData" label-width="80px">
        <div class="record-left">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item prop="dqStart" label="智能DQ值范围">
                <el-input v-model="searchData.dqStart" placeholder="请输入" clearable @keyup.enter.native="fetchData"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="dqEnd" label="至">
                <el-input v-model="searchData.dqEnd" placeholder="请输入" clearable @keyup.enter.native="fetchData"></el-input>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="20">

            <el-col :span="12">
              <el-form-item prop="dqRange" label="智能DQ评级">
                <el-select v-model="searchData.dqRange" placeholder="请选择" style="width: 100%">
                  <el-option label="全部" value="0"></el-option>
                  <el-option label="优秀" value="1"></el-option>
                  <el-option label="聪明" value="2"></el-option>
                  <el-option label="正常" value="3"></el-option>
                  <el-option label="偏低" value="4"></el-option>
                  <el-option label="低下" value="5"></el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item prop="babySex" label="小儿性别">
                <el-select v-model="searchData.babySex" placeholder="请选择" style="width: 100%">
                  <el-option label="全部" value="-1"></el-option>
                  <el-option label="男" value="1"></el-option>
                  <el-option label="女" value="0"></el-option>
                </el-select>
              </el-form-item>
            </el-col>

          </el-row>

          <el-row :gutter="20">


            <el-col :span="24">
            <el-form-item prop="dateAdd" label="小儿生日">
              <el-date-picker
                v-model="searchData.dateAdd"
                type="daterange"
                align="right"
                unlink-panels  value-format="yyyy-MM-dd"
                @change="handleDateAdd"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions" style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          </el-row>
            <el-row :gutter="20">
            <el-col :span="24">
            <el-form-item prop="dateUpdate" label="检查日期">
              <el-date-picker
                v-model="searchData.dateUpdate"
                type="daterange"
                align="right"
                unlink-panels  value-format="yyyy-MM-dd"
                @change="handleDateUpdate"
                range-separator="至"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions" style="width: 100%">
              </el-date-picker>
            </el-form-item>
          </el-col>
          </el-row>
          <el-row>
            <el-col :span="24">
              <el-button style="float: right;margin-left: 2%;" type="primary"  @click="query">查找</el-button>
              <el-button style="float: right;" type="info" plain @click="resetForm('searchData')">重置</el-button>
            </el-col>
          </el-row>
        </div>

      </el-form>
    </div>

    <el-col :span="24" class="cardTop">

      <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" stripe fit highlight-current-row
                empty-text="暂无数据" @selection-change="handleSelectionChange">
        <el-table-column align="center" header-align="center" >
          <template slot-scope="scope">
            <el-row :gutter="20">
              <el-col :span="12" style="text-align: left;font-size: 18px;font-weight: 600;">{{scope.row.name}}</el-col>
            </el-row>
            <el-row :gutter="20">
              <el-col :span="3">检查时间</el-col>
              <el-col :span="3">{{scope.row.time}}</el-col>
              <el-col :span="2">性别</el-col>
              <el-col :span="1"><span v-if="scope.row.gender===1">男</span><span v-else>女</span></el-col>
              <el-col :span="3">出生日期</el-col>
              <el-col :span="3">{{scope.row.birthday}}</el-col>
              <el-col :span="3">发育商DQ</el-col>
              <el-col :span="3">{{scope.row.growth.toFixed(2)}}</el-col>
              <el-col :span="2"><el-button :class="bigBox"  type="primary" @click="goPage(scope.row.id)">查看报告</el-button></el-col>
            </el-row>

           <!-- {{scope.row.babyBirthday.substr(0,10)}}-->
          </template>
        </el-table-column>
      </el-table>

    </el-col>
  </div>
</template>

<script>
  import { fetchDataList } from '@/api/admin/evaluation'

  export default {
    data() {
      return {
        bigBox:'bigBox',
        pickerOptions: {
          shortcuts: [{
            text: '最近一周',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              picker.$emit('pick', [start, end])
            }
          }, {
            text: '最近三个月',
            onClick(picker) {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              picker.$emit('pick', [start, end])
            }
          }]
        },
        multipleSelection: [],

        searchData: {
          dqStart: undefined,
          dqEnd: undefined,
          dqRange: undefined,
          babySex: undefined,
          birthdayStart: undefined,
          birthdayEnd: undefined,
          checkDayStart: undefined,
          checkDayEnd: undefined,
          dateAdd: '',
          dateUpdate: ''
        },

        list: null,
        listLoading: true
      }
    },
    created() {
      this.pushDataTmp = Object.assign({}, this.searchData)
      this.fetchData()
    },
    methods: {
      handleDateAdd(val) {
        this.searchData.birthdayStart = val ? val[0] : undefined
        this.searchData.birthdayEnd = val ? val[1] : undefined
      },
      handleDateUpdate(val) {
        this.searchData.checkDayStart = val ? val[0] : undefined
        this.searchData.checkDayEnd = val ? val[1] : undefined
      },
      handleSizeChange(val) {
        this.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.page = val
        this.fetchData()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      fetchData() {
        this.list = null
        this.listLoading = true
        fetchDataList(this.page, this.pageSize, this.searchData).then(response => {
          this.list = response.data
          this.listLoading = false
        })
      },
      resetForm(formName) {
        this.pushDataTmp = Object.assign({}, this.searchData)
        this.searchData.birthdayStart = undefined
        this.searchData.birthdayEnd = undefined
        this.searchData.checkDayStart = undefined
        this.searchData.checkDayEnd = undefined
        this.$refs[formName].resetFields()
        this.fetchData()
      },
      query() {
        this.fetchData()
      },
      goPage(id) {
        this.$router.push({ path: '/report/index', query: { id: id, testId: 1 }})
      }
    }
  }
</script>
<style>
  .cardTop{
    margin-top: 3%;
  }
  .bigBox{
     min-width: 90px !important;
     padding: 10px 15px;
  }
</style>
