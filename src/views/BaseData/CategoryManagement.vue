<template>
	<div id="CategoryManagement" v-loading="P_adds">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="padding:1.5rem">
          <el-col :md="18" :lg="20" class="m-lg-10" :span="20" style="">
            <el-input style="width:26%" placeholder="请输入分类名称"></el-input>
            <el-button size="medium" class="mr header_button" :disabled="roleControl.searchRole"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="6" :lg="4" class="m-lg-2" :span="4">
            <el-button style="float: right;" size="medium" class="mr header_button_a" :disabled="roleControl.addRole" @click="add()"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #F4F4F4;width:100%;margin-top: 1.5rem;">
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">分类名称</th>
                        <th colspan="1" style="text-align:center;width:4%" rowspan="1">属性</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">描述</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">状态</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="items in tableData" ref="table_tr">
                        <td><div class="cell">{{ items.categoryName }}</div></td>
                        <td><div class="cell">{{ items.categoryType }}</div></td>
                        <td><div class="cell">{{ items.description }}</div></td>
                        <td><div class="cell">{{ items.enable }}</div></td>
                        <td><div class="cell">
                          <button class="List_button_cz"  :idvalue="items.id" :disabled="roleControl.EditRole" @click="Edit(dialogVisible,$event)"><i class="el-icon-edit"></i></button>
                          <button class="List_button_cz document" :idvalue="items.id" :disabled="roleControl.EditRole"><i class="el-icon-document"></i></button>
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
          title="新增分类"
          :visible.sync="dialogVisible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="form" label-width="100px">
            <el-form-item label="物料分类名称:" style="">
              <el-input v-model="form.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="国家标准分类:" style="">
              <el-input v-model="form.QVRclass"></el-input>
            </el-form-item>
            <el-form-item label="物料分类属性:" style="">
              <el-radio-group @change="radios" v-for="items in selectList" :key="items.id" v-model="form.categoryType">
                <el-radio :label="items.id">{{ items.name }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="物料分类描述:" style="">
              <textarea 
              rows="3" 
              v-model="form.description" 
              placeholder="请输入描述内容..." 
              @blur="onEditorBlur($event)" 
              cols="30" 
              style="width:99%;resize:none;height:6rem;font-size:16px;border: 1px solid #bfcbd9;color: rgb(31, 45, 61);border-radius: 4px;">
              </textarea>
            </el-form-item>
            <el-form-item label="是否有效:" >
              <el-radio-group v-model="form.enable">
                <el-radio v-model="form.enable" :label="0">禁用</el-radio>
                <el-radio v-model="form.enable" :label="1">启用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="CategoryManagement_adds()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        
        <el-dialog
          v-loading="usermod_c"
          title="修改类别"
          :visible.sync="dialogVisible1"
          width="100%"
          :before-close="handleClose">
          <el-form :model="E_form" label-width="100px">
            <el-form-item label="物料分类名称:" style="">
              <el-input v-model="E_form.categoryName"></el-input>
            </el-form-item>
            <el-form-item label="国家标准分类:" style="">
              <el-input v-model="E_form.QVRclass"></el-input>
            </el-form-item>
            <el-form-item label="物料分类属性:" style="">
              <el-radio-group @change="radios" v-for="items in selectList" :key="items.id" v-model="E_form.categoryType">
                <el-radio :label="items.id">{{ items.name }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="物料分类描述:" style="">
              <textarea 
              rows="3" 
              v-model="E_form.description" 
              placeholder="请输入描述内容..." 
              @blur="onEditorBlur($event)" 
              cols="30" 
              style="width:99%;resize:none;height:6rem;font-size:16px;border: 1px solid #bfcbd9;color: rgb(31, 45, 61);border-radius: 4px;">
              </textarea>
            </el-form-item>
            <el-form-item label="是否有效:" >
              <el-radio-group v-model="E_form.enable">
                <el-radio v-model="E_form.enable" :label="0">禁用</el-radio>
                <el-radio v-model="E_form.enable" :label="1">启用</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="CategoryManagement_Edits()" >确认提交</el-button>
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
          operator:"操作员：" + sessionStorage.getItem('userName') + "/操作时间：" + this.Date_day(),
          add_description:'',
          tableData: [],
          footer_Num:'12',
          pageNum:'1',
          dialogVisible: false,
          dialogVisible1: false,
          P_adds:false,
          P_adds:false,
          usermod_c:false,
          Userdispaly:false,
          form: {
            categoryName: '',
            description: '',
            companyId: '',
            QVRclass: '',
            categoryType: 1,
            enable:0
          },
          E_form: {
            categoryName: '',
            description: '',
            companyId: '',
            QVRclass: '',
            categoryType: 1,
            enable:0
          },
          formData:{},
          companyId:"",
          addEdits:'',
          User:{
              username:'',
              password:'',
          },
          PagesNumber:10,
          classId:'',
          selectList:[
              {id:1,name:'原料'},
              {id:2,name:'商品'},
          ],
          select_value: {
            
          },
          Classification:'',
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
        let allRoles = JSON.parse(sessionStorage.getItem('newRoutes')),name = "物料分类";
        allRoles.forEach((v,i)=>{
          debugger
          v.children.forEach((v1,i1)=>{
            debugger
              if(v1.permissionName==name){
                let Vchildren = v1.children;
                Vchildren.forEach((v2,i2)=>{
                  switch (v2.permissionName) {
                    case '物料分类添加':
                          this.roleControl.addRole = false;
                          break;
                    case '物料分类修改':
                          this.roleControl.EditRole = false;
                          break;
                    case '物料分类删除':
                          this.roleControl.DeleteRole = true;
                          break;
                    case '物料分类查询':
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
        this.CategoryManagement_info(params)  
    },
    methods: {
      selectGet(vId){
        let obj = {};
        obj = this.selectList.find((item)=>{
            if(item.id === vId)
            return item.id === vId
        });
        this.Classification = obj.id
      },
      onEditorBlur(editor) {
        console.log('editor blur!', editor)
        console.log('editor blur!', this.add_description)
      },
      radios(id){
        this.form.categoryType = id;
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
            this.CategoryManagement_info(params)  
            done();
          })
          .catch(_ => {});
      },
      switchString(str,flg){
        if(flg){
          switch (str) {
            case 2:
                  return "商品"
                  break;
            case 1:
                  return "原料"
                  break;
            case "商品":
                  return 2
                  break;
            case "原料":
                  return 1
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
      CategoryManagement_info(params){
        this.P_adds = true;
        api.CategoryManagement_info(params).then(res => {
            if (res.status == 200) {
                this.footer_Num = Number(res.total)
                this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
                res.data.forEach((v,i)=>{for(var j in v){
                  if(j == "enable")
                    v[j] = this.switchString(v[j])
                  if(j == "categoryType")
                    v[j] = this.switchString(v[j],true)
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
      CategoryManagement_adds(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.form){
            obj[i] = _this.form[i];
            objstring +="&"+i+"="+_this.form[i];
          }
          debugger
          obj.companyId = JSON.parse(sessionStorage.getItem('companyId'))
          this.P_adds = true;

          //新增
          api.CategoryManagement_adds(obj).then(res => {

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
                  this.dialogVisible = false; 
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                  this.pageNum = params.pageNum;
                  this.CategoryManagement_info(params)  
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
      CategoryManagement_Edits(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.E_form){
            if(i=='createTime' || i=='createUser' || i=='updateTime' || i=='updateUser'){}else{
              obj[i] = _this.E_form[i];
              objstring +="&"+i+"="+_this.E_form[i];
            }
          }
          debugger
          this.P_adds = true;
          //修改
          api.CategoryManagement_Edits(obj).then(res => {
              if (res.status == 200) {
                 this.P_adds = false;
                  _this.$message({
                    message: "修改"+res.msg,
                    type: 'success'
                  });
                  let forms = this.E_form;
                  for(var i in forms){
                    forms[i] = "";
                  }
                  this.E_form = forms
                  this.dialogVisible1 = false; 
                  let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                  this.pageNum = params.pageNum;
                  this.CategoryManagement_info(params)  
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
      add(dialogVisible){
          let forms = this.form;
          for(var i in forms){
            forms[i] = "";
          }
          this.addEdit = "add"
          this.dialogVisible = true
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
          _this.tableData.forEach((v,i)=>{
            if(v.id === Number(classId))
            obj = v
          })
          this.dialogVisible1 = true;
          //变量接收对象
          formData = obj;
          //循环赋值
          for(var i in formData){this.E_form[i] = formData[i]}
          //清除字符串
          for(var i in this.E_form){
            if(Number(this.E_form["enable"])){}else{
              this.E_form["enable"] = this.switchString(this.E_form["enable"])
            }
            if(Number(this.E_form["categoryType"])){}else{
              this.E_form["categoryType"] = this.switchString(this.E_form["categoryType"],true)
            }
          }
          this.classId = classId;
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
                      this.P_adds = true;
                        api.CategoryManagement_Delete({id: classId}).then(res => {

                            if (res.status == 200) {
                              this.P_adds = false;
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
                                this.CategoryManagement_info(params)  
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
   #CategoryManagement .el-dialog--small{
        width: 30%;
   }
      /* 分页 */
   #CategoryManagement .block{
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
   #CategoryManagement .List_button_cz{
    background: #92CC8F;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
   }
   #CategoryManagement .cell .delete{
     background: #E74C3C
   }
   #CategoryManagement .cell .document{
     background: #70C8CB
   }
   #CategoryManagement .block .el-pagination{
     padding-left: 1rem;
   }
   #CategoryManagement .container_padding th{
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
   }
   #CategoryManagement .container_padding th:first-child{
     border-left: 0;
   }
   #CategoryManagement .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }
   #CategoryManagement .container_padding td:first-child{
     padding-left: 1px;
   }
   #CategoryManagement .container_padding tr:nth-child(2n+1){
     background: #F9F9F9
   }
  #CategoryManagement .container_padding tr:nth-child(2n+1) td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }

  #CategoryManagement .select_top{
    position: relative;
    width: 33.3%;
    float: left;
    height: 2.5rem;
  }
  #CategoryManagement .select_top span{
    display: block;
    float: left;
    line-height: 2rem;
    margin-right: 0.8rem;
  }
  #CategoryManagement .select_top .el-input{
    width: 75%;
    line-height: 1.8rem;
    border-radius: .2rem;
    outline: 0;
  }
  #CategoryManagement .box-card::-webkit-scrollbar {
      width: 0px;
  }
  #CategoryManagement .box-card th{
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    font-weight: 400;
  }
  #CategoryManagement .box-card th:first-child{
    border-left: 0;
  }
  #CategoryManagement .box-card td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
  }
  #CategoryManagement .box-card td:first-child{
    padding-left: 1px;
  }
  #CategoryManagement .box-card .button_div{
    padding: .5rem;
  }
  #CategoryManagement .el-date-editor.el-input {
      width: 100%;
  }
  #CategoryManagement .text th{
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }
  #CategoryManagement .dataS_dis_value{
    position: relative;
  }
  #CategoryManagement .dataS{
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
  #CategoryManagement .dataS div{
      display: block;
      width: 100%;
      height: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid #ccc;
  }
  
  #CategoryManagement .el-dialog__header {
      padding: 1.5rem 1.5rem;
      background: #2C3E50;
  }
  #CategoryManagement .el-dialog__title{
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
  #CategoryManagement .el-dialog__body{
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }
  /* !important */
  #CategoryManagement .footer_button{
    position: absolute;
    margin: 0;
    width: 100%;
    height: 5.8rem;
    left: 0;
    background: #EDF2F8;
    bottom: 0;
  }
  #CategoryManagement .footer_button .el-form-item__content{
      margin-left:0 !important;
      min-height: 5.8rem;
      text-align: center;
  }
  #CategoryManagement .footer_button .div_P{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: .3rem;
  }
  #CategoryManagement .div_P div{
    color: #9C9C9C;
    font-size: 14px;
  }
  #CategoryManagement .footer_button .el-button{
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2C3E50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
  #CategoryManagement .footer_button .el-button:hover{
    border: 1px solid #3b5168;
    background: #3b5168;
  }
  #CategoryManagement .header_button {
    width: 86px;
    background: #2C3E50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #CategoryManagement .header_button:hover{
    border: 1px solid transparent;
  }
  #CategoryManagement .header_button_a{
    width: 86px;
    background: #47A136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #CategoryManagement .header_button_a:hover{
    border: 1px solid transparent;
  }
  #CategoryManagement .el-card__header {
    padding: 0 20px;
    line-height: 3rem;
  }
  #CategoryManagement .button_list{
    float: right;
  }
  #CategoryManagement .button_list button{
    background-color: #92CC8F;
    border-color: #92CC8F;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #CategoryManagement .button_list button:last-child{
    background-color: #E74C3C;
    border-color: #E74C3C;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #CategoryManagement .uploadImages_div{
    position: absolute;
    width: 9rem;
    margin: 0;
    right: 14%;
    top: 5%;
    text-align: center;
  }
  #CategoryManagement .uploadImages_div .el-form-item__content{
    margin-left:0px !important
  }
  #CategoryManagement .upload{
    width: 100%;
    position: relative;
    height: 8rem;
    text-align: center;
    font-size: 45px;
    line-height: 8rem;
    background: #ccc;
  }
  #CategoryManagement .change{
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 8rem;
    background: #ccc;
    position: absolute;
  }
  #CategoryManagement .ql-editor {
      height: 5rem;
  }


@media screen and (min-width: 1200px) and (max-width: 1680px){
  #CategoryManagement .m-lg-1{
    width: 8.33%;
  }
  #CategoryManagement .m-lg-2{
    width: 16.66%;
  }
  #CategoryManagement .m-lg-3{
    width: 25%;
  }
  #CategoryManagement .m-lg-4{
    width: 33.33%;
  }
  #CategoryManagement .m-lg-5{
    width: 41.66%;
  }
  #CategoryManagement .m-lg-6{
    width: 49.98%;
  }
  #CategoryManagement .m-lg-7{
    width: 58.31%;
  }
  #CategoryManagement .m-lg-8{
    width: 66.64%;
  }
  #CategoryManagement .m-lg-9{
    width: 74.97%;
  }
  #CategoryManagement .m-lg-10{
    width: 83.30%;
  }
  #CategoryManagement .m-lg-11{
    width: 91.63%;
  }
  #CategoryManagement .m-lg-12{
    width: 100%;
  }
  #CategoryManagement .el-dialog--small {
      width: 40%;
  }
  #CategoryManagement .select_top .el-input {
      width: 70%;
  }
}
</style>
