<template>
	<div id="ProcessingAndWarehousing" v-loading="P_adds">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="padding:1.5rem">
          <el-col :md="12" :lg="6" :span="6" style="">
            <el-input class="m-lg-7" style="width:64%" placeholder="请输入出库单号"></el-input>
            <el-button size="medium" class="mr m-lg-4 header_button"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="12" :lg="6" :span="6">
            <el-input class="m-lg-7" style="width:64%" placeholder="请输入供应商名称"></el-input>
            <el-button size="medium" class="mr m-lg-4 header_button"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="12" :lg="8" :span="8">
            <el-date-picker
              class="m-lg-8"
              v-model="Times_search"
              type="datetimerange"
              range-separator="   -   "
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              format="yyyy-MM-dd hh:mm"
               style="width:56%;">
            </el-date-picker>
            <el-button size="medium" class="mr m-lg-3 header_button"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="12" :lg="4" :span="4">
            <el-button style="float: right;" size="medium" class="mr header_button_a" @click="add(Add_New_Users_Visible)"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #F4F4F4;width:100%;margin-top: 1.5rem;">
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">入库批次</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">供应商</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">入库时间</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">状态 </th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">操作</th>  
                      </tr>
                    </thead>
                    <tbody> 
                      <tr v-for="items in tableData" ref="table_tr">
                        <td><div class="cell">{{ items.purchaseBatch }}</div></td>
                        <td><div class="cell">{{ items.supplierName }}</div></td>
                        <td><div class="cell">{{ items.createTime.replace('T'," ").replace('.000+0000'," ") }}</div></td>
                        <td><div class="cell">{{ items.status }}</div></td>
                        <td><div class="cell" :idvalue="items.id">
                          <button class="List_button_cz" v-show="ButtonShow(items.status)" :idvalue="items.id" @click="Edit($event)"><i :idvalue="items.id" class="el-icon-edit"></i></button>
                          <button class="List_button_cz document" v-show="items.status=='待审核'" :idvalue="items.id" @click="Audit($event)"><i class="el-icon-document"></i></button>
                          <button class="List_button_cz delete" v-show="ButtonShow(items.status)" :idvalue="items.id" @click="Delete($event)"><i class="el-icon-delete"></i></button>
                          <button class="List_button_cz circle" v-show="items.status=='审核中'" :idvalue="items.id" @click="Anti_Audit($event)"><i class="el-icon-circle-check"></i></button>
                           </div></td>
                      </tr>
                    </tbody>
                </table>
                <div class="block">
                  总共{{ footer_Num }}条记录&nbsp;&nbsp;当前第{{ pageNum }}页
                  <el-pagination
                    @current-change="handleSizeChange"
                    layout="prev, pager, next"
                    :total="PagesNumber"
                    @prev-click="handleSizeChange"
                    @next-click="handleSizeChange"
                    >
                  </el-pagination>
                </div>
          </el-col>
        </el-card>
        <el-dialog
          v-loading="P_adds"
          title="新增采购入库单"
          :visible.sync="Add_New_Users_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="Add_form" label-width="100px">
            <el-form-item label="供应商:" style="width: 32%;float: left;margin-right:.5rem">
              <el-input v-model="search"  class="dataS_dis_value" @focus="dataS_dis=true;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis">
                  <div v-for="items in tables" :key="items.id" @click="product_type(items)">
                      <span style="margin-left: 10px" v-html="format(items.supplierName)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-form-item label="入库日期:" style="width: 32%;float: left;">
              <el-date-picker @change="Add_showTimes" v-model="Add_materialInTime" type="datetime" format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="入库批次:" style="width: 32%;float:right ;">
              <el-input disabled @focus="dataS_dis1=false" v-model="Add_form.purchaseBatch"></el-input>
            </el-form-item>
            <el-card class="box-card" style="width: 100%;">
              <div slot="header" class="clearfix">
                <span style="font-size: 16px;font-weight: bold;color: #2C3E50;">采购入库单明细</span>
                <div class="button_list">
                  <el-button type="primary" @click="add_ProcessingDetails_add"><i class="el-icon-plus"></i></el-button>
                  <el-button type="primary" @click="add_ProcessingDetails_Del"><i class="el-icon-delete"></i></el-button>
                </div>

              </div>
              <div class="text item" style="border: 1px solid #d1dbe5;">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;width:100%"> 
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:15%" rowspan="1">物料名称</th>
                        <th colspan="1" style="text-align:center;width:15%" rowspan="1">属性</th>
                        <th colspan="1" style="text-align:center;width:15%" rowspan="1">单位</th>
                        <th colspan="1" style="text-align:center;width:15%" rowspan="1">数量</th>
                        <th colspan="1" style="text-align:center;width:15%" rowspan="1">规格</th>
                        <th colspan="1" style="text-align:center;width:15%" rowspan="1">检验检疫证号</th>
                      </tr>
                    </thead>
                </table>
                <div style="height: 18rem;overflow-y: scroll;">
                  <div  v-for="items in Add_DetailsData">
                    <purchase-details :TYPE="items.id"></purchase-details>
                  </div>
                </div>
              </div>
            </el-card>
            <el-form-item class="footer_button">
              <div class="div_P">
                <div>操作员：陈冰/操作时间：2018-10-23 12:32:01 </div>
                <div>审核员：周丽 /审核时间：2018-10-23 15:44:33</div>
                <div>发货员：陈冰/发货时间：2018-10-24 15:22:01</div>
              </div>
              <el-button @click="ProcessingAndWarehousing_addsP()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        
        <el-dialog
          v-loading="ALTER_USER"
          title="修改采购入库单信息"
          :visible.sync="ALTER_USER_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="Edits_form" label-width="100px">
            <el-form-item label="供应商:" style="width: 32%;float: left;margin-right:.5rem">
              <el-input v-model="search"  class="dataS_dis_value" @focus="dataS_dis=true;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis">
                  <div v-for="items in tables" :key="items.id" @click="product_type(items)">
                      <span style="margin-left: 10px" v-html="format(items.supplierName)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-form-item label="入库日期:" style="width: 32%;float: left;">
              <el-date-picker @change="Edits_showTimes" v-model="Edits_materialInTime" type="datetime" format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="入库批次:" style="width: 32%;float:right ;">
              <el-input disabled @focus="dataS_dis1=false" v-model="Edits_form.purchaseBatch"></el-input>
            </el-form-item>
            <el-card class="box-card" style="width: 100%;">
              <div slot="header" class="clearfix">
                <span style="font-size: 16px;font-weight: bold;color: #2C3E50;">采购入库单明细</span>
                <div class="button_list">
                  <el-button type="primary" @click="Edits_ProcessingDetails_add"><i class="el-icon-plus"></i></el-button>
                  <el-button type="primary" @click="Edits_ProcessingDetails_Del"><i class="el-icon-delete"></i></el-button>
                </div>

              </div>
              <div class="text item" style="border: 1px solid #d1dbe5;">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;width:100%"> 
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:15%" rowspan="1">物料名称</th>
                        <th colspan="1" style="text-align:center;width:15%" rowspan="1">属性</th>
                        <th colspan="1" style="text-align:center;width:15%" rowspan="1">单位</th>
                        <th colspan="1" style="text-align:center;width:15%" rowspan="1">数量</th>
                        <th colspan="1" style="text-align:center;width:15%" rowspan="1">规格</th>
                        <th colspan="1" style="text-align:center;width:15%" rowspan="1">检验检疫证号</th>
                      </tr>
                    </thead>
                </table>
                <div style="height: 18rem;overflow-y: scroll;">
                  <div  v-for="items in Edits_DetailsData">
                    <purchase-details :DetailsData="items" :TYPE="items.id"></purchase-details>
                  </div>
                </div>
              </div>
            </el-card>
            <el-form-item class="footer_button">
              <div class="div_P">
                <div>操作员：陈冰/操作时间：2018-10-23 12:32:01 </div>
                <div>审核员：周丽 /审核时间：2018-10-23 15:44:33</div>
                <div>发货员：陈冰/发货时间：2018-10-24 15:22:01</div>
              </div>
              <el-button @click="ProcessingAndWarehousing_EditsP()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

      </el-row>
    </el-row>
	</div>

