<template>
  <div id="TentantManagement">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="padding:1.5rem">
          <el-col :md="18" :lg="20" class="m-lg-10" :span="20" style="">
            <el-input style="width:26%" placeholder="请输入商户名称"></el-input>
            <el-button size="medium" class="mr header_button"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="6" :lg="4" class="m-lg-2" :span="4">
            <el-button style="float: right;" size="medium" class="mr header_button_a" @click="add()"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
            <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #F4F4F4;width:100%;margin-top: 1.5rem;">
              <thead>
                <tr>
                  <th colspan="1" style="text-align:center;width:12%" rowspan="1">商户名称</th>
                  <th colspan="1" style="text-align:center;width:12%" rowspan="1">联系人</th>
                  <th colspan="1" style="text-align:center;width:12%" rowspan="1">联系方式</th>
                  <th colspan="1" style="text-align:center;width:12%" rowspan="1">统一社会代码</th>
                  <th colspan="1" style="text-align:center;width:12%" rowspan="1">商户地址</th>
                  <th colspan="1" style="text-align:center;width:12%" rowspan="1">经营业态</th>
                  <th colspan="1" style="text-align:center;width:16%" rowspan="1">状态</th>
                  <th colspan="1" style="text-align:center;width:16%" rowspan="1">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="items in tableData">
                  <td>
                    <div class="cell">{{ items.tenantName }}</div>
                  </td>
                  <td>
                    <div class="cell">{{ items.contact }}</div>
                  </td>
                  <td>
                    <div class="cell">{{ items.telphone }}</div>
                  </td>
                  <td>
                    <div class="cell">{{ items.socialCode }}</div>
                  </td>
                  <td>
                    <div class="cell">{{ items.tenantAddress }}</div>
                  </td>
                  <td>
                    <div class="cell">{{ items.businessField }}</div>
                  </td>
                  <td>
                    <div class="cell">{{ items.status }}</div>
                  </td>
                  <td>
                    <div class="cell">
                      <button class="List_button_cz" :idvalue="items.id" @click="editTenant($event)"><i class="el-icon-edit"></i></button>
                      <button class="List_button_cz delete" :idvalue="items.id" @click="deleteTentant($event)"><i class="el-icon-delete"></i></button>
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
        <el-dialog title="新增商户" :visible.sync="add_Visable" width="30%" :before-close="handleClose">
          <el-form ref="form" :model="form" label-width="100px">
            <el-form-item label="商户全称">
              <el-input v-model="form.tenantName" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="商户简称">
              <el-input v-model="form.tenantNickname" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="" class="upload uploadImg">
              <el-upload class="avatar-uploader" :action="qiniuURL" :show-file-list="false" :on-success="ImgUploadSuccess()"
                :before-upload="beforeUpload" style="text-align:center;height: 102px;width: 102px;line-height: 102px"
                :http-request="imgUPload">
                <img v-if="form.dutyImage" :src="form.dutyImage" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div>上传负责人照片</div>
            </el-form-item>
            </li>
            <el-form-item label="" class="upload uploadLinence">
              <el-upload class="avatar-uploader" :action="qiniuURL" :show-file-list="false" :on-success="ImgUploadSuccess()"
                :before-upload="beforeUpload" style="text-align:center;height: 102px;width: 102px;line-height: 102px"
                :http-request="imgUPload1">
                <img v-if="form.tenantImage" :src="form.tenantImage" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
              <div>上传营业执照</div>
            </el-form-item>
            <el-form-item label="统一社会代码">
              <el-input v-model="form.socialCode" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="商户地址">
              <el-col :span="11">
                <!-- <el-cascader size="large" :options="options" v-model="tenantAddress" @change="handleChange">
                  <el-input></el-input>
                </el-cascader> -->
              </el-col>
              <el-col :span="11">
                <el-input v-model="form.tenantAddress" style="width:100%"></el-input>
              </el-col>
            </el-form-item>
            <el-form-item label="联系人">
              <el-input v-model="form.contact" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="联系电话">
              <el-input type="number" v-model="form.telphone" style="width:40%"></el-input>
            </el-form-item>
            <el-form-item label="经营业态">
              <span class="el-dropdown-link">
                <el-radio v-model="form.businessField" label="1">1</el-radio>
                <el-radio v-model="form.businessField" label="2">2</el-radio>
                <el-radio v-model="form.businessField" label="3">3</el-radio>
              </span>
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="tentant_add">确认提交</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>



        <el-dialog title="编辑商户" :visible.sync="edit__Visable" width="30%" :before-close="handleClose">
            <el-form ref="form" :model="form" label-width="100px">
              <el-form-item label="商户全称">
                <el-input v-model="form.tenantName" style="width:40%"></el-input>
              </el-form-item>
              <el-form-item label="商户简称">
                <el-input v-model="form.tenantNickname" style="width:40%"></el-input>
              </el-form-item>
              <el-form-item label="" class="upload uploadImg">
                <el-upload class="avatar-uploader" :action="qiniuURL" :show-file-list="false" :on-success="ImgUploadSuccess()"
                  :before-upload="beforeUpload" style="text-align:center;height: 102px;width: 102px;line-height: 102px"
                  :http-request="imgUPload">
                  <img v-if="form.dutyImage" :src="form.dutyImage" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div>上传负责人照片</div>
              </el-form-item>
              </li>
              <el-form-item label="" class="upload uploadLinence">
                <el-upload class="avatar-uploader" :action="qiniuURL" :show-file-list="false" :on-success="ImgUploadSuccess()"
                  :before-upload="beforeUpload" style="text-align:center;height: 102px;width: 102px;line-height: 102px"
                  :http-request="imgUPload1">
                  <img v-if="form.tenantImage" :src="form.tenantImage" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <div>上传营业执照</div>
              </el-form-item>
              <el-form-item label="统一社会代码">
                <el-input v-model="form.socialCode" style="width:40%" disabled></el-input>
              </el-form-item>
              <el-form-item label="商户地址">
                <el-col :span="11">
                  <!-- <el-cascader size="large" :options="options" v-model="tenantAddress" @change="handleChange">
                    <el-input></el-input>
                  </el-cascader> -->
                </el-col>
                <el-col :span="11">
                  <el-input v-model="form.tenantAddress" style="width:100%"></el-input>
                </el-col>
              </el-form-item>
              <el-form-item label="联系人">
                <el-input v-model="form.contact" style="width:40%"></el-input>
              </el-form-item>
              <el-form-item label="联系电话">
                <el-input type="number" v-model="form.telphone" style="width:40%"></el-input>
              </el-form-item>
              <el-form-item label="经营业态">
                <span class="el-dropdown-link">
                  <el-radio v-model="form.businessField" label="1">1</el-radio>
                  <el-radio v-model="form.businessField" label="2">2</el-radio>
                  <el-radio v-model="form.businessField" label="3">3</el-radio>
                </span>
              </el-form-item>
              <el-form-item class="footer_button" style="clear:both;">
                <div class="div_P">
                  <div>{{ operator }}</div>
                </div>
                <el-button @click="updateTentant">确认提交</el-button>
              </el-form-item>
            </el-form>
          </el-dialog>
      </el-row>
    </el-row>
  </div>
