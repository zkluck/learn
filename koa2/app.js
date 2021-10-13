const Koa = require('koa');
const app = new Koa()
const axios = require('axios')
app.use(require('koa-static')('./public'))

// let url = 'https://movie.douban.com/j/subject_suggest?q=%E5%B0%8F%E5%A7%90'
let url = 'https://movie.douban.com/j/search_subjects?type=movie&tag=%E7%83%AD%E9%97%A8&sort=recommend&page_limit=20&page_start=0'

axios.get(url, {
    headers: {
        Host: 'movie.douban.com',
        Referer: 'https://movie.douban.com/'
    }
}).then((res)=>{
    console.log(res.data)
})



var request = require('request');
var fs = require('fs');
 
var img_src = 'https://img3.doubanio.com/view/photo/s_ratio_poster/public/p2567998580.jpg'; //获取图片的url
		//采用request模块，向服务器发起一次请求，获取图片资源
        request.head(img_src,function(err,res,body){
            if(err){
                console.log(err);
            }
        });
        
var img_filename = 'mu.jpg';   
    request(img_src).pipe(fs.createWriteStream('./'+ img_filename));  



app.listen(9527)