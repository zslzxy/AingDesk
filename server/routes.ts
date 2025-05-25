import { Router } from 'express';
import path from 'path';

// 导入控制器
const chatController = require('../electron/controller/chat');
const modelController = require('../electron/controller/model');
const agentController = require('../electron/controller/agent');
const mcpController = require('../electron/controller/mcp');
const ragController = require('../electron/controller/rag');
const shareController = require('../electron/controller/share');
const searchController = require('../electron/controller/search');
const managerController = require('../electron/controller/manager');
// const osController = require('../electron/controller/os'); // 排除 OS 控制器，因为它依赖 Electron

const router = Router();

// 聊天相关路由
router.post('/api/chat/send', async (req, res) => {
    try {
        const result = await chatController.send(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

router.post('/api/chat/history', async (req, res) => {
    try {
        const result = await chatController.history(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

router.post('/api/chat/delete', async (req, res) => {
    try {
        const result = await chatController.delete(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

// 模型相关路由
router.post('/api/model/list', async (req, res) => {
    try {
        const result = await modelController.list(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

router.post('/api/model/add', async (req, res) => {
    try {
        const result = await modelController.add(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

router.post('/api/model/delete', async (req, res) => {
    try {
        const result = await modelController.delete(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

router.post('/api/model/edit', async (req, res) => {
    try {
        const result = await modelController.edit(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

// Agent 相关路由
router.post('/api/agent/list', async (req, res) => {
    try {
        const result = await agentController.list(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

router.post('/api/agent/add', async (req, res) => {
    try {
        const result = await agentController.add(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

router.post('/api/agent/delete', async (req, res) => {
    try {
        const result = await agentController.delete(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

router.post('/api/agent/edit', async (req, res) => {
    try {
        const result = await agentController.edit(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

// MCP 相关路由
router.post('/api/mcp/list', async (req, res) => {
    try {
        const result = await mcpController.list(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

router.post('/api/mcp/add', async (req, res) => {
    try {
        const result = await mcpController.add(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

router.post('/api/mcp/delete', async (req, res) => {
    try {
        const result = await mcpController.delete(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

// RAG 相关路由
router.post('/api/rag/upload', async (req, res) => {
    try {
        const result = await ragController.upload(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

router.post('/api/rag/list', async (req, res) => {
    try {
        const result = await ragController.list(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

router.post('/api/rag/delete', async (req, res) => {
    try {
        const result = await ragController.delete(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

// 分享相关路由
router.post('/api/share/create', async (req, res) => {
    try {
        const result = await shareController.create(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

router.post('/api/share/list', async (req, res) => {
    try {
        const result = await shareController.list(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

// 搜索相关路由
router.post('/api/search/web', async (req, res) => {
    try {
        const result = await searchController.web(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

// 管理相关路由
router.post('/api/manager/config', async (req, res) => {
    try {
        const result = await managerController.config(req.body);
        res.json(result);
    } catch (error) {
        res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
    }
});

// 系统相关路由 - 暂时禁用，因为依赖 Electron
// router.post('/api/os/info', async (req, res) => {
//     try {
//         const result = await osController.info(req.body);
//         res.json(result);
//     } catch (error) {
//         res.status(500).json({ error: error instanceof Error ? error.message : String(error) });
//     }
// });

// 默认路由 - 服务前端应用
router.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/dist/index.html'));
});

// 将路由应用到全局 app
global.app.use(router);

export default router;