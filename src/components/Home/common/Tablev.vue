<!--参数配置及组件调用参见TablevTest.vue-->
<!--@Alyss 组件方法在该文件中已实现-->
<!--insert存在问题-->
<template>
    <div class="tableV">
        <table class='tabList'>
            <thead v-if="needThead">
                <tr>
                    <th v-for="key in optionDatas.columns">{{key}}</th>
                    <th v-if="needDelete">操作</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(entry,index) in optionDatas.gridDatas">
                    <td v-for="key in optionDatas.columns">{{entry[key]}}</td>
                    <td v-if="needDelete"><button @click="remove(index)">delete</button></td>
                </tr>
                <tr v-if="optionDatas.needInsert">
                    <td v-for="key in columns">
                        <input type="text" v-model="optionDatas.insertData[key]"/>
                    </td>
                    <td><button @click="insert()">insert</button></td>
                </tr>
            </tbody>
        </table>
    </div>
</template>
<script>
export default {
  props:{
    gridDatas: Array,//表格行数[{'a':1}{'b':2}{'c':3}]
    columns: Array,//表格列数['a','b','c']
    needInsert:Boolean,//是否添加插入选项
    needDelete:Boolean,//是否添加删除选项
    insertData : '',//表格最后一列的插入input框，默认
    needThead : Boolean,//是否需要表头
  },
  data:function () {
    return {
      optionDatas:{
        gridDatas : this.gridDatas,
        columns : this.columns,
        needInsert : this.needInsert,
        needDelete : this.needDelete,
        insertData : this.insertData,
      }
    }
  },
  methods: {
    initInsertData : function () {
      var obj = {};
      for (var key in this.optionDatas.columns){//循环遍历列名
        obj[key] = null;//设置新的对象属性为空
      }
      this.optionDatas.insertData = obj;
    },
    insert: function () {
//      把当前input的值插入到gridDatas
      this.optionDatas.gridDatas.push(this.optionDatas.insertData);
//      初始化输入框
      this.initInsertData();
    },
    remove: function (index) {
      this.optionDatas.gridDatas.splice(index, 1)
    }
  },
}
</script>

<style scoped lang="less">
    .tabList{
        border-collapse:collapse;
        tr{
            padding:2px 5px;
        }
        th,td{
            border:1px solid white;
            padding:5px;
        }
        button{
            padding:3px;
            background:#141f44;
            color:white;
        }
    }
</style>