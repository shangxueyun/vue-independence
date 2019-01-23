<template>
    <div id="MyBusiness" v-loading="P_adds">
      <el-row>
        <el-card class="box-card" style="padding-top:0.5rem">
          <el-form :model="form" label-width="120px">
            <el-form-item label="企业名称：" style="width:35%;">
              <el-input :disabled="disabledS" @focus="dataS_dis=false;" v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="统一社会代码：" style="width:35%;">
              <el-input disabled v-model="form.code"></el-input>
            </el-form-item>
            <el-form-item label="注册地址：" style="width:35%;">
              <el-input :disabled="disabledS" v-model="search1" @focus="dataS_dis1=true;dataS_dis=false;" @blur="verify()" @keydown="displays2 = false;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis1">
                  <div v-for="items in tables1" @click="product_type1(items)">
                      <span v-show="display22" style="margin-left: 10px" v-html="format1(items.catgName)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-form-item label="经营地址:" style="width:35%;">
              <el-input :disabled="disabledS" v-model="search" @focus="dataS_dis=true;dataS_dis1=false;" @blur="verify1()" @keydown="displays1 = false;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis">
                  <div v-for="items in tables" @click="product_type(items)">
                      <span v-show="display11" style="margin-left: 10px" v-html="format(items.catgName)"></span>
                  </div>
              </div>
            </el-form-item>
            <el-form-item label="法定代表人：" style="width:35%;">
              <el-input :disabled="disabledS" @focus="dataS_dis=false;" v-model="form.corporate"></el-input>
            </el-form-item>
            <el-form-item label="联系人：" style="width:35%;">
              <el-input :disabled="disabledS" @focus="dataS_dis=false;" v-model="form.contacts"></el-input>
            </el-form-item>
            <el-form-item label="联系电话：" style="width:35%;">
              <el-input :disabled="disabledS" @focus="dataS_dis=false;" v-model="form.tel"></el-input>
            </el-form-item>
            <el-form-item label="企业类型:" style="width:35%;">
              <el-input :disabled="disabledS" v-model="form.companyType"></el-input>
            </el-form-item>
            <el-form-item label="经营领域:" style="width: 50%;">
              <el-checkbox-group :disabled="disabledS" v-model="form.scope">
                <el-checkbox :disabled="disabledS" label="种养殖"></el-checkbox>                            
                <el-checkbox :disabled="disabledS" label="生产加工"></el-checkbox>                            
                <el-checkbox :disabled="disabledS" label="批发"></el-checkbox>                            
                <el-checkbox :disabled="disabledS" label="菜场"></el-checkbox>                            
                <el-checkbox :disabled="disabledS" label="超市"></el-checkbox> 
                <el-checkbox :disabled="disabledS" style="margin-left: 0px" label="团体采购"></el-checkbox> 
                <el-checkbox :disabled="disabledS" label="配送企业"></el-checkbox> 
                <el-checkbox :disabled="disabledS" label="零售终端"></el-checkbox> 
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="主营业务" style="width:35%;">
              <el-input :disabled="disabledS" @focus="dataS_dis=false;" v-model="form.mainBusiness"></el-input>
            </el-form-item>
            <el-form-item label="企业简介:" style="width:35%;">
                <el-input :disabled="disabledS" @focus="dataS_dis=false;" type="textarea" v-model="form.companyProfiles" placeholder="请输入企业简介..." ></el-input>
            </el-form-item>
            <el-form-item label="授权有效期：" style="width:35%;">
              <el-date-picker :disabled="disabledS" @focus="dataS_dis=false;" v-model="form.validTime" type="datetime" format="yyyy-MM-dd hh:mm" placeholder="选择日期时间"></el-date-picker><span><a href="">立即缴费</a></span>
            </el-form-item>
            <el-form-item label="企业节点码：" style="width:35%;">
              <el-input disabled v-model="form.companyCode"></el-input>
            </el-form-item>
            <el-form-item label="中信节点码：" style="width:35%;">
              <el-input disabled @focus="dataS_dis=false;" v-model="form.cesgroupCode"></el-input>
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
              </div>
              <el-button @click="MyBusiness_Edit()" :disabled="disabledS">修改/提交</el-button>
            </el-form-item>
            <el-form-item class="uploadImages_div" :disabled="disabledS">
              <div class="upload logo">
                <img :src="form.logo" alt="" style="width:100%;height:100%;border-radius: 1rem;">
                <input :disabled="disabledS" class="change" @change="update($event,'logo')" type="file" accept="image/png,image/gif,image/jpeg" multiple="multiple" />
              </div>
              logo
            </el-form-item>
            <el-form-item class="uploadImages_div Business_License" :disabled="disabledS">
              <div class="upload license">
                <img :src="form.license" alt="" style="width:100%;height:100%;border-radius: 1rem;">
                <input :disabled="disabledS" class="change" @change="update($event,'license')" type="file" accept="image/png,image/gif,image/jpeg" multiple="multiple" />
              </div>
              营业执照
            </el-form-item>
          </el-form>
        </el-card>
      </el-row>
    </div>
</template>

