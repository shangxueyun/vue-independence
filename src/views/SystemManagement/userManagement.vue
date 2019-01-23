<template>
	<div id="userManagement" v-loading="P_adds">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="margin-top:1rem;padding-bottom:2rem">
          <div slot="header" class="clearfix">
            <span>用户管理信息  </span>
          </div>
          <el-col :span="24" class="container_padding">
            <!-- <el-select @change="selectGet" v-model="select_value" placeholder="请选择类型">
              <el-option 
                v-for="item in selectList" 
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select> -->
            <el-button size="medium" class="mr" type="primary" icon="el-icon-circle-plus" @click="add(Add_New_Users_Visible)">新增用户</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #ccc;width:100%">
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">ID</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">用户名称</th>
                        <th colspan="1" style="text-align:center;width:4%" rowspan="1">昵称</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">所属企业id</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">是否为管理员 </th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">是否可用</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="items in tableData" ref="table_tr">
                        <td><div class="cell">{{ items.id }}</div></td>
                        <td><div class="cell">{{ items.username }}</div></td>
                        <td><div class="cell">{{ items.nickName }}</div></td>
                        <td><div class="cell">{{ items.companyId }}</div></td>
                        <td><div class="cell">{{ items.isAdmin }}</div></td>
                        <td><div class="cell">{{ items.enable }}</div></td>
                        <td><div class="cell">
                          <a  :idvalue="items.id" @click="Edit($event)"><i class="el-icon-edit"></i></a>
                           <a  :idvalue="items.id" @click="Delete($event)"><i class="el-icon-delete"></i></a>
                            <a  :idvalue="items.id" @click="MMEdit($event)">密码修改</a>
                           </div></td>
                      </tr>
                    </tbody>
                </table>
                <div class="block">
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
          title="新增用户"
          :visible.sync="Add_New_Users_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="form" label-width="150px">
            <el-form-item label="用户名称:" style="">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="密码:" style="">
              <el-input v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="昵称:" style="">
              <el-input v-model="form.nickName"></el-input>
            </el-form-item>
            <el-form-item label="所属企业id:" style="">
              <el-input v-model="form.companyId"></el-input>
            </el-form-item>
            <el-form-item label="是否为管理员:" style="">
              <el-input v-model="form.isAdmin"></el-input>
            </el-form-item>
            <el-form-item label="是否可用:" style="">
              <el-input v-model="form.enable"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button id="addEdits" @click="userManagement_adds()" type="primary">新增提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        
        <el-dialog
          v-loading="ALTER_USER"
          title="修改用户信息"
          :visible.sync="ALTER_USER_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="form" label-width="150px">
            <el-form-item label="用户名称:" style="">
              <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="昵称:" style="">
              <el-input v-model="form.nickName"></el-input>
            </el-form-item>
            <el-form-item label="所属企业id:" style="">
              <el-input v-model="form.companyId"></el-input>
            </el-form-item>
            <el-form-item label="是否为管理员:" style="">
              <el-input v-model="form.isAdmin"></el-input>
            </el-form-item>
            <el-form-item label="是否可用:" style="">
              <el-input v-model="form.enable"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button id="addEdits" @click="userManagement_Edits()" type="primary">修改提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <el-dialog
          v-loading="ALTER_USER"
          title="修改用户密码"
          :visible.sync="Userdispaly"
          width="30%"
          >
          <el-form :model="User" label-width="150px">
            <el-form-item label="用户名称:" style="">
              <el-input v-model="User.username"></el-input>
            </el-form-item>
            <el-form-item label="旧密码:" style="">
              <el-input></el-input>
            </el-form-item>
            <el-form-item label="新密码:" style="">
              <el-input v-model="User.password"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button id="addEdits" @click="userManagement_MMEdit()" type="primary">确认</el-button>
              <el-button>取消</el-button>
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
          Add_New_Users_Visible: false,
          ALTER_USER_Visible: false,
          P_adds:false,
          Add_New_Users:false,
          ALTER_USER:false,
          Userdispaly:false,
          form: {
            username: '',
            nickName: '',
            companyId: '',
            isAdmin: '',
            enable: '',
          },
          companyId:"",
          addEdits:'',
          User:{
              username:'',
              password:'',
          },
          PagesNumber:10,
      };
    },
    created() {
    },
    computed: {
    },
    mounted() {
        let params = {pageNum:'1',pageSize:'12'}
        this.userManagement_info(params)  
    },
    methods: {
      handleSizeChange(done){
        let params = {pageNum:done.toString(),pageSize:'12'}
        this.RoleManagement_info(params)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      userManagement_info(params){
        this.Add_New_Users = true;
        api.userManagement_info(params).then(res => {

            if (res.status == 200) {
              this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
                this.tableData = res.data
                this.Add_New_Users = false;
            } else if(res.status == 500){
                  this.$message.error("服务器忙！");
            }else{
              this.Add_New_Users = false
              if(res.data.msg == undefined || res.data.msg == "")
              this.$message.error("服务器忙！");
              else
              this.$message.error(res.data.msg);
            }
        }); 
      },
      userManagement_adds(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.form){
            obj[i] = _this.form[i];
            objstring +="&"+i+"="+_this.form[i];
          }
          this.Add_New_Users = true;
          //新增
          api.userManagement_add(obj).then(res => {

              if (res.status == 200) {
                this.Add_New_Users = false;
                  _this.$message({
                    message: "创建"+res.body.msg,
                    type: 'success'
                  });
                  let forms = this.form;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.form = forms
                  this.Add_New_Users_Visible = false; 
                  let params = {pageNum:'1',pageSize:'12'}
                  this.userManagement_info(params)   
            } else if(res.status == 500){
                this.Add_New_Users = false
                this.$message.error("服务器忙！");
            }else{
              this.Add_New_Users = false
              if(res.data.msg == undefined || res.data.msg == "")
              this.$message.error("服务器忙！");
              else
              this.$message.error(res.data.msg);
            }
          });   
      },
      userManagement_Edits(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.form){
            if(i=='createTime' || i=='createUser' || i=='updateTime' || i=='updateUser'){}else{
              obj[i] = _this.form[i];
              objstring +="&"+i+"="+_this.form[i];
            }
              
          }
          this.Add_New_Users = true;
          //修改
          api.userManagement_Edits(obj).then(res => {

              if (res.status == 200) {
                  this.Add_New_Users = false
                  _this.$message({
                    message: "修改"+res.body.msg,
                    type: 'success'
                  });
                  let forms = this.form;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.form = forms
                  this.ALTER_USER_Visible = false; 
                  let params = {pageNum:'1',pageSize:'12'}
                  this.userManagement_info(params)  
            } else if(res.status == 500){
              this.Add_New_Users = false
              this.$message.error("服务器忙！");
            }else{
              this.Add_New_Users = false
              if(res.data.msg == undefined || res.data.msg == "")
              this.$message.error("服务器忙！");
              else
              this.$message.error(res.data.msg);
            }
          }); 
      },
      userManagement_MMEdit(){
        
        let obj = {};
        this.Add_New_Users = true;
        for(var i in this.User){obj[i]=this.User[i]}
    
        api.userManagement_MMEdit(obj).then(res => {
            
            if (res.status == 200) {
                this.Add_New_Users = false
                _this.$message({
                  message: "密码修改"+res.body.msg,
                  type: 'success'
                });

                let forms = this.User;
                for(var i in forms){
                    forms[i] = "";
                }
                this.User = forms
            } else if(res.status == 500){
              this.$message.error("服务器忙！");
            }else{
              this.Add_New_Users = false
              if(res.data.msg == undefined || res.data.msg == "")
              this.$message.error("服务器忙！");
              else
              this.$message.error(res.data.msg);
            }
        }); 
      },
      add(){
          let forms = this.form;
          for(var i in forms){
            forms[i] = "";
          }
          this.addEdit = "add"
          this.Add_New_Users_Visible = true
      },
      Edit(e){
          let userId,_this = this,obj={},listData;
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
          this.ALTER_USER_Visible = true;
          this.form = obj;
          this.userId = userId;
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
                      this.Add_New_Users = true
                        api.userManagement_Delete({id: userId}).then(res => {
                            
                            if (res.status == 200) {
                              this.Add_New_Users = false
                                _this.$message({
                                  message: "删除"+res.body.msg,
                                  type: 'success'
                                });
                                this.Userdispaly = false;
                                let forms = this.form;
                                for(var i in forms){
                                    forms[i] = "";
                                }
                                this.form = forms
                                let params = {pageNum:'1',pageSize:'12'}
                                this.userManagement_info(params)  
                            } else if(res.status == 500){
                              this.Add_New_Users = false
                              this.$message.error("服务器忙！");
                            }else{
                              this.Add_New_Users = false
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
   #userManagement .el-dialog--small{
        width: 30%;
   }
      /* 分页 */
   .block{
    float: right;
    padding-top: 2rem;
    margin-right: 2rem;
   }
   #userManagement .container_padding th{
    line-height: 3rem;
    background: #eee;
    border-left: 1px solid #ccc;
   }
   #userManagement .container_padding th:first-child{
     border-left: 0;
   }
   #userManagement .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
   }
   #userManagement .container_padding td:first-child{
     padding-left: 1px;
   }
</style>
