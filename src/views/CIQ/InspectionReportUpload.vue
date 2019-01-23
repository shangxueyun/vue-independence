<template>
  <div id="InspectionReportUpload">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="padding:1.5rem;border:0;box-shadow:none;">
          <el-col :md="12" :lg="6" :span="6">
            <el-input class="m-lg-7" style="width:64%" placeholder="请输入物料名称" v-model="materialName"></el-input>
            <el-button size="medium" class="mr m-lg-4 header_button" @click='searchQuarantine(1)'><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="12" :lg="6" :span="6">
            <el-input class="m-lg-7" style="width:64%" placeholder="请输入入库批次" v-model="purchaseBatch"></el-input>
            <el-button size="medium" class="mr m-lg-4 header_button" @click="searchQuarantine(purchaseBatch)"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="12" :lg="6" :span="6">
            <el-input class="m-lg-7" style="width:64%" placeholder="请输入检疫检疫证号" v-model="quarantineNo"></el-input>
            <el-button size="medium" class="mr m-lg-4 header_button" @click="searchQuarantine(quarantineNo)"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <!-- <el-col :md="12" :lg="4" :span="4">
            <el-button style="float: right;" size="medium" class="mr header_button_a" @click="NewVisible(New_Visible)"><i
                class="el-icon-plus"></i>&nbsp;&nbsp;新增</el-button>
          </el-col> -->
          <el-col :span="24" class="container_padding bj">
            <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #F4F4F4;width:100%;margin-top: 1.5rem;">
              <thead>
                <tr>
                  <th colspan="1" style="text-align:center;width:7%" rowspan="1">入库批次</th>
                  <th colspan="1" style="text-align:center;width:7%" rowspan="1">物料名称</th>
                  <th colspan="1" style="text-align:center;width:7%" rowspan="1">入库时间</th>
                  <th colspan="1" style="text-align:center;width:7%" rowspan="1">是否上传 </th>
                  <th colspan="1" style="text-align:center;width:7%" rowspan="1">操作</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="items in tableData" ref="table_tr">
                  <td>
                    <div class="cell">{{ items.purchaseBatch }}</div>
                  </td>
                  <td>
                    <div class="cell">{{ items.materialName }}</div>
                  </td>
                  <td>
                    <div class="cell">
                      =
                    </div>
                  </td>
                  <td>
                    <div class="cell"> {{quarantineImage?"是":"否"}}</div>
                  </td>
                  <td>
                    <div class="cell">
                      <button class="List_button_cz document" :idvalue="items.id" @click="Audit($event)"><i class="el-icon-upload"></i></button>
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
        <!-- <el-dialog v-loading="P_adds" title="检疫检疫证号上传 " :visible.sync="Add_Visible" width="100%" :before-close="handleClose">
          <el-form :model="form" label-width="80px">
            <el-form-item label="入库批次:" style="">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
            <el-form-item label="入库时间:" style="">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="供应商:" style="">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="商品名称:" style="">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item class="footer_button" style="clear:both;">
              <div class="div_P">
                <div>{{ operator }}</div>
              </div>
              <el-button @click="RoleManagement_adds()">确认提交</el-button>
            </el-form-item>
            <el-form-item class="uploadImages_div" v-show="logoImgsDiv">
              <div class="upload">上传
                <input class="change" @change="update($event,'logoSrcUrl','logoImgsDiv','logoImgsDiv1')" type="file" accept="image/png,image/gif,image/jpeg" multiple="multiple" />
              </div>
                上传尺寸大小： 256px*256px
            </el-form-item>
            <el-form-item class="uploadImages_div" v-show="logoImgsDiv1">
              <div class="upload logo">
                <img :src="logoSrcUrl" alt="" style="width:100%;height:100%;border-radius: 1rem;">
                <input class="change" @change="update($event,'logoSrcUrl','logoImgsDiv','logoImgsDiv1')" type="file" accept="image/png,image/gif,image/jpeg" multiple="multiple" />
              </div>
            </el-form-item>
          </el-form>
        </el-dialog> -->

        <el-dialog v-loading="P_adds" title="新增检验检疫" :visible.sync="Add_Visible" width="100%" :before-close="handleClose">
          <el-form :model="form" label-width="80px">
            <el-form-item label="入库批次:" style="">
              <el-input v-model="form.roleName"></el-input>
            </el-form-item>
            <el-form-item label="入库时间:" style="">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="供应商:" style="">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="物料名称:" style="">
              <el-input v-model="form.description"></el-input>
            </el-form-item>
            <el-form-item label="上传报告:" style="">
              <el-form-item label="" class="upload uploadImg">
                <el-upload class="avatar-uploader" :action="qiniuURL" :show-file-list="false" :on-success="ImgUploadSuccess()"
                  :before-upload="beforeUpload" style="text-align:center;height: 102px;width: 102px;line-height: 102px;border: 1px dashed #d9d9d9;display: inline-block;"
                  :http-request="imgUPload">
                  <img v-if="form.dutyImage" :src="form.dutyImage" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload class="avatar-uploader" :action="qiniuURL" :show-file-list="false" :on-success="ImgUploadSuccess()"
                  :before-upload="beforeUpload" style="text-align:center;height: 102px;width: 102px;line-height: 102px;border: 1px dashed #d9d9d9;display: inline-block;"
                  :http-request="imgUPload">
                  <img v-if="form.dutyImage" :src="form.dutyImage" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload class="avatar-uploader" :action="qiniuURL" :show-file-list="false" :on-success="ImgUploadSuccess()"
                  :before-upload="beforeUpload" style="text-align:center;height: 102px;width: 102px;line-height: 102px;border: 1px dashed #d9d9d9;display: inline-block;"
                  :http-request="imgUPload">
                  <img v-if="form.dutyImage" :src="form.dutyImage" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload class="avatar-uploader" :action="qiniuURL" :show-file-list="false" :on-success="ImgUploadSuccess()"
                  :before-upload="beforeUpload" style="text-align:center;height: 102px;width: 102px;line-height: 102px;border: 1px dashed #d9d9d9;display: inline-block;"
                  :http-request="imgUPload">
                  <img v-if="form.dutyImage" :src="form.dutyImage" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
                <el-upload class="avatar-uploader" :action="qiniuURL" :show-file-list="false" :on-success="ImgUploadSuccess()"
                  :before-upload="beforeUpload" style="text-align:center;height: 102px;width: 102px;line-height: 102px;border: 1px dashed #d9d9d9;display: inline-block;"
                  :http-request="imgUPload">
                  <img v-if="form.dutyImage" :src="form.dutyImage" class="avatar">
                  <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                </el-upload>
              </el-form-item>

              <div class="div_P">
                <div>*检验检疫报告允许上传多张图片，最多允许上传5张图片，图片大小限制为2M以下。</div>
              </div>
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
        PagesNumber: 1,
        Times_search: [new Date(), new Date()],
        operator: "操作员：" +
          sessionStorage.getItem("userName") +
          "/操作时间：" +
          this.Date_day(),
        footer_Num: "85",
        pageNum: 10,
        FormDatas: {},
        tableData: [{
          id: "1",
          purchaseBatch: "20180928095654526",
          materialName: "物料商品1",
          Batch: "20171019131635",
          operator: "夏文康 ",
          delivery: "上海某某市场",
          status: "待出库"
        }],
        Add_New_Users_Visible: false,
        ALTER_USER_Visible: false,
        P_adds: false,
        Add_Visible: false,
        New_Visible: false,
        Userdispaly: false,
        logoImgsDiv: true,
        logoImgsDiv1: false,
        logoSrcUrl: "",
        upload_limit: "5",
        form: {

        },
        qiniuURL: 'https://upload.qiniup.com',
        materialName: "",
        purchaseBatch: "",
        quarantineNo: ""
      };
    },
    created() {},
    computed: {},
    mounted() {
      // let params = {
      //   pageNum: "1",
      //   pageSize: "12",
      //   companyId: JSON.parse(sessionStorage.getItem("companyId"))
      // };
      // this.pageNum = params.pageNum;
      this.Quarantine_info('PagesNumber');
    },
    methods: {
      selectGet(vId) {
        let obj = {};
        obj = this.selectList.find(item => {
          if (item.id === vId) return item.id === vId;
        });
        this.Classification = obj.id;
      },
      getSTime(val) {
        this.times = val;
      },
      ButtonShow(str) {
        switch (str) {
          case "已收货":
            return true;
          case "已发货":
            return true;
          case "未发货":
            return true;
          case "待审核":
            return true;
          case "审核中":
            return true;
          default:
            return false;
        }
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
      handleSizeChange(done) {
        let params = {
          pageNum: done.toString(),
          pageSize: "12",
          companyId: JSON.parse(sessionStorage.getItem("companyId"))
        };
        this.pageNum = done.toString();
        this.ProcessingAndWarehousing_info(params);
      },
      handleClose(done) {
        this.$confirm("确认关闭？")
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },
      // update(e, logoSrcUrl, params, params1) {
      //   // 上传照片-demo
      //   this.FormDatas = new FormData();
      //   let file = e.target.files[0];
      //   this.FormDatas.append("multipartFile", file);
      //   this.P_adds = true;
      //   api.BusinessAdministration_uploadImages(this.FormDatas).then(res => {
      //     if (res.status == 200) {
      //       this.FormDatas.delete("multipartFile");
      //       this.P_adds = false;
      //       this[params] = false;
      //       this[params1] = true;
      //       this[logoSrcUrl] = "http://image1.shianxian.cn/" + res.msg;
      //     } else if (res.status == 500) {
      //       this.P_adds = false;
      //       this.$message.error("服务器忙！");
      //     } else {
      //       this.P_adds = false;
      //       if (res.msg == undefined || res.msg == "")
      //         this.$message.error("服务器忙！");
      //       else this.$message.error(res.msg);
      //     }
      //   });
      // },
      beforeUpload() {},
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
        // this.P_adds = true;
        api.CommonUpload_uploadImages(this.FormDatas).then(res => {
          if (res.status == 200) {
            this.form.dutyImage = res.data
            console.log(this.form.dutyImage);

          } else if (res.status == 500) {
            // this.P_adds = false;
            this.$message.error("服务器忙！");
          } else {
            // this.P_adds = false;
            if (res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
            else this.$message.error(res.msg);
          }
        });


      },
      Audit(Add_Visible) {
        this.Add_Visible = true;
      },
      NewVisible(New_Visible) {
        this.Add_Visible = true;
      },
      handlePictureCardPreview() {},
      handleRemove() {},
      handleExceed() {
        alert("1");
      },
      Quarantine_info(key) {
        console.log()
        // Quarantine_ByPage
        let params = {
          pageNum: 1
        }
        api.Quarantine_ByPage(params).then(res => {
          if (res.status == 200) {
            console.log(res);
            // this.footer_Num = Number(res.total)
            // this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
            // res.data.forEach((v, i) => {
            //   for (var j in v) {
            //     if (j == "enable")
            //       v[j] = this.switchString(v[j]);
            //   }
            // });
            // this.tableData = res.data;
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

  #InspectionReportUpload .el-dialog--small {
    width: 30%;
  }

  /* 分页 */
  #InspectionReportUpload .block {
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

  #InspectionReportUpload .List_button_cz {
    background: #92cc8f;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
  }

  #InspectionReportUpload .cell .delete {
    background: #e74c3c;
  }

  #InspectionReportUpload .cell .document {
    background: #70c8cb;
  }

  #InspectionReportUpload .block .el-pagination {
    padding-left: 1rem;
  }

  #InspectionReportUpload .container_padding th {
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
  }

  #InspectionReportUpload .container_padding th:first-child {
    border-left: 0;
  }

  #InspectionReportUpload .container_padding td {
    text-align: center;
    line-height: 2.5rem;
    border-right: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
  }

  #InspectionReportUpload .container_padding td:first-child {
    padding-left: 1px;
  }

  #InspectionReportUpload .container_padding tr:nth-child(2n + 1) {
    background: #f9f9f9;
  }

  #InspectionReportUpload .container_padding tr:nth-child(2n + 1) td {
    text-align: center;
    line-height: 2.5rem;
    border-right: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
  }

  #InspectionReportUpload .select_top {
    position: relative;
    width: 33.3%;
    float: left;
    height: 2.5rem;
  }

  #InspectionReportUpload .select_top span {
    display: block;
    float: left;
    line-height: 2rem;
    margin-right: 0.8rem;
  }

  #InspectionReportUpload .select_top .el-input {
    width: 75%;
    line-height: 1.8rem;
    border-radius: 0.2rem;
    outline: 0;
  }

  #InspectionReportUpload .box-card::-webkit-scrollbar {
    width: 0px;
  }

  #InspectionReportUpload .box-card th {
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #f4f4f4;
    font-weight: 400;
  }

  #InspectionReportUpload .box-card th:first-child {
    border-left: 0;
  }

  #InspectionReportUpload .box-card td {
    text-align: center;
    line-height: 2.5rem;
    border-right: 1px solid #f4f4f4;
    border-bottom: 1px solid #f4f4f4;
  }

  #InspectionReportUpload .box-card td:first-child {
    padding-left: 1px;
  }

  #InspectionReportUpload .box-card .button_div {
    padding: 0.5rem;
  }

  #InspectionReportUpload .el-date-editor.el-input {
    width: 100%;
  }

  #InspectionReportUpload .text th {
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }

  #InspectionReportUpload .dataS_dis_value {
    position: relative;
  }

  #InspectionReportUpload .dataS {
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

  #InspectionReportUpload .dataS div {
    display: block;
    width: 100%;
    height: 2.5rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    border-bottom: 1px solid #ccc;
  }

  #InspectionReportUpload .el-dialog__header {
    padding: 1.5rem 1.5rem;
    background: #2c3e50;
  }

  #InspectionReportUpload .el-dialog__title {
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }

  #InspectionReportUpload .el-dialog__body {
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }

  /* !important */
  #InspectionReportUpload .footer_button {
    position: absolute;
    margin: 0;
    width: 100%;
    height: 5.8rem;
    left: 0;
    background: #edf2f8;
    bottom: 0;
  }

  #InspectionReportUpload .footer_button .el-form-item__content {
    margin-left: 0 !important;
    min-height: 5.8rem;
    text-align: center;
  }

  #InspectionReportUpload .footer_button .div_P {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    padding-bottom: 0.3rem;
  }

  #InspectionReportUpload .div_P div {
    color: #9c9c9c;
    font-size: 14px;
  }

  #InspectionReportUpload .footer_button .el-button {
    width: 6rem;
    height: 2rem;
    line-height: 0rem;
    font-size: 16px;
    background: #2c3e50;
    color: #fff;
    font-weight: 400;
    text-align: center;
  }

  #InspectionReportUpload .footer_button .el-button:hover {
    border: 1px solid #3b5168;
    background: #3b5168;
  }

  #InspectionReportUpload .header_button {
    width: 86px;
    background: #2c3e50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }

  #InspectionReportUpload .header_button:hover {
    border: 1px solid transparent;
  }

  #InspectionReportUpload .header_button_a {
    width: 86px;
    background: #47a136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }

  #InspectionReportUpload .header_button_a:hover {
    border: 1px solid transparent;
  }

  #InspectionReportUpload .el-card__header {
    padding: 0 20px;
    line-height: 3rem;
  }

  #InspectionReportUpload .button_list {
    float: right;
  }

  #InspectionReportUpload .button_list button {
    background-color: #92cc8f;
    border-color: #92cc8f;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }

  #InspectionReportUpload .button_list button:last-child {
    background-color: #e74c3c;
    border-color: #e74c3c;
    width: 2rem;
    height: 2rem;
    padding: 0;
  }

  /* #InspectionReportUpload .uploadImages_div {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  margin: 0;
}
#InspectionReportUpload .uploadImages_div .el-form-item__content {
  margin-right: 2rem !important;
}
#InspectionReportUpload .upload {
  width: 10rem;
  position: relative;
  height: 10rem;
  text-align: center;
  font-size: 28px;
  line-height: 10rem;
  background: #ccc;
} */
  #InspectionReportUpload .change {
    overflow: hidden;
    right: 0;
    top: 0;
    opacity: 0;
    width: 100%;
    height: 10rem;
    background: #ccc;
    position: absolute;
  }

  #InspectionReportUpload .logo {
    background: transparent;
  }

  #InspectionReportUpload .ql-editor {
    height: 5rem;
  }

  @media screen and (min-width: 1200px) and (max-width: 1680px) {
    #InspectionReportUpload .m-lg-1 {
      width: 8.33%;
    }

    #InspectionReportUpload .m-lg-2 {
      width: 16.66%;
    }

    #InspectionReportUpload .m-lg-3 {
      width: 25%;
    }

    #InspectionReportUpload .m-lg-4 {
      width: 33.33%;
    }

    #InspectionReportUpload .m-lg-5 {
      width: 41.66%;
    }

    #InspectionReportUpload .m-lg-6 {
      width: 49.98%;
    }

    #InspectionReportUpload .m-lg-7 {
      width: 58.31%;
    }

    #InspectionReportUpload .m-lg-8 {
      width: 66.64%;
    }

    #InspectionReportUpload .m-lg-9 {
      width: 74.97%;
    }

    #InspectionReportUpload .m-lg-10 {
      width: 83.3%;
    }

    #InspectionReportUpload .m-lg-11 {
      width: 91.63%;
    }

    #InspectionReportUpload .m-lg-12 {
      width: 100%;
    }

    #InspectionReportUpload .el-dialog--small {
      width: 46%;
    }

    #InspectionReportUpload .select_top .el-input {
      width: 70%;
    }
  }
</style>