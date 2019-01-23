<template>
	<div id="ProductionPlace" v-loading="P_adds">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="padding:1.5rem">
          <el-col :md="18" :lg="20" class="m-lg-10" :span="20" style="">
            <el-input style="width:26%" v-model="searchInput" placeholder="请输入产地名称"></el-input>
            <el-button size="medium" class="mr header_button" :disabled="roleControl.searchRole" @click="searchF(searchInput)"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="6" :lg="4" class="m-lg-2" :span="4">
            <el-button style="float: right;" size="medium" class="mr header_button_a" @click="add()" :disabled="roleControl.addRole"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #F4F4F4;width:100%;margin-top: 1.5rem;">
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">编码</th>
                        <th colspan="1" style="text-align:center;width:4%" rowspan="1">省市区名称</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="items in tableData" ref="table_tr">
                        <td><div class="cell">{{ items.id }}</div></td>
                        <td><div class="cell">{{ items.name }}</div></td>
                        <td><div class="cell" :idvalue="items.id">
                          <button class="List_button_cz"  :idvalue="items.id" :disabled="roleControl.EditRole" @click="Edit($event)"><i :idvalue="items.id" class="el-icon-edit"></i></button>
                          <button class="List_button_cz delete"  :idvalue="items.id" :disabled="roleControl.DeleteRole" @click="Delete($event)"><i :idvalue="items.id" class="el-icon-delete"></i></button>
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
          title="新增产地"
          :visible.sync="add_New_Nsers"
          width="100%"
          :before-close="handleClose">
          <el-form :model="form" label-width="100px">
            <el-form-item label="编码:" style="">
              <el-input v-model="form.id"></el-input>
            </el-form-item>
            <el-form-item label="省市区名称:" style="">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="ProductionPlace_adds()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        
        <el-dialog
          v-loading="P_adds"
          title="修改产地"
          :visible.sync="add_New_Nsers1"
          width="100%"
          :before-close="handleClose">
          <el-form :model="form" label-width="100px">
            <el-form-item label="编码:" style="">
              <el-input v-model="form.id "></el-input>
            </el-form-item>
            <el-form-item label="省市区名称:" style="">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="ProductionPlace_Edits()" >确认提交</el-button>
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
          editorOption: {},
          tableData: [],
          footer_Num:'12',
          pageNum:'1',
          P_adds:false,
          add_New_Nsers:false,
          add_New_Nsers1:false,
          searchInput:'',
          form: {
            id: '',
            name: '',
          },
          companyId:"",
          PagesNumber:10,
          classId:'',
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
        let allRoles = JSON.parse(sessionStorage.getItem('newRoutes')),name = "产地管理";
        allRoles.forEach((v,i)=>{
          
          v.children.forEach((v1,i1)=>{
            
              if(v1.permissionName==name){
                let Vchildren = v1.children;
                Vchildren.forEach((v2,i2)=>{
                  switch (v2.permissionName) {
                    case '产地添加':
                          this.roleControl.addRole = false;
                          break;
                    case '产地修改':
                          this.roleControl.EditRole = false;
                          break;
                    case '产地删除':
                          this.roleControl.DeleteRole = false;
                          break;
                    case '产地查询':
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
        let params = {pageNum:'1',pageSize:'12'}
        this.pageNum = params.pageNum;
        this.ProductionPlace_info(params)  
    },
    methods: {
      handleSizeChange(done){
        let params = {pageNum:done.toString(),pageSize:'12'}
        this.pageNum = done.toString();
        this.ProductionPlace_info(params)  
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            let params = {pageNum:'1',pageSize:'12'}
            this.pageNum = params.pageNum;
            this.ProductionPlace_info(params)  
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
      ProductionPlace_info(params){
        this.P_adds = true;
        api.ProductionPlace_info(params).then(res => {
            this.listLoading = false;
            if (res.status == 200) {
                this.footer_Num = Number(res.total)
                this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
                this.tableData = res.data
                this.P_adds = false;
            } else {
              this.P_adds = false
              if(res.msg == undefined || res.msg == "")
              this.$message("服务器忙！");
              else
              this.$message(res.msg);
            }
        }); 
      },
      ProductionPlace_adds(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.form){
            obj[i] = _this.form[i];
          }
          this.P_adds = true;
          //新增
          api.ProductionPlace_adds(obj).then(res => {
              if (res.status == 200) {
                this.P_adds = false;
                this.$message({
                message: "创建"+res.msg,
                type: 'success'
                });
                let forms = this.form;
                for(var i in forms){
                forms[i] = "";
                }
                this.form = forms
                this.add_New_Nsers = false; 
                let params = {pageNum:'1',pageSize:'12'}
                this.pageNum = params.pageNum;
                this.ProductionPlace_info(params)  
              } else {
                this.P_adds = false
                if(res.msg == undefined || res.msg == "")
                this.$message("服务器忙！");
                else
                this.$message(res.msg);
              }
          });   
      },
      ProductionPlace_Edits(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.form){
            obj[i] = _this.form[i];
          }
          this.P_adds = true;
          //修改
          api.ProductionPlace_Edits(obj).then(res => {
              if (res.status == 200) {
                this.P_adds = false;
                this.$message({
                    message: "修改"+res.msg,
                    type: 'success'
                });
                let forms = this.form;
                for(var i in forms){
                    forms[i] = "";
                }
                this.add_description = "";
                this.form = forms
                this.add_New_Nsers1 = false; 
                let params = {pageNum:'1',pageSize:'12'}
                this.pageNum = params.pageNum;
                this.ProductionPlace_info(params)  
              } else {
                this.P_adds = false
                if(res.msg == undefined || res.msg == "")
                this.$message("服务器忙！");
                else
                this.$message(res.msg);
              }
          }); 
      },
      searchF(val){
        let params = {pageNum:'1',pageSize:'12',name:val}
        this.pageNum = params.pageNum;
        this.ProductionPlace_info(params)  
      },
      add(){
          let forms = this.form;
          for(var i in forms){
            forms[i] = "";
          }
          this.addEdit = "add"
          this.add_New_Nsers = true
      },
      Edit(e){
          let classId,_this = this,obj={},formData;
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes[0];
            for(var i in attr)
              {
                if(i == "value"){classId = attr[i]}
              }
            }
          });
          obj = _this.tableData.find((item)=>{
              if(item.id === classId)
              return item.id === classId
          });
          debugger
          this.add_New_Nsers1 = true
          //变量接收对象
          formData = obj;
          //循环赋值
          for(var i in formData){this.form[i] = formData[i]}
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
                        api.ProductionPlace_Delete({id: classId}).then(res => {
                            if (res.status == 200) {
                                this.P_adds = false;
                                this.$message({
                                  message: "删除"+res.msg,
                                  type: 'success'
                                });
                                let params = {pageNum:'1',pageSize:'12'}
                                this.pageNum = params.pageNum;
                                this.ProductionPlace_info(params)  
                            } else if(res.status == 500){
                                  this.P_adds = false;
                                  this.$message("服务器忙！");
                            }else{
                              this.P_adds = false
                              if(res.msg == undefined || res.msg == "")
                              this.$message("服务器忙！");
                              else
                              this.$message(res.msg);
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
   #ProductionPlace .el-dialog--small{
        width: 30%;
   }
      /* 分页 */
   #ProductionPlace .block{
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
   #ProductionPlace .List_button_cz{
    background: #92CC8F;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
   }
   #ProductionPlace .cell .delete{
     background: #E74C3C
   }
   #ProductionPlace .cell .document{
     background: #70C8CB
   }
   #ProductionPlace .block .el-pagination{
     padding-left: 1rem;
   }
   #ProductionPlace .container_padding th{
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
   }
   #ProductionPlace .container_padding th:first-child{
     border-left: 0;
   }
   #ProductionPlace .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }
   #ProductionPlace .container_padding td:first-child{
     padding-left: 1px;
   }
   #ProductionPlace .container_padding tr:nth-child(2n+1){
     background: #F9F9F9
   }
  #ProductionPlace .container_padding tr:nth-child(2n+1) td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }

  #ProductionPlace .select_top{
    position: relative;
    width: 33.3%;
    float: left;
    height: 2.5rem;
  }
  #ProductionPlace .select_top span{
    display: block;
    float: left;
    line-height: 2rem;
    margin-right: 0.8rem;
  }
  #ProductionPlace .select_top .el-input{
    width: 75%;
    line-height: 1.8rem;
    border-radius: .2rem;
    outline: 0;
  }
  #ProductionPlace .box-card::-webkit-scrollbar {
      width: 0px;
  }
  #ProductionPlace .box-card th{
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    font-weight: 400;
  }
  #ProductionPlace .box-card th:first-child{
    border-left: 0;
  }
  #ProductionPlace .box-card td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
  }
  #ProductionPlace .box-card td:first-child{
    padding-left: 1px;
  }
  #ProductionPlace .box-card .button_div{
    padding: .5rem;
  }
  #ProductionPlace .el-date-editor.el-input {
      width: 100%;
  }
  #ProductionPlace .text th{
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }
  #ProductionPlace .dataS_dis_value{
    position: relative;
  }
  #ProductionPlace .dataS{
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
  #ProductionPlace .dataS div{
      display: block;
      width: 100%;
      height: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid #ccc;
  }
  
  #ProductionPlace .el-dialog__header {
      padding: 1.5rem 1.5rem;
      background: #2C3E50;
  }
  #ProductionPlace .el-dialog__title{
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
  #ProductionPlace .el-dialog__body{
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }
  /* !important */
  #ProductionPlace .footer_button{
    position: absolute;
    margin: 0;
    width: 100%;
    height: 5.8rem;
    left: 0;
    background: #EDF2F8;
    bottom: 0;
  }
  #ProductionPlace .footer_button .el-form-item__content{
      margin-left:0 !important;
      min-height: 5.8rem;
      text-align: center;
  }
  #ProductionPlace .footer_button .div_P{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: .3rem;
  }
  #ProductionPlace .div_P div{
    color: #9C9C9C;
    font-size: 14px;
  }
  #ProductionPlace .footer_button .el-button{
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2C3E50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
  #ProductionPlace .footer_button .el-button:hover{
    border: 1px solid #3b5168;
    background: #3b5168;
  }
  #ProductionPlace .header_button {
    width: 86px;
    background: #2C3E50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #ProductionPlace .header_button:hover{
    border: 1px solid transparent;
  }
  #ProductionPlace .header_button_a{
    width: 86px;
    background: #47A136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #ProductionPlace .header_button_a:hover{
    border: 1px solid transparent;
  }
  #ProductionPlace .el-card__header {
    padding: 0 20px;
    line-height: 3rem;
  }
  #ProductionPlace .button_list{
    float: right;
  }
  #ProductionPlace .button_list button{
    background-color: #92CC8F;
    border-color: #92CC8F;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #ProductionPlace .button_list button:last-child{
    background-color: #E74C3C;
    border-color: #E74C3C;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }
  #ProductionPlace .uploadImages_div{
    position: absolute;
    width: 9rem;
    margin: 0;
    right: 14%;
    top: 5%;
    text-align: center;
  }
  #ProductionPlace .uploadImages_div .el-form-item__content{
    margin-left:0px !important
  }
  #ProductionPlace .upload{
    width: 100%;
    position: relative;
    height: 8rem;
    text-align: center;
    font-size: 45px;
    line-height: 8rem;
    background: #ccc;
  }
  #ProductionPlace .change{
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 8rem;
    background: #ccc;
    position: absolute;
  }
  #ProductionPlace .ql-editor {
      height: 5rem;
  }


@media screen and (min-width: 1200px) and (max-width: 1680px){
  #ProductionPlace .m-lg-1{
    width: 8.33%;
  }
  #ProductionPlace .m-lg-2{
    width: 16.66%;
  }
  #ProductionPlace .m-lg-3{
    width: 25%;
  }
  #ProductionPlace .m-lg-4{
    width: 33.33%;
  }
  #ProductionPlace .m-lg-5{
    width: 41.66%;
  }
  #ProductionPlace .m-lg-6{
    width: 49.98%;
  }
  #ProductionPlace .m-lg-7{
    width: 58.31%;
  }
  #ProductionPlace .m-lg-8{
    width: 66.64%;
  }
  #ProductionPlace .m-lg-9{
    width: 74.97%;
  }
  #ProductionPlace .m-lg-10{
    width: 83.30%;
  }
  #ProductionPlace .m-lg-11{
    width: 91.63%;
  }
  #ProductionPlace .m-lg-12{
    width: 100%;
  }
  #ProductionPlace .el-dialog--small {
      width: 46%;
  }
  #ProductionPlace .select_top .el-input {
      width: 70%;
  }
}
</style>