</template>

<script>
import api from "../../api/api.js";
import purchaseDetails from "../../components/purchase-details.vue"
  export default {
    components: {
      purchaseDetails,
    },
    data() {
      return {
          tableData: [
            
          ],
          Times_search:[new Date(),new Date()],
          footer_Num:'85',
          pageNum:'',
          Add_New_Users_Visible: false,
          ALTER_USER_Visible: false,
          P_adds:false,
          P_adds:false,
          ALTER_USER:false,
          Userdispaly:false,

          dataS_dis:false,
          search: '',
          tableData1:[],
          Add_form: {
            supplierId:'',
            supplierName:'',
            purchaseBatch: '',
          },
          Add_materialInTime:'',
          Edits_materialInTime:'',
          Edits_form: {
            supplierId:'',
            supplierName:'',
            purchaseBatch: '',
          },
          OrderId:'',
          companyId:"",
          addEdits:'',
          User:{
              username:'',
              password:'',
          },
          PagesNumber:10,
          selectList:[
            {id:3,name:'审核通过'},
            {id:1,name:'待审核'},
            {id:2,name:'审核中'},
          ],

          Add_DetailsData:[],
          Edits_DetailsData:[],
          materialInTime:'',
          add_processTemplateDetails :[],
          
      };
    },
    created() {
        this.SessionStorageDisposeDel();
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
        let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
        this.pageNum = params.pageNum;
        this.ProcessingAndWarehousing_info(params)
        this.Add_materialInTime = this.Date_day();
    },
    methods: {
      selectGet(vId){
        let obj = {};
        obj = this.selectList.find((item)=>{
            if(item.id === vId)
            return item.id === vId
        });
        this.Classification = obj.id
      },
      format (val) {
          if (val.indexOf(this.search) !== -1 && this.search !== '') {
              return val.replace(this.search, '<span style="color:red">' + this.search + '</span>')
          } else {
              return val
          }
      },
      product_type(e){
          this.dataS_dis = false;
          this.search = e.supplierName
          this.Add_form.supplierId = e.id
          this.Add_form.supplierName = e.supplierName
      },
      Add_showTimes(val){
          this.Add_materialInTime = val
          this.Add_form.purchaseBatch = val.replace(/:/g,"").replace(/-/g,"").replace(/ /g,"")
      },
      Edits_showTimes(val){
          this.Edits_materialInTime = val
      },
      ButtonShow(str){
        switch(str){
          case '已收货':
                return true;
          case '已发货':
                return true;
          case '未发货':
                return true;
          case '待审核':
                return true;
          case '审核中':
                return true;
          default:
                return false;
        }
      },
      //时间格式
      Date_day(){ 
          let objD = new Date();  
          var yy = objD.getYear();   
              if(yy<1900) yy = yy+1900;   
          var MM = objD.getMonth()+1;   
              if(MM<10) MM = '0' + MM;   
          var dd = objD.getDate();   
              if(dd<10) dd = '0' + dd;   
          var hh = objD.getHours();   
              if(hh<10) hh = '0' + hh;   
          var mm = objD.getMinutes();   
              if(mm<10) mm = '0' + mm;   
          var ss = objD.getSeconds();   
              if(ss<10) ss = '0' + ss;
          var ms = objD.getMilliseconds();
          return(yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss + ":" +ms);   
      },
      add_ProcessingDetails_add(){
        let obj = {id:1}
        this.Add_DetailsData.push(obj)
      },
      add_ProcessingDetails_Del(){
        this.Add_DetailsData.pop()
      },
      Edits_ProcessingDetails_add(){
        let obj = {id:1}
        this.Edits_DetailsData.push(obj)
      },
      Edits_ProcessingDetails_Del(){
        let obj = this.Edits_DetailsData.pop()
        this.P_adds = true
        api.ProcessingAndWarehousing_infoChild_Delete(obj).then(res => {
            if (res.status == 200) {
                this.P_adds = false
            } else if(res.status == 500){
                this.P_adds = false
                this.$message.error("服务器忙！");
            }else{
              this.P_adds = false
              if(res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
              else
              this.$message.error(res.msg);
            }
        }); 
      },
      handleSizeChange(done){
        let params = {pageNum:done.toString(),pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
        this.pageNum = done.toString();
        this.ProcessingAndWarehousing_info(params)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.SessionStorageDisposeDel();
            let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
            this.pageNum = params.pageNum;
            this.ProcessingAndWarehousing_info(params)
            done();
          })
          .catch(_ => {});
      },
      ProcessingAndWarehousing_info(params){
        this.P_adds = true
        api.ProcessingAndWarehousing_info(params).then(res => {
            
            if (res.status == 200) {
              this.footer_Num = Number(res.total)
              this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
                res.data.forEach((v,i)=>{for(var j in v){
                  if(j == "status"){
                    if(v[j]==1){v[j]='待审核'}else if(v[j]==2){v[j]='审核中'}else{v[j]='审核通过'}
                  }
                }});
                this.tableData = res.data
                //数据重置
                this.SessionStorageDisposeDel();
                this.Add_DetailsData = []
                this.Edits_DetailsData = []

                this.P_adds = false
            } else if(res.status == 500){
                this.P_adds = false
                this.$message.error("服务器忙！");
            }else{
              this.P_adds = false
              if(res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
              else
              this.$message.error(res.msg);
            }
        }); 
      },
      ProcessingAndWarehousing_adds(obj){
          let objstring = JSON.stringify(obj);
          this.P_adds = true
          debugger
          //新增
          api.ProcessingAndWarehousing_adds(objstring).then(res => {
              debugger
              if (res.status == 200) {
                  this.$message({
                    message: "创建"+res.msg,
                    type: 'success'
                  });
                  let forms = this.Add_form;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.Add_form = forms
                  this.Add_New_Users_Visible = false; 
                  this.P_adds = false
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                  this.pageNum = params.pageNum;
                  this.ProcessingAndWarehousing_info(params)
            } else if(res.status == 500){
              this.P_adds = false
              this.$message.error("服务器忙！");
            }else{
              this.P_adds = false
              if(res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
              else
              this.$message.error(res.msg);
            }
          });   
      },
      ProcessingAndWarehousing_addsP(){
        this.add_processTemplateDetails = this.SessionStorageDisposeInfo();
        debugger
        if(this.Add_form.supplierId == "" 
        || this.Add_form.supplierName == "" 
        || this.Add_form.purchaseBatch == "" 
        || this.Add_materialInTime == "" ){alert("数据不全")}
        else{
              let objs = {} 
              objs.companyId = JSON.parse(sessionStorage.getItem('companyId'))
              objs.supplierId = this.Add_form.supplierId
              objs.supplierName = this.Add_form.supplierName
              objs.purchaseBatch = this.Add_form.purchaseBatch
              objs.purchaseTime = this.Add_materialInTime
              objs.purchaseInOrderDetails = this.SessionStorageDisposeInfo()
              this.add_New_Nsers = true;
              this.ProcessingAndWarehousing_adds(objs)
        }
      },
      SessionStorageDisposeDel(){
        let str = "purchase_details";
        for(var i in sessionStorage){
          if(i.indexOf(str)==0)
          {
            sessionStorage.removeItem(i)
          }
        }
        localStorage.flg = undefined
      },
      SessionStorageDisposeInfo(){
        
        let str = "purchase_details",obj =[];
        for(var i in sessionStorage){
          if(i.indexOf(str)==0)
          {
            
            obj.push(JSON.parse(sessionStorage[i]))
          }
        }
        return obj
      },
      ProcessingAndWarehousing_Edits(objs){
          let objstring = JSON.stringify(objs);
          this.P_adds = true
          //修改
          api.ProcessingAndWarehousing_Edits(objstring).then(res => {

              if (res.status == 200) {
                  this.$message({
                    message: "修改"+res.msg,
                    type: 'success'
                  });
                  let forms = this.form;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.form = forms
                  this.ALTER_USER_Visible = false; 
                  this.P_adds = false
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                  this.pageNum = params.pageNum;
                  this.ProcessingAndWarehousing_info(params)
            } else if(res.status == 500){
              this.P_adds = false
              this.$message.error("服务器忙！");
            }else{
              this.P_adds = false
              if(res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
              else
              this.$message.error(res.msg);
            }
          });
      },
      ProcessingAndWarehousing_EditsP(){
        
        if(this.Edits_form.supplierId == "" 
        || this.Edits_form.supplierName == "" 
        || this.Edits_form.purchaseBatch == "" 
        || this.Edits_materialInTime == "" ){alert("数据不全")}
        else{
              let objs = {} 
              objs.companyId = JSON.parse(sessionStorage.getItem('companyId'))
              objs.supplierId = this.Edits_form.supplierId
              objs.id = this.OrderId
              objs.supplierName = this.Edits_form.supplierName
              objs.purchaseBatch = this.Edits_form.purchaseBatch
              objs.purchaseTime = this.Edits_materialInTime
              objs.purchaseInOrderDetails = this.SessionStorageDisposeInfo()
              this.add_New_Nsers = true;
              this.ProcessingAndWarehousing_Edits(objs)
        }
      },
      add(){
          let forms = this.Add_form;
          for(var i in forms){
            forms[i] = "";
          }
          this.Add_form = forms;
          this.Add_New_Users_Visible = true;
          this.search = "";
          //批次
          debugger
          this.Add_form.purchaseBatch = this.Date_day().replace(/:/g,"").replace(/-/g,"").replace(/ /g,"")
          this.P_adds = true
          let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
          api.SupplierManagement_info(params).then(res => {
              if (res.status == 200) {
                  this.tableData1 = res.data;
                  this.P_adds = false
              } else if(res.status == 500){
                  this.P_adds = false
                  this.$message.error("服务器忙！");
              }else{
                this.P_adds = false
                if(res.msg == undefined || res.msg == "")
                this.$message.error("服务器忙！");
                else
                this.$message.error(res.msg);
              }
          }); 
          //this.Add_form.purchaseInOrderNo = this.Date_day().replace(/:/g,"").replace(/-/g,"").replace(/ /g,"")+Math.floor(Math.random()*100000);
      },
      Edit(e){
          let OrderId,_this = this,obj={},listData;
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                if(i == "value"){OrderId = attr[i]}
              }
            }
          });
          obj = _this.tableData.find((item)=>{
              if(item.id === Number(OrderId))
              return item.id === Number(OrderId)
          });
          this.ALTER_USER_Visible = true;
          this.Edits_form.purchaseBatch = obj.purchaseBatch
          this.Edits_form.supplierId = obj.supplierId
          this.Edits_form.supplierName = obj.supplierName
          this.search = obj.supplierName;
          this.Edits_materialInTime = obj.createTime.replace('T'," ").replace('.000+0000',"")
          this.OrderId = OrderId;
          this.P_adds = true
          this.Edits_DetailsData = []
          this.Edits_DetailsData.pop()
          api.ProcessingAndWarehousing_infoChild({purchaseInOrderId: OrderId}).then(res => {
              if (res.status == 200) {
                  let arry = [],obj={},obj1={},obj2={};
                  for(var i in res.data)
                  {  
                    this.Edits_DetailsData.push(res.data[i])
                  }
                  this.P_adds = false
              } else if(res.status == 500){
                this.P_adds = false
                this.$message.error("服务器忙！");
              }else{
                this.P_adds = false
                if(res.msg == undefined || res.msg == "")
                this.$message.error("服务器忙！");
                else
                this.$message.error(res.msg);
              }
          }); 
      },
      Delete(e) {
          this.Userdispaly = true;
          let OrderId,_this = this,obj={};
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                if(i == "value"){
                  OrderId = attr[i];
                  debugger
                    this.$confirm('确认删除？')
                    .then(_ => {
                      this.P_adds = true
                        api.ProcessingAndWarehousing_Delete({id: OrderId}).then(res => {
                            
                            if (res.status == 200) {
                                this.$message({
                                  message: "删除"+res.msg,
                                  type: 'success'
                                });
                                this.P_adds = false
                                let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                                this.pageNum = params.pageNum;
                                this.ProcessingAndWarehousing_info(params)
                            } else if(res.status == 500){
                              this.P_adds = false
                              this.$message.error("服务器忙！");
                            }else{
                              this.P_adds = false
                              if(res.msg == undefined || res.msg == "")
                              this.$message.error("服务器忙！");
                              else
                              this.$message.error(res.msg);
                            }
                        }); 
                    })
                    .catch(_ => {});
                }
              }
            }
          });
      },
      Audit(e) {
          this.Userdispaly = true;
          let OrderId,_this = this,obj={};
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                if(i == "value"){
                  OrderId = attr[i];
                  debugger
                    this.$confirm('确认状态修改？')
                    .then(_ => {
                      this.P_adds = true;
                        api.ProcessingAndWarehousing_status({id: OrderId,status:2}).then(res => {
                            if (res.status == 200) {
                              this.P_adds = false;
                                this.$message({
                                  message: "状态修改"+res.msg,
                                  type: 'success'
                                });
                                let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                                this.pageNum = params.pageNum;
                                this.ProcessingAndWarehousing_info(params)
                            } else if(res.status == 500){
                              this.P_adds = false;
                              this.$message.error("服务器忙！");
                            }else{
                              this.P_adds = false;
                              if(res.data.msg == undefined || res.data.msg == "")
                                this.$message.error("服务器忙！");
                                else
                                this.$message.error(res.data.msg);
                            }
                        }); 
                    })
                    .catch(_ => {});
                }
              }
            }
          });
      },
      Anti_Audit(e) {
          this.Userdispaly = true;
          let OrderId,_this = this,obj={};
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                if(i == "value"){
                  //删除ID
                  OrderId = attr[i];
                  debugger
                    this.$confirm('确认状态修改？')
                    .then(_ => {
                      this.P_adds = true;
                        api.ProcessingAndWarehousing_status({id: OrderId,status:1}).then(res => {
                            if (res.status == 200) {
                              this.P_adds = false;
                                this.$message({
                                  message: "状态修改"+res.msg,
                                  type: 'success'
                                });
                                let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                                this.pageNum = params.pageNum;
                                this.ProcessingAndWarehousing_info(params)
                            } else if(res.status == 500){
                              this.P_adds = false;
                              this.$message.error("服务器忙！");
                            }else{
                              this.P_adds = false;
                              if(res.data.msg == undefined || res.data.msg == "")
                                this.$message.error("服务器忙！");
                                else
                                this.$message.error(res.data.msg);
                            }
                        }); 
                    })
                    .catch(_ => {});
                }
              }
            }
          });
      },
    },
  }

