<template>
  <div class="record-container">

    <div class="record-medical">
    </div>

    <div class="appBackground" :style="{backgroundImage: 'url(' + appBackground + ')' }">
      <div class="filter-medical">
        <div class="filter-containerNew">
          <el-row class="tac">
            <el-col :span="4">
              <el-menu default-active="1" class="el-menu-vertical-demo">
                <a href="#/admin/view/index" >
                <el-menu-item index="1">
                  <i class="el-icon-menu"></i>
                  <span slot="title">首页管理</span>
                </el-menu-item>
                </a>
                <a href="#/admin/view/user" >
                <el-menu-item index="2">
                  <i class="el-icon-menu"></i>
                  <span slot="title">用户管理</span>
                </el-menu-item>
                </a>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>病历管理</span>
                  </template>
                  <el-menu-item-group>
                    <a href="#/admin/view/recordSetup" >
                    <el-menu-item index="1-1">病历设置</el-menu-item>
                    </a>
                    <a href="#/admin/view/recordInquiry" >
                    <el-menu-item index="1-2">病历查询</el-menu-item>
                    </a>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>测评管理</span>
                  </template>
                  <el-menu-item-group>
                    <a href="#/admin/view/evaluation" >
                    <el-menu-item index="4-1" style="white-space: pre-wrap;line-height: 30px;height: 60px">小儿神经心理发育测评管理</el-menu-item>
                    </a>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
            <el-col :span="20">
              <router-view></router-view>
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
  import { fetchDataList } from '@/api/record'
  import appBackground from '@/assets/dashboard/background-2.png'

  export default {
    data() {
      return {
        appBackground: appBackground,

        testId: 0,
        title: '最近新建病历',
        searchData: {
          babyName: '',
          birthday: '',
          parentName: '',
          tel: '',
          testId: 0
        },
        multipleSelection: [],
        list: null,
        listLoading: true
      }
    },
    components: {
      Breadcrumb
    },
    name: 'record',
    computed: {
      ...mapGetters([
        'name',
        'roles'
      ])
    },
    created() {
      this.testId = this.$route.query.testId
      this.searchData.testId = this.testId
      this.fetchData()
    },
    methods: {
      handleSelectionChange(val) {
        this.multipleSelection = val
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
      },
      fetchData() {
        this.list = null
        this.listLoading = true
        fetchDataList(this.searchData).then(response => {
          this.list = response.data
          this.listLoading = false
        })
      }
    }
  }
</script>

<style rel="stylesheet/scss" lang="scss" scoped>

  .record{
    &-container{
      background-color: #e3f2f8;
      margin-top: -3%;
    }
    &-medical{
      padding: 4% 5% 0 5%;
    }
    &-button{
      float: right;
      margin-right: 5% !important;
    }
    &-left{
      float: left;
      width: 80%;
    }
    &-right{
      float: right;
      width: 20%;
      margin-top: 2.5%;
    }
  }

  .filter{
    &-container{
      width: 100%;
      height: 280px;
      background-color: #fff;
      margin-top: 5%;
      border-radius: 10px;
      padding: 1%;
    }
    &-medical{
      padding: 0 0% 10% 0%;
      min-height: 445px;
    }
    &-containerNew{
      width: 100%;
      background-color: #fff;
      margin-top: 1%;
      border-radius: 10px;
      padding-top: 2%;
      padding-bottom: 2%;
    }
    &-text{
      text-align: center;
      font-size: 20px;
      color: #4f4f4f;
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
  .el-submenu .el-menu-item{
    min-width: 138px;
  }
</style>
