<template>
	<div id="ProcessingManagement" v-loading="Main_loading">
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
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">模版名称 </th>
                        <th colspan="1" style="text-align:center;width:11%" rowspan="1">描述</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">状态</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="items in tableData">
                        <td><div class="cell">{{ items.processTemplateName  }}</div></td>
                        <td><div class="cell">{{ items.description}}</div></td>
                        <td><div class="cell">{{ items.enable }}</div></td>
                        <td><div class="cell">
                          <button class="List_button_cz"  :idvalue="items.id" :disabled="roleControl.EditRole" @click="Edit($event)"><i class="el-icon-edit"></i></button>
                          <button class="List_button_cz"  :idvalue="items.id" :disabled="roleControl.DeleteRole" @click="Delete($event)"><i class="el-icon-delete"></i></button>
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
          title="新增加工模板"
          :visible.sync="Processing_Template_Visible"
          width="100%"
          id="add_form_div"
          :before-close="handleClose">
          <el-form :model="Add_form" label-width="72px">
            <el-form-item label="模板名称:" style="width: 49%;float: left;">
              <el-input @focus="Add_dataS_dis1=false;Add_dataS_dis=false" v-model="Add_form.processTemplateName"></el-input>
            </el-form-item>
            <el-form-item label="模板描述:" style="width: 50%;float: left;">
              <el-input @focus="Add_dataS_dis1=false;Add_dataS_dis=false" v-model="Add_form.description"></el-input>
            </el-form-item>
            <el-form-item label="加工工艺:" style="width: 49%;float: left;">
              <el-input @focus="Add_dataS_dis1=false;Add_dataS_dis=false" v-model="Add_form.processTechnic"></el-input>
            </el-form-item>
            <el-form-item label="保质期:" style="width: 50%;float: left;">
              <el-input @focus="Add_dataS_dis1=false;Add_dataS_dis=false" v-model="Add_form.shelfLife"></el-input>
            </el-form-item>
              <el-card class="box-card" style="width: 100%;">
                <div slot="header" class="clearfix">
                  <span style="font-size: 16px;font-weight: bold;color: #2C3E50;">加工模板明细</span>
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
                              <th colspan="1" style="text-align:center;width:15%" rowspan="1">物料名称</th>
                              <th colspan="1" style="text-align:center;width:15%" rowspan="1">属性</th><!-- 原料、商品 -->
                              <th colspan="1" style="text-align:center;width:15%" rowspan="1">分类</th>
                              <th colspan="1" style="text-align:center;width:15%" rowspan="1">单位</th>
                              <th colspan="1" style="text-align:center;width:15%" rowspan="1">规格</th>
                              <th colspan="1" style="text-align:center;width:15%" rowspan="1">主/辅料</th><!-- 主/辅 -->
                            </tr>
                          </thead>
                      </table>
                      <div style="height: 8rem;overflow-y: scroll;">
                        <div v-for="items in Add_processTemplate_material" :key="items.id">
                          <processing-details :mm="items.id"></processing-details>
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
                              <th colspan="1" style="text-align:center;width:20%" rowspan="1">物料名称</th>
                              <th colspan="1" style="text-align:center;width:20%" rowspan="1">属性</th><!-- 原料、商品 -->
                              <th colspan="1" style="text-align:center;width:20%" rowspan="1">分类</th>
                              <th colspan="1" style="text-align:center;width:20%" rowspan="1">单位</th>
                              <th colspan="1" style="text-align:center;width:20%" rowspan="1">规格</th>
                            </tr>
                          </thead>
                      </table>
                      <div style="height: 8rem;overflow-y: scroll;">
                        <div v-for="items in Add_processTemplate_product" :key="items.id">
                          <processing-details :TYPE="items.id"></processing-details>
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
              <el-button @click="ProcessingManagement_addsP()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        
        <el-dialog
          v-loading="Main_loading"
          title="修改加工模板"
          :visible.sync="Modified_form_Visible"
          width="100%"
          id="add_form_div"
          :before-close="handleClose">
          <el-form :model="Edits_form" label-width="72px">
            <el-form-item label="模板名称:" style="width: 49%;float: left;">
              <el-input @focus="Add_dataS_dis1=false;Add_dataS_dis=false" v-model="Edits_form.processTemplateName"></el-input>
            </el-form-item>
            <el-form-item label="模板描述:" style="width: 50%;float: left;">
              <el-input @focus="Add_dataS_dis1=false;Add_dataS_dis=false" v-model="Edits_form.description"></el-input>
            </el-form-item>
            <el-form-item label="加工工艺:" style="width: 49%;float: left;">
              <el-input @focus="Add_dataS_dis1=false;Add_dataS_dis=false" v-model="Edits_form.processTechnic"></el-input>
            </el-form-item>
            <el-form-item label="保质期:" style="width: 50%;float: left;">
              <el-input @focus="Add_dataS_dis1=false;Add_dataS_dis=false" v-model="Edits_form.shelfLife"></el-input>
            </el-form-item>
              <el-card class="box-card" style="width: 100%;">
                <div slot="header" class="clearfix">
                  <span style="font-size: 16px;font-weight: bold;color: #2C3E50;">加工模板明细</span>
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
                              <th colspan="1" style="text-align:center;width:15%" rowspan="1">物料名称</th>
                              <th colspan="1" style="text-align:center;width:15%" rowspan="1">属性</th><!-- 原料、商品 -->
                              <th colspan="1" style="text-align:center;width:15%" rowspan="1">分类</th>
                              <th colspan="1" style="text-align:center;width:15%" rowspan="1">单位</th>
                              <th colspan="1" style="text-align:center;width:15%" rowspan="1">规格</th>
                              <th colspan="1" style="text-align:center;width:15%" rowspan="1">主/辅料</th><!-- 主/辅 -->
                            </tr>
                          </thead>
                      </table>
                      <div style="height: 8rem;overflow-y: scroll;">
                        <div v-for="items in Edits_processTemplate_material" :key="items.id">
                          <processing-details :DetailsData="items" :flg="items.id"></processing-details>
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
                              <th colspan="1" style="text-align:center;width:20%" rowspan="1">物料名称</th>
                              <th colspan="1" style="text-align:center;width:20%" rowspan="1">属性</th><!-- 原料、商品 -->
                              <th colspan="1" style="text-align:center;width:20%" rowspan="1">分类</th>
                              <th colspan="1" style="text-align:center;width:20%" rowspan="1">单位</th>
                              <th colspan="1" style="text-align:center;width:20%" rowspan="1">规格</th>
                            </tr>
                          </thead>
                      </table>
                      <div style="height: 8rem;overflow-y: scroll;">
                        <div v-for="items in Edits_processTemplate_product" :key="items.id">
                          <processing-details :DetailsData="items" :flg="items.id" :TYPE="items"></processing-details>
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
              <el-button @click="ProcessingManagement_EditsP()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>


      </el-row>
    </el-row>
	</div>

