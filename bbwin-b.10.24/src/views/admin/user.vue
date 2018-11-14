<template >
  <div style="padding:30px;height: 750px;">
    <el-row>
      <el-col :span="24"><el-button style="float: right;" type="primary"  @click="handleCreate">新增用户</el-button></el-col>
    </el-row>
    <el-col :span="24" class="cardTop">

      <el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" stripe fit highlight-current-row
                empty-text="暂无数据" @selection-change="handleSelectionChange">
        <el-table-column prop="name" label="用户姓名" align="center" header-align="center"></el-table-column>
        <el-table-column prop="tel" label="手机号" align="center" header-align="center"></el-table-column>
        <el-table-column label="操作" align="center" header-align="center">
          <template slot-scope="scope">
            <a @click="resetPassword(scope.row.userid)">重置密码</a>
          </template>
        </el-table-column>
        <el-table-column align="center" label="角色" header-align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.authority===1">管理员</span>
            <span v-else>-</span>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center">
          <template slot-scope="scope">
            <span v-if="scope.row.authority===1"><a @click="changeAuthority(scope.row.userid,0)">取消管理</a></span>
            <span v-else><a @click="changeAuthority(scope.row.userid,1)">设为管理员</a></span>
          </template>
        </el-table-column>
        <el-table-column align="center" header-align="center">
          <template slot-scope="scope">
            <a @click="deleteUser(scope.row.userid)">删除用户</a>
          </template>
        </el-table-column>
      </el-table>
    </el-col>

    <el-dialog :title="pushData.dialogTitle" :visible.sync="pushData.dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body width="35%">
      <el-form :rules="rules" ref="addEditPopForm" :model="pushData" label-position="right" label-width="100px">
        <el-form-item label="手机号" prop="tel">
          <el-input v-model="pushData.tel" property="登录用户名"style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="name">
          <el-input v-model="pushData.name" property="请输入姓名"style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="pushData.email" property="请输入邮箱"style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="职位" prop="position">
          <el-input v-model="pushData.position" property="请输入职位"style="width: 300px;"></el-input>
        </el-form-item>
        <el-form-item label="设置为管理员" prop="authority">
          <el-select v-model="pushData.authority" placeholder="请选择"style="width: 300px;">
            <el-option label="否" value="0"></el-option>
            <el-option label="是" value="1"></el-option>
          </el-select>
        </el-form-item>
      </el-form>

        <el-button type="primary" :loading="loading" @click="handleCreateSave">保存</el-button>
    </el-dialog>
  </div>
</template>

<script>
  import { fetchDataList, addUser, resetPwd, changeAuthority, deleteUser } from '@/api/admin/user'

  export default {
    data() {
      return {
        rules: {
          tel: [{ required: true, message: '请输入手机号', trigger: 'blur' }],
          name: [{ required: true, validator: this.validName, message: '请输入姓名', trigger: 'blur' }],
          email: [{ type: 'email', message: '请输入正确的邮箱', trigger: ['blur', 'change'] }]
        },
        multipleSelection: [],
        pushData: {
          dialogTitle: undefined,
          hospitalId: undefined,
          tel: undefined,
          name: undefined,
          email: undefined,
          position: undefined,
          authority: '' + 0,
          dialogFormVisible: false
        },

        list: null,
        listLoading: true
      }
    },
    created() {
      this.pushDataTmp = Object.assign({}, this.pushData)
      this.fetchData()
    },
    methods: {
      validName(rule, value, callback) {
        const reg = /^[\u4e00-\u9fa5_a-zA-Z]{2,20}$/
        if (!value) {
          callback(new Error('请输入正确姓名'))
        } else if (!reg.test(value)) {
          callback(new Error('请输入正确姓名'))
        } else {
          callback()
        }
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      goTest(id) {
        this.$router.push({ path: '/record/view/choose', query: { babyId: id }})
      },
      handleCreate() {
        this.pushData = Object.assign({}, this.pushDataTmp)
        this.pushData.dialogTitle = '修改密码'
        this.pushData.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['addEditPopForm'].clearValidate()
        })
      },
      changeAuthority(userId, val) {
        this.$confirm(`${val === 0 ? '确定取消该用户管理员权限吗？' : '确定将该用户设置为管理员吗?'}`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          changeAuthority(userId).then(() => {
            this.$message({ message: '操作成功!', type: 'success', duration: 1000 })
            this.fetchData()
          })
        }).catch(() => {

        })
      },
      deleteUser(userId) {
        this.$confirm('确定将该用户删除吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          deleteUser(userId).then((response) => {
            this.$message({ message: '删除成功!', type: 'success', duration: 1000 })
            this.fetchData()
          })
        }).catch(() => {

        })
      },
      resetPassword(userId) {
        this.$confirm('确定将该用户密码重置为默认密码吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          resetPwd(userId).then((response) => {
            this.$message({ message: '重置成功!', type: 'success', duration: 1000 })
          })
        }).catch(() => {

        })
      },
      handleCreateSave() {
        this.$refs['addEditPopForm'].validate((valid) => {
          if (valid) {
            addUser(this.pushData).then((response) => {
              this.$message({ message: '添加成功!', type: 'success', duration: 1000,
                onClose: () => {
                  this.fetchData()
                  this.pushData.dialogFormVisible = false
                }
              })
            })
          } else {
            return false
          }
        })
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
<style>
  .cardTop{
    margin-top: 3%;
  }
</style>
