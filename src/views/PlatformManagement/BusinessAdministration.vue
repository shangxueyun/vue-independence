<template>
	<div id="BusinessAdministration" v-loading="P_adds">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="padding:1.5rem">
          <el-col :md="18" :lg="20" class="m-lg-10" :span="20" style="">
            <el-input style="width:26%" placeholder="请输入企业名称"></el-input>
            <el-button size="medium" class="mr header_button" :disabled="roleControl.searchRole"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #F4F4F4;width:100%;margin-top: 1.5rem;">
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">企业名称</th>
                        <th colspan="1" style="text-align:center;width:9%" rowspan="1">企业节点码</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">统一社会代码</th>
                        <th colspan="1" style="text-align:center;width:6%" rowspan="1">联系人</th>
                        <th colspan="1" style="text-align:center;width:6%" rowspan="1">联系电话 </th>
                        <th colspan="1" style="text-align:center;width:6%" rowspan="1">业务模块</th>
                        <th colspan="1" style="text-align:center;width:6%" rowspan="1">状态</th>
                        <th colspan="1" style="text-align:center;width:6%" rowspan="1">审核状态</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="items in tableData" ref="table_tr">
                        <td><div class="cell">{{ items.name }}</div></td>
                        <td><div class="cell">{{ items.companyCode }}</div></td>
                        <td><div class="cell">{{ items.code }}</div></td>
                        <td><div class="cell">{{ items.contacts }}</div></td>
                        <td><div class="cell">{{ items.tel }}</div></td>
                        <td><div class="cell">{{ items.business }}</div></td>
                        <td><div class="cell">{{ items.enable }}</div></td>
                        <td><div class="cell">{{ items.status }}</div></td>
                        <td><div class="cell"> 
                          <button class="List_button_cz"  :idvalue="items.id" :disabled="roleControl.EditRole" @click="Edit($event)"><i class="el-icon-edit"></i></button>
                          <button class="List_button_cz document"  :idvalue="items.id" :disabled="roleControl.roleEdit" @click="AuditS($event)" ><i class="el-icon-document"></i></button>
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
        v-loading="Add_New_Users"
          title="企业资料审核"
          :visible.sync="Add_New_Users_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="Audit" label-width="100px">
            <el-form-item label="企业名称:" style="width: 50%;">
              <el-input disabled v-model="Audit.name"></el-input>
            </el-form-item>
            <el-form-item label="统一社会代码:" style="width: 50%;">
              <el-input disabled v-model="Audit.code"></el-input>
            </el-form-item>
            <el-form-item label="注册地址:" style="width: 50%;">
              <el-input v-model="Audit.registeredAddress" disabled></el-input>
            </el-form-item>
            <el-form-item label="经营地址:" style="width: 50%;">
              <el-input v-model="Audit.businessAddress" disabled></el-input>
            </el-form-item>
            <el-form-item label="法人代表:" style="width: 50%;">
              <el-input disabled v-model="Audit.corporate"></el-input>
            </el-form-item>
            <el-form-item label="联系人:" style="width: 50%;">
              <el-input disabled v-model="Audit.contacts"></el-input>
            </el-form-item>
            <el-form-item label="电话:" style="width: 50%;">
              <el-input disabled v-model="Audit.tel"></el-input>
            </el-form-item>
            <el-form-item label="企业类型:" style="width: 50%;">
              <el-input v-model="Audit.companyType"></el-input>
            </el-form-item>
            <el-form-item label="主营业务:" style="width: 50%;">
              <el-input disabled v-model="Audit.mainBusiness"></el-input>
            </el-form-item>
            <el-form-item label="经营领域:" style="width: 60%;">
              <el-checkbox-group v-model="Audit.scope">
                <el-checkbox label="种养殖"></el-checkbox>                            
                <el-checkbox label="生产加工"></el-checkbox>                            
                <el-checkbox label="批发"></el-checkbox>                            
                <el-checkbox label="菜场"></el-checkbox>                            
                <el-checkbox label="超市"></el-checkbox> 
                <el-checkbox style="margin-left: 0px" label="团体采购"></el-checkbox> 
                <el-checkbox label="配送企业"></el-checkbox> 
                <el-checkbox label="零售终端"></el-checkbox> 
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="企业简介:" style="width: 50%;">
                <el-input @focus="dataS_dis=false;dataS_dis1=false;" disabled type="textarea" v-model="Audit.companyProfiles" placeholder="请输入企业简介..." ></el-input>
            </el-form-item>
            <!-- <el-form-item label="开通模块:" style="width: 80%;">
              <el-radio-group @change="radios" v-model="Audit.openModule">
                <el-radio :label="1">源头模块</el-radio>                                  
                <el-radio :label="2">生产加工模块</el-radio>
                <el-radio :label="3">批发模块</el-radio>
                <el-radio :label="4">菜场模块</el-radio>
                <el-radio :label="5">零售模块</el-radio>
              </el-radio-group>
            </el-form-item> -->
            <el-form-item label="授权有效期：" style="width: 50%;">
              <el-date-picker @focus="dataS_dis=false;dataS_dis1=false;" 
              v-model="AuditvalidTime" 
              type="datetime"
              format="yyyy-MM-dd hh:mm"
              placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item class="uploadImages_div">
              <div class="upload logo">
                <img :src="Audit.logo" alt="" style="width:100%;height:100%;border-radius: 1rem;">
              </div>
              logo
            </el-form-item>
            <el-form-item class="uploadImages_div license">
              <div class="upload licenses">
                <img :src="Audit.license" alt="" style="width:100%;height:100%;border-radius: 1rem;">
              </div>
              营业执照照片
            </el-form-item>
            <el-form-item class="footer_button">
              <div class="div_P">
                <div>操作员：陈冰/操作时间：2018-10-23 12:32:01 </div>
              </div>
              <el-button @click="BusinessAdministration_Approve(true)" >审核通过</el-button>
              <el-button @click="BusinessAdministration_Approve(false)" >驳回申请</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        
        <el-dialog
        v-loading="ALTER_USER"
          title="修改企业资料"
          :visible.sync="ALTER_USER_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="form" label-width="100px">
            <el-form-item label="企业名称:" style="width: 50%;">
              <el-input @focus="dataS_dis1=false;dataS_dis=false;" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="统一社会代码:" style="width: 50%;">
              <el-input disabled v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="注册地址:" style="width: 50%;">
              <el-input v-model="search1" @focus="dataS_dis1=true;dataS_dis=false;" @blur="verify1()" @keydown="displays11 = false;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis1">
                  <div v-for="items in tables1" @click="product_type1(items)">
                      <span v-show="display22" style="margin-left: 10px" v-html="format1(items.catgName)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-form-item label="经营地址:" style="width: 50%;">
              <el-input v-model="search" @focus="dataS_dis=true;dataS_dis1=false;" @blur="verify()" @keydown="displays1 = false;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis">
                  <div v-for="items in tables" @click="product_type(items)">
                      <span v-show="display11" style="margin-left: 10px" v-html="format(items.catgName)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-form-item label="法人代表:" style="width: 50%;">
              <el-input @focus="dataS_dis1=false;dataS_dis=false;" v-model="form.corporate"></el-input>
            </el-form-item>
            <el-form-item label="联系人:" style="width: 50%;">
              <el-input @focus="dataS_dis1=false;dataS_dis=false;" v-model="form.contacts"></el-input>
            </el-form-item>
            <el-form-item label="电话:" style="width: 50%;">
              <el-input @focus="dataS_dis1=false;dataS_dis=false;" v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="企业类型:" style="width: 50%;">
              <el-input @focus="dataS_dis1=false;dataS_dis=false;" v-model="form.companyType"></el-input>
            </el-form-item>
            <el-form-item label="主营业务:" style="width: 50%;">
              <el-input @focus="dataS_dis1=false;dataS_dis=false;" v-model="form.mainBusiness"></el-input>
            </el-form-item>
            <el-form-item label="经营领域:" style="width: 60%;">
              <el-checkbox-group v-model="form.scope">
                <el-checkbox label="种养殖"></el-checkbox>                            
                <el-checkbox label="生产加工"></el-checkbox>                            
                <el-checkbox label="批发"></el-checkbox>                            
                <el-checkbox label="菜场"></el-checkbox>                            
                <el-checkbox label="超市"></el-checkbox> 
                <el-checkbox style="margin-left: 0px" label="团体采购"></el-checkbox> 
                <el-checkbox label="配送企业"></el-checkbox> 
                <el-checkbox label="零售终端"></el-checkbox> 
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="企业简介:" style="width: 50%;">
                <el-input @focus="dataS_dis=false;dataS_dis1=false;" type="textarea" v-model="form.companyProfiles" placeholder="请输入企业简介..." ></el-input>
            </el-form-item>
            <el-form-item label="授权有效期：" style="width: 50%;">
              <el-date-picker @focus="dataS_dis=false;dataS_dis1=false;" 
              v-model="formvalidTime" 
              type="datetime"
              format="yyyy-MM-dd hh:mm"
              placeholder="选择日期时间"></el-date-picker>
            </el-form-item>
            <el-form-item class="uploadImages_div">
              <div class="upload logo">
                <img :src="form.logo" alt="" style="width:100%;height:100%;border-radius: 1rem;">
                <input class="change" @change="update($event,'logo')" type="file" accept="image/png,image/gif,image/jpeg" multiple="multiple" />
              </div>
              logo
            </el-form-item>
            <el-form-item class="uploadImages_div license">
              <div class="upload licenses">
                <img :src="form.license" alt="" style="width:100%;height:100%;border-radius: 1rem;">
                <input class="change" @change="update($event,'license')" type="file" accept="image/png,image/gif,image/jpeg" multiple="multiple" />
              </div>
              营业执照
            </el-form-item>
            <el-form-item class="footer_button">
              <div class="div_P">
                <div>操作员：陈冰/操作时间：2018-10-23 12:32:01 </div>
              </div>
              <el-button @click="BusinessAdministration_Edits()" >确认提交</el-button>
            </el-form-item>
            <div> </div>
          </el-form>
        </el-dialog>

      </el-row>
    </el-row>
	</div>

</template>

<script>
import api from "../../api/api.js";
import sys_area_info from '../../assets/js/sys_area_info.json'

  export default {
    data() {
      return {
          tableData: [
            
          ],
          areas:sys_area_info.RECORDS,
          selected:[],
          footer_Num:'85',
          pageNum:'',
          Add_New_Users_Visible: false,
          ALTER_USER_Visible: false,
          P_adds:false,
          FormDatas:{},
          Add_New_Users:false,
          ALTER_USER:false,
          logoImgsDiv:true,
          logoImgsDiv1:false,
          logoSrcUrl:'',
          //
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
          form: {
            name: '',
            code: '',
            registeredAddressCode: '',
            registeredAddress: '',
            businessAddressCode: '',
            businessAddress: '',
            corporate: '',
            contacts: '',
            tel: '',
            companyType: '',
            mainBusiness: '',
            scope: '',
            companyProfiles:'',
            logo: '',
            license: '',
          },
          Audit: {
            name: '',
            code: '',
            registeredAddressCode: '',
            registeredAddress: '',
            businessAddressCode: '',
            businessAddress: '',
            corporate: '',
            contacts: '',
            tel: '',
            companyType: '',
            mainBusiness: '',
            scope: '',
            companyProfiles:'',
            logo: '',
            license: '',
          },
          AuditvalidTime:'',
          formvalidTime:'',
          companyId:"",
          PagesNumber:10,
          roleControl:{
            addRole:true,
            EditRole:true,
            DeleteRole:true,
            roleEdit:true,
            searchRole:true,
          },
      };
    },
    created() {
        let allRoles = JSON.parse(sessionStorage.getItem('newRoutes')),name = "企业管理";
        allRoles.forEach((v,i)=>{
          v.children.forEach((v1,i1)=>{
              if(v1.permissionName==name){
                let Vchildren = v1.children;
                Vchildren.forEach((v2,i2)=>{
                  switch (v2.permissionName) {
                    case '企业管理审核':
                          this.roleControl.roleEdit = false;
                          break;
                    case '企业管理修改':
                          this.roleControl.EditRole = false;
                          break;
                    case '企业管理删除':
                          this.roleControl.DeleteRole = false;
                          break;
                    case '企业管理查询':
                          this.roleControl.searchRole = false;
                          break;
                  }
                });
              }
          });
        });
    },
    computed: {
        //模糊查询数据返回
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
        //模糊查询数据返回
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
        let params = {pageNum:'1',pageSize:'12',id:JSON.parse(sessionStorage.getItem('userId'))}
        this.pageNum = params.pageNum;
        this.BusinessAdministration_info(params)
        this.AuditvalidTime = new Date();
    },
    methods: {
      handleSizeChange(done){
        let params = {pageNum:done.toString(),pageSize:'12'}
        this.pageNum = params.done;
        this.RoleManagement_info(params)
      },
      companyTypeGet(){

      },
      radios(){

      },
      onSelected(data) {
        console.log(data) 
      },
      update (e,logoSrcUrl) {  // 上传照片-demo
        this.FormDatas = new FormData();
        let file = e.target.files[0]
        this.FormDatas.append("multipartFile",file)
        this.FormDatas.append("multipartFile","multipartFile");
        this.P_adds = true
        api.CommonUpload_uploadImages(this.FormDatas).then(res => {
          var r = res;
            if(res){
              if (res.status == 200) {
                  let form = this.form
                  let e = window.events
                  window.events.target.parentElement.children[0].attributes.src.value =""
                  this.FormDatas.delete("multipartFile")
                  this.P_adds = false;
                  form[logoSrcUrl] = ""
                  form[logoSrcUrl] = res.data
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
            }else{
                this.P_adds = false
                this.$message.error("图片太大或服务器忙！");
            }
        }); 
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            let params = {pageNum:'1',pageSize:'12',id:JSON.parse(sessionStorage.getItem('userId'))}
            this.pageNum = params.pageNum;
            this.BusinessAdministration_info(params)  
            this.search = '';
            this.search1 = '';
            done();
          })
          .catch(_ => {});
      },
      product_type(e){
          this.dataS_dis = false;
          this.search = ""
          this.search = e.catgName;
          this.form.registeredAddress = e.catgName;
          this.form.registeredAddressCode = e.id;
      },
      verify(e){
        //地址数据
        this.search = this.search;
        let str = this.search,flg;
        this.form.registeredAddress = this.search;
        if(this.search == ""){
          this.$message("地址不能为空或者地址格式有误，请检查地址是否正确。")
        }else{
          sys_area_info.RECORDS.forEach((v,i)=>{
            if(str.indexOf(v.catgName)>-1){
              this.form.registeredAddressCode = v.id
              flg = true
            }
          })
          if(flg){
            if(this.form.registeredAddressCode == "")
            {
              this.$message("地址不能为空或者地址格式有误，请检查地址是否正确。")
            }
          }else
          {
            this.$message("地址不能为空或者地址格式有误，请检查地址是否正确。")
          }            
        }

      },
      format (val) {
        
        if (val.indexOf(this.search) !== -1 && this.search !== '') {
          return val.replace(this.search, '<span style="color:red">' + this.search + '</span>')
        } else {
          return val
        }
      },
      product_type1(e){
        debugger
          this.dataS_dis1 = false;
          this.search1 = ""
          this.search1 = e.catgName;
          this.form.businessAddress = e.catgName;
          this.form.businessAddressCode = e.id;
      },
      verify1(e){
        this.search1 = this.search1;
        let str = this.search1,flg;
        this.form.businessAddress = this.search1;
        if(this.search1 == ""){
          this.$message("地址不能为空或者地址格式有误，请检查地址是否正确。")
        }else{
          sys_area_info.RECORDS.forEach((v,i)=>{
            if(str.indexOf(v.catgName)>-1){
              this.form.businessAddressCode = v.id
              flg = true
            }
          })
          if(flg){
            if(this.form.businessAddressCode == "")
            {
              this.$message("地址不能为空或者地址格式有误，请检查地址是否正确。")
            }
          }else
          {
            this.$message("地址不能为空或者地址格式有误，请检查地址是否正确。")
          }            
        }
      },
      format1 (val) {
        
        if (val.indexOf(this.search1) !== -1 && this.search1 !== '') {
          return val.replace(this.search1, '<span style="color:red">' + this.search1 + '</span>')
        } else {
          return val
        }
      },
      switchString(str,flg){
        if(flg){
          switch (str) {
            case 1:
                  return "待审核"
                  break;
            case 2:
                  return "审核通过"
                  break;
            case 3:
                  return "已驳回"
                  break;
            case "待审核":
                  return 1
                  break;
            case "审核通过":
                  return 2
                  break;
            case "已驳回":
                  return 3
                  break;
            default:
              break;
          }
        }else{
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
        }
      },
      BusinessAdministration_info(Params){
        this.P_adds = true
        api.BusinessAdministration_info(Params).then(res => {

            if (res.status == 200) {
                this.footer_Num = Number(res.total)
                this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
                res.data.forEach((v,i)=>{for(var j in v){
                  if(j == "enable"){
                    v[j]=this.switchString(v[j])
                  }
                  if(j == "status"){
                    v[j]=this.switchString(v[j],true)
                  }
                }});
                this.tableData = res.data
                this.P_adds = false
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
      },
      BusinessAdministration_Approve(flg){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.Audit){
            if(i == "companyType"||i == "scope"||i == "validTime"||i == "id"){
              if(i == "scope"){
                obj.scope = _this.Audit.scope.toLocaleString()
              }else{
                obj[i] = _this.Audit[i];
                objstring +="&"+i+"="+_this.Audit[i];                
              }
            }
          }
          if(flg){
            let s = this.AuditvalidTime.toISOString()
            obj.status = 2;obj.validTime = s.substr(0,s.lastIndexOf(".")).replace("T"," ");
          }
          else
          {
            obj = {},obj.status = 3,obj.id = _this.Audit.id
          }
          this.Add_New_Users = true
          //新增
          api.SystemuserManagement_checkCompany(obj).then(res => {

              if (res.status == 200) {
                this.Add_New_Users = false
                  _this.$message({
                    message: "操作"+res.msg,
                    type: 'success'
                  });
                  
                  let forms = this.Audit;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.Audit = forms
                  // this.logoImgsDiv=true,
                  // this.logoImgsDiv1=false,
                  this.AuditvalidTime = new Date()
                  this.ALTER_USER_Visible = false; 
                  let params = {pageNum:'1',pageSize:'12',id:JSON.parse(sessionStorage.getItem('userId'))}
                  this.pageNum = params.pageNum;
                  this.BusinessAdministration_info(params)  
              } else if(res.status == 500){
                this.Add_New_Users = false;
                this.$message.error("服务器忙！");
              }else{
                this.Add_New_Users = false
                if(res.msg == undefined || res.msg == "")
                this.$message.error("服务器忙！");
                else
                this.$message.error(res.msg);
              }
          });   
      },
      BusinessAdministration_Edits(){
          let _this = this,objstring = "",obj ={},s = this.formvalidTime;
          _this.form.validTime = s.substr(0,s.lastIndexOf(".")).replace("T"," ");
          _this.form.scope = _this.form.scope.toLocaleString()
          for(var i in _this.form){
            if(i=='createTime' || i=='createUser' || i=='updateTime' || i=='updateUser'){}else{
              objstring +="&"+i+"="+_this.form[i];
            }
          }
          this.Add_New_Users = true;
          //修改
          api.BusinessAdministration_Edit(objstring).then(res => {

              if (res.status == 200) {
                  this.Add_New_Users = false;
                  _this.$message({
                    message: "修改"+res.msg,
                    type: 'success'
                  });
                  let forms = this.form;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.form = forms
                  this.ALTER_USER_Visible = false; 
                  let params = {pageNum:'1',pageSize:'12',id:JSON.parse(sessionStorage.getItem('userId'))}
                  this.pageNum = params.pageNum;
                  this.BusinessAdministration_info(params)  
              } else if(res.status == 500){
                this.Add_New_Users = false;
                this.$message.error("服务器忙！");
              }else{
                this.Add_New_Users = false
                if(res.msg == undefined || res.msg == "")
                this.$message.error("服务器忙！");
                else
                this.$message.error(res.msg);
              }
          }); 
      },
      AuditS(e){
        let forms = this.Audit,companyId;
        for(var i in forms){
          forms[i] = "";
        }
        this.Audit = forms;
        e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
          for(var i in attr)
            {
              
              if(i == "value"){companyId = attr[i]}
            }
          }
        });
        this.Add_New_Users = true;
        api.BusinessAdministration_selectByCode({id:companyId}).then(res => {
              
              if (res.status == 200) {
                this.Audit = res
                this.Audit.scope = res.scope.split(",")
                this.Add_New_Users = false;
                this.Add_New_Users_Visible =true
              } else if(res.status == 500){
                this.Add_New_Users = false;
                this.$message.error("服务器忙！");
              }else{
                this.Add_New_Users = false
                if(res.msg == undefined || res.msg == "")
                this.$message.error("服务器忙！");
                else
                this.$message.error(res.msg);
              }
        }); 
        
      },
      Edit(e){
          let companyId,_this = this,obj={},listData;
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                
                if(i == "value"){companyId = attr[i]}
              }
            }
          });
          this.companyId = companyId;
          this.ALTER_USER = true;
          this.tableData1 = this.areas
          this.tableData2 = this.areas
          api.BusinessAdministration_selectByCode({id:companyId}).then(res => {
                
                if (res.status == 200) {
                  this.form = res
                  this.search = this.form.registeredAddress;
                  this.search1 = this.form.businessAddress
                  this.form.scope = res.scope.split(",")
                  this.formvalidTime = res.validTime;
                  this.ALTER_USER = false;
                  this.ALTER_USER_Visible =true
                } else if(res.status == 500){
                  this.ALTER_USER = false;
                  this.$message.error("服务器忙！");
                }else{
                  this.ALTER_USER = false
                  if(res.msg == undefined || res.msg == "")
                  this.$message.error("服务器忙！");
                  else
                  this.$message.error(res.msg);
                }
          }); 
      },
      Delete(e) {
          let companyId,_this = this,obj={};
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                if(i == "value"){
                  companyId = attr[i]
                    this.$confirm('确认删除？')
                    .then(_ => {
                      this.Add_New_Users = true;
                      api.BusinessAdministration_Delete({id: companyId}).then(res => {
                          this.listLoading = false;
                          //NProgress.done();
                          debugger
                          if (res.status == 200) {
                              this.Add_New_Users = false;
                              _this.$message({
                                message: "删除"+res.msg,
                                type: 'success'
                              });
                              let forms = this.form;
                              for(var i in forms){
                                forms[i] = "";
                              }
                              this.form = forms
                              let params = {pageNum:'1',pageSize:'12',id:JSON.parse(sessionStorage.getItem('userId'))}
                              this.pageNum = params.pageNum;
                              this.BusinessAdministration_info(params)  
                          } else if(res.status == 500){
                            this.Add_New_Users = false;
                            this.$message.error("服务器忙！");
                          }else{
                            this.Add_New_Users = false
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
      }
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
  #BusinessAdministration .el-dialog--small{
        width: 44%;
   }
    /* 分页 */
   #BusinessAdministration .block{
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
   #BusinessAdministration .List_button_cz{
    background: #92CC8F;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
   }
   #BusinessAdministration .cell .List_button_cz:last-child{
     background: #E74C3C
   }
  #BusinessAdministration .cell .document{
     background: #70C8CB
   }
   #BusinessAdministration .block .el-pagination{
     padding-left: 1rem;
   }
   #BusinessAdministration .container_padding th{
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
   }
   #BusinessAdministration .container_padding th:first-child{
     border-left: 0;
   }
   #BusinessAdministration .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }
   #BusinessAdministration .container_padding td:first-child{
     padding-left: 1px;
   }
   #BusinessAdministration .container_padding tr:nth-child(2n+1){
     background: #F9F9F9
   }
  #BusinessAdministration .container_padding tr:nth-child(2n+1) td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }

  #BusinessAdministration .select_top{
    position: relative;
    width: 33.3%;
    float: left;
    height: 2.5rem;
  }
  #BusinessAdministration .select_top span{
    display: block;
    float: left;
    line-height: 2rem;
    margin-right: 0.8rem;
  }
  #BusinessAdministration .select_top .el-input{
    width: 75%;
    line-height: 1.8rem;
    border-radius: .2rem;
    outline: 0;
  }
  #BusinessAdministration .box-card::-webkit-scrollbar {
      width: 0px;
  }
  #BusinessAdministration .box-card th{
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    font-weight: 400;
  }
  #BusinessAdministration .box-card th:first-child{
    border-left: 0;
  }
  #BusinessAdministration .box-card td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
  }
  #BusinessAdministration .box-card td:first-child{
    padding-left: 1px;
  }
  #BusinessAdministration .box-card .button_div{
    padding: .5rem;
  }
  #BusinessAdministration .el-date-editor.el-input {
      width: 100%;
  }
  #BusinessAdministration .text th{
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }
  #BusinessAdministration .dataS_dis_value{
    position: relative;
  }
  #BusinessAdministration .dataS{
    position: absolute;
    width: 100%;
    background: #fff;
    height: 6rem;
    line-height: 2.5rem;
    left: 0%;
    border: 1px solid #ccc;
    border-top: 0;
    z-index: 1111111;
    overflow-y: scroll;
  }
  #BusinessAdministration .dataS div{
      display: block;
      width: 100%;
      height: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid #ccc;
  }
  
  #BusinessAdministration .el-dialog__header {
      padding: 1.5rem 1.5rem;
      background: #2C3E50;
  }
  #BusinessAdministration .el-dialog__title{
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
  #BusinessAdministration .el-dialog__body{
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }
  /* !important */
  #BusinessAdministration .footer_button{
    position: absolute;
    margin: 0;
    width: 100%;
    height: 5.8rem;
    left: 0;
    background: #EDF2F8;
    bottom: 0;
  }
  #BusinessAdministration .footer_button .el-form-item__content{
      margin-left:0 !important;
      min-height: 5.8rem;
      text-align: center;
  }
  #BusinessAdministration .footer_button .div_P{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: .3rem;
  }
  #BusinessAdministration .div_P div{
    color: #9C9C9C;
    font-size: 14px;
  }
  #BusinessAdministration .footer_button .el-button{
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2C3E50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
  #BusinessAdministration .footer_button .el-button:hover{
    border: 1px solid #3b5168;
    background: #3b5168;
  }
  #BusinessAdministration .header_button {
    width: 86px;
    background: #2C3E50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #BusinessAdministration .header_button:hover{
    border: 1px solid transparent;
  }
  #BusinessAdministration .header_button_a{
    width: 86px;
    background: #47A136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #BusinessAdministration .header_button_a:hover{
    border: 1px solid transparent;
  }
  #BusinessAdministration .el-card__header {
    padding: 0 20px;
    line-height: 3rem;
  }
  #BusinessAdministration .button_list{
    float: right;
  }
  #BusinessAdministration .button_list button{
    background-color: #92CC8F;
    border-color: #92CC8F;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #BusinessAdministration .button_list button:last-child{
    background-color: #E74C3C;
    border-color: #E74C3C;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #BusinessAdministration .uploadImages_div{
    position: absolute;
    width: 10rem;
    margin: 0;
    right: 14%;
    top: 2%;
    text-align: center;
  }
  #BusinessAdministration .uploadImages_div .el-form-item__content{
    margin-left:0px !important
  }
  #BusinessAdministration .upload{
    width: 100%;
    position: relative;
    height: 10rem;
    text-align: center;
    font-size: 24px;
    line-height: 15rem;
    background: #ccc;
  }
  #BusinessAdministration .change{
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 15rem;
    background: #ccc;
    position: absolute;
  }
  #BusinessAdministration .logo{
    background: transparent;
  }
  #BusinessAdministration .license{
    top: 24%;
    width: 15rem;
    right: 9%;
  }
  #BusinessAdministration .license .licenses{
    height: 15rem;
    background: transparent;
  }
  /* #BusinessAdministration .address_input{
    position: absolute;
    right: 0;
    height: 3rem;
    top: 4px;
    width: 50%;
  }
  #BusinessAdministration .address_input span{
    display: block;
    width: 8rem;
    float: left;
  }
  #BusinessAdministration .address_input .el-input{
    width: 66%;  
  } */


@media screen and (min-width: 1200px) and (max-width: 1680px){
  #BusinessAdministration .m-lg-1{
    width: 8.33%;
  }
  #BusinessAdministration .m-lg-2{
    width: 16.66%;
  }
  #BusinessAdministration .m-lg-3{
    width: 25%;
  }
  #BusinessAdministration .m-lg-4{
    width: 33.33%;
  }
  #BusinessAdministration .m-lg-5{
    width: 41.66%;
  }
  #BusinessAdministration .m-lg-6{
    width: 49.98%;
  }
  #BusinessAdministration .m-lg-7{
    width: 58.31%;
  }
  #BusinessAdministration .m-lg-8{
    width: 66.64%;
  }
  #BusinessAdministration .m-lg-9{
    width: 74.97%;
  }
  #BusinessAdministration .m-lg-10{
    width: 83.30%;
  }
  #BusinessAdministration .m-lg-11{
    width: 91.63%;
  }
  #BusinessAdministration .m-lg-12{
    width: 100%;
  }
  #BusinessAdministration .el-dialog--small {
      width: 60%;
  }
  #BusinessAdministration .select_top .el-input {
      width: 70%;
  }
}
</style>
