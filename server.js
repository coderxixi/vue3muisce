const registerRouter = require('./backend/router.js')
const express = require('express')
const {createServer: createViteServer} = require('vite')

async function createServer() {
    const app = express()  // 以中间件模式创建 vite 服务器
    app.listen(3001)
    registerRouter(app)
}

createServer()