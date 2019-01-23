<template>
	<div id="SupplierManagement" v-loading="P_adds">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="padding-bottom:2rem">
          <el-col :md="18" :lg="20" class="m-lg-10" :span="20" style="">
            <el-input style="width:26%" placeholder="供应商名称/编号/电话"></el-input>
            <el-button size="medium" class="mr header_button" :disabled="roleControl.searchRole"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="6" :lg="4" class="m-lg-2" :span="4">
            <el-button style="float: right;" size="medium" class="mr header_button_a" :disabled="roleControl.addRole" @click="add()"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #F4F4F4;width:100%;margin-top: 1.5rem;">
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:11%" rowspan="1">供应商名称</th>
                        <th colspan="1" style="text-align:center;width:11%" rowspan="1">联系人</th>
                        <th colspan="1" style="text-align:center;width:11%" rowspan="1">联系电话</th>
                        <th colspan="1" style="text-align:center;width:11%" rowspan="1">商户码</th>
                        <th colspan="1" style="text-align:center;width:11%" rowspan="1">状态</th>
                        <th colspan="1" style="text-align:center;width:11%" rowspan="1">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="items in tableData">
                        <td><div class="cell">{{ items.supplierName }}</div></td>
                        <td><div class="cell">{{ items.contacts }}</div></td>
                        <td><div class="cell">{{ items.tel }}</div></td>
                        <td><div class="cell">{{ items.supplierCode }}</div></td>
                        <td><div class="cell">{{ items.enable }}</div></td>
                        <td><div class="cell">
                          <button class="List_button_cz"  :idvalue="items.id" :disabled="roleControl.EditRole" @click="Edit(dialogVisible1,$event)"><i class="el-icon-edit"></i></button>
                          <button class="List_button_cz document" :idvalue="items.id"><i class="el-icon-document"></i></button>
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
          v-loading="Add_New_Users"
          title="新增供应商"
          :visible.sync="dialogVisible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="form" label-width="100px">
            <el-form-item label="统一社会代码:" style="">
              <el-input @focus="dataS_dis=false;"  @change="EnterpriseInfo($event)" v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="供应商名称:" style="">
              <el-input @focus="dataS_dis=false;" v-model="form.supplierName"></el-input>
            </el-form-item>
            <el-form-item label="联系人:" style="">
              <el-input @focus="dataS_dis=false;" v-model="form.contacts"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" style="">
              <el-input @focus="dataS_dis=false;" v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="经营地址:" style="width: 100%;">
              <el-input v-model="search" @focus="dataS_dis=true;" @blur="verify()" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis">
                  <div v-for="items in tables" @click="product_type(items)">
                      <span style="margin-left: 10px" v-html="format(items.catgName)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @focus="dataS_dis=false;" @click="SupplierManagement_adds()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        
        <el-dialog
          v-loading="usermod_c"
          title="修改供应商"
          :visible.sync="dialogVisible1"
          width="100%"
          :before-close="handleClose">
          <el-form :model="form" label-width="100px">
            <el-form-item label="供应商名称:" style="">
              <el-input @focus="dataS_dis1=false;" v-model="form.supplierName"></el-input>
            </el-form-item>
            <el-form-item label="统一社会代码:" style="">
              <el-input disabled @focus="dataS_dis1=false;" v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="联系人:" style="">
              <el-input @focus="dataS_dis1=false;" v-model="form.contacts"></el-input>
            </el-form-item>
            <el-form-item label="联系电话:" style="">
              <el-input @focus="dataS_dis1=false;" v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="经营地址:" style="">
              <el-input v-model="search1" @focus="dataS_dis1=true" @blur="verify1()" @keydown="displays2 = false;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis1">
                  <div v-for="items in tables1" @click="product_type1(items)">
                      <span v-show="display22" style="margin-left: 10px" v-html="format1(items.catgName)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @focus="dataS_dis1=false;" @click="SupplierManagement_Edits()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

      </el-row>
    </el-row>
	</div>

</template>

