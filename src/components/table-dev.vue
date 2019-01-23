<template>
<table  class="table-dev" cellspacing="0" cellpadding="0" border="0" style="margin: 0 auto;border: 1px solid #ccc;width:100%">
    <thead>
        <tr>
        <th  colspan="1" style="text-align:center;width:7%" rowspan="1">ID</th>
        <th colspan="1" style="text-align:center;width:7%" rowspan="1">企业名称</th>
        <th colspan="1" style="text-align:center;width:7%" rowspan="1">经营地址</th>
        <th colspan="1" style="text-align:center;width:7%" rowspan="1">统一社会代码/证件号码</th>
        <th colspan="1" style="text-align:center;width:7%" rowspan="1">法定代表人</th>
        <th colspan="1" style="text-align:center;width:7%" rowspan="1">联系电话</th>
        <th colspan="1" style="text-align:center;width:7%" rowspan="1">企业类型</th>
        <th colspan="1" style="text-align:center;width:10%" rowspan="1">经营领域主营业务</th>
        <th colspan="1" style="text-align:center;width:7%" rowspan="1">追溯节点码</th>
        <th colspan="1" style="text-align:center;width:4%" rowspan="1">企业简称</th>
        <th colspan="1" style="text-align:center;width:7%" rowspan="1">企业节点码</th>
        <th colspan="1" style="text-align:center;width:7%" rowspan="1">经营范围</th>
        <th colspan="1" style="text-align:center;width:7%" rowspan="1">操作</th>
        </tr>
    </thead>
    <tbody>
        <tr v-for="items in data">
            <td v-for="citem in items">{{ citem.name }}</td>
        </tr>
        <!-- <td><div class="cell">{{ items.id }}</div></td>
        <td><div class="cell">{{ items.CompanyName }}</div></td>
        <td><div class="cell">{{ items.BusinessAddress }}</div></td>
        <td><div class="cell">{{ items.Number }}</div></td>
        <td><div class="cell">{{ items.representative }}</div></td>
        <td><div class="cell">{{ items.info }}</div></td>
        <td><div class="cell">{{ items.info }}</div></td>
        <td><div class="cell">{{ items.info }}</div></td>
        <td><div class="cell">{{ items.info }}</div></td>
        <td><div class="cell">{{ items.info }}</div></td>
        <td><div class="cell">{{ items.info }}</div></td>
        <td><div class="cell">{{ items.info }}</div></td>
        <td><div class="cell"><a><i class="el-icon-edit"></i></a>  <a><i class="el-icon-delete"></i></a></div></td> -->

    </tbody>
</table>
</template>

<script>
  import deivce_functions from '@/assets/js/utility.js';
  export default {
    data() {
      return {
        newDataList: this.DataList,
        newDataHeader: this.DataHeader,
        data:[
            [{name:1}],
            [{name:1}],
            [{name:1}],
            [{name:1}],
        ]
      }
    },
    props: ['DataList', 'DataHeader', 'DataAttr','optionCurr'],
    mounted () {

    },
    watch: {
      DataList: function (val) {
        this.newDataList = val;
      },
      DataHeader: function (val) {
        this.newDataHeader = val;
      }
    },
    methods: {

    },
    computed: {

    }
  }
</script>

<style lang="scss" scoped>
  .table-dev {
    th{
        line-height: 3rem;
        background: #eee;
        border-left: 1px solid #ccc;
    }
    th:first-child{
        border-left: 0;
    }
    td{
        text-align: center;
        line-height: 2.5rem;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
    }
    td:first-child{
        padding-left: 1px;
    }
  }
</style>