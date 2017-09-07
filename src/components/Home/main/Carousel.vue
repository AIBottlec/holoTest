<template>
    <div class="hello">
        <div class='carouselPage grid1'>
            <div class='carTab gridLeft1'>轮播图设置页面</div>
            <div class='carCon gridCon1'>
                <!--选版主-->
                <label for='tarOwer'>请选择版块</label>
                <select id='tarOwer' v-model="selected">
                    <option>版块一</option>
                    <option>版块二</option>
                    <option>版块三</option>
                    <!--<option v-for="option in plates" v-bind:value="option.value">-->
                        <!--{{ option.text }}-->
                    <!--</option>-->
                </select>
    
                <!--图片操作表格&&图片素材-->
                <div id="picCon" class="grid2">
                    <!--zuo侧-->
                    <table class='picList'>
                        <thead v-if="carouselList!=''" style=" text-align:center">
                            <tr>
                                <th>预览</th>
                                <th>链接</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr class='row' v-for='(item,index) in carouselList'>
                                <td><img :src="item.cimgUrl"></td>
                                <td>{{item.cLink}}</td>
                                <td>
                                    <button @click="remove(index)">移除</button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
    
                    <!--中间-->
                    <div class="trans">
                        <button class="transform" @click="transClick">&lt;从素材库添加</button>
                        <!--@Alyss 此处需要覆盖input-file的默认样式-->
                        <div class="addMat">
                            <button style="width:90px;" class="transform" v-on:click="setMetShow = true">添加素材图</button>
                            <transition name="fade">
                                <div class="setMaterial" v-if="setMetShow">
                                    <input class="matChoose" v-on:change="matImgUpload" type="file" filetype="image/*">
                                    <br/>
                                    <input v-model="insertData.insLink" class="matLink" type="text" placeholder="请输入链接地址，默认空">

                                    <button class="matCancle" @click="setMetShow = false">取消</button>
                                    <button class="matSave"  @click="addMatImg">保存</button>
                                </div>
                            </transition>
                        </div>

                    </div>
    
                    <!--you侧-->
                    <div class="material">
                        <p>素材库</p>
                        <ul class=" clear">
                            <li v-for='(item,index) in materials'>
                                <img :src="item.materialSrc" :link="item.materialLink" alt="" @click="materialItemClick($event)">
                                <div class="Mark" @click="iRemove(index)">
                                    <span class="iRemove fa fa-remove"></span>
                                    <span class="iChoose fa fa-check"></span>
                                </div>
                            </li>
                        </ul>
                    </div>
    
                </div>
    
                <div class='saveBtn'>
                    <button @click="onSave">保存</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'hello',
        data() {
            return {
                msg: "轮播图管理页面",
                selected: '', //选择板块下拉列表的数据绑定
                plates: [], //select,板块备选项数据
                carouselList: [//左侧轮播图列表
                    {
                        cimgUrl: "http://img17.3lian.com/d/file/201701/16/779db6efe9d4520e07e8bfb8b9e55175.jpg",
                        cLink: "http://www.baidu.com",
                    },
                    {
                        cimgUrl: "http://img1.3lian.com/2015/w22/48/d/101.jpg",
                        cLink: "http://www.baidu.com",
                    }
                ],
                materials: [//素材库列表
                    {
                        materialSrc:"http://img.51ztzj.com/upload/image/20140625/sj201406251013_279x419.jpg",
                        materialLink:"www.bitprompt.com"
                    },
                    {
                        materialSrc:"http://pic3.zhongsou.com/image/380cfc6168893bd5231.jpg",
                        materialLink:"www.bitprompt.com"
                    },
                    {
                        materialSrc:"http://img.zcool.cn/community/0188e6556863a700000127160da429.jpg",
                        materialLink:"www.bitprompt.com"
                    },
                    {
                        materialSrc:"http://scimg.jb51.net/allimg/150925/14-1509250Z615109.jpg",
                        materialLink:"www.bitprompt.com"
                    }
                ],
                insertData:{
                    insImg:"",
                    insLink:"",
                },
                setMetShow: false,//上传素材图的框是否显示
                materiTar: null,//添加轮播图时，被选中的素材图
            }
        },
    
        created: function() {
            //    interface:板块列表接口
            //      this.$http.get('../../../../static/...', {}).then((res) => {
            //        this.plates = JSON.parse(res.bodyText);
            //      }).catch((res) => {
            //        console.log("error");
            //      })
    
            //     interface:请求轮播图列表接口
            //      this.$http.get('../../../../static/carousel.json', {
    
            //      }).then((res) => {
            //        this.carouselList = JSON.parse(res.bodyText).adsUris;
            //            for (var i = 0; i < this..length; i++) {
            //                this.carouselList.push({cIndex:this.carouselList.length, cData: "",cLink:""});
            //            }
            //      }).catch((res) => {
            //        console.log("error");
            //      })
    
            //    interface:素材库数据加载
            // this.$http.get('../../../../static/carousel.json', {}).then((res) => {
            //     this.materials = JSON.parse(res.bodyText).adsUris;
            // }).catch((res) => {
            //     console.log("error");
            // })
        },
        methods: {
            //   function-点击轮播图列表按钮，移除当前行
            remove: function(index) {
                this.carouselList.splice(index, 1);
            },
            //  function-上传素材图 -> 文件读取成功后，把图片地址放在img.src中，提供预览
            addMatImg: function(e, i) {
                if(this.insertData.insImg == ""){
                    alert("请上传图片");
                }else{
                    this.materials.unshift({
                     materialSrc:this.insertData.insImg,
                     materialLink:this.insertData.insLink,
                    });
                    this.insertData.insImg = "";
                    this.insertData.insLink="";
                    this.setMetShow =  false
                }
            },
            matImgUpload:function(e){
                var _this = this;
                let file = e.target;
                for (let i = 0; i < file.files.length; i++) {
                    let reader = new FileReader();
                    reader.readAsDataURL(file.files[i]);
                    reader.onload = function() { //文件读取成功
                        //    interface:上传素材库图片
                        // _this.$http.get('../../../../static/carouselUploadImage.json', {
                        //     "data": this.result,
                        //     "token": "alyss"
                        // }).then((res) => {
                        //    _this.insertData.insImg = JSON.parse(res.bodyText).adsUris[0];
                        // }).catch((error) => {
                        //     console.log(error);
                        // });
                         _this.insertData.insImg = this.result;// 把新上传的图片添加到insertData中
                    }
                }
            },
            //  function-点击素材图图片,当前图片添加红色边框
            materialItemClick: function(e) {
                if (this.materiTar != null) { //有选中素材图
                    this.materiTar.parentNode.style.border = "2px solid white";
                    if (e.target == this.materiTar) {
                        this.materiTar = null;
                        return;
                    }
                }
                this.materiTar = e.target;
                this.materiTar.parentNode.style.border = "2px solid red";
            },
            //  function-点击按扭"从素材库添加,左侧列表最后一项添加数据
            transClick: function() {
                if (this.materiTar == null) {
                    alert("请选择要添加的素材图！");
                } else {
                    this.carouselList.push({
                        cimgUrl:this.materiTar.src,
                        cLink:this.materiTar.getAttribute('link'),
                    });
                    this.materiTar.parentNode.style.border = "2px solid pink";
                }
            },
            //      function-移除轮播图
            iRemove: function(index) {
                if (confirm("确定将该图片从素材库移除？")) {
                    this.materials.splice(index, 1);
                }
            },
            //    interface:点击保存按钮，上传轮播图表单数据
            onSave: function() {
                this.$http.get('../../../../static/carouselUploadImage.json', {
                    "data": this.carouselList,
                    "token": ""
                }, {
                    emulateJSON: true
                }).then((res) => {
                    console.log(this.carouselList);
                }).catch((error) => {
                    console.log(error);
                });
            },
            // CarouselImage: function(imgUrl, link){
            //     this.imgUrl = imgUrl;
            //     this.link = link;
            // }
        },
        components: {
            //id,imgUrl,imgLink,addTime,remark,duration
        }
    }
