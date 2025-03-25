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
import MySubmit from "@/components/userInfo/sublist/MySubmit.vue";
import BlogPageView from "@/views/post/PostPageView.vue";
import PostPageView from "@/views/post/PostPageView.vue";
import PostEditView from "@/views/post/PostEditView.vue";
import PostListView from "@/views/post/PostListView.vue";

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
    redirect: "/home",
  },
  {
    path: "/home",
    name: "主页",
    component: PostListView,
    meta: {
      visibleHead: true,
    }
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
      visibleHead: false,
    },
  },
  {
    path: "/add/question",
    name: "创建题目",
    component: AddQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
      visibleHead: false,
    },
  },
  {
    path: "/manage/question",
    name: "管理题目",
    component: manageQuestionView,
    meta: {
      access: ACCESS_ENUM.ADMIN,
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
    },
    children: [
      {
        path: "/user/info/mySubmit",
        component: MySubmit
      }
    ]
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
    name: "提交信息",
    component: QuestionSubmitListView,
    meta: {
      visibleHead: true,
      access: ACCESS_ENUM.NOT_LOGIN,
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
  {
    path: "/post/view/:id",
    name: "postView",
    props: true,
    component: PostPageView,
  },
  {
    path: "/post/edit",
    name: "postEdit",
    component: PostEditView,
  },
];
