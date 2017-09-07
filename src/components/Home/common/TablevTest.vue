<template>
  <div class="hello">
    <Tablev :needThead="needThead" :needDelete="needDelete" :needInsert="needInsert" :insertData="insertData" :gridDatas="gridDatas" :columns="gridColumns"></Tablev>
  </div>
</template>

<script>
  import Tablev from './Tablev'
  export default {
    data () {
      return {
//      列数，列标题
        gridColumns: ['namea','power'],
//      行数，每一行的数据
        needInsert:true,
        needDelete:true,
        needThead:true,
        gridDatas: [
          { 'namea': 'Chuck Norris', 'power': Infinity,},
          { 'namea': 'Bruce Lee', 'power': 9000 },
          { 'namea': 'Jackie Chan', 'power': 7000 },
          { 'namea': 'Jet Li', 'power': 8000 }
        ],
        insertData: {'namea': '', 'power':''}
      }
    },
    components:{
      Tablev
    }
  }
</script>