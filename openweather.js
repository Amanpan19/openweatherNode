import fetch from 'node-fetch'
import http from 'http'
import urlData from 'url'

const port = 4001;


const tempK = (temp) =>{
    return (temp-273.15).toFixed(2);
}

const myServer = http.createServer((req,res)=>{

    if(req.url.startsWith(`/weather/`)){

        // http://loccalhost:4001/weather/?city=nameOfCity
        
        const urlParse = urlData.parse(req.url,true).query;
        const city = urlParse.city;
        const url  = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=fbfce8ba1bedd6e47a51541f12cee44b`

        fetch(url)
        .then(response=>response.json())
        .then(data=>{
            console.log(data);
            const weatherObj = {
                "City" : data.name,
                "Current Temperature" : tempK(data.main.temp)+" °C",
                "Current pressure": (data.main.pressure)/1000+" bar",
                "Current Humidity": (data.main.humidity)+"%",
                "Current wind speed":(data.wind.speed)+" Km/h"
            }
            res.end(JSON.stringify(weatherObj));
        })
        .catch(error =>{
            console.error("Data Not Found..!"+error)
            res.end("Data Not Found");
        })
    }
})

myServer.listen(port,()=>{
    console.log("Listning to port : ",port);
})

    



 