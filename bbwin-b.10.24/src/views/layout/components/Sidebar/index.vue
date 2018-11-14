<template>
  <el-scrollbar wrapClass="scrollbar-wrapper">
  <el-header class="header" height="70px">
    <el-row :gutter="20">
      <!--<el-col :offset="1" :span="2" class="header-text">

      </el-col>-->
      <el-col :offset="1" :span="10" class="header-logoText" style="display: -webkit-inline-box;">
        <div class="header-text">{{hospitalName}}</div>
        <el-menu mode="horizontal" default-active="1" background-color="#2a8bc9" text-color="#ffffff">
          <el-menu-item index="1"><a href="#/dashboard">首页</a></el-menu-item>
          <el-menu-item index="2" ><a href="#/record/index">病历管理</a></el-menu-item>
          <el-menu-item index="3" v-if="this.roles===1"><a href="#/admin/view/index">系统管理</a></el-menu-item>
        </el-menu>
      </el-col>
      <el-col :span="10" style="float: right;">
        <div style="float: right;min-width: 350px;">
          <el-menu mode="horizontal" background-color="#2a8bc9" text-color="#ffffff">
            <el-menu-item index="4"><svg-icon icon-class="account" /><span slot="title">{{name}}</span></el-menu-item>
            <el-menu-item index="5" @click="handleCreate"><svg-icon icon-class="updatePw"/><span slot="title">修改密码</span></el-menu-item>
            <el-menu-item index="6"  @click="logout">
              <svg-icon icon-class="logout" />
              <span slot="title">退出登录</span></el-menu-item>
          </el-menu>
        </div>
      </el-col>
    </el-row>
  </el-header>

    <el-dialog :title="pushData.dialogTitle" :visible.sync="pushData.dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body width="40%">
      <el-form :rules="rules" ref="addEditPopForm" :model="pushData" label-position="left" label-width="100px">
        <el-form-item label="原密码" prop="oldPwd">
          <el-input v-model="pushData.oldPwd"></el-input>
        </el-form-item>
        <el-form-item label="新密码" prop="newPwd">
          <el-input type="password" v-model="pushData.newPwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认新密码" prop="checkPass">
          <el-input type="password" v-model="pushData.checkPass" auto-complete="off"></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pushData.dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreateSave">确定</el-button>
      </div>
    </el-dialog>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'
import logo from '@/assets/logo/logo.png'
import { changePwd, getInnerLogo } from '@/api/login'

export default {
  data() {
    return {
      logo: undefined,
      pushData: {
        dialogTitle: undefined,
        dialogFormVisible: false,

        oldPwd: undefined,
        newPwd: undefined,
        checkPass: undefined
      },
      rules: {
        oldPwd: [{ required: true, message: '请输入原密码', trigger: 'blur' }],
        newPwd: [{ required: true, message: '请输入新密码', trigger: 'blur' }],
        checkPass: [{ required: true, validator: this.validatePass2, trigger: 'blur' }]
      }
    }
  },
  components: { SidebarItem },
  computed: {
    ...mapGetters([
      'name',
      'hospitalName',
      'roles',
      'hospitalData',
      'hospitalId'
    ]),
    routes() {
      return this.$router.options.routes
    },
    isCollapse() {
      return !this.sidebar.opened
    }
  },
  created() {
    this.pushDataTmp = Object.assign({}, this.pushData)
    this.getInnerLogo()
  },
  methods: {
    validatePass2(rule, value, callback) {
      if (value === '') {
        callback(new Error('请输入新密码'))
      } else if (value !== this.pushData.newPwd) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    },
    handleCreate() {
      this.pushData = Object.assign({}, this.pushDataTmp)
      this.pushData.dialogTitle = '修改密码'
      this.pushData.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs['addEditPopForm'].clearValidate()
      })
    },
    // 保存
    handleCreateSave() {
      this.$refs['addEditPopForm'].validate((valid) => {
        if (valid) {
          changePwd(this.pushData.oldPwd, this.pushData.newPwd).then((res) => {
            this.$message({ message: '密码修改成功!', type: 'success', duration: 1000,
              onClose: () => {
                this.pushData.dialogFormVisible = false
              }
            })
          }).catch(e => {
            console.error(e)
          })
        }
      })
    },
    getInnerLogo() {
      getInnerLogo(this.hospitalId).then(response => {
        this.logo = response.data.imgSrc || logo
      })
    },
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload() // 为了重新实例化vue-router对象 避免bug;
        // let keys = document.cookie.match(/[^ =;]+(?=\=)/g);
				// if(keys) {
				// 	for(var i = keys.length; i--;)
				// 		document.cookie = keys[i] + '=0;expires=' + new Date(0).toUTCString()
				// }
      })
    }
  }
}
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .header{
    z-index: 100;
    width: 100%;
    background-color:#2a8bc9;
  }
  .el-menu{
    margin-top: 5px;
  }
  .el-menu--horizontal {
    border-right: none;
    border-bottom: none;
  }
	.el-menu-item:nth-of-type(1):hover{
		background: rgb(42, 139, 201) !important;
	}
  .header{
    &-logo{
      background-color: #fff;
      width:130px;height:130px;
      border-radius:50%;
      margin-top: -30px;
      text-align: center;
      border:1px solid #eceff0;
      box-shadow: #a8b2b9 6px 0 30px -12px;
    }
    &-logoImg{
      background-color: #fff;
      width: 102%;
      height: 100%;
      margin-left: -1px;
      border-radius: 50%;
      overflow: hidden;
    }
    &-logoText{
      padding-left: 0 !important;
      padding-right: 0 !important;
    }
    &-text{
      font-size: 20px;
      line-height: 70px;
      color: #ffffff;
      padding-right: 2%;
    }
  }
</style>
