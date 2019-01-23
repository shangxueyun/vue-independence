<template>
    <div id="processing_details" v-loading="P_adds">
        <table>
            <tbody>
                <!-- 原料 -->
                <tr v-show="disabled">
                    <td style="width: 17%;" class="fuzzyQuery_td">
                        <el-input v-model="search"  class="dataS_dis_value" @focus="dataS_dis=true;" placeholder="请输入内容"></el-input>
                        <div class="dataS" v-show="dataS_dis">
                            <div v-for="items in tables" @click="product_type(items)">
                                <span style="margin-left: 10px" v-html="format(items.materialName)"></span>
                            </div>
                        </div>
                    </td>
                    <td style="width: 17%;">
                        <el-input disabled v-model="material_attribute"></el-input>
                    </td>
                    <td style="width: 17%;" >
                        <el-input disabled v-model="form.categoryName"></el-input>
                    </td>
                    <td style="width: 17%;" class="fuzzyQuery_td">
                        <el-input disabled v-model="form.unitName"></el-input>
                    </td>
                    <td style="width: 17%;">
                        <el-input disabled v-model="form.standardName"></el-input>
                    </td>
                    <td style="width: 15%;">
                        <el-select @change="selectGet" v-model="isMain" style="width:100%" placeholder="请选择类型">
                        <el-option 
                            v-for="item in selectList" 
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        ></el-option>
                        </el-select>
                    </td>
                </tr>
                <!-- 商品 -->
                <tr v-show="disabled1">
                    <td style="width: 21%;" class="fuzzyQuery_td">
                        <el-input v-model="search"  class="dataS_dis_value" @focus="dataS_dis=true;" placeholder="请输入内容"></el-input>
                        <div class="dataS" v-show="dataS_dis">
                            <div v-for="items in tables" @click="product_type1(items)">
                                <span style="margin-left: 10px" v-html="format(items.materialName)"></span>
                            </div>
                        </div>
                    </td>
                    <td style="width: 20%;">
                        <el-input disabled v-model="material_attribute"></el-input>
                    </td>
                    <td style="width: 20%;" >
                        <el-input disabled v-model="form.categoryName"></el-input>
                    </td>
                    <td style="width: 20%;" class="fuzzyQuery_td">
                        <el-input disabled v-model="form.unitName"></el-input>
                    </td>
                    <td style="width: 20%;">
                        <el-input disabled v-model="form.standardName"></el-input>
                    </td>    
                </tr>
            </tbody>
        </table>
      
    </div>
