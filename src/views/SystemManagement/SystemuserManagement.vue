<template>
	<div id="SystemuserManagement" v-loading="P_adds">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="padding:1.5rem">
          <el-col :md="18" :lg="20" class="m-lg-10" :span="20" style="">
            <el-input style="width:26%" placeholder="请输入用户名/姓名"></el-input>
            <el-button size="medium" class="mr header_button" :disabled="roleControl.searchRole"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="6" :lg="4" class="m-lg-2" :span="4">
            <el-button style="float: right;" size="medium" :disabled="roleControl.addRole" class="mr header_button_a" @click="add()"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #F4F4F4;width:100%;margin-top: 1.5rem;">
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">用户名</th>
                        <th colspan="1" style="text-align:center;width:4%" rowspan="1">姓名</th>
                        <th colspan="1" style="text-align:center;width:4%" rowspan="1">角色</th>
                        <th colspan="1" style="text-align:center;width:4%" rowspan="1">邮箱</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">所属门店 </th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">最后登录 </th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">状态 </th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="items in tableData" ref="table_tr">
                        <td><div class="cell">{{ items.username }}</div></td>
                        <td><div class="cell">{{ items.nickName }}</div></td>
                        <td><div class="cell">{{ items.isAdmin }}</div></td>
                        <td><div class="cell">{{ items.email }}</div></td>
                        <td><div class="cell">{{ items.companyName }}</div></td>
                        <td><div class="cell">{{ items.loginTime.replace('T'," ").replace('.000+0000'," ") }}</div></td>
                        <td><div class="cell">{{ items.enable }}</div></td>
                        <td><div class="cell">
                          <button class="List_button_cz document" v-show="false" :idvalue="items.id"><i class="el-icon-document"></i></button>
                          <button class="List_button_cz document" :idvalue="items.id" :disabled="roleControl.MMEditRole" @click="MMEdit($event)"><i class="el-icon-question"></i></button>
                          <button class="List_button_cz" :idvalue="items.id" :disabled="roleControl.EditRole" @click="Edit($event)"><i class="el-icon-edit"></i></button>
                          <button class="List_button_cz delete" :idvalue="items.id" :disabled="roleControl.DeleteRole" @click="Delete($event)"><i class="el-icon-delete"></i></button>
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
          title="新增用户"
          :visible.sync="Add_New_Users_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="form" label-width="100px">
            <el-form-item label="用户名:" style="">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名:" style="">
              <el-input v-model="form.nickName"></el-input>
            </el-form-item>
            <el-form-item label="密码:" style="">
              <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="Email:" style="">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="门店:" id="dataS_dis_value">
              <el-input v-model="search" @focus="dataS_dis=true;dataS_dis1=false;" @keydown="displays1 = false;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis">
                  <div v-for="items in tables" @click="product_type(items)" :key="items.id">
                      <span v-show="display11" style="margin-left: 10px" v-html="format(items.name)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-form-item label="身份:" style="">
              <el-select @change="selectGet" style="width:100%" v-model="form.isAdmin" placeholder="请选择类型">
                <el-option 
                  v-for="item in selectList" 
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否有效:" >
              <el-radio-group v-model="form.enable">
                <el-radio v-model="form.enable" :label="0">禁用</el-radio>
                <el-radio v-model="form.enable" :label="1">启用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="footer_button">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="SystemuserManagement_adds()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        
        <el-dialog
          v-loading="ALTER_USER"
          title="编辑用户"
          :visible.sync="ALTER_USER_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="form" label-width="100px">
            <el-form-item label="用户名:" style="">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="姓名:" style="">
              <el-input v-model="form.nickName"></el-input>
            </el-form-item>
            <el-form-item label="Email:" style="">
              <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="门店:" id="dataS_dis_value">
              <el-input v-model="search1" @focus="dataS_dis1=true;" @keydown="displays2 = false;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis1">
                  <div v-for="items in tables1" @click="product_type1(items)" :key="items.id">
                      <span v-show="display22" style="margin-left: 10px" v-html="format1(items.name)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-form-item label="身份:" style="">
              <el-select @change="selectGet" style="width:100%" v-model="form.isAdmin" placeholder="请选择类型">
                <el-option 
                  v-for="item in selectList" 
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="是否有效:" >
              <el-radio-group v-model="form.enable">
                <el-radio v-model="form.enable" :label="0">禁用</el-radio>
                <el-radio v-model="form.enable" :label="1">启用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="footer_button">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="SystemuserManagement_Edits()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <el-dialog
          v-loading="ALTER_USER"
          title="修改用户密码"
          :visible.sync="Userdispaly"
          width="30%"
          >
          <el-form :model="User" label-width="100px">
            <el-form-item label="旧密码:" style="">
              <el-input type="password"></el-input>
            </el-form-item>
            <el-form-item label="新密码:" style="">
              <el-input type="password" v-model="User.password"></el-input>
            </el-form-item>
            <el-form-item class="footer_button">
              <div class="div_P">
               <div>{{ operator }}</div>
              </div>
              <el-button @click="SystemuserManagement_MMEdit()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

      </el-row>
    </el-row>
	</div>

