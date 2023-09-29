import React,{useState,useEffect} from 'react'

const Weather=()=> {

    const[search, setSearch]=useState('London')
    const[data, setData]=useState([])
    const[input, setInput]=useState("")
    
    // featch the data using api

    useEffect(() => {
        let componentMounted = true;

        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=f640a2b433a0022be8764f39e823b71c`);
                

                if (componentMounted) {
                    const result = await response.json();

                    console.log('Response:', response);
                    console.log('Result:', result);
                    
                    setData(result);
                    
                }
            } catch (error) {
                console.error('Error fetching weather data:', error);
            }
        }

        fetchWeather();

        return () => {
            componentMounted = false;
        };
    }, [search]);   

    // based on weathercondition change the emoji

    let emoji=null;

    if(typeof data.main !="undefined"){
        if(data.weather[0].main === "Clouds"){
            emoji="fa-cloud"
        }else if(data.weather[0].main === "Thunderstrome"){
            emoji="fa-bolt"
        }else if(data.weather[0].main === "Drizzle"){
            emoji="fa-cloud-rain"
        }else if(data.weather[0].main === "Rainy"){
            emoji="fa-cloud-shower-heavy"
        }else if(data.weather[0].main === "Snow"){
            emoji="fa-snow-flake"
        }else {
            emoji="fa-smog"
        }
    }

    //for temprature convertion in degrees

    const temperature = data ? (data.main?.temp - 237.15).toFixed(2) : null; 
    const max_temperature = data ? (data.main?.temp_max - 237.15).toFixed(2) : null;
    const min_temperature = data ? (data.main?.temp_min - 237.15).toFixed(2) : null;

    // for form submition handler 

    const submitHandler=(event)=>{
        event.preventDefault()
        setSearch(input)
    }


    // for data & time format

    let d = new Date()
    let date = d.getDate()
    let month = d.toLocaleString("default", {month:"long"})
    let year = d.getFullYear()
    let day = d.toLocaleString("default", {weekday:"long"})

    let hours = d.getHours()
    let minutes = d.getMinutes().toString().padStart(2, '0');
    let seconds = d.getSeconds().toString().padStart(2, '0');
    
    // for am/pm time convertion    
    let amOrPm = hours >=12 ? "PM" :"AM"
    hours = hours % 12 || 12

    let time = `${hours}:${minutes}:${seconds} ${amOrPm}`;
 
    // weather conditions

    let weatherMessage 

    if (Array.isArray(data.weather) && data.weather.length > 0) {
    const weatherCondition = data.weather[0].main;

    console.log(weatherCondition)

    switch (weatherCondition) {
        case 'Clear':
        weatherMessage = 'Clear sky';
        break;
        case 'Clouds':
        weatherMessage = 'Cloudy';
        break;
        case 'Rain':
        weatherMessage = 'Rainy';
        break;
        case 'Drizzle':
        weatherMessage = 'Drizzling';
        break;
        case 'Snow':
        weatherMessage = 'Snowy';
        break;
        case 'Thunderstorm':
        weatherMessage = 'Thunderstorm';
        case 'Haze':
        weatherMessage = 'Hazy';
        break;
        default:
        weatherMessage = 'Unknown weather condition';
    }
    }



  return (
    <div>
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-4 ">
                    <div className="card text-white text-center  position-absolute border-0">
                    {data.weather && data.weather.length > 0 && (
                    <img src={`https://source.unsplash.com/random/?${data.weather[0].main}`} 
                        className="card-img" alt="..." style={{width: "400px", height: "700px"}}
                    />
                    )}
                        
                        <div className="card-img-overlay ml-4">
                            <form onSubmit={submitHandler}>
                                <div className="input-group mb-4 w-75 mx-auto">
                                    <input type="search" 
                                           className="form-control" 
                                           placeholder="Search City" 
                                           aria-label="Search City" 
                                           aria-describedby="basic-addon2"
                                           name="search"
                                           value={input}
                                           onChange={(e)=>setInput(e.target.value)}
                                           required
                                    />
                                    <button type="submit" className="input-group-text" id="basic-addon2">
                                        <i className='fas fa-search'></i>
                                    </button>
                                </div>
                            </form>
                            <div className='bg-dark bg-opacity-50 py-3 '>
                                <h2 className="card-title">{data.name}</h2>
                                <p className="card-text">
                                    {day}, {month} {date}, {year}
                                    <br/> 
                                    {time}
                                </p>
                                <hr/>
                                <i className={`fas ${emoji} fa-4x`}></i>
                                <h1 className='fw-bold mb-5'>{temperature}&deg;c</h1>
                                <p className='lead fw-bold mb-1'>{weatherMessage}</p>
                                <p className='lead fw-600'>{min_temperature}&deg;c | {max_temperature}&deg;c </p>
                            </div>                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather
