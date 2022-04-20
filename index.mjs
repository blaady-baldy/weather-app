import request from 'request';
import express from 'express';
import 'dotenv/config'

const app = express();

app.listen(3000);

app.set('view engine', 'ejs');
app.use(express.urlencoded());
app.use(express.json());
app.use( express.static( "public" ) );

const apiKey = process.env.API_KEY;
var message = 'Find the Weather hereee !!'
app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  const city = req.body.cityname;
  const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKey}`;
  request(url, function (err, response, body) {
    if(err){
      console.log('error:', error);
    } else {
      const weather = JSON.parse(body);
      message = `It's ${weather.main.temp} degrees in ${weather.name}!`;
      res.render('index', {message : message});
    }
  });
  
})

app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});