</script>
<style>
  .el-row {
    margin-bottom: 20px;

  }
  .el-col {
    border-radius: 4px;
  }
  .bg-purple-dark {
    background: #99a9bf;
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
      
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .container_padding{
    margin: 1rem 0;
    padding: 1rem;  
    background: #fff;
  }
   .el-row .bj{
    background: transparent;
    padding: 0;
    margin: 0;
   }
   .mr{
     margin-left: 1rem;
   }
   .container_padding select{
    width: 6rem;
    height: 2.3rem;
    text-align: center;
    padding-left: 1.5rem;
    border-radius: 0.4rem;
    border: 0;
    background: #20a0ff;
    color: #ffff;
    outline: 0;
   }
   .el-card__body{
     padding: 0;
   }
   .el-table--fit{
      padding: 10px 20px 0px 20px;
   }
   #ProcessingAndWarehousing .el-dialog--small{
        width: 60%;
   }
      /* 分页 */
   #ProcessingAndWarehousing .block{
    float: none;
    padding-top: 1rem;
    text-align: center;
    display: flex;
    line-height: 2rem;
    font-size: 14px;
    color: #999999;
    flex-direction: row;
    justify-content: center;
   }

    #ProcessingAndWarehousing .List_button_cz{
    background: #92CC8F;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
   }
   #ProcessingAndWarehousing .cell .delete{
     background: #E74C3C
   }
   #ProcessingAndWarehousing .cell .document{
     background: #70C8CB
   }
  #ProcessingAndWarehousing .cell .circle{
     background: #EF948B
   }
  #ProcessingAndWarehousing .cell .message{
     background: #E74C3C
   }
   #ProcessingAndWarehousing .block .el-pagination{
     padding-left: 1rem;
   }
   #ProcessingAndWarehousing .container_padding th{
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
   }
   #ProcessingAndWarehousing .container_padding th:first-child{
     border-left: 0;
   }
   #ProcessingAndWarehousing .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }
   #ProcessingAndWarehousing .container_padding td:first-child{
     padding-left: 1px;
   }
   #ProcessingAndWarehousing .container_padding tr:nth-child(2n+1){
     background: #F9F9F9
   }
  #ProcessingAndWarehousing .container_padding tr:nth-child(2n+1) td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }

  #ProcessingAndWarehousing .select_top{
    position: relative;
    width: 100%;
    float: left;
    padding-top: 2rem;
  }
  #ProcessingAndWarehousing .select_top span{
    display: block;
    float: left;
    line-height: 2rem;
    margin-right: 0.8rem;
  }
  #ProcessingAndWarehousing .select_top .el-input{
    width: 48%;
    line-height: 1.8rem;
    border-radius: .2rem;
    outline: 0;
  }
  #ProcessingAndWarehousing .box-card::-webkit-scrollbar {
      width: 0px;
  }
  #ProcessingAndWarehousing .box-card th{
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    font-weight: 400;
  }
  #ProcessingAndWarehousing .box-card th:first-child{
    border-left: 0;
  }
  #ProcessingAndWarehousing .box-card td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
  }
  #ProcessingAndWarehousing .box-card td:first-child{
    padding-left: 1px;
  }
  #ProcessingAndWarehousing .box-card .button_div{
    padding: .5rem;
  }
  #ProcessingAndWarehousing .el-date-editor.el-input {
      width: 100%;
  }
  #ProcessingAndWarehousing .text th{
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }
  .dataS_dis_value{
    position: relative;
  }

  #ProcessingAndWarehousing .dataS{
      position: absolute;
      width: 100%;
      background: #fff;
      height: 6rem;
      line-height: 2.5rem;
      border: 1px solid #ccc;
      border-top: 0;
      z-index: 1111111;
      overflow-y: scroll;
  }
  #ProcessingAndWarehousing .dataS span{
      display: block;
      width: 88%;
      height: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
  #ProcessingAndWarehousing .dataS>div{
    border-bottom: 1px solid #ccc;
  }
  
  #ProcessingAndWarehousing .el-dialog__header {
      padding: 1.5rem 1.5rem;
      background: #2C3E50;
  }
  #ProcessingAndWarehousing .el-dialog__title{
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
  #ProcessingAndWarehousing .el-dialog__body{
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }
  /* !important */
  #ProcessingAndWarehousing .footer_button{
    position: absolute;
    margin: 0;
    width: 100%;
    height: 5.8rem;
    left: 0;
    background: #EDF2F8;
    bottom: 0;
  }
  #ProcessingAndWarehousing .footer_button .el-form-item__content{
      margin-left:0 !important;
      min-height: 5.8rem;
      text-align: center;
  }
  #ProcessingAndWarehousing .footer_button .div_P{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: .3rem;
  }
  #ProcessingAndWarehousing .div_P div{
    color: #9C9C9C;
    font-size: 14px;
  }
  #ProcessingAndWarehousing .footer_button .el-button{
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2C3E50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
  #ProcessingAndWarehousing .footer_button .el-button:hover{
    border: 1px solid #3b5168;
    background: #3b5168;
  }
  #ProcessingAndWarehousing .header_button {
    width: 86px;
    background: #2C3E50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #ProcessingAndWarehousing .header_button:hover{
    border: 1px solid transparent;
  }
  #ProcessingAndWarehousing .header_button_a{
    width: 86px;
    background: #47A136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #ProcessingAndWarehousing .header_button_a:hover{
    border: 1px solid transparent;
  }
  #ProcessingAndWarehousing .el-card__header {
    padding: 0 20px;
    line-height: 4rem;
  }
  #ProcessingAndWarehousing .button_list{
    float: right;
  }
  #ProcessingAndWarehousing .button_list button{
    background-color: #92CC8F;
    border-color: #92CC8F;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #ProcessingAndWarehousing .button_list button:last-child{
    background-color: #E74C3C;
    border-color: #E74C3C;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }




