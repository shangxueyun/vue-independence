<template>
	<div id="OutboundGoods" v-loading="P_adds">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="padding:1.5rem">
          <el-col :md="12" :lg="6" :span="6" style="">
            <el-input class="m-lg-7" style="width:64%" placeholder="请输入出库单号"></el-input>
            <el-button size="medium" class="mr m-lg-4 header_button" :disabled="roleControl.searchRole"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
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
            <el-button style="float: right;" size="medium" class="mr header_button_a" :disabled="roleControl.addRole" @click="add()"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #F4F4F4;width:100%;margin-top: 1.5rem;">
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:5%" rowspan="1">出库单号</th>
                        <th colspan="1" style="text-align:center;width:11%" rowspan="1">出库日期</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">发货人 </th>
                        <th colspan="1" style="text-align:center;width:5%" rowspan="1">状态</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="items in tableData" ref="table_tr" :key="items.id">
                        <td><div class="cell">{{ items.goodsOutOrderNo }}</div></td>
                        <td><div class="cell">{{ items.goodsOutOrderTime }}</div></td>
                        <td><div class="cell">{{ items.operatorUser }}</div></td> 
                        <td><div class="cell">{{ items.status }}</div></td>
                        <td style="text-align: center;"><div class="cell" :idvalue="items.id">
                          <button class="List_button_cz" v-show="ButtonShow(items.status)" :disabled="roleControl.EditRole" :idvalue="items.id" @click="Edit($event)"><i :idvalue="items.id" class="el-icon-edit"></i></button>
                          <button class="List_button_cz document" v-show="items.status=='待审核'" :disabled="roleControl.roleStatus" :idvalue="items.id" @click="Audit($event)"><i :idvalue="items.id" class="el-icon-document"></i></button>
                          <button class="List_button_cz delete" v-show="ButtonShow(items.status)" :disabled="roleControl.DeleteRole" :idvalue="items.id" @click="Delete($event)"><i :idvalue="items.id" class="el-icon-delete"></i></button>
                          <button class="List_button_cz circle" v-show="items.status=='已审核'" :disabled="roleControl.roleStatus" :idvalue="items.id" @click="Anti_Audit($event)"><i :idvalue="items.id" class="el-icon-circle-check"></i></button>
                          <button class="List_button_cz message" v-show="ButtonShow1(items.status)" :disabled="roleControl.roleStatus" :idvalue="items.id" @click="SendOut($event)"><i :idvalue="items.id" class="el-icon-message"></i></button>
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
          v-loading="Add_New_Users"
          title="新增商品出库单"
          :visible.sync="Add_New_Users_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="Add_form" label-width="74px">
            <el-form-item label="销售单号:" style="width: 32%;float: left;">
              <el-input v-model="search" class="dataS_dis_value" @focus="dataS_dis=true;dataS_dis1=false;dataS_dis2=false;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis">
                  <div v-for="items in tables" @click="Add_product_type(items.id,items.saleOrderNo)" :key="items.id">
                      <span style="margin-left: 10px" v-html="format(items.saleOrderNo)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-form-item label="出库单号:" style="width: 32%;float: left;">
              <el-input disabled @focus="dataS_dis=false" v-model="Add_form.goodsOutOrderNo"></el-input>
            </el-form-item>
            <el-form-item label="出库日期:" style="width: 32%;float: left;">
              <el-date-picker @change="Add_showTimes" v-model="Add_materialInTime" type="datetime" format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="客户名称:" style="width: 32%;float: left;">
              <el-input v-model="search1" class="dataS_dis_value" @focus="dataS_dis1=true;dataS_dis=false;dataS_dis2=false;" placeholder="请输入内容"></el-input>  
              <div class="dataS" v-show="dataS_dis1">
                  <div v-for="items in tables1" @click="Add_product_type1(items.id,items.customerName)" :key="items.id">
                      <span style="margin-left: 10px" v-html="format1(items.customerName)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-card class="box-card" style="width: 100%;">
              <div slot="header" class="clearfix">
                <span style="font-size: 16px;font-weight: bold;color: #2C3E50;">商品出库单明细</span>
                <div class="button_list">
                  <el-button type="primary" @click="add_ProcessingDetails_add"><i class="el-icon-plus"></i></el-button>
                  <el-button type="primary" @click="add_ProcessingDetails_Del"><i class="el-icon-delete"></i></el-button>
                </div>

              </div>
              <div class="text item" style="border: 1px solid #d1dbe5;">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;width:100%"> 
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">名称</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">属性</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">类别</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">单位</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">要货数量</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">发货数量</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">规格</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">入库批次</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">供应商</th>
                      </tr>
                    </thead>
                    <tbody id="tabless" style="width:100%">

                    </tbody>
                </table>
                <div style="height: 18rem;overflow-y: scroll;">
                  <div  v-for="items in Add_DetailsData">
                    <commodityim-Details :DetailsData="items" :TYPE="items.id"></commodityim-Details>
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
              <el-button @click="OutboundGoods_addsP()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        
        <el-dialog
          v-loading="Add_New_Users"
          title="修改商品出库单信息"
          :visible.sync="Edits_New_Users_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="Edits_form" label-width="74px">
            <el-form-item label="销售单号:" style="width: 32%;float: left;">
              <el-input disabled v-model="search" class="dataS_dis_value" @focus="dataS_dis=true;dataS_dis1=false;dataS_dis2=false;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis">
                  <div v-for="items in tables" @click="Edits_product_type(items.id,items.saleOrderNo)" :key="items.id">
                      <span style="margin-left: 10px" v-html="format(items.saleOrderNo)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-form-item label="出库单号:" style="width: 32%;float: left;">
              <el-input disabled @focus="dataS_dis=false" v-model="Edits_form.goodsOutOrderNo"></el-input>
            </el-form-item>
            <el-form-item label="出库日期:" style="width: 32%;float: left;">
              <el-date-picker @change="Edits_showTimes" v-model="Edits_materialInTime" type="datetime" format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item label="客户名称:" style="width: 32%;float: left;">
              <el-input v-model="search1" class="dataS_dis_value" @focus="dataS_dis1=true;dataS_dis=false;dataS_dis2=false;" placeholder="请输入内容"></el-input>  
              <div class="dataS" v-show="dataS_dis1">
                  <div v-for="items in tables1" @click="Edits_product_type1(items.id,items.customerName)" :key="items.id">
                      <span style="margin-left: 10px" v-html="format1(items.customerName)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-card class="box-card" style="width: 100%;">
              <div slot="header" class="clearfix">
                <span style="font-size: 16px;font-weight: bold;color: #2C3E50;">商品出库单明细</span>
                <div class="button_list">
                  <el-button type="primary" @click="Edits_ProcessingDetails_add"><i class="el-icon-plus"></i></el-button>
                  <el-button type="primary" @click="Edits_ProcessingDetails_Del"><i class="el-icon-delete"></i></el-button>
                </div>
              </div>
              <div class="text item" style="border: 1px solid #d1dbe5;">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;width:100%"> 
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">名称</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">属性</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">类别</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">单位</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">要货数量</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">发货数量</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">规格</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">入库批次</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">供应商</th>
                      </tr>
                    </thead>
                    <tbody id="tabless" style="width:100%">

                    </tbody>
                </table>
                <div style="height: 18rem;overflow-y: scroll;">
                  <div  v-for="items in Edits_DetailsData" :key="items.id">
                    <commodityim-Details :DetailsData="items" :TYPE="items.id" :Edits="items.id"></commodityim-Details>
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
              <el-button @click="OutboundGoods_EditsP()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <el-dialog
          class="SendOut"
          v-loading="ALTER_USER"
          title="发货信息"
          :visible.sync="Userdispaly"
          width="30%"
          >
          <el-form :model="SendOutS" label-width="130px">
            <el-form-item label="选择发货方式:" style="">
              <el-select @change="SendOutSselect"  style="width:100%" v-model="SendOutS.carriageWay" placeholder="请选择">
                <el-option
                  v-for="item in SendOutselect"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <!-- <el-form-item label="运输时间:" style="">
              <el-date-picker @change="carriageTimeF" v-model="carriageTime" type="datetime" format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间"></el-date-picker>
            </el-form-item> -->
            <el-form-item label="录入车牌号:" v-show="carriageNo1" style="">
              <el-input v-model="SendOutS.carriageNo"></el-input>
            </el-form-item>
            <el-form-item label="录入运输冷藏温度:" v-show="temperature1" style="">
              <el-input v-model="SendOutS.temperature"></el-input>
            </el-form-item>
            <el-form-item label="选择快递公司:" v-show="carriageCompany1" style="">
              <el-input v-model="SendOutS.carriageCompany"></el-input>
            </el-form-item>
            <el-form-item label="录入快递单号:" v-show="carriageNos" style="">
              <el-input v-model="SendOutS.carriageNo"></el-input>
            </el-form-item>
            <el-form-item class="footer_button">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="OutboundGoods_SendOut()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

      </el-row>
    </el-row>
	</div>

