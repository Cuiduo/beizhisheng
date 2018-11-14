<template >
  <div style="padding:30px;">
    <el-row :gutter="20">
      <el-col :span="24">
        <el-form :rules="rules" ref="addEditPopForm" :model="pushData" label-position="right" label-width="100px">

          <el-col :span="8">
            <el-form-item label="母亲孕期疾病" prop="authority">
              <el-select v-model="pushData.motherIllness" placeholder="请选择" >
              <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option>
              </el-select>
          </el-form-item>
          </el-col>
          <el-col :span="8"><el-form-item label="胎次" prop="authority"><el-select v-model="pushData.parity" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="孕期" prop="authority"><el-select v-model="pushData.pregnancy" placeholder="请选择">
          <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="分娩方式" prop="authority"><el-select v-model="pushData.delivery" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="窒息" prop="authority"><el-select v-model="pushData.asphyxia" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="新生儿黄疸" prop="authority"><el-select v-model="pushData.jaundice" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="出生体重" prop="authority"><el-select v-model="pushData.birthWeight" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="抽风史" prop="authority"><el-select v-model="pushData.havePumping" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="填表人称呼" prop="authority"><el-select v-model="pushData.familyHistory" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="坐高" prop="authority"><el-select v-model="pushData.illnessHistory" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="胸围" prop="authority"><el-select v-model="pushData.height" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="头围" prop="authority"><el-select v-model="pushData.weight" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="家庭住址" prop="authority"><el-select v-model="pushData.head" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="邮政编码" prop="authority"><el-select v-model="pushData.remarks" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="户口属性" prop="authority"><el-select v-model="pushData.relation" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="小儿血型" prop="authority"><el-select v-model="pushData.address" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="受教育程度" prop="authority"><el-select v-model="pushData.postcode" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="早产天数" prop="authority"><el-select v-model="pushData.account" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="畸形" prop="authority"><el-select v-model="pushData.bloodtype" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="前囟" prop="authority"><el-select v-model="pushData.education" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="是否独生子女" prop="authority"><el-select v-model="pushData.preDelivery" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="家族病史" prop="authority"><el-select v-model="pushData.deformity" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="重要病史" prop="authority"><el-select v-model="pushData.frontalSuture" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="来诊原因" prop="authority"><el-select v-model="pushData.onlyChild" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="母亲生产年龄" prop="authority"><el-select v-model="pushData.reason" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="家庭婚姻状况" prop="authority"><el-select v-model="pushData.overview" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="家长对小儿评价" prop="authority"><el-select v-model="pushData.motherBirthage" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="测查小儿概述" prop="authority"><el-select v-model="pushData.marriage" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="初步诊断" prop="authority"><el-select v-model="pushData.sit" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="备注" prop="authority"><el-select v-model="pushData.bust" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
          <el-col :span="8"><el-form-item label="身高/体重/BMI" prop="authority" ><el-select v-model="pushData.bmi" placeholder="请选择">
            <el-option label="隐藏" value="0"></el-option><el-option label="显示" value="1"></el-option></el-select></el-form-item></el-col>
        </el-form>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24"><el-button style="float: right;" type="primary"  @click="handleCreateSave">保存</el-button></el-col>
    </el-row>
  </div>
</template>
<script>
  import { setRecordDetail } from '@/api/admin/recordSetup'

  export default {
    data() {
      return {
        rules: {},
        multipleSelection: [],
        pushData: {
          motherIllness: '' + 0,
          parity: '' + 0,
          pregnancy: '' + 0,
          delivery: '' + 0,
          asphyxia: '' + 0,
          jaundice: '' + 0,
          birthWeight: '' + 0,
          havePumping: '' + 0,
          familyHistory: '' + 0,
          illnessHistory: '' + 0,
          height: '' + 0,
          weight: '' + 0,
          head: '' + 0,
          remarks: '' + 0,
          relation: '' + 0,
          address: '' + 0,
          postcode: '' + 0,
          account: '' + 0,
          bloodtype: '' + 0,
          education: '' + 0,
          preDelivery: '' + 0,
          deformity: '' + 0,
          frontalSuture: '' + 0,
          onlyChild: '' + 0,
          reason: '' + 0,
          evaluation: '' + 0,
          overview: '' + 0,
          motherBirthage: '' + 0,
          marriage: '' + 0,
          sit: '' + 0,
          bust: '' + 0,
          bmi: '' + 0
        },

        list: null,
        listLoading: true
      }
    },
    created() {
      this.pushDataTmp = Object.assign({}, this.pushData)
    },
    methods: {
      handleCreateSave() {
        this.$refs['addEditPopForm'].validate((valid) => {
          if (valid) {
            setRecordDetail(this.pushData).then((response) => {
              this.$message({ message: '操作成功!', type: 'success', duration: 1000 })
            })
          } else {
            return false
          }
        })
      }
    }
  }
</script>
<style>
  .cardTop{
    margin-top: 3%;
  }
  .el-select{
    min-width: 75px;
  }

</style>

