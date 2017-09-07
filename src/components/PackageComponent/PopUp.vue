<template>
    <transition name='fade'>
        <div class="pop_alert" v-show="showAlert">

            <div class="pop_wrap">
                
                <div class="pop_head">{{title}}</div>
                
                <div class="pop_body">

                    <!--更新数据Html--> <!-- //循环获取到的内容数组 -->       
                    <div v-for="(dataValue,i) in updateDataDetail" v-bind:key="i">

                        <!-- 匹配标题中出现的选项 -->
                        <div v-if="(updateColumnsKey.indexOf(i) >= 0)" class="pop_update">
                            
                            <!--columns value-->
                            <span class="columns_value_main">
                                {{updateColumnsValue[updateColumnsKey.indexOf(i)]}}
                                <span class="value_colon">:</span>
                            </span>
                            
                            <!--data value-->
                            <span>
                                <!-- 判断属性值是否为string,如果是，则渲染为input -->
                                <input v-if="(dataValue.type == 'string')" type="text" v-model="updateDataDetail[i].value"/>
                                
                                <!-- 判断属性值是否为boolean，如果是，则渲染为checkbox-->
                                <input v-else-if="(dataValue.type == 'boolean')" type="checkbox" v-model="updateDataDetail[i].value">
                            
                                <!-- 如果判断为对象中含有all和default属性,则渲染为select -->
                                <span v-else-if="(dataValue.type == 'array') && dataValue.hasOwnProperty('all') && dataValue.hasOwnProperty('value')">
                                    <select v-model="updateDataDetail[i].value"> <!--下拉菜单-->
                                        <option disabled value="">请选择</option>
                                        <option v-for="(value,i) in updateDataDetail[i].all" v-bind:key="i" >{{value}}</option>
                                    </select>
                                    <!--选中的值-->
                                    {{updateDataDetail[i].value}}
                                </span>
                            </span>
                            
                        </div>

                    </div>
                    

                    <!--插入数据Html-->
                    <div v-for="(dataValue,i) in insertDataDetail" v-bind:key="i">

                        <!-- 匹配标题中出现的选项 -->
                        <div v-if="(insertColumnsKey.indexOf(i) >= 0)" class="pop_update">
                            
                            <!--columns value-->
                            <span class="columns_value_main">
                                {{insertColumnsValue[insertColumnsKey.indexOf(i)]}}
                                <span class="value_colon">:</span>
                            </span>
                            
                            <!--data value-->
                            <span>
                                <!-- 判断属性值是否为string,如果是，则渲染为input -->
                                <input v-if="(dataValue.type == 'string')" type="text" v-model="insertDataDetail[i].value"/>
                                
                                <!-- 判断属性值是否为boolean，如果是，则渲染为checkbox-->
                                <input v-else-if="(dataValue.type == 'boolean')" type="checkbox" v-model="insertDataDetail[i].value">
                            
                                <!-- 如果判断为对象中含有all和default属性,则渲染为select -->
                                <span v-else-if="(dataValue.type == 'array') && dataValue.hasOwnProperty('all') && dataValue.hasOwnProperty('value')">
                                    <select v-model="insertDataDetail[i].value"> <!--下拉菜单-->
                                        <option disabled value="">请选择</option>
                                        <option v-for="(value,i) in insertDataDetail[i].all" v-bind:key="i" >{{value}}</option>
                                    </select>
                                    <!--选中的值-->
                                    {{insertDataDetail[i].value}}
                                </span>
                            </span>
                            
                        </div>

                    </div>

                </div>

                <div class="pop_foot">
                    <button class="btn-base" @click="sure">确定</button>
                    <button class="btn-gray" @click="cancel">取消</button>
                </div>

            </div>

        </div>
    </transition>
</template>
<script>
export default {
    data:function(){
        return{
            showAlert:false,

            insertDataDetail:null,
            insertColumnsKey:null,
            insertColumnsValue:null,

            updateDataDetail:null,            
            updateColumnsKey:null,
            updateColumnsValue:null
        }        
    },
    props: {
        title: {
            type: String,
            default: '标题',
        }
    },
    methods: {
        randomId(randomFlag, min, max) {
            var str = "",
                range = min,
                arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];

            if (randomFlag) {
                range = Math.round(Math.random() * (max - min)) + min;
            }
            for (var i = 0; i < range; i++) {
                let pos = Math.round(Math.random() * (arr.length - 1));
                str += arr[pos];
            }
            return str;
        },
        clearData(){
            this.insertDataDetail = null;
            this.insertColumnsKey = null;
            this.insertColumnsValue = null;

            this.updateDataDetail = null;            
            this.updateColumnsKey = null;
            this.updateColumnsValue = null;
        },

        cancel() {
            this.clearData()
            this.close();
        },

        sure() {      
            //判断是添加按钮还是更新按钮，如果insertColumnsKey不为空，则此按钮为添加按钮
            if(this.insertColumnsKey != null){                
                //调用父组件的插入方法
                this.$emit('childInsert',this.insertDataDetail)
    
                this.clearData()
                this.close();

            }else if(this.updateColumnsKey != null){  //更新按钮
                
                //调用父组件的更新方法
                this.$emit('childUpdate',this.updateDataDetail)

                this.clearData()             
                this.close();
            }
            
        },

        show() {
            this.showAlert = true;
        },

        close() {
            this.showAlert = false;
        },

        updateData(data,itemKey,itemValue) {
            var updateDataDetail = {}
            this.updateDataDetail = JSON.parse(JSON.stringify(data))
            this.updateColumnsKey = itemKey
            this.updateColumnsValue = itemValue
        },

        insertData(data,itemKey,itemValue) {
            var insertDataDetail ={}
            this.insertDataDetail = JSON.parse(JSON.stringify(data))

            //初始化随机id
            this.insertDataDetail._id = this.randomId(false,20)

            //清除string类型默认value
            for(var key in this.insertDataDetail){
                if(this.insertDataDetail[key].type == 'string'){
                    this.insertDataDetail[key].value = ""                    
                }
            }

            this.insertColumnsKey = itemKey
            this.insertColumnsValue = itemValue
        }
    },
};
</script>

<style scoped>
.pop_alert {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0, 0.8);
    z-index: 1000;
    transition: all .3s ease-in-out;
}
.pop_wrap {
    position: absolute;
    z-index: 1002;
    min-width: 400px;
    background: #fff;
    left: 50%;
    top: 40%;
    transform: translate(-50%, -50%);
    border-radius: 4px;
}
.pop_head {
    height: 40px;
    line-height: 40px;
    border-bottom: 1px solid #dedede;
    padding-left: 10px;
    color: #333;
}
.pop_body {
    padding: 40px 20px;
    color:#666;
}
.pop_foot {
    height: 50px;
    text-align: right;
}

.pop_foot button{
    margin-right: 20px;
}

.pop_update{
    margin-top:10px;
}
.columns_value_main{
    width: 80px;
    display: inline-block;
}
.value_colon{
    margin-left: 10px;
    margin-right: 10px;
}
</style>
