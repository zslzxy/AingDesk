import * as os from 'os';
import * as path from 'path';
import * as fs from 'fs';

/**
 * ee-core 适配器 - 为 Node.js 环境提供兼容的 API
 */

// 模拟 ee-core/ps 模块
export const getBaseDir = (): string => {
    return process.cwd();
};

export const getRootDir = (): string => {
    return process.cwd();
};

export const getAppDataDir = (): string => {
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

export const getUserDataDir = (): string => {
    return getAppDataDir();
};

export const getAppUserDataDir = (): string => {
    return getAppDataDir();
};

export const getExtraResourcesDir = (): string => {
    return path.join(getBaseDir(), 'resources');
};

export const appVersion = (): string => {
    try {
        const packageJson = require(path.join(getBaseDir(), 'package.json'));
        return packageJson.version || '1.0.0';
    } catch {
        return '1.0.0';
    }
};

export const isDev = (): boolean => {
    return process.env.NODE_ENV === 'development';
};

export const isProd = (): boolean => {
    return process.env.NODE_ENV === 'production';
};

// 模拟 ee-core 的配置类型
export interface AppConfig {
    openDevTools?: boolean | { mode?: string };
    singleLock?: boolean;
    windowsOption?: any;
    jobs?: {
        messageLog?: boolean;
    };
    logger?: {
        level: string;
        outputJSON: boolean;
        appLogName: string;
        coreLogName: string;
        errorLogName: string;
    };
    remote?: {
        enable: boolean;
        url: string;
    };
    socketServer?: {
        enable: boolean;
        port: number;
        path: string;
        connectTimeout: number;
        pingTimeout: number;
        pingInterval: number;
        maxHttpBufferSize: number;
        transports: string[];
        cors: any;
        channel: string;
    };
    httpServer?: {
        enable: boolean;
        https?: {
            enable: boolean;
            key: string;
            cert: string;
        };
        host: string;
        port: number;
    };
    mainServer?: {
        indexPath: string;
    };
    loadUrl?: {
        dev: string;
        prod: string;
    };
}

// 模拟 ElectronEgg 类
export class ElectronEgg {
    private handlers: Map<string, Function> = new Map();

    register(event: string, handler: Function): void {
        this.handlers.set(event, handler);
    }

    async run(): Promise<void> {
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

// 模拟全局变量
declare global {
    var io: any;
    var app: any;
    var isCopyDataPath: boolean;
}

// 模拟 ee-core/log 模块
export const logger = {
    info: (message: string, ...args: any[]) => console.log(`[INFO] ${message}`, ...args),
    error: (message: string, ...args: any[]) => console.error(`[ERROR] ${message}`, ...args),
    warn: (message: string, ...args: any[]) => console.warn(`[WARN] ${message}`, ...args),
    debug: (message: string, ...args: any[]) => console.debug(`[DEBUG] ${message}`, ...args),
    log: (message: string, ...args: any[]) => console.log(`[LOG] ${message}`, ...args)
};

// 模拟 ee-core/config 模块
export const getConfig = (): AppConfig => {
    try {
        const configPath = path.join(getBaseDir(), 'electron', 'config', 'config.default.ts');
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
    } catch {
        return {};
    }
};

// 模拟 ee-core/utils 模块
export const is = {
    dev: () => isDev(),
    prod: () => isProd(),
    windows: () => os.platform() === 'win32',
    macOS: () => os.platform() === 'darwin',
    linux: () => os.platform() === 'linux'
};

export const isFileProtocol = (url: string): boolean => {
    return url.startsWith('file://');
};

// 模拟 ee-core/electron 模块（在 Node.js 环境中这些功能不适用）
export const getMainWindow = () => null;
export const setCloseAndQuit = (value: boolean) => {};
export const getCloseAndQuit = () => false;

// 确保数据目录存在
const dataDir = getAppDataDir();
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}