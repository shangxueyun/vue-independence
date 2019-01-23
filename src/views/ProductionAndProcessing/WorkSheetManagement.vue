<template>
	<div id="WorkSheetManagement" v-loading="Main_loading">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="padding:1.5rem">
          <el-col :md="18" :lg="20" class="m-lg-10" :span="20" style="">
            <el-input style="width:26%" placeholder="请输入企业或原料名称"></el-input>
            <el-button size="medium" class="mr header_button" :disabled="roleControl.searchRole"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="6" :lg="4" class="m-lg-2" :span="4">
            <el-button style="float: right;" size="medium" class="mr header_button_a" @click="add()" :disabled="roleControl.addRole"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #F4F4F4;width:100%;margin-top: 1.5rem;"> 
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">日期</th>
                        <th colspan="1" style="text-align:center;width:11%" rowspan="1">加工批次号</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">负责人</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="items in tableData">
                        <td><div class="cell">{{ items.processOrderTime  }}</div></td>
                        <td><div class="cell">{{ items.processOrderBatch  }}</div></td>
                        <td><div class="cell">{{ items.dutyUser  }}</div></td>
                        <td><div class="cell" :idvalue="items.id">
                          <button class="List_button_cz"  :idvalue="items.id" :disabled="roleControl.EditRole" @click="Edit($event)"><i :idvalue="items.id" class="el-icon-edit"></i></button>
                          <button class="List_button_cz"  :idvalue="items.id" :disabled="roleControl.DeleteRole" @click="Delete($event)"><i :idvalue="items.id" class="el-icon-delete"></i></button>
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
          v-loading="Main_loading"
          title="新增加工单"
          :visible.sync="Processing_Template_Visible"
          width="100%"
          id="add_form_div"
          :before-close="handleClose">
          <el-form :model="Add_form" label-width="72px">
            <el-form-item label="加工批次:" style="width: 32%;float: left;">
              <el-input disabled @focus="dataS_dis=false;" v-model="Add_form.processOrderBatch"></el-input>
            </el-form-item>
            <el-form-item label="加工工艺:" style="width: 32%;float: left;">
              <el-input @focus="dataS_dis=false;" v-model="Add_form.processTechnic"></el-input>
            </el-form-item>
            <el-form-item label="保质期:" style="width: 32%;float: left;">
              <el-input @focus="dataS_dis=false;" v-model="Add_form.shelfLife"></el-input>
            </el-form-item>
            <el-form-item label="加工模板:" style="width: 32%;float: left;">
              <el-input v-model="search" class="dataS_dis_value" @focus="dataS_dis=true;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis">
                  <div v-for="items in tables" @click="product_type(items.id,items.processTemplateName)" :key="items.id">
                      <span style="margin-left: 10px" v-html="format(items.processTemplateName)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-form-item label="负责人:" style="width: 32%;float: left;">
              <el-input disabled @focus="dataS_dis=false;" v-model="Add_form.dutyUser"></el-input>
            </el-form-item>
            <el-form-item label="时间:" style="width: 32%;float: left;">
              <el-date-picker @change="Add_showTimes" v-model="Add_materialInTime" type="datetime" format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
              <el-card class="box-card" style="width: 100%;">
                <div slot="header" class="clearfix">
                  <span style="font-size: 16px;font-weight: bold;color: #2C3E50;">加工单明细</span>
                </div>
                <div class="text item Template">
                  <!-- 原料 -->
                  <el-card class="box-card" style="width: 100%;">
                    <div slot="header" class="clearfix">
                      <span>原料</span>
                      <div class="button_list">
                        <el-button type="primary" @click="processTemplate_material_add(false)"><i class="el-icon-plus"></i></el-button>
                        <el-button type="primary" @click="processTemplate_material_del(false)"><i class="el-icon-delete"></i></el-button>
                      </div>

                    </div>
                    <div class="text item">
                      <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;width:100%"> 
                          <thead>
                            <tr>
                              <th colspan="1" style="text-align:center;width:25%" rowspan="1">名称</th>
                              <th colspan="1" style="text-align:center;width:25%" rowspan="1">单位</th>
                              <th colspan="1" style="text-align:center;width:25%" rowspan="1">数量</th>
                              <th colspan="1" style="text-align:center;width:25%" rowspan="1">属性</th><!-- 主/辅 -->
                            </tr>
                          </thead>
                      </table>
                      <div style="height: 10rem;overflow-y: scroll;">
                        <div v-for="items in Add_processTemplate_material" :key="items.id">
                          <worksheet-details  :DetailsData="items" :flg="items.id"></worksheet-details>
                        </div>
                      </div>
                    </div>
                  </el-card>

                  <!-- 产品 -->
                  <el-card class="box-card" style="width: 100%;margin-top:2rem">
                    <div slot="header" class="clearfix">
                      <span>产品</span>
                      <div class="button_list">
                        <el-button type="primary" @click="processTemplate_product_add(false)"><i class="el-icon-plus"></i></el-button>
                        <el-button type="primary" @click="processTemplate_product_del(false)"><i class="el-icon-delete"></i></el-button>
                      </div>

                    </div>
                    <div class="text item">
                      <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;width:100%"> 
                          <thead>
                            <tr>
                              <th colspan="1" style="text-align:center;width:32%" rowspan="1">名称</th>
                              <th colspan="1" style="text-align:center;width:32%" rowspan="1">单位</th>
                              <th colspan="1" style="text-align:center;width:32%" rowspan="1">数量</th>
                            </tr>
                          </thead>
                      </table>
                      <div style="height: 10rem;overflow-y: scroll;">
                        <div v-for="items in Add_processTemplate_product" :key="items.id">
                          <worksheet-details :DetailsData="items"  :flg="items.id" :TYPE="items.id"></worksheet-details>
                        </div>
                      </div>
                    </div>
                  </el-card>

                </div>
              </el-card>
            <el-form-item class="footer_button">
              <div class="div_P">
                <div>操作员：陈冰/操作时间：2018-10-23 12:32:01 </div>
                <div>审核员：周丽 /审核时间：2018-10-23 15:44:33</div>
                <div>发货员：陈冰/发货时间：2018-10-24 15:22:01</div>
              </div>
              <el-button @click="WorkSheetManagement_addsP()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        
        <el-dialog
          v-loading="Main_loading"
          title="修改加工单"
          :visible.sync="Modified_form_Visible"
          width="100%"
          id="add_form_div"
          :before-close="handleClose">
          <el-form :model="Edits_form" label-width="72px">
            <el-form-item label="加工批次:" style="width: 32%;float: left;">
              <el-input disabled @focus="dataS_dis=false;" v-model="Edits_form.processOrderBatch"></el-input>
            </el-form-item>
            <el-form-item label="加工工艺:" style="width: 32%;float: left;">
              <el-input @focus="dataS_dis=false;" v-model="Edits_form.processTechnic"></el-input>
            </el-form-item>
            <el-form-item label="保质期:" style="width: 32%;float: left;">
              <el-input @focus="dataS_dis=false;" v-model="Edits_form.shelfLife"></el-input>
            </el-form-item>
            <el-form-item label="加工模板:" style="width: 32%;float: left;clear: both;">
              <el-input disabled v-model="search" class="dataS_dis_value" @focus="dataS_dis=true;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis">
                  <div v-for="items in tables" @click="product_type(items.id,items.processTemplateName)" :key="items.id">
                      <span style="margin-left: 10px" v-html="format(items.processTemplateName)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-form-item label="负责人:" style="width: 32%;float: left;">  
              <el-input disabled @focus="dataS_dis=false;" v-model="Edits_form.dutyUser"></el-input>
            </el-form-item>
            <el-form-item label="时间:" style="width: 32%;float: left;">
              <el-date-picker @change="Edits_showTimes" v-model="Edits_materialInTime" type="datetime" format="yyyy-MM-dd hh:mm:ss" placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
              <el-card class="box-card" style="width: 100%;">
                <div slot="header" class="clearfix">
                  <span style="font-size: 16px;font-weight: bold;color: #2C3E50;">加工单明细</span>
                </div>
                <div class="text item Template">
                  <!-- 原料 -->
                  <el-card class="box-card" style="width: 100%;">
                    <div slot="header" class="clearfix">
                      <span>原料</span>
                      <div class="button_list">
                        <el-button type="primary" @click="processTemplate_material_add(true)"><i class="el-icon-plus"></i></el-button>
                        <el-button type="primary" @click="processTemplate_material_del(true)"><i class="el-icon-delete"></i></el-button>
                      </div>

                    </div>
                    <div class="text item">
                      <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;width:100%"> 
                          <thead>
                            <tr>
                              <th colspan="1" style="text-align:center;width:25%" rowspan="1">名称</th>
                              <th colspan="1" style="text-align:center;width:25%" rowspan="1">单位</th>
                              <th colspan="1" style="text-align:center;width:25%" rowspan="1">数量</th>
                              <th colspan="1" style="text-align:center;width:25%" rowspan="1">属性</th><!-- 主/辅 -->
                            </tr>
                          </thead>
                      </table>
                      <div style="height: 8rem;overflow-y: scroll;">
                        <div v-for="items in Edits_processTemplate_material" :key="items.id">
                          <worksheet-details :DetailsData="items" :Edits="items.id" :flg="items.id"></worksheet-details>
                        </div>
                      </div>
                    </div>
                  </el-card>

                  <!-- 产品 -->
                  <el-card class="box-card" style="width: 100%;margin-top:2rem">
                    <div slot="header" class="clearfix">
                      <span>产品</span>
                      <div class="button_list">
                        <el-button type="primary" @click="processTemplate_product_add(true)"><i class="el-icon-plus"></i></el-button>
                        <el-button type="primary" @click="processTemplate_product_del(true)"><i class="el-icon-delete"></i></el-button>
                      </div>

                    </div>
                    <div class="text item">
                      <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;width:100%"> 
                          <thead>
                            <tr>
                              <th colspan="1" style="text-align:center;width:32%" rowspan="1">名称</th>
                              <th colspan="1" style="text-align:center;width:32%" rowspan="1">单位</th>
                              <th colspan="1" style="text-align:center;width:32%" rowspan="1">数量</th>
                            </tr>
                          </thead>
                      </table>
                      <div style="height: 8rem;overflow-y: scroll;">
                        <div v-for="items in Edits_processTemplate_product" :key="items.id">
                          <worksheet-details :DetailsData="items" :Edits="items.id" :flg="items.id" :TYPE="items"></worksheet-details>
                        </div>
                      </div>
                    </div>
                  </el-card>

                </div>
              </el-card>
            <el-form-item class="footer_button">
              <div class="div_P">
                <div>操作员：陈冰/操作时间：2018-10-23 12:32:01 </div>
                <div>审核员：周丽 /审核时间：2018-10-23 15:44:33</div>
                <div>发货员：陈冰/发货时间：2018-10-24 15:22:01</div>
              </div>
              <el-button @click="WorkSheetManagement_EditsP()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>


      </el-row>
    </el-row>
	</div>

