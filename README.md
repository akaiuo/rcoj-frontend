

# RCOJ 前端项目

RCOJ 是一个基于 Vue.js 的在线评测与问答平台前端项目。本项目采用 Vue 3 + TypeScript 技术栈，提供完善的题目管理、在线提交、讨论交流等功能。

## 技术栈

- **框架**: Vue 3
- **语言**: TypeScript
- **构建工具**: Vite / Vue CLI
- **状态管理**: Vuex
- **路由**: Vue Router
- **UI 组件**: 按需集成
- **富文本编辑**: WangEditor / Markdown Editor

## 项目结构

```
src/
├── access/           # 权限控制模块
├── assets/           # 静态资源
├── components/       # 全局组件
│   ├── GlobalHeader.vue
│   ├── MdEditor.vue
│   ├── MdViewer.vue
│   ├── PostComment.vue
│   ├── QuestionBlog.vue
│   ├── QuestionComment.vue
│   ├── WangEditor.vue
│   ├── WangViewer.vue
│   ├── codeEditor.vue
│   └── userInfo/     # 用户相关组件
├── enums/            # 枚举定义
│   ├── accessEnum.ts
│   └── judgeEnum.ts
├── layout/           # 布局组件
│   ├── BasicLayout.vue
│   ├── QuestionLayout.vue
│   └── UserLayout.vue
├── router/           # 路由配置
├── services/         # API 服务层
├── store/            # Vuex 状态管理
├── views/            # 页面视图
│   ├── AboutView.vue
│   ├── AdminView.vue
│   ├── ExampleView.vue
│   ├── NoAuthView.vue
│   ├── post/         # 帖子相关视图
│   ├── question/     # 题目相关视图
│   └── user/         # 用户相关视图
├── App.vue
└── main.ts
```

## 核心功能

### 用户系统
- 用户注册与登录
- 用户信息管理
- 权限控制与访问管理

### 题目模块
- 题目列表浏览
- 题目详情查看
- 在线代码提交
- 提交记录查询
- 题目管理与编辑（管理员）

### 讨论模块
- 帖子发布与编辑
- 帖子列表与搜索
- 点赞、收藏、评论功能

## 快速开始

### 环境要求

- Node.js 16+
- Yarn / npm

### 安装依赖

```bash
yarn install
```

### 开发模式

```bash
yarn serve
```

### 生产构建

```bash
yarn build
```

### 代码检查

```bash
yarn lint
```

## API 集成

项目通过 `generated/` 目录下的代码自动生成 API 客户端，包括：

- **Models**: 数据模型定义（User, Question, Post 等）
- **Services**: 业务服务接口（用户、题目、帖子等）
- **Core**: 请求封装与错误处理

所有 API 调用统一通过 `src/services/` 目录下的服务层进行。

## 权限控制

项目实现了基于角色的访问控制，通过 `src/access/` 目录下的模块实现：

```typescript
// 权限枚举定义
const ACCESS_ENUM = {
  NOT_LOGIN: 'notLogin',
  USER: 'user',
  ADMIN: 'admin',
};
```

## 枚举定义

### 访问权限
```typescript
ACCESS_ENUM.NOT_LOGIN    // 未登录
ACCESS_ENUM.USER         // 普通用户
ACCESS_ENUM.ADMIN        // 管理员
```

### 评测状态
```typescript
JUDGE_ENUM               // 题目评测相关状态
```

## 配置说明

项目主要配置文件：

- `vue.config.js`: Vue CLI / Vite 构建配置
- `babel.config.js`: Babel 转码配置
- `tsconfig.json`: TypeScript 编译配置
- `.eslintrc.js`: ESLint 代码规范配置
- `.browserslistrc`: 浏览器兼容性配置

## 主要视图说明

### 用户相关
- `UserLoginView`: 用户登录页
- `UserRegisterView`: 用户注册页
- `UserInfoView`: 用户信息页

### 题目相关
- `QuestionListView`: 题目列表
- `QuestionView`: 题目详情与提交
- `QuestionSubmitListView`: 提交记录
- `ManageQuestionView`: 题目管理（管理员）
- `AddQuestionView`: 添加题目

### 帖子相关
- `PostListView`: 帖子列表
- `PostPageView`: 帖子详情
- `PostEditView`: 编辑帖子

## 贡献指南

1. Fork 本仓库
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交改动 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 发起 Pull Request

## 许可证

本项目基于 [MIT License](LICENSE) 开源。

## 联系方式

- 项目地址: https://gitee.com/akaiuo/rcoj-frontend
- 问题反馈: https://gitee.com/akaiuo/rcoj-frontend/issues