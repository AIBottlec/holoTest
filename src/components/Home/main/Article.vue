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
import 'bootstrap/js/modal.js';
import 'bootstrap/js/dropdown.js';
import 'bootstrap/js/tooltip.js';
import 'bootstrap/dist/css/bootstrap.css';
import 'summernote';
import 'summernote/dist/summernote.css';
// import * as wilddog from 'wilddog'
// var config = {
//   syncURL: "https://wd4387898491vlvuuq.wilddogio.com" //输入节点 URL
// };
// wilddog.initializeApp(config);
// var ref = wilddog.sync().ref();

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
        var _this = this;
        $('#summernote').summernote({
            height: 200,// set editor height
            focus: true,
             toolbar: [
                ['para', ['style','ul', 'ol', 'paragraph','height']],
                ['style', ['bold', 'italic', 'underline', 'clear']],
                ['font', ['fontsize','fontname','color']],
                ['clean','removeFormat'],
                ['link', ['link', 'unlink']],
                ['insert', ['picture','table','hr']],
                ['Misc',['undo','redo','fullscreen']],
                
            ],
            callbacks:{
                onChange:function(contents,$editable){
                    if(_this.isSave){
                        _this.artical.contents = contents;
                        _this.$http.get("../../../../static/video.json",{
                            "data":_this.artical,
                        }).then((res)=>{
                            console.log(_this.artical);
                        }).catch((err)=>{
                            console.log(err);
                        });
                    }
                },
                // onImageUpload: function(files) {
                //     console.log(files);
                //     // // 图片上传后提交到服务器
                //     sendFile(JSON.stringify(files[0]));
                // },
            }
        });
    }
  }
  function sendFile(data){
    var formData = new FormData();  
    formData.append("file", data); 
    console.log(formData);

    // ref.set({
    //     "messageboard":{
    //         "imageData":formData
    //     }
    // });
    // ref.on("value", function(res) {
    //         console.log(res.val());
    // });
    //  _this.$http.get("../../../../static/video.json",{
    //     // "data":formData,
    // }).then((data)=>{
    //     // console.log(data);
    //     // $("#summernote").summernote('insertImage', data);
    // }).catch((err)=>{
    //     console.log(err);
    // });
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
