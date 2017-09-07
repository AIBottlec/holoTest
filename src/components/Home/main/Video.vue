<template>
  <div id="videoOperation">
    <table class='tabList'>
      <tbody>
      <tr>
        <td>上传视频</td>
        <td>
          <input type="file" class="upload">
        </td>
      </tr>
      <tr>
        <td>封面</td>
        <td>
          <div class="cover">
            <img :src="formData.coverData" alt="">
            <div class="inpImg">
              <input @change="addCover" filetype="image/*" type="file" :class="{ hidden: isPushimgHidden }">
              <span class="iRemove fa fa-remove" :class="{ show: isFaShow}" @click="removeCover"></span>
            </div>
          </div>
        </td>
      </tr>
      <tr>
        <td>标题</td>
        <td>
          <input type="text" class="title" v-model="formData.videoTitle">
        </td>
      </tr>
      <tr>
        <td>说明</td>
        <td>
          <textarea name="description" class="description" cols="30" rows="3"  v-model="formData.videoDes"></textarea>
        </td>
      </tr>
      <tr class='saveBtn'>
        <td></td>
        <td style="text-align: center">
          <button @click="onSave">保存</button>
        </td>
      </tr>
      </tbody>
    </table>

  </div>
</template>

<script>

  export default {
    data () {
      return {
        uploadServerPath:"",
        responseMsg:'',
        isPushimgHidden:false,
        isFaShow:false,
        formData:{
//          videoData:"",//视频数据
          coverData:"",//视频封面
          videoTitle:"",//视频标题
          videoDes:""//视频说明
        },
      }
    },
    methods:{
      addCover:function (e) {
        var _this = this;
        let file = e.target;
        let reader = new FileReader();
        reader.readAsDataURL(file.files[0]);
        reader.onload=function(){//文件读取成功
          _this.isPushimgHidden = true;
          _this.isFaShow= true;
          _this.$http.get('../../../../static/carouselUploadImage.json', {
            "data" : this.result,//读取的图片的数据
            "token" : "alyss"
            },
            {emulateJSON : true}
          ).then((res) => {
            _this.formData.coverData = JSON.parse(res.bodyText).adsUris[0];
          }).catch((error) => {
            console.log(error);
          });
        };

      },
      removeCover:function () {
          this.isPushimgHidden = false;
          this.isFaShow= false;
          this.formData.coverData = "";
      },
      onSave:function () {
        this.$http.get('../../../../static/video.json', {
            "data" : this.formData,
            "token" : ""
          },
          {emulateJSON : true}
        ).then((res) => {
          console.log( this.formData);
        }).catch((error) => {
          console.log(error);
        });
      }
    }
  }
</script>

<style scoped lang="less">
  @themeColor:#121341;
  .hidden{
    display: none;
  }

  .tabList{
    /*margin:0 auto;*/
    text-align:left;
    tbody{
      vertical-align:top;
    }
    /*border-collapse:collapse;*/
    tr{
      padding:2px 5px;
    }
    td{
      padding:15px;
    }
    td{
      .cover{/*封面*/
        position: relative;
        width:500px;
        height:300px;
        line-height: 300px;
        text-align: center;
        border:1px solid white;
        .inpImg{
          position: absolute;
          top:0;
          left:0;
          width:100%;
          height:100%;
          input{
            margin-left:65px;
          }
          span{
            position: absolute;
            bottom:5px;
            right:5px;
            font-size: 30px;
            display: none;
          }
          .show{
            display: block;
          }
        }
        img{
          position: absolute;
          top:0;
          left:0;
          width:100%;height:100%
        }
      }
      .description{/*文本框*/
        width:500px;
        color:white;
        background: transparent;
        font-size: 20px;
        padding:5px;
        border: 1px solid white;
        line-height: 1.5;
      }
      .title{
        background: transparent;
        width:500px;
        font-size: 20px;
        color: white;
        padding:5px;
        border: none;
        border-bottom: 1px solid white;
      }
    }
    button{
      padding:3px;
      background:#141f44;
      color:white;
    }
  }
</style>