</template>

<script>
  import * as qiniu from 'qiniu-js';
  var CryptoJS = require("crypto-js");
  import api from "../../api/api.js";
  export default {
    data() {
      return {
        PagesNumber: 10,
        Times_search: [new Date(), new Date()],
        footer_Num: "1",
        pageNum: "1",
        // Main_loading:false,
        tableData: [{
          tenantName: "ssss",
          tenantNickname: "ss",
          socialCode: "123321",
          tenantAddress: "qwertyu",
          businessField: 1,
          tenantImage: "",
          dutyImage: "",
          contact: "aaa",
          telphone: "1234"
        }],
        add_Visable: false,
        edit__Visable:false,
        form: {
          tenantName: "ssss",
          tenantNickname: "ss",
          socialCode: "123321",
          tenantAddress: "qwertyu",
          businessField: 1,
          tenantImage: "",
          dutyImage: "",
          contact: "aaa",
          telphone: "1234",
          id:""
        },
        options: {},
        selectedOptions: "",
        operator: "操作员：" +
          sessionStorage.getItem("userName") +
          "/操作时间：" +
          this.Date_day(),
        uploadToken: '',
        imageUrl: '',
        qiniuURL: 'https://upload.qiniup.com',
        logoSrcUrl: '',
      };
    },
    created() {},
    computed: {},
    mounted() {
      // this.getToken(); 
      let params = {
        pageNum: '1',
        pageSize: '12',
        companyId: JSON.parse(sessionStorage.getItem('companyId')),
      }
      this.pageNum = params.pageNum;
      this.tentant_info(params);

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
      deleteTentant(e) {
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
              api.Tentant_del({
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
                  this.tentant_info(params)
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
      editTenant(e) {
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
        api.Tentant_ByID({id: idvalue}).then(res => {
          if (res.status == 200) {
            this.edit__Visable = true;
            console.log(res);
            this.footer_Num = Number(res.total)
            this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
            this.form = res.data;
          } else if (res.status == 500) {
            // this.Main_loading = false;
            this.$message.error("服务器忙！");
          } else {
            // this.Main_loading = false
            if (res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
            else
              this.$message.error(res.msg);
          }
        });
      },
      updateTentant(){
        let _this = this,
          objstring = "",
          obj = {};
        for (var i in _this.form) {
          obj[i] = _this.form[i];
          objstring += "&" + i + "=" + _this.form[i];
        }
        obj.companyId = JSON.parse(sessionStorage.getItem('companyId'));
        delete obj.createTime ;
        delete obj.updateTime ;
        console.log(obj)
        //修改
        api.Tentant_update(obj).then(res => {
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
            this.tentant_info(params);
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
      add() {
        this.add_Visable = true;
      },
      //时间格式
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
      handleChange() {},
      //页码功能
      handleSizeChange(done) {
        this.pageNum = done;
      },
      ImgUploadSuccess() {},
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
            this.form.dutyImage = res.data
            console.log(this.form.dutyImage);

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
            this.form.tenantImage = res.data
            console.log(this.form.tenantImage);
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
      tentant_add() {
        let _this = this,
          objstring = "",
          obj = {};
        for (var i in _this.form) {
          obj[i] = _this.form[i];
          objstring += "&" + i + "=" + _this.form[i];
        }
        obj.companyId = JSON.parse(sessionStorage.getItem('companyId'))
        //新增
        api.Tentant_update(obj).then(res => {
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
            this.tentant_info(params);
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
      tentant_info(params) {
        api.Tentant_ByPage(params).then(res => {
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
      getToken() {
        function utf16to8(str) {
          var out, i, len, c;
          out = "";
          len = str.length;
          for (i = 0; i < len; i++) {
            c = str.charCodeAt(i);
            if ((c >= 0x0001) && (c <= 0x007F)) {
              out += str.charAt(i);
            } else if (c > 0x07FF) {
              out += String.fromCharCode(0xE0 | ((c >> 12) & 0x0F));
              out += String.fromCharCode(0x80 | ((c >> 6) & 0x3F));
              out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            } else {
              out += String.fromCharCode(0xC0 | ((c >> 6) & 0x1F));
              out += String.fromCharCode(0x80 | ((c >> 0) & 0x3F));
            }
          }
          return out;
        }

        function utf8to16(str) {
          var out, i, len, c;
          var char2, char3;
          out = "";
          len = str.length;
          i = 0;
          while (i < len) {
            c = str.charCodeAt(i++);
            switch (c >> 4) {
              case 0:
              case 1:
              case 2:
              case 3:
              case 4:
              case 5:
              case 6:
              case 7:
                // 0xxxxxxx
                out += str.charAt(i - 1);
                break;
              case 12:
              case 13:
                // 110x xxxx 10xx xxxx
                char2 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
                break;
              case 14:
                // 1110 xxxx 10xx xxxx 10xx xxxx
                char2 = str.charCodeAt(i++);
                char3 = str.charCodeAt(i++);
                out += String.fromCharCode(((c & 0x0F) << 12) | ((char2 & 0x3F) << 6) | ((char3 & 0x3F) << 0));
                break;
            }
          }
          return out;
        }

        /*
         * Interfaces:
         * b64 = base64encode(data);
         * data = base64decode(b64);
         */
        var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_";
        var base64DecodeChars = new Array(-1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -
          1,
          -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1,
          63,
          52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11,
          12,
          13, 14,
          15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1, -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
          36, 37, 38, 39, 40,
          41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);

        function base64encode(str) {
          var out, i, len;
          var c1, c2, c3;
          len = str.length;
          i = 0;
          out = "";
          while (i < len) {
            c1 = str.charCodeAt(i++) & 0xff;
            if (i == len) {
              out += base64EncodeChars.charAt(c1 >> 2);
              out += base64EncodeChars.charAt((c1 & 0x3) << 4);
              out += "==";
              break;
            }
            c2 = str.charCodeAt(i++);
            if (i == len) {
              out += base64EncodeChars.charAt(c1 >> 2);
              out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
              out += base64EncodeChars.charAt((c2 & 0xF) << 2);
              out += "=";
              break;
            }
            c3 = str.charCodeAt(i++);
            out += base64EncodeChars.charAt(c1 >> 2);
            out += base64EncodeChars.charAt(((c1 & 0x3) << 4) | ((c2 & 0xF0) >> 4));
            out += base64EncodeChars.charAt(((c2 & 0xF) << 2) | ((c3 & 0xC0) >> 6));
            out += base64EncodeChars.charAt(c3 & 0x3F);
          }
          return out;
        }

        function base64decode(str) {
          var c1, c2, c3, c4;
          var i, len, out;
          len = str.length;
          i = 0;
          out = "";
          while (i < len) {
            /* c1 */
            do {
              c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c1 == -1);
            if (c1 == -1) break;
            /* c2 */
            do {
              c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
            } while (i < len && c2 == -1);
            if (c2 == -1) break;
            out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
            /* c3 */
            do {
              c3 = str.charCodeAt(i++) & 0xff;
              if (c3 == 61) return out;
              c3 = base64DecodeChars[c3];
            } while (i < len && c3 == -1);
            if (c3 == -1) break;
            out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
            /* c4 */
            do {
              c4 = str.charCodeAt(i++) & 0xff;
              if (c4 == 61) return out;
              c4 = base64DecodeChars[c4];
            } while (i < len && c4 == -1);
            if (c4 == -1) break;
            out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
          }
          return out;
        }
        var safe64 = function (base64) {
          base64 = base64.replace(/\+/g, "-");
          base64 = base64.replace(/\//g, "_");
          return base64;
        };
        const dateTime = Date.now();
        const timesTamp = Math.floor(dateTime / 1000) + 3600;
        let accessKey = '1XwHZOxhCF9gaBz9wbrqPQJN542_lih40LUQUfk0',
          secretKey = 'u-bBWNXpcwRWNgUdbJEB_f48OVPrcjg1PJfhtFR_',
          putPolicy = {
            "scope": "saxupdata",
            "deadline": timesTamp
          };
        var put_policy = JSON.stringify(putPolicy);
        var encoded = base64encode(utf16to8(put_policy));
        var hash = CryptoJS.HmacSHA1(encoded, secretKey);
        var encoded_signed = hash.toString(CryptoJS.enc.Base64);
        this.uploadToken = accessKey + ":" + safe64(encoded_signed) + ":" + encoded;
        console.log('upload: ' + this.uploadToken)
      }
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

  .el-upload img {
    width: 100%;
  }

  #TentantManagement .container_padding th {
    line-height: 3rem;
    background: #eee;
    border-left: 1px solid #ccc;
  }

  #TentantManagement .container_padding th:first-child {
    border-left: 0;
  }

  #TentantManagement .container_padding td {
    text-align: center;
    line-height: 2.5rem;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }

  #TentantManagement .container_padding td:first-child {
    padding-left: 1px;
  }

  #TentantManagement .block {
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

  #TentantManagement .List_button_cz {
    background: #92cc8f;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
  }

  #TentantManagement .cell .delete {
    background: #e74c3c;
  }

  #TentantManagement .cell .document {
    background: #70c8cb;
  }

  #TentantManagement .cell .circle {
    background: #ef948b;
  }

  #TentantManagement .cell .message {
    background: #e74c3c;
  }

  #TentantManagement .block .el-pagination {
    padding-left: 1rem;
  }

  #TentantManagement .container_padding th {
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
  }

  #TentantManagement .container_padding th:first-child {
    border-left: 0;
  }

  #TentantManagement .container_padding td {
    text-align: center;
    line-height: 2.5rem;
    border-right: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
  }

  #TentantManagement .container_padding td:first-child {
    padding-left: 1px;
  }

  #TentantManagement .container_padding tr:nth-child(2n + 1) {
    background: #f9f9f9;
  }

  #TentantManagement .container_padding tr:nth-child(2n + 1) td {
    text-align: center;
    line-height: 2.5rem;
    border-right: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
  }

  #TentantManagement .box-card::-webkit-scrollbar {
    width: 0px;
  }

  #TentantManagement .box-card th {
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #f4f4f4;
    font-weight: 400;
  }

  #TentantManagement .box-card th:first-child {
    border-left: 0;
  }

  #TentantManagement .box-card td {
    text-align: center;
    line-height: 2.5rem;
    border-right: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
  }

  #TentantManagement .box-card td:first-child {
    padding-left: 1px;
  }

  #TentantManagement .box-card .button_div {
    padding: 0.5rem;
  }

  #OutboundGoods .el-date-editor.el-input {
    width: 100%;
  }

  #TentantManagement .text th {
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }

  #dataS_dis_value {
    position: relative;
  }

  #TentantManagement #dataS_dis_value .dataS {
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

  #TentantManagement #dataS_dis_value .dataS span {
    display: block;
    width: 88%;
    height: 2.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  #TentantManagement #dataS_dis_value .dataS>div {
    border-bottom: 1px solid #ccc;
  }

  #TentantManagement .el-dialog__header {
    padding: 1.5rem 1.5rem;
    background: #2c3e50;
  }

  #TentantManagement .el-dialog__title {
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }

  #TentantManagement .el-dialog__body {
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }

  /* !important */
  #TentantManagement .footer_button {
    position: absolute;
    margin: 0;
    width: 100%;
    height: 5.8rem;
    left: 0;
    background: #edf2f8;
    bottom: 0;
  }

  #TentantManagement .footer_button .el-form-item__content {
    margin-left: 0 !important;
    min-height: 5.8rem;
    text-align: center;
  }

  #TentantManagement .footer_button .div_P {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: 0.3rem;
  }

  #TentantManagement .div_P div {
    color: #9c9c9c;
    font-size: 14px;
  }

  #TentantManagement .footer_button .el-button {
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2c3e50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }

  #TentantManagement .footer_button .el-button:hover {
    border: 1px solid #3b5168;
    background: #3b5168;
  }

  #TentantManagement .header_button {
    width: 86px;
    background: #2c3e50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }

  #TentantManagement .header_button:hover {
    border: 1px solid transparent;
  }

  #TentantManagement .header_button_a {
    width: 86px;
    background: #47a136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }

  #TentantManagement .header_button_a:hover {
    border: 1px solid transparent;
  }

  #TentantManagement .upload {
    position: absolute;
    top: 20px;
    display: inline-block;
  }

  #TentantManagement .uploadImg {
    right: 80px;
  }

  #TentantManagement .uploadLinence {
    right: 200px;
  }

  @media screen and (min-width: 1300px) and (max-width: 1680px) {
    #TentantManagement .m-lg-1 {
      width: 8.33% !important;
    }

    #TentantManagement .m-lg-2 {
      width: 16.66% !important;
    }

    #TentantManagement .m-lg-3 {
      width: 25% !important;
    }

    #TentantManagement .m-lg-4 {
      width: 33.33% !important;
    }

    #TentantManagement .m-lg-5 {
      width: 41.66% !important;
    }

    #TentantManagement .m-lg-6 {
      width: 49.98% !important;
    }

    #TentantManagement .m-lg-7 {
      width: 58.31% !important;
    }

    #TentantManagement .m-lg-8 {
      width: 66.64% !important;
    }

    #TentantManagement .m-lg-9 {
      width: 74.97% !important;
    }

    #TentantManagement .m-lg-10 {
      width: 83.3% !important;
    }

    #TentantManagement .m-lg-11 {
      width: 91.63% !important;
    }

    #TentantManagement .m-lg-12 {
      width: 100% !important;
    }

    #TentantManagement .mr {
      margin-left: 0;
    }
  }
</style>