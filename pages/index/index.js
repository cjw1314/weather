Page({
data:{
nowTemp:'14℃',
nowWeather:'阴天'

},


onLoad(){
    console.log("hello world");
    wx.request({
        url: 'https://test-miniprogram.com/api/weather/now',
        header: {
            'Content-Type': 'application/json'
        },
        data:{
            city:'广州市'
        },
        success: res=> {
            console.log(res.data);
          let result=res.data.result;
          let temp = result.now.temp;
          let weather=result.now.weather;
          console.log(weather,temp);
          this.setData({
            nowTemp:temp,
            nowWeather:weather
          })
        }
    })
}





})