"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = exports.server = exports.app = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// 加载环境变量
dotenv_1.default.config();
// 导入适配器
const ee_core_adapter_1 = require("./adapters/ee-core-adapter");
const lifecycle_adapter_1 = require("./adapters/lifecycle-adapter");
// 导入服务
const total_1 = require("../electron/service/total");
// 创建 Express 应用
const app = (0, express_1.default)();
exports.app = app;
const server = (0, http_1.createServer)(app);
exports.server = server;
// 配置 CORS
app.use((0, cors_1.default)({
    origin: true,
    credentials: true
}));
// 解析 JSON 请求体
app.use(express_1.default.json({ limit: '100mb' }));
app.use(express_1.default.urlencoded({ extended: true, limit: '100mb' }));
// 静态文件服务 - 服务前端构建文件
app.use(express_1.default.static(path_1.default.join(__dirname, '../public/dist')));
app.use('/images', express_1.default.static(path_1.default.join(__dirname, '../public/images')));
// Socket.IO 服务器
const io = new socket_io_1.Server(server, {
    path: "/socket.io/",
    connectTimeout: 45000,
    pingTimeout: 30000,
    pingInterval: 25000,
    maxHttpBufferSize: 1e8,
    transports: ["polling", "websocket"],
    cors: {
        origin: true,
        credentials: true
    }
});
exports.io = io;
// 全局变量设置
global.io = io;
global.app = app;
// 导入控制器路由
require("./routes");
// Socket.IO 连接处理
io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);
    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});
// 服务器配置
const PORT = process.env.PORT || 7071;
const HOST = process.env.HOST || '0.0.0.0';
// 初始化 ElectronEgg 适配器
const electronApp = new ee_core_adapter_1.ElectronEgg();
const lifecycle = new lifecycle_adapter_1.Lifecycle();
// 注册生命周期
electronApp.register("ready", lifecycle.ready);
electronApp.register("electron-app-ready", lifecycle.electronAppReady);
electronApp.register("window-ready", lifecycle.windowReady);
electronApp.register("before-close", lifecycle.beforeClose);
electronApp.register("preload", lifecycle_adapter_1.preload.init);
// 启动服务器
server.listen(Number(PORT), HOST, async () => {
    console.log(`AingDesk Server running on http://${HOST}:${PORT}`);
    // 运行 ElectronEgg 适配器
    await electronApp.run();
    // 启动后台服务
    setTimeout(() => {
        try {
            // 分享服务
            const { shareService } = require('../electron/service/share');
            const { mcpService } = require('../electron/service/mcp');
            const shareIdPrefix = shareService.generateUniquePrefix();
            let socket = shareService.connectToCloudServer(shareIdPrefix);
            shareService.startReconnect(socket, shareIdPrefix);
            // RAG后台任务
            const { RagTask } = require('../electron/rag/rag_task');
            let ragTaskObj = new RagTask();
            ragTaskObj.parseTask();
            // 创建索引
            ragTaskObj.switchToCosineIndex();
            // 同步MCP服务器列表
            mcpService.sync_cloud_mcp();
            console.log('Background services started successfully');
        }
        catch (error) {
            console.error('Error starting background services:', error);
        }
    }, 1000);
    // 启动统计服务
    total_1.totalService.start();
});
// 错误处理
process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});
// 优雅关闭
process.on('SIGTERM', () => {
    console.log('SIGTERM received, shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
process.on('SIGINT', () => {
    console.log('SIGINT received, shutting down gracefully');
    server.close(() => {
        console.log('Server closed');
        process.exit(0);
    });
});
