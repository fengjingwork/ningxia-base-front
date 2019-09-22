const config = {
  public: {
    list: '/policyNewsController/webDataGrid.form',
    filter: '/policyDictionarydetailController/web_getbyTypeCode.form', //筛选过滤数据字典类型条件
    filterYear: '/policyNewsController/webgetyears.form',   //筛选过滤年份条件
    recommendList: '/policyNewsController/webRecommend.form',   //政策推荐列表
    article: '/policyNewsController/webGet.form',
    code: '/web_verifyCodeFrontController/web_getImage.form',  //获取验证码
    validate: '/web_verifyCodeFrontController/web_testCode.form',  //验证验证码
    industry: '/web_policyMatchingController/web_getIndustryList.form',   //获取行业
    login: '/web_loginRegisterController/web_userLoginNew.form',   //web_loginRegisterController/web_userLogin.form
    friend: '/websiteLinkController/webDataGrid.form',
    addlink:'/websiteLinkController/webInsert.form',
    updatelink:'/websiteLinkController/webUpdate.form',
    removelink:'/websiteLinkController/webDelete.form',
    datalist:'/loginLogController/webDataGrid.form',
    dataremove:'/loginLogController/webDelete.form',
    slide: '/slideShowController/webDataGrid.form',
    userselect:'/memberRoleController/webDataGridAll.form',
    userlist:'/memberRoleUserController/webfindUsers.form',
    userdelete:'/memberRoleUserController/webDeleteUser.form',
    userupadte:'/memberRoleUserController/webUpdateUser.form',
    userreset:'/memberRoleUserController/webresetUser.form',
    useradd:'/memberRoleUserController/webInsertUser.form',
    zidianlist:'/policyDictionarytypeController/webDataGrid.form',
    zidianadd:'/policyDictionarytypeController/webInsert.form',
    zidianupdate:'/policyDictionarytypeController/webUpdate.form',
    zidiandelete:'/policyDictionarytypeController/webDelete.form',
    leftmenulist:'/policyDictionarytypeController/webDataGridAll.form',
    detaillist:'/policyDictionarydetailController/webDataGrid.form',
    detailadd:'/policyDictionarydetailController/webInsert.form',
    detailupdate:'/policyDictionarydetailController/webUpdate.form',
    detailremove:'/policyDictionarydetailController/webDelete.form',
    memberadd:'/memberRoleController/webInsert.form',
    treelist:'/memberMenuController/webgetAll.form',
    treebacklist:'/memberRoleMenuController/webGetByRole.form',
    treeupdate:'/memberRoleMenuController/webUpdateByRole.form',
    zhaochaadd:'/policyQuestionController/webInsert.form',
    ddsearch:'/policyQuestionController/webFindByIndentCode.form'
  },
  home: {
    typeNum: '/policyNewsController/webindexNum.form',    //政策总数量接口
  },
  echarts: {
    enterpriseNum: '/web_statisticsController/web_getEnterpriseNumByYear.form',   //企业数量
    policyNum: '/policyNewsController/webstatistics.form',   //政策文件数量
    readNum: '/policyNewsController/webstatisticsTwo.form',   //政策点击数量
  },
  collect: {
    list: '/web_policyCollectController/web_dataGrid.form',   //获取政策收藏列表
    add: '/web_policyCollectController/web_collect.form',     //添加收藏
    delete: '/web_policyCollectController/web_deleteByUserIdAndNewsId.form',   //详情取消收藏
    listDelete: '/web_policyCollectController/web_delete.form',   //列表取消收藏
  },
  subscribe: {
    filter: '/web_policySubscribeController/web_getbyTypeCode.form',    //获取订阅政策筛选过滤数据字典类型条件
    echo: '/web_policySubscribeController/web_findByUserId.form',    //获取订阅设置回显
    submit: '/web_policySubscribeController/web_add.form'    //订阅设置提交
  },
  release: {
    listNew:'/policyNewsController/webfindTypeIn.form',
    listWait: '/policyNewsController/webfindPending.form',
    listAlready: '/policyNewsController/webfindHandled.form',
    listNo: '/policyNewsController/webfindDelete.form',
    tab: '/policyNewsController/webfindPending.form',
    details: '/policyNewsController/webSelect.form',
    add:'/policyNewsController/webInsert.form',
    edit: '/policyNewsController/webUpdate.form',
    state: '/policyNewsController/webUpdateStatus.form',
    delete: '/policyNewsController/webDelete.form',
    newdelete:'/policyNewsController/webDeleteNew.form',
    industry: '/policyLevelController/webgetIndustry.form',
    updatefile:'/policyNewsController/webUploadImage.form',
  },
  problem:{
    list:'/policyQuestionController/webDataGrid.form',
    select:'/dictionaryDetailController/web_datagrid2.form',
    detail:'/policyQuestionController/webFindByIndentCode.form',
    submit:'/policyQuestionController/webUpdate.form',
    delete:'/policyQuestionController/webDelete.form'
  },
  syscon:{
    upload:'/slideShowController/web_uploadImage.form',
    add:'/slideShowController/webInsert.form',
    delete:'/slideShowController/webDelete.form',
    update:'/slideShowController/webUpdate.form'
  },
  match: {
    echo: '/web_policyMatchingController/web_getPolicyMatching.form',
    save: '/web_policyMatchingController/web_addPolicyMatching.form',
    submit: '/web_policyMatchingController/web_runPolicyMatching.form',
    list: '/web_policyMatchingController/web_getNewsList.form'
  },
  user: {
    password: '/web_loginRegisterController/web_modifyPassword.form'
  }
};

export default config