<script>
import api from "../../api/api.js";
import sys_area_info from '../../assets/js/sys_area_info.json'
  export default {
    data() {
      return {
          areas:sys_area_info.RECORDS,
          PagesNumber:10,
          Times_search:[new Date(),new Date()],
          footer_Num:'85',
          pageNum:'1', 
          dialogVisible: false,
          dialogVisible1: false,
          logoImgsDiv:true,
          logoImgsDiv1:false,
          Business_License:true,
          Business_License1:false,
          P_adds:false,
          logoSrcUrl:'',
          Business_LicenseUrl:'',
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
          disabledS:false,
          form: {
            name:'',
            code:'',
            registeredAddress:'',
            registeredAddressCode:'',
            businessAddress:'',
            businessAddressCode:'',
            corporate:'某某',
            contacts:'',
            tel:'',
            companyType:'',
            mainBusiness:'',
            scope:[],
            companyProfiles:'',
            validTime:'',
            companyCode:'',
            cesgroupCode:'',
            logo:'',
            license:'',
          },
          roleControl:{
            EditRole:true,
            searchRole:true,
          },
      };
    },
    watch: {
        'form.logo': function(newVal){
            this.form.logo = "";
            this.form.logo = newVal;
        },
        'form.license': function(newVal){
            this.form.license = "";
            this.form.license = newVal;
        }
    },
    created() {
        let allRoles = JSON.parse(sessionStorage.getItem('newRoutes')),name = "我的企业";
        allRoles.forEach((v,i)=>{
          v.children.forEach((v1,i1)=>{
              if(v1.permissionName==name){
                let Vchildren = v1.children;
                Vchildren.forEach((v2,i2)=>{
                  switch (v2.permissionName) {
                    case '我的企业查询':
                          this.roleControl.searchRole = false;
                          break;
                    case '我的企业修改':
                          this.roleControl.EditRole = false;
                          break;
                  }
                });
              }
          });
        });
    },
    computed: {
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
      this.form.validity = new Date();
      this.tableData1 = this.areas;
      this.tableData2 = this.areas;
      if(this.roleControl.EditRole){
        this.disabledS = true
      }
      else{
        this.BusinessAdministration_selectByCode({id:JSON.parse(sessionStorage.getItem('companyId'))});        
      }

    },
    methods: {
      open(){
        this.$alert('sss', '新增', {
          confirmButtonText: '确定',
          callback: action => {
            this.$message({
              type: 'info',
              message: `action: ${ action }`
            });
          }
        });
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      //页码功能
      handleSizeChange(done){
        this.pageNum = done;
      },
      product_type(e){
          this.dataS_dis = false;
          this.search = ""
          this.search = e.catgName;
          this.form.businessAddress = e.catgName;
          this.form.businessAddressCode = e.id;
      },
      verify(e){
        //地址数据
        this.search = this.search;
        this.form.businessAddress = this.search;
        let str = this.search,flg;
        if(this.search == ""){
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
          this.form.registeredAddress = e.catgName;
          this.form.registeredAddressCode = e.id;
      },
      verify1(e){
        //地址数据
        this.search1 = this.search1;
        this.form.registeredAddress = this.search1;
        let str = this.search1,flg;
        if(this.search1 == ""){
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
      format1 (val) {
        
        if (val.indexOf(this.search1) !== -1 && this.search1 !== '') {
          return val.replace(this.search1, '<span style="color:red">' + this.search1 + '</span>')
        } else {
          return val
        }
      },
      onEditorBlur(){

      },
      update (e,logoSrcUrl) {  // 上传照片-demo
        this.FormDatas = new FormData();
        let file = e.target.files[0]
        window.events = e
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
      BusinessAdministration_selectByCode(params){
        this.P_adds = true;
        api.BusinessAdministration_selectByCode(params).then(res => {
            if (res.status == 200) {
                this.form = res
                this.form.scope = this.form.scope.split(",")
                this.search1 = this.form.registeredAddress
                this.search = this.form.businessAddress
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
      MyBusiness_Edit(){
          let _this = this,objstring = "",obj ={},s = _this.form.validTime;
          _this.form.validTime = s.substr(0,s.lastIndexOf(".")).replace("T"," ");
          _this.form.scope = _this.form.scope.toLocaleString()
          for(var i in _this.form){
            if(i=='createTime' || i=='createUser' || i=='updateTime' || i=='updateUser'){}else{
              objstring +="&"+i+"="+_this.form[i];
            }
          }
          debugger
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
                  this.BusinessAdministration_selectByCode({id:JSON.parse(sessionStorage.getItem('companyId'))})  
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
    },
  }

</script>
<style>
  /* !important */

  #MyBusiness .footer_button .el-form-item__content{
      margin-left:0 !important;
      min-height: 2rem;
      text-align: center;
  }
  #MyBusiness .footer_button .div_P{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: .3rem;
  }
  #MyBusiness .div_P div{
    color: #9C9C9C;
    font-size: 14px;
  }
  #MyBusiness .footer_button .el-button{
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2C3E50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
  #MyBusiness .footer_button .el-button:hover{
    border: 1px solid #3b5168;
    background: #3b5168;
  }
  #MyBusiness .uploadImages_div{
    position: absolute;
    width: 12rem;
    margin: 0;
    right: 26%;
    top: 6%;
    text-align: center;
  }
  #MyBusiness .uploadImages_div .el-form-item__content{
    margin-left:0px !important
  }
  #MyBusiness .upload{
    width: 100%;
    position: relative;
    height: 12rem;
    text-align: center;
    font-size: 45px;
    line-height: 12rem;
    background: rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
  }
  #MyBusiness .logo{
    background: transparent;
  }
  #MyBusiness .license{
    background: transparent;
  }
  #MyBusiness .change{
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 12rem;
    background: #ccc;
    position: absolute;
  }
  #MyBusiness .el-date-editor.el-input {
      width: -webkit-fill-available;
  }
  #MyBusiness .Business_License{
    top: 28%;
  }
  #MyBusiness .dataS{
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
  #MyBusiness .dataS div{
      display: block;
      width: 100%;
      height: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      border-bottom: 1px solid #ccc;
  }
</style>