</template>

<script>
import api from "../../api/api.js";
import worksheetDetails from "../../components/WorkSheet-details.vue"
  export default {
    components: {
      worksheetDetails,
    },
    data() {
      return {
          tableData: [
            
          ],
          Times_search:[new Date(),new Date()],
          footer_Num:'85',
          pageNum:'',
          Processing_Template_Visible: false,
          Modified_form_Visible: false,
          Main_loading:false,
          Main_loading:false,
          search:'',
          tableData1:[],
          dataS_dis:false,
          //新增
          Add_form:{
            processOrderBatch:'',
            processTechnic:'',
            shelfLife:'',
            processTemplateId:'',
            dutyUser:'',
            ProcessOrderTime:this.Add_materialInTime,
          },
          Add_materialInTime:'',

          materialS:[],
          productS:[],
          Add_processTemplate_material:[],
          Add_processTemplate_product:[],
          companyId:"",
          PagesNumber:10,
          //修改
          Edits_form:{
            processOrderBatch:'',
            processTechnic:'',
            shelfLife:'',
            processTemplateId:'',
            dutyUser:'',
            status:'',
            ProcessOrderTime:this.Edits_materialInTime,
          },
          Edits_materialInTime:'',
          Edits_processTemplate_material:[],
          Edits_processTemplate_product:[],

          Edits_DetailsData:[

          ],
          Edits_Id:null,
          EditsIdS:null,
          Edits_processTemplateDetails :[],
          roleControl:{
            addRole:true,
            EditRole:true,
            DeleteRole:true,
            searchRole:true,
          },
      };
    },
    created() {
        this.SessionStorageDisposeDel();
        let allRoles = JSON.parse(sessionStorage.getItem('newRoutes')),name = "加工模板管理";
        allRoles.forEach((v,i)=>{
          v.children.forEach((v1,i1)=>{
              if(v1.permissionName==name){
                let Vchildren = v1.children;
                Vchildren.forEach((v2,i2)=>{
                  switch (v2.permissionName) {
                    case '加工模板添加':
                          this.roleControl.addRole = false;
                          break;
                    case '加工模板修改':
                          this.roleControl.EditRole = false;
                          break;
                    case '加工模板删除':
                          this.roleControl.DeleteRole = false;
                          break;
                    case '加工模板查询':
                          this.roleControl.searchRole = false;
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
    },
    mounted() {
        let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
        this.pageNum = params.pageNum;
        this.WorkSheetManagement_info(params)
    },
    methods: {
      switchString(str){
        switch (str) {
            case 0:
                  return "禁用"
                  break;
            case 1:
                  return "启用"
                  break;
            case "禁用":
                  return 0
                  break;
            case "启用":
                  return 1
                  break;
            default:
              break;
        }
      },
      product_type(e,p){
          this.dataS_dis = false;
          this.search = ""
          this.search = p 
          this.Add_form.processTemplateId = e
          //
          debugger  
          this.P_adds = true
          this.Add_processTemplate_material = []
          this.Add_processTemplate_product = []
          this.Add_processTemplate_material.pop()
          this.Add_processTemplate_product.pop()
          this.SessionStorageDisposeDel();
          api.ProcessingManagement_infoChild({id:e}).then(res => {
            
              if (res.status == 200) {
                  let arry = [],obj={},obj1={},materialArr = res.processTemplateRawDetailList,productArr = res.processTemplateGoodsDetailList;
                  materialArr.forEach((v,i)=>{
                    this.Add_processTemplate_material.push(v)
                  })
                  productArr.forEach((v,i)=>{
                    this.Add_processTemplate_product.push(v)
                  })
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
      format (val) {
        if (val.indexOf(this.search) !== -1 && this.search !== '') {
          return val.replace(this.search, '<span style="color:red">' + this.search + '</span>')
        } else {
          return val
        }
      },
      processTemplate_material_add(flg){
        if(flg){
          let obj = {id:1}
          this.Edits_processTemplate_material.push(obj)       
        }else{
          let obj = {id:1}
          this.Add_processTemplate_material.push(obj)
        }
      },
      processTemplate_material_del(flg){
        if(flg){
          let leng = this.Edits_processTemplate_material.length-1
          this.materialS.push(leng)
          let obj = this.Edits_processTemplate_material.pop()
          this.P_adds = true
          api.WorkSheetManagement_infoChild_Delete_material({id:obj.id}).then(res => {
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
        }else{
          let leng = this.Add_processTemplate_material.length-1
          this.materialS.push(leng)
          this.Add_processTemplate_material.pop()
        }
        this.SessionStorageDisposeDel(true)
      },
      processTemplate_product_add(flg){
        if(flg){
          let obj = {id:1}
          this.Edits_processTemplate_product.push(obj)       
        }else{
          let obj = {id:1}
          this.Add_processTemplate_product.push(obj)
        }
      },
      processTemplate_product_del(flg){
        if(flg){
          let leng = this.Edits_processTemplate_product.length-1
          this.productS.push(leng)
          let obj = this.Edits_processTemplate_product.pop()
          this.P_adds = true
          api.WorkSheetManagement_infoChild_Delete_product({id:obj.id}).then(res => {
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
        }else{
          let leng = this.Add_processTemplate_product.length-1
          this.productS.push(leng)
          this.Add_processTemplate_product.pop()
        }
        this.SessionStorageDisposeDel(true,'Product')
      },
      Add_showTimes(val){
        this.Add_form.ProcessOrderTime = val;
        this.Add_materialInTime = val;
      },
      Edits_showTimes(val){
        this.Edits_form.ProcessOrderTime = val;
        this.Edits_materialInTime = val;
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
      handleSizeChange(done){
        let params = {pageNum:done.toString(),pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
        this.pageNum = done.toString();
        this.WorkSheetManagement_info(params)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.SessionStorageDisposeDel();
            this.Processing_Template_Visible =false
            let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
            this.pageNum = params.pageNum;
            this.WorkSheetManagement_info(params) 
            done();
          })
          .catch(_ => {});
      },
      WorkSheetManagement_info(params){
        this.Main_loading = true;
        
        api.WorkSheetManagement_info(params).then(res => {
            if (res.status == 200) {
                this.footer_Num = Number(res.total)
                this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
                res.data.forEach((v,i)=>{for(var j in v){
                  if(j == "enable")
                    v[j] = this.switchString(v[j]);
                }});
                this.tableData = res.data
                this.SessionStorageDisposeDel();
                this.Add_processTemplate_material = []
                this.Add_processTemplate_product = []
                this.Edits_processTemplate_material = []
                this.Edits_processTemplate_product = []
                
                this.Main_loading = false;
            } else if(res.status == 500){
                  this.Main_loading = false;
                  this.$message.error("服务器忙！");
            }else{
              this.Main_loading = false
              if(res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
              else
              this.$message.error(res.msg);
            }
        }); 
      },
      WorkSheetManagement_adds(obj){
          let _this = this,objstring = JSON.stringify(obj);
          this.Main_loading = true;
          debugger
          //新增
          api.WorkSheetManagement_adds(objstring).then(res => {

              if (res.status == 200) {
                this.Main_loading = false;
                  _this.$message({
                    message: "创建"+res.msg,
                    type: 'success'
                  });
                  //重置
                  let forms = this.Add_form;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.Add_form = forms
                  this.SessionStorageDisposeDel();
                  this.Processing_Template_Visible = false
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                  this.pageNum = params.pageNum;
                  this.WorkSheetManagement_info(params) 
              } else if(res.status == 500){
                    this.Main_loading = false;
                    this.$message.error("服务器忙！");
              }else{
                this.Main_loading = false
                if(res.msg == undefined || res.msg == "")
                this.$message.error("服务器忙！");
                else
                this.$message.error(res.msg);
              }
          });   
      },
      SessionStorageDisposeDel(type,str){
        if(type){
          debugger
          if(str == 'Product'){
            let str1 = "WorkSheet_Product_details",arr1 = this.productS;
            arr1.forEach((v,i)=>{
              for(var j in sessionStorage){
                if(j == str1+"@"+v ){
                  sessionStorage.removeItem(str1+"@"+v);
                }
              }
            });
          }else{
            let str2 = "WorkSheet_Material_details",arr = this.materialS;
            arr.forEach((v,i)=>{
              for(var j in sessionStorage){
                if(j == str2+"@"+v ){
                  sessionStorage.removeItem(str2+"@"+v);
                }
              }
            });
          }
        }else{
          for(var i in sessionStorage){
            if(i.indexOf('WorkSheet_Material')==0)
            {
              sessionStorage.removeItem(i)
            }
          }
          for(var i in sessionStorage){
            if(i.indexOf('WorkSheet_Product')==0)
            {
              sessionStorage.removeItem(i)
            }
          }
          localStorage.flg = undefined          
        }
      },
      SessionStorageDisposeInfo(type){
        
        if(type){
          let str = "WorkSheet_Material_details",obj =[];
          for(var i in sessionStorage){
            if(i.indexOf(str)==0)
            {
              
              obj.push(JSON.parse(sessionStorage[i]))
            }
          }
          return obj
        }else
        {
          let str = "WorkSheet_Product_details",obj =[];
          for(var i in sessionStorage){
            if(i.indexOf(str)==0)
            {
              
              obj.push(JSON.parse(sessionStorage[i]))
            }
          }
          return obj
        }

      },
      WorkSheetManagement_addsP(){
        this.Add_processTemplateDetails = this.SessionStorageDisposeInfo();
        if(this.Add_form.processOrderBatch == "" 
        || this.Add_form.processTechnic == "" 
        || this.Add_form.shelfLife == "" 
        || this.Add_form.processTemplateId == "" 
        || this.Add_form.dutyUser == "" 
        || this.Add_form.ProcessOrderTime == ""  ){this.$message("数量不能为空！")}else{
              let obj = {},obj1 = {},obj2 = {};
              obj1.processOrder = {}
              obj1.processOrder.companyId = JSON.parse(sessionStorage.getItem('companyId'))
              obj1.processOrder.processOrderBatch = this.Add_form.processOrderBatch
              obj1.processOrder.processTechnic = this.Add_form.processTechnic
              obj1.processOrder.shelfLife = this.Add_form.shelfLife
              obj1.processOrder.processTemplateId = this.Add_form.processTemplateId
              obj1.processOrder.dutyUser = this.Add_form.dutyUser
              obj1.processOrder.processOrderTime = this.Add_form.ProcessOrderTime

              obj2.processOrder = obj1.processOrder
              obj2.processOrderOutDetailList = this.SessionStorageDisposeInfo(true)
              obj2.processOrderInDetailList = this.SessionStorageDisposeInfo(false)
              this.WorkSheetManagement_adds(obj2)
        }
      },
      MaterialManagement_Edits(){},
      add(){
          let forms = this.Add_form;
          for(var i in forms){
            forms[i] = "";
          }
          debugger
          this.Add_form = forms
          this.search = "";
          this.Add_form.processOrderBatch = this.Date_day().replace(/:/g,"").replace(/-/g,"").replace(/ /g,"")
          this.Add_materialInTime = this.Date_day()
          this.Add_form.dutyUser = JSON.parse(sessionStorage.getItem('user')).username
          this.Add_form.ProcessOrderTime = this.Date_day()
          this.Processing_Template_Visible = true;
          this.Add_processTemplate_material = []
          this.Add_processTemplate_product = []
          this.SessionStorageDisposeDel();
          let params = {companyId:JSON.parse(sessionStorage.getItem('companyId'))}
          this.Main_loading = true;
          //获取模糊查询数据
          api.ProcessingManagement_info(params).then(res => {
              if (res.status == 200) {
                  this.tableData1 = res.data
                  this.Main_loading = false;
              } else if(res.status == 500){
                    this.Main_loading = false;
                    this.$message.error("服务器忙！");
              }else{
                this.Main_loading = false;
                if(res.msg == undefined || res.msg == "")
                this.$message.error("服务器忙！");
                else
                this.$message.error(res.msg);
              }
          }); 
      },
      Edit(e){
        let idvalue,materialid,obj={},formData;
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes;
            for(var i in attr)
              {
                  for(var j in attr[i])
                  {
                    if(j == "name")
                    {
                      if(attr[i].name == "idvalue")
                      {
                        idvalue = attr[i].value
                      }
                    }
                  }
              }
            }
          });
          let forms = this.Edits_form;
          for(var i in forms){
            forms[i] = "";
          }
          this.Edits_form = forms
          obj = this.tableData.find((item)=>{
              if(item.id === Number(idvalue))
              return item.id === Number(idvalue)
          });

          //变量接收对象
          formData = obj;
          //循环赋值
          
          for(var i in formData){this.Edits_form[i] = formData[i]}
          debugger
          this.Edits_form.ProcessOrderTime = formData.processOrderTime
          this.Edits_materialInTime = formData.processOrderTime
          this.Edits_Id = formData.processTemplateId;this.EditsIdS = formData.id
          this.Modified_form_Visible = true;
          this.SessionStorageDisposeDel()
          this.Main_loading = true;
          this.Edits_processTemplate_material = []
          this.Edits_processTemplate_product = []
          this.Edits_processTemplate_material.pop()
          this.Edits_processTemplate_product.pop()
          let params = {companyId:JSON.parse(sessionStorage.getItem('companyId'))}
          //获取模糊查询数据
          api.ProcessingManagement_info(params).then(res => {
              if (res.status == 200) {
                  this.tableData1 = res.data
                  let obj = {}
                  obj = this.tableData1.find((item)=>{
                      if(item.id === Number(this.Edits_Id))
                      return item.id === Number(this.Edits_Id)
                  });
                  this.search = obj.processTemplateName
                  api.WorkSheetManagement_infoChild({id:this.EditsIdS}).then(res => {
                      if (res.status == 200) {
                          this.Main_loading = false;
                          let arry = [],obj={},obj1={},materialArr = res.processOrderOutDetailList,productArr = res.processOrderInDetailList;
                          materialArr.forEach((v,i)=>{
                            this.Edits_processTemplate_material.push(v)
                          })
                          productArr.forEach((v,i)=>{
                            this.Edits_processTemplate_product.push(v)
                          })
                      } else if(res.status == 500){
                            this.Main_loading = false;
                            this.$message.error("服务器忙！");
                      }else{
                        this.Main_loading = false
                        if(res.msg == undefined || res.msg == "")
                        this.$message.error("服务器忙！");
                        else
                        this.$message.error(res.msg);
                      }
                  });  
                  this.Main_loading = false;
              } else if(res.status == 500){
                    this.Main_loading = false;
                    this.$message.error("服务器忙！");
              }else{
                this.Main_loading = false;
                if(res.msg == undefined || res.msg == "")
                this.$message.error("服务器忙！");
                else
                this.$message.error(res.msg);
              }
          });  
      },
      WorkSheetManagement_EditsP(){

        if(this.Edits_form.processOrderBatch == "" 
        || this.Edits_form.processTechnic == "" 
        || this.Edits_form.shelfLife == "" 
        || this.Edits_form.processTemplateId == "" 
        || this.Edits_form.dutyUser == "" 
        || this.Edits_form.ProcessOrderTime == ""  ){this.$message("数量不能为空！")}else{
              let obj = {},obj1 = {},obj2 = {};
              obj1.processOrder = {}
              obj1.processOrder.companyId = JSON.parse(sessionStorage.getItem('companyId'))
              obj1.processOrder.id = this.EditsIdS;
              obj1.processOrder.processOrderBatch = this.Edits_form.processOrderBatch
              obj1.processOrder.processTechnic = this.Edits_form.processTechnic
              obj1.processOrder.shelfLife = this.Edits_form.shelfLife
              obj1.processOrder.processTemplateId = this.Edits_form.processTemplateId
              obj1.processOrder.dutyUser = this.Edits_form.dutyUser
              obj1.processOrder.processOrderTime = this.Edits_form.ProcessOrderTime
              obj1.processOrder.status = this.Edits_form.status

              obj2.processOrder = obj1.processOrder
              obj2.processOrderOutDetailList = this.SessionStorageDisposeInfo(true)
              obj2.processOrderInDetailList = this.SessionStorageDisposeInfo(false)
              this.WorkSheetManagement_Edits(obj2)
        }
      },
      WorkSheetManagement_Edits(obj){
          let _this = this,objstring = JSON.stringify(obj);
          this.Main_loading = true;
          debugger
          //新增
          api.WorkSheetManagement_Edits(objstring).then(res => {

              if (res.status == 200) {
                this.Main_loading = false;
                this.Modified_form_Visible = false;
                  _this.$message({
                    message: "修改"+res.msg,
                    type: 'success'
                  });
                  let forms = this.Edits_form;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.Edits_form = forms
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
                  this.pageNum = params.pageNum;
                  this.WorkSheetManagement_info(params) 
              } else if(res.status == 500){
                  this.Main_loading = false
                    this.$message.error("服务器忙！");
              }else{
                  this.Main_loading = false
                  if(res.msg == undefined || res.msg == "")
                  this.$message.error("服务器忙！");
                  else
                  this.$message.error(res.msg);
              }
          });  
      },
      Delete(e){
        let idvalue,obj={};
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes;
            for(var i in attr)
              {
                  for(var j in attr[i])
                  {
                    if(j == "name")
                    {
                      if(attr[i].name == "idvalue")
                      {
                        idvalue = attr[i].value 
                      }
                    }
                  }
              }

            }
          });
          if(idvalue){
            this.$confirm('确认删除？')
            .then(_ => {
              this.P_adds = true;
                api.WorkSheetManagement_Delete({id: idvalue}).then(res => {

                    if (res.status == 200) {
                        this.P_adds = false;
                        this.$message({
                          message: "删除"+res.msg,
                          type: 'success'
                        });
                        let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                        this.pageNum = params.pageNum;
                        this.WorkSheetManagement_info(params) 
                    } else if(res.status == 500){ 
                          this.P_adds = false;
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
   #WorkSheetManagement .el-dialog--small{
      width: 50%;
   }
   #WorkSheetManagement .block{
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
   #WorkSheetManagement .List_button_cz{
    background: #92CC8F;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
   }
   #WorkSheetManagement .cell .List_button_cz:last-child{
     background: #E74C3C
   }
   #WorkSheetManagement .block .el-pagination{
     padding-left: 1rem;
   }
   #WorkSheetManagement .container_padding th{
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
   }
   #WorkSheetManagement .container_padding th:first-child{
     border-left: 0;
   }
   #WorkSheetManagement .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }
   #WorkSheetManagement .container_padding td:first-child{
     padding-left: 1px;
   }
   #WorkSheetManagement .container_padding tr:nth-child(2n+1){
     background: #F9F9F9
   }
  #WorkSheetManagement .container_padding tr:nth-child(2n+1) td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }

  #WorkSheetManagement .select_top{
    position: relative;
    width: 33.3%;
    float: left;
    height: 2.5rem;
  }
  #WorkSheetManagement .select_top span{
    display: block;
    float: left;
    line-height: 2rem;
    margin-right: 0.8rem;
  }
  #WorkSheetManagement .select_top .el-input{
    width: 75%;
    line-height: 1.8rem;
    border-radius: .2rem;
    outline: 0;
  }
  #WorkSheetManagement .box-card::-webkit-scrollbar {
      width: 0px;
  }
  #WorkSheetManagement .box-card th{
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    font-weight: 400;
  }
  #WorkSheetManagement .box-card th:first-child{
    border-left: 0;
  }
  #WorkSheetManagement .box-card td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
  }
  #WorkSheetManagement .box-card td:first-child{
    padding-left: 1px;
  }
  #WorkSheetManagement .box-card .button_div{
    padding: .5rem;
  }

  #WorkSheetManagement .Template .el-card__body{
    padding: 0px;
  }
  #WorkSheetManagement .el-date-editor.el-input {
      width: 100%;
  }
  #WorkSheetManagement .text th{
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }
  #WorkSheetManagement .dataS_dis_value{
    position: relative;
  }
  #WorkSheetManagement .dataS{
    position: absolute;
    width: 100%;
    background: #fff;
    height: 6rem;
    line-height: 2.5rem;
    left: 0;
    border: 1px solid #ccc;
    border-top: 0;
    z-index: 1111111;
    overflow-y: scroll;
  }
  #WorkSheetManagement .dataS div{
      display: block;
      width: 100%;
      height: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid #ccc;
  }
  
  #WorkSheetManagement .el-dialog__header {
      padding: 1.5rem 1.5rem;
      background: #2C3E50;
  }
  #WorkSheetManagement .el-dialog__title{
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
  #WorkSheetManagement .el-dialog__body{
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }
  /* !important */
  #WorkSheetManagement .footer_button{
    position: absolute;
    margin: 0;
    width: 100%;
    height: 5.8rem;
    left: 0;
    background: #EDF2F8;
    bottom: 0;
  }
  #WorkSheetManagement .footer_button .el-form-item__content{
      margin-left:0 !important;
      min-height: 5.8rem;
      text-align: center;
  }
  #WorkSheetManagement .footer_button .div_P{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: .3rem;
  }
  #WorkSheetManagement .div_P div{
    color: #9C9C9C;
    font-size: 14px;
  }
  #WorkSheetManagement .footer_button .el-button{
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2C3E50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
  #WorkSheetManagement .footer_button .el-button:hover{
    border: 1px solid #3b5168;
    background: #3b5168;
  }
  #WorkSheetManagement .header_button {
    width: 86px;
    background: #2C3E50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #WorkSheetManagement .header_button:hover{
    border: 1px solid transparent;
  }
  #WorkSheetManagement .header_button_a{
    width: 86px;
    background: #47A136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #WorkSheetManagement .header_button_a:hover{
    border: 1px solid transparent;
  }
  #WorkSheetManagement .el-card__header {
    padding: 0 20px;
    line-height: 3rem;
  }
  #WorkSheetManagement .button_list{
    float: right;
  }
  #WorkSheetManagement .button_list button{
    background-color: #92CC8F;
    border-color: #92CC8F;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #WorkSheetManagement .button_list button:last-child{
    background-color: #E74C3C;
    border-color: #E74C3C;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }




@media screen and (min-width: 1200px) and (max-width: 1680px){
  .m-lg-1{
    width: 8.33%;
  }
  .m-lg-2{
    width: 16.66%;
  }
  .m-lg-3{
    width: 25%;
  }
  .m-lg-4{
    width: 33.33%;
  }
  .m-lg-5{
    width: 41.66%;
  }
  .m-lg-6{
    width: 49.98%;
  }
  .m-lg-7{
    width: 58.31%;
  }
  .m-lg-8{
    width: 66.64%;
  }
  .m-lg-9{
    width: 74.97%;
  }
  .m-lg-10{
    width: 83.30%;
  }
  .m-lg-11{
    width: 91.63%;
  }
  .m-lg-12{
    width: 100%;
  }
  #WorkSheetManagement .el-dialog--small {
      width: 60%;
  }
  #WorkSheetManagement .select_top .el-input {
      width: 70%;
  }
  #WorkSheetManagement .dataS {
      width: 72%;
      left: 27%;
  }
}
</style>
