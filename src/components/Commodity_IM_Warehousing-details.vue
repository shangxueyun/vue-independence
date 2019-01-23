<template>
    <div id="Commodity_IM_Warehousing-details" v-loading="P_adds">
        <table>
            <tbody>
                <!-- 原料 -->
                <tr>
                    <td style="width: 10%;">
                        <el-input v-model="search"  class="dataS_dis_value" @focus="dataS_dis=true;dataS_dis1=false;dataS_dis2=false;" placeholder="请输入内容"></el-input>
                        <div class="dataS" v-show="dataS_dis">
                            <div v-for="items in tables" @click="product_type(items)" :key="items.id">
                                <span style="margin-left: 10px" v-html="format(items.materialName)"></span>
                            </div>
                        </div>
                    </td>
                    <td style="width: 10%;">
                        <el-input disabled v-model="material_attribute"></el-input>
                    </td>
                    <td style="width: 10%;" >
                        <el-input disabled v-model="formDate.categoryName"></el-input>
                    </td>
                    <td style="width: 10%;" >
                        <el-input disabled v-model="formDate.unitName"></el-input>
                    </td>
                    <td style="width: 10%;">
                        <el-input disabled v-model="form.saleNum"></el-input>
                    </td>
                    <td style="width: 10%;">
                        <el-input @focus="dataS_dis=false;dataS_dis1=false;" @change="goodsNumF" v-model="form.goodsNum"></el-input>
                    </td>
                    <td style="width: 10%;">
                        <el-input disabled v-model="formDate.standardName"></el-input>
                    </td>
                    <td style="width: 10%;" class="fuzzyQuery_td"><!-- 批次 -->
                        <!-- <el-input disabled @change="purchaseBatchF" v-model="form.purchaseBatch"></el-input> -->
                        <el-input v-model="search2"  class="dataS_dis_value" @focus="dataS_dis=false;dataS_dis1=false;dataS_dis2=true;" placeholder="请输入内容"></el-input>
                        <div class="dataS" v-show="dataS_dis2">
                            <div v-for="items in tables2" @click="product_type2(items.purchaseBatch)" :key="items.id">
                                <span style="margin-left: 10px" v-html="format2(items.purchaseBatch)"></span>
                            </div>
                        </div>
                    </td>
                    <td style="width: 9%;">
                        <!-- <el-input @change="supplierF" v-model="form.supplierName"></el-input>供应商 -->
                        <el-input v-model="search1"  class="dataS_dis_value" @focus="dataS_dis=false;dataS_dis1=true;dataS_dis2=false;" placeholder="请输入内容"></el-input>
                        <div class="dataS" v-show="dataS_dis1">
                            <div v-for="items in tables1" @click="product_type1(items)" :key="items.id">
                                <span style="margin-left: 10px" v-html="format1(items.supplierName)"></span>
                            </div>
                        </div>
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
        search: '',
        search1: '',
        search2: '',
        dataS_dis:false,
        dataS_dis1:false,
        dataS_dis2:false,
        disabled:false,
        disabled1:false,
        P_adds:false,
        tableData1: [],
        tableData2: [],
        tableData3: [],
        formDate:{
            categoryId:'',
            categoryName:'',
            unitId:'',
            unitName:'',
            standardId:'',
            standardName:'',
            saleNum:'',
            purchaseBatch:'',
            supplierId:'',
            supplierName:''
        },
        form:{
            saleNum:'',
            goodsNum:'',
            purchaseBatch:'',
            supplierId:'',
            supplierName:''
        },
        materialIdc: null,
        thisAddNum:0,
        thisValue:'',
        material_attribute:'',
        id:'',
      };
    },
    props: ['DetailsData','TYPE','Edits'],
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
        tables1 () {
        const search1 = this.search1
        if (search1) {
            return this.tableData2.filter(dataNews => {
            return Object.keys(dataNews).some(key => {
                return String(dataNews[key]).toLowerCase().indexOf(search1) > -1
            })
            })
        }
        return this.tableData2
        },
        tables2 () {
        const search2 = this.search2
        if (search2) {
            return this.tableData3.filter(dataNews => {
            return Object.keys(dataNews).some(key => {
                return String(dataNews[key]).toLowerCase().indexOf(search2) > -1
            })
            })
        }
        return this.tableData3
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
                    this.P_adds = true;
                    let params = {companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                    api.SupplierManagement_info(params).then(res => {
                        if (res.status == 200) {
                            this.tableData2 = res.data
                            this.P_adds = false;
                            this.P_adds = true;
                            let params = {companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                            api.ProcessingAndWarehousing_info(params).then(res => {
                                if (res.status == 200) {
                                    this.tableData3 = res.data
                                    this.P_adds = false;
                                    let s = this;
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

                        } else if(res.status == 500){
                            this.P_adds = false;
                            this.$message.error("服务器忙！");
                        }else{
                            this.P_adds = false;
                            this.$message.error(res.msg);
                        }
                    });
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
        format1 (val) {
            if (val.indexOf(this.search1) !== -1 && this.search1 !== '') {
                return val.replace(this.search1, '<span style="color:red">' + this.search1 + '</span>')
            } else {
                return val
            }
        },
        format2 (val) {
            if (val.indexOf(this.search2) !== -1 && this.search2 !== '') {
                return val.replace(this.search2, '<span style="color:red">' + this.search2 + '</span>')
            } else {
                return val
            }
        },
        product_type(e){
            this.dataS_dis = false;
            this.search = e.materialName
            if(e.materialType == 1){this.material_attribute ='原料'}else{this.material_attribute ='商品'}
            this.formDate = e
            this.sbumit()
        },
        product_type1(e){
            this.dataS_dis1 = false;
            this.search1 = e.supplierName
            this.form.supplierId = e.id
            this.form.supplierName = e.supplierName
            this.sbumit()
        },
        product_type2(e){
            this.dataS_dis2 = false;
            this.search2 = e
            this.form.purchaseBatch = e
            this.sbumit()
        },
        goodsNumF(){
            this.sbumit()
        },
        purchaseBatchF(){
            this.sbumit();
        },
        supplierF(){

        },
      fuzzyQuery(obj){
        localStorage.flg = true;
        let newValue = sessionStorage,value = "OutboundGoods-details@0",str = '';
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
        obj.materialId = this.formDate.id

        if(this.id)
        obj.id = this.id
        //for(var i in this.form){if(this.form[i] == ""){alert('数据不全！');return}}
        obj.saleNum = this.form.saleNum
        obj.goodsNum = this.form.goodsNum
        obj.purchaseBatch = this.form.purchaseBatch
        obj.supplierId = this.form.supplierId
        obj.supplierName = this.form.supplierName
        if(this.thisAddNum==0){
            this.fuzzyQuery(obj,'')   
            this.thisAddNum++
        }else{
            sessionStorage.removeItem(this.thisValue);
            this.fuzzyQuery(obj,'')
            this.thisAddNum++
        }   
      },
      porps(){
        debugger
        let obj;
        this.materialIdc = this.DetailsData.materialId
        obj = this.tableData1.find((item)=>{
            if(item.id === Number(this.materialIdc))
            return item.id === Number(this.materialIdc)
        });
        this.formDate = obj;
        this.search = this.formDate.materialName
        if(obj.materialType == 1){this.material_attribute ='原料'}else{this.material_attribute ='商品'}
        this.form.saleNum = this.DetailsData.saleNum
        if(this.Edits){
            this.id = this.DetailsData.id
            this.form.saleNum = this.DetailsData.saleNum
            this.form.goodsNum = this.DetailsData.goodsNum
            this.form.purchaseBatch = this.DetailsData.purchaseBatch
            this.form.supplierId = this.DetailsData.supplierId
            this.form.supplierName = this.DetailsData.supplierName
            this.search2 = this.DetailsData.purchaseBatch
            this.search1 = this.DetailsData.supplierName
        }
        this.sbumit();
      },
    }
}
</script>
<style>
    .dataS_dis_value{
        position: relative;
    }
    
    #Commodity_IM_Warehousing-details .dataS{
        position: absolute;
        width: 10%;
        background: #fff;
        height: 6rem;
        line-height: 2rem;
        border: 1px solid #ccc;
        border-top: 0;
        z-index: 1111111;
        overflow-y: scroll;
    }
    #Commodity_IM_Warehousing-details .dataS span{
        display: block;
        width: 88%;
        height: 2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }
     #Commodity_IM_Warehousing-details .dataS>div{
         border-bottom: 1px solid #ccc;
     }
     #Commodity_IM_Warehousing-details .el-input.is-disabled .el-input__inner {
        background-color: #fff;
        border-color: #d1dbe5;
        color: #1f2d3d;
        cursor: not-allowed;
    }
</style>

