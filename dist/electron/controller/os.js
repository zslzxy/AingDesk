"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const electron_1 = require("electron");
const window_1 = require("../service/os/window");
/**
 * example
 * @class
 */
class OsController {
    /**
     * All methods receive two parameters
     * @param args Parameters transmitted by the frontend
     * @param event - Event are only available during IPC communication. For details, please refer to the controller documentation
     */
    /**
     * Message prompt dialog box
     */
    messageShow() {
        electron_1.dialog.showMessageBoxSync({
            type: 'info', // "none", "info", "error", "question" 或者 "warning"
            title: 'Custom Title',
            message: 'Customize message content',
            detail: 'Other additional information'
        });
        return 'Opened the message box';
    }
    /**
     * Message prompt and confirmation dialog box
     */
    messageShowConfirm() {
        const res = electron_1.dialog.showMessageBoxSync({
            type: 'info',
            title: 'Custom Title',
            message: 'Customize message content',
            detail: 'Other additional information',
            cancelId: 1, // Index of buttons used to cancel dialog boxes
            defaultId: 0, // Set default selected button
            buttons: ['confirm', 'cancel'],
        });
        let data = (res === 0) ? 'click the confirm button' : 'click the cancel button';
        return data;
    }
    /**
     * Select Directory
     */
    selectFolder() {
        const filePaths = electron_1.dialog.showOpenDialogSync({
            properties: ['openDirectory', 'createDirectory']
        });
        if (!filePaths) {
            return "";
        }
        return filePaths[0];
    }
    /**
     * open directory
     */
    openDirectory(args) {
        const { id } = args;
        if (!id) {
            return false;
        }
        let dir = '';
        if (path_1.default.isAbsolute(id)) {
            dir = id;
        }
        else {
            dir = electron_1.app.getPath(id);
        }
        electron_1.shell.openPath(dir);
        return true;
    }
    /**
     * Select Picture
     */
    selectPic() {
        const filePaths = electron_1.dialog.showOpenDialogSync({
            title: 'select pic',
            properties: ['openFile'],
            filters: [
                { name: 'Images', extensions: ['jpg', 'png', 'gif'] },
            ]
        });
        if (!filePaths) {
            return null;
        }
        try {
            const data = fs_1.default.readFileSync(filePaths[0]);
            const pic = 'data:image/jpeg;base64,' + data.toString('base64');
            return pic;
        }
        catch (err) {
            console.error(err);
            return null;
        }
    }
    /**
     * Open a new window
     */
    createWindow(args) {
        const wcid = window_1.windowService.createWindow(args);
        return wcid;
    }
    /**
     * Get Window contents id
     */
    getWCid(args) {
        const wcid = window_1.windowService.getWCid(args);
        return wcid;
    }
    /**
     * Realize communication between two windows through the transfer of the main process
     */
    window1ToWindow2(args) {
        window_1.windowService.communicate(args);
        return;
    }
    /**
     * Realize communication between two windows through the transfer of the main process
     */
    window2ToWindow1(args) {
        window_1.windowService.communicate(args);
        return;
    }
    /**
     * Create system notifications
     */
    sendNotification(args, event) {
        const { title, subtitle, body, silent } = args;
        const options = {};
        if (title) {
            options.title = title;
        }
        if (subtitle) {
            options.subtitle = subtitle;
        }
        if (body) {
            options.body = body;
        }
        if (silent !== undefined) {
            options.silent = silent;
        }
        window_1.windowService.createNotification(options, event);
        return true;
    }
}
OsController.toString = () => '[class OsController]';
exports.default = OsController;
