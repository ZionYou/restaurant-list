// 設定 express
const express = require('express')
const app = express()
const port = 3000

// 設定 handlebars
const exphbs = require('express-handlebars')

// 載入餐廳清單 JSON 檔
const restaurantList = require('./restaurant.json')

// 設定樣板引擎
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// 設定靜態檔案
app.use(express.static('public'))

// 設定首頁路由
app.get('/', (req, res) => {
  // 渲染index畫面
  res.render('index', { restaurants: restaurantList.results })
})

// 設定搜尋路由
app.get('/search', (req, res) => {
  // 設變數存取使用query搜尋的keyword
  const keyword = req.query.keyword
  // 設restaurants變數去篩選 restaurantList中符合restaurant.name或restaurant.category的關鍵字，並回傳到到變數中
  // .toLowerCase()轉換成小寫，.includes()去做包含keyword
  const restaurants =  restaurantList.results.filter(restaurant =>{
    return restaurant.name.toLowerCase().includes(keyword) || restaurant.category.toLowerCase().includes(keyword)
  })
  // 渲染index畫面
  res.render('index', { restaurants: restaurants, keyword: keyword })
})

// 設定餐廳資訊路由，使用params抓取餐廳的ID
app.get('/restaurants/:restaurant_id', (req, res) => {
  // 設restaurant變數篩選restaurantList中符合params抓取餐廳的ID
  const restaurant = restaurantList.results.filter(restaurant => restaurant.id == req.params.restaurant_id)
  // 渲染show畫面
  res.render('show', { restaurant: restaurant[0] })
})

// 設定伺服器監聽
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`)
})