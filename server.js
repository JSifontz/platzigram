let express = require('express');
var multer  = require('multer');
var ext = require('file-extension')

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null, +Date.now() + '.' + ext(file.originalname))
  }
})

var upload = multer({ storage: storage }).single('picture');

var app = express()

app.set('view engine', 'pug');

app.use(express.static('public'))

app.get('/', function (req, res){
  res.render('index')
})

app.get('/signup', function (req, res){
  res.render('index')
})

app.get(`/signin`, function (req, res){
  res.render('index')
})

app.get('/jsifontz', function(req, res){
  res.render('index')
})

app.get('/api/pictures', function(req, res){

  var pictures = [
    {
      user: {
        username: 'Jsifontz',
        avatar: 'https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/934789_10204908159815295_5539513431950082752_n.jpg?oh=fa157351bef22608ae46dc96ca487c75&oe=5A43271E'
      },
      url: 'office.jpg',
      likes: 0,
      liked: false,
      createdAt: new Date().getTime()
    },
    {
      user: {
        username: 'Jsifontz',
        avatar: 'https://scontent-mia3-2.xx.fbcdn.net/v/t1.0-9/934789_10204908159815295_5539513431950082752_n.jpg?oh=fa157351bef22608ae46dc96ca487c75&oe=5A43271E'
      },
      url: 'office.jpg',
      likes: 1,
      liked: true,
      createdAt: new Date().setDate(new Date().getDate() - 10)
    }
  ]

  setTimeout(function(){
    res.send(pictures);
  }, 2000)
})

app.post('/api/pictures', function(req, res){
  // upload.single('Aqui va el valor de "name" que está en el input')
  upload(req, res, function(err){
    if (err) {
      return res.status(500).send("Error uploading file")
    }
    res.status(200).send('File uploaded')
  })
})

app.listen(3000, function(err){
  if(err) return console.log('Hubo un error'), process.exit(2)
  console.log('Platzigram escuchando en el puerto 3000')
})