</template>

<script>
import api from "../../api/api.js";
import commodityimDetails from "../../components/Commodity_IM_Warehousing-details.vue"
  export default {
    components: {
      commodityimDetails,
    },
    data() {
      return {
          tableData: [
            
          ],
          Times_search:[new Date(),new Date()],
          operator:"操作员：" + JSON.parse(sessionStorage.getItem('user')).username + "/操作时间：" + this.Date_day(),
          footer_Num:'85',
          pageNum:'',
          Add_New_Users_Visible: false,
          Edits_New_Users_Visible: false,
          ALTER_USER_Visible: false,
          P_adds:false,
          Add_New_Users:false,
          ALTER_USER:false,
          Userdispaly:false,
          //模糊查询 新增/修改
          search:'',
          search1:'',
          search2:'',
          tableData1:[],
          tableData2:[],
          tableData3:[],
          dataS_dis:false,
          dataS_dis1:false,
          dataS_dis2:false,
          saleOrderUser:'',
          //新增
          Add_form: {
            saleOrderId: '',
            saleOrderNo: '',
            goodsOutOrderNo: '',
            goodsOutOrderTime: this.Add_materialInTime,
            customerId:'',
            customerName:'',
            consignerUser:JSON.parse(sessionStorage.getItem('user')).username,
          },
          //修改
          Edits_form: {
            saleOrderId: '',
            saleOrderNo: '',
            goodsOutOrderNo: '',
            goodsOutOrderTime: this.Edits_materialInTime,
            customerId:'',
            customerName:'',
            consignerUser:JSON.parse(sessionStorage.getItem('user')).username,
          },
          OrderId:'',
          saleId:'',
          companyId:"",
          PagesNumber:10,
          selectList:[
            {id:5,name:'已收货'},
            {id:4,name:'已发货'},
            {id:3,name:'未发货'},//三个按钮 审核按钮 点完 已审核
            {id:2,name:'已审核'},//反审核按钮 发货按钮 反审核按钮 点完 待审核 发货按钮 点完是 已发货
            {id:1,name:'待审核'},//三个按钮
          ],
          //子组建数据数组
          SendOutselect:[
            {id:1,name:'标准物流'},
            {id:2,name:'冷链物流'},
            {id:3,name:'快递物流'},
          ],
          SendOutS:{
            carriageWay:'',//方式
            carriageNo:'',//单号/车牌号
            temperature:'',//温度
            carriageCompany:'',//快递公司
          },
          carriageTime:'',
          carriageNos:false,
          carriageNo1:false,
          temperature1:false,
          carriageCompany1:false,
          Add_DetailsData:[],
          Edits_DetailsData:[],
          Add_materialInTime:'',
          Edits_materialInTime:'',
          add_saleOrderDetails :[],
          roleControl:{
            addRole:true,
            EditRole:true,
            DeleteRole:true,
            roleStatus:true,
            searchRole:true,
          },
      };
    },
    created() {
        this.SessionStorageDisposeDel();
        let allRoles = JSON.parse(sessionStorage.getItem('newRoutes')),name = "商品出库单";
        allRoles.forEach((v,i)=>{
          v.children.forEach((v1,i1)=>{
              if(v1.permissionName==name){
                let Vchildren = v1.children;
                Vchildren.forEach((v2,i2)=>{
                  switch (v2.permissionName) {
                    case '商品出库单添加':
                          this.roleControl.addRole = false;
                          break;
                    case '商品出库单修改':
                          this.roleControl.EditRole = false;
                          break;
                    case '商品出库单删除':
                          this.roleControl.DeleteRole = false;
                          break;
                    case '商品出库单查询':
                          this.roleControl.searchRole = false;
                          break;
                    case '商品出库单审核':
                          this.roleControl.roleStatus = false;
                          break;
                  }
                });
              }
          });
        });
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
        //修改模糊查询数据返回
    },
    mounted() {
        let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
        this.pageNum = params.pageNum;
        this.OutboundGoods_info(params)
        this.Add_materialInTime = this.Date_day();
    },
    methods: {
      Add_product_type(e,p){
          this.dataS_dis = false;
          this.search = ""
          this.search = p 
          this.Add_form.saleOrderId = e
          this.Add_form.saleOrderNo = p
          //
          this.P_adds = true
          this.Add_DetailsData = []
          this.Add_DetailsData.pop()
          this.SessionStorageDisposeDel();
          api.SalesOrder_infoChild({saleOrderId:e}).then(res => {
            
              if (res.status == 200) {
                  this.P_adds = false;
                  for(var i in res.data)
                  {  
                    this.Add_DetailsData.push(res.data[i])
                  }
                  this.P_adds = false;
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
      },
      Add_product_type1(e,p){
          this.dataS_dis1 = false;
          this.search1 = ""
          this.search1 = p 
          this.Add_form.customerId = e
          this.Add_form.customerName = p
      },
      Edits_product_type(e,p){
          this.dataS_dis = false;
          this.search = ""
          this.search = p 
          this.Edits_form.saleOrderId = e
          this.Edits_form.saleOrderNo = p
          //
          this.P_adds = true
          this.Edits_DetailsData = []
          this.Edits_DetailsData.pop()
          this.SessionStorageDisposeDel();
          api.SalesOrder_infoChild({saleOrderId:e}).then(res => {
            
              if (res.status == 200) {
                  this.P_adds = false;
                  for(var i in res.data)
                  {  
                    this.Edits_DetailsData.push(res.data[i])
                  }
                  debugger
                  this.P_adds = false;
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
      },
      Edits_product_type1(e,p){
          this.dataS_dis1 = false;
          this.search1 = ""
          this.search1 = p
          this.Edits_form.customerId = e
          this.Edits_form.customerName = p
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
      Add_showTimes(val){
        this.Add_form.goodsOutOrderTime = val;
        this.Add_materialInTime = val;
      },
      Edits_showTimes(val){
        this.Edits_form.goodsOutOrderTime = val;
        this.Edits_materialInTime = val;
      },
      carriageTimeF(val){
        this.carriageTime = val
      },
      SendOutSselect(val){
        if(val){
          let forms = this.SendOutS;
          for(var i in forms){forms[i] = ""}
          this.SendOutS = forms
          this.carriageNos = false
          this.carriageNo1 = false
          this.temperature1 = false
          this.carriageCompany1 = false
          this.SendOutS.carriageWay = val;
          switch (val) {
            case 1:
              this.carriageNo1 = true
              break;
            case 2:
              this.carriageNo1 = true
              this.temperature1 = true
              break;
            case 3:
              this.carriageNos = true
              this.carriageCompany1 = true
              break;
          }          
        }

      },
      statusFont(str){
            if(Number(str)){
              switch(str){
                case 4:
                      return '已收货';
                case 3:
                      return '已发货';
                case 2:
                      return '已审核';
                case 1:
                      return '待审核';
              }
            }else
            {
              switch(str){
                case "已收货":
                      return 4;
                case "已发货":
                      return 3;
                case "已审核":
                      return 2;
                case "待审核":
                      return 1;
              }
            }
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
        api.OutboundGoods_infoChild_Delete(obj).then(res => {
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
        let params = {pageNum:done.toString(),pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
        this.pageNum = done;
        this.OutboundGoods_info(params)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.SessionStorageDisposeDel();
            let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
            this.pageNum = params.pageNum;
            this.OutboundGoods_info(params)
            done();
          })
          .catch(_ => {});
      },
      OutboundGoods_info(params){
        this.P_adds = true;
        api.OutboundGoods_info(params).then(res => {
            if (res.status == 200) {
              this.footer_Num = Number(res.total)
              this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
                res.data.forEach((v,i)=>{for(var j in v){
                  if(j == "status"){
                    v[j] = this.statusFont(v[j]);
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
              if(res.data.msg == undefined || res.data.msg == "")
              this.$message.error("服务器忙！");
              else
              this.$message.error(res.data.msg);
            }
        }); 
      },
      OutboundGoods_adds(obj){
          let objstring = JSON.stringify(obj);
          this.Add_New_Users = true;
          debugger
          //新增
          api.OutboundGoods_adds(objstring).then(res => {
              debugger
              if (res.status == 200) {
                this.Add_New_Users = false;
                  this.$message({
                    message: "创建"+res.msg,
                    type: 'success'
                  });
                  let forms = this.Add_form;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.Add_form = forms
                  this.tableData1 = [];
                  this.search ='';
                  this.Add_New_Users_Visible = false; 
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                  this.pageNum = params.pageNum;
                  this.OutboundGoods_info(params)
            } else if(res.status == 500){
                  this.Add_New_Users = false;
                  this.$message.error("服务器忙！");
            }else{
                  this.Add_New_Users = false;
                  if(res.data.msg == undefined || res.data.msg == "")
                  this.$message.error("服务器忙！");
                  else
                  this.$message.error(res.data.msg);
            }
          });   
      },
      OutboundGoods_addsP(){
        let obj ={},forms = this.Add_form;
        for(var i in forms){
          if(forms[i] == "")
          {alert("数据不全");return}
          else
          obj[i] = forms[i]
        }
        obj.companyId = JSON.parse(sessionStorage.getItem('companyId'))
        obj.goodsOutOrderDetails = this.SessionStorageDisposeInfo()
        this.OutboundGoods_adds(obj)
        
      },
      OutboundGoods_EditsP(){
        let objs = {} 
        objs.id = this.Edits_form.id
        objs.companyId = JSON.parse(sessionStorage.getItem('companyId'))
        objs.saleOrderId = this.Edits_form.saleOrderId
        objs.saleOrderNo = this.Edits_form.saleOrderNo
        objs.goodsOutOrderNo = this.Edits_form.goodsOutOrderNo
        objs.goodsOutOrderTime = this.Edits_form.goodsOutOrderTime
        objs.customerId = this.Edits_form.customerId
        objs.customerName = this.Edits_form.customerName
        objs.consignerUser = this.Edits_form.consignerUser
        objs.goodsOutOrderDetails = this.SessionStorageDisposeInfo()
        this.OutboundGoods_Edits(objs)
      },
      //子组建数据全部删除/重置
      SessionStorageDisposeDel(){
        let str = "OutboundGoods-details";
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
        
        let str = "OutboundGoods-details",obj =[];
        for(var i in sessionStorage){
          if(i.indexOf(str)==0)
          {
            
            obj.push(JSON.parse(sessionStorage[i]))
          }
        }
        return obj
      },
      OutboundGoods_Edits(obj){
          let objstring = JSON.stringify(obj);
          this.Add_New_Users = true;
          debugger
          //新增
          api.OutboundGoods_Edits(objstring).then(res => {
              if (res.status == 200) {
                this.Add_New_Users = false;
                  this.$message({
                    message: "修改"+res.msg,
                    type: 'success'
                  });
                  let forms = this.Edits_form;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.search1 = "";
                  this.tableData2 = [];
                  this.Edits_form = forms
                  this.Edits_New_Users_Visible = false; 
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                  this.pageNum = params.pageNum;
                  this.OutboundGoods_info(params)
            } else if(res.status == 500){
                  this.Add_New_Users = false;
                  this.$message.error("服务器忙！");
            }else{
                  this.Add_New_Users = false;
                  if(res.data.msg == undefined || res.data.msg == "")
                  this.$message.error("服务器忙！");
                  else
                  this.$message.error(res.data.msg);
            }
          }); 
      },
      OutboundGoods_SendOut(){
        let obj = {};
        this.ALTER_USER = true
        obj = this.tableData.find((item)=>{
            if(item.id === Number(this.OrderId))
            return item.id === Number(this.OrderId)
        });
        this.saleId = obj.saleOrderId
        let params = {
          goodsOutOrderId:this.OrderId,
          carriageWay:this.SendOutS.carriageWay,
          carriageCompany:this.SendOutS.carriageCompany,
          carriageNo:this.SendOutS.carriageNo,
          temperature:this.SendOutS.temperature,
        };
        api.carriage_saveOrUpdateCarriage(params).then(res => {
            if (res.status == 200) {
                this.ALTER_USER = false;
                this.ALTER_USER = true;
                api.OutboundGoods_status({id: this.OrderId,status:3,saleOrderId:this.saleId}).then(res => {
                    if (res.status == 200) {
                        this.ALTER_USER = false;
                        this.Userdispaly = false
                        this.$message({
                          message: "发货"+res.msg,
                          type: 'success'
                        });
                        let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                        this.pageNum = params.pageNum;
                        this.OutboundGoods_info(params)
                    } else if(res.status == 500){
                      this.ALTER_USER = false;
                      this.$message.error("服务器忙！");
                    }else{
                      this.ALTER_USER = false;
                      if(res.data.msg == undefined || res.data.msg == "")
                        this.$message.error("服务器忙！");
                        else
                        this.$message.error(res.data.msg);
                    }
                }); 
            } else if(res.status == 500){
              this.ALTER_USER = false;
              this.$message.error("服务器忙！");
            }else{
              this.ALTER_USER = false;
              if(res.data.msg == undefined || res.data.msg == "")
              this.$message.error("服务器忙！");
              else
              this.$message.error(res.data.msg);
            }
        }); 
      },
      add(){
          let forms = this.Add_form,str;
          for(var i in forms){
            forms[i] = "";
          }
          this.Add_New_Users_Visible = true;
          this.search =""
          this.search1 =""
          this.Add_form.goodsOutOrderTime = this.Add_materialInTime
          this.Add_form.consignerUser = JSON.parse(sessionStorage.getItem('user')).username
          //新增随机生成出库单号 outboundOrder
          this.Add_form.goodsOutOrderNo = this.Date_day().replace(/:/g,"").replace(/-/g,"").replace(/ /g,"")
          this.Add_New_Users = true;
          
          let params = {companyId:JSON.parse(sessionStorage.getItem('companyId'))}
          //获取模糊查询数据
          api.SalesOrder_info(params).then(res => {
              if (res.status == 200) {
                  this.tableData1 = res.data
                  this.Add_New_Users = false;
                  this.Add_New_Users = true;
                  let params = {companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                  api.CustomerManagement_info(params).then(res => {
                    if (res.status == 200) {
                        this.tableData2 = res.data
                        this.Add_New_Users = false;
                        
                    } else if(res.status == 500){
                          this.Add_New_Users = false;
                          this.$message.error("服务器忙！");
                    }else{
                      this.Add_New_Users = false;
                      if(res.msg == undefined || res.msg == "")
                      this.$message.error("服务器忙！");
                      else
                      this.$message.error(res.msg);
                    }
                }); 
              } else if(res.status == 500){
                    this.Add_New_Users = false;
                    this.$message.error("服务器忙！");
              }else{
                this.Add_New_Users = false;
                if(res.msg == undefined || res.msg == "")
                this.$message.error("服务器忙！");
                else
                this.$message.error(res.msg);
              }
          }); 
      },
      Edit(e){
          let OrderId,_this = this,obj={},listData,saleOrderId;
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[1];
            for(var i in attr)
              {
                if(i == "value"){OrderId = attr[i]}
              }
            }
          });
          for(var i in this.Edits_form){
            this.Edits_form[i] = "";
          }
          this.search =""
          this.search1 =""
          this.Edits_form.consignerUser = JSON.parse(sessionStorage.getItem('user')).username
          obj = _this.tableData.find((item)=>{
              if(item.id === Number(OrderId))
              return item.id === Number(OrderId)
          });
          listData = obj
          for(var i in listData){this.Edits_form[i] = listData[i]}
          this.Edits_materialInTime = obj.goodsOutOrderTime
          this.search = this.Edits_form.saleOrderNo;
          this.search1 = this.Edits_form.customerName;
          this.OrderId = OrderId;

          this.Add_New_Users = true;
          this.Edits_New_Users_Visible = true;
          //采购客户name查询
          let params = {companyId:JSON.parse(sessionStorage.getItem('companyId'))}
          //获取模糊查询数据
          api.SalesOrder_info(params).then(res => {
              if (res.status == 200) {
                  res.data.forEach((v,i)=>{for(var j in v){
                    if(j == "status"){
                      v[j] = this.statusFont(v[j]);
                    }
                  }});
                  this.tableData1 = res.data
                  let params = {companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                  api.CustomerManagement_info(params).then(res => {
                    if (res.status == 200) {
                        this.tableData2 = res.data
                        this.Add_New_Users = false;
                        api.OutboundGoods_infoChild({goodsOutOrderId:this.Edits_form.id}).then(res => {
                            if (res.status == 200) {
                                for(var i in res.data)
                                {  
                                  this.Edits_DetailsData.push(res.data[i])
                                }
                                this.P_adds = false;
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
                    } else if(res.status == 500){
                          this.Add_New_Users = false;
                          this.$message.error("服务器忙！");
                    }else{
                      this.Add_New_Users = false;
                      if(res.msg == undefined || res.msg == "")
                      this.$message.error("服务器忙！");
                      else
                      this.$message.error(res.msg);
                    }
                }); 
              } else if(res.status == 500){
                    this.Add_New_Users = false;
                    this.$message.error("服务器忙！");
              }else{
                this.Add_New_Users = false;
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
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[1];
            for(var i in attr)
              {
                if(i == "value"){
                  //删除ID
                  OrderId = attr[i];
                  debugger
                    this.$confirm('确认删除？')
                    .then(_ => {
                      this.P_adds = true;
                        api.OutboundGoods_Delete({id: OrderId}).then(res => {
                            if (res.status == 200) {
                              this.P_adds = false;
                                this.$message({
                                  message: "删除"+res.msg,
                                  type: 'success'
                                });
                                let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                                this.pageNum = params.pageNum;
                                this.OutboundGoods_info(params)
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
      Audit(e) {
          this.Userdispaly = true;
          let OrderId,_this = this,obj={},saleId;
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[1];
            for(var i in attr)
              {
                if(i == "value"){
                  OrderId = attr[i];
                  obj = _this.tableData.find((item)=>{
                      if(item.id === Number(OrderId))
                      return item.id === Number(OrderId)
                  });
                  saleId = obj.saleOrderId
                    this.$confirm('确认状态修改？')
                    .then(_ => {
                      this.P_adds = true;
                        api.OutboundGoods_status({id: OrderId,status:2,saleOrderId:saleId}).then(res => {
                            if (res.status == 200) {
                              this.P_adds = false;
                                this.$message({
                                  message: "状态修改"+res.msg,
                                  type: 'success'
                                });
                                let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                                this.pageNum = params.pageNum;
                                this.OutboundGoods_info(params)
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
          let OrderId,_this = this,obj={},saleId;
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[1];
            for(var i in attr)
              {
                if(i == "value"){
                  //删除ID
                  OrderId = attr[i];
                  obj = _this.tableData.find((item)=>{
                      if(item.id === Number(OrderId))
                      return item.id === Number(OrderId)
                  });
                  saleId = obj.saleOrderId
                    this.$confirm('确认状态修改？')
                    .then(_ => {
                      this.P_adds = true;
                        api.OutboundGoods_status({id: OrderId,status:1,saleOrderId:saleId}).then(res => {
                            if (res.status == 200) {
                              this.P_adds = false;
                                this.$message({
                                  message: "状态修改"+res.msg,
                                  type: 'success'
                                });
                                let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                                this.pageNum = params.pageNum;
                                this.OutboundGoods_info(params)
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
          let OrderId,_this = this,obj={},saleId;
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[1];
            for(var i in attr)
              {
                if(i == "value"){
                  //删除ID
                  OrderId = attr[i];
                  obj = _this.tableData.find((item)=>{
                      if(item.id === Number(OrderId))
                      return item.id === Number(OrderId)
                  });
                  saleId = obj.saleOrderId
                }
              }
            }
          });
          this.OrderId = OrderId
          this.Userdispaly = true
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
   #OutboundGoods .el-dialog--small{
      width: 60%;
   }
      /* 分页 */
   #OutboundGoods .block{
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
    #OutboundGoods .List_button_cz{
    background: #92CC8F;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
   }
   #OutboundGoods .cell .delete{
     background: #E74C3C
   }
   #OutboundGoods .cell .document{
     background: #70C8CB
   }
  #OutboundGoods .cell .circle{
     background: #EF948B
   }
  #OutboundGoods .cell .message{
     background: #E74C3C
   }
   #OutboundGoods .block .el-pagination{
     padding-left: 1rem;
   }
   #OutboundGoods .container_padding th{
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
   }
   #OutboundGoods .container_padding th:first-child{
     border-left: 0;
   }
   #OutboundGoods .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }
   #OutboundGoods .container_padding td:first-child{
     padding-left: 1px;
   }
   #OutboundGoods .container_padding tr:nth-child(2n+1){
     background: #F9F9F9
   }
  #OutboundGoods .container_padding tr:nth-child(2n+1) td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }

  #OutboundGoods .select_top{
    position: relative;
    width: 100%;
    float: left;
    padding-top: 2rem;
  }
  #OutboundGoods .select_top span{
    display: block;
    float: left;
    line-height: 2rem;
    margin-right: 0.8rem;
  }
  #OutboundGoods .select_top .el-input{
    width: 48%;
    line-height: 1.8rem;
    border-radius: .2rem;
    outline: 0;
  }
  #OutboundGoods .box-card::-webkit-scrollbar {
      width: 0px;
  }
  #OutboundGoods .box-card th{
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    font-weight: 400;
  }
  #OutboundGoods .box-card th:first-child{
    border-left: 0;
  }
  #OutboundGoods .box-card td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
  }
  #OutboundGoods .box-card td:first-child{
    padding-left: 1px;
  }
  #OutboundGoods .box-card .button_div{
    padding: .5rem;
  }
  #OutboundGoods .el-date-editor.el-input {
      width: 100%;
  }
  #OutboundGoods .text th{
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }
  .dataS_dis_value{
    position: relative;
  }

  #OutboundGoods .dataS{
      position: fixed;
      width: 25%;
      background: #fff;
      height: 6rem;
      line-height: 2.5rem;
      border: 1px solid #ccc;
      border-top: 0;
      z-index: 1111111;
      overflow-y: scroll;
  }
  #OutboundGoods .dataS span{
      display: block;
      width: 88%;
      height: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
  #OutboundGoods .dataS>div{
    border-bottom: 1px solid #ccc;
  }
  
  #OutboundGoods .el-dialog__header {
      padding: 1.5rem 1.5rem;
      background: #2C3E50;
  }
  #OutboundGoods .el-dialog__title{
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
  #OutboundGoods .el-dialog__body{
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }
  /* !important */
  #OutboundGoods .footer_button{
    position: absolute;
    margin: 0;
    width: 100%;
    height: 5.8rem;
    left: 0;
    background: #EDF2F8;
    bottom: 0;
  }
  #OutboundGoods .footer_button .el-form-item__content{
      margin-left:0 !important;
      min-height: 5.8rem;
      text-align: center;
  }
  #OutboundGoods .footer_button .div_P{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: .3rem;
  }
  #OutboundGoods .div_P div{
    color: #9C9C9C;
    font-size: 14px;
  }
  #OutboundGoods .footer_button .el-button{
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2C3E50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
  #OutboundGoods .footer_button .el-button:hover{
    border: 1px solid #3b5168;
    background: #3b5168;
  }
  #OutboundGoods .header_button {
    width: 86px;
    background: #2C3E50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #OutboundGoods .header_button:hover{
    border: 1px solid transparent;
  }
  #OutboundGoods .header_button_a{
    width: 86px;
    background: #47A136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #OutboundGoods .header_button_a:hover{
    border: 1px solid transparent;
  }
  #OutboundGoods .button_list{
    float: right;
  }
  #OutboundGoods .button_list button{
    background-color: #92CC8F;
    border-color: #92CC8F;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #OutboundGoods .button_list button:last-child{
    background-color: #E74C3C;
    border-color: #E74C3C;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #OutboundGoods .SendOut .el-dialog--small{
    width: 30%;
  }


@media screen and (min-width: 1300px) and (max-width: 1680px){
  #OutboundGoods .m-lg-1{
    width: 8.33% !important;
  }
  #OutboundGoods .m-lg-2{
    width: 16.66% !important;
  }
  #OutboundGoods .m-lg-3{
    width: 25% !important;
  }
  #OutboundGoods .m-lg-4{
    width: 33.33% !important;
  }
  #OutboundGoods .m-lg-5{
    width: 41.66% !important;
  }
  #OutboundGoods .m-lg-6{
    width: 49.98% !important;
  }
  #OutboundGoods .m-lg-7{
    width: 58.31% !important;
  }
  #OutboundGoods .m-lg-8{
    width: 66.64% !important;
  }
  #OutboundGoods .m-lg-9{
    width: 74.97% !important;
  }
  #OutboundGoods .m-lg-10{
    width: 83.30% !important;
  }
  #OutboundGoods .m-lg-11{
    width: 91.63% !important;
  }
  #OutboundGoods .m-lg-12{
    width: 100% !important;
  }
  #OutboundGoods .mr {
    margin-left: 0;
  }
}
</style>
<style lang="scss" scoped>
  // #OutboundGoods .el-dialog__header {
  //     padding: 1.5rem 0; 
  // }
</style>

