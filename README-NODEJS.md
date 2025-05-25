# AingDesk Node.js 服务器

AingDesk 已从 Electron 应用转换为 Node.js 服务器应用。

## 主要变更

### 移除的组件
- Electron 框架和相关依赖
- ee-core 框架
- Electron 窗口管理
- 桌面应用功能

### 新增的组件
- Express.js 服务器
- Socket.IO 实时通信
- RESTful API 接口
- 静态文件服务
- ee-core 适配器（兼容层）

## 安装和运行

### 1. 安装依赖
```bash
npm install
```

### 2. 构建前端（如果需要）
```bash
npm run build-frontend
```

### 3. 构建服务器
```bash
npm run build-server
```

### 4. 启动服务器
```bash
npm start
```

或者直接运行生产版本：
```bash
npm run start-prod
```

### 5. 开发模式
```bash
npm run dev-server
```

## 配置

### 环境变量
复制 `.env.example` 到 `.env` 并根据需要修改配置：

```bash
cp .env.example .env
```

主要配置项：
- `PORT`: 服务器端口（默认 7071）
- `HOST`: 服务器主机（默认 0.0.0.0）
- `NODE_ENV`: 环境模式

### 服务器配置
服务器配置位于 `electron/config/config.default.ts`，包括：
- HTTP 服务器设置
- Socket.IO 配置
- 静态文件路径
- 日志配置

## API 接口

服务器提供以下 RESTful API 接口：

### 聊天相关
- `POST /api/chat/send` - 发送消息
- `POST /api/chat/history` - 获取聊天历史
- `POST /api/chat/delete` - 删除聊天

### 模型管理
- `POST /api/model/list` - 获取模型列表
- `POST /api/model/add` - 添加模型
- `POST /api/model/delete` - 删除模型
- `POST /api/model/edit` - 编辑模型

### Agent 管理
- `POST /api/agent/list` - 获取 Agent 列表
- `POST /api/agent/add` - 添加 Agent
- `POST /api/agent/delete` - 删除 Agent
- `POST /api/agent/edit` - 编辑 Agent

### MCP 管理
- `POST /api/mcp/list` - 获取 MCP 列表
- `POST /api/mcp/add` - 添加 MCP
- `POST /api/mcp/delete` - 删除 MCP

### RAG 功能
- `POST /api/rag/upload` - 上传文档
- `POST /api/rag/list` - 获取文档列表
- `POST /api/rag/delete` - 删除文档

### 其他功能
- `POST /api/share/create` - 创建分享
- `POST /api/share/list` - 获取分享列表
- `POST /api/search/web` - 网络搜索
- `POST /api/manager/config` - 管理配置
- `POST /api/os/info` - 系统信息

## 实时通信

服务器支持 Socket.IO 实时通信，客户端可以连接到：
```
ws://localhost:7071/socket.io/
```

## 静态文件

前端文件服务路径：
- 主页面: `http://localhost:7071/`
- 静态资源: `http://localhost:7071/images/`

## 数据存储

用户数据存储位置：
- Windows: `%APPDATA%/AingDesk`
- macOS: `~/Library/Application Support/AingDesk`
- Linux: `~/.config/AingDesk`

## 部署

### 生产环境部署
1. 构建应用：`npm run build`
2. 设置环境变量
3. 启动服务：`npm run start-prod`

### Docker 部署
可以创建 Dockerfile 进行容器化部署。

### 反向代理
建议使用 Nginx 或其他反向代理服务器来处理静态文件和 SSL。

## 故障排除

### 常见问题
1. **端口被占用**: 修改 `.env` 文件中的 `PORT` 配置
2. **依赖安装失败**: 清除 node_modules 并重新安装
3. **构建失败**: 检查 TypeScript 配置和依赖版本

### 日志
服务器日志会输出到控制台，包括：
- 启动信息
- API 请求日志
- 错误信息
- 后台服务状态

## 开发

### 项目结构
```
├── server/           # Node.js 服务器代码
│   ├── app.ts       # 主服务器文件
│   ├── routes.ts    # API 路由
│   └── adapters/    # ee-core 适配器
├── electron/        # 原 Electron 代码（保留业务逻辑）
├── frontend/        # 前端 Vue 应用
├── public/          # 静态文件
└── dist/           # 构建输出
```

### 添加新 API
1. 在 `electron/controller/` 中添加控制器方法
2. 在 `server/routes.ts` 中添加路由
3. 重新构建服务器

### 修改配置
修改 `electron/config/config.default.ts` 中的配置项。