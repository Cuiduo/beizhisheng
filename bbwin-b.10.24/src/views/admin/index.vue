<template >
  <div style="padding:30px;">
    <el-row>
      <el-col :span="24">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>修改首页Logo</span>
          </div>
          <el-col :span="14">
            <div class="text item">
              <img :src="logo" width="80%" height="200px">
            </div>
          </el-col>
          <el-col :span="10">
            <el-upload class="upload-demo" drag action="http://saysocool.s1.natapp.cc/api/manage/setLogo" multiple
                       :data="upLoadData" :headers="fileHeaders" :on-success="setLogo" :before-upload="beforeImgUpload"
                       accept="image/jpeg,.jpg,image/gif,.gif,image/png,.png,image/bmp,.bmp,.jpeg,.JPG,.JPEG,.PBG,.GIF,.BMP,.JPEG">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <br/>
          </el-col>
        </el-card>
      </el-col>

      <el-col :span="24" class="cardTop">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>修改首页Banner</span>
          </div>
          <el-col :span="14">
            <div class="text item">
              <img :src="banner" width="80%" height="200px">
            </div>
          </el-col>
          <el-col :span="10">
            <el-upload class="upload-demo" drag action="http://saysocool.s1.natapp.cc/api/manage/setBanner" multiple
             :data="upLoadData" :headers="fileHeaders" :on-success="setBanner" :before-upload="beforeImgUpload"
             accept="image/jpeg,.jpg,image/gif,.gif,image/png,.png,image/bmp,.bmp,.jpeg,.JPG,.JPEG,.PBG,.GIF,.BMP,.JPEG">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <br/>
          </el-col>
        </el-card>
      </el-col>

      <el-col :span="24" class="cardTop">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>修改内页Logo</span>
          </div>
          <el-col :span="14">
            <div class="text item">
              <img :src="innerLogo" width="80%" height="200px">
            </div>
          </el-col>
          <el-col :span="10">
            <el-upload class="upload-demo" drag action="http://saysocool.s1.natapp.cc/api/manage/setInnerLogo" multiple
                       :data="upLoadData" :headers="fileHeaders" :on-success="setInnerLogo" :before-upload="beforeImgUpload"
                       accept="image/jpeg,.jpg,image/gif,.gif,image/png,.png,image/bmp,.bmp,.jpeg,.JPG,.JPEG,.PBG,.GIF,.BMP,.JPEG">
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
              <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
            <br/>
          </el-col>
        </el-card>
      </el-col>

      <el-col :span="24" class="cardTop">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>修改医院</span>
          </div>
          <div class="text item" style="height: 40px;">
            <span style="line-height: 35px;">单位名称：{{hospitalName}}  </span><el-button style="float: right;" type="primary"  @click="handleCreate">修改单位名称</el-button>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-dialog :title="pushData.dialogTitle" :visible.sync="pushData.dialogFormVisible" :close-on-click-modal="false" :close-on-press-escape="false" append-to-body width="30%">
      <el-form :rules="rules" ref="addEditPopForm" :model="pushData" label-position="right" label-width="100px">
        <el-form-item label="原医院名称">
          {{hospitalName}}
        </el-form-item>
        <el-form-item label="新医院名称" prop="hospitalName">
          <el-input v-model="pushData.hospitalName" property="请输入医院名称"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="pushData.dialogFormVisible = false">取消</el-button>
        <el-button type="primary" @click="handleCreateSave">确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
  import { mapGetters } from 'vuex'
  import { getToken } from '@/utils/auth'
  import { getLogo, getBanner, getHospitalName, setHospitalName, getInnerLogo } from '@/api/admin/index'
  export default {
    data() {
      return {
        rules: {
          hospitalName: [{ required: true, message: '请输入医院名称', trigger: 'blur' }]
        },
        logo: undefined,
        innerLogo: undefined,
        banner: undefined,
        hospitalName: undefined,
        dialogVisible: false,
        upLoadData: {
          hospitalId: 0,
          file: undefined
        },
        pushData: {
          dialogTitle: undefined,
          hospitalId: undefined,
          hospitalName: undefined,
          dialogFormVisible: false
        },
        fileHeaders: { 'token': getToken() }
      }
    },
    created() {
      this.pushData.hospitalId = this.hospitalId
      this.pushDataTmp = Object.assign({}, this.pushData)
      this.getLogo()
      this.getBanner()
      this.getHospitalName()
      this.getInnerLogo()
    },
    computed: {
      ...mapGetters([
        'hospitalId'
      ])
    },
    methods: {
      getLogo() {
        getLogo(this.hospitalId).then(response => {
          this.logo = response.data.imgSrc
        })
      },
      getBanner() {
        getBanner(this.hospitalId).then(response => {
          this.banner = response.data.imgSrc
        })
      },
      getHospitalName() {
        getHospitalName(this.hospitalId).then(response => {
          this.hospitalName = response.data.hospitalName
        })
      },
      getInnerLogo() {
        getInnerLogo(this.hospitalId).then(response => {
          this.innerLogo = response.data.imgSrc
        })
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      },
      handleCreate() {
        this.pushData = Object.assign({}, this.pushDataTmp)
        this.pushData.dialogTitle = '修改密码'
        this.pushData.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['addEditPopForm'].clearValidate()
        })
      },
      handleCreateSave() {
        this.$refs['addEditPopForm'].validate((valid) => {
          if (valid) {
            setHospitalName(this.pushData).then((res) => {
              this.$message({ message: '医院名称修改成功!', type: 'success', duration: 1000,
                onClose: () => {
                  this.pushData.dialogFormVisible = false
                  this.hospitalName = this.pushData.hospitalName
                }
              })
            }).catch(e => {
              console.error(e)
            })
          }
        })
      },
      // 赋值图片参数
      beforeImgUpload(file) {
        this.upLoadData.hospitalId = this.hospitalId
        this.upLoadData.file = file
      },
      setLogo(res) {
        if (res.status === '200') {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.getLogo()
        } else {
          this.$message({
            message: '保存失败,图片太大，请重新上传',
            type: 'warning'
          })
        }
      },
      setBanner(res) {
        if (res.status === '200') {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.getBanner()
        } else {
          this.$message({
            message: '保存失败,图片太大，请重新上传',
            type: 'warning'
          })
        }
      },
      setInnerLogo(res) {
        if (res.status === '200') {
          this.$message({
            message: '保存成功',
            type: 'success'
          })
          this.getInnerLogo()
        } else {
          this.$message({
            message: '保存失败,图片太大，请重新上传',
            type: 'warning'
          })
        }
      }
    }
  }
</script>
<style>
  .cardTop{
      margin-top: 3%;
  }
</style>
