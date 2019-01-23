<template>
	<div id="SalesOrder" v-loading="P_adds">
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
            <el-button style="float: right;" size="medium" class="mr header_button_a" @click="add()"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #F4F4F4;width:100%;margin-top: 1.5rem;">
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">销售单号</th>
                        <th colspan="1" style="text-align:center;width:4%" rowspan="1">采购客户</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">订货日期</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">要货日期</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">订单来源</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">状态</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="items in tableData" ref="table_tr">
                        <td><div class="cell">{{ items.saleOrderNo }}</div></td>
                        <td><div class="cell">{{ items.customerName }}</div></td>
                        <td><div class="cell">{{ items.saleOrderTime.replace('T'," ").replace('.000+0000'," ") }}</div></td>
                        <td><div class="cell">{{ items.saleDemandTime.replace('T'," ").replace('.000+0000'," ") }}</div></td>
                        <td><div class="cell">{{ items.createUser }}</div></td>
                        <td><div class="cell">{{ items.status }}</div></td>
                        <td><div class="cell" :idvalue="items.id">
                          <button class="List_button_cz" v-show="ButtonShow(items.status)" :idvalue="items.id" @click="Edit($event)"><i :idvalue="items.id" class="el-icon-edit"></i></button>
                          <button class="List_button_cz document" v-show="items.status=='待审核'" :idvalue="items.id" @click="Audit($event)"><i :idvalue="items.id" class="el-icon-document"></i></button>
                          <button class="List_button_cz delete" v-show="ButtonShow(items.status)" :idvalue="items.id" @click="Delete($event)"><i :idvalue="items.id" class="el-icon-delete"></i></button>
                          <button class="List_button_cz circle" v-show="items.status=='已审核'" :idvalue="items.id" @click="Anti_Audit($event)"><i :idvalue="items.id" class="el-icon-circle-check"></i></button>
                          <button class="List_button_cz message" v-show="ButtonShow1(items.status)" :idvalue="items.id" @click="SendOut($event)"><i :idvalue="items.id" class="el-icon-message"></i></button>
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
          title="新增销售订单"
          :visible.sync="Add_New_Users_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="Add_form" label-width="74px">
            <el-form-item label="销售单号:" style="width:25%;float:left;">
              <el-input disabled @focus="dataS_dis=false" v-model="Add_form.saleOrderNo"></el-input>
            </el-form-item>
            <el-form-item label="采购客户:" id="dataS_dis_value" style="width:25%;float:left;">
              <el-input v-model="search" class="dataS_dis_value" @focus="dataS_dis=true;" @keydown="displays1 = false;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis">
                  <div v-for="items in tables" @click="product_type(items.id,items.customerName)">
                      <span v-show="display11" style="margin-left: 10px" v-html="format(items.customerName)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-form-item label="订货日期:" style="padding-top:0;width:25%;float:left;">
              <el-date-picker @change="Add_showTimes" v-model="Add_saleOrderTime" type="datetime" format="yyyy-MM-dd" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="要货日期:" style="padding-top:0;width:25%;float:left;">
              <el-date-picker @change="Add_showTimes1" v-model="Add_saleDemandTime" type="datetime" format="yyyy-MM-dd" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-card class="box-card" style="width: 100%;">
              <div slot="header" class="clearfix">
                <span style="font-size: 16px;font-weight: bold;color: #2C3E50;">销售订单明细</span>
                <div class="button_list">
                  <el-button type="primary" @click="add_ProcessingDetails_add"><i class="el-icon-plus"></i></el-button>
                  <el-button type="primary" @click="add_ProcessingDetails_Del"><i class="el-icon-delete"></i></el-button>
                </div>

              </div>
              <div class="text item" style="border: 1px solid #d1dbe5;">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;width:100%"> 
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">名称</th>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">属性</th>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">类别</th>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">单位</th>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">数量</th>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">规格</th>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">备注</th>
                      </tr>
                    </thead>
                    <tbody id="tabless" style="width:100%">

                    </tbody>
                </table>
                <div style="height: 18rem;overflow-y: scroll;">
                  <div  v-for="items in Add_DetailsData">
                    <saleorder-details :mm="items.id"></saleorder-details>
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
              <el-button @click="SalesOrder_addsP()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        
        <el-dialog
          v-loading="ALTER_USER"
          title="修改销售订单信息"
          :visible.sync="ALTER_USER_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="Edits_form" label-width="74px">
            <el-form-item label="销售单号:" style="width:25%;float:left;">
              <el-input disabled @focus="dataS_dis=false" v-model="Edits_form.saleOrderNo"></el-input>
            </el-form-item>
            <el-form-item label="采购客户:" id="dataS_dis_value" style="width:25%;float:left;">
              <el-input v-model="search" class="dataS_dis_value" @focus="dataS_dis=true;" @keydown="displays1 = false;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis">
                  <div v-for="items in tables" @click="product_type1(items.id,items.customerName)">
                      <span v-show="display11" style="margin-left: 10px" v-html="format(items.customerName)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-form-item label="订货日期:" style="padding-top:0;width:25%;float:left;">
              <el-date-picker @change="Add_showTimes" v-model="Edits_saleOrderTime" type="datetime" format="yyyy-MM-dd" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="要货日期:" style="padding-top:0;width:25%;float:left;">
              <el-date-picker @change="Add_showTimes1" v-model="Edits_saleDemandTime" type="datetime" format="yyyy-MM-dd" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-card class="box-card" style="width: 100%;">
              <div slot="header" class="clearfix">
                <span style="font-size: 16px;font-weight: bold;color: #2C3E50;">销售订单明细</span>
                <div class="button_list">
                  <el-button type="primary" @click="Edits_ProcessingDetails_add"><i class="el-icon-plus"></i></el-button>
                  <el-button type="primary" @click="Edits_ProcessingDetails_Del"><i class="el-icon-delete"></i></el-button>
                </div>

              </div>
              <div class="text item" style="border: 1px solid #d1dbe5;">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;width:100%"> 
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">名称</th>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">属性</th>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">类别</th>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">单位</th>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">规格</th>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">数量</th>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">备注</th>
                      </tr>
                    </thead>
                    <tbody id="tabless" style="width:100%">

                    </tbody>
                </table>
                <div style="height: 18rem;overflow-y: scroll;">
                  <div  v-for="items in Edits_DetailsData">
                    <saleorder-details :DetailsData="items" :TYPE="items.id"></saleorder-details>
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
              <el-button @click="SalesOrder_EditsP()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

      </el-row>
    </el-row>
	</div>

