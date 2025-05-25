"use strict";
/**
 * 生命周期适配器 - 为 Node.js 环境提供兼容的生命周期管理
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.preload = exports.Lifecycle = void 0;
class Lifecycle {
    async ready() {
        console.log('Server ready');
        // 在这里可以执行服务器启动后的初始化逻辑
    }
    async electronAppReady() {
        console.log('App ready (Node.js mode)');
        // 在 Node.js 环境中，这个方法不需要做任何事情
    }
    async windowReady() {
        console.log('Window ready (Node.js mode)');
        // 在 Node.js 环境中，没有窗口概念
    }
    async beforeClose() {
        console.log('Before close');
        // 在这里可以执行清理逻辑
    }
}
exports.Lifecycle = Lifecycle;
// 预加载适配器
exports.preload = {
    // 在 Node.js 环境中，预加载脚本不适用
    init: () => {
        console.log('Preload initialized (Node.js mode)');
    }
};
