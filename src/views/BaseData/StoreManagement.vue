<template>
  <div id="StoreManagement">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="padding:1.5rem">
          <el-col :md="18" :lg="20" class="m-lg-10" :span="20" style="">
            <el-input style="width:26%" placeholder="请输入门店名称"></el-input>
            <el-button size="medium" class="mr header_button"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="6" :lg="4" class="m-lg-2" :span="4">
            <el-button style="float: right;" size="medium" class="mr header_button_a" @click="add()"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
            <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #F4F4F4;width:100%;margin-top: 1.5rem;">
              <thead>
                <tr>
                  <th colspan="1" style="text-align:center;width:12%" rowspan="1">门店名称</th>
                  <th colspan="1" style="text-align:center;width:12%" rowspan="1">联系人</th>
                  <th colspan="1" style="text-align:center;width:12%" rowspan="1">联系方式</th>
                  <th colspan="1" style="text-align:center;width:12%" rowspan="1">节点码</th>
                  <th colspan="1" style="text-align:center;width:12%" rowspan="1">经营地址</th>
                  <th colspan="1" style="text-align:center;width:12%" rowspan="1">是否直营</th>
                  <th colspan="1" style="text-align:center;width:16%" rowspan="1">状态</th>
                  <th colspan="1" style="text-align:center;width:16%" rowspan="1">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="items in tableData">
                  <td>
                    <div class="cell">{{ items.storeNmae }}</div>
                  </td>
                  <td>
                    <div class="cell">{{ items.contactPerson }}</div>
                  </td>
                  <td>
                    <div class="cell">{{ items.contact }}</div>
                  </td>
                  <td>
                    <div class="cell">{{ items.code }}</div>
                  </td>
                  <td>
                    <div class="cell">{{ items.address }}</div>
                  </td>
                  <td>
                    <div class="cell">{{ items.isDirect==="1"?"是":"否" }}</div>
                  </td>
                  <td>
                    <div class="cell">{{ items.status }}</div>
                  </td>
                  <td>
                    <div class="cell">
                      <button class="List_button_cz" :idvalue="items.id" @click="editShop($event)"><i class="el-icon-edit"></i></button>
                      <button class="List_button_cz delete" :idvalue="items.id" @click="Delete($event)"><i class="el-icon-delete"></i></button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
            <div class="block">
              总共{{ footer_Num }}条记录&nbsp;&nbsp;当前第{{ pageNum }}页
              <el-pagination @current-change="handleSizeChange" layout="prev, pager, next" :total="PagesNumber"
                @prev-click="handleSizeChange" @next-click="handleSizeChange">
              </el-pagination>
            </div>
          </el-col>
        </el-card>
        <el-dialog title="新增门店" :visible.sync="add_Visable" width="30%" :before-close="handleClose">
          <el-form ref="form" :model="form" label-width="124px">
            <el-form-item label="门店全称">
              <el-input v-model="form.tenantName" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="门店简称">
              <el-input v-model="form.tenantName" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="" class="upload uploadImg" v-show="form.businessField ==='酒类'">
              <el-upload class="avatar-uploader" :action="qiniuURL" :show-file-list="false" :on-success="ImgUploadSuccess()"
                :before-upload="beforeUpload" style="text-align:center;height: 102px;width: 102px;line-height: 102px"
                :http-request="imgUPload">
                <img v-if="form.liquorLicense" :src="form.liquorLicense" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div>上传酒类经营许可证</div>
            </el-form-item>
            </li>
            <el-form-item label="" class="upload uploadLinence">
              <el-upload class="avatar-uploader" :action="qiniuURL" :show-file-list="false" :on-success="ImgUploadSuccess()"
                :before-upload="beforeUpload" style="text-align:center;height: 102px;width: 102px;line-height: 102px"
                :http-request="imgUPload1">
                <img v-if="form.shopImage" :src="form.shopImage" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div>上传营业执照</div>
            </el-form-item>
            <el-form-item label="统一社会代码">
              <el-input v-model="form.socialCode" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="门店地址">
              <el-input v-model="form.tenantAddress" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="节点码">
              <el-input v-model="form.socialCode" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="是否直营">
              <el-radio v-model="form.isDirect" label="1">是</el-radio>
              <el-radio v-model="form.isDirect" label="0">否</el-radio>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="form.contact" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input type="number" v-model="form.telphone" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="经营业态">
              <span class="el-dropdown-link">
                <el-radio v-model="form.businessField" label="菜场">菜场</el-radio>
                <el-radio v-model="form.businessField" label="超市">超市</el-radio>
                <el-radio v-model="form.businessField" label="酒类">酒类</el-radio>
              </span>
            </el-form-item>
            <el-form-item label="酒类经营许可证号" v-show="form.businessField ==='酒类'">
              <el-input v-model="form.contact" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="">确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

        <el-dialog title="修改门店" :visible.sync="edit_Visable" width="30%" :before-close="handleClose">
          <el-form ref="form" :model="form" label-width="124px">
            <el-form-item label="门店全称">
              <el-input v-model="form.tenantName" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="门店简称">
              <el-input v-model="form.tenantName" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="" class="upload uploadImg" v-if='form.businessField==="酒类"'>
              <el-upload class="avatar-uploader" :action="qiniuURL" :show-file-list="false" :on-success="ImgUploadSuccess()"
                :before-upload="beforeUpload" style="text-align:center;height: 102px;width: 102px;line-height: 102px"
                :http-request="imgUPload">
                <img v-if="form.liquorLicense" :src="form.liquorLicense" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div>上传酒类经营许可证</div>
            </el-form-item>
            </li>
            <el-form-item label="" class="upload uploadLinence">
              <el-upload class="avatar-uploader" :action="qiniuURL" :show-file-list="false" :on-success="ImgUploadSuccess()"
                :before-upload="beforeUpload" style="text-align:center;height: 102px;width: 102px;line-height: 102px"
                :http-request="imgUPload1">
                <img v-if="form.shopImage" :src="form.shopImage" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div>上传营业执照</div>
            </el-form-item>
            <el-form-item label="统一社会代码">
              <el-input v-model="form.socialCode" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="门店地址">
              <el-input v-model="form.tenantAddress" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="节点码">
              <el-input v-model="form.socialCode" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="是否直营">
              <el-radio v-model="form.isDirect" label="1">是</el-radio>
              <el-radio v-model="form.isDirect" label="0">否</el-radio>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="form.contact" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input type="number" v-model="form.telphone" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="经营业态">
              <span class="el-dropdown-link">
                <el-radio v-model="form.businessField" label="菜场">菜场</el-radio>
                <el-radio v-model="form.businessField" label="超市">超市</el-radio>
                <el-radio v-model="form.businessField" label="酒类">酒类</el-radio>
              </span>
            </el-form-item>
            <el-form-item label="酒类经营许可证号" v-if='form.businessField==="酒类"'>
              <el-input v-model="form.contact" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="">确认提交</el-button>
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
        operator: "操作员：" +
          sessionStorage.getItem("userName") +
          "/操作时间：" +
          this.Date_day(),
        PagesNumber: 10,
        Times_search: [new Date(), new Date()],
        radio: '1',
        footer_Num: "1",
        pageNum: "1",
        tableData: [{
          storeNmae: "欧尚上海长阳路店",
          contactPerson: "张三",
          contact: "021-22222222",
          code: "310105001 ",
          address: "上海市杨浦区长阳路123号",
          isDirect: "1",
          status: "启用"
        }],
        add_Visable: false,
        edit_Visable: false,
        form: {},
        qiniuURL: 'https://upload.qiniup.com',
        form: {
          shopImage: "",
          code: "",
          companyCode: "",
          businessAddress: "",
          isDirect: "",
          shopType: "",
          liquorNo: "",
          liquorLicense: "",
          license: "",
          id: "",
          businessField:""
        }
      };
    },
    created() {},
    computed: {},
    mounted() {
      this.shop_info();
    },
    methods: {
      open() {
        this.$alert("sss", "新增", {
          confirmButtonText: "确定",
          callback: action => {
            this.$message({
              type: "info",
              message: `action: ${action}`
            });
          }
        });
      },
      ImgUploadSuccess() {},
      handleClose(done) {
        this.$confirm("确认关闭？")
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      compile() {
        this.$message({
          showClose: true,
          message: "这是一条消息提示"
        });
      },
      deletes() {
        this.$message({
          showClose: true,
          message: "这是一条消息提示"
        });
      },
      save() {
        this.$confirm("确认保存？")
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      audit() {
        this.$message({
          showClose: true,
          message: "这是一条消息提示"
        });
      },
      Date_day() {
        var date = new Date();
        var now = "";
        now = date.getFullYear() + "-";
        now = now + (date.getMonth() + 1) + "-";
        now = now + date.getDate() + " ";
        now = now + date.getHours() + ":";
        now = now + date.getMinutes() + ":";
        now = now + date.getSeconds() + "";
        return now;
      },
      //页码功能
      handleSizeChange(done) {
        this.pageNum = done;
      },
      add() {
        this.add_Visable = true;
      },
      imgUPload(e) {
        //直接七牛上传
        // var observable = qiniu.upload(file, this.uploadToken)
        // const file = request.file;
        // const keyname  = '1';
        // const formdata = new FormData();
        // formdata.append('file',file);
        // formdata.append('token',this.uploadToken);
        // formdata.append('key',keyname);
        // api.QiniUpload(formdata).then(res=>{
        //   console.log(res)
        // })
        //后台接口上传
        // CommonUpload_uploadImages
        // console.log(e);
        this.FormDatas = new FormData();
        let file = e.file;
        this.FormDatas.append("multipartFile", file);
        this.P_adds = true;
        api.CommonUpload_uploadImages(this.FormDatas).then(res => {
          if (res.status == 200) {
            this.form.liquorLicense = res.data
            console.log(this.form.liquorLicense);

          } else if (res.status == 500) {
            this.P_adds = false;
            this.$message.error("服务器忙！");
          } else {
            this.P_adds = false;
            if (res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
            else this.$message.error(res.msg);
          }
        });


      },
      beforeUpload() {},
      imgUPload1(e) {
        this.FormDatas = new FormData();
        let file = e.file;
        this.FormDatas.append("multipartFile", file);
        this.P_adds = true;
        api.CommonUpload_uploadImages(this.FormDatas).then(res => {
          if (res.status == 200) {
            this.form.shopImage = res.data
            console.log(this.form.shopImage);
          } else if (res.status == 500) {
            this.P_adds = false;
            this.$message.error("服务器忙！");
          } else {
            this.P_adds = false;
            if (res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
            else this.$message.error(res.msg);
          }
        });
      },
      deleteShop(e) {
        let idvalue, obj = {};
        e.path.forEach((v, i) => {
          if (i == 1) {
            let attr = v.attributes;
            for (var i in attr) {
              for (var j in attr[i]) {
                if (j == "name") {
                  if (attr[i].name == "idvalue") {
                    idvalue = attr[i].value
                  }
                }
              }
            }
          }
        });
        if (idvalue) {
          this.$confirm('确认删除？')
            .then(_ => {
              this.P_adds = true;
              api.Shop_del({
                id: idvalue
              }).then(res => {
                if (res.status == 200) {
                  this.P_adds = false;
                  this.$message({
                    message: "删除" + res.msg,
                    type: 'success'
                  });
                  let params = {
                    pageNum: '1',
                    pageSize: '12',
                    companyId: JSON.parse(sessionStorage.getItem('companyId'))
                  }
                  this.pageNum = params.pageNum;
                  this.shop_info(params)
                } else if (res.status == 500) {
                  this.P_adds = false;
                  this.$message.error("服务器忙！");
                } else {
                  this.P_adds = false
                  if (res.msg == undefined || res.msg == "")
                    this.$message.error("服务器忙！");
                  else
                    this.$message.error(res.msg);
                }
              });
            })
            .catch(_ => {});
        }


      },
      editShop(e) {
        let idvalue, obj = {};
        e.path.forEach((v, i) => {
          if (i == 1) {
            let attr = v.attributes;
            for (var i in attr) {
              for (var j in attr[i]) {
                if (j == "name") {
                  if (attr[i].name == "idvalue") {
                    idvalue = attr[i].value
                  }
                }
              }
            }
          }
        });
        console.log(idvalue)
        // api.Shop_ByID({
        //   id: idvalue
        // }).then(res => {
        //   if (res.status == 200) {
        //     this.edit__Visable = true;
        //     console.log(res);
        //     this.footer_Num = Number(res.total)
        //     this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
        //     this.form = res.data;
        //   } else if (res.status == 500) {
        //     // this.Main_loading = false;
        //     this.$message.error("服务器忙！");
        //   } else {
        //     // this.Main_loading = false
        //     if (res.msg == undefined || res.msg == "")
        //       this.$message.error("服务器忙！");
        //     else
        //       this.$message.error(res.msg);
        //   }
        // });
      },
      updateShop() {
        let _this = this,
          objstring = "",
          obj = {};
        for (var i in _this.form) {
          obj[i] = _this.form[i];
          objstring += "&" + i + "=" + _this.form[i];
        }
        obj.companyId = JSON.parse(sessionStorage.getItem('companyId'));
        delete obj.createTime;
        delete obj.updateTime;
        console.log(obj)
        //修改
        api.Shop_update(obj).then(res => {
          if (res.status == 200) {
            _this.$message({
              message: "修改" + res.msg,
              type: 'success'
            });
            let forms = this.form;
            for (var i in forms) {
              forms[i] = "";
            }
            this.form = forms;
            this.edit__Visable = false;
            let params = {
              pageNum: '1',
              pageSize: '12',
              companyId: JSON.parse(sessionStorage.getItem('companyId'))
            };
            this.pageNum = params.pageNum;
            this.shop_info(params);
          } else if (res.status == 500) {
            this.$message.error("服务器忙！");
          } else {
            if (res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
            else
              this.$message.error(res.msg);
          }
        });
      },
      shop_add() {
        let _this = this,
          objstring = "",
          obj = {};
        for (var i in _this.form) {
          obj[i] = _this.form[i];
          objstring += "&" + i + "=" + _this.form[i];
        }
        obj.companyId = JSON.parse(sessionStorage.getItem('companyId'))
        //新增
        api.Shop_update(obj).then(res => {
          if (res.status == 200) {
            _this.$message({
              message: "增加" + res.msg,
              type: 'success'
            });
            let forms = this.form;
            for (var i in forms) {
              forms[i] = "";
            }
            this.form = forms;
            this.add_Visable = false;
            let params = {
              pageNum: '1',
              pageSize: '12',
              companyId: JSON.parse(sessionStorage.getItem('companyId'))
            };
            this.pageNum = params.pageNum;
            this.shop_info(params);
          } else if (res.status == 500) {
            this.$message.error("服务器忙！");
          } else {
            if (res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
            else
              this.$message.error(res.msg);
          }
        });
      },
      shop_info(params) {
        api.BusinessAdministration_info(params).then(res => {
          if (res.status == 200) {
            console.log(res);
            this.footer_Num = Number(res.total)
            this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
            res.data.forEach((v, i) => {
              for (var j in v) {
                if (j == "enable")
                  v[j] = this.switchString(v[j]);
              }
            });
            this.tableData = res.data;
          } else if (res.status == 500) {
            this.Main_loading = false;
            this.$message.error("服务器忙！");
          } else {
            this.Main_loading = false
            if (res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
            else
              this.$message.error(res.msg);
          }
        });
      },
    }
  };
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

  .container_padding {
    margin: 1rem 0;
    padding: 1rem;
    background: #fff;
  }

  .el-row .bj {
    background: transparent;
    padding: 0;
    margin: 0;
  }

  .mr {
    margin-left: 1rem;
  }

  .container_padding select {
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

  .el-card__body {
    padding: 0;
  }

  .el-table--fit {
    padding: 10px 20px 0px 20px;
  }

  #StoreManagement .container_padding th {
    line-height: 3rem;
    background: #eee;
    border-left: 1px solid #ccc;
  }

  #StoreManagement .container_padding th:first-child {
    border-left: 0;
  }

  #StoreManagement .container_padding td {
    text-align: center;
    line-height: 2.5rem;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  #StoreManagement .container_padding td:first-child {
    padding-left: 1px;
  }

  #StoreManagement .block {
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

  #StoreManagement .List_button_cz {
    background: #92cc8f;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }

  #StoreManagement .cell .delete {
    background: #e74c3c;
  }

  #StoreManagement .cell .document {
    background: #70c8cb;
  }

  #StoreManagement .cell .circle {
    background: #ef948b;
  }

  #StoreManagement .cell .message {
    background: #e74c3c;
  }

  #StoreManagement .block .el-pagination {
    padding-left: 1rem;
  }

  #StoreManagement .container_padding th {
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
  }

  #StoreManagement .container_padding th:first-child {
    border-left: 0;
  }

  #StoreManagement .container_padding td {
    text-align: center;
    line-height: 2.5rem;
    border-right: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
  }

  #StoreManagement .container_padding td:first-child {
    padding-left: 1px;
  }

  #StoreManagement .container_padding tr:nth-child(2n + 1) {
    background: #f9f9f9;
  }

  #StoreManagement .container_padding tr:nth-child(2n + 1) td {
    text-align: center;
    line-height: 2.5rem;
    border-right: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
  }

  #StoreManagement .box-card::-webkit-scrollbar {
    width: 0px;
  }

  #StoreManagement .box-card th {
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #f4f4f4;
    font-weight: 400;
  }

  #StoreManagement .box-card th:first-child {
    border-left: 0;
  }

  #StoreManagement .box-card td {
    text-align: center;
    line-height: 2.5rem;
    border-right: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
  }

  #StoreManagement .box-card td:first-child {
    padding-left: 1px;
  }

  #StoreManagement .box-card .button_div {
    padding: 0.5rem;
  }

  #OutboundGoods .el-date-editor.el-input {
    width: 100%;
  }

  #StoreManagement .text th {
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }

  #dataS_dis_value {
    position: relative;
  }

  #StoreManagement #dataS_dis_value .dataS {
    position: fixed;
    width: 25%;
    background: #fff;
    height: 6rem;
    line-height: 2.5rem;
    border: 1px solid #ccc;
    border-top: 0;
    z-index: 1111111;
    overflow-y: scroll;
  }

  #StoreManagement #dataS_dis_value .dataS span {
    display: block;
    width: 88%;
    height: 2.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #StoreManagement #dataS_dis_value .dataS>div {
    border-bottom: 1px solid #ccc;
  }

  #StoreManagement .el-dialog__header {
    padding: 1.5rem 1.5rem;
    background: #2c3e50;
  }

  #StoreManagement .el-dialog__title {
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }

  #StoreManagement .el-dialog__body {
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }

  /* !important */
  #StoreManagement .footer_button {
    position: absolute;
    margin: 0;
    width: 100%;
    height: 5.8rem;
    left: 0;
    background: #edf2f8;
    bottom: 0;
  }

  #StoreManagement .footer_button .el-form-item__content {
    margin-left: 0 !important;
    min-height: 5.8rem;
    text-align: center;
  }

  #StoreManagement .footer_button .div_P {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: 0.3rem;
  }

  #StoreManagement .div_P div {
    color: #9c9c9c;
    font-size: 14px;
  }

  #StoreManagement .footer_button .el-button {
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2c3e50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }

  #StoreManagement .footer_button .el-button:hover {
    border: 1px solid #3b5168;
    background: #3b5168;
  }

  #StoreManagement .header_button {
    width: 86px;
    background: #2c3e50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }

  #StoreManagement .header_button:hover {
    border: 1px solid transparent;
  }

  #StoreManagement .header_button_a {
    width: 86px;
    background: #47a136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }

  #StoreManagement .header_button_a:hover {
    border: 1px solid transparent;
  }

  #StoreManagement .upload {
    position: absolute;
    top: 20px;
    display: inline-block;
  }

  #StoreManagement .uploadImg {
    right: 40px;
  }

  #StoreManagement .uploadLinence {
    right: 160px;
  }

  @media screen and (min-width: 1300px) and (max-width: 1680px) {
    #StoreManagement .m-lg-1 {
      width: 8.33% !important;
    }

    #StoreManagement .m-lg-2 {
      width: 16.66% !important;
    }

    #StoreManagement .m-lg-3 {
      width: 25% !important;
    }

    #StoreManagement .m-lg-4 {
      width: 33.33% !important;
    }

    #StoreManagement .m-lg-5 {
      width: 41.66% !important;
    }

    #StoreManagement .m-lg-6 {
      width: 49.98% !important;
    }

    #StoreManagement .m-lg-7 {
      width: 58.31% !important;
    }

    #StoreManagement .m-lg-8 {
      width: 66.64% !important;
    }

    #StoreManagement .m-lg-9 {
      width: 74.97% !important;
    }

    #StoreManagement .m-lg-10 {
      width: 83.3% !important;
    }

    #StoreManagement .m-lg-11 {
      width: 91.63% !important;
    }

    #StoreManagement .m-lg-12 {
      width: 100% !important;
    }

    #StoreManagement .mr {
      margin-left: 0;
    }
  }
</style>