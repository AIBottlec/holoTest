<template>
    <div id="grid_main">
        <div class="grid_main_header">
            <button class="grid_insert_button" @click="popUpInsertFun()" v-show="modifyAuthority" >添加</button>            
            <input name="query" class="input-wrap" v-model="searchQuery" placeholder="搜索">        
        </div>

        <!-- 添加动态修改样式标签 -->
        <!-- v-bind:class="dynamicTableClass" -->
        <table >
            <thead>
                <tr>
                    <th v-for="(title,i) in columnsValue" @click="sortBy(title)" v-bind:key="i">
                        {{title}}
                        <span class="arrow" :class="sortOrders[title] > 0 ? 'asc' : 'dsc'"></span>
                    </th>
                    <th v-if="modifyAuthority">操作</th>
                </tr>
            </thead>

            <tbody>
                <tr v-for="(entry,i) in datas" v-bind:key="i">
                    <td v-for="(key,index) in columnsKey" v-bind:key="index">{{entry[key].value}}</td>
                    <td v-show="modifyAuthority" >
                        <button @click="update(entry)" class="update_button">更新</button>
                        <button @click="remove(i)" class="delete_button">删除</button>
                    </td>
                </tr>
            </tbody>
        </table>

        <PopUp 
            :title="popUpTitle" 
            ref="PopUp"
            @childInsert="childInsert"
            @childUpdate="childUpdate"
            />

    </div>
</template>

<script>
import PopUp from './PopUp'

export default{
    components:{PopUp},
    props: {
        gridDatas: Array,//表格行数[{'a':1}{'b':2}{'c':3}]
        
        //表格标题对象
        columns: Object,

        modifyAuthority:{    //是否拥有增 删 改 权限
            type:Boolean,
            default:true    
        },
    },

    data: function () {
        var sortOrders = {}
        var insertData = {}

        var columnsKey = []
        var columnsValue = []

        //遍历父组件传递过来的columns对象
        for(var key in this.columns){
            columnsKey.push(key)
            columnsValue.push(this.columns[key])
        }

        columnsValue.forEach(function (key) {
            sortOrders[key] = 1
        })



        return {
            sortKey: '',                //按照sortKey这一列排序
            sortOrders: sortOrders,     //记录所有对象状态 1 | -1 
            searchQuery:'',             //搜索的值
            datas: this.gridDatas,      //表格数据
            insertData: insertData,     //插入的数据
            
            columnsKey: columnsKey,
            columnsValue: columnsValue,


            //传递给PopUp组件的值：
            popUpTitle:'',
        }
    },


    methods: {

        //表格排序
        sortBy: function (key) {
            // conosle.log(key)
            // conosle.log(this.sortOrders)
            var order = this.sortOrders[key] || 1            
            this.datas = this.datas.slice().sort(function (a, b) {
                a = a[key]
                b = b[key]
                return (a === b ? 0 : a > b ? 1 : -1) * order
            })
            this.sortOrders[key] = this.sortOrders[key] * -1
        },

        //删除表格行
        remove: function (index) {
            this.datas.splice(index, 1)
        },
        
        popUpInsertFun(){
            this.popUpTitle = '添加新数据'
            this.$refs.PopUp.show();
            this.$refs.PopUp.insertData(this.datas[1],this.columnsKey,this.columnsValue)
        },

        //子组件调用的插入函数
        childInsert: function (data) {
            this.datas.push(data);
        },
        
        //更新数据
        update: function (thisRowData) {
            this.popUpTitle = '修改数据'
            //执行PopUp组件内的函数
            this.$refs.PopUp.show();
            this.$refs.PopUp.updateData(thisRowData,this.columnsKey,this.columnsValue)           
        },

        //子组件调用的更新函数
        childUpdate: function(data){
            for(var i=0; i<this.datas.length; i++){
                if(this.datas[i]._id === data._id){
                    this.datas.splice(i,1,data)
                }
            }
        },
    },

    watch:{

        //搜索
        searchQuery: function(val,oldval){
            console.log(val)
            var searchQuery = this.searchQuery && this.searchQuery.toLowerCase()
            this.datas = this.datas.filter(function (row) {
                return Object.keys(row).some(function (key) {
                    return String(row[key]).toLowerCase().indexOf(searchQuery) > -1
                })
            })
        },

        //监测datas
        datas: (val) => {
            console.log(val)
        }
    }

}

</script>

<style scoped lang="less">

// base color
@defaultColor : #fff;
@successColor : #1DE9B6;
@infoColor: #039BE5;
@warningColor: #FF1744;

#grid_main{
    font-size:12px;
    width: 80%;
    padding: 20px;
    margin-left:auto;
    margin-right:auto;
    position: relative;
}
.grid_main_header{
    min-width: 500px; 
}


/*
   * 搜索框
   * 添加按钮
*/

// base button style
.buttonPublic{
	border-radius: 5px;
    height: 27px;
    transition: all .5s;
}

.grid_insert_button{
    .buttonPublic;
    color: #f1f1f1;
    width: 100px;
    margin-right: 6px;
    border:1px solid #fff;
    background-color:rgba(255, 255, 255, .0);
}
.grid_insert_button:hover{
    background-color:rgba(255, 255, 255, .3)
}

//删除按钮和更新按钮公共样式部分
.update_delete_button_public{
    .buttonPublic;    
    width: 45%;
    height: 27px;
    border-radius: 5px;
    color:@defaultColor;
    border: 1px solid @defaultColor;
    transition: all .5s;
}

.update_button{
    .update_delete_button_public;
    background-color:fade(@infoColor,90%)
}

.update_button:hover{
    background-color:fade(@defaultColor,80%);
    color:  @infoColor;
    border:1px solid @infoColor;      
}

.delete_button{
    .update_delete_button_public;
    background-color:fade(@warningColor,80%)    
}

.delete_button:hover{
    background-color:fade(@defaultColor,80%);
    color:  @warningColor;
    border:1px solid @warningColor;     
}



/* search */
.input-wrap{
    height: 28px;
	line-height: 28px;
	border-radius: 5px;
	padding: 0 15px;
	width: 25%;
    min-width: 200px;
	border: none;
	outline: none;
	/* font-size: 20px; */
	background: rgba(255, 255, 255, 0.2);
	transition: all .8s;
}
.input-wrap:focus{
	background: rgba(255, 255, 255, .8);
    width: 50%;
	border-radius: 30px;
}



/* table */
table {
    border: solid 1px @defaultColor;    
    margin-top:10px;
    width: 100%;
    color:black;
    border-radius: 3px;
}

th {
    min-width: 90px;
    background-color: fade(@infoColor,50%);
    color: fade(@defaultColor,80%);
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
tbody td {
     background-color: #f1f1f1;
}

th, td {
    padding: 5px 0px;
}

th.active {
    color: #fff;
}

th.active .arrow {
    opacity: 1;
}


/* arrow */
.arrow {
    display: inline-block;
    vertical-align: middle;
    width: 0;
    height: 0;
    margin-left: 5px;
    opacity: 0.66;
}

.arrow.asc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-bottom: 4px solid #fff;
}

.arrow.dsc {
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 4px solid #fff;
}



/* 表格样式A */
/* .tableClassA{
    background-color:#fff;
} */

/* 表格样式B */
/* .tableClassB{
    background-color:blue;
} */

</style>