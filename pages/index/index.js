const weatherMap = {
  'sunny': '晴天',
  'cloudy': '多云',
  'overcast': '阴',
  'lightrain': '小雨',
  'heavyrain': '大雨',
  'snow': '雪'
}
const weatherColorMap = {
  'sunny': '#cbeefd',
  'cloudy': '#deeef6',
  'overcast': '#c6ced2',
  'lightrain': '#bdd5e1',
  'heavyrain': '#c5ccd0',
  'snow': '#aae1fc'
}

Page({
  data: {
    nowTemp: '14℃',
    nowWeather: '阴天',
    nowWeatherBackground: '',
    hourlyWeather:[],
    
  },


  onPullDownRefresh() {
    this.getNow(() => {
      wx.stopPullDownRefresh();
    })

  },

  onLoad() {
    this.getNow();

  },

  getNow(callback) {
    wx.request({
      url: 'https://test-miniprogram.com/api/weather/now',
      header: {
        'Content-Type': 'application/json'
      },
      data: {
        city: '广州市'
      },
      success: res => {
        let result = res.data.result;
       this.setNow(result);
      this.setHourlyWeather(result);

      },
      complete: () => {
        callback && callback()
      }
    })
  },
  setNow(result){
  
    let temp = result.now.temp;
    let weather = result.now.weather;
    console.log(weather, temp);
    this.setData({
      nowTemp: temp + '℃',
      nowWeather: weatherMap[weather],
      nowWeatherBackground: '../../bgp/' + weather + '-bg.png'

    })
    wx.setNavigationBarColor({
      frontColor: '#000000',
      backgroundColor: weatherColorMap[weather],
    })
  },
  setHourlyWeather(result){
    let nowHour =new Date().getHours();
    let forecast =result.forecast;

    let hourlyWeather=[];
    for (let i = 0; i<8;i+=1)
     {
       hourlyWeather.push({

        time:(i*3+nowHour)%24+'时',
        iconPath:'../../bgp/'+forecast[i].weather+'-icon.png',
        
        temp:forecast[i].temp +'℃'
       })
        hourlyWeather[0].time='现在'
       } this.setData({
         hourlyWeather:hourlyWeather
       })
  }



})