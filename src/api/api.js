import axios from 'axios'
import qs from 'qs';

//axios.defaults.baseURL = 'http://27.115.48.247:8090/';
//let serverUrl = 'http://e.shianxian.cn:80/api' //生产环境
//let serverUrl = 'http://e.test.shianxian.cn:80/api/'  //测试环境
let serverUrlLogin = 'http://test.sso.shianxian.cn/'  //开发环境
let serverUrl = 'http://test.api.shianxian.cn/'  //开发环境
//let serverUrl = 'http://127.0.0.1:80/api' //本地调试时 
//let serverUrl = 'http://localhost.shianxian.cn/api/' //
// let serverUrlLogin = 'http://localhost.web.shianxian.cn/sso' //dev login环境
// let serverUrl = 'http://localhost.web.shianxian.cn/api' //dev环境
axios.defaults.withCredentials = true;

export function AjaxPost(url, data, config){
    return new Promise((resolve, reject) => {
        axios.post(url,data,config)
        .then(response => {
            response.data.status = response.status
            resolve(response.data);
        }, err => {
            err.data = err.response.data
            err.data.status = err.response.status
            resolve(err.data);
        })
        .catch((error) => {
            reject(error)
        })
    })
}

export function AjaxGet(url, data, config){
    return new Promise((resolve, reject) => {
        axios.get(url, data, config)
            .then(function(response){
                response.data.status = response.status
                resolve(response.data);
            }, err => {
                err.data = err.response.data
                err.data.status = err.response.status
                resolve(err.response);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export function AjaxDelete(url, data, config){
    return new Promise((resolve, reject) => {
        axios.delete(url, data, config)
            .then(function(response){
                response.data.status = response.status
                resolve(response.data);
            }, err => {
                err.data = err.response.data
                err.data.status = err.response.status
                resolve(err.response);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export function AjaxPut(url, data, config){
    return new Promise((resolve, reject) => {
        axios.put(url, data, config)
            .then(function(response){
                response.data.status = response.status
                resolve(response.data);
            }, err => {
                err.data = err.response.data
                err.data.status = err.response.status
                resolve(err.response);
            })
            .catch((error) => {
                reject(error)
            })
    })
}

export default{

    //登录
    Login(data){
        return AjaxPost(serverUrlLogin+"/login",qs.stringify(data),axios.config);
    },
    //退出登录
    Logout(){
        return AjaxGet(serverUrlLogin+"/logout"); 
    },
    //运输信息
    carriage_saveOrUpdateCarriage(data){
        return AjaxPost(serverUrl+"/carriage/saveOrUpdateCarriage",qs.stringify(data),axios.config);
    },
    //图片上传
    CommonUpload_uploadImages(data){
        return AjaxPost(serverUrl+"/upload/uploadImages",data,{headers: {"Content-Type": "multipart/form-data"}});   
    },

    /*
      系统设置  
    */
    //企业管理
    BusinessAdministration_info(data){
        return AjaxGet(serverUrl+"/company/selectByLike",{params: data},axios.config); 
    },
    //修改
    BusinessAdministration_Edit(data){
        debugger
        return AjaxPut(serverUrl+"/company/updateCompany",data,axios.config);
    },
    //删除
    BusinessAdministration_Delete(data){
        return AjaxDelete(serverUrl+"/company/deleteCompany",{params: data},axios.config);
    },
    // /company/selectByCode
    BusinessAdministration_selectByCode(data){
        return AjaxGet(serverUrl+"/company/selectByCode",{params: data},axios.config); 
    },
    BusinessAdministration_selectByEnable(data){
        return AjaxGet(serverUrl+"/company/selectByEnable",{params: data},axios.config); 
    },
   // /company/checkCompany
    SystemuserManagement_checkCompany(data){
        return AjaxPut(serverUrl+"/company/checkCompany",qs.stringify(data),axios.config);
    },

    //系统用户管理
    SystemuserManagement_info(data){
        return AjaxGet(serverUrlLogin+"/user/selectUserByPage",{params: data},axios.config);
    },
    //新增
    SystemuserManagement_add(data){
        return AjaxPost(serverUrlLogin+"/user/saveUser",qs.stringify(data),axios.config);
    },
    //修改
    SystemuserManagement_Edits(data){
        return AjaxPut(serverUrlLogin+"/user/updateUserById",qs.stringify(data),axios.config);
    },
    //删除
    SystemuserManagement_Delete(data){
        return AjaxDelete(serverUrlLogin+"/user/deleteUser",{params: data},axios.config);
    },
    //密码修改
    SystemuserManagement_MMEdit(data){
        return AjaxPut(serverUrlLogin+"/user/updatePassword",qs.stringify(data),axios.config);
    },

    //用户管理
    userManagement_info(data){
        return AjaxGet(serverUrlLogin+"/user/selectUserByPage",{params: data},axios.config);
    },
    //新增
    userManagement_add(data){
        return AjaxPost(serverUrlLogin+"/user/saveUser",qs.stringify(data),axios.config);
    },
    //修改
    userManagement_Edits(data){
        return AjaxPut(serverUrlLogin+"/user/updateUserById",qs.stringify(data),axios.config);
    },
    //删除
    userManagement_Delete(data){
        return AjaxDelete(serverUrlLogin+"/user/deleteUser",{params: data},axios.config);
    },
    //密码修改
    userManagement_MMEdit(data){
        return AjaxPut(serverUrlLogin+"/user/updatePassword",qs.stringify(data),axios.config);
    },


    //角色管理 
    RoleManagement_info(data){
        return AjaxGet(serverUrlLogin+"/role/selectRoleByPage",{params: data},axios.config);
    },
    //新增
    RoleManagement_adds(data){
        return AjaxPost(serverUrlLogin+"/role/saveOrUpdateRole",qs.stringify(data),axios.config);
    },
    //修改 
    RoleManagement_Edits(data){
        return AjaxPost(serverUrlLogin+"/role/saveOrUpdateRole",qs.stringify(data),axios.config);      
    },
    //删除
    RoleManagement_Delete(data){
        return AjaxDelete(serverUrlLogin+"/role/deleteRole",{params: data},axios.config);
    },
    //
    RoleManagement_Roles(data){
        return AjaxGet(serverUrlLogin+"/permission/selectPermissionByRoleId/"+data,data,axios.config);
    },
    //
    RoleManagement_RolesSetting(data){
        debugger
        return AjaxPost(serverUrlLogin+"/rolePermission/saveRolePermission",data,{headers:{post:{'Content-Type':'application/json;charset=UTF-8'}}});   
    },

    //产地
    ProductionPlace_info(data){
        return AjaxGet(serverUrl+"/area/selectAreaByPage",{params: data},axios.config);
    },
    //add
    ProductionPlace_adds(data){
        return AjaxPost(serverUrl+"/area/saveArea",qs.stringify(data),axios.config);
    },
    //e
    ProductionPlace_Edits(data){
        return AjaxPost(serverUrl+"/area/saveArea",qs.stringify(data),axios.config);
    },
    //de /area/deleteArea
    ProductionPlace_Delete(data){
        return AjaxDelete(serverUrl+"/area/deleteArea",{params: data},axios.config);  
    },

    //国标分类
    QVRLassify_info(data){
        return AjaxGet(serverUrl+"/pmdmType/selectPmdmTypeByPage",{params: data},axios.config);
    },
    //
    QVRLassify_adds(data){
        return AjaxPost(serverUrl+"/pmdmType/savePmdmType",qs.stringify(data),axios.config);      
    },
    //
    QVRLassify_Edits(data){
        return AjaxPost(serverUrl+"/pmdmType/savePmdmType",qs.stringify(data),axios.config);      
    },
    //
    QVRLassify_Delete(data){
        return AjaxDelete(serverUrl+"/pmdmType/deletePmdmType",{params: data},axios.config);    
    },


    //国标商品
    QVRCommodity_info(data){
        return AjaxGet(serverUrl+"/pmdm/selectPmdmByPage",{params: data},axios.config);
    },
    //
    QVRCommodity_adds(data){
        return AjaxPost(serverUrl+"/pmdm/savePmdm",qs.stringify(data),axios.config);      
    },
    //
    QVRCommodity_Edits(data){
        return AjaxPut(serverUrl+"/pmdm/updatePmdm",qs.stringify(data),axios.config); 
    },
    //
    QVRCommodity_Delete(data){
        return AjaxDelete(serverUrl+"/pmdm/deletePmdm",{params: data},axios.config);    
    },
    
    //商户管理
    //
    Tentant_update(data){
        return AjaxPost(serverUrl+"/tenant/saveOrUpdateTenant",qs.stringify(data),axios.config);
    },
    Tentant_del(data){
        return AjaxDelete(serverUrl+"/tenant/deleteTenant",{params: data},axios.config);
    },
    Tentant_ByID(data){
        return AjaxGet(serverUrl+"/tenant/selectTenantById",{params: data},axios.config);
    },
    Tentant_ByPage(data){
        return AjaxGet(serverUrl+"/tenant/selectTenantByPage",{params: data},axios.config);
    },

    //物料管理
    MaterialManagement_info(data){
        return AjaxGet(serverUrl+"/material/selectMaterialByPage",{params: data},axios.config);
    },
    //新增
    MaterialManagement_adds(data){
        return AjaxPost(serverUrl+"/material/saveOrUpdateMaterial",qs.stringify(data),axios.config);
    },
    //修改 
    MaterialManagement_Edits(data){
        return AjaxPost(serverUrl+"/material/saveOrUpdateMaterial",qs.stringify(data),axios.config);  
    },
    //删除
    MaterialManagement_Delete(data){
        return AjaxDelete(serverUrl+"/material/deleteMaterial",{params: data},axios.config);
    },  
    

    //类别管理
    CategoryManagement_info(data){
        debugger
        return AjaxGet(serverUrl+"category/selectCategoryByPage",{params: data},axios.config);
    },
    //新增
    CategoryManagement_adds(data){
        return AjaxPost(serverUrl+"/category/saveOrUpdateCategory",qs.stringify(data),axios.config);       
    },
    //修改
    CategoryManagement_Edits(data){
        return AjaxPost(serverUrl+"/category/saveOrUpdateCategory",qs.stringify(data),axios.config);  
    },
    //删除
    CategoryManagement_Delete(data){
        return AjaxDelete(serverUrl+"/category/deleteCategory",{params: data},axios.config);
    },  


    //计量单位
    UnitofMeasurement_info(data){
        return AjaxGet(serverUrl+"/unit/selectUnitByPage",{params: data},axios.config);     
    },
    //新增
    UnitofMeasurement_adds(data){
        return AjaxPost(serverUrl+"/unit/saveOrUpdateUnit",qs.stringify(data),axios.config);       
    },
    //修改
    UnitofMeasurement_Edits(data){
        return AjaxPost(serverUrl+"/unit/saveOrUpdateUnit",qs.stringify(data),axios.config);       
    },
    //删除
    UnitofMeasurement_Delete(data){
        return AjaxDelete(serverUrl+"/unit/deleteUnit",{params: data},axios.config);
    },

    //产品规格
    ProductStandard_info(data){
        return AjaxGet(serverUrl+"/standard/selectStandardByPage",{params: data},axios.config);     
    },
    //新增
    ProductStandard_adds(data){
        return AjaxPost(serverUrl+"/standard/saveOrUpdateStandard",qs.stringify(data),axios.config);       
    },
    //修改
    ProductStandard_Edits(data){
        return AjaxPost(serverUrl+"/standard/saveOrUpdateStandard",qs.stringify(data),axios.config);       
    },
    //删除
    ProductStandard_Delete(data){
        return AjaxDelete(serverUrl+"/standard/deleteStandard",{params: data},axios.config);
    },


    //供应商
    SupplierManagement_info(data){
        return AjaxGet(serverUrl+"/supplier/selectSupplierByPage",{params: data},axios.config);    
    },
    //新增
    SupplierManagement_adds(data){
        return AjaxPost(serverUrl+"/supplier/saveOrUpdateSupplier",qs.stringify(data),axios.config);  
    },
    //修改
    SupplierManagement_Edits(data){
        return AjaxPost(serverUrl+"/supplier/saveOrUpdateSupplier",qs.stringify(data),axios.config);   
    },
    //删除
    SupplierManagement_Delete(data){
        return AjaxDelete(serverUrl+"/supplier/deleteSupplier",{params: data},axios.config);
    },


    //客户管理
    CustomerManagement_info(data){
        return AjaxGet(serverUrl+"/customer/selectCustomerByPage",{params: data},axios.config); 
    },
    //新增
    CustomerManagement_adds(data){
        return AjaxPost(serverUrl+"/customer/saveOrUpdateCustomer",qs.stringify(data),axios.config);  
    },
    //修改
    CustomerManagement_Edits(data){
        return AjaxPost(serverUrl+"/customer/saveOrUpdateCustomer",qs.stringify(data),axios.config);  
    },
    //删除
    CustomerManagement_Delete(data){
        return AjaxDelete(serverUrl+"/customer/deleteCustomer",{params: data},axios.config);
    },


    //加工模板
    ProcessingManagement_info(data){
        return AjaxGet(serverUrl+"/processTemplate/selectProcessTemplateByPage",{params: data},axios.config);   
    },
    ProcessingManagement_infoChild(data){
        return AjaxGet(serverUrl+"/processTemplate/updateData",{params: data},axios.config);   
    },
    //新增
    ProcessingManagement_adds(data){
        return AjaxPost(serverUrl+"/processTemplate/saveOrUpdateProcessTemplate",data,{headers:{post:{'Content-Type':'application/json;charset=UTF-8'}}});  
    },
    //修改
    ProcessingManagement_Edits(data){
        return AjaxPost(serverUrl+"/processTemplate/saveOrUpdateProcessTemplate",data,{headers:{post:{'Content-Type':'application/json;charset=UTF-8'}}});  
    },
    //删除
    ProcessingManagement_Delete(data){
        return AjaxDelete(serverUrl+"/processTemplate/deleteProcessTemplate",{params: data},axios.config);
    },


    //采购入库管理
    ProcessingAndWarehousing_info(data){
        return AjaxGet(serverUrl+"/purchaseInOrder/selectPurchaseInOrderByPage",{params: data},axios.config);   
    },
    ProcessingAndWarehousing_infoChild(data){
        return AjaxGet(serverUrl+"/purchaseInOrder/selectPurchaseInOrderDetailByPage",{params: data},axios.config);    
    },
    //新增
    ProcessingAndWarehousing_adds(data){
        return AjaxPost(serverUrl+"/purchaseInOrder/saveOrUpdatePurchaseInOrder",data,{headers:{post:{'Content-Type':'application/json;charset=UTF-8'}}}); 
    },
    //修改
    ProcessingAndWarehousing_Edits(data){
        return AjaxPost(serverUrl+"/purchaseInOrder/saveOrUpdatePurchaseInOrder",data,{headers:{post:{'Content-Type':'application/json;charset=UTF-8'}}});  
    },
    //删除
    ProcessingAndWarehousing_Delete(data){
        return AjaxDelete(serverUrl+"/purchaseInOrder/deletePurchaseInOrder",{params: data},axios.config);
    },
    //status AjaxPut
    ProcessingAndWarehousing_status(data){
        return AjaxPut(serverUrl+"/purchaseInOrder/updatePurchaseInOrderById",qs.stringify(data),axios.config);
    },
    //Delete childs
    ProcessingAndWarehousing_infoChild_Delete(data){
        return AjaxDelete(serverUrl+"/purchaseInOrder/deletePurchaseInOrderById",{params: data},axios.config);
    },


    //销售单
    SalesOrder_info(data){
        return AjaxGet(serverUrl+"/saleOrder/selectSaleOrderByPage",{params: data},axios.config);   
    },
    //
    SalesOrder_infoChild(data){
        debugger
        return AjaxGet(serverUrl+"/saleOrder/selectSaleOrderDetailByPage",{params: data},axios.config);    
    },
    //新增
    SalesOrder_adds(data){
        return AjaxPost(serverUrl+"/saleOrder/saveOrUpdateSaleOrder",data,{headers:{post:{'Content-Type':'application/json;charset=UTF-8'}}}); 
    },
    //修改
    SalesOrder_Edits(data){
        return AjaxPost(serverUrl+"/saleOrder/saveOrUpdateSaleOrder",data,{headers:{post:{'Content-Type':'application/json;charset=UTF-8'}}}); 
    },
    //删除
    SalesOrder_Delete(data){
        return AjaxDelete(serverUrl+"/saleOrder/deleteSaleOrder",{params: data},axios.config);
    },
    //status AjaxPut
    SalesOrder_status(data){
        return AjaxPut(serverUrl+"/saleOrder/updateSaleOrderById",qs.stringify(data),axios.config);
    },
    //Delete childs
    SalesOrder_infoChild_Delete(data){
        return AjaxDelete(serverUrl+"/saleOrder/deleteSaleOrderDetailById",{params: data},axios.config);
    },

    //商品出库/goodsOutOrder/selectGoodsOutOrderDetailByPage
    OutboundGoods_info(data){
        return AjaxGet(serverUrl+"/goodsOutOrder/selectGoodsOutOrderByPage",{params: data},axios.config);   
    },
    OutboundGoods_infoChild(data){
        return AjaxGet(serverUrl+"/goodsOutOrder/selectGoodsOutOrderDetailByPage",{params: data},axios.config);    
    },
    //新增
    OutboundGoods_adds(data){
        return AjaxPost(serverUrl+"/goodsOutOrder/saveOrUpdateGoodsOutOrder",data,{headers:{post:{'Content-Type':'application/json;charset=UTF-8'}}}); 
    },
    //修改
    OutboundGoods_Edits(data){
        return AjaxPost(serverUrl+"/goodsOutOrder/saveOrUpdateGoodsOutOrder",data,{headers:{post:{'Content-Type':'application/json;charset=UTF-8'}}}); 
    },
    //
    OutboundGoods_Delete(data){
        return AjaxDelete(serverUrl+"/goodsOutOrder/deleteGoodsOutOrder",{params: data},axios.config);
    },
    //status AjaxPut
    OutboundGoods_status(data){
        return AjaxPut(serverUrl+"/goodsOutOrder/updateGoodsOutOrderById",qs.stringify(data),axios.config);
    },
    OutboundGoods_infoChild_Delete(data){
        return AjaxDelete(serverUrl+"/goodsOutOrder/deleteGoodsOutOrderDetailById",{params: data},axios.config);
    },

    //加工单
    WorkSheetManagement_info(data){
        return AjaxGet(serverUrl+"/processOrder/selectProcessOrderByCompany",{params: data},axios.config);   
    },
    WorkSheetManagement_infoChild(data){
        return AjaxGet(serverUrl+"/processOrder/processTemplate",{params: data},axios.config);    
    },
    //新增
    WorkSheetManagement_adds(data){
        return AjaxPost(serverUrl+"/processOrder/saveOrUpdateProcessOrder",data,{headers:{post:{'Content-Type':'application/json;charset=UTF-8'}}}); 
    },
    //修改
    WorkSheetManagement_Edits(data){
        return AjaxPost(serverUrl+"/processOrder/saveOrUpdateProcessOrder",data,{headers:{post:{'Content-Type':'application/json;charset=UTF-8'}}});  
    },
    //删除
    WorkSheetManagement_Delete(data){
        return AjaxDelete(serverUrl+"/processOrder/deleteProcessOrder",{params: data},axios.config);
    },
    //status AjaxPut
    ProcessingAndWarehousing_status(data){
        return AjaxPut(serverUrl+"/purchaseInOrder/updatePurchaseInOrderById",qs.stringify(data),axios.config);
    },
    //Delete childs
    WorkSheetManagement_infoChild_Delete_product(data){
        return AjaxDelete(serverUrl+"/processOrderInDetail/deleteProcessOrderInDetail",{params: data},axios.config);
    },
    WorkSheetManagement_infoChild_Delete_material(data){
        return AjaxDelete(serverUrl+"/processOrderOutDetail/deleteProcessOrderOutDetail",{params: data},axios.config);
    },


    //原料出库
    ProcessingOfWarehouse_info(data){
        return AjaxGet(serverUrl+"/processOrderOutDetail/selectProcessOrderOutDetailByPage",{params: data},axios.config);   
    },
    //删除
    ProcessingOfWarehouse_Delete(data){
        return AjaxDelete(serverUrl+"/processOrderOutDetail/deleteProcessOrderOutDetail",{params: data},axios.config);
    },
    //商品入库
    ProcessingAndStorage_info(data){
        return AjaxGet(serverUrl+"/processOrderInDetail/selectProcessOrderInDetailByPage",{params: data},axios.config);   
    },
    //删除
    ProcessingAndStorage_Delete(data){
        return AjaxDelete(serverUrl+"/processOrderInDetail/deleteProcessOrderInDetail",{params: data},axios.config);
    },

    //检验检疫
    //保存修改
    Quarantine_update(data){
        return AjaxPut(serverUrl+"/quarantine/saveAndUpdateQuarantine",qs.stringify(data),axios.config);
    },
    //删除
    Quarantine_del(data){
        return AjaxDelete(serverUrl+"/quarantine/deleteQuarantine",{params: data},axios.config);
    } ,
    //模糊查询入库信息
    Quarantine_ByPage(data){
        return AjaxGet(serverUrl+"/quarantine/selectQuarantineByPage",{params: data},axios.config);
    },
}
//门店管理UI 三级联动 主框架新配路由 物料管理新UI 图片上传
//企业管理三级联动数据调整 计量单位 客户管理 产品规格 物料分类
//新供应商管理UI 角色管理新UI加权限功能走通 国标分类管理
//国标商品管理UI完成 我的企业UI及功能完成 图片上传功能及api走通 检验检疫管理UI完成
//企业管理字段功能修改 系统管理用户管理功能字段修改 平台管理用户管理UI 我的企业UI及功能完成 搭平台管理路由 新版api测试走login
//系统用户管理完成 角色管理完成 权限设置待完成 物料分类待完成
//权限设置完成 计量单位完成 产品规格完成 企业管理待完成
//国标分类完成 国标商品完成 我的企业完成 物料管理查询完成，新增功能待完成
//物料管理查询完成，新增功能完成,删除功能完成 加工模板新增完成
//加工模板修改问题完成 采购入库修改问题完成 销售单增删改查完成 平台业务-用户管理 修改显示问题