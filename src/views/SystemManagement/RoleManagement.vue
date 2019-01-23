<template>
	<div id="RoleManagement" v-loading="P_adds">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="padding:1.5rem">
          <el-col :md="18" :lg="20" class="m-lg-10" :span="20" style="">
            <el-input style="width:26%" v-model="searchInput" placeholder="请输入角色名称"></el-input>
            <el-button size="medium" class="mr header_button" :disabled="roleControl.searchRole" @click="search(searchInput)"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="6" :lg="4" class="m-lg-2" :span="4">
            <el-button style="float: right;" size="medium" class="mr header_button_a" :disabled="roleControl.addRole" @click="add()"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #F4F4F4;width:100%;margin-top: 1.5rem;">
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:4%" rowspan="1">角色名称 </th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">描述</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="items in tableData" ref="table_tr" :key="items.roleName">
                        <td><div class="cell">{{ items.roleName }}</div></td>
                        <td><div class="cell">{{ items.description }}</div></td>
                        <td><div class="cell">
                          <button class="List_button_cz"  :idvalue="items.id" :disabled="roleControl.EditRole" @click="Edit(dialogVisible,$event)"><i class="el-icon-edit"></i></button>
                          <button class="List_button_cz document" :idvalue="items.id" :disabled="roleControl.roleEdit" @click="roleEdit($event)"><i class="el-icon-setting"></i></button>
                          <button class="List_button_cz delete"  :idvalue="items.id" :disabled="roleControl.DeleteRole" @click="Delete($event)"><i class="el-icon-delete"></i></button>
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
          title="新增角色"
          :visible.sync="Add_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="AddForm" label-width="80px">
            <el-form-item label="角色名称:" style="">
              <el-input v-model="AddForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="描述:" style="">
              <el-input v-model="AddForm.description"></el-input>
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="RoleManagement_adds()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        
        <el-dialog
          v-loading="usermod_c"
          title="修改角色信息"
          :visible.sync="Edit_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="EditForm" label-width="150px">
            <el-form-item label="角色名称:" style="">
              <el-input v-model="EditForm.roleName"></el-input>
            </el-form-item>
            <el-form-item label="描述:" style="">
              <el-input v-model="EditForm.description"></el-input>
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="RoleManagement_Edits()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        <!-- 后续开发 -->
        <el-dialog
          v-loading="usermod_c"
          title="权限设置"
          :visible.sync="Jurisdiction_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form label-width="0px">
            <el-form-item>
            <el-card class="box-card" style="width: 100%;">
              <div class="text item" id="checked">
                <div v-for="items in checkAllData" :key="items.id" style="">
                  <div style="margin: 15px 0;clear: both;"></div>
                  <input :checked="items.flag" @change="handleCheckedF($event,1)" type="checkbox" /><span :idvlaue="items.id">{{ items.permissionName }}</span>
                  <div style="margin: 15px 0;clear: both;"></div>
                  <div v-for="Childs in items.children"  id="checked_Childs" :key="Childs.id" style="float:left;padding-left:.5rem">
                    <input :checked="Childs.flag" :name="Childs.permissionName" @change="handleCheckedF($event,2)" type="checkbox" /><span :idvlaue="Childs.id">{{ Childs.permissionName }}</span>
                    <br>
                    <div v-for="ZChilds in Childs.children" :key="ZChilds.id" style="float:left;padding-left:.5rem">
                      <input :checked="ZChilds.flag" :name="ZChilds.permissionName" @change="handleCheckedF($event)" type="checkbox" /><span :idvlaue="ZChilds.id">{{ ZChilds.permissionName }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </el-card>
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="RoleManagement_permissions()" >确认提交</el-button>
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
          tableData: [
            
          ],
          operator:"操作员：" + JSON.parse(sessionStorage.getItem('user')).username + "/操作时间：" + this.Date_day(),
          footer_Num:'12',
          pageNum:'1',
          Add_Visible: false,
          Edit_Visible: false,
          Jurisdiction_Visible:false,
          P_adds:false,
          P_adds:false,
          usermod_c:false,
          Userdispaly:false,
          searchInput:'',
          AddForm: {
            roleName: '',
            description: '',
          },
          EditForm:{
            roleName:'',
            description:'',
          },
          companyId:"",
          addEdits:'',
          User:{
              username:'',
              password:'',
          },
          userId:'',
          PagesNumber:10,
          //所有
          checkAllData:[],
          roleIds:'',
          checkboxP:'',
          roleDataArr:[],
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
        let allRoles = JSON.parse(sessionStorage.getItem('newRoutes')),name = "角色管理";
        allRoles.forEach((v,i)=>{
          v.children.forEach((v1,i1)=>{
              if(v1.permissionName==name){
                let Vchildren = v1.children;
                Vchildren.forEach((v2,i2)=>{
                  switch (v2.permissionName) {
                    case '角色添加':
                          this.roleControl.addRole = false;
                          break;
                    case '角色修改':
                          this.roleControl.EditRole = false;
                          break;
                    case '角色删除':
                          this.roleControl.DeleteRole = false;
                          break;
                    case '角色查询':
                          this.roleControl.searchRole = false;
                          break;
                    case '设置权限':
                          this.roleControl.roleEdit = false;
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
        let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
        this.pageNum = params.pageNum;
        this.RoleManagement_info(params)
    },
    methods: {
      handleSizeChange(done){
        let params = {pageNum:done.toString(),pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
        this.pageNum = done.toString();
        this.RoleManagement_info(params)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
            this.pageNum = params.pageNum;
            this.RoleManagement_info(params)
            done();
          })
          .catch(_ => {});
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
      handleCheckedF(val,num) {
        let params = {},arry=this.roleDataArr;
        if(num == 1)
        {
          if(Number(val.currentTarget.nextElementSibling.attributes[0].value)==1){
            if(val.currentTarget.checked){
              let arr = document.getElementById("checked").getElementsByTagName('input');
              for(var i in arr){
                if(Number(i))
                arr[i].checked = true
              }
              for(var i =1; i<arr.length;i++){
                arry.push(i)
              }
            }else{
              //删除角色权限api
              let arr = document.getElementById("checked").getElementsByTagName('input');
              for(var i in arr){
                if(Number(i))
                arr[i].checked = false
              }
              this.roleDataArr = []
            }
          }else{
            if(val.currentTarget.checked){
                let arr = val.currentTarget.parentElement.getElementsByTagName('input');
                for(var i in arr){
                  if(Number(i)){
                    arry.push(Number(arr[i].nextElementSibling.attributes[0].value));
                    arr[i].checked = true
                  }
                }
                console.log(this.roleDataArr)
              }else{
                //删除角色权限api
                let arr = val.currentTarget.parentElement.getElementsByTagName('input');
                for(var i in arr){
                  if(Number(i)){
                    arry.forEach((v,i1)=>{
                      if(v ==Number(arr[i].nextElementSibling.attributes[0].value))
                      {
                        arry.splice(i1,1)
                      }
                    })
                    arr[i].checked = false
                  }
                }
            }
          }
        }else if(num == 2){
          if(val.currentTarget.checked){
            let arr = val.currentTarget.parentElement.getElementsByTagName('input');
            for(var i in arr){
              if(Number(i)){
                arry.push(Number(arr[i].nextElementSibling.attributes[0].value));
                arr[i].checked = true
              }
            }
            console.log(this.roleDataArr)
          }else{
            //删除角色权限api
            let arr = val.currentTarget.parentElement.getElementsByTagName('input');
            for(var i in arr){
              if(Number(i)){
                arry.forEach((v,i1)=>{
                  if(v ==Number(arr[i].nextElementSibling.attributes[0].value))
                  {
                    arry.splice(i1,1)
                  }
                })
                arr[i].checked = false
              }
            }
          }
        }else{
          if(val.currentTarget.checked){
            arry.push(Number(val.currentTarget.nextElementSibling.attributes[0].value))
          }else{
            //删除角色权限api
            arry.forEach((v,i)=>{
              if(v ==Number(val.currentTarget.nextElementSibling.attributes[0].value))
              {
                arry.splice(i,1)
              }
            })
          }
        }

      },
      RoleManagement_info(params){
        this.P_adds = true;
        api.RoleManagement_info(params).then(res => {
            if (res.status == 200) {
                this.footer_Num = Number(res.total)
                this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
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
      RoleManagement_adds(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.AddForm){
            obj[i] = _this.AddForm[i];
            objstring +="&"+i+"="+_this.AddForm[i];
          }
          this.P_adds = true;
          //新增
          api.RoleManagement_adds(obj).then(res => {
              debugger
              if (res.status == 200) {
                this.P_adds = false;
                  _this.$message({
                    message: "创建"+res.msg,
                    type: 'success'
                  });
                  let forms = this.AddForm;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.AddForm = forms
                  this.Add_Visible = false; 
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                  this.pageNum = params.pageNum;
                  this.RoleManagement_info()  
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
      RoleManagement_Edits(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.EditForm){
            if(i=='createTime' || i=='createUser' || i=='updateTime' || i=='updateUser'){}else{
              obj[i] = _this.EditForm[i];
              objstring +="&"+i+"="+_this.EditForm[i];
            }
              
          }
          this.P_adds = true;
          //修改
          api.RoleManagement_Edits(obj).then(res => {

              if (res.status == 200) {
                 this.P_adds = false;
                  _this.$message({
                    message: "修改"+res.msg,
                    type: 'success'
                  });
                  let forms = this.EditForm;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.EditForm = forms
                  this.P_adds = false; 
                  this.Edit_Visible = false
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                  this.pageNum = params.pageNum;
                  this.RoleManagement_info(params)   
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
      add(Add_Visible){
          this.Add_Visible = true
      },
      Edit(Add_Visible,e){
          let userId,_this = this,obj={},formData;
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
          this.Edit_Visible = true;
          //变量接收对象
          formData = obj;
          //循环赋值
          for(var i in formData){this.EditForm[i] = formData[i]}
          //清除字符串
          this.userId = userId;
      },
      roleEdit(e){
          let _this = this,obj={};
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                if(i == "value"){
                  _this.userId = attr[i];
                  
                }
              }
            }
          });
          this.Jurisdiction_Visible = true;
          this.usermod_c = true;
          this.roleIds = _this.userId;

          //获取所有权限数据
          api.RoleManagement_Roles(this.roleIds).then(res => {
              if (res.status == 200) {
                this.usermod_c = false;
                this.roleDataArr = [];
                let dataS = res.data;
                dataS.forEach((v,i)=>{
                  //duix
                  let s =this.roleDataArr
                  let objs = v

                  if(objs["flag"]==true){
                      //系统
                    this.roleDataArr.push(objs["id"]);
                    let obj1 = objs["children"]
                    
                    obj1.forEach((v1,i1)=>{
                        let s =this.roleDataArr
                        let obj2 = v1
                        if(obj2["flag"]==true){
                          //用户
                          this.roleDataArr.push(obj2["id"]);
                          let obj3 = obj2["children"]
                          obj3.forEach((v3,i3)=>{
                              let s =this.roleDataArr
                              let obj4 = v3;
                              if(obj4["flag"]==true){
                                //用户
                                this.roleDataArr.push(obj4["id"]);
                              }
                          })
                        }
                    })
                  }
                });
                console.log(this.checkAllData)
                this.checkAllData = res.data
              } else if(res.status == 500){
                this.usermod_c = false;
                this.$message.error("服务器忙！");
              }else{  
                this.usermod_c = false
                if(res.msg == undefined || res.msg == "")
                this.$message.error("服务器忙！");
                else
                this.$message.error(res.msg);
              }
          }); 
      },
      Delete(e) {
          let _this = this,obj={};
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                if(i == "value"){
                  _this.userId = attr[i];
                }
              }
            }
          });
          this.RoleManagement_Delete()
      },
      search(str){

      },
      RoleManagement_permissions(){
        this.usermod_c = true;
        let params = {roleId:this.userId,permissionIds:this.roleDataArr};
        api.RoleManagement_RolesSetting(JSON.stringify(params)).then(res => {
            if (res.status == 200) {
              this.usermod_c = false;
              this.$message({
                message: "权限设置"+res.msg,
                type: 'success'
              });
              this.Jurisdiction_Visible = false;
              this.roleDataArr = [];
            } else if(res.status == 500){
              this.usermod_c = false;
              this.$message.error("服务器忙！");
            }else{
              this.usermod_c = false
              if(res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
              else
              this.$message.error(res.msg);
            }
        });
      },
      RoleManagement_Delete(){
        let userId = this.userId,_this = this;
        this.$confirm('确认删除？')
        .then(_ => {
          this.P_adds = true;
            api.RoleManagement_Delete({id: userId}).then(res => {
                if (res.status == 200) {
                    this.P_adds = false;
                    _this.$message({
                      message: "删除"+res.msg,
                      type: 'success'
                    });
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                  this.pageNum = params.pageNum;
                  this.RoleManagement_info(params)    
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
   #RoleManagement .el-dialog--small{
        width: 40%;
   }
   /* 分页 */
   #RoleManagement .block{
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
   #RoleManagement .List_button_cz{
    background: #92CC8F;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
   }
   #RoleManagement .cell .delete{
     background: #E74C3C
   }
   #RoleManagement .cell .document{
     background: #70C8CB
   }
   #RoleManagement .block .el-pagination{
     padding-left: 1rem;
   }
   #RoleManagement .container_padding th{
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
   }
   #RoleManagement .container_padding th:first-child{
     border-left: 0;
   }
   #RoleManagement .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }
   #RoleManagement .container_padding td:first-child{
     padding-left: 1px;
   }
   #RoleManagement .container_padding tr:nth-child(2n+1){
     background: #F9F9F9
   }
  #RoleManagement .container_padding tr:nth-child(2n+1) td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }

  #RoleManagement .select_top{
    position: relative;
    width: 33.3%;
    float: left;
    height: 2.5rem;
  }
  #RoleManagement .select_top span{
    display: block;
    float: left;
    line-height: 2rem;
    margin-right: 0.8rem;
  }
  #RoleManagement .select_top .el-input{
    width: 75%;
    line-height: 1.8rem;
    border-radius: .2rem;
    outline: 0;
  }
  #RoleManagement .box-card::-webkit-scrollbar {
      width: 0px;
  }
  #RoleManagement .box-card th{
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    font-weight: 400;
  }
  #RoleManagement .box-card th:first-child{
    border-left: 0;
  }
  #RoleManagement .box-card td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
  }
  #RoleManagement .box-card td:first-child{
    padding-left: 1px;
  }
  #RoleManagement .box-card .button_div{
    padding: .5rem;
  }
  #RoleManagement .el-date-editor.el-input {
      width: 100%;
  }
  #RoleManagement .text th{
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }
  #RoleManagement .dataS_dis_value{
    position: relative;
  }
  #RoleManagement .dataS{
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
  #RoleManagement .dataS div{
      display: block;
      width: 100%;
      height: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid #ccc;
  }
  
  #RoleManagement .el-dialog__header {
      padding: 1.5rem 1.5rem;
      background: #2C3E50;
  }
  #RoleManagement .el-dialog__title{
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
  #RoleManagement .el-dialog__body{
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }
  /* !important */
  #RoleManagement .footer_button{
    position: absolute;
    margin: 0;
    width: 100%;
    height: 5.8rem;
    left: 0;
    background: #EDF2F8;
    bottom: 0;
  }
  #RoleManagement .footer_button .el-form-item__content{
      margin-left:0 !important;
      min-height: 5.8rem;
      text-align: center;
  }
  #RoleManagement .footer_button .div_P{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: .3rem;
  }
  #RoleManagement .div_P div{
    color: #9C9C9C;
    font-size: 14px;
  }
  #RoleManagement .footer_button .el-button{
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2C3E50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
  #RoleManagement .footer_button .el-button:hover{
    border: 1px solid #3b5168;
    background: #3b5168;
  }
  #RoleManagement .header_button {
    width: 86px;
    background: #2C3E50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #RoleManagement .header_button:hover{
    border: 1px solid transparent;
  }
  #RoleManagement .header_button_a{
    width: 86px;
    background: #47A136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #RoleManagement .header_button_a:hover{
    border: 1px solid transparent;
  }
  #RoleManagement .el-card__header {
    padding: 0 20px;
    line-height: 3rem;
  }
  #RoleManagement .button_list{
    float: right;
  }
  #RoleManagement .button_list button{
    background-color: #92CC8F;
    border-color: #92CC8F;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #RoleManagement .button_list button:last-child{
    background-color: #E74C3C;
    border-color: #E74C3C;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #RoleManagement .uploadImages_div{
    position: absolute;
    width: 9rem;
    margin: 0;
    right: 14%;
    top: 5%;
    text-align: center;
  }
  #RoleManagement .uploadImages_div .el-form-item__content{
    margin-left:0px !important
  }
  #RoleManagement .upload{
    width: 100%;
    position: relative;
    height: 8rem;
    text-align: center;
    font-size: 45px;
    line-height: 8rem;
    background: #ccc;
  }
  #RoleManagement .change{
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 8rem;
    background: #ccc;
    position: absolute;
  }
  #RoleManagement .ql-editor {
      height: 5rem;
  }
  #RoleManagement .role .el-dialog__body{
    padding: 1.5rem;
  }


@media screen and (min-width: 1200px) and (max-width: 1680px){
  #RoleManagement .m-lg-1{
    width: 8.33%;
  }
  #RoleManagement .m-lg-2{
    width: 16.66%;
  }
  #RoleManagement .m-lg-3{
    width: 25%;
  }
  #RoleManagement .m-lg-4{
    width: 33.33%;
  }
  #RoleManagement .m-lg-5{
    width: 41.66%;
  }
  #RoleManagement .m-lg-6{
    width: 49.98%;
  }
  #RoleManagement .m-lg-7{
    width: 58.31%;
  }
  #RoleManagement .m-lg-8{
    width: 66.64%;
  }
  #RoleManagement .m-lg-9{
    width: 74.97%;
  }
  #RoleManagement .m-lg-10{
    width: 83.30%;
  }
  #RoleManagement .m-lg-11{
    width: 91.63%;
  }
  #RoleManagement .m-lg-12{
    width: 100%;
  }
  #RoleManagement .el-dialog--small {
      width: 46%;
  }
  #RoleManagement .select_top .el-input {
      width: 70%;
  }
}
</style>
