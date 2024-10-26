import { RouteRecordRaw } from "vue-router";
import ExampleView from "@/views/ExampleView.vue";
import AdminView from "@/views/AdminView.vue";
import NoAuthView from "@/views/NoAuthView.vue";
import UserLoginView from "@/views/user/UserLoginView.vue";
import UserRegisterView from "@/views/user/UserRegisterView.vue";
import UserLayout from "@/layout/UserLayout.vue";
import AddQuestionView from "@/views/question/AddQuestionView.vue";
import manageQuestionView from "@/views/question/ManageQuestionView.vue";
import UserInfoView from "@/views/user/UserInfoView.vue";
import ACCESS_ENUM from "@/enums/accessEnum";
import QuestionListView from "@/views/question/QuestionListView.vue";
import QuestionView from "@/views/question/QuestionView.vue";
import QuestionSubmitListView from "@/views/question/QuestionSubmitListView.vue";
import QuestionSubmitInfoView from "@/views/question/QuestionSubmitInfoView.vue";

export const routes: Array<RouteRecordRaw> = [
  {
    path: "/user",
    name: "用户",
    component: UserLayout,
    children: [
      {
        path: "/user/login",
        name: "用户登录",
        component: UserLoginView,
      },
      {
        path: "/user/register",
        name: "用户注册",
        component: UserRegisterView,
      },
    ],
  },
  {
    path: "/",
    name: "主页",
    component: ExampleView,
    meta: {
      visibleHead: true,
    },
  },
  {
    path: "/list/question",
    name: "题库",
    component: QuestionListView,
    meta: {
      visibleHead: true,
    },
  },
  {
    path: "/noAuth",
    component: NoAuthView,
  },
  {
    path: "/admin",
    name: "管理",
    component: AdminView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      visibleHead: true,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      visibleHead: true,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: manageQuestionView,
    meta: {
      visibleHead: true,
    },
  },
  {
    path: "/edit/question",
    name: "编辑题目",
    component: AddQuestionView,
  },
  {
    path: "/user/info",
    name: "我的主页",
    component: UserInfoView,
    meta: {
      visibleHead: false,
      access: ACCESS_ENUM.ADMIN,
    },
  },
  {
    path: "/view/question/:id",
    props: true,
    component: QuestionView,
    meta: {
      visibleHead: false,
    },
  },
  {
    path: "/list/question/submit",
    name: "我的提交",
    component: QuestionSubmitListView,
    meta: {
      visibleHead: true,
      access: ACCESS_ENUM.USER,
    },
  },
  {
    path: "/view/submit/:submitId",
    name: "提交详情",
    props: true,
    component: QuestionSubmitInfoView,
    meta: {
      visibleHead: false,
      access: ACCESS_ENUM.USER,
    },
  },
];