</script>

<style scoped lang='less'>
    /*grid布局*/
    
    .grid1 {
        display: grid;
        grid-template-columns: 60px auto;
        .gridCon1 {
            min-height: 600px;
            border: 1px solid white;
        }
    }
    
    .grid2 {
        display: grid;
        grid-template-columns: 3.5fr 1fr 7fr;
        grid-gap: 10px;
    }
    
    .carouselPage {
        width: 96%;
        margin-left: 2%;
        border: 1px solid #fff;
        margin-top: 20px;
        button {
            outline: none;
            border-radius: 3px;
            padding: 3px;
        }
        /*配置页面左侧标题*/
        .carTab {
            padding: 20px;
            width: 20px;
        }
        /*配置页面右侧content*/
        .carCon {
            padding: 20px;
            text-align: left;
            line-height: 36px;
            /*根据用户输入页数生成的列表样式*/
            #picCon {
                padding: 20px 0;
                /*左侧table*/
                .picList {
                    border-collapse: collapse;
                    th {
                        border: 1px solid white;
                        padding: 5px;
                    }
                    .row {
                        padding: 2px 5px;
                        height: 60px;
                        td {
                            border: 1px solid white;
                            padding: 5px;
                            /*min-width:60px;*/
                            img {
                                width: 100%;
                                vertical-align: middle;
                            }
                        }
                    }
                    button {
                        padding: 3px;
                        background: #141f44;
                        color: white;
                    }
                }
                /*中间*/
                .trans {
                    .transform {
                        height: 30px;
                        margin-top: 50px;
                        background: white;
                    }
                    .addMat {
                        .setMaterial {
                            position: absolute;
                            top: 30%;
                            left: 40%;
                            width: 300px;
                            height: 200px;
                            background: white;
                            z-index:100;
                            padding:20px;
                            border-radius:5px;
                            .matChoose{
                                width:200px;
                            }
                            .matLink{
                                width:200px;
                            }
                            .matCancle,.matSave{
                                position:absolute;
                                right:37%;
                                bottom:30px;
                            }
                            .matSave{
                                left:37%;
                                background:#46f;
                                color:white;
                            }
                        }
                    }
                }
                /*右侧ul*/
                .material {
                    text-align: center;
                    li {
                        position: relative;
                        float: left;
                        width: 32.5%;
                        height: 85px;
                        border: 2px solid white;
                        overflow: hidden;
                        img {
                            height: 100%;
                            vertical-align: middle
                        }
                        .Mark {
                            /*display: none;*/
                            cursor: pointer;
                            transform: scale(0.7);
                            position: absolute;
                            width: 40px;
                            height: 40px;
                            font-size: 30px;
                            text-align: center;
                            right: -10px;
                            top: -10px;
                            border-radius: 50%;
                            color: red;
                            font-family: "Open Sans", Helvetica, Arial, sans-serif;
                            .iRemove {
                                /*display: none;*/
                            }
                            .iChoose {
                                color: greenyellow;
                                display: none;
                            }
                        }
                    }
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
    }
</style>
