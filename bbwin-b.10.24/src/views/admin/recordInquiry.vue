<template >
  <div style="padding:30px;height: 750px;">
    <el-row>
      <el-col :span="24"><el-button style="float: right;" type="primary"  @click="goPage">新建病历</el-button></el-col>
    </el-row>
    <div class="filter-container">
      <div class="line"></div>
      <el-form :model="searchData" ref="searchData" label-width="80px">
        <div class="record-left">
          <el-row :gutter="20">
            <!--<el-col :span="10">-->

            <!--</el-col>-->
            <!--<el-col :span="10">-->

            <!--</el-col>-->
            <el-form-item prop="babyName" label="小儿姓名">
              <el-input v-model="searchData.babyName" placeholder="请输入" style="width: 200px;" clearable @keyup.enter.native="fetchData"></el-input>
            </el-form-item>
            <el-form-item prop="birthday" label="出生日期">
              <el-date-picker type="date" placeholder="请选择" v-model="searchData.birthday"  value-format="yyyy-MM-dd" style="width: 200px;" @keyup.enter.native="fetchData"></el-date-picker>
            </el-form-item>


          </el-row>

          <el-row :gutter="20">

            <!--<el-col :span="10">-->

            <!--</el-col>-->
            <!--<el-col :span="10">-->

            <!--</el-col>-->
            <el-form-item prop="tel" label="联系电话">
              <el-input v-model="searchData.tel" placeholder="请输入" style="width: 200px;" clearable @keyup.enter.native="fetchData"></el-input>
            </el-form-item>
            <el-form-item prop="parentName" label="家长姓名">
              <el-input v-model="searchData.parentName" placeholder="请输入" style="width: 200px;" clearable @keyup.enter.native="fetchData"></el-input>
            </el-form-item>

          </el-row>
          <el-row :gutter="20">

            <el-col :span="8">
              <el-button type="info" plain @click="resetForm('searchData')">重置</el-button>
            </el-col>
            <el-col :span="8">
              <el-button type="primary" @click="query">查找</el-button>
            </el-col>
          </el-row>
        </div>

      </el-form>
    </div>

    <el-col :span="24" class="cardTop">

      <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" stripe fit highlight-current-row
                empty-text="暂无数据" @selection-change="handleSelectionChange">
        <el-table-column prop="babyName" label="姓名" align="center" header-align="center"></el-table-column>
        <el-table-column label="性别" align="center" header-align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.babyGender===1">男</span>
            <span v-else>女</span>
          </template>
        </el-table-column>
        <el-table-column label="出生日期" align="center" header-align="center">
          <template slot-scope="scope">
            {{scope.row.babyBirthday.substr(0,10)}}
          </template>
        </el-table-column>
        <el-table-column prop="fatherName" label="父亲姓名" align="center" header-align="center"></el-table-column>
        <el-table-column prop="motherName" label="母亲姓名" align="center" header-align="center"></el-table-column>
        <el-table-column width="250px">
          <template slot-scope="scope">
            <el-button type="info" plain @click="goInfo(scope.row.babyId)">病历详情</el-button>
            <el-button type="primary" @click="goTest(scope.row.babyId)">新建测评</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="page"
        :page-sizes="[10, 20, 50, 100]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="totalRow" style="margin-top:20px;">
      </el-pagination>
    </el-col>
  </div>
</template>

<script>
  import { fetchDataList } from '@/api/admin/recordInquiry'

  export default {
    data() {
      return {
        multipleSelection: [],

        searchData: {
          babyName: '',
          birthday: '',
          parentName: '',
          tel: '',
          testId: 0
        },
        page: 1,
        pageSize: 10,
        totalRow: 0,
        list: null,
        listLoading: true
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
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
          this.list = response.data.result
          this.totalRow = response.data.records
          this.listLoading = false
        })
      },
      goPage(id) {
        if (id > 0) {
          this.$router.push({ path: '/record/view/add', query: { id: id }})
        } else {
          this.$router.push({ path: '/record/view/add' })
        }
      },
      resetForm(formName) {
        this.title = '最近新建病历'
        this.$refs[formName].resetFields()
        this.fetchData()
      },
      goInfo(id) {
        this.$router.push({ path: '/record/info', query: { babyId: id }})
      },
      goTest(id) {
        this.$router.push({ path: '/record/view/choose', query: { babyId: id }})
      },
      query() {
        this.title = '查找结果'
        this.fetchData()
      }
    }
  }
</script>
<style>
  .cardTop{
    margin-top: 3%;
  }
  .el-form-item{
    margin-left: 30px;
    float: left;
  }
</style>
