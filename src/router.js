export default [
    {
        path: '/',
        redirect: '/login'
    },
    {
        path: '/home',
        redirect: '/home/homePage'
    },
    {
        path: '/home/business',
        redirect: '/home/business/statistics'
    },
    {
        path: '/home/install',
        redirect: '/home/install/enterprise'
    },
    {
        path: '/home/notice',
        redirect: '/home/notice/opNotice'
    },
    {
        path: '/home/loglist',
        redirect: '/home/loglist/listLoglist'
    },
    {
        path: '/home/sign',
        redirect: '/home/sign/signManage'
    },
    {
        path: '/home/information',
        redirect: '/home/information/enterpriseformation'
    },
    {
        path: '/home/network',
        redirect: '/home/network/networkContent'
    },
    {
        path: '/home/examine',
        redirect: '/home/examine/approveManage'
    },
    {
        // 登陆
        path: '/login',
        component: function (resolve) {
            require(['./components/login.vue'], resolve)
        },
    },
    {
        // 首页
        path: '/home',
        component: function (resolve) {
            require(['./components/home.vue'], resolve)
        },
        children: [
            {
                // 首页
                path: 'homePage',
                component: function (resolve) {
                    require(['./components/homePage.vue'], resolve)
                }
            },
            {
                // 通讯录
                path: 'address',
                component: function (resolve) {
                    require(['./components/address/address.vue'], resolve)
                }
            },
            {
                // 工作台
                path: 'work',
                component: function (resolve) {
                    require(['./components/work/work.vue'], resolve)
                }
            },
            {
                // 企业数据
                path: 'business',
                component: function (resolve) {
                    require(['./components/business/business.vue'], resolve)
                },
                children: [
                    {
                        // 企业数据统计
                        path: 'statistics',
                        component: function (resolve) {
                            require(['./components/business/statistics/statistics.vue'], resolve)
                        }
                    },
                    {
                        // 企业数据管理员操作记录
                        path: 'adminlist',
                        component: function (resolve) {
                            require(['./components/business/adminlist/adminlist.vue'], resolve)
                        }
                    }
                ]
            },
            {
                // 设置
                path: 'install',
                component: function (resolve) {
                    require(['./components/install/install.vue'], resolve)
                },
                children: [
                    {
                        // 企业设置
                        path: 'enterprise',
                        component: function (resolve) {
                            require(['./components/install/enterprise/enterprise.vue'], resolve)
                        }
                    },
                    {
                        // 通讯录信息
                        path: 'communication',
                        component: function (resolve) {
                            require(['./components/install/communication/communication.vue'], resolve)
                        }
                    },
                    {
                        // 更换主管理员
                        path: 'mainmanag',
                        component: function (resolve) {
                            require(['./components/install/main-manag/mainmanag.vue'], resolve)
                        }
                    },
                    {
                        // 设置子管理员
                        path: 'sonmanag',
                        component: function (resolve) {
                            require(['./components/install/son-manag/sonmanag.vue'], resolve)
                        }
                    },
                    {
                        // 子管理员操作
                        path: 'opSonmanag',
                        component: function (resolve) {
                            require(['./components/install/son-manag/opSonmanag.vue'], resolve)
                        }
                    },
                    {
                        // 修改登陆密码
                        path: 'updatepwd',
                        component: function (resolve) {
                            require(['./components/install/updatepwd/updatepwd.vue'], resolve)
                        }
                    },
                    {
                        // 版本信息管理
                        path: 'versions',
                        component: function (resolve) {
                            require(['./components/install/versions/versions.vue'], resolve)
                        }
                    }
                ]
            },
            {
                // 工作台-公告
                path: 'notice',
                component: function (resolve) {
                    require(['./components/work/notice/notice.vue'], resolve)
                },
                children: [
                    {
                        // 工作台-公告-历史公告
                        path: 'listNotice',
                        component: function (resolve) {
                            require(['./components/work/notice/listNotice.vue'], resolve)
                        }
                    },
                    {
                        // 工作台-公告-发送公告
                        path: 'opNotice',
                        component: function (resolve) {
                            require(['./components/work/notice/opNotice.vue'], resolve)
                        }
                    }
                ]
            },
            {
                // 工作台-资讯
                path: 'information',
                component: function (resolve) {
                    require(['./components/work/information/information.vue'], resolve)
                },
                children: [
                    {   // 工作台-资讯-公司文化
                        path: 'enterpriseformation',
                        component: function (resolve) {
                            require(['./components/work/information/enterpriseformation.vue'], resolve)
                        },
                    },
                    {
                        // 工作台-资讯-培训资料
                        path: 'cultivateInformation',
                        component: function (resolve) {
                            require(['./components/work/information/cultivateInformation.vue'], resolve)
                        },
                        children: [
                            {
                                // 工作台-资讯-培训资料-入职培训
                                path: 'externalcultivateInformation',
                                component: function (resolve) {
                                    require(['./components/work/information/externalcultivateInformation.vue'], resolve)
                                }
                            },
                            {
                                // 工作台-资讯-培训资料-在职培训
                                path: 'interiorcultivateInformation',
                                component: function (resolve) {
                                    require(['./components/work/information/interiorcultivateInformation.vue'], resolve)
                                }
                            }
                        ]
                    },
                    {
                        // 工作台-资讯-公司制度
                        path: 'systemInformation',
                        component: function (resolve) {
                            require(['./components/work/information/systemInformation.vue'], resolve)
                        },
                        children: [
                            {
                                // 工作台-资讯-公司制度-列表
                                path: 'listinteriorcultivateInformation',
                                component: function (resolve) {
                                    require(['./components/work/information/listinteriorcultivateInformation.vue'], resolve)
                                }
                            },
                            {
                                // 工作台-资讯-公司制度-分类
                                path: 'typeinteriorcultivateInformation',
                                component: function (resolve) {
                                    require(['./components/work/information/typeinteriorcultivateInformation.vue'], resolve)
                                }
                            }
                        ]
                    }
                ]

            },
            {
                // 工作台-签到
                path: 'sign',
                component: function (resolve) {
                    require(['./components/work/sign/sign.vue'], resolve)
                },
                children: [
                    {
                        // 工作台-签到-日常签到
                        path: 'signManage',
                        component: function (resolve) {
                            require(['./components/work/sign/signManage.vue'], resolve)
                        },
                    },
                    {
                        // 工作台-签到-外出签到
                        path: 'signOut',
                        component: function (resolve) {
                            require(['./components/work/sign/signOut.vue'], resolve)
                        },
                    },
                    {
                        // 工作台-签到-签到设置
                        path: 'signSetting',
                        component: function (resolve) {
                            require(['./components/work/sign/signSetting.vue'], resolve)
                        },
                    },
                    {
                        // 工作台-签到-签到设置-新增
                        path: 'signAddSetting',
                        component: function (resolve) {
                            require(['./components/work/sign/signAddSetting.vue'], resolve)
                        },
                    },
                ]
            },
            {
                // 工作台-网盘
                path: 'network',
                component: function (resolve) {
                    require(['./components/work/network/network.vue'], resolve)
                },
                children: [
                    {   // 工作台-网盘-内容
                        path: 'networkContent',
                        component: function (resolve) {
                            require(['./components/work/network/networkContent.vue'], resolve)
                        },
                    },
                    {
                        // 工作台-网盘-详情
                        path: 'networkDetails',
                        component: function (resolve) {
                            require(['./components/work/network/networkDetails.vue'], resolve)
                        },
                    }
                ]

            },
            {
                // 工作台-日志
                path: 'loglist',
                component: function (resolve) {
                    require(['./components/work/loglist/loglist.vue'], resolve)
                },
                children: [
                    {
                        // 工作台-日志-历史日志
                        path: 'listLoglist',
                        component: function (resolve) {
                            require(['./components/work/loglist/listLoglist.vue'], resolve)
                        }
                    }
                ]
            },
            {
                // 工作台-审批
                path: 'examine',
                component: function (resolve) {
                    require(['./components/work/examine/examine.vue'], resolve)
                },
                children: [
                    {
                        // 工作台-审批列表
                        path: 'approveManage',
                        component: function (resolve) {
                            require(['./components/work/examine/approveManage.vue'], resolve)
                        }
                    },

                ]
            },
            {
                // 工作台-新建审批
                path: 'formDesign',
                component: function (resolve) {
                    require(['./components/work/examine/formDesign/formDesign.vue'], resolve)
                }
            },
        ]
    },
    {
        // 通讯录-团队邀请
        path: '/team',
        component: function (resolve) {
            require(['./components/address/team.vue'], resolve)
        }
    },
    {
        // 通讯录-批量导入/出
        path: '/excelUpload',
        component: function (resolve) {
            require(['./components/address/excelUpload.vue'], resolve)
        }
    }
]

