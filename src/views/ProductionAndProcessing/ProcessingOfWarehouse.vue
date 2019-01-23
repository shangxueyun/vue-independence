<template>
	<div id="ProcessingOfWarehouse" v-loading="Pass_loading">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="padding:1.5rem;border:0;box-shadow:none;">
          <el-col :md="12" :lg="6" :span="6" style="">
            <el-input class="m-lg-7" v-model="searchInput" style="width:64%" placeholder="请输入加工批次号"></el-input>
            <el-button size="medium" class="mr m-lg-4 header_button" @click="search(searchInput)"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="12" :lg="6" :span="6">
            <el-input class="m-lg-7" v-model="searchInput1" style="width:64%" placeholder="请输入原料名称"></el-input>
            <el-button size="medium" class="mr m-lg-4 header_button" @click="search1(searchInput1)"><i class="el-icon-search"></i>&nbsp;&nbsp;查询</el-button>
          </el-col>
          <el-col :md="12" :lg="4" :span="4">
            <!-- <el-button style="float: right;" size="medium" class="mr header_button_a"><i class="el-icon-plus"></i>&nbsp;&nbsp;新增</el-button> -->
          </el-col>
          <el-col :span="24" class="container_padding bj">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #F4F4F4;width:100%;margin-top: 1.5rem;">
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">名称</th>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">单位</th>
                        <th colspan="1" style="text-align:center;width:12%" rowspan="1">数量</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">属性</th>
                        <th colspan="1" style="text-align:center;width:16%" rowspan="1">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="items in tableData" >
                        <td><div class="cell">{{ items.materialName }}</div></td>
                        <td><div class="cell">{{ items.unitName }}</div></td>
                        <td><div class="cell">{{ items.processGoodsNum }}</div></td>
                        <td><div class="cell">{{ items.isMain }}</div></td>
                        <td><div class="cell" :idvalue="items.id">
                          <button class="List_button_cz delete" :idvalue="items.id" @click="Delete($event)"><i :idvalue="items.id" class="el-icon-delete"></i></button>
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

      </el-row>
    </el-row>
	</div>

</template>

