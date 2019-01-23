import Login from './views/Login.vue'
import NotFound from './views/404.vue'
import Home from './views/Home.vue'
// import Main from './views/Main.vue'


//系统设置
import SystemuserManagement from './views/SystemManagement/SystemuserManagement.vue'//用户管理
import RoleManagement from './views/SystemManagement/RoleManagement.vue'//角色管理
import ProductionPlace from './views/SystemManagement/ProductionPlace.vue'//产地管理
import QVRCommodity from './views/SystemManagement/QVRCommodity.vue'//国标商品管理 
import QVRLassify from './views/SystemManagement/QVRLassify.vue'//国标分类管理 

//基础数据
import MaterialManagement from './views/BaseData/MaterialManagement.vue'//物料管理
import CategoryManagement from './views/BaseData/CategoryManagement.vue'//类别分类
import UnitofMeasurement from './views/BaseData/UnitofMeasurement.vue'//计量单位
import SupplierManagement from './views/BaseData/SupplierManagement.vue'//供应商管理 StoreManagement
import CustomerManagement from './views/BaseData/CustomerManagement.vue'//客户管理
import ProcessingManagement from './views/BaseData/ProcessingManagement.vue'//加工管理
import StoreManagement from './views/BaseData/StoreManagement.vue'//门店管理
import TentantManagement from './views/BaseData/tentantManagement.vue' //商户管理
import ProductStandard from './views/BaseData/ProductStandard.vue'//产品规格
import MyBusiness from './views/BaseData/MyBusiness.vue'//我的企业

//流通管理
import OutboundGoods from './views/CirculationManagement/OutboundGoods.vue'//商品出库
import ProcessingAndWarehousing from './views/CirculationManagement/ProcessingAndWarehousing.vue'//采购入库
import SalesOrder from './views/CirculationManagement/SalesOrder.vue'//销售订单
// test

//生产加工
import WorkSheetManagement from './views/ProductionAndProcessing/WorkSheetManagement.vue'//加工管理
import ProcessingAndStorage from './views/ProductionAndProcessing/ProcessingAndStorage.vue'//加工入库
import ProcessingOfWarehouse from './views/ProductionAndProcessing/ProcessingOfWarehouse.vue'//加工出库

//检验检疫
import InspectionReportUpload from './views/CIQ/InspectionReportUpload.vue'//检验报告上传 InspectionReportUpload

//平台管理
import BusinessAdministration from './views/PlatformManagement/BusinessAdministration.vue'//企业管理
import userManagement from './views/PlatformManagement/userManagement.vue'//用户管理

let routes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

let FullRoutes = [
    {
        path: '/login',
        component: Login,
        name: '',
        hidden: true
    },
    {
        path: '/404',
        component: NotFound,
        name: '',
        hidden: true
    },
    {
        path: '/',
        component: Home,
        name: '系统设置',
        iconCls: 'el-icon-setting',//图标样式class
        children: [
            { path: '/SystemuserManagement',component: SystemuserManagement, name: '用户管理',iconCls:'',children: []},
            { path: '/RoleManagement', component: RoleManagement,iconCls:'', name: '角色管理' ,children: []},
            { path: '/ProductionPlace', component: ProductionPlace,iconCls:'', name: '产地管理' ,children: []},
            { path: '/QVRLassify', component: QVRLassify,iconCls:'', name: '国标分类' ,children: []},
            { path: '/QVRCommodity', component: QVRCommodity,iconCls:'', name: '国标商品' ,children: []},
        ]
    },
    {
        path: '/',
        component: Home,
        name: '基础资料',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/MyBusiness', component: MyBusiness, name: '我的企业',iconCls:'',children: []},
            { path: '/MaterialManagement', component: MaterialManagement, name: '物料管理',iconCls:'',children: []},
            { path: '/CategoryManagement', component: CategoryManagement,name: '物料分类',iconCls:'' ,children: []},
            { path: '/UnitofMeasurement', component: UnitofMeasurement, name: '计量单位',iconCls:'',children: []},
            { path: '/ProductStandard', component: ProductStandard, name: '物料规格',iconCls:'',children: []},
            { path: '/SupplierManagement', component: SupplierManagement, name: '供应商管理',iconCls:'',children: []},
            { path: '/CustomerManagement', component: CustomerManagement, name: '客户管理',iconCls:'',children: []},
            { path: '/StoreManagement', component: StoreManagement, name: '门店管理',iconCls:'',children: []},
            { path: '/TentantManagement', component: TentantManagement,name: '商户管理',iconCls:'',children: []},
            { path: '/ProcessingManagement', component: ProcessingManagement,iconCls:'', name: '加工模板管理' ,children: []}

        ]
    },
    {
        path: '/',
        component: Home,
        name: '生产加工',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/', name: '生产任务管理',iconCls:'',children: []},
            { path: '/WorkSheetManagement', component: WorkSheetManagement, name: '生产加工单管理',iconCls:'',children: []},
            { path: '/ProcessingOfWarehouse', component: ProcessingOfWarehouse, name: '生产领料单管理',iconCls:'',children: []},
            { path: '/ProcessingAndStorage', component: ProcessingAndStorage,name: '生产入库单管理',iconCls:'' ,children: []},

        ]
    },
    {
        path: '/',
        component: Home,
        name: '流通管理',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/ProcessingAndWarehousing', component: ProcessingAndWarehousing, name: '采购入库单',iconCls:'',children: []},
            { path: '/SalesOrder', component: SalesOrder, name: '销售订单',iconCls:'',children: []},
            { path: '/OutboundGoods', component: OutboundGoods, name: '商品出库单',iconCls:'',children: []},

        ]
    },
    {
        path: '/',
        component: Home,
        name: '检疫检验',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/InspectionReportUpload', component: InspectionReportUpload, name: '检验证号上传',iconCls:'',children: []},

        ]
    },
    {
        path: '/',
        component: Home,
        name: '平台业务',
        iconCls: 'fa fa-id-card-o',
        children: [
            { path: '/BusinessAdministration', component: BusinessAdministration,iconCls:'', name: '企业管理' ,children: []},
            { path: '/userManagement', component: userManagement, name: '用户管理',iconCls:'',children: []},

        ]
    },
    {
        path: '*',
        hidden: true,
        redirect: { path: '/404' }
    }
];

export function CRoutes(data){
    let name = '',newRoutes;newRoutes = routes;
    data.forEach((v,i)=>{
        name = v.permissionName
        FullRoutes.forEach((v1,i1)=>{
            for(var o in FullRoutes[i1])
            {
                if(name == FullRoutes[i1][o])
                {
                    let obj ={}
                    obj.path = FullRoutes[i1].path
                    obj.component = FullRoutes[i1].component
                    obj.name = FullRoutes[i1].name
                    obj.iconCls = FullRoutes[i1].iconCls
                    obj.children = []
                    let children = v.children
                    let children1 = FullRoutes[i1].children;
                    let name1 = '';
                    children.forEach((v2,i2)=>{
                        name1 = v2.permissionName
                        children1.forEach((v3,i3)=>{
                            for(var w in v3)
                            {
                                if(name1 == v3[w])
                                {
                                    let obj1 ={}
                                    obj1=v3;
                                    obj.children.push(obj1)
                                }
                            }
                        })
                    })
                    newRoutes.push(obj)
                }
            }
        });
    })
    return newRoutes
}

//路由数据存储，防止刷新没了
let obj = JSON.parse(sessionStorage.getItem('newRoutes'))
if(obj)
{
    routes = CRoutes(obj);
}

export default {
    routes,
    ChangeRoutes(data){
        return CRoutes(data);
    },
};