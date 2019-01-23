<template>
	<div id="QVRLassify" v-loading="P_adds">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="padding:1.5rem;border:0;box-shadow:none;">
          <el-col :md="18" :lg="20" class="m-lg-10" :span="20" style="">
            <el-input v-model="thisSearch" style="width:26%" placeholder="请输入分类名称"></el-input>
            <el-button size="medium" class="mr header_button"  :disabled="roleControl.searchRole" @click="search(thisSearch)"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="12" :lg="4" :span="4">
            <el-button style="float: right;" size="medium" class="mr header_button_a" :disabled="roleControl.addRole" @click="add(Add_Visible)"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #F4F4F4;width:100%;margin-top: 1.5rem;">
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">分类名称</th>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">分类标识</th>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">状态</th>
                        <th colspan="1" style="text-align:center;width:16%" rowspan="1">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="items in tableData" >
                        <td><div class="cell">{{ items.name }}</div></td>
                        <td><div class="cell">{{ items.sign }}</div></td>
                        <td><div class="cell">{{ items.enable }}</div></td>
                        <td><div class="cell">
                          <button class="List_button_cz"  :idvalue="items.id" :disabled="roleControl.EditRole" @click="Edit($event)"><i class="el-icon-edit"></i></button>
                          <button class="List_button_cz document" :idvalue="items.id" v-show="false" @click="roleEdit($event)"><i class="el-icon-document"></i></button>
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
          title="新增"
          :visible.sync="Add_Visible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="AddForm" label-width="150px">
            <el-form-item label="标准分类名称:" style="">
              <el-input v-model="AddForm.name"></el-input>
            </el-form-item>
            <el-form-item label="标准分类标识:" style="">
              <el-input v-model="AddForm.sign"></el-input>
            </el-form-item>
            <el-form-item label="物料分类属性:" style="">
              <el-radio-group v-model="AddForm.enable">
                <el-radio v-model="AddForm.enable" :label="1">启用</el-radio>
                <el-radio v-model="AddForm.enable" :label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="QVRLassify_adds()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        
        <el-dialog
          v-loading="usermod_c"
          title="修改"
          :visible.sync="Userdispaly"
          width="100%"
          :before-close="handleClose">
          <el-form :model="EditForm" label-width="150px">
            <el-form-item label="标准分类名称:" style="">
              <el-input v-model="EditForm.name"></el-input>
            </el-form-item>
            <el-form-item label="标准分类标识:" style="">
              <el-input v-model="EditForm.sign"></el-input>
            </el-form-item>
            <el-form-item label="物料分类属性:" style="">
              <el-radio-group v-model="EditForm.enable">
                <el-radio v-model="EditForm.enable" :label="1">启用</el-radio>
                <el-radio v-model="EditForm.enable" :label="0">禁用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="QVRLassify_Edits()" >确认提交</el-button>
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
          thisSearch:'',
          Add_Visible: false,
          Edit_Visible: false,
          Jurisdiction_Visible:false,
          P_adds:false,
          usermod_c:false,
          Userdispaly:false,
          AddForm: {
            name: '',
            sign: '',
            enable: '',
          },
          EditForm:{
            name: '',
            sign: '',
            enable: '',
          },
          companyId:"",
          addEdits:'',
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
            searchRole:true,
          },
      };
    },
    created() {
        let allRoles = JSON.parse(sessionStorage.getItem('newRoutes')),name = "国标分类";
        allRoles.forEach((v,i)=>{
          v.children.forEach((v1,i1)=>{
              if(v1.permissionName==name){
                let Vchildren = v1.children;
                Vchildren.forEach((v2,i2)=>{
                  switch (v2.permissionName) {
                    case '国标分类添加':
                          this.roleControl.addRole = false;
                          break;
                    case '国标分类修改':
                          this.roleControl.EditRole = false;
                          break;
                    case '国标分类删除':
                          this.roleControl.DeleteRole = false;
                          break;
                    case '国标分类查询':
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
        let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
        this.pageNum = params.pageNum;
        this.QVRLassify_info(params)
    },
    methods: {
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
      handleSizeChange(done){
        let params = {pageNum:done.toString(),pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
        this.pageNum = done.toString();
        this.QVRLassify_info(params)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
            this.pageNum = params.pageNum;
            this.QVRLassify_info(params)
            done();
          })
          .catch(_ => {});
      },
      QVRLassify_info(params){
        this.P_adds = true;
        api.QVRLassify_info(params).then(res => {
          
            if (res.status == 200) {
                this.footer_Num = Number(res.total)
                this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
                res.data.forEach((v,i)=>{for(var j in v){
                  if(j == "enable"){
                    v[j]=this.switchString(v[j])
                  }
                }});
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
      QVRLassify_adds(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.AddForm){
            obj[i] = _this.AddForm[i];
            objstring +="&"+i+"="+_this.AddForm[i];
          }
          this.P_adds = true;
          //新增
          api.QVRLassify_adds(obj).then(res => {
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
                  this.QVRLassify_info()  
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
      QVRLassify_Edits(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.EditForm){
            if(i=='createTime' || i=='createUser' || i=='updateTime' || i=='updateUser'){}else{
              obj[i] = _this.EditForm[i];
              objstring +="&"+i+"="+_this.EditForm[i];
            }
              
          }
          debugger
          this.usermod_c = true;
          //修改
          api.QVRLassify_Edits(obj).then(res => {

              if (res.status == 200) {
                 this.usermod_c = false;
                  _this.$message({
                    message: "修改"+res.msg,
                    type: 'success'
                  });
                  let forms = this.EditForm;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.EditForm = forms
                  this.Userdispaly = false
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                  this.pageNum = params.pageNum;
                  this.QVRLassify_info(params)   
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
      add(Add_Visible){
          let forms = this.AddForm;
          for(var i in forms){
            forms[i] = "";
          }
          this.AddForm = forms
          this.Add_Visible = true
      },
      Edit(e){
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
          this.Userdispaly = true;
          //变量接收对象
          formData = obj;
          //循环赋值
          for(var i in formData){this.EditForm[i] = formData[i]}
          //清除字符串
          this.EditForm['enable'] = this.switchString(this.EditForm['enable'])
      },
      search(str){
        let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),name:str}
        this.pageNum = params.pageNum;
        this.QVRLassify_info(params)
      },
      Delete(e) {
          let userId,_this = this,obj={};
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                if(i == "value"){
                  userId = attr[i]
                    this.$confirm('确认删除？')
                    .then(_ => {
                      this.P_adds = true;
                      api.QVRLassify_Delete({id: userId}).then(res => {
                          if (res.status == 200) {
                              this.P_adds = false;
                              _this.$message({
                                message: "删除"+res.msg,
                                type: 'success'
                              });
                              let params = {pageNum:'1',pageSize:'12',id:JSON.parse(sessionStorage.getItem('userId'))}
                              this.pageNum = params.pageNum;
                              this.QVRLassify_info(params)  
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


 #QVRLassify .el-dialog--small{
        width: 30%;
   }
   /* 分页 */
   #QVRLassify .block{
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
   #QVRLassify .List_button_cz{
    background: #92CC8F;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
   }
   #QVRLassify .cell .delete{
     background: #E74C3C
   }
   #QVRLassify .cell .document{
     background: #70C8CB
   }
   #QVRLassify .block .el-pagination{
     padding-left: 1rem;
   }
   #QVRLassify .container_padding th{
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
   }
   #QVRLassify .container_padding th:first-child{
     border-left: 0;
   }
   #QVRLassify .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }
   #QVRLassify .container_padding td:first-child{
     padding-left: 1px;
   }
   #QVRLassify .container_padding tr:nth-child(2n+1){
     background: #F9F9F9
   }
  #QVRLassify .container_padding tr:nth-child(2n+1) td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }

  #QVRLassify .select_top{
    position: relative;
    width: 33.3%;
    float: left;
    height: 2.5rem;
  }
  #QVRLassify .select_top span{
    display: block;
    float: left;
    line-height: 2rem;
    margin-right: 0.8rem;
  }
  #QVRLassify .select_top .el-input{
    width: 75%;
    line-height: 1.8rem;
    border-radius: .2rem;
    outline: 0;
  }
  #QVRLassify .box-card::-webkit-scrollbar {
      width: 0px;
  }
  #QVRLassify .box-card th{
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    font-weight: 400;
  }
  #QVRLassify .box-card th:first-child{
    border-left: 0;
  }
  #QVRLassify .box-card td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
  }
  #QVRLassify .box-card td:first-child{
    padding-left: 1px;
  }
  #QVRLassify .box-card .button_div{
    padding: .5rem;
  }
  #QVRLassify .el-date-editor.el-input {
      width: 100%;
  }
  #QVRLassify .text th{
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }
  #QVRLassify .dataS_dis_value{
    position: relative;
  }
  #QVRLassify .dataS{
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
  #QVRLassify .dataS div{
      display: block;
      width: 100%;
      height: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid #ccc;
  }
  
  #QVRLassify .el-dialog__header {
      padding: 1.5rem 1.5rem;
      background: #2C3E50;
  }
  #QVRLassify .el-dialog__title{
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
  #QVRLassify .el-dialog__body{
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }
  /* !important */
  #QVRLassify .footer_button{
    position: absolute;
    margin: 0;
    width: 100%;
    height: 5.8rem;
    left: 0;
    background: #EDF2F8;
    bottom: 0;
  }
  #QVRLassify .footer_button .el-form-item__content{
      margin-left:0 !important;
      min-height: 5.8rem;
      text-align: center;
  }
  #QVRLassify .footer_button .div_P{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: .3rem;
  }
  #QVRLassify .div_P div{
    color: #9C9C9C;
    font-size: 14px;
  }
  #QVRLassify .footer_button .el-button{
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2C3E50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
  #QVRLassify .footer_button .el-button:hover{
    border: 1px solid #3b5168;
    background: #3b5168;
  }
  #QVRLassify .header_button {
    width: 86px;
    background: #2C3E50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #QVRLassify .header_button:hover{
    border: 1px solid transparent;
  }
  #QVRLassify .header_button_a{
    width: 86px;
    background: #47A136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #QVRLassify .header_button_a:hover{
    border: 1px solid transparent;
  }
  #QVRLassify .el-card__header {
    padding: 0 20px;
    line-height: 3rem;
  }
  #QVRLassify .button_list{
    float: right;
  }
  #QVRLassify .button_list button{
    background-color: #92CC8F;
    border-color: #92CC8F;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #QVRLassify .button_list button:last-child{
    background-color: #E74C3C;
    border-color: #E74C3C;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #QVRLassify .uploadImages_div{
    position: absolute;
    width: 9rem;
    margin: 0;
    right: 14%;
    top: 5%;
    text-align: center;
  }
  #QVRLassify .uploadImages_div .el-form-item__content{
    margin-left:0px !important
  }
  #QVRLassify .upload{
    width: 100%;
    position: relative;
    height: 8rem;
    text-align: center;
    font-size: 45px;
    line-height: 8rem;
    background: #ccc;
  }
  #QVRLassify .change{
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 8rem;
    background: #ccc;
    position: absolute;
  }
  #QVRLassify .ql-editor {
      height: 5rem;
  }


@media screen and (min-width: 1200px) and (max-width: 1680px){
  #QVRLassify .m-lg-1{
    width: 8.33%;
  }
  #QVRLassify .m-lg-2{
    width: 16.66%;
  }
  #QVRLassify .m-lg-3{
    width: 25%;
  }
  #QVRLassify .m-lg-4{
    width: 33.33%;
  }
  #QVRLassify .m-lg-5{
    width: 41.66%;
  }
  #QVRLassify .m-lg-6{
    width: 49.98%;
  }
  #QVRLassify .m-lg-7{
    width: 58.31%;
  }
  #QVRLassify .m-lg-8{
    width: 66.64%;
  }
  #QVRLassify .m-lg-9{
    width: 74.97%;
  }
  #QVRLassify .m-lg-10{
    width: 83.30%;
  }
  #QVRLassify .m-lg-11{
    width: 91.63%;
  }
  #QVRLassify .m-lg-12{
    width: 100%;
  }
  #QVRLassify .el-dialog--small {
      width: 46%;
  }
  #QVRLassify .select_top .el-input {
      width: 70%;
  }
}
</style>
