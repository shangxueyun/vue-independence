<template>
    <div id="purchase-details" v-loading="P_adds">
        <table>
            <tbody>
                <!-- 原料 -->
                <tr>
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
                        <el-input disabled v-model="form.unitName"></el-input>
                    </td>
                    <td style="width: 17%;" class="fuzzyQuery_td">
                        <el-input @blur="purchaseInOrderNumF" v-model="purchaseInOrderNum"></el-input>
                    </td>
                    <td style="width: 17%;">
                        <el-input disabled v-model="form.standardName"></el-input>
                    </td>
                    <td style="width: 15%;">
                        <el-input @blur="quarantineNoF" v-model="quarantineNo"></el-input>
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
        quarantineNo:'',
        purchaseInOrderNum:'',
        materialIdc: null,
        thisAddNum:0,
        thisValue:'',
        material_attribute:'',
        id:'',
      };
    },
    props: ['DetailsData','TYPE'],
    watch: {

    },
    created() {
        this.Material_loading();
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
        Material_loading(){
            this.P_adds = true;
            let params = {companyId:JSON.parse(sessionStorage.getItem('companyId'))}
            api.MaterialManagement_info(params).then(res => {
                if (res.status == 200) {
                    this.tableData1 = res.data
                    this.P_adds = false;
                    let s = this
                    debugger
                    if(!(s.TYPE==1))
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
        quarantineNoF(){
            if(this.purchaseInOrderNum == "")
            alert("数量不能为空！")
            this.sbumit(this.form.isImportQuarantine)
        },
        purchaseInOrderNumF(){
            this.sbumit();
        },
        product_type(e){
            this.dataS_dis = false;
            this.search = e.materialName
            if(e.materialType == 1){this.material_attribute ='原料'}else{this.material_attribute ='商品'}
            this.form = e
            this.sbumit(e.isImportQuarantine)
        },
      fuzzyQuery(obj,str1){
        localStorage.flg = true;
        let newValue = sessionStorage,value = "purchase_details@0",str = '';
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
      sbumit(flg){
        let obj = {};
        obj.materialId = this.form.id
        if(flg){
            if(this.id)
            obj.id = this.id
            if(this.quarantineNo == ""){alert("请输入检验检疫证号！")}else{
                obj.quarantineNo = this.quarantineNo
                obj.purchaseInOrderNum = this.purchaseInOrderNum
                if(this.thisAddNum==0){
                    this.fuzzyQuery(obj,'')   
                    this.thisAddNum++
                }else{
                    sessionStorage.removeItem(this.thisValue);
                    this.fuzzyQuery(obj,'')
                    this.thisAddNum++
                }                
            }            
        }else{
            if(this.id)
            obj.id = this.id
            obj.quarantineNo = this.quarantineNo
            obj.purchaseInOrderNum = this.purchaseInOrderNum
            if(this.thisAddNum==0){
                this.fuzzyQuery(obj,'')   
                this.thisAddNum++
            }else{
                sessionStorage.removeItem(this.thisValue);
                this.fuzzyQuery(obj,'')
                this.thisAddNum++
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
        this.quarantineNo = this.DetailsData.quarantineNo
        if(obj.materialType == 1){this.material_attribute ='原料'}else{this.material_attribute ='商品'}
        this.purchaseInOrderNum = this.DetailsData.purchaseInOrderNum
        this.id = this.DetailsData.id
        this.sbumit();
      },
    }
}
</script>
<style scoped lang="scss">
</style>
<style>
    .dataS_dis_value{
        position: relative;
    }
    
    #purchase-details .fuzzyQuery_td .dataS{
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
    #purchase-details .dataS span{
        display: block;
        width: 88%;
        height: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
     #purchase-details .dataS>div{
         border-bottom: 1px solid #ccc;
     }
     #purchase-details .el-input.is-disabled .el-input__inner {
        background-color: #fff;
        border-color: #d1dbe5;
        color: #1f2d3d;
        cursor: not-allowed;
    }
</style>

