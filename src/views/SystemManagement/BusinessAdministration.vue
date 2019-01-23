<template>
	<div id="BusinessAdministration" v-loading="P_adds">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="margin-top:1rem;padding-bottom:2rem">
          <div slot="header" class="clearfix">
            <span>企业信息管理  </span>
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
            <el-button size="medium" class="mr" type="primary" icon="el-icon-circle-plus" @click="add(Add_New_Users_Visible)">新增企业信息</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #ccc;width:100%">
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">ID</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">企业名称</th>
                        <th colspan="1" style="text-align:center;width:4%" rowspan="1">企业简称</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">企业节点码</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">追溯节点码</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">经营地址</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">统一社会代码/证件号码</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">联系人</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">联系电话</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">经营领域</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">主营业务</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">经营范围</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">地址</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="items in tableData" ref="table_tr">
                        <td><div class="cell">{{ items.id }}</div></td>
                        <td><div class="cell">{{ items.name }}</div></td>
                        <td><div class="cell">{{ items.shortName }}</div></td>
                        <td><div class="cell">{{ items.companyCode }}</div></td>
                        <td><div class="cell">{{ items.traceCode }}</div></td>
                        <td><div class="cell">{{ items.address }}</div></td>
                        <td><div class="cell">{{ items.code }}</div></td>
                        <td><div class="cell">{{ items.contacts }}</div></td>
                        <td><div class="cell">{{ items.tel }}</div></td>
                        <td><div class="cell">{{ items.territory }}</div></td>
                        <td><div class="cell">{{ items.business }}</div></td>
                        <td><div class="cell">{{ items.scope }}</div></td>
                        <td><div class="cell">{{ items.city}}{{  items.area }}</div></td>
                        <td><div class="cell"><a  :idvalue="items.id" @click="Edit(ALTER_USER_Visible,$event)"><i class="el-icon-edit"></i></a> <a  :idvalue="items.id" @click="Delete($event)"><i class="el-icon-delete"></i></a></div></td>
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
          title="企业新增"
          :visible.sync="Add_New_Users_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="form" label-width="150px">
            <el-form-item label="企业名称:" style="width: 50%;">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="企业简称:" style="width: 50%;">
              <el-input v-model="form.shortName"></el-input>
            </el-form-item>
            <el-form-item label="企业节点码:" style="width: 50%;">
              <el-input v-model="form.companyCode"></el-input>
            </el-form-item>
            <el-form-item label="追溯节点码:" style="width: 50%;">
              <el-input v-model="form.traceCode"></el-input>
            </el-form-item>
            <el-form-item label="经营地址:" style="width: 100%;">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="统一社会代码/证件号码:">
              <el-input v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="法人代表:" style="width: 50%;">
              <el-input v-model="form.corporate"></el-input>
            </el-form-item>
            <el-form-item label="联系人:" style="width: 50%;">
              <el-input v-model="form.contacts"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" style="width: 50%;">
              <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="企业类型:" style="width: 50%;">
              <el-input v-model="form.companyType"></el-input>
            </el-form-item>
            <el-form-item label="经营领域:" style="width: 50%;">
              <el-input v-model="form.territory"></el-input>
            </el-form-item>
            <el-form-item label="主营业务:" style="width: 50%;">
              <el-input v-model="form.business"></el-input>
            </el-form-item>
            <el-form-item label="经营范围:" style="width: 50%;">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
            <el-form-item label="省:" style="width: 50%;">
              <el-input v-model="form.province"></el-input>
            </el-form-item>
            <el-form-item label="市:" style="width: 50%;">
              <el-input v-model="form.city"></el-input>
            </el-form-item>
            <el-form-item label="区:" style="width: 50%;">
              <el-input v-model="form.area  "></el-input>
            </el-form-item>
            <el-form-item>
              <el-button id="addEdits" @click="BusinessAdministration_adds()" type="primary">新增提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        
        <el-dialog
        v-loading="ALTER_USER"
          title="修改信息"
          :visible.sync="ALTER_USER_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="form" label-width="150px">
            <el-form-item label="企业名称:" style="width: 50%;">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="企业简称:" style="width: 50%;">
              <el-input v-model="form.shortName"></el-input>
            </el-form-item>
            <el-form-item label="企业节点码:" style="width: 50%;">
              <el-input v-model="form.companyCode"></el-input>
            </el-form-item>
            <el-form-item label="追溯节点码:" style="width: 50%;">
              <el-input v-model="form.traceCode"></el-input>
            </el-form-item>
            <el-form-item label="经营地址:" style="width: 100%;">
              <el-input v-model="form.address"></el-input>
            </el-form-item>
            <el-form-item label="统一社会代码/证件号码:">
              <el-input v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="法人代表:" style="width: 50%;">
              <el-input v-model="form.corporate"></el-input>
            </el-form-item>
            <el-form-item label="联系人:" style="width: 50%;">
              <el-input v-model="form.contacts"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" style="width: 50%;">
              <el-input v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="企业类型:" style="width: 50%;">
              <el-input v-model="form.companyType"></el-input>
            </el-form-item>
            <el-form-item label="经营领域:" style="width: 50%;">
              <el-input v-model="form.territory"></el-input>
            </el-form-item>
            <el-form-item label="主营业务:" style="width: 50%;">
              <el-input v-model="form.business"></el-input>
            </el-form-item>
            <el-form-item label="经营范围:" style="width: 50%;">
              <el-input v-model="form.scope"></el-input>
            </el-form-item>
            <el-form-item label="省:" style="width: 50%;">
              <el-input v-model="form.province"></el-input>
            </el-form-item>
            <el-form-item label="市:" style="width: 50%;">
              <el-input v-model="form.city"></el-input>
            </el-form-item>
            <el-form-item label="区:" style="width: 50%;">
              <el-input v-model="form.area  "></el-input>
            </el-form-item>
            <el-form-item>
              <el-button id="addEdits" @click="BusinessAdministration_Edits()" type="primary">修改提交</el-button>
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
          form: {
            name: '',
            shortName: '',
            companyCode: '',
            traceCode: '',
            address: '',
            code: '',
            corporate: '',
            contacts: '',
            tel: '',
            companyType: '',
            territory: '',
            business: '',
            scope: '',
            province: '',
            city: '',
            area: '',
          },
          companyId:"",
          addEdits:'',
          PagesNumber:10,
      };
    },
    created() {
    },
    computed: {
    },
    mounted() {
        let params = {pageNum:'1',pageSize:'12',id:JSON.parse(sessionStorage.getItem('userId'))}
        this.BusinessAdministration_info(params)  
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
      BusinessAdministration_info(Params){
        this.Add_New_Users = true
        api.BusinessAdministration_info(Params).then(res => {

            if (res.status == 200) {
              this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
                this.tableData = res.data
                this.Add_New_Users = false
            } else if(res.status == 500){
              this.Add_New_Users = false;
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
      BusinessAdministration_adds(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.form){
            obj[i] = _this.form[i];
            objstring +="&"+i+"="+_this.form[i];
          }
          this.Add_New_Users = true
          //新增
          api.BusinessAdministration_add(objstring).then(res => {
              this.listLoading = false;
              //NProgress.done();
              
              if (res.status == 200) {
                this.Add_New_Users = false
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
                  let params = {pageNum:'1',pageSize:'12',id:JSON.parse(sessionStorage.getItem('userId'))}
                  this.BusinessAdministration_info(params)  
              } else if(res.status == 500){
                this.Add_New_Users = false;
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
      BusinessAdministration_Edits(){
          let _this = this,objstring = "",obj ={};
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
                    message: "修改"+res.body.msg,
                    type: 'success'
                  });
                  let forms = this.form;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.form = forms
                  this.ALTER_USER_Visible = false; 
                  let params = {pageNum:'1',pageSize:'12',id:JSON.parse(sessionStorage.getItem('userId'))}
                  this.BusinessAdministration_info(params)  
              } else if(res.status == 500){
                this.Add_New_Users = false;
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
      addEdit(flg,Add_New_Users_Visible,e){


      },
      add(Add_New_Users_Visible){
          let forms = this.form;
          for(var i in forms){
            forms[i] = "";
          }
          this.addEdit = "add"
          this.Add_New_Users_Visible = true
      },
      Edit(Add_New_Users_Visible,e){
          let companyId,_this = this,obj={},listData;
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                if(i == "value"){companyId = attr[i]}
              }
            }
          });
          listData = _this.tableData.find((item)=>{
              if(item.id === Number(companyId))
              return item.id === Number(companyId)
          });
          this.dialogVisible1 = true;
          this.form = listData;
          this.companyId = companyId;
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
                                message: "删除"+res.body.msg,
                                type: 'success'
                              });
                              let forms = this.form;
                              for(var i in forms){
                                forms[i] = "";
                              }
                              this.form = forms
                              let params = {pageNum:'1',pageSize:'12',id:JSON.parse(sessionStorage.getItem('userId'))}
                              this.BusinessAdministration_info(params)  
                          } else if(res.status == 500){
                            this.Add_New_Users = false;
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
        width: 60%;
   }
    /* 分页 */
   .block{
    float: right;
    padding-top: 2rem;
    margin-right: 2rem;
   }
   #BusinessAdministration .container_padding th{
    line-height: 3rem;
    background: #eee;
    border-left: 1px solid #ccc;
   }
   #BusinessAdministration .container_padding th:first-child{
     border-left: 0;
   }
   #BusinessAdministration .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
   }
   #BusinessAdministration .container_padding td:first-child{
     padding-left: 1px;
   }
</style>
