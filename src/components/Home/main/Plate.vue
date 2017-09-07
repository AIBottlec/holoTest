<template>
	<div id="demo">
		<TableBase  
			:gridDatas="gridDatas" 
			:columns="gridColumns"
			:modifyAuthority = true
		/>
	</div>
</template>

<script>
import TableBase from '../../PackageComponent/TableBase'

//测试数据

export default {
	data() {
		return{
			//定义版块标题
			gridColumns:{
				title:'版块名称',
				creator:'创建者',
				moderator:'版主', 
				close:'是否关闭',
				hidden:'是否隐藏',
				plateRemark:'版块备注',
				moderator2:'复选框'
			},
			
			gridDatas: [
				{ 
					_id:1,
					title:{
						type:"string",
						value:""
					},
					moderator:{
						type:"array",
						value:"",
						selected:[],
						all:['张三','李四','王二','赵五']
					},
					creator:{
						type:"string",
						value:"创建者A"				
					},
					close:{
						type:"boolean",
						value:true
					},
					hidden:{
						type:"boolean",
						value:true
					}, 
					plateRemark:{
						type:"string",
						value:"备注1"					
					},
					moderator2:{
						type:"array",
						value:"",
						selected:[],
						all:['张三','李四','王二','赵五']
					}
				},
				{ 
					_id:2,
					title:{
						type:"string",
						value:""
					},
					moderator:{
						type:"array",
						value:"",
						selected:[],
						all:['张三','李四','王二','赵五']
					},
					creator:{
						type:"string",
						value:"创建者A"				
					},
					close:{
						type:"boolean",
						value:true
					},
					hidden:{
						type:"boolean",
						value:true
					}, 
					plateRemark:{
						type:"string",
						value:"备注1"					
					},
					moderator2:{
						type:"array",
						value:"",
						selected:[],
						all:['张三','李四','王二','赵五']
					}
				},
				{ 
					_id:3,
					title:{
						type:"string",
						value:""
					},
					moderator:{
						type:"array",
						value:"张三",
						selected:[],
						all:['张三','李四','王二','赵五']
					},
					creator:{
						type:"string",
						value:"创建者A"				
					},
					close:{
						type:"boolean",
						value:true
					},
					hidden:{
						type:"boolean",
						value:true
					}, 
					plateRemark:{
						type:"string",
						value:"备注1"					
					},
					moderator2:{
						type:"array",
						value:"李四",
						selected:[],
						all:['张三','李四','王二','赵五']
					}
				}
			]
		}
	},

	components:{TableBase}
}
</script>

<style scoped>

</style>
