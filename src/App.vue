<template>
  <div id="app">
      <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app',
  mounted() {
    // 可以js获取DOM元素
  }
}
</script>

<style lang="less">
*{
  margin: 0;
  padding: 0;
}
body{
  // font-size:16px;
}
html,body{
  width:100%;
  height:100%;
}

#app{
  width:100%;
  height:100%;
}
html,body,#app{
  background: #000;
	color: #fff;
}

a,a:hover {
  text-decoration: none;
  color: #fff;  
}
a:active,a:focus{
  // text-decoration:none;
}
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}
li{ list-style:none; }
img{ border:none 0;}
input{ outline:none;}
/* 浮动公共样式 */
.lf{ float:left; _display:inline; }
.rt{ float:right; _display:inline; }
.clear:after{ display:block; content:''; clear:both;}
.clear{ zoom:1;}
tr,th{
  text-align:center;
}
</style>
