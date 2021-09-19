import express from 'express'
const app = express()

app.get('/message', (req, res) => {
  res.send('Thông tin máy chủ')
})

app.post('/message', (req, res) => {
  if (req) {
    res.send(req + '--Node')
  }
})

export default app
