<template>
	<div id="MaterialManagement" v-loading="P_adds">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="padding:1.5rem">
          <el-col :md="10" :lg="9" :span="6" style="">
            <el-input class="m-lg-7" style="width:64%" placeholder="请输入商品名称"></el-input>
            <el-button size="medium" class="mr m-lg-4 header_button" :disabled="roleControl.searchRole"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="10" :lg="9" :span="6">
            <el-input class="m-lg-7" style="width:64%" placeholder="请输入编码"></el-input>
            <el-button size="medium" class="mr m-lg-4 header_button"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="4" :lg="6" :span="4">
            <el-button style="float: right;" size="medium" class="mr header_button_a" @click="add()" :disabled="roleControl.addRole"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #F4F4F4;width:100%;margin-top: 1.5rem;"> 
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">图片</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">物料名称</th>
                        <th colspan="1" style="text-align:center;width:11%" rowspan="1">属性</th>
                        <th colspan="1" style="text-align:center;width:11%" rowspan="1">类型</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">标准名称</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">计量单位</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">产品规格</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">状态</th>
                        <th colspan="1" style="text-align:center;width:7%" rowspan="1">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="items in tableData">
                        <td><div class="cell" style="width: 6rem;height: 3.2rem;margin-left: 27%;">
                          <img :src="items.images" style="width: 100%;height: 100%;"></div></td>
                        <td><div class="cell">{{ items.materialName  }}</div></td>
                        <td><div class="cell">{{ items.materialType  }}</div></td>
                        <td><div class="cell">{{ items.categoryName }}</div></td>
                        <td><div class="cell">{{ items.nationName }}</div></td>
                        <td><div class="cell">{{ items.unitName }}</div></td>
                        <td><div class="cell">{{ items.standardName }}</div></td>
                        <td><div class="cell">{{ items.enable }}</div></td> 
                        <td><div class="cell">
                          <button class="List_button_cz"  :idvalue="items.id" :disabled="roleControl.EditRole" @click="Edit($event)"><i :idvalue="items.id"  class="el-icon-edit"></i></button>
                          <button class="List_button_cz"  :idvalue="items.id" :disabled="roleControl.DeleteRole" @click="Delete($event)"><i :idvalue="items.id"  class="el-icon-delete"></i></button>
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
          title="新增物料"
          :visible.sync="dialogVisible"
          width="100%"
          :before-close="handleClose">
          <el-form :model="form" label-width="80px">
            <el-form-item label="名称:" style="width:50%;">
              <el-input v-model="form.materialName"></el-input>
            </el-form-item>
            <el-form-item label="属性:" style="width:50%;">
              <el-radio-group @change="radioSC" v-model="form.materialType">
                <el-radio v-model="form.materialType" :label="2">商品</el-radio>
                <el-radio v-model="form.materialType" :label="1">原料</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="类型:" class="dataS_dis_value" style="width:50%;">
              <el-input v-model="search" @focus="dataS_dis=true;dataS_dis1=false;dataS_dis2=false;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis">
                <div v-for="items in tables" @click="product_type(items)">
                  <span v-show="display11" style="margin-left: 10px" v-html="format(items.categoryName)"></span>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="国标名称:" class="dataS_dis_value" style="width:50%;">
              <el-input v-model="search1" @focus="dataS_dis=false;dataS_dis1=true;dataS_dis2=false;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis1">
                <div v-for="items in tables1" @click="product_type1(items)">
                  <span style="margin-left: 10px" v-html="format1(items.mc_gb)"></span>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="国标编码:" class="dataS_dis_value" style="width:50%;">
              <el-input v-model="search2" @focus="dataS_dis=false;dataS_dis1=false;dataS_dis2=true;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis2">
                <div v-for="items in tables1" @click="product_type2(items)">
                  <span style="margin-left: 10px" v-html="format2(items.dm_gb)"></span>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="计量单位:" style="width:50%;">
              <el-select style="width:100%;" @change="unitsChange" v-model="form.unitId" placeholder="请选择类型">
                <el-option 
                  v-for="item2 in units" 
                  :key="item2.id"
                  :label="item2.unitName"
                  :value="item2.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品规格:" style="width:50%;">
              <el-select style="width:100%;" @change="standardsChange" v-model="form.standardId" placeholder="请选择类型">
                <el-option 
                  v-for="item2 in standards" 
                  :key="item2.id"
                  :label="item2.standardName"
                  :value="item2.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="slider" style="width:50%;">
              <span>是否强制输入检验检疫证号:</span>
              <el-switch
                v-model="form.isImportQuarantine"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item class="slider" style="width:50%;">
              <span>是否强制检验检疫报告上传:</span>
              <el-switch
                v-model="form.isUploadQuarantine"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item class="uploadImages_div">
              <div class="upload logo">
                <img :src="logoSrcUrl" alt="" style="width:100%;height:100%;border-radius: 1rem;">
                <input class="change" @change="update($event,'logoSrcUrl','logoImgsDiv','logoImgsDiv1')" type="file" accept="image/png,image/gif,image/jpeg" multiple="multiple" />
              </div>
              产品图片
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="MaterialManagement_adds()" >确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        
        <el-dialog
          v-loading="P_adds"
          title="修改物料信息"
          :visible.sync="dialogVisible1"
          width="100%"
          :before-close="handleClose">
          <el-form :model="form" label-width="80px">
            <el-form-item label="名称:" style="width:50%;">
              <el-input v-model="form.materialName"></el-input>
            </el-form-item>
            <el-form-item label="属性:" style="width:50%;">
              <el-radio-group @change="radioSC" v-model="form.materialType">
                <el-radio v-model="form.materialType" :label="2">商品</el-radio>
                <el-radio v-model="form.materialType" :label="1">原料</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="类型:" class="dataS_dis_value" style="width:50%;">
              <el-input v-model="search" @focus="dataS_dis=true;dataS_dis1=false;dataS_dis2=false;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis">
                <div v-for="items in tables" @click="product_type(items)">
                  <span v-show="display11" style="margin-left: 10px" v-html="format(items.categoryName)"></span>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="国标名称:" class="dataS_dis_value" style="width:50%;">
              <el-input v-model="search1" @focus="dataS_dis=false;dataS_dis1=true;dataS_dis2=false;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis1">
                <div v-for="items in tables1" @click="product_type1(items)">
                  <span style="margin-left: 10px" v-html="format1(items.mc_gb)"></span>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="国标编码:" class="dataS_dis_value" style="width:50%;">
              <el-input v-model="search2" @focus="dataS_dis=false;dataS_dis1=false;dataS_dis2=true;" placeholder="请输入内容"></el-input>
              <div class="dataS" v-show="dataS_dis2">
                <div v-for="items in tables1" @click="product_type2(items)">
                  <span style="margin-left: 10px" v-html="format2(items.dm_gb)"></span>
                </div>
              </div>
            </el-form-item>
            <el-form-item label="计量单位:" style="width:50%;">
              <el-select style="width:100%;" @change="unitsChange" v-model="form.unitId" placeholder="请选择类型">
                <el-option 
                  v-for="item2 in units" 
                  :key="item2.id"
                  :label="item2.unitName"
                  :value="item2.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产品规格:" style="width:50%;">
              <el-select style="width:100%;" @change="standardsChange" v-model="form.standardId" placeholder="请选择类型">
                <el-option 
                  v-for="item2 in standards" 
                  :key="item2.id"
                  :label="item2.standardName"
                  :value="item2.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item class="slider" style="width:50%;">
              <span>是否强制输入检验检疫证号:</span>
              <el-switch
                v-model="form.isImportQuarantine"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item class="slider" style="width:50%;">
              <span>是否强制检验检疫报告上传:</span>
              <el-switch
                v-model="form.isUploadQuarantine"
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </el-form-item>
            <el-form-item class="uploadImages_div">
              <div class="upload logo">
                <img :src="logoSrcUrl" alt="" style="width:100%;height:100%;border-radius: 1rem;">
                <input class="change" @change="update($event,'logoSrcUrl','logoImgsDiv','logoImgsDiv1')" type="file" accept="image/png,image/gif,image/jpeg" multiple="multiple" />
              </div>
              产品图片
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="MaterialManagement_Edits()" >确认提交</el-button>
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
          tableData: [],
          operator:"操作员：" + JSON.parse(sessionStorage.getItem('user')).username + "/操作时间：" + this.Date_day(),
          footer_Num:'',
          pageNum:'',
          dialogVisible: false,
          dialogVisible1: false,
          P_adds:false,
          usermod_c:false,
          Userdispaly:false,
          logoImgsDiv:true,
          logoImgsDiv1:false,
          logoSrcUrl:'',
          //
          search:'',
          search1:'',
          search2:'',
          tableData1:[],
          tableData2:[],
          dataS_dis:false,
          dataS_dis1:false,
          dataS_dis2:false,
          displays1:true,
          displays2:true,
          display11:true,
          display22:true,
          form:{
            materialName:'',
            materialType:'',
            categoryId:'',
            categoryName:'',
            unitId:'',
            unitName:'',
            standardId:'',
            standardName:'',
            nationName:'',
            nationCode:'',
            images:'',
            isImportQuarantine:false,
            isUploadQuarantine:false,
          },
          companyId:"",
          PagesNumber:10,
          unitNames:'',
          standardNames:'',
          Edit_value:true,
          units:[],
          standards:[],
          roleControl:{
            addRole:true,
            EditRole:true,
            DeleteRole:true,
            searchRole:true,
          },
      };
    },
    created() {
        let allRoles = JSON.parse(sessionStorage.getItem('newRoutes')),name = "物料管理";
        allRoles.forEach((v,i)=>{
          v.children.forEach((v1,i1)=>{
              if(v1.permissionName==name){
                let Vchildren = v1.children;
                Vchildren.forEach((v2,i2)=>{
                  switch (v2.permissionName) {
                    case '物料管理添加':
                          this.roleControl.addRole = false;
                          break;
                    case '物料管理修改':
                          this.roleControl.EditRole = false;
                          break;
                    case '物料管理删除':
                          this.roleControl.DeleteRole = false;
                          break;
                    case '物料管理查询':
                          this.roleControl.searchRole = false;
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
        tables2 () {
          const search2 = this.search2
          if (search2) {
              return this.tableData2.filter(dataNews => {
              return Object.keys(dataNews).some(key => {
                  return String(dataNews[key]).toLowerCase().indexOf(search2) > -1
              })
              })
          }
          return this.tableData2
        },
    },
    mounted() {
        let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
        this.pageNum = params.pageNum;
        this.MaterialManagement_info(params) 
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
      //类别
      product_type(e){
          this.dataS_dis = false;
          this.search = ""
          this.search = e.categoryName;
          this.form.categoryName = e.categoryName;
          this.form.categoryId = e.id;
      },
      format (val) {
        if (val.indexOf(this.search) !== -1 && this.search !== '') {
          return val.replace(this.search, '<span style="color:red">' + this.search + '</span>')
        } else {
          return val
        }
      },
      //国标名称
      product_type1(e){
          this.dataS_dis1 = false;
          this.search1 = ""
          this.search1 = e.mc_gb;
          this.logoSrcUrl = '';
          this.logoSrcUrl = e.image
          this.form.images = e.image;
          this.form.nationName = e.mc_gb;
      },
      format1 (val) {
        if (val.indexOf(this.search1) !== -1 && this.search1 !== '') {
          return val.replace(this.search1, '<span style="color:red">' + this.search1 + '</span>')
        } else {
          return val
        }
      },
      //国标编码
      product_type2(e){
          this.dataS_dis2 = false;
          this.search2 = ""
          this.search2 = e.dm_gb;
          this.form.nationCode = e.dm_gb;
      },
      format2 (val) {
        if (val.indexOf(this.search2) !== -1 && this.search2 !== '') {
          return val.replace(this.search2, '<span style="color:red">' + this.search2 + '</span>')
        } else {
          return val
        }
      },
      unitsChange(vId){
        let obj = {};
        obj = this.units.find((item)=>{
            if(item.id === vId)
            return item.id === vId;
        });
        this.form.unitId = obj.id// 计量单位 
        this.form.unitName = obj.unitName// 计量单位 
      },
      standardsChange(vId){
        let obj = {};
        obj = this.standards.find((item)=>{
            if(item.id === vId)
            return item.id === vId;
        });
        this.form.standardId = obj.id// 规格 
        this.form.standardName = obj.standardName// 规格 
      },
      radioSC(id){
        let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),categoryType:id}
        this.pageNum = params.pageNum;
        this.P_adds = true;
        api.CategoryManagement_info(params).then(res => {
            if (res.status == 200) {
                this.tableData1 = res.data
                this.P_adds = false;
            } else if(res.status == 500){
                  this.$message.error("服务器忙！");
            }else{
                if(res.msg== undefined || res.msg == "")
                this.$message.error("服务器忙！");
                else
                this.$message.error(res.msg);
            }
        });
      },
      update (e,logoSrcUrl,params,params1) {  // 上传照片-demo
        this.FormDatas = new FormData();
        let file = e.target.files[0]
        this.FormDatas.append("multipartFile",file)
        this.FormDatas.append("multipartFile","multipartFile");
        this.P_adds = true
        api.CommonUpload_uploadImages(this.FormDatas).then(res => {
              if (res.status == 200) {
                  this.FormDatas.delete("multipartFile")
                  this.P_adds = false;
                  this[params] = false
                  this[params1] = true;
                  this[logoSrcUrl] = ''
                  this[logoSrcUrl] = res.data
                  this.form.images = ""
                  this.form.images = res.data
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
      switchString(str,flg){
        if(flg){
          switch (str) {
            case 1:
                  return "原料"
                  break;
            case 2:
                  return "商品"
                  break;
            case "原料":
                  return 1
                  break;
            case "商品":
                  return 2
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
      handleSizeChange(done){
        let params = {pageNum:done.toString(),pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
        this.pageNum = done.toString();
        this.MaterialManagement_info(params)
      },
      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            let forms = this.form;
            for(var i in forms){
              forms[i] = "";
            }
            this.form = forms
            let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
            this.pageNum = params.pageNum;
            this.MaterialManagement_info(params) 
            done();
          })
          .catch(_ => {});
      },
      MaterialManagement_info(params){
        this.P_adds = true;
        api.MaterialManagement_info(params).then(res => {
            if (res.status == 200) {
                this.footer_Num = Number(res.total)
                this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
                res.data.forEach((v,i)=>{for(var j in v){
                  if(j == "materialType"){
                    v[j] = this.switchString(v[j],true)
                  }
                  if(j == "enable"){
                    v[j] = this.switchString(v[j])
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
      MaterialManagement_adds(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.form){
            obj[i] = _this.form[i];
            objstring +="&"+i+"="+_this.form[i];
          }
        
          this.P_adds = true;
          obj.companyId = JSON.parse(sessionStorage.getItem('companyId'))
          //新增
          api.MaterialManagement_adds(obj).then(res => {

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
                  this.MaterialManagement_info(params) 
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
      MaterialManagement_Edits(){
          let _this = this,objstring = "",obj ={};
          for(var i in _this.form){
            if(
              i=='createTime' || 
              i=='createUser' || 
              i=='updateTime' || 
              i=='updateUser' 
            ){}else{
              obj[i] = _this.form[i];
              objstring +="&"+i+"="+_this.form[i];
            }
              
          }
          
          this.P_adds = true;
          obj.companyId = JSON.parse(sessionStorage.getItem('companyId'))
          //修改
          api.MaterialManagement_Edits(obj).then(res => {
              if (res.status == 200) {
                 this.P_adds = false;
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
                  this.MaterialManagement_info(params) 
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
      Calss_Infos(id){
          this.P_adds = true;
          let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId')),categoryType:id};
          //类别
          api.CategoryManagement_info(params).then(res => {

              if (res.status == 200) {
                  this.tableData1 = res.data
                  this.P_adds = false;
                  this.P_adds = true;
                  let params = {pageSize:999999}
                  //国标商品
                  api.QVRCommodity_info(params).then(res => {

                      if (res.status == 200) {
                          this.tableData2 = res.data
                          this.P_adds = false;
                          this.P_adds = true;

                          let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                          api.UnitofMeasurement_info(params).then(res => {

                            if (res.status == 200) {
                              debugger
                                this.units = res.data 
                                let unit = this.units[0];
                                if(!this.Edit_value){
                                  this.form.unitId = unit.id// 计量单位 默认参数
                                  this.form.unitName = unit.unitName// 计量单位 默认参数
                                }
                                this.P_adds = false;
                            
                                let params = {pageNum:'1',pageSize:'12',companyId:JSON.parse(sessionStorage.getItem('companyId'))}
                                api.ProductStandard_info(params).then(res => {

                                  if (res.status == 200) {
                                      this.standards = res.data
                                      let standard = this.standards[0]
                                      if(!this.Edit_value){
                                        this.form.standardId = standard.id// 规格 默认参数
                                        this.form.standardName = standard.standardName// 规格 默认参数                                        
                                      }
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
      add(){
          let forms = this.form;
          for(var i in forms){
            forms[i] = "";
          }
          this.form = forms
          this.Edit_value =false
          this.dialogVisible = true
          this.search = "";
          this.search1 = "";
          this.search2 = "";
          this.logoSrcUrl = "";
          this.form.isImportQuarantine = false
          this.form.isUploadQuarantine = false
          this.Calss_Infos();
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
          //变量接收对象
          //清空重置
          formData = obj;
          let forms = this.form;
          for(var i in forms){
            forms[i] = "";
          }
          this.form = forms
          this.Edit_value =true
          //循环赋值
          for(var i in formData){
            if(i == "createTime" 
            || i == "createUser" 
            ||i == "updateTime" 
            ||i == "companyId"
            ||i == "updateUser"
            ||i == "id"){}else{
              this.form[i] = formData[i]              
            }
          }
          //清除字符串
          this.form['materialType'] = this.switchString(this.form['materialType'],true)
          this.form['enable'] = this.switchString(this.form['enable'])
          this.dialogVisible1 = true;
          this.form.id = Number(userId);
          debugger
          this.search = this.form.categoryName;
          this.search1 = this.form.nationName;
          this.search2 = this.form.nationCode;
          this.logoSrcUrl = this.form.images;
          this.Calss_Infos(Number(userId));
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
                      this.P_adds = true;
                      debugger
                        api.MaterialManagement_Delete({id: Number(userId)}).then(res => {

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
                                this.MaterialManagement_info(params) 
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
   #MaterialManagement .el-dialog--small{
        width: 45%;
   }
      /* 分页 */
   #MaterialManagement .block{
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
    #MaterialManagement .List_button_cz{
    background: #92CC8F;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
   }
   #MaterialManagement .cell .delete{
     background: #E74C3C
   }
   #MaterialManagement .cell .document{
     background: #70C8CB
   }
  #MaterialManagement .cell .circle{
     background: #EF948B
   }
  #MaterialManagement .cell .message{
     background: #E74C3C
   }
   #MaterialManagement .List_button_cz{
    background: #92CC8F;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
   }
   #MaterialManagement .cell .List_button_cz:last-child{
     background: #E74C3C
   }
   #MaterialManagement .block .el-pagination{
     padding-left: 1rem;
   }
   #MaterialManagement .container_padding th{
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
   }
   #MaterialManagement .container_padding th:first-child{
     border-left: 0;
   }
   #MaterialManagement .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }
   #MaterialManagement .container_padding td:first-child{
     padding-left: 1px;
   }
   #MaterialManagement .container_padding tr:nth-child(2n+1){
     background: #F9F9F9
   }
  #MaterialManagement .container_padding tr:nth-child(2n+1) td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }

  #MaterialManagement .select_top{
    position: relative;
    width: 100%;
    float: left;
    padding-top: 2rem;
  }
  #MaterialManagement .select_top span{
    display: block;
    float: left;
    line-height: 2rem;
    margin-right: 0.8rem;
  }
  #MaterialManagement .select_top .el-input{
    width: 48%;
    line-height: 1.8rem;
    border-radius: .2rem;
    outline: 0;
  }
  #MaterialManagement .box-card::-webkit-scrollbar {
      width: 0px;
  }
  #MaterialManagement .box-card th{
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    font-weight: 400;
  }
  #MaterialManagement .box-card th:first-child{
    border-left: 0;
  }
  #MaterialManagement .box-card td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
  }
  #MaterialManagement .box-card td:first-child{
    padding-left: 1px;
  }
  #MaterialManagement .box-card .button_div{
    padding: .5rem;
  }
  #MaterialManagement .el-date-editor.el-input {
      width: 100%;
  }
  #MaterialManagement .text th{
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }
  .dataS_dis_value{
    position: relative;
  }

  #MaterialManagement .dataS_dis_value .dataS{
    position: absolute;
    width: 100%;
      background: #fff;
      height: 6rem;
      line-height: 2.5rem;
      border: 1px solid #ccc;
      border-top: 0;
      z-index: 1111111;
      overflow-y: scroll;
  }
  #MaterialManagement .dataS_dis_value .dataS span{
      display: block;
      width: 88%;
      height: 2.5rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
  }
  #MaterialManagement .dataS_dis_value .dataS>div{
    border-bottom: 1px solid #ccc;
  }
  
  #MaterialManagement .el-dialog__header {
      padding: 1.5rem 1.5rem;
      background: #2C3E50;
  }
  #MaterialManagement .el-dialog__title{
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
  #MaterialManagement .el-dialog__body{
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }
  /* !important */
  #MaterialManagement .footer_button{
    position: absolute;
    margin: 0;
    width: 100%;
    height: 5.8rem;
    left: 0;
    background: #EDF2F8;
    bottom: 0;
  }
  #MaterialManagement .footer_button .el-form-item__content{
      margin-left:0 !important;
      min-height: 5.8rem;
      text-align: center;
  }
  #MaterialManagement .footer_button .div_P{
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: .3rem;
  }
  #MaterialManagement .div_P div{
    color: #9C9C9C;
    font-size: 14px;
  }
  #MaterialManagement .footer_button .el-button{
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2C3E50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }
  #MaterialManagement .footer_button .el-button:hover{
    border: 1px solid #3b5168;
    background: #3b5168;
  }
  #MaterialManagement .header_button {
    width: 86px;
    background: #2C3E50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #MaterialManagement .header_button:hover{
    border: 1px solid transparent;
  }
  #MaterialManagement .header_button_a{
    width: 86px;
    background: #47A136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #MaterialManagement .header_button_a:hover{
    border: 1px solid transparent;
  }
  #MaterialManagement .uploadImages_div{
    position: absolute;
    width: 9rem;
    margin: 0;
    right: 14%;
    top: 10%;
    text-align: center;
  }
  #MaterialManagement .uploadImages_div .el-form-item__content{
    margin-left:0px !important
  }
  #MaterialManagement .upload{
    width: 100%;
    position: relative;
    height: 8rem;
    text-align: center;
    font-size: 45px;
    line-height: 8rem;
    background: #ccc;
  }
  #MaterialManagement .change{
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 8rem;
    background: #ccc;
    position: absolute;
  }
  #MaterialManagement .slider .el-form-item__content{
    margin-left:0px !important
  }


@media screen and (min-width: 1300px) and (max-width: 1680px){
  #MaterialManagement .m-lg-1{
    width: 8.33% !important;
  }
  #MaterialManagement .m-lg-2{
    width: 16.66% !important;
  }
  #MaterialManagement .m-lg-3{
    width: 25% !important;
  }
  #MaterialManagement .m-lg-4{
    width: 33.33% !important;
  }
  #MaterialManagement .m-lg-5{
    width: 41.66% !important;
  }
  #MaterialManagement .m-lg-6{
    width: 49.98% !important;
  }
  #MaterialManagement .m-lg-7{
    width: 58.31% !important;
  }
  #MaterialManagement .m-lg-8{
    width: 66.64% !important;
  }
  #MaterialManagement .m-lg-9{
    width: 74.97% !important;
  }
  #MaterialManagement .m-lg-10{
    width: 83.30% !important;
  }
  #MaterialManagement .m-lg-11{
    width: 91.63% !important;
  }
  #MaterialManagement .m-lg-12{
    width: 100% !important;
  }
  #MaterialManagement .mr {
    margin-left: 0;
  }
}
</style>
