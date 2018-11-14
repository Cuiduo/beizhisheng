<template>
  <div class="record-container">

    <div class="record-medical">
      <el-row :gutter="20">
        <el-col :span="24"><breadcrumb></breadcrumb></el-col>
      </el-row>
    </div>

		<div class="appBackground" :style="{backgroundImage: 'url(' + appBackground + ')' }">
			<div class="filter-medical">
				<div class="filter-container">
					<el-form :model="pushData" :rules="rules" ref="addEditPopForm" :label-position="labelPosition" label-width="74px">
						<div class="filter-text" style="font-weight: 600;">小儿详细资料</div>
						<div class="line"></div>
						<div class="filter-tips">必填内容</div>
						<el-row>
							<el-col :span="6">
								<el-form-item label-width="90px" prop="baby.name" label="小儿姓名:">
									<el-input v-model="pushData.baby.name" placeholder="请输入" style="width: 90%;"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label-width="90px" prop="baby.gender" :label="sexs">
									<el-select v-model="pushData.baby.gender" placeholder="请选择" style="width: 90%;">
										<el-option label="男" value="1"></el-option>
										<el-option label="女" value="0"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label-width="90px" prop="baby.nation" label="民族:">
									<el-select v-model="pushData.baby.nation" placeholder="请选择" style="width: 90%;">
										<el-option label="汉族" value="汉族"></el-option>
										<el-option label="满族" value="满族"></el-option>
										<el-option label="蒙族" value="蒙族"></el-option>
										<el-option label="回族" value="回族"></el-option>
										<el-option label="其他" value="其他"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label-width="90px" prop="baby.birthday" label="出生日期:">
									<el-date-picker type="date" placeholder="请选择" v-model="pushData.baby.birthday" value-format="yyyy-MM-dd HH:mm:ss" :picker-options="ofToday" style="width: 100%;"></el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="6">
								<el-form-item label-width="90px" prop="father.name" label="家长姓名:">
									<el-input v-model="pushData.father.name" placeholder="请输入" style="width: 90%;" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label-width="90px" prop="father.tel" label="手机号:">
									<el-input v-model="pushData.father.tel" placeholder="父亲手机号" style="width: 90%;" clearable></el-input>
								</el-form-item>
							</el-col>
							<!-- <el-col :span="6">
								<el-form-item prop="mother.name" label="母亲姓名:">
									<el-input v-model="pushData.mother.name" placeholder="请输入" style="width: 90%;" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item prop="mother.tel" label="手机号:">
									<el-input v-model="pushData.mother.tel" placeholder="母亲手机号" style="width: 100%;" clearable></el-input>
								</el-form-item>
							</el-col> -->
						</el-row>
						<div class="line"></div>
						<div class="filter-tips">其他信息</div>
						<el-row>
							<!-- <el-col :span="6">
								<el-form-item label="父亲职业:">
									<el-select v-model="pushData.father.career" placeholder="请选择" style="width: 80%;">
										<el-option v-for="item in career" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="文化程度:">
									<el-select v-model="pushData.father.education" placeholder="请选择" style="width: 80%;">
										<el-option v-for="item in education" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :class="lineHeight" label="工作时长:(每天)">
									<el-select v-model="pushData.father.worktime" placeholder="请选择" style="width: 80%;">
										<el-option v-for="item in workTime" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item prop="father.birth" label="父亲生日:">
									<el-date-picker type="date" placeholder="请选择" v-model="pushData.father.birth" :picker-options="ofToday" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
								</el-form-item>
							</el-col> -->
						</el-row>
						<el-row>
							<el-col :span="6">
								<el-form-item prop="father.email" label="家长邮箱:">
									<el-input v-model="pushData.father.email" placeholder="请输入" style="width: 80%;" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item prop="mother.name" label="新增家长:">
									<el-input  v-model="pushData.mother.name" placeholder="请输入" style="width: 80%;" clearable></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="8">
								<el-form-item label-width="90px"  prop="mother.tel" label="新增手机号:">
									<el-input v-model="pushData.mother.tel" placeholder="请输入" style="width: 80%;" clearable></el-input>
								</el-form-item>
							</el-col>
						</el-row>
						<!-- <div class="line-dashed"></div> -->
						<!-- <el-row>
							<el-col :span="6">
								<el-form-item label="母亲职业:">
									<el-select v-model="pushData.mother.career" placeholder="请选择" style="width: 80%;">
										<el-option v-for="item in career" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item label="文化程度:">
									<el-select v-model="pushData.mother.education" placeholder="请选择" style="width: 80%;">
										<el-option v-for="item in education" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item :class="lineHeight" label="工作时长:(每天)">
									<el-select v-model="pushData.mother.worktime" placeholder="请选择" style="width: 80%;">
										<el-option v-for="item in workTime" :key="item.value" :label="item.label" :value="item.value"></el-option>
									</el-select>
								</el-form-item>
							</el-col>
							<el-col :span="6">
								<el-form-item prop="mother.birth" label="母亲生日:">
									<el-date-picker type="date" placeholder="请选择" v-model="pushData.mother.birth" :picker-options="ofToday" value-format="yyyy-MM-dd HH:mm:ss" style="width: 100%;"></el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>
						<el-row>
							<el-col :span="6">
								<el-form-item prop="mother.email" label="邮箱:">
									<el-input v-model="pushData.mother.email" placeholder="请输入" style="width: 80%;" clearable></el-input>
								</el-form-item>
							</el-col>
						</el-row> -->
						<!-- <div class="line"></div> -->
						<el-form-item prop="userid" label="提交医生:">
							<el-select v-if="roles==1" v-model="pushData.baby.userid" placeholder="请选择" style="width: 80%;">
								<el-option v-for="item in submitDoctor" :key="item.value" :label="item.label" :value="item.value"></el-option>
							</el-select>
							<el-input v-else  style="width: 80%;" :disabled="true" v-model="name"></el-input>
						</el-form-item>
					</el-form>
				</div>
				<el-row :gutter="20" class="record-button">
					<el-col :span="24">
						<el-button type="primary" :loading="loading" @click="handleCreateSave">下一步</el-button>
					</el-col>
				</el-row>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters } from 'vuex'
	import Breadcrumb from '@/components/Breadcrumb'
	import { saveData, getUserList } from '@/api/recordAdd'
	import appBackground from '@/assets/dashboard/background-2.png'
	import Cookies from 'js-cookie'
	export default {
	  data() {
	    return {
	      labelPosition: 'right',
	      appBackground: appBackground,
	      loading: false,
				lineHeight: 'lineHeight',
	      sexs: '性别:',
	      userId: '',
	      // 表单验证
	      rules: {
	        'baby.name': [{
						required: true,
	          validator: this.validName,
	          message: '请输入正确的小儿姓名',
	          trigger: 'blur'
	        }],
	        'baby.gender': [{
						required: true,
	          message: '请选择性别',
	          trigger: 'change'
	        }],
	        'baby.nation': [{
						required: true,
	          message: '请选择民族',
	          trigger: 'change'
	        }],
	        'baby.birthday': [{
						required: true,
	          message: '请选择出生日期',
	          trigger: 'change'
	        }],
	        'father.name': [{
						required: true,
	          validator: this.validName,
	          message: '请输入正确的姓名',
	          trigger: 'blur'
	        }],
	        'father.tel': [{
						required: true,
	          validator: this.validPhone,
	          message: '请输入正确的11位父亲手机号',
	          trigger: 'blur'
	        }],
	        'father.email': [{
	          type: 'email',
	          message: '请输入正确的邮箱',
	          trigger: ['blur', 'change']
	        }],
	        'father.birth': [{
	          validator: this.validBirth,
	          message: '请输入正确的生日',
	          trigger: 'blur'
	        }],
	        'mother.name': [{
	          validator: this.validName2,
	          message: '请输入正确的姓名',
	          trigger: ['blur']
	        }],
	        'mother.tel': [{
	          validator: this.validPhone2,
	          message: '',
	          trigger: ['change']
	        }],
	        'mother.email': [{
	          type: 'email',
	          message: '请输入正确的母亲邮箱',
	          trigger: ['blur', 'change']
	        }],
	        'mother.birth': [{
	          validator: this.validBirth,
	          message: '请输入正确的母亲生日',
	          trigger: 'blur'
	        }]
	      },
	      ofToday: {
	        disabledDate(time) {
	          return time.getTime() > Date.now()
	        }
	      },
	      career: [{
	        value: '金融业',
	        label: '金融业'
	      },
	      {
	        value: '服务业',
	        label: '服务业'
	      },
	      {
	        value: '信息产业',
	        label: '信息产业'
	      },
	      {
	        value: '制造业',
	        label: '制造业'
	      },
	      {
	        value: '传播业',
	        label: '传播业'
	      },
	      {
	        value: '教育',
	        label: '教育'
	      },
	      {
	        value: '政府机构',
	        label: '政府机构'
	      },
	      {
	        value: '医疗保健',
	        label: '医疗保健'
	      },
	      {
	        value: '其他',
	        label: '其他'
	      }
	      ],
	      education: [{
	        value: '博士',
	        label: '博士'
	      },
	      {
	        value: '硕士',
	        label: '硕士'
	      },
	      {
	        value: '本科',
	        label: '本科'
	      },
	      {
	        value: '专科',
	        label: '专科'
	      },
	      {
	        value: '高中',
	        label: '高中'
	      },
	      {
	        value: '初中',
	        label: '初中'
	      },
	      {
	        value: '小学',
	        label: '小学'
	      },
	      {
	        value: '其他',
	        label: '其他'
	      }
	      ],
	      workTime: [],
	      submitDoctor: [],
	      pushData: {
	        baby: {
	          gender: '1',
	          name: undefined,
	          userid: undefined, // 提交医生
	          nation: '汉族',
	          relation: undefined,
	          bloodtype: undefined,
	          postcode: undefined,
	          account: undefined,
	          province: undefined,
	          city: undefined,
	          address: undefined,
	          birthday: undefined
	        },
	        father: {
	          name: undefined,
	          career: undefined,
	          tel: undefined,
	          education: undefined,
	          worktime: undefined,
	          email: undefined,
	          birth: undefined

	        },
	        mother: {
	          name: undefined,
	          career: undefined,
	          tel: undefined,
	          education: undefined,
	          worktime: undefined,
	          email: undefined,
	          birth: undefined
	        }
				},
				pushData2:'',
				postdata:'',
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
      //	      'userId'
	    ])

	  },
	  created() {
	    this.workTimeData()
	    this.getUserList()
    this.userId = Cookies.get('userId')
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
			 validName2(rule, value, callback) {
				const reg = /^[\u4e00-\u9fa5_a-zA-Z]{2,20}$/;
				if (typeof value!='undefined' && value!='') {
					if (!value) {
						callback(new Error('请输入正确姓名'))
					} else if (!reg.test(value)) {
						callback(new Error('请输入正确姓名'))
					} else {
						callback()
					}
				}else{
					 callback();
				}
	      
	    },
	    validPhone(rule, value, callback) {
	      const reg = /^1[3|4|5|7|8][0-9]\d{8}$/
	      if (!reg.test(value) || !value) {
	        callback(new Error('请输入正确的11位手机号码'))
	      } else {
	        callback()
	      }
			},
			 validPhone2(rule, value, callback) {
				const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;

				if (typeof value!='undefined' && value !='') {
					if (!reg.test(value) || !value) {
						callback(new Error('请输入正确的11位手机号码'))
					} else {
						if (this.pushData.mother.tel!=this.pushData.father.tel) {
							callback();
						}else{
							callback(new Error('新增手机号不能与已有手机号相同'))
						}						
					}
				}else{
				  callback();
				}
	      
	    },
	    validBirth(rule, value, callback) {
	      if (new Date(value) >= new Date(this.pushData.baby.birthday)) {
	        callback(new Error('请输入正确的生日'))
	      } else {
	        callback()
	      }
	    },
	    handleSelectionChange(val) {
	      this.multipleSelection = val
	    },
	    workTimeData() {
	      const d = []
	      for (let i = 0; i <= 24; i++) {
	        d.push({
	          value: '' + i,
	          label: i + ' 小时'
	        })
	      }
	      this.workTime = d
	    },
	    getUserList() {
	      getUserList().then(response => {
	        const data = response.data
	        const d = []
	        for (let i = 0; i < data.length; i++) {
	          if (i === 0) {
	            this.pushData.baby.userid = '' + data[i].userid
	          }
	          d.push({
	            value: '' + data[i].userid,
	            label: data[i].name
	          })
	        }
	        this.submitDoctor = d
        this.pushData.baby.userid = this.userId
      })
	    },
	    // 保存
	    handleCreateSave() {
	      this.$refs['addEditPopForm'].validate((valid) => {	
					console.log(this.pushData.mother)					
					if (typeof this.pushData.mother.tel =='undefined' || this.pushData.mother.tel == '' || typeof this.pushData.mother.name =='undefined' || this.pushData.mother.name == '') {
						this.postdata = JSON.parse(JSON.stringify(this.pushData));
						delete this.postdata.mother;
					}else{
						this.postdata = this.pushData;
					}
	        if (valid) {
	          this.loading = true
	          saveData(this.postdata).then((response) => {
							// console.log(response);
							if(response.status==500){
									this.loading = false
									this.$message({
										message: '联系人已存在',
										center: true,
										type: 'error'
									});
									return;
							}else{
								this.loading = false
								this.$message({
									message: '新建资料成功!',
									type: 'success',
									duration: 1000,
									onClose: () => {
										this.goPage(response.data)
									}
								})
							}
						
	            
	          }).catch(e => {
							this.loading = false
							console.log(e)
							// this.loading = false
							// this.$message({
							// 	message: '联系人已存在',
							// 	center: true,
							// 	type: 'warning'
							// });
	            // this.$message({
	            //   showClose: true,
	            //   message: e,
	            //   type: 'error'
	            // })
	          })
	        } else {
						this.loading = false
	          return false
	        }
	      })
			},
			cloneDeep(obj) {
					let family = {}
					let parent = Object.getPrototypeOf(obj)

					while (parent != null) {
							family = completeAssign(deepClone(family), parent)
							parent = Object.getPrototypeOf(parent)
					}
					function completeAssign(target, ...sources) {
							sources.forEach(source => {
									let descriptors = Object.keys(source).reduce((descriptors, key) => {
											descriptors[key] = Object.getOwnPropertyDescriptor(source, key)
											return descriptors
									}, {})

									// Object.assign 默认也会拷贝可枚举的Symbols
									Object.getOwnPropertySymbols(source).forEach(sym => {
											let descriptor = Object.getOwnPropertyDescriptor(source, sym)
											if (descriptor.enumerable) {
													descriptors[sym] = descriptor
											}
									})
									Object.defineProperties(target, descriptors)
							})
							return target
					}

					return completeAssign(deepClone(obj), family)
			},

	    goPage(babyId) {
	      this.$router.push({
	        path: '/record/view/choose',
	        query: {
	          babyId: babyId,
	          type: 'add'
	        }
	      })
	    }
	  }
	}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
	.line-dashed{
		border-bottom: 1px dashed #dadada;
		background-color:transparent;
	}
	.line{
		margin:20px 5px 35px 5px;
	}
	.record {
		&-container {
			background-color: #e3f2f8;
			// margin-top: -3%;
			height: 100%;
		}
		&-medical {
			padding: 4% 5% 0 5%;
		}
		&-button {
			float: right;
			margin-top: 4%;
		}
	}

	.filter {
		&-container {
			width: 100%;
			background-color: #fff;
			margin-top: 2%;
			border-radius: 10px;
			padding:20px 2% 2%;
		}
		&-medical {
			padding: 0 5% 10% 5%;
			min-height: 445px;
		}
		&-text {
			text-align: center;
			font-size: 20px;
			color: #4f4f4f;
		}
		&-tips {
			font-size: 18px;
			color: #4f4f4f;
			padding-bottom: 1%;
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
</style>
