#!/usr/bin/env node

const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

// 检查是否存在构建文件
const serverPath = path.join(__dirname, 'dist', 'server', 'app.js');

if (!fs.existsSync(serverPath)) {
    console.log('Building server...');
    const buildProcess = spawn('npm', ['run', 'build-server'], {
        stdio: 'inherit',
        shell: true
    });

    buildProcess.on('close', (code) => {
        if (code === 0) {
            console.log('Build completed successfully');
            startServer();
        } else {
            console.error('Build failed with code', code);
            process.exit(1);
        }
    });
} else {
    startServer();
}

function startServer() {
    console.log('Starting AingDesk Server...');
    const serverProcess = spawn('node', [serverPath], {
        stdio: 'inherit'
    });

    serverProcess.on('close', (code) => {
        console.log(`Server exited with code ${code}`);
    });

    // 处理进程信号
    process.on('SIGINT', () => {
        console.log('Received SIGINT, shutting down gracefully...');
        serverProcess.kill('SIGINT');
    });

    process.on('SIGTERM', () => {
        console.log('Received SIGTERM, shutting down gracefully...');
        serverProcess.kill('SIGTERM');
    });
}