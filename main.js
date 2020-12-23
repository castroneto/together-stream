const { app, BrowserWindow } = require('electron')
var PeerServer = require('peer').PeerServer;
var server = PeerServer({port: 9000, path: '/myapp'});

server.on('connection', function(client) {
    console.log(client)
})
function createWindow () {
  
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    }
  })

  win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})