</template>

<script>
import api from "../../api/api.js";
import saleorderDetails from "../../components/saleOrder-details.vue"
  export default {
    components: {
      saleorderDetails,
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
          //模糊查询 新增/修改
          search:'',
          search1:'',
          tableData1:[],
          tableData2:[],
          dataS_dis:false,
          dataS_dis1:false,
          displays1:true,
          displays2:true,
          display11:true,
          display22:true,
          saleOrderUser:'',
          //新增
          Add_form: {
            saleOrderNo: '',
            customerId: '',
            customerName:'',
          },
          Add_saleOrderTime:"",
          Add_saleDemandTime:"",

          Add_DetailsData:[],

          //修改
          Edits_form: {
            saleOrderNo: '',
            customerId: '',
            customerName:'',
          },
          Edits_saleOrderTime:"",
          Edits_saleDemandTime:"",

          OrderId:'',
          companyId:"",
          PagesNumber:10,
          //子组建数据数组
          Edits_DetailsData:[],
          materialInTime:'',
          Edits_materialInTime:'',
          add_saleOrderDetails :[],
          
      };
    },
    created() {
        this.SessionStorageDisposeDel();
    },
    computed: {
        //新增模糊查询数据返回
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
        //修改模糊查询数据返回
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
    },
    mounted() {
        //let Params = {id:JSON.parse(sessionStorage.getItem('id'))}
        let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
        this.pageNum = params.pageNum;
        this.SalesOrder_info(params)
        this.materialInTime = new Date()
    },
    methods: {
      selectGet(vId){
        let obj = {};
        obj = this.selectList.find((item)=>{
            if(item.id === vId)
            return item.id === vId
        });
        this.Classification = obj.id
        this.dataS_dis = false;
      },
      getSTime(val){
        this.times = val
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
          default:
                return false;
        }
      },
      ButtonShow1(str){
        switch(str){
          case '未发货':
                return true;
          case '已审核':
                return true;
          default:
                return false;
        }
      },
      //时间格式
      Date_day(type){ 
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
          if(type)
          return yy + "-" + MM + "-" + dd;
          else
          return yy + "-" + MM + "-" + dd + " " + hh + ":" + mm + ":" + ss + ":" +ms;
      },
      Add_showTimes(val){
        this.dataS_dis=false
        this.Add_saleOrderTime = val
      },
      Add_showTimes1(val){
        this.dataS_dis=false
        this.Add_saleDemandTime = val
      },
      Edits_showTimes(val){
        this.dataS_dis1=false
        this.Edits_saleOrderTime = val
      },
      Edits_showTimes1(val){
        this.dataS_dis1=false
        this.Edits_saleDemandTime = val
      },
      //新增添加删除操作
      add_ProcessingDetails_add(){
        let obj = {id:1}
        this.Add_DetailsData.push(obj)
      },
      add_ProcessingDetails_Del(){
        this.Add_DetailsData.pop()
      },
      //修改添加删除操作
      Edits_ProcessingDetails_add(){
        let obj = {id:1}
        this.Edits_DetailsData.push(obj)
      },
      Edits_ProcessingDetails_Del(){
        let obj = this.Edits_DetailsData.pop()
        this.P_adds = true
        api.SalesOrder_infoChild_Delete(obj).then(res => {
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
      //页码功能
      handleSizeChange(done){
        let params = {pageNum:done.toString(),pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
        this.pageNum = done.toString();
        this.SalesOrder_info(params)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.SessionStorageDisposeDel();
            let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
            this.pageNum = params.pageNum;
            this.SalesOrder_info(params)
            done();
          })
          .catch(_ => {});
      },
      product_type(e,p){
          this.dataS_dis = false;
          this.search = ""
          this.search = p
          this.Add_form.customerId = e
          this.Add_form.customerName = p
      },
      product_type1(e,p){
          this.dataS_dis1 = false;
          this.search1 = ""
          this.search1 = p
          this.Edits_form.customerId = e
          this.Edits_form.customerName = e
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
      SalesOrder_info(params){
        this.P_adds = true;
        api.SalesOrder_info(params).then(res => {
            if (res.status == 200) {
              this.footer_Num = Number(res.total)
              this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
                res.data.forEach((v,i)=>{for(var j in v){
                  if(j == "status"){
                    if(v[j]==1){v[j]='待审核'}else if(v[j]==2){v[j]='已审核'}else if(v[j]==3){v[j]='未发货'}else if(v[j]==4){v[j]='已发货'}else{v[j]='已收货'}
                  }
                }});
                this.tableData = res.data
                this.SessionStorageDisposeDel();
                this.Add_DetailsData = []
                this.Edits_DetailsData = []
                this.P_adds = false;
            } else if(res.status == 500){
                  this.$message.error("服务器忙！");
            }else{
              this.P_adds = false;
              if(res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
              else
              this.$message.error(res.msg);
            }
        }); 
      },
      SalesOrder_adds(obj){
          let objstring = JSON.stringify(obj);
          this.add_New_Nsers = true;
          debugger
          //新增
          api.SalesOrder_adds(objstring).then(res => {
              
              if (res.status == 200) {
                this.P_adds = false;
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
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                  this.pageNum = params.pageNum;
                  this.SalesOrder_info(params)
            } else if(res.status == 500){
                  this.$message.error("服务器忙！");
            }else{
                  this.P_adds = false;
                  if(res.msg == undefined || res.msg == "")
                  this.$message.error("服务器忙！");
                  else
                  this.$message.error(res.msg);
            }
          });   
      },
      SalesOrder_addsP(){
        if(this.Add_form.saleOrderNo == "" 
        || this.Add_form.customerId == "" 
        || this.Add_form.customerName == "" 
        || this.Add_saleOrderTime == "" 
        || this.Add_saleDemandTime == "" ){alert("数据不全")}
        else{
              let objs = {} 
              objs.companyId = JSON.parse(sessionStorage.getItem('companyId'))
              objs.saleOrderNo = this.Add_form.saleOrderNo
              objs.customerId = this.Add_form.customerId
              objs.customerName = this.Add_form.customerName
              objs.saleOrderTime = this.Add_saleOrderTime + " 00:00:00"
              objs.saleDemandTime = this.Add_saleDemandTime + " 00:00:00"
              objs.saleOrderDetails = this.SessionStorageDisposeInfo()

              this.SalesOrder_adds(objs)
        }
      },
      //子组建数据全部删除/重置
      SessionStorageDisposeDel(){
        let str = "saleOrder-details";
        for(var i in sessionStorage){
          if(i.indexOf(str)==0)
          {
            sessionStorage.removeItem(i)
          }
        }
        localStorage.flg = undefined
      },
      //获取子组建数据全部
      SessionStorageDisposeInfo(){
        
        let str = "saleOrder-details",obj =[];
        for(var i in sessionStorage){
          if(i.indexOf(str)==0)
          {
            
            obj.push(JSON.parse(sessionStorage[i]))
          }
        }
        return obj
      },
      SalesOrder_Edits(objs){
          let objstring = JSON.stringify(objs);
          this.P_adds = true
          debugger
          api.SalesOrder_Edits(objstring).then(res => {
              if (res.status == 200) {
                 this.P_adds = false;
                  this.$message({
                    message: "修改"+res.msg,
                    type: 'success'
                  });
                  let forms = this.Edits_form;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.Edits_form = forms
                  this.ALTER_USER_Visible = false; 
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                  this.pageNum = params.pageNum;
                  this.SalesOrder_info(params)
            } else if(res.status == 500){
              this.$message.error("服务器忙！");
            }else{
              this.ALTER_USER_Visible = false;
              if(res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
              else
              this.$message.error(res.msg);
            }
          });
      },
      SalesOrder_EditsP(){
        if(this.Edits_form.saleOrderNo == "" 
        || this.Edits_form.customerId == "" 
        || this.Edits_form.customerName == "" 
        || this.Edits_saleOrderTime == "" 
        || this.Edits_saleDemandTime == "" ){alert("数据不全")}
        else{
              let objs = {} 
              objs.companyId = JSON.parse(sessionStorage.getItem('companyId'))
              objs.id = this.Edits_form.id
              objs.saleOrderNo = this.Edits_form.saleOrderNo
              objs.customerId = this.Edits_form.customerId
              objs.customerName = this.Edits_form.customerName
              objs.saleOrderTime = this.Edits_saleOrderTime + " 00:00:00"
              objs.saleDemandTime = this.Edits_saleOrderTime + " 00:00:00"
              objs.saleOrderDetails = this.SessionStorageDisposeInfo()

              this.SalesOrder_Edits(objs)
        }
      },
      add(){
          let forms = this.Add_form,str;
          for(var i in forms){
            forms[i] = "";
          }
          this.Add_form = forms;
          this.search = '';
          this.Add_New_Users_Visible = true;
          //新增随机生成订单号
          debugger
          this.Add_form.saleOrderNo = this.Date_day().replace(/:/g,"").replace(/-/g,"").replace(/ /g,"")
          this.Add_saleOrderTime = this.Date_day(1);
          this.Add_saleDemandTime = this.Date_day(1);
          this.P_adds = true;
          let params = {companyId:JSON.parse(sessionStorage.getItem('companyId'))}
          //获取模糊查询数据
          api.CustomerManagement_info(params).then(res => {
              if (res.status == 200) {
                  this.P_adds = false;
                  this.tableData1 = res.data
              } else if(res.status == 500){
                this.P_adds = true;
                this.$message.error("服务器忙！");
              }else{
                this.ALTER_USER_Visible = false;
                this.P_adds = true;
                if(res.msg == undefined || res.msg == "")
                this.$message.error("服务器忙！");
                else
                this.$message.error(res.msg);
              }
          });
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
          let forms = this.Edits_form,str;
          for(var i in forms){
            forms[i] = "";
          }
          debugger
          this.Edits_form = forms;
          this.search = '';
          this.ALTER_USER_Visible = true;
          //数据渲染
          this.Edits_form.saleOrderNo = obj.saleOrderNo
          this.Edits_form.id = obj.id
          this.Edits_form.customerId = obj.customerId
          this.Edits_form.customerName = obj.customerName
          this.Edits_saleOrderTime = obj.saleOrderTime
          this.Edits_saleDemandTime = obj.saleDemandTime
          this.search = obj.customerName
          
          this.OrderId = OrderId;
          this.Edits_DetailsData = []
          this.Edits_DetailsData.pop()
          this.P_adds = true;
          let params = {companyId:JSON.parse(sessionStorage.getItem('companyId'))}
          //获取模糊查询数据
          api.CustomerManagement_info(params).then(res => {
              if (res.status == 200) {
                  this.P_adds = false;
                  this.tableData1 = res.data
                  this.P_adds = true;
                  //明细数据查询渲染子组建
                  api.SalesOrder_infoChild({saleOrderId:this.OrderId}).then(res => {
                      if (res.status == 200) {
                          this.P_adds = false;
                          let arry = [],obj={},obj1={},obj2={};
                          for(var i in res.data)
                          {  
                            this.Edits_DetailsData.push(res.data[i])
                          }
                      } else if(res.status == 500){
                        this.$message.error("服务器忙！");
                      }else{
                        this.Userdispaly = false;
                        if(res.msg == undefined || res.msg == "")
                        this.$message.error("服务器忙！");
                        else
                        this.$message.error(res.msg);
                      }
                  }); 

              } else if(res.status == 500){
                this.P_adds = true;
                this.$message.error("服务器忙！");
              }else{
                this.ALTER_USER_Visible = false;
                this.P_adds = true;
                if(res.msg == undefined || res.msg == "")
                this.$message.error("服务器忙！");
                else
                this.$message.error(res.msg);
              }
          });
      },
      //删除方法
      Delete(e) {
          this.Userdispaly = true;
          let OrderId,_this = this,obj={};
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                if(i == "value"){
                  //删除ID
                  OrderId = attr[i];
                  debugger
                    this.$confirm('确认删除？')
                    .then(_ => {
                      this.P_adds = true;
                        api.SalesOrder_Delete({id: OrderId}).then(res => {
                            this.listLoading = false;
                            //NProgress.done();
                            
                            if (res.status == 200) {
                              this.P_adds = false;
                                this.$message({
                                  message: "删除"+res.msg,
                                  type: 'success'
                                });
                                this.Userdispaly = false;
                                let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                                this.pageNum = params.pageNum;
                                this.SalesOrder_info(params)
                            } else if(res.status == 500){
                              this.P_adds = false;
                              this.$message.error("服务器忙！");
                            }else{
                              this.P_adds = false;
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
                        api.SalesOrder_status({id: OrderId,status:2}).then(res => {
                            if (res.status == 200) {
                              this.P_adds = false;
                                this.$message({
                                  message: "状态修改"+res.msg,
                                  type: 'success'
                                });
                                let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                                this.pageNum = params.pageNum;
                                this.SalesOrder_info(params)
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
                        api.SalesOrder_status({id: OrderId,status:1}).then(res => {
                            if (res.status == 200) {
                              this.P_adds = false;
                                this.$message({
                                  message: "状态修改"+res.msg,
                                  type: 'success'
                                });
                                let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                                this.pageNum = params.pageNum;
                                this.SalesOrder_info(params)
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
      SendOut(e) {
          this.Userdispaly = true;
          let OrderId,_this = this,obj={};
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                if(i == "value"){
                  //删除ID
                  OrderId = attr[i];
                  debugger
                    this.$confirm('确认要发货？')
                    .then(_ => {
                      this.P_adds = true;
                        api.SalesOrder_status({id: OrderId,status:4}).then(res => {
                            if (res.status == 200) {
                              this.P_adds = false;
                                this.$message({
                                  message: "发货"+res.msg,
                                  type: 'success'
                                });
                                let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                                this.pageNum = params.pageNum;
                                this.SalesOrder_info(params)
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
   #SalesOrder .el-dialog--small{
        width: 56%;
   }
      /* 分页 */
   #SalesOrder .block{
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

    #SalesOrder .List_button_cz{
    background: #92CC8F;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
   }
   #SalesOrder .cell .delete{
     background: #E74C3C
   }
   #SalesOrder .cell .document{
     background: #70C8CB
   }
  #SalesOrder .cell .circle{
     background: #EF948B
   }
  #SalesOrder .cell .message{
     background: #E74C3C
   }
   #SalesOrder .block .el-pagination{
     padding-left: 1rem;
   }
   #SalesOrder .container_padding th{
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
   }
   #SalesOrder .container_padding th:first-child{
     border-left: 0;
   }
   #SalesOrder .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }
   #SalesOrder .container_padding td:first-child{
     padding-left: 1px;
   }
   #SalesOrder .container_padding tr:nth-child(2n+1){
     background: #F9F9F9
   }
  #SalesOrder .container_padding tr:nth-child(2n+1) td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }

  #SalesOrder .select_top{
    position: relative;
    width: 100%;
    float: left;
    padding-top: 2rem;
  }
  #SalesOrder .select_top span{
    display: block;
    float: left;
    line-height: 2rem;
    margin-right: 0.8rem;
  }
  #SalesOrder .select_top .el-input{
    width: 48%;
    line-height: 1.8rem;
    border-radius: .2rem;
    outline: 0;
  }
  #SalesOrder .box-card::-webkit-scrollbar {
      width: 0px;
  }
  #SalesOrder .box-card th{
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    font-weight: 400;
  }
  #SalesOrder .box-card th:first-child{
    border-left: 0;
  }
  #SalesOrder .box-card td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
  }
  #SalesOrder .box-card td:first-child{
    padding-left: 1px;
  }
  #SalesOrder .box-card .button_div{
    padding: .5rem;
  }
  #SalesOrder .el-date-editor.el-input {
      width: 100%;
  }
  #SalesOrder .text th{
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }
  #dataS_dis_value{
    position: relative;
  }

  #dataS_dis_value .dataS{
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
  #dataS_dis_value .dataS span{
      display: block;
      width: 88%;
      height: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
  #dataS_dis_value .dataS>div{
    border-bottom: 1px solid #ccc;
  }
  
  #SalesOrder .el-dialog__header {
      padding: 1.5rem 1.5rem;
      background: #2C3E50;
  }
  #SalesOrder .el-dialog__title{
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
  #SalesOrder .el-dialog__body{
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }
  /* !important */
  #SalesOrder .footer_button{
    position: absolute;
    margin: 0;
    width: 100%;
    height: 5.8rem;
    left: 0;
    background: #EDF2F8;
    bottom: 0;
  }
  #SalesOrder .footer_button .el-form-item__content{
      margin-left:0 !important;
      min-height: 5.8rem;
      text-align: center;
  }
  #SalesOrder .footer_button .div_P{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: .3rem;
  }
  #SalesOrder .div_P div{
    color: #9C9C9C;
    font-size: 14px;
  }
  #SalesOrder .footer_button .el-button{
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2C3E50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
  #SalesOrder .footer_button .el-button:hover{
    border: 1px solid #3b5168;
    background: #3b5168;
  }
  #SalesOrder .header_button {
    width: 86px;
    background: #2C3E50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #SalesOrder .header_button:hover{
    border: 1px solid transparent;
  }
  #SalesOrder .header_button_a{
    width: 86px;
    background: #47A136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #SalesOrder .header_button_a:hover{
    border: 1px solid transparent;
  }
  #SalesOrder .el-card__header {
    padding: 0 20px;
    line-height: 4rem;
  }
  #SalesOrder .button_list{
    float: right;
  }
  #SalesOrder .button_list button{
    background-color: #92CC8F;
    border-color: #92CC8F;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #SalesOrder .button_list button:last-child{
    background-color: #E74C3C;
    border-color: #E74C3C;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }




@media screen and (min-width: 1200px) and (max-width: 1680px){
  #SalesOrder .m-lg-1{
    width: 8.33% !important;
  }
  #SalesOrder .m-lg-2{
    width: 16.66% !important;
  }
  #SalesOrder .m-lg-3{
    width: 25% !important;
  }
  #SalesOrder .m-lg-4{
    width: 33.33% !important;
  }
  #SalesOrder .m-lg-5{
    width: 41.66% !important;
  }
  #SalesOrder .m-lg-6{
    width: 49.98% !important;
  }
  #SalesOrder .m-lg-7{
    width: 58.31% !important;
  }
  #SalesOrder .m-lg-8{
    width: 66.64% !important;
  }
  #SalesOrder .m-lg-9{
    width: 74.97% !important;
  }
  #SalesOrder .m-lg-10{
    width: 83.30% !important;
  }
  #SalesOrder .m-lg-11{
    width: 91.63% !important;
  }
  #SalesOrder .m-lg-12{
    width: 100% !important;
  }
  #SalesOrder .mr {
    margin-left: 0;
  }
  #SalesOrder .el-dialog--small {
    width: 76%;
  }
}
</style>