<script>
import api from "../../api/api.js";
  export default {
    data() {
      return {
        PagesNumber:10,
        Times_search:[new Date(),new Date()],
        footer_Num:'',
        pageNum:'1', 
        Pass_loading:false,
        searchInput:'',
        searchInput1:'',
        flgValue:'',
        Data:[],
        tableData: [],
      };
    },
    created() {

    },
    computed: {
    },
    mounted() {
      this.MaterialManagement_info({companyId:JSON.parse(sessionStorage.getItem('companyId'))});
    },
    methods: {
      //页码功能
      handleSizeChange(done){
        let params = {pageNum:done.toString(),pageSize:'12'}
        this.pageNum = done.toString();
        this.ProcessingOfWarehouse_info(params)
      },
      MaterialManagement_info(obj){
        api.MaterialManagement_info(obj).then(res => {
            if (res.status == 200) {
                this.Data = res.data
                this.Pass_loading = false;
            } else if(res.status == 500){
                  this.Pass_loading = false;
                  this.$message.error("服务器忙！");
            }else{
              this.Pass_loading = false
              if(res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
              else
              this.$message.error(res.msg);
            }
        }); 
      },
      ProcessingOfWarehouse_info(params){
        this.Pass_loading = true;
        api.ProcessingOfWarehouse_info(params).then(res => {
            if (res.status == 200) {
                this.footer_Num = Number(res.total)
                this.PagesNumber = Number((Number(res.total) / 1.2).toFixed(0));
                res.data.forEach((v,i)=>{for(var j in v){
                  if(j == "isMain"){
                    if(v[j]==1){v[j]="主料"}else{v[j]="辅料"}
                  }
                }});
                let datas,listdata = res.data;
                listdata.forEach((v,i)=>{
                  var id = v.materialId
                  datas = this.Data.find((item)=>{
                      if(item.id === Number(id))
                      return item.id === Number(id)
                  });
                  v.unitName = datas.unitName
                  v.materialName = datas.materialName
                });
                this.tableData = listdata
                this.Pass_loading = false;
            } else if(res.status == 500){
                  this.Pass_loading = false;
                  this.$message.error("服务器忙！");
            }else{
              this.Pass_loading = false
              if(res.msg == undefined || res.msg == "")
              this.$message.error("服务器忙！");
              else
              this.$message.error(res.msg);
            }
        }); 
      },
      search(searchInput){
        let params = {pageNum:1,pageSize:'12',processOrderBatch:searchInput}
        this.pageNum = params.pageNum;
        this.ProcessingOfWarehouse_info(params)
        this.flgValue = "1"
      },
      search1(searchInput1){
        let params = {pageNum:1,pageSize:'12',materialName:searchInput1}
        this.pageNum = params.pageNum;
        this.ProcessingOfWarehouse_info(params)
        this.flgValue = "2"
      },
      Delete(e){
          let idvalue,obj={};
          e.path.forEach((v,i)=>{if(i==1){let attr = v.attributes;
            for(var i in attr)
              {
                  for(var j in attr[i])
                  {
                    if(j == "name")
                    {
                      if(attr[i].name == "idvalue")
                      {
                        idvalue = attr[i].value
                        this.$confirm('确认删除？')
                        .then(_ => {
                          this.P_adds = true;
                            api.ProcessingOfWarehouse_Delete({id: idvalue}).then(res => {
                                if (res.status == 200) {
                                    this.P_adds = false;
                                    this.$message({
                                      message: "删除"+res.msg,
                                      type: 'success'
                                    });
                                    if(this.flgValue=="1"){
                                      let params = {pageNum:1,pageSize:'12',processOrderBatch:this.searchInput}
                                      this.pageNum = params.pageNum;
                                      this.ProcessingOfWarehouse_info(params)
                                    }else{
                                      let params = {pageNum:1,pageSize:'12',materialName:this.searchInput1}
                                      this.pageNum = params.pageNum;
                                      this.ProcessingOfWarehouse_info(params)
                                    }
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
   .el-card__body{
     padding: 0;
   }
   .el-table--fit{
      padding: 10px 20px 0px 20px;
   }
   #ProcessingOfWarehouse .container_padding th{
    line-height: 3rem;
    background: #eee;
    border-left: 1px solid #ccc;
   }
   #ProcessingOfWarehouse .container_padding th:first-child{
     border-left: 0;
   }
   #ProcessingOfWarehouse .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
   }
   #ProcessingOfWarehouse .container_padding td:first-child{
     padding-left: 1px;
   }
   #ProcessingOfWarehouse .block{
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
    #ProcessingOfWarehouse .List_button_cz{
    background: #92CC8F;
    border: 0;
    outline: 0;
    width: 1.5rem;
    height: 1.5rem;
    color: #fff;
    border-radius: 4px;
    cursor: pointer;
   }
   #ProcessingOfWarehouse .cell .delete{
     background: #E74C3C
   }
   #ProcessingOfWarehouse .block .el-pagination{
     padding-left: 1rem;
   }
   #ProcessingOfWarehouse .container_padding th{
    line-height: 3rem;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    border-bottom: 1px solid #F4F4F4;
   }
   #ProcessingOfWarehouse .container_padding th:first-child{
     border-left: 0;
   }
   #ProcessingOfWarehouse .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }
   #ProcessingOfWarehouse .container_padding td:first-child{
     padding-left: 1px;
   }
   #ProcessingOfWarehouse .container_padding tr:nth-child(2n+1){
     background: #F9F9F9
   }
  #ProcessingOfWarehouse .container_padding tr:nth-child(2n+1) td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4;
   }

  #ProcessingOfWarehouse .box-card::-webkit-scrollbar {
      width: 0px;
  }
  #ProcessingOfWarehouse .box-card th{
    line-height: 3rem;
    font-size: 16px;
    color: #222222;
    background: #fff;
    border-left: 1px solid #F4F4F4;
    font-weight: 400;
  }
  #ProcessingOfWarehouse .box-card th:first-child{
    border-left: 0;
  }
  #ProcessingOfWarehouse .box-card td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #F4F4F4;
      border-bottom: 1px solid #F4F4F4; 
  }
  #ProcessingOfWarehouse .box-card td:first-child{
    padding-left: 1px;
  }
  #ProcessingOfWarehouse .box-card .button_div{
    padding: .5rem;
  }
  #OutboundGoods .el-date-editor.el-input {
      width: 100%;
  }
  #ProcessingOfWarehouse .text th{
    border-bottom: 1px solid #d1dbe5;
    border-left: 1px solid #d1dbe5;
  }
  
  #ProcessingOfWarehouse .el-dialog__header {
      padding: 1.5rem 1.5rem;
      background: #2C3E50;
  }
  #ProcessingOfWarehouse .el-dialog__title{
    font-size: 18px;
    font-weight: 400;
    color: #fff;
  }
  #ProcessingOfWarehouse .el-dialog__body{
    position: relative;
    padding: 1.5rem 1.5rem 7.5rem 1.5rem;
  }
  #ProcessingOfWarehouse .header_button {
    width: 86px;
    background: #2C3E50;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }
  #ProcessingOfWarehouse .header_button:hover{
    border: 1px solid transparent;
  }
  #ProcessingOfWarehouse .header_button_a{
    width: 86px;
    background: #47A136;
    color: #fff;
    height: 34px;
    font-size: 16px;
    padding: 0;
  }




@media screen and (min-width: 1300px) and (max-width: 1680px){
  #ProcessingOfWarehouse .m-lg-1{
    width: 8.33% !important;
  }
  #ProcessingOfWarehouse .m-lg-2{
    width: 16.66% !important;
  }
  #ProcessingOfWarehouse .m-lg-3{
    width: 25% !important;
  }
  #ProcessingOfWarehouse .m-lg-4{
    width: 33.33% !important;
  }
  #ProcessingOfWarehouse .m-lg-5{
    width: 41.66% !important;
  }
  #ProcessingOfWarehouse .m-lg-6{
    width: 49.98% !important;
  }
  #ProcessingOfWarehouse .m-lg-7{
    width: 58.31% !important;
  }
  #ProcessingOfWarehouse .m-lg-8{
    width: 66.64% !important;
  }
  #ProcessingOfWarehouse .m-lg-9{
    width: 74.97% !important;
  }
  #ProcessingOfWarehouse .m-lg-10{
    width: 83.30% !important;
  }
  #ProcessingOfWarehouse .m-lg-11{
    width: 91.63% !important;
  }
  #ProcessingOfWarehouse .m-lg-12{
    width: 100% !important;
  }
  #ProcessingOfWarehouse .mr {
    margin-left: 0;
  }
}
</style>