@media screen and (min-width: 1200px) and (max-width: 1680px){
  #ProcessingAndWarehousing .m-lg-1{
    width: 8.33% !important;
  }
  #ProcessingAndWarehousing .m-lg-2{
    width: 16.66% !important;
  }
  #ProcessingAndWarehousing .m-lg-3{
    width: 25% !important;
  }
  #ProcessingAndWarehousing .m-lg-4{
    width: 33.33% !important;
  }
  #ProcessingAndWarehousing .m-lg-5{
    width: 41.66% !important;
  }
  #ProcessingAndWarehousing .m-lg-6{
    width: 49.98% !important;
  }
  #ProcessingAndWarehousing .m-lg-7{
    width: 58.31% !important;
  }
  #ProcessingAndWarehousing .m-lg-8{
    width: 66.64% !important;
  }
  #ProcessingAndWarehousing .m-lg-9{
    width: 74.97% !important;
  }
  #ProcessingAndWarehousing .m-lg-10{
    width: 83.30% !important;
  }
  #ProcessingAndWarehousing .m-lg-11{
    width: 91.63% !important;
  }
  #ProcessingAndWarehousing .m-lg-12{
    width: 100% !important;
  }
  #ProcessingAndWarehousing .mr {
    margin-left: 0;
  }
}
</style>