</template>
<script>
import api from "../api/api.js";
export default {
    data() {
      return {
        displays:true,
        dataS_dis:false,
        display11:true,
        disabled:false,
        disabled1:false,
        P_adds:false,
        search: '',
        tableData1: [
        ],
        selectList:[
            {id:1,name:'主料'},
            {id:2,name:'辅料'},
        ],
        form:{
            categoryId:'',
            categoryName:'',
            unitId:'',
            unitName:'',
            standardId:'',
            standardName:'',
        },
        isMain:'',
        unitId: {},
        materialId: '',
        materialIdc: null,
        unitData:[],
        standardData:[],
        categoryId:'',
        processTemplateNum:'',
        unitNames:'',
        standardNames:'',
        selectGetNmae:'',
        thisAddNum:0,
        thisValue:'',
        Dataid:'',
        material_attribute:'',
        material_attribute1:'',
      };
    },
    props: ['DetailsData','TYPE','flg'],
    watch: {

    },
    created() {
        
        if(this.TYPE){
            //产品
            this.disabled1 = true   
            this.Product_loading(2)
        }else{
            //原料
            this.disabled = true
            this.Material_loading(1);
        }
    },
    computed: {
        tables () {
        const search = this.search
        if (search) {
            return this.tableData1.filter(dataNews => {
            return Object.keys(dataNews).some(key => {
                return String(dataNews[key]).toLowerCase().indexOf(search) > -1
            })
            })
        }
        return this.tableData1
        },
    },
    mounted() {
        this.search = "";
        this.search1 = "";
    },
    methods: {
        Product_loading(id){
            this.P_adds = true;
            let params = {companyId:JSON.parse(sessionStorage.getItem('companyId')),materialType:id}
            api.MaterialManagement_info(params).then(res => {
                if (res.status == 200) {
                    this.tableData1 = res.data
                    this.P_adds = false;
                    let s = this
                    if(!(s.flg==1))
                        this.porps()

                } else if(res.status == 500){
                    this.P_adds = false;
                    this.$message.error("服务器忙！");
                }else{
                    this.P_adds = false;
                    this.$message.error(res.msg);
                }
            });
        },
        Material_loading(id){
            this.P_adds = true;
            let params = {companyId:JSON.parse(sessionStorage.getItem('companyId')),materialType:id}
            api.MaterialManagement_info(params).then(res => {
                if (res.status == 200) {
                    this.tableData1 = res.data
                    this.P_adds = false;
                    let s = this
                    debugger
                    if(!(s.flg==1))
                        this.porps()

                } else if(res.status == 500){
                    this.P_adds = false;
                    this.$message.error("服务器忙！");
                }else{
                    this.P_adds = false;
                    this.$message.error(res.msg);
                }
            });
        },
        format (val) {
            if (val.indexOf(this.search) !== -1 && this.search !== '') {
                return val.replace(this.search, '<span style="color:red">' + this.search + '</span>')
            } else {
                return val
            }
        },
        selectGet(id){
            this.dataS_dis = false;
            this.isMain = id
            this.sbumit(1)
        },
        product_type(e){
            this.dataS_dis = false;
            this.search = e.materialName
            this.material_attribute = "原料"
            this.form = e
        },
        product_type1(e){
            this.dataS_dis = false;
            this.search = e.materialName
            this.material_attribute = "商品"
            this.form = e
            this.sbumit(2)
        },
      fuzzyQuery(obj,str1){
        localStorage.flg = true;
        let newValue = sessionStorage,value = "processing_"+str1+"_details@0",str = '';
        for(var i in newValue){
            if(i!='companyId' && i!='length' &&i!='userId'&&i!='newRoutes'&&i!='userName'){
                if(i == value)
                {
                    var k = i.substr(i.lastIndexOf("@")+1,i.length)
                    var s = value.substr(0,value.indexOf("@")+1)
                    var m = Number(k) +1
                    value = s + m
                }
                else
                {
                    this.thisValue = value
                    sessionStorage.setItem(value, JSON.stringify(obj));
                }
            }
        }
      },
      sbumit(type){
        let obj = {};
        if(type == 2){
            if(this.Dataid)
            obj.id = this.Dataid
            obj.materialId = this.form.id
            if(this.thisAddNum==0){
                this.fuzzyQuery(obj,"Product")   
                this.thisAddNum++
            }else{
                sessionStorage.removeItem(this.thisValue);
                this.fuzzyQuery(obj,"Product")
                this.thisAddNum++
            }
        }else{
            if(this.Dataid)
            obj.id = this.Dataid
            obj.materialId = this.form.id
            if(this.isMain == ""){alert("数据不全！")}else{
                obj.isMain = this.isMain
                if(this.thisAddNum==0){
                    this.fuzzyQuery(obj,"Material")   
                    this.thisAddNum++
                }else{
                    sessionStorage.removeItem(this.thisValue);
                    this.fuzzyQuery(obj,"Material")
                    this.thisAddNum++
                }                
            }
        }
    

      },
      porps(){
        let obj;
        this.materialIdc = this.DetailsData.materialId
        obj = this.tableData1.find((item)=>{
            if(item.id === Number(this.materialIdc))
            return item.id === Number(this.materialIdc)
        });
        this.form = obj;
        this.search = this.form.materialName
        this.Dataid = this.DetailsData.id
        if(this.TYPE){
            //产品
            this.material_attribute = '商品'
             this.sbumit(2)
        }else{
            //原料
            this.material_attribute = '原料'
            this.isMain = this.DetailsData.isMain
             this.sbumit(1)
        }
      }, 
    }
}
</script>
<style scoped lang="scss">
    #processing-details{
        width: 100%;
        .fuzzyQuery_td{
            .dataS{
                position: fixed;
                width: 20%;
                background: #fff;
                height: 6rem;
                left: 17%;
                line-height: 2rem;
                border: 1px solid #ccc;
                border-top: 0;
                z-index: 1111111;
                overflow-y: scroll;
                span{
                    display: block;
                    width: 88%;
                    height: 2rem;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    white-space: nowrap;
                }
            }
        }
    }


</style>
<style>
    #processing_details .dataS_dis_value{
        position: relative;
    }
    #processing_details .fuzzyQuery_td .dataS{
        position: absolute;
        width: 100%;
        background: #fff;
        height: 6rem;
        left: 2%;
        line-height: 2rem;
        border: 1px solid #ccc;
        border-top: 0;
        z-index: 1111111;
        overflow-y: scroll;
    }
    #processing_details .dataS span{
        display: block;
        width: 88%;
        height: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
     #processing_details .dataS>div{
         border-bottom: 1px solid #ccc;
     }
     #processing_details .el-input.is-disabled .el-input__inner {
        background-color: #fff;
        border-color: #d1dbe5;
        color: #1f2d3d;
        cursor: not-allowed;
    }
</style>

