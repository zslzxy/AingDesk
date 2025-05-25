# 使用 Node.js 18 作为基础镜像
FROM node:18-alpine

# 设置工作目录
WORKDIR /app

# 复制 package.json 和 package-lock.json
COPY package*.json ./

# 安装依赖
RUN npm ci --only=production

# 复制源代码
COPY . .

# 构建应用
RUN npm run build

# 创建非 root 用户
RUN addgroup -g 1001 -S nodejs
RUN adduser -S aingdesk -u 1001

# 创建数据目录
RUN mkdir -p /app/data && chown -R aingdesk:nodejs /app/data

# 切换到非 root 用户
USER aingdesk

# 暴露端口
EXPOSE 7071

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=7071
ENV HOST=0.0.0.0

# 启动应用
CMD ["npm", "run", "start-prod"]