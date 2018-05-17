import Vue from 'vue'
require("../../API/config")
import notice from '../assets/notice'
import login from '../assets/login'
import sign from '../assets/sign'
import info from '../assets/info'
import approval from '../assets/approval'
export default {
    // 签到-----------------------------------
    // 日常-导出签到数据
    getsignWebSignDailyExport({ }, postdata) {
        return sign.signWebSignDailyExport(global.signWebSignDailyExportPath, postdata)
    },
    // 日常-按月统计签到信息
    getsignWebSignDailyStatistics({ }, postdata) {
        return sign.signWebSignDailyStatistics(global.signWebSignDailyStatisticsPath, postdata)
    },
    // 日常-按月查询我的签到列表详情
    getsignWebSignDailylist({ }, postdata) {
        return sign.signWebSignDailylist(global.signWebSignDailylistPath, postdata)
    },
    // 外出-按月查询我的签到列表详情
    getsignWebSignOutlist({ }, postdata) {
        return sign.signWebSignOutlist(global.signWebSignOutlistPath, postdata)
    },
    // 外出-按月统计签到信息
    getsignWebSignOutStatistics({ }, postdata) {
        return sign.signWebSignOutStatistics(global.signWebSignOutStatisticsPath, postdata)
    },
    // 外出-导出签到数据
    getsignWebSignOutExport({ }, postdata) {
        return sign.signWebSignOutExport(global.signWebSignOutExportPath, postdata)
    },
    // 签到设置
    getsignWebSignOutsetting({ }, postdata) {
        return sign.signWebSignOutsetting(global.signWebSignOutsettingPath, postdata)
    },
    // 查看企业签到设置
    getsignWebSignOutgetsetting({ }, postdata) {
        return sign.signWebSignOutgetsetting(global.signWebSignOutgetsettingPath, postdata)
    },



    // 资讯-------------------------------------
    // 资讯-新增资讯接口
    getinfoinsertinfo({ }, postdata) {
        return info.infoinsertinfo(global.infoinsertinfoPath, postdata)
    },
    // 资讯-查询资讯目录结构
    getinfoselectparent({ }, postdata) {
        return info.infoselectparent(global.infoselectparentPath, postdata)
    },
    // 资讯-新增目录结构
    getinfoinsertcatalog({ }, postdata) {
        return info.infoinsertcatalog(global.infoinsertcatalogPath, postdata)
    },
    // 资讯-分页查询资讯类目列表
    getinfoinsertinfo({ }, postdata) {
        return info.infoinsertinfo(global.infoinsertinfoPath, postdata)
    },
    // 资讯-删除类目
    getinfodeleteparent({ }, postdata) {
        return info.infodeleteparent(global.infodeleteparentPath, postdata)
    },
    // 资讯-批量删除资讯
    getinfodeleteinfo({ }, postdata) {
        return info.infodeleteinfo(global.infodeleteinfoPath, postdata)
    },
    // 资讯-类目修改
    getinfoupdateparent({ }, postdata) {
        return info.infoupdateparent(global.infoupdateparentPath, postdata)
    },
    // 资讯-资讯修改
    getinfoupdateinfo({ }, postdata) {
        return info.infoupdateinfo(global.infoupdateinfoPath, postdata)
    },
    // 资讯-类目排序接口
    getinfoupdatecatalogsort({ }, postdata) {
        return info.infoupdatecatalogsort(global.infoupdatecatalogsortPath, postdata)
    },
    // 资讯-资讯排序接口
    getinfoupdateinfosort({ }, postdata) {
        return info.infoupdateinfosort(global.infoupdateinfosortPath, postdata)
    },
    // 资讯-资讯隐藏显示接口
    getinfoupdateinfoshow({ }, postdata) {
        return info.infoupdateinfoshow(global.infoupdateinfoshowPath, postdata)
    },
    // 资讯-类目隐藏显示接口
    getinfoupdatecatalogshow({ }, postdata) {
        return info.infoupdatecatalogshow(global.infoupdatecatalogshowPath, postdata)
    },


    // 审批-------------------------------------
    // 审批-审批模板列表
    getapprovalmodellist({ }, postdata) {
        return approval.approvalmodellist(global.approvalmodellistPath, postdata)
    },
    // 审批-审批模板排序
    getapprovalmodelsort({ }, postdata) {
        return approval.approvalmodelsort(global.approvalmodelsortPath, postdata)
    },
    // 审批-编辑表单-未完成
    getapprovalm1odellist({ }, postdata) {
        return approval.approvalm2odellist(global.approvalmodellistPath, postdata)
    },
    // 审批-默认审批流程（不分条件）-未完成
    getapprovalm2odellist({ }, postdata) {
        return approval.approval3modellist(global.approvalmodellistPath, postdata)
    },
    // 审批-分条件审批流程-未完成
    getapproval3modellist({ }, postdata) {
        return approval.approval4modellist(global.approvalmodellistPath, postdata)
    },
    // 审批-设置审批模板是否停用
    getapprovalmodelisdisabled({ }, postdata) {
        return approval.approvalmodelisdisabled(global.approvalmodelisdisabledPath, postdata)
    },
    // 审批-移动某个审批模板到其他分组中
    getapprovalmodelmoveto({ }, postdata) {
        return approval.approvalmodelmoveto(global.approvalmodelmovetoPath, postdata)
    },
    // 审批-创建新审批-未完成
    getapproval4modellist({ }, postdata) {
        return approval.approvalm5odellist(global.approvalmodellistPath, postdata)
    },
    // 审批-新建分组-重命名分组
    getapprovalcategorycreateorrename({ }, postdata) {
        return approval.approvalcategorycreateorrename(global.approvalcategorycreateorrenamePath, postdata)
    },
    // 审批-分组排序
    getapprovalcategorysort({ }, postdata) {
        return approval.approvalcategorysort(global.approvalcategorysortPath, postdata)
    },
    // 审批-删除分组
    getapprovalcategorydelete({ }, postdata) {
        return approval.approvalcategorydelete(global.approvalcategorydeletePath, postdata)
    },
    // 审批-导出审批数据-未完成
    getapprovalc2ategorycreateorrename({ }, postdata) {
        return approval.approvalcategorycreat1eorrenames(global.approvalcategorycreat1eorrenamePath, postdata)
    },
    // 审批-查询审批数据列表
    getapprovaldatalist({ }, postdata) {
        return approval.approvaldatalist(global.approvaldatalistPath, postdata)
    },
    // 审批-分页获取审批导出记录列表
    getapprovaldataexportlog({ }, postdata) {
        return approval.approvaldataexportlog(global.approvaldataexportlogPath, postdata)
    },





    // 登陆-------------------------------------
    // 登陆-
    getapipassportuserloginpwd({ }, postdata) {
        return login.apipassportuserloginpwd(global.apipassportuserloginpwdPath, postdata)
    },
    // 上传
    getfileuploadPic({ }, postdata) {
        return login.fileuploadPic(global.fileuploadPicPath, postdata)
    },








    // 公告-------------------------------------
    // 公告-查询公告列表接口
    getapinoticeselectnoticepage({ }, postdata) {
        return notice.apinoticeselectnoticepage(global.apinoticeselectnoticepagePath, postdata)
    },
    // 公告-公告详情
    getapinoticeselectnoticedetail({ }, postdata) {
        return notice.apinoticeselectnoticedetail(global.apinoticeselectnoticedetailPath, postdata)
    },
    // 公告-新增公共
    getapinoticeinsertnoticepage({ }, postdata) {
        return notice.apinoticeinsertnoticepage(global.apinoticeinsertnoticepagePath, postdata)
    }
}
