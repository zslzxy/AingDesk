"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCloseAndQuit = exports.setCloseAndQuit = exports.getMainWindow = exports.isFileProtocol = exports.is = exports.getConfig = exports.logger = exports.ElectronEgg = exports.isProd = exports.isDev = exports.appVersion = exports.getExtraResourcesDir = exports.getAppUserDataDir = exports.getUserDataDir = exports.getAppDataDir = exports.getRootDir = exports.getBaseDir = void 0;
const os = __importStar(require("os"));
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
/**
 * ee-core 适配器 - 为 Node.js 环境提供兼容的 API
 */
// 模拟 ee-core/ps 模块
const getBaseDir = () => {
    return process.cwd();
};
exports.getBaseDir = getBaseDir;
const getRootDir = () => {
    return process.cwd();
};
exports.getRootDir = getRootDir;
const getAppDataDir = () => {
    const platform = os.platform();
    const homeDir = os.homedir();
    switch (platform) {
        case 'win32':
            return path.join(homeDir, 'AppData', 'Roaming', 'AingDesk');
        case 'darwin':
            return path.join(homeDir, 'Library', 'Application Support', 'AingDesk');
        default:
            return path.join(homeDir, '.config', 'AingDesk');
    }
};
exports.getAppDataDir = getAppDataDir;
const getUserDataDir = () => {
    return (0, exports.getAppDataDir)();
};
exports.getUserDataDir = getUserDataDir;
const getAppUserDataDir = () => {
    return (0, exports.getAppDataDir)();
};
exports.getAppUserDataDir = getAppUserDataDir;
const getExtraResourcesDir = () => {
    return path.join((0, exports.getBaseDir)(), 'resources');
};
exports.getExtraResourcesDir = getExtraResourcesDir;
const appVersion = () => {
    try {
        const packageJson = require(path.join((0, exports.getBaseDir)(), 'package.json'));
        return packageJson.version || '1.0.0';
    }
    catch {
        return '1.0.0';
    }
};
exports.appVersion = appVersion;
const isDev = () => {
    return process.env.NODE_ENV === 'development';
};
exports.isDev = isDev;
const isProd = () => {
    return process.env.NODE_ENV === 'production';
};
exports.isProd = isProd;
// 模拟 ElectronEgg 类
class ElectronEgg {
    constructor() {
        this.handlers = new Map();
    }
    register(event, handler) {
        this.handlers.set(event, handler);
    }
    async run() {
        // 在 Node.js 环境中，我们不需要启动 Electron
        // 这里可以执行一些初始化逻辑
        console.log('AingDesk Node.js Server initialized');
        // 触发 ready 事件
        const readyHandler = this.handlers.get('ready');
        if (readyHandler) {
            await readyHandler();
        }
    }
}
exports.ElectronEgg = ElectronEgg;
// 模拟 ee-core/log 模块
exports.logger = {
    info: (message, ...args) => console.log(`[INFO] ${message}`, ...args),
    error: (message, ...args) => console.error(`[ERROR] ${message}`, ...args),
    warn: (message, ...args) => console.warn(`[WARN] ${message}`, ...args),
    debug: (message, ...args) => console.debug(`[DEBUG] ${message}`, ...args),
    log: (message, ...args) => console.log(`[LOG] ${message}`, ...args)
};
// 模拟 ee-core/config 模块
const getConfig = () => {
    try {
        const configPath = path.join((0, exports.getBaseDir)(), 'electron', 'config', 'config.default.ts');
        // 在实际应用中，这里应该加载配置文件
        return {
            openDevTools: false,
            singleLock: true,
            httpServer: {
                enable: true,
                host: '0.0.0.0',
                port: 7071
            },
            socketServer: {
                enable: true,
                port: 7071,
                path: '/socket.io/',
                connectTimeout: 45000,
                pingTimeout: 30000,
                pingInterval: 25000,
                maxHttpBufferSize: 1e8,
                transports: ['websocket'],
                cors: {
                    origin: true,
                    credentials: true
                },
                channel: 'default'
            }
        };
    }
    catch {
        return {};
    }
};
exports.getConfig = getConfig;
// 模拟 ee-core/utils 模块
exports.is = {
    dev: () => (0, exports.isDev)(),
    prod: () => (0, exports.isProd)(),
    windows: () => os.platform() === 'win32',
    macOS: () => os.platform() === 'darwin',
    linux: () => os.platform() === 'linux'
};
const isFileProtocol = (url) => {
    return url.startsWith('file://');
};
exports.isFileProtocol = isFileProtocol;
// 模拟 ee-core/electron 模块（在 Node.js 环境中这些功能不适用）
const getMainWindow = () => null;
exports.getMainWindow = getMainWindow;
const setCloseAndQuit = (value) => { };
exports.setCloseAndQuit = setCloseAndQuit;
const getCloseAndQuit = () => false;
exports.getCloseAndQuit = getCloseAndQuit;
// 确保数据目录存在
const dataDir = (0, exports.getAppDataDir)();
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}
