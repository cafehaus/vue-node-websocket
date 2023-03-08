const WebSocket = require('ws')
const wsServer = new WebSocket.Server({ port: 8088 })

wsServer.on('connection', (ws) => {
  ws.on('message', (msg) => {
    msg = msg.toString()
    let info = JSON.parse(msg) || {}
    const { type, userId, userName, content } = info
    let text = {}
    if (type === 'init') {
      text = {
        type: 0,
        content: `欢迎${userName}进入群聊`
      }
    } else {
      text = {
        type: 2,
        userId,
        userName,
        content
      }
    }
    wsServer.clients.forEach(function each(client) {
      if (client.readyState === WebSocket.OPEN) {
        client.send(JSON.stringify(text))
      }
    })
  })
})

wsServer.on('open', () => {
  console.log('websocket server: 已建立连接')
})
wsServer.on('close', () => {
  console.log('websocket server: 已关闭连接')
})
wsServer.onerror = function () {
  console.log('websocket server: 出错了')
}
