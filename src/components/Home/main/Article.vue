<template>
    <div class="container" id="">
        <div class="ArtEditor">
            <div class="title">
                <span>标题</span>
                <input v-model.lazy="artical.title" type="text" placeholder="请输入标题">
            </div>
            <div class="content">
                <span>内容编辑</span>
                <div id="summernote"></div>
            </div>
            <div class="saveBtn">
                <button @click="onSave">保存</button>
            </div>
        </div>
    </div>
</template>
<script>

  export default {
    name: 'hello',
    data () {
      return {
        msg: "图文管理页面",
        artical:{
          title:"",
          contents:""
        },
        isSave: false,
      }
    },
    methods:{
       onSave:function () {
            this.isSave = true;
            $('#summernote').summernote('insertText', '');
        }
    },
    components: {
    },
    mounted(){
        
    }
  }
  
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
    .ArtEditor{
        text-align: left;
        padding:10px;
        width:100%;
        height:100%;
        div.title,div.content{
            margin-top:40px;
            vertical-align: middle;
            &>span{
                display: inline-block;
                width:10%;
            }
        }
        div.content{
            span{
                float:left;
            }
        }
        &>.title{
            input{
                width:200px;
                color:#000;
            }
        }
        /*保存按钮*/
        .saveBtn {
            text-align: center;
            margin-top: 40px;
            button {
                margin: auto;
                font-size: 20px;
                padding: 0 5px;
                background: white;
                color: #141f44;
            }
        }
    }

    /*编辑器内部样式*/
    .note-editor{
        display:inline-block;
        width:88%;
        a{
            color: #337ab7;
            text-decoration: none
        }
        & ul {
            display: block;
            list-style-type: disc;
            -webkit-margin-before: 1em;
            -webkit-margin-after: 1em;
            -webkit-margin-start: 0;
            -webkit-margin-end: 0;
            -webkit-padding-start: 40px;
        }
        & ul>li {
              list-style-type: disc;
              display: list-item;
              text-align: -webkit-match-parent;
        }

        & ol {
          display: block;
          list-style-type: decimal;
          -webkit-margin-before: 1em;
          -webkit-margin-after: 1em;
          -webkit-margin-start: 0;
          -webkit-margin-end: 0;
          -webkit-padding-start: 40px;
        }
        & ol>li {
          list-style-type: decimal;
          display: list-item;
          text-align: -webkit-match-parent;
        }
    }
</style>
