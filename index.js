const PORT =8000
const axios  = require ('axios');
const cheerio = require('cheerio');
const { response } = require('express');
const express = require('express');
const res = require('express/lib/response');
// const { append } = require('express/lib/response');

const app = express()
const cors = require('cors')
const url = 'https://www.theguardian.com/uk'

app.use(cors())

app.get('/', function (req,res) {
    res.json('this is my web scrapper')
})

app.get('/results', (req,res)=> {
    axios(url) 
   .then(response => {
       const html = response.data
       const $ = cheerio.load(html)
       const articles =[]
// get attributes or load html with cheerio
       $('.fc-item__title',html).each(function(){
          const title= $(this).text()
          const url= $(this).find('a').attr('href')
          articles.push({
              title,
              url
          })
       })
       //console.log(articles)
       // err handeling 
       res.json(articles)
   }).catch(err => console.log(err))
})



app.listen(PORT,()=> console.log(`server runing on PORT ${PORT}`))