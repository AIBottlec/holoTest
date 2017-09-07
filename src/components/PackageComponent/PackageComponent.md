# 封装组件说明文档

### 表格组件(TableBase.vue)
引入并注册组件：
```javascript
import TableBase from '../PackageComponent/TableBase'
export default{
    //...
    components:{TableBase}
    // ...
}

```
使用组件:
```javascript
<TableBase  
    :gridDatas="gridDatas"  
    :columns="gridColumns"
    :modifyAuthority = false  //关闭增.删.改按钮
/>
```
数据格式:
```javascript
data() {
    return{

        // gridColumns说明：
        // 数据类型：Object
        // 定义版块标题（表格的列）
        // gridColumns[key]包含于gridDatas[i][key]
        // 从gridDatas中选择key来定义表格中显示的列
        // value值为对应列的标题
        // eg.
        gridColumns:{
            title:'版块名称',
            close:'是否关闭',
            moderator:'复选框'
        },

        // gridDatas说明:
        // 数据类型：Array
        // 定义版块内容
        // eg.
        // 目前定义了三种数据格式:String Boolean Array
        gridDatas: [
            { 
                // require => true
                _id:"string",

                title:{
                    type:"string", //在增添和修改页面，会将此类型的数据定义为Input text
                    value:""
                },

                close:{
                    type:"boolean", //在增添和修改页面，会将此类型的数据定义为Checkbox
                    value:true
                },

                moderator:{
                    type:"array",   //在增添和修改页面，会将此类型的数据定义为select
                    value:"",       //选中的值
                    all:['选项一','选项二','选项三']     //备选项
                }
            }
        ]
    }
}
```