</template>

<script>
import api from "../../api/api.js";

  export default {
    data() {
      return {
          userData: JSON.parse(sessionStorage.getItem('user')),
          operator:"操作员：" + JSON.parse(sessionStorage.getItem('user')).username + "/操作时间：" + this.Date_day(),
          userIsAdmin:'',
          tableData: [
            
          ],
          Times_search:[new Date(),new Date()],
          footer_Num:'0',
          pageNum:'',
          Add_New_Users_Visible: false,
          ALTER_USER_Visible: false,
          P_adds:false,
          P_adds:false,
          ALTER_USER:false,
          Userdispaly:false,
          DISdisplay:true,
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
            username: '', 
            nickName: '',
            password: '',
            companyId: '',
            companyName: '',
            email: '',
            tel: '',
            isAdmin: '',
            enable: 0,
          },
          selectList:[
            {id:2,name:'平台管理员'},//1,2显示 销售方信息
            {id:3,name:'企业管理员'},
            {id:4,name:'普通用户'},
          ],
          selectList1:[
            {id:1,name:'启用'},
            {id:0,name:'禁用'},
          ],
          companyId:"",
          addEdits:'',
          User:{
              username:'',
              password:'',
          },
          PagesNumber:10,
          roleControl:{
            addRole:true,
            EditRole:true,
            DeleteRole:true,
            MMEditRole:true,
            searchRole:true,
          },
      };
    },
    created() {
        let allRoles = JSON.parse(sessionStorage.getItem('newRoutes')),name = "用户管理";
        allRoles.forEach((v,i)=>{
          v.children.forEach((v1,i1)=>{
            if(i1==0){
              if(v1.permissionName==name){
                let Vchildren = v1.children;
                Vchildren.forEach((v2,i2)=>{
                  switch (v2.permissionName) {
                    case '用户添加':
                          this.roleControl.addRole = false;
                          break;
                    case '用户修改':
                          this.roleControl.EditRole = false;
                          this.roleControl.MMEditRole = false;
                          break;
                    case '用户删除':
                          this.roleControl.DeleteRole = false;
                          break;
                    case '用户查询':
                          this.roleControl.searchRole = false;
                          break;
                  }
                });
              }
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
        let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))},arr=[],isAdminData = this.selectList;  
        this.pageNum = params.pageNum;
        this.SystemuserManagement_info(params)
        for(var i in this.userData){if(i=="isAdmin"){this.userIsAdmin = this.userData[i]}}
        debugger
        for(var j in isAdminData){
          if(isAdminData[j].id<=this.userIsAdmin){
            arr.push(j)
          }              
        }
        arr.forEach((v,i)=>{var v2 = 0;isAdminData.splice(v2,1)});
        this.selectList = isAdminData;
    },
    methods: {
      handleSizeChange(done){
        let params = {pageNum:done.toString(),pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
        this.pageNum = done;
        this.SystemuserManagement_info(params)
      },
      //时间格式
      Date_day(){
            var date = new Date();
            var now = "";
            now = date.getFullYear()+"-"; 
            now = now + (date.getMonth()+1)+"-";
            now = now + date.getDate()+" ";
            now = now + date.getHours()+":";
            now = now + date.getMinutes()+":";
            now = now + date.getSeconds()+"";
            return now;
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
            this.pageNum = params.pageNum;
            this.SystemuserManagement_info(params)  
            done();
          })
          .catch(_ => {});
      },
      radios(){},
      switchString(str,flg){
        if(flg){
          switch (str) {
            case 2:
                  return "平台管理员"
                  break;
            case 3:
                  return "企业管理员"
                  break;
            case 4:
                  return "普通用户"
                  break;
            case "平台管理员":
                  return 2
                  break;
            case "企业管理员":
                  return 3
                  break;
            case "普通用户":
                  return 4
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
      product_type(e){
          this.dataS_dis = false;
          this.search = ""
          this.search = e.name;
          this.form.companyName = e.name;
          this.form.companyId = e.id;
      },
      format (val) {
        
        if (val.indexOf(this.search) !== -1 && this.search !== '') {
          return val.replace(this.search, '<span style="color:red">' + this.search + '</span>')
        } else {
          return val
        }
      },
      product_type1(e){
          this.dataS_dis1 = false;
          this.search1 = ""
          this.search1 = e.name;
          this.form.companyName = e.name;
          this.form.companyId = e.id;
      },
      format1 (val) {
        if (val.indexOf(this.search1) !== -1 && this.search1 !== '') {
          return val.replace(this.search1, '<span style="color:red">' + this.search1 + '</span>')
        } else {
          return val
        }
      },
      selectGet(vId){
        let obj = {};
        if(vId!=1){
          obj = this.selectList.find((item)=>{
              if(item.id === vId)
              return item.id === vId
          });
          this.form.isAdmin = obj.id          
        }

      },
      SystemuserManagement_info(params){
        this.P_adds = true;
        api.SystemuserManagement_info(params).then(res => {
            if (res.status == 200) {
              this.footer_Num = Number(res.total)
              this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
                res.data.forEach((v,i)=>{for(var j in v){
                  if(j == "enable")
                    v[j] = this.switchString(v[j]);
                  if(j=="isAdmin")
                    v[j] = this.switchString(v[j],true);
                }});
                let forms = this.form;
                for(var i in forms){
                  forms[i] = "";
                }
                this.form = forms
                this.tableData = res.data
                this.P_adds = false;
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
      SystemuserManagement_adds(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.form){
            if(i=="enable")
              obj[i] = this.switchString(obj[i]);
            if(i=="isAdmin")
              obj[i] = this.switchString(obj[i],true);
            obj[i] = _this.form[i];
            objstring +="&"+i+"="+_this.form[i];
          }  
          debugger
          this.P_adds = true;
          //新增
          api.SystemuserManagement_add(obj).then(res => {

              if (res.status == 200) {
                this.P_adds = false;
                  _this.$message({
                    message: "创建"+res.msg,
                    type: 'success'
                  }); 
                  let forms = this.form;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.form = forms
                  this.Add_New_Users_Visible = false; 
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                  this.pageNum = params.pageNum;
                  this.SystemuserManagement_info(params)   
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
      SystemuserManagement_Edits(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.form){
            if(i=="loginTime"){}else{
              obj[i] = _this.form[i];
              objstring +="&"+i+"="+obj[i];              
            }
          }
          this.P_adds = true;
          //修改
          api.SystemuserManagement_Edits(obj).then(res => {

              if (res.status == 200) {
                debugger
                  this.P_adds = false
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
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                  this.pageNum = params.pageNum;
                  this.SystemuserManagement_info(params)  
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
      SystemuserManagement_MMEdit(){
        debugger
        let obj = {};
        this.P_adds = true;
        for(var i in this.User){obj[i]=this.User[i]}
    
        api.SystemuserManagement_MMEdit(obj).then(res => {
            
            if (res.status == 200) {
                this.P_adds = false
                this.$message({
                  message: "密码修改"+res.msg,
                  type: 'success'
                });

                let forms = this.User;
                for(var i in forms){
                    forms[i] = "";
                }
                this.User = forms
                this.Userdispaly = false;
                let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                this.pageNum = params.pageNum;
                this.SystemuserManagement_info(params)  
            } else if(res.status == 500){
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
      add(){
          let forms = this.form,isAdminData = this.selectList,arr=[];
          for(var i in forms){
            forms[i] = "";
          }
          this.addEdit = "add"
          this.Add_New_Users_Visible = true
          let params = {id:JSON.parse(sessionStorage.getItem('userId'))}
          api.BusinessAdministration_info(params).then(res => {

              if (res.status == 200) {
                  this.tableData1 = res.data
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
      Edit(e){
          let forms = this.form,userId,_this = this,obj={},formData;
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                if(i == "value"){userId = attr[i]}
              }
            }
          });
          obj = _this.tableData.find((item)=>{
              if(item.id === Number(userId))
              return item.id === Number(userId)
          });
          //变量接收对象
          formData = obj;
          //循环赋值
          for(var i in formData){this.form[i] = formData[i]}
          //清除字符串
          for(var i in this.form){
            if(Number(this.form["enable"])){}else{
              this.form["enable"] = this.switchString(this.form["enable"])
            }
            if(Number(this.form["isAdmin"])){}else{
              this.form["isAdmin"] = this.switchString(this.form["isAdmin"],true)
            }
          }
          this.ALTER_USER_Visible = true;
          this.userId = userId;
          this.search1 = formData.companyName
          let params = {id:JSON.parse(sessionStorage.getItem('userId'))}
          api.BusinessAdministration_info(params).then(res => {

              if (res.status == 200) {
                  this.tableData2 = res.data
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
      Delete(e) {
          let userId,_this = this,obj={};
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                if(i == "value"){
                  userId = attr[i];
                    this.$confirm('确认删除？')
                    .then(_ => {
                      this.P_adds = true
                        api.SystemuserManagement_Delete({id: userId}).then(res => {
                            
                            if (res.status == 200) {
                              this.P_adds = false
                                _this.$message({
                                  message: "删除"+res.msg,
                                  type: 'success'
                                });
                                this.Userdispaly = false;
                                let forms = this.form;
                                for(var i in forms){
                                    forms[i] = "";
                                }
                                this.form = forms
                                let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                                this.pageNum = params.pageNum;
                                this.SystemuserManagement_info(params)  
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
      MMEdit(e){

        let userId,_this = this,obj={};
        this.Userdispaly = true;

        e.path.forEach((v,i)=>{if(i==0){let attr = v.attributes[0];
            for(var i in attr)
                {
                if(i == "value"){userId = attr[i]}
                }
            }
        });
        for(var i in _this.tableData){if(i!='status'){
            for(var o in _this.tableData[i]){
            if(_this.tableData[i][o] == userId){
                for(var t in _this.tableData[i]){obj[t]=_this.tableData[i][t]}
                }}
            }
        }
        this.User.username = obj.username;
        this.User.id = obj.id;
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
   #SystemuserManagement .el-dialog--small{
        width: 35%;
   }
      /* 分页 */
   #SystemuserManagement .block{
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
    #SystemuserManagement .List_button_cz{
    background: #92CC8F;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
   }
   #SystemuserManagement .cell .delete{
     background: #E74C3C
   }
   #SystemuserManagement .cell .document{
     background: #70C8CB
   }
  #SystemuserManagement .cell .circle{
     background: #EF948B
   }
  #SystemuserManagement .cell .message{
     background: #E74C3C
   }
   #SystemuserManagement .block .el-pagination{
     padding-left: 1rem;
   }
   #SystemuserManagement .container_padding th{
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
   }
   #SystemuserManagement .container_padding th:first-child{
     border-left: 0;
   }
   #SystemuserManagement .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }
   #SystemuserManagement .container_padding td:first-child{
     padding-left: 1px;
   }
   #SystemuserManagement .container_padding tr:nth-child(2n+1){
     background: #F9F9F9
   }
  #SystemuserManagement .container_padding tr:nth-child(2n+1) td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }

  #SystemuserManagement .select_top{
    position: relative;
    width: 100%;
    float: left;
    padding-top: 2rem;
  }
  #SystemuserManagement .select_top span{
    display: block;
    float: left;
    line-height: 2rem;
    margin-right: 0.8rem;
  }
  #SystemuserManagement .select_top .el-input{
    width: 48%;
    line-height: 1.8rem;
    border-radius: .2rem;
    outline: 0;
  }
  #SystemuserManagement .box-card::-webkit-scrollbar {
      width: 0px;
  }
  #SystemuserManagement .box-card th{
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    font-weight: 400;
  }
  #SystemuserManagement .box-card th:first-child{
    border-left: 0;
  }
  #SystemuserManagement .box-card td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
  }
  #SystemuserManagement .box-card td:first-child{
    padding-left: 1px;
  }
  #SystemuserManagement .box-card .button_div{
    padding: .5rem;
  }
  #SystemuserManagement .el-date-editor.el-input {
      width: 100%;
  }
  #SystemuserManagement .text th{
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }
  #dataS_dis_value{
    position: relative;
  }

  #SystemuserManagement #dataS_dis_value .dataS{
      position: fixed;
      width: 81%;
      background: #fff;
      height: 6rem;
      line-height: 2.5rem;
      border: 1px solid #ccc;
      border-top: 0;
      z-index: 1111111;
      overflow-y: scroll;
  }
  #SystemuserManagement #dataS_dis_value .dataS span{
      display: block;
      width: 88%;
      height: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
  #SystemuserManagement #dataS_dis_value .dataS>div{
    border-bottom: 1px solid #ccc;
  }
  
  #SystemuserManagement .el-dialog__header {
      padding: 1.5rem 1.5rem;
      background: #2C3E50;
  }
  #SystemuserManagement .el-dialog__title{
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
  #SystemuserManagement .el-dialog__body{
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }
  /* !important */
  #SystemuserManagement .footer_button{
    position: absolute;
    margin: 0;
    width: 100%;
    height: 5.8rem;
    left: 0;
    background: #EDF2F8;
    bottom: 0;
  }
  #SystemuserManagement .footer_button .el-form-item__content{
      margin-left:0 !important;
      min-height: 5.8rem;
      text-align: center;
  }
  #SystemuserManagement .footer_button .div_P{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: .3rem;
  }
  #SystemuserManagement .div_P div{
    color: #9C9C9C;
    font-size: 14px;
  }
  #SystemuserManagement .footer_button .el-button{
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2C3E50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
  #SystemuserManagement .footer_button .el-button:hover{
    border: 1px solid #3b5168;
    background: #3b5168;
  }
  #SystemuserManagement .header_button {
    width: 86px;
    background: #2C3E50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #SystemuserManagement .header_button:hover{
    border: 1px solid transparent;
  }
  #SystemuserManagement .header_button_a{
    width: 86px;
    background: #47A136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #SystemuserManagement .header_button_a:hover{
    border: 1px solid transparent;
  }




@media screen and (min-width: 1300px) and (max-width: 1680px){
  #SystemuserManagement .m-lg-1{
    width: 8.33% !important;
  }
  #SystemuserManagement .m-lg-2{
    width: 16.66% !important;
  }
  #SystemuserManagement .m-lg-3{
    width: 25% !important;
  }
  #SystemuserManagement .m-lg-4{
    width: 33.33% !important;
  }
  #SystemuserManagement .m-lg-5{
    width: 41.66% !important;
  }
  #SystemuserManagement .m-lg-6{
    width: 49.98% !important;
  }
  #SystemuserManagement .m-lg-7{
    width: 58.31% !important;
  }
  #SystemuserManagement .m-lg-8{
    width: 66.64% !important;
  }
  #SystemuserManagement .m-lg-9{
    width: 74.97% !important;
  }
  #SystemuserManagement .m-lg-10{
    width: 83.30% !important;
  }
  #SystemuserManagement .m-lg-11{
    width: 91.63% !important;
  }
  #SystemuserManagement .m-lg-12{
    width: 100% !important;
  }
  #SystemuserManagement .mr {
    margin-left: 0;
  }
  #SystemuserManagement .el-dialog--small{
      width: 40%;
  }
  #SystemuserManagement #dataS_dis_value .dataS{
    width: 70%;
  }
}
</style>
