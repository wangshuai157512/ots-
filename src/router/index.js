import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

// 解决触发同一路由报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    children:[
      {
        path:'/index',
        name:'index',
        component:()=> import('@/views/index')
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    title: '题库',
    id: 'fp-1',
    icon: 'question-icon.png',
    children: [
      {
        path: '/questionManagement',
        name: 'questionManagement',
        component: ()=> import('@/views/4-0.vue'),
        id: 'fp-1.3',
        title: '试题管理',
        meta: { title: '试题管理', pageHtml: 'OTS-QuestionsManagement.html' },
      },
      {
        path: '/newQuestion',
        name: 'newQuestion',
        component: ()=> import('@/views/4-0.vue'),
        id: 'fp-1.1',
        title: '新建试题',
        meta: { title: '新建试题', pageHtml: 'OTS-NewTestQuestions.html' },
      },
      {
        path: '/importQuestion',
        name: 'importQuestion',
        component: ()=> import('@/views/4-0.vue'),
        id: 'fp-1.2',
        title: '导入试题',
        meta: { title: '导入试题', pageHtml: 'OTS-QuestionsImport.html' },
      },
      {
        path: '/questionStatistics',
        name: 'questionStatistics',
        component: ()=> import('@/views/4-0.vue'),
        id: 'fp-1.6',
        title: '题库统计',
        meta: { title: '题库统计', pageHtml: 'OTS-QuestionsSubjectDistribute.html' },
      },
      {
        path: '/questionMessage',
        name: 'questionMessage',
        component: ()=> import('@/views/4-0.vue'),
        id: 'fp-1.7',
        title: '消息列表',
        meta: { title: '消息列表', pageHtml: 'OTS-QuestionsImportInfo.html' },
      },
      {
        path: '/correction',
        name: 'correction',
        component: ()=> import('@/views/4-0.vue'),
        id: "fp-7.2",
        title: '纠错管理',
        meta: { title: '纠错管理', pageHtml: 'OTS-CorrectionManage.html' },
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    id: 'fp-2',
    title: '试卷',
    icon: 'paper-icon.png',
    children: [
      {
        path: '/createPaper-single',
        name: 'createPaper-single',
        component: ()=> import('@/views/4-0.vue'),
        id: 'fp-2.1',
        title: '单科组卷',
        meta: { title: '单科组卷', pageHtml: 'OTS-NewGroupTestPaper.html' },
      },
      {
        path: '/createPaper-Multiple',
        name: 'createPaper-Multiple',
        component: ()=> import('@/views/4-0.vue'),
        id: 'fp-2.4',
        title: '多科组卷',
        meta: { title: '多科组卷', pageHtml: 'OTS-ManyGroupTestPaper.html' },
      },
      {
        path: '/paperManagement',
        name: 'paperManagement',
        component: ()=> import('@/views/4-0.vue'),
        id: 'fp-2.2',
        title: '试卷管理',
        meta: { title: '试卷管理', pageHtml: 'OTS-TestPaperManage.html' },
      },
      {
        path: '/mergePaper',
        name: 'mergePaper',
        component: ()=> import('@/views/4-0.vue'),
        id: 'fp-2.5',
        title: '合并试卷',
        meta: { title: '合并试卷', pageHtml: 'OTS-MergeTestPaper.html' },
      },
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    id: 'fp-3',
    title: '活动安排',
    icon: 'exam-icon.png',
    children: [
      {
        path: '/createExam-single',
        name: 'createExam-single',
        component: ()=> import('@/views/4-0.vue'),
        id: 'fp-3.1',
        title: '新增安排',
        meta: { title: '新增安排', pageHtml: 'OTS-NewCreateExam.html' },
      },
      {
        path: '/createExam-Multiple',
        name: 'createExam-Multiple',
        component: ()=> import('@/views/4-0.vue'),
        id: 'fp-3.2',
        title: '批量新增安排',
        meta: { title: '批量新增安排', pageHtml: 'OTS-NewGroupAddPaper.html' },
      },
      {
        path: '/examManagement',
        name: 'examManagement',
        component: ()=> import('@/views/4-0.vue'),
        id: 'fp-3.3',
        title: '活动安排管理',
        meta: { title: '活动安排管理', pageHtml: 'OTS-NewexamArrange.html' },
      },
      {
        path: '/studentExam',
        name: 'studentExam',
        component: ()=> import('@/views/4-0.vue'),
        id: 'fp-3.5',
        title: '考生活动查询',
        meta: { title: '考生活动查询', pageHtml: 'OTS-ExamStu.html' },
      },
      {
        path: '/pictureVerify',
        name: 'pictureVerify',
        component: ()=> import('@/views/4-0.vue'),
        id: 'fp-3.6',
        title: '照片审核',
        meta: { title: '照片审核', pageHtml: 'OTS-ExamStuAuditing.html' },
      },
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    id: 'fp-6',
    title: '评阅',
    icon: 'review-icon.png',
    children: [
      {
        path: '/review',
        name: 'review',
        component: ()=> import('@/views/4-0.vue'),
        id: 'fp-6.1',
        title: '评阅列表查询',
        meta: { title: '评阅列表查询', pageHtml: 'OTS-TReviewActivityList.html' },
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    id: "fp-8",
    title: '课程管理',
    icon: 'setting-icon.png',
    children: [
      {
        path: '/correction',
        name: 'correction',
        component: ()=> import('@/views/4-0.vue'),
        id: "fp-8.1",
        title: '分类管理',
        meta: { title: '分类管理', pageHtml: 'OTS-CourseClassification.html' },
      },
      {
        path: '/correction',
        name: 'correction',
        component: ()=> import('@/views/4-0.vue'),
        id: "fp-8.2",
        title: '课程管理',
        meta: { title: '课程管理', pageHtml: 'OTS-CourseManagement.html' },
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    id: "fp-15",
    title: '财务管理',
    icon: 'finance-icon.png',
    children: [
      {
        path: '/correction',
        name: 'correction',
        component: ()=> import('@/views/4-0.vue'),
        id: "fp-15.1",
        title: '收费设置',
        meta: { title: '收费设置', pageHtml: 'OTS-ChargeManagement.html' },
      },
      {
        path: '/correction',
        name: 'correction',
        component: ()=> import('@/views/4-0.vue'),
        id: "fp-15.2",
        title: '付费记录',
        meta: { title: '付费记录', pageHtml: 'OTS-Orders.html' },
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    id: "fp-11",
    title: '系统管理',
    icon: 'setting-icon.png',
    children: [
      {
        path: '/correction',
        name: 'correction',
        component: ()=> import('@/views/4-0.vue'),
        id: "fp-11.1",
        title: '操作日志',
        meta: { title: '操作日志', pageHtml: 'OTS-OperationLog.html' },
      },
      {
        path: '/correction',
        name: 'correction',
        component: ()=> import('@/views/4-0.vue'),
        id: "fp-11.2",
        title: '数据转储',
        meta: { title: '数据转储', pageHtml: 'OTS-DataDump.html' },
      },
      {
        path: '/correction',
        name: 'correction',
        component: ()=> import('@/views/4-0.vue'),
        id: "fp-11.3",
        title: '数据大屏',
        meta: { title: '数据大屏', pageHtml: 'OTS-Screen.html' },
      },
      {
        path: '/correction',
        name: 'correction',
        component: ()=> import('@/views/4-0.vue'),
        id: "fp-11.4",
        title: '系统消息',
        meta: { title: '系统消息', pageHtml: 'OTS-SystemMsg.html' },
      },
      {
        path: '/correction',
        name: 'correction',
        component: ()=> import('@/views/4-0.vue'),
        id: "fp-11.5",
        title: 'APP版本管理',
        meta: { title: 'APP版本管理', pageHtml: 'OTS-App.html' },
      },
      {
        path: '/correction',
        name: 'correction',
        component: ()=> import('@/views/4-0.vue'),
        id: "fp-11.6",
        title: 'APP上传',
        meta: { title: 'APP上传', pageHtml: 'OTS-ApkUpload.html' },
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    id: "fp-10",
    title:"人员机构",
    icon:'agency-icon.png',
    children:[
      {
        path:'/userManagement',
        name:'userManagement',
        title:"人员管理",
        component:()=> import('@/views/userManagement/userManagement.vue'),
        id: "fp-10.1",
        meta:{title:"人员管理"},
        children:[
          {
            path: 'add',
            name: 'userAdd',
            component: () => import('@/views/userManagement/add'),
            meta: {title: "新增人员"},
          },
          {
            path: 'edit/:id',
            name: 'userEdit',
            component: () => import('@/views/userManagement/add'),
            meta: {title: "编辑人员"},
          },
          {
            path: 'check/:id',
            name: 'userCheck',
            component: () => import('@/views/userManagement/check'),
            meta: {title: "查看人员"},
          },
        ]
      }
    ]
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: '/index',
    id: "fp-12",
    title:"设置",
    icon:'setting-icon.png',
    children:[
      {
        path:'/permissionData',
        name:'permissionData',
        component:()=> import('@/views/setting/permissionData'),
        id: "fp-12.3",
        title: '数据权限',
        meta:{title:"数据权限"},
        children:[
          {
            path:'/permissionData/permissionSetting',
            name:'permissionSetting',
            component:()=> import('@/views/setting/permissionSetting'),
            meta:{title:"权限设置"}
          }
        ]
      },
      {
        path:'/roleData',
        name:'roleData',
        component:()=> import('@/views/setting/roleData'),
        id: "fp-12.4",
        title: '角色管理',
        meta:{title:"角色管理"},
        children:[
          {
            path:'/roleData/roleSetting',
            name:'roleSetting',
            component:()=> import('@/views/setting/roleSetting'),
            meta:{title:"角色设置"}
          }
        ]
      },
      {
        path: '/correction',
        name: 'correction',
        component: ()=> import('@/views/4-0.vue'),
        id: "fp-12.2",
        title: '自定义题型',
        meta: { title: '自定义题型', pageHtml: 'OTS-CustomTopic.html' },
      },
      {
        path: '/correction',
        name: 'correction',
        component: ()=> import('@/views/4-0.vue'),
        id: "fp-12.1",
        title: '功能权限',
        meta: { title: '功能权限', pageHtml: 'OTS-functionAuthorityList.html' },
      },
    ]
  },
  {
    path: '/test',
    name: 'test',
    component: ()=> import('@/views/test.vue'),
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