<script>
import api from "../../api/api.js";
import sys_area_info from '../../assets/js/sys_area_info.json'
import { setTimeout, setInterval, clearTimeout } from 'timers';

  export default {
    data() {
      return {
          areas:sys_area_info.RECORDS,
          tableData: [
            
          ],
          operator:"操作员：" + JSON.parse(sessionStorage.getItem('user')).username + "/操作时间：" + this.Date_day(),
          footer_Num:'12',
          pageNum:'1',
          dialogVisible: false,
          dialogVisible1: false,
          P_adds:false,
          Add_New_Users:false,
          usermod_c:false,
          Userdispaly:false,
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
            supplierName: '',
            code: '',
            contacts: '',
            tel: '',
            address: '',
            addressCode: '',
          },
          companyId:"",
          addEdits:'',
          User:{
              username:'',
              password:'',
          },
          PagesNumber:10,
          classId:'',
          times:null,
          roleControl:{
            addRole:true,
            EditRole:true,
            DeleteRole:true,
            searchRole:true,
          },
      };
    },
    created() {
        let allRoles = JSON.parse(sessionStorage.getItem('newRoutes')),name = "供应商管理";
        allRoles.forEach((v,i)=>{
          v.children.forEach((v1,i1)=>{
              if(v1.permissionName==name){
                let Vchildren = v1.children;
                Vchildren.forEach((v2,i2)=>{
                  switch (v2.permissionName) {
                    case '供应商添加':
                          this.roleControl.addRole = false;
                          break;
                    case '供应商修改':
                          this.roleControl.EditRole = false;
                          break;
                    case '供应商删除':
                          this.roleControl.DeleteRole = false;
                          break;
                    case '供应商查询':
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
        let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
        this.pageNum = params.pageNum;
        this.SupplierManagement_info(params)  
    },
    methods: {
      handleSizeChange(done){
        let params = {pageNum:done.toString(),pageSize:'12'}
        this.pageNum = done.toString();
        this.RoleManagement_info(params)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
            this.pageNum = params.pageNum;
            this.SupplierManagement_info(params)
            this.search = '';
            this.search1 = '';
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
      //随机多少位码
      randomWord(randomFlag, min, max){
          var str = "",
              range = min,
              arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
              'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l',
              'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 
              'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 
              'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 
              'X', 'Y', 'Z','#','&','^','-','*','/','!','~','+','%','<','>',
              '?'];
            if(randomFlag){
                range = Math.round(Math.random() * (max-min)) + min;
            }
            for(var i=0; i<range; i++){
                pos = Math.round(Math.random() * (arr.length-1));
                str += arr[pos];
            }
            return str; 
      },
      product_type(e){
          this.dataS_dis = false;
          this.search = ""
          this.search = e.catgName;
          this.form.address = e.catgName;
          this.form.addressCode = e.id;
      },
      verify(e){
        //地址数据
        this.search = this.search;
        let str = this.search,flg;
        this.form.address = this.search;
          if(this.search == ""){
            this.$message("地址不能为空或者地址格式有误，请检查地址是否正确。")
          }else{
            sys_area_info.RECORDS.forEach((v,i)=>{
              if(str.indexOf(v.catgName)>-1){
                this.form.addressCode = v.id
                flg = true
              }
            })
            
            if(flg){
              if(this.form.addressCode == "")
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
          this.dataS_dis1 = false;
          this.search1 = ""
          this.search1 = e.catgName;
          this.form.address = e.id;
      },
      verify1(e){
        //地址数据
        this.search1 = this.search1;
        let str = this.search1,flg;
        if(this.search == ""){
          this.$message("地址不能为空或者地址格式有误，请检查地址是否正确。")
        }else{
          sys_area_info.RECORDS.forEach((v,i)=>{
            if(str.indexOf(v.catgName)>-1){
              this.form.address = v.id
              flg = true
            }
          })
          if(flg){
            if(this.form.address == "")
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
      SupplierManagement_info(params){
        this.P_adds = true;
        api.SupplierManagement_info(params).then(res => {

            if (res.status == 200) {
                this.footer_Num = Number(res.total)
                this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
                res.data.forEach((v,i)=>{for(var j in v){
                  if(j == "enable")
                    v[j] = this.switchString(v[j]);
                }});
                this.tableData = res.data
                this.P_adds = false;
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
      EnterpriseInfo(str){
        let params = {code:str};
        this.times = window.setTimeout(this.refreshCount(params), 5000);
      },
      refreshCount(params){
        let forms = this.form;
        for(var i in forms){
          forms[i] = "";
        }
        this.form = forms
        api.BusinessAdministration_selectByCode(params).then(res => {
            if (res.status == 200) {
                window.clearTimeout(this.times)
                this.form.supplierName = res.name
                this.form.contacts = res.contacts
                this.form.tel = res.tel
                this.form.code = res.code
                this.form.address = res.address
                this.search = res.address
            } else if(res.status == 500){
                this.Add_New_Users = false
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
      SupplierManagement_adds(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.form){
            obj[i] = _this.form[i];
            objstring +="&"+i+"="+_this.form[i];
          }
          obj.companyId = JSON.parse(sessionStorage.getItem('companyId'))
          this.Add_New_Users = true;
          debugger
          //新增
          api.SupplierManagement_adds(obj).then(res => {
              debugger
              if (res.status == 200) {
                this.Add_New_Users = false;
                  _this.$message({
                    message: "创建"+res.msg,
                    type: 'success'
                  });
                  let forms = this.form;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.form = forms
                  this.dialogVisible = false; 
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                  this.pageNum = params.pageNum;
                  this.SupplierManagement_info(params)  
              } else if(res.status == 500){
                this.Add_New_Users = false
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
      SupplierManagement_Edits(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.form){
            if(i=='createTime' || i=='createUser' || i=='updateTime' || i=='updateUser'){}else{
              obj[i] = _this.form[i];
              objstring +="&"+i+"="+_this.form[i];
            }
              
          }
          this.Add_New_Users = true;
          //修改
          api.SupplierManagement_Edits(obj).then(res => {
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
                  this.dialogVisible1 = false; 
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                  this.pageNum = params.pageNum;
                  this.SupplierManagement_info(params)  
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
      add(dialogVisible){
          let forms = this.form;
          for(var i in forms){
            forms[i] = "";
          }
          this.addEdit = "add"
          this.dialogVisible = true
          //地址模糊数据
          this.tableData1 = this.areas;
      },
      Edit(dialogVisible,e){
          let classId,_this = this,obj={},formData;
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                if(i == "value"){classId = attr[i]}
              }
            }
          });
          obj = _this.tableData.find((item)=>{
              if(item.id === Number(classId))
              return item.id === Number(classId)
          });
          //变量接收对象
          formData = obj;
          //循环赋值
          debugger
          for(var i in formData){this.form[i] = formData[i]}
          this.form["enable"] = this.switchString(this.form["enable"]);
          this.search1 = this.form.address;
          this.dialogVisible1 = true;
          this.classId = classId;
          this.tableData2 = this.areas;
      },
      Delete(e) {
          let classId,_this = this,obj={};
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                if(i == "value"){
                  classId = attr[i];
                    this.$confirm('确认删除？')
                    .then(_ => {
                      this.Add_New_Users = true;
                        api.SupplierManagement_Delete({id: classId}).then(res => {
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
                                let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                                this.pageNum = params.pageNum;
                                this.SupplierManagement_info(params)  
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
   #SupplierManagement .el-dialog--small{
        width: 30%;
   }
      /* 分页 */
   #SupplierManagement .block{
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
   #SupplierManagement .List_button_cz{
    background: #92CC8F;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
   }
   #SupplierManagement .cell .delete{
     background: #E74C3C
   }
   #SupplierManagement .cell .document{
     background: #70C8CB
   }
   #SupplierManagement .block .el-pagination{
     padding-left: 1rem;
   }
   #SupplierManagement .container_padding th{
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
   }
   #SupplierManagement .container_padding th:first-child{
     border-left: 0;
   }
   #SupplierManagement .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }
   #SupplierManagement .container_padding td:first-child{
     padding-left: 1px;
   }
   #SupplierManagement .container_padding tr:nth-child(2n+1){
     background: #F9F9F9
   }
  #SupplierManagement .container_padding tr:nth-child(2n+1) td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }

  #SupplierManagement .select_top{
    position: relative;
    width: 33.3%;
    float: left;
    height: 2.5rem;
  }
  #SupplierManagement .select_top span{
    display: block;
    float: left;
    line-height: 2rem;
    margin-right: 0.8rem;
  }
  #SupplierManagement .select_top .el-input{
    width: 75%;
    line-height: 1.8rem;
    border-radius: .2rem;
    outline: 0;
  }
  #SupplierManagement .box-card::-webkit-scrollbar {
      width: 0px;
  }
  #SupplierManagement .box-card th{
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    font-weight: 400;
  }
  #SupplierManagement .box-card th:first-child{
    border-left: 0;
  }
  #SupplierManagement .box-card td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
  }
  #SupplierManagement .box-card td:first-child{
    padding-left: 1px;
  }
  #SupplierManagement .box-card .button_div{
    padding: .5rem;
  }
  #SupplierManagement .el-date-editor.el-input {
      width: 100%;
  }
  #SupplierManagement .text th{
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }
  #SupplierManagement .dataS_dis_value{
    position: relative;
  }
  #SupplierManagement .dataS{
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
  #SupplierManagement .dataS div{
      display: block;
      width: 100%;
      height: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid #ccc;
  }
  
  #SupplierManagement .el-dialog__header {
      padding: 1.5rem 1.5rem;
      background: #2C3E50;
  }
  #SupplierManagement .el-dialog__title{
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
  #SupplierManagement .el-dialog__body{
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }
  /* !important */
  #SupplierManagement .footer_button{
    position: absolute;
    margin: 0;
    width: 100%;
    height: 5.8rem;
    left: 0;
    background: #EDF2F8;
    bottom: 0;
  }
  #SupplierManagement .footer_button .el-form-item__content{
      margin-left:0 !important;
      min-height: 5.8rem;
      text-align: center;
  }
  #SupplierManagement .footer_button .div_P{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: .3rem;
  }
  #SupplierManagement .div_P div{
    color: #9C9C9C;
    font-size: 14px;
  }
  #SupplierManagement .footer_button .el-button{
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2C3E50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
  #SupplierManagement .footer_button .el-button:hover{
    border: 1px solid #3b5168;
    background: #3b5168;
  }
  #SupplierManagement .header_button {
    width: 86px;
    background: #2C3E50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #SupplierManagement .header_button:hover{
    border: 1px solid transparent;
  }
  #SupplierManagement .header_button_a{
    width: 86px;
    background: #47A136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #SupplierManagement .header_button_a:hover{
    border: 1px solid transparent;
  }
  #SupplierManagement .el-card__header {
    padding: 0 20px;
    line-height: 3rem;
  }
  #SupplierManagement .button_list{
    float: right;
  }
  #SupplierManagement .button_list button{
    background-color: #92CC8F;
    border-color: #92CC8F;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #SupplierManagement .button_list button:last-child{
    background-color: #E74C3C;
    border-color: #E74C3C;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #SupplierManagement .uploadImages_div{
    position: absolute;
    width: 9rem;
    margin: 0;
    right: 14%;
    top: 5%;
    text-align: center;
  }
  #SupplierManagement .uploadImages_div .el-form-item__content{
    margin-left:0px !important
  }
  #SupplierManagement .upload{
    width: 100%;
    position: relative;
    height: 8rem;
    text-align: center;
    font-size: 45px;
    line-height: 8rem;
    background: #ccc;
  }
  #SupplierManagement .change{
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 8rem;
    background: #ccc;
    position: absolute;
  }
  #SupplierManagement .ql-editor {
      height: 5rem;
  }


@media screen and (min-width: 1200px) and (max-width: 1680px){
  #SupplierManagement .m-lg-1{
    width: 8.33%;
  }
  #SupplierManagement .m-lg-2{
    width: 16.66%;
  }
  #SupplierManagement .m-lg-3{
    width: 25%;
  }
  #SupplierManagement .m-lg-4{
    width: 33.33%;
  }
  #SupplierManagement .m-lg-5{
    width: 41.66%;
  }
  #SupplierManagement .m-lg-6{
    width: 49.98%;
  }
  #SupplierManagement .m-lg-7{
    width: 58.31%;
  }
  #SupplierManagement .m-lg-8{
    width: 66.64%;
  }
  #SupplierManagement .m-lg-9{
    width: 74.97%;
  }
  #SupplierManagement .m-lg-10{
    width: 83.30%;
  }
  #SupplierManagement .m-lg-11{
    width: 91.63%;
  }
  #SupplierManagement .m-lg-12{
    width: 100%;
  }
  #SupplierManagement .el-dialog--small {
      width: 50%;
  }
  #SupplierManagement .select_top .el-input {
      width: 70%;
  }
}
</style>
