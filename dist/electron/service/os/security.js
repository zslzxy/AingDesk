"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.securityService = exports.SecurityService = void 0;
const ee_core_adapter_1 = require("../../server/adapters/ee-core-adapter");
const electron_1 = require("electron");
/**
 * SecurityService class for handling security-related operations
 */
class SecurityService {
    /**
     * Create and configure the security service
     */
    create() {
        ee_core_adapter_1.logger.info('[security] load');
        const runWithDebug = process.argv.find((e) => {
            const isHasDebug = e.includes('--inspect') || e.includes('--inspect-brk') || e.includes('--remote-debugging-port');
            return isHasDebug;
        });
        // Do not allow remote debugging
        if (runWithDebug) {
            ee_core_adapter_1.logger.error('[error] Remote debugging is not allowed, runWithDebug:', runWithDebug);
            electron_1.app.quit();
        }
    }
}
exports.SecurityService = SecurityService;
SecurityService.toString = () => '[class SecurityService]';
const securityService = new SecurityService();
exports.securityService = securityService;
