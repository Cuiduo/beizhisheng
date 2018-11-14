<template>
  <div class="record-container">

		<div class="record-medical">
			<el-row :gutter="20">
				<el-col :span="24">
					<breadcrumb></breadcrumb>
				</el-col>
			</el-row>

      <el-row :gutter="20">
        <el-col :span="12">
          <p style="font-weight: 600;font-size: 20px;">{{testName[testId]}}</p>
        </el-col>
        <el-col :span="12" style="text-align: right;padding-top: 1%;">
          <el-button type="primary" @click="goPage">新建病历</el-button>
        </el-col>
      </el-row>

			<!--<el-row :gutter="20" class="record-button rights">
				<el-col :span="24">
					<el-button type="primary" @click="goPage">新建病历</el-button>
				</el-col>
			</el-row>-->
			<div class="filter-container">
				<div class="filter-text">查找已测病历</div>
				<div class="line"></div>
				<el-form :model="searchData" ref="searchData" >
					<div class="record-left">
						<el-row :gutter="20">
							<el-col :span="12">
								<el-form-item prop="babyName" label="小儿姓名">
									<el-input v-model="searchData.babyName" placeholder="请输入" style="width: 60%;" clearable @keyup.enter.native="fetchData"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item prop="birthday" label="出生日期">
									<el-date-picker type="date" placeholder="请选择" v-model="searchData.birthday" value-format="yyyy-MM-dd" style="width: 60%;" @keyup.enter.native="fetchData"></el-date-picker>
								</el-form-item>
							</el-col>
						</el-row>

            <el-row :gutter="20">

							<el-col :span="12">
								<el-form-item prop="parentName" label="家长姓名">
									<el-input v-model="searchData.parentName" placeholder="请输入" style="width: 60%;" clearable @keyup.enter.native="fetchData"></el-input>
								</el-form-item>
							</el-col>
							<el-col :span="12">
								<el-form-item prop="tel" label="联系电话">
									<el-input v-model="searchData.tel" placeholder="请输入" style="width: 60%;" clearable @keyup.enter.native="fetchData"></el-input>
								</el-form-item>
							</el-col>
						</el-row>
					</div>
					<div class="record-right foxs">
						<el-button type="primary" @click="query">查找</el-button>
						<el-button type="info" plain @click="resetForm('searchData')">重置</el-button>

					</div>
				</el-form>
			</div>

		</div>

		<div class="appBackground" :style="{backgroundImage: 'url(' + appBackground + ')' }">
			<div class="filter-medical">
				<div class="filter-containerNew">
					<div class="filter-text">{{title}}</div>
					<br/>
					<el-table :data="list" v-loading.body="listLoading" element-loading-text="Loading" stripe fit highlight-current-row empty-text="暂无数据" @selection-change="handleSelectionChange">
						<el-table-column prop="babyName" label="姓名" align="center" header-align="center"></el-table-column>
						<el-table-column label="性别" align="center" header-align="center">
							<template slot-scope="scope">
								<span v-if="scope.row.babyGender===1">男</span>
								<span v-else>女</span>
							</template>
						</el-table-column>
						<el-table-column label="出生日期" align="center" header-align="center">
							<template slot-scope="scope">
								{{scope.row.babyBirthday}}
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
	import {parseTime} from '../../utils/index.js';
	export default {
		filters: {
        parseTime(time) {
						var date = new Date(time);
						let s = parseTime(date)+'';
				    return s.split('00')[0]
        }
    },
	  data() {
	    return {
	      appBackground: appBackground,

	      testId: 0,
	      title: '所有已测病例',
      testName: {},
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
	      'hospitalData',
	      'roles'
	    ])
	  },
	  created() {
	    this.testId = this.$route.query.testId
	    this.searchData.testId = this.testId
    this.handleTestName()
			this.fetchData();
			function timestampToTime(timestamp) {
					var date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
					Y = date.getFullYear() + '-';
					M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-';
					D = date.getDate() + ' ';
					h = date.getHours() + ':';
					m = date.getMinutes() + ':';
					s = date.getSeconds();
					return Y+M+D+h+m+s;
			}
	  },
	  methods: {
    handleTestName() {
      const data = this.hospitalData
      for (const i in this.hospitalData) {
        this.$set(this.testName, data[i].testId, data[i].testName)
      }
    },
	    handleSelectionChange(val) {
	      this.multipleSelection = val
	    },
	    goPage(id) {
	      if (id > 0) {
	        this.$router.push({
	          path: '/record/view/add',
	          query: {
	            id: id
	          }
	        })
	      } else {
	        this.$router.push({
	          path: '/record/view/add'
	        })
	      }
	    },
	    resetForm(formName) {
	      this.title = '所有已测病例'
	      this.$refs[formName].resetFields()
	      this.fetchData()
	    },
	    goInfo(id) {
	      this.$router.push({
	        path: '/record/info',
	        query: {
	          babyId: id
	        }
	      })
	    },
	    goTest(id) {
	      this.$router.push({
	        path: '/record/view/choose',
	        query: {
	          babyId: id
	        }
	      })
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
	.filter-text {
		font-weight: 600;
	}
	.el-breadcrumb__separator{
	    margin: 0;
	}
	.el-form-item{
		font-weight: 500 !important;
		/*width: 60px;*/
	}
	.line{
		margin:20px 5px 35px 5px;
	}
	.record {
		&-container {
			background-color: #e3f2f8;
			margin-top: -3%;

		}
		&-medical {
			padding: 4% 5% 0 5%;
		}
		&-button {
			float: right;
			margin-right: 1% !important;
		}
		&-left {
			float: left;
			width: 66%;
		}
		&-right {
			float: right;
			/*width: 20%;*/
			margin-top: 2.5%;
		}
	}

	.filter {
		&-container {
			width: 100%;
			min-width: 690px;
			height: 280px;
			background-color: #fff;
			margin-top: 2%;
			border-radius: 10px;
			padding: 30px 2%;
		}
		&-medical {
			padding: 0 5% 10% 5%;
			min-height: 445px;
		}
		&-containerNew {
			width: 100%;
			background-color: #fff;
			margin-top: 5%;
			border-radius: 10px;
			padding-top: 30px;
			padding-bottom: 2%;
			min-width: 690px;
		}
		&-text {
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
		z-index: -10;
		zoom: 1;
	}
</style>