</template>

<script>
import api from "../../api/api.js";
import processingDetails from "../../components/processing-details.vue"
  export default {
    components: {
      processingDetails,
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
          //新增
          Add_form:{
            processTemplateName:'',
            description:'',
            processTechnic:'',
            shelfLife:'',
          },

          Add_processTemplate_material:[],
          Add_processTemplate_product:[],

          companyId:"",
          PagesNumber:10,
          //修改
          Edits_form:{
            processTemplateName:'',
            description:'',
            processTechnic:'',
            shelfLife:'',
          },
          
          Edits_processTemplate_material:[],
          Edits_processTemplate_product:[],

          Edits_DetailsData:[

          ],
          Edits_Id:null,
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

    },
    mounted() {
        let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
        this.pageNum = params.pageNum;
        this.ProcessingManagement_info(params)
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
      processTemplate_material_add(flg){
        debugger
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
          this.Edits_processTemplate_material.pop()
        }else{
          this.Add_processTemplate_material.pop()
        }
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
          this.Edits_processTemplate_product.pop()
        }else{
          this.Add_processTemplate_product.pop()
        }
      },
      handleSizeChange(done){
        let params = {pageNum:done.toString(),pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
        this.pageNum = done.toString();
        this.ProcessingManagement_info(params)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            this.SessionStorageDisposeDel();
            this.Processing_Template_Visible =false
            let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),}
            this.pageNum = params.pageNum;
            this.ProcessingManagement_info(params) 
            done();
          })
          .catch(_ => {});
      },
      ProcessingManagement_info(params){
        this.Main_loading = true;
        
        api.ProcessingManagement_info(params).then(res => {
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
      ProcessingManagement_adds(obj){
          let _this = this,objstring = JSON.stringify(obj);
          this.Main_loading = true;
          
          //新增
          api.ProcessingManagement_adds(objstring).then(res => {

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
                  this.ProcessingManagement_info(params) 
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
      SessionStorageDisposeDel(){
        for(var i in sessionStorage){
          if(i.indexOf('processing_Material')==0)
          {
            sessionStorage.removeItem(i)
          }
        }
        for(var i in sessionStorage){
          if(i.indexOf('processing_Product')==0)
          {
            sessionStorage.removeItem(i)
          }
        }
        localStorage.flg = undefined
      },
      SessionStorageDisposeInfo(type){
        
        if(type){
          let str = "processing_Material_details",obj =[];
          for(var i in sessionStorage){
            if(i.indexOf(str)==0)
            {
              
              obj.push(JSON.parse(sessionStorage[i]))
            }
          }
          return obj
        }else
        {
          let str = "processing_Product_details",obj =[];
          for(var i in sessionStorage){
            if(i.indexOf(str)==0)
            {
              
              obj.push(JSON.parse(sessionStorage[i]))
            }
          }
          return obj
        }

      },
      ProcessingManagement_addsP(){
        this.Add_processTemplateDetails = this.SessionStorageDisposeInfo();
        if(this.Add_form.processTemplateName == "" 
        || this.Add_form.description == "" 
        || this.Add_form.processTechnic == "" 
        || this.Add_form.shelfLife == "" ){alert("数据不全")}else{
              let obj = {},obj1 = {},obj2 = {};
              obj1.processTemplate = {}
              obj1.processTemplate.companyId = JSON.parse(sessionStorage.getItem('companyId'))
              obj1.processTemplate.processTemplateName = this.Add_form.processTemplateName
              obj1.processTemplate.description = this.Add_form.description
              obj1.processTemplate.processTechnic = this.Add_form.processTechnic
              obj1.processTemplate.shelfLife = this.Add_form.shelfLife

              obj2.processTemplate = obj1.processTemplate
              obj2.processTemplateRawDetailList = this.SessionStorageDisposeInfo(true)
              obj2.processTemplateGoodsDetailList = this.SessionStorageDisposeInfo(false)
              this.ProcessingManagement_adds(obj2)
        }
      },
      MaterialManagement_Edits(){

      },
      add(){
          let forms = this.Add_form;
          for(var i in forms){
            forms[i] = "";
          }
          this.Add_form = forms
          this.Processing_Template_Visible = true;
          this.SessionStorageDisposeDel()
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
          this.Edits_form["enable"] = this.switchString(this.Edits_form["enable"]);
          this.Modified_form_Visible = true;
          this.SessionStorageDisposeDel()
          this.Main_loading = true;
          this.Edits_Id = idvalue
          this.Edits_processTemplate_material = []
          this.Edits_processTemplate_product = []
          this.Edits_processTemplate_material.pop()
          this.Edits_processTemplate_product.pop()
          api.ProcessingManagement_infoChild({id:idvalue}).then(res => {
              if (res.status == 200) {
                this.Main_loading = false;
                  let arry = [],obj={},obj1={},materialArr = res.processTemplateRawDetailList,productArr = res.processTemplateGoodsDetailList;
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
      },
      ProcessingManagement_EditsP(){
        this.Edits_processTemplateDetails = this.SessionStorageDisposeInfo();
        if(this.Edits_form.processTemplateName == "" 
        || this.Edits_form.description == "" 
        || this.Edits_form.processTechnic == "" 
        || this.Edits_form.shelfLife == "" ){alert("数据不全")}else{
              let obj = {},obj1 = {},obj2 = {};
              obj1.processTemplate = {}
              obj1.processTemplate.id = this.Edits_Id;
              obj1.processTemplate.companyId = JSON.parse(sessionStorage.getItem('companyId'))
              obj1.processTemplate.processTemplateName = this.Edits_form.processTemplateName
              obj1.processTemplate.description = this.Edits_form.description
              obj1.processTemplate.processTechnic = this.Edits_form.processTechnic
              obj1.processTemplate.shelfLife = this.Edits_form.shelfLife

              obj2.processTemplate = obj1.processTemplate
              obj2.processTemplateRawDetailList = this.SessionStorageDisposeInfo(true)
              obj2.processTemplateGoodsDetailList = this.SessionStorageDisposeInfo(false)

              this.ProcessingManagement_Edits(obj2)
        }
      },
      ProcessingManagement_Edits(obj){
          let _this = this,objstring = JSON.stringify(obj);
          this.Main_loading = true;
          //新增
          api.ProcessingManagement_Edits(objstring).then(res => {

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
                  this.ProcessingManagement_info(params) 
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
              debugger
                api.ProcessingManagement_Delete({id: idvalue}).then(res => {

                    if (res.status == 200) {
                        this.P_adds = false;
                        this.$message({
                          message: "删除"+res.msg,
                          type: 'success'
                        });
                        let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                        this.pageNum = params.pageNum;
                        this.ProcessingManagement_info(params) 
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
   #ProcessingManagement .el-dialog--small{
      width: 50%;
   }
   #ProcessingManagement .block{
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
   #ProcessingManagement .List_button_cz{
    background: #92CC8F;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
   }
   #ProcessingManagement .cell .List_button_cz:last-child{
     background: #E74C3C
   }
   #ProcessingManagement .block .el-pagination{
     padding-left: 1rem;
   }
   #ProcessingManagement .container_padding th{
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
   }
   #ProcessingManagement .container_padding th:first-child{
     border-left: 0;
   }
   #ProcessingManagement .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }
   #ProcessingManagement .container_padding td:first-child{
     padding-left: 1px;
   }
   #ProcessingManagement .container_padding tr:nth-child(2n+1){
     background: #F9F9F9
   }
  #ProcessingManagement .container_padding tr:nth-child(2n+1) td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }

  #ProcessingManagement .select_top{
    position: relative;
    width: 33.3%;
    float: left;
    height: 2.5rem;
  }
  #ProcessingManagement .select_top span{
    display: block;
    float: left;
    line-height: 2rem;
    margin-right: 0.8rem;
  }
  #ProcessingManagement .select_top .el-input{
    width: 75%;
    line-height: 1.8rem;
    border-radius: .2rem;
    outline: 0;
  }
  #ProcessingManagement .box-card::-webkit-scrollbar {
      width: 0px;
  }
  #ProcessingManagement .box-card th{
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    font-weight: 400;
  }
  #ProcessingManagement .box-card th:first-child{
    border-left: 0;
  }
  #ProcessingManagement .box-card td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
  }
  #ProcessingManagement .box-card td:first-child{
    padding-left: 1px;
  }
  #ProcessingManagement .box-card .button_div{
    padding: .5rem;
  }

  #ProcessingManagement .Template .el-card__body{
    padding: 0px;
  }
  #ProcessingManagement .el-date-editor.el-input {
      width: 100%;
  }
  #ProcessingManagement .text th{
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }
  #ProcessingManagement .dataS_dis_value{
    position: relative;
  }
  #ProcessingManagement .dataS{
    position: absolute;
    width: 75%;
    background: #fff;
    height: 6rem;
    line-height: 2.5rem;
    left: 24%;
    border: 1px solid #ccc;
    border-top: 0;
    z-index: 1111111;
    overflow-y: scroll;
  }
  #ProcessingManagement .dataS div{
      display: block;
      width: 100%;
      height: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid #ccc;
  }
  
  #ProcessingManagement .el-dialog__header {
      padding: 1.5rem 1.5rem;
      background: #2C3E50;
  }
  #ProcessingManagement .el-dialog__title{
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
  #ProcessingManagement .el-dialog__body{
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }
  /* !important */
  #ProcessingManagement .footer_button{
    position: absolute;
    margin: 0;
    width: 100%;
    height: 5.8rem;
    left: 0;
    background: #EDF2F8;
    bottom: 0;
  }
  #ProcessingManagement .footer_button .el-form-item__content{
      margin-left:0 !important;
      min-height: 5.8rem;
      text-align: center;
  }
  #ProcessingManagement .footer_button .div_P{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: .3rem;
  }
  #ProcessingManagement .div_P div{
    color: #9C9C9C;
    font-size: 14px;
  }
  #ProcessingManagement .footer_button .el-button{
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2C3E50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
  #ProcessingManagement .footer_button .el-button:hover{
    border: 1px solid #3b5168;
    background: #3b5168;
  }
  #ProcessingManagement .header_button {
    width: 86px;
    background: #2C3E50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #ProcessingManagement .header_button:hover{
    border: 1px solid transparent;
  }
  #ProcessingManagement .header_button_a{
    width: 86px;
    background: #47A136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #ProcessingManagement .header_button_a:hover{
    border: 1px solid transparent;
  }
  #ProcessingManagement .el-card__header {
    padding: 0 20px;
    line-height: 3rem;
  }
  #ProcessingManagement .button_list{
    float: right;
  }
  #ProcessingManagement .button_list button{
    background-color: #92CC8F;
    border-color: #92CC8F;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #ProcessingManagement .button_list button:last-child{
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
  #ProcessingManagement .el-dialog--small {
      width: 60%;
  }
  #ProcessingManagement .select_top .el-input {
      width: 70%;
  }
  #ProcessingManagement .dataS {
      width: 72%;
      left: 27%;
  }
}
</style>
