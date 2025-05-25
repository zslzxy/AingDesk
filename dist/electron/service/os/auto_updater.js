"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.autoUpdaterService = exports.AutoUpdaterService = void 0;
const electron_1 = require("electron");
const electron_updater_1 = require("electron-updater");
const ee_core_adapter_1 = require("../../server/adapters/ee-core-adapter");
const ee_core_adapter_2 = require("../../server/adapters/ee-core-adapter");
const public_1 = require("../../class/public");
const ee_core_adapter_3 = require("../../server/adapters/ee-core-adapter");
/**
 * AutoUpdaterService class for automatic updates
 */
class AutoUpdaterService {
    constructor() {
        this.config = {
            windows: true,
            macOS: true,
            linux: true,
            options: {
                provider: 'generic',
                url: 'https://aingdesk.bt.cn/'
            },
            force: true,
        };
    }
    create() {
        ee_core_adapter_2.logger.info('[autoUpdater] load');
        const cfg = this.config;
        if ((ee_core_adapter_1.is.windows() && cfg.windows)
            || (ee_core_adapter_1.is.macOS() && cfg.macOS)
            || (ee_core_adapter_1.is.linux() && cfg.linux)) {
            // continue
        }
        else {
            return;
        }
        // 是否检查更新
        if (cfg.force) {
            this.checkUpdate();
        }
        const status = {
            error: -1,
            available: 1,
            noAvailable: 2,
            downloading: 3,
            downloaded: 4,
        };
        const version = electron_1.app.getVersion();
        ee_core_adapter_2.logger.info('[autoUpdater] current version: ', version);
        // 设置下载服务器地址
        let server = cfg.options.url;
        let lastChar = server.substring(server.length - 1);
        server = lastChar === '/' ? server : server + "/";
        ee_core_adapter_2.logger.info('[autoUpdater] server: ', server);
        cfg.options.url = server;
        // 强制执行开发更新
        electron_updater_1.autoUpdater.forceDevUpdateConfig = true;
        // 是否后台自动下载
        electron_updater_1.autoUpdater.autoDownload = cfg.force ? true : false;
        try {
            electron_updater_1.autoUpdater.setFeedURL(cfg.options);
        }
        catch (error) {
            ee_core_adapter_2.logger.error('[autoUpdater] setFeedURL error : ', error);
        }
        electron_updater_1.autoUpdater.on('checking-for-update', () => {
            this.sendStatusToWindow(public_1.pub.lang('正在检查更新...'));
        });
        electron_updater_1.autoUpdater.on('update-available', (info) => {
            this.sendStatusToWindow(info);
        });
        electron_updater_1.autoUpdater.on('update-not-available', (info) => {
            this.sendStatusToWindow(info);
        });
        electron_updater_1.autoUpdater.on('error', (err) => {
            let info = {
                status: status.error,
                desc: err
            };
            this.sendStatusToWindow(info);
        });
        electron_updater_1.autoUpdater.on('download-progress', (progressObj) => {
            let percentNumber = progressObj.percent;
            let totalSize = this.bytesChange(progressObj.total);
            let transferredSize = this.bytesChange(progressObj.transferred);
            let text = public_1.pub.lang('已下载 ') + percentNumber + '%';
            text = text + ' (' + transferredSize + "/" + totalSize + ')';
            let info = {
                status: status.downloading,
                desc: text,
                percentNumber: percentNumber,
                totalSize: totalSize,
                transferredSize: transferredSize
            };
            ee_core_adapter_2.logger.info('[addon:autoUpdater] progress: ', text);
            this.sendStatusToWindow(info);
        });
        electron_updater_1.autoUpdater.on('update-downloaded', (info) => {
            this.sendStatusToWindow(info);
            (0, ee_core_adapter_3.setCloseAndQuit)(true);
            electron_updater_1.autoUpdater.quitAndInstall();
        });
    }
    /**
     * 检查更新
     */
    checkUpdate() {
        electron_updater_1.autoUpdater.checkForUpdates();
    }
    /**
     * 下载更新
     */
    download() {
        electron_updater_1.autoUpdater.downloadUpdate();
    }
    /**
     * 向前端发消息
     */
    sendStatusToWindow(content = {}) {
        const textJson = JSON.stringify(content);
        const channel = 'custom/app/updater';
        const win = (0, ee_core_adapter_3.getMainWindow)();
        ee_core_adapter_2.logger.info('[addon:autoUpdater] sendStatusToWindow: ', textJson);
        win.webContents.send(channel, textJson);
    }
    /**
     * 单位转换
     */
    bytesChange(limit) {
        let size = "";
        if (limit < 0.1 * 1024) {
            size = limit.toFixed(2) + "B";
        }
        else if (limit < 0.1 * 1024 * 1024) {
            size = (limit / 1024).toFixed(2) + "KB";
        }
        else if (limit < 0.1 * 1024 * 1024 * 1024) {
            size = (limit / (1024 * 1024)).toFixed(2) + "MB";
        }
        else {
            size = (limit / (1024 * 1024 * 1024)).toFixed(2) + "GB";
        }
        let sizeStr = size + "";
        let index = sizeStr.indexOf(".");
        let dou = sizeStr.substring(index + 1, index + 3);
        if (dou == "00") {
            return sizeStr.substring(0, index) + sizeStr.substring(index + 3, index + 5);
        }
        return size;
    }
}
exports.AutoUpdaterService = AutoUpdaterService;
AutoUpdaterService.toString = () => '[class AutoUpdaterService]';
const autoUpdaterService = new AutoUpdaterService();
exports.autoUpdaterService = autoUpdaterService;
