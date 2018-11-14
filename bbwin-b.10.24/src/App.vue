<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style>
	/*.el-table th>.cell{
		padding-left: 2.5%;
		font-weight: 600;
		font-size: 20px;
		color: #000000;
	}*/
	.el-table .has-gutter .cell{
		/*background: red;*/
		font-size: 16px;
		font-weight: 600;
		color: #333333;
		
	}
	/*.el-table__header-wrapper{
		padding-left: 2.5%;
	}*/
	.el-table__body .el-table__row{
		padding-left: 2.5%;
	}
	
	/*.filter-results .el-table__row:nth-of-type(odd){
		background: #F5F7FA;
	}*/
</style>
