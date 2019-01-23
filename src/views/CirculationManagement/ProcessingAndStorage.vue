<template>
	<div id="ProcessingAndStorage">
    <el-row class="container">
      <el-row>
        <el-card class="box-card" style="margin-top:1rem;padding-bottom:2rem">
          <div slot="header" class="clearfix">
            <span>加工入库单</span>
          </div>
          <el-col :span="24" class="container_padding">
            <!-- <el-select @change="selectGet" v-model="select_value" placeholder="请选择类型">
              <el-option 
                v-for="item in selectList" 
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select> -->
            <el-button size="medium" class="mr" type="primary" icon="el-icon-circle-plus" @click="dialogVisible = true">新增</el-button>
          </el-col>
          <el-col :span="24" class="container_padding bj">
                <table cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #ccc;width:100%">
                    <thead>
                      <tr>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">ID</th>
                        <th colspan="1" style="text-align:center;width:14%" rowspan="1">入库单号</th>
                        <th colspan="1" style="text-align:center;width:14%" rowspan="1">加工单号</th>
                        <th colspan="1" style="text-align:center;width:14%" rowspan="1">加工批次</th>
                        <th colspan="1" style="text-align:center;width:14%" rowspan="1">操作员</th>
                        <th colspan="1" style="text-align:center;width:10%" rowspan="1">状态</th>
                        <th colspan="1" style="text-align:center;width:32%" rowspan="1">操作</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="items in tableData" >
                        <td><div class="cell">{{ items.id }}</div></td>
                        <td><div class="cell">{{ items.RKDH }}</div></td>
                        <td><div class="cell">{{ items.PASN }}</div></td>
                        <td><div class="cell">{{ items.BatchProcessing }}</div></td>
                        <td><div class="cell">{{ items.operator }}</div></td>
                        <td><div class="cell">{{ items.status }}</div></td>
                        <td><div class="cell">
                            <a @click="dialogVisible1 = true">编辑</a>
                            <a @click="deletes">删除</a>
                            </div></td>
                      </tr>
                    </tbody>
                </table>
          </el-col>
        </el-card>
        <el-dialog
          title="新增"
          :visible.sync="dialogVisible"
          width="30%"
          :before-close="handleClose">
          <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="活动名称">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select v-model="form.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="即时配送">
              <el-switch v-model="form.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质">
              <el-checkbox-group v-model="form.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源">
              <el-radio-group v-model="form.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="form.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">立即创建</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>
        
        <el-dialog
          title="商品明细"
          :visible.sync="dialogVisible1"
          width="30%"
          :before-close="handleClose">
          <el-form ref="form" :model="form1" label-width="80px">
            <el-form-item label="产品名称">
              <el-input v-model="form1.name"></el-input>
            </el-form-item>
            <el-form-item label="数量">
              <el-input v-model="form1.quantity"></el-input>
            </el-form-item>

            <el-form-item label="单位">
              <el-input v-model="form1.unit"></el-input>
            </el-form-item>

            <el-form-item label="规格">
              <el-input v-model="form1.specification"></el-input>
            </el-form-item>
            <el-form-item label="批次">
              <el-input v-model="form1.batch"></el-input>
            </el-form-item>
            <el-form-item label="追溯码">
              <el-input v-model="form1.Traceablity "></el-input>
            </el-form-item>
            <el-form-item label="活动区域">
              <el-select v-model="form1.region" placeholder="请选择活动区域">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="活动时间">
              <el-col :span="11">
                <el-date-picker type="date" placeholder="选择日期" v-model="form1.date1" style="width: 100%;"></el-date-picker>
              </el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="选择时间" v-model="form1.date2" style="width: 100%;"></el-time-picker>
              </el-col>
            </el-form-item>
            <el-form-item label="即时配送">
              <el-switch v-model="form1.delivery"></el-switch>
            </el-form-item>
            <el-form-item label="活动性质">
              <el-checkbox-group v-model="form1.type">
                <el-checkbox label="美食/餐厅线上活动" name="type"></el-checkbox>
                <el-checkbox label="地推活动" name="type"></el-checkbox>
                <el-checkbox label="线下主题活动" name="type"></el-checkbox>
                <el-checkbox label="单纯品牌曝光" name="type"></el-checkbox>
              </el-checkbox-group>
            </el-form-item>
            <el-form-item label="特殊资源">
              <el-radio-group v-model="form1.resource">
                <el-radio label="线上品牌商赞助"></el-radio>
                <el-radio label="线下场地免费"></el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="活动形式">
              <el-input type="textarea" v-model="form1.desc"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary">提交</el-button>
              <el-button>取消</el-button>
            </el-form-item>
          </el-form>
        </el-dialog>

      </el-row>
    </el-row>
	</div>

</template>

<script>
  export default {
    data() {
      return {
          tableData: [
            {id: '1',RKDH: '20180928095750787',PASN: '20180928095320545',BatchProcessing:'20180928095320399',operator:'夏文康',status:'已审核 '},
            {id: '2',RKDH: '20180928095750787',PASN: '20180928095320545',BatchProcessing:'20180928095320399',operator:'夏文康',status:'已审核 '},
            {id: '3',RKDH: '20180928095750787',PASN: '20180928095320545',BatchProcessing:'20180928095320399',operator:'夏文康',status:'已审核 '},
            {id: '4',RKDH: '20180928095750787',PASN: '20180928095320545',BatchProcessing:'20180928095320399',operator:'夏文康',status:'已审核 '},
          ],
          dialogVisible: false,
          dialogVisible1: false,
          form: {
            name: 'ssss',
            region: '',
            date1: '',
            date2: '',
            delivery: false,
            type: [],
            resource: '',
            desc: ''
          },
        form1: {
        name: 'ssss',
        quantity: '',
        unit: '',
        specification: '',
        batch: '',
        Traceablity:'',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
        },
      };
    },
    created() {

    },
    computed: {
    },
    mounted() {
      this.$refs
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
      compile(){
        this.$message({
          showClose: true,
          message: '这是一条消息提示'
        });      
      },
      deletes(){
        this.$message({
          showClose: true,
          message: '这是一条消息提示'
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
   #ProcessingAndStorage .container_padding th{
    line-height: 3rem;
    background: #eee;
    border-left: 1px solid #ccc;
   }
   #ProcessingAndStorage .container_padding th:first-child{
     border-left: 0;
   }
   #ProcessingAndStorage .container_padding td{
      text-align: center;
      line-height: 2.5rem;
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
   }
   #ProcessingAndStorage .container_padding td:first-child{
     padding-left: 1px;
   }
</style>
