import { useState, useEffect } from 'react';

const useFetch= (url)=> {
  const [cityData, setCityData] = useState("");
  
    console.log(url)
   
  useEffect(() => {
    // Check if geolocation is available in the browser "This is for understanding purpose only"
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        const { latitude, longitude } = position.coords;
        
        try {
          // Use a reverse geocoding service to get the city name based on coordinates
          const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`);
          const data = await response.json();
          console.log(data)
          setCityData(data.address.city);
        } catch (error) {
          console.error(error);
          setCityData("Hyderabad")
        }
      });
    } else {
      setCityData("Hyderabad")
      console.log("gopi")
    }
  }, []);

  useEffect(()=>{
    let inter = setTimeout(()=>{
        if(cityData === ""){
            setCityData("Hyderabad")
        }
    },3000)
    return ()=> clearTimeout(inter)
  },[cityData])
 return [cityData]
 
}

export default useFetch;
