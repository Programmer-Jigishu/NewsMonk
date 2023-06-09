import React, { useEffect } from 'react'

function Weather() {
    // const [data, setData] = useState({});
    useEffect(() => {
        console.log("1\n");

        const fetchData = async () => {
            let queryUrl = "http://api.weatherapi.com/v1/forecast.json?key=9be1fdb9bc724d61a5a05719221107&q=Udaipur&days=3&aqi=yes&alerts=no";
            let data = "";
            let parsedData = "";
            try {
                data = await fetch(queryUrl);
                parsedData = await data.json();

            } catch (error) {
                console.log("Fetch Nahi ho Raha");
            }
            document.getElementById("wrapper-bg").style.backgroundColor = "black"

            console.log(parsedData);
            // Weather main data
            let main = parsedData.current.condition.text;
            let description = parsedData.current.condition.text;
            let temp = Math.round(parsedData.current.temp_c);
            let pressure = parsedData.current.pressure_mb;
            let humidity = parsedData.current.humidity;
            let name = parsedData.location.name;

            console.log("2\n");
            document.getElementById("wrapper-description").innerHTML = description;
            document.getElementById("wrapper-temp").innerHTML = temp + "°C";
            document.getElementById("wrapper-pressure").innerHTML = pressure;
            document.getElementById("wrapper-sunset").innerHTML = parsedData.forecast.forecastday[0].astro.sunrise;
            document.getElementById("wrapper-sunrise").innerHTML = parsedData.forecast.forecastday[0].astro.sunset;
            document.getElementById("wrapper-humidity").innerHTML = humidity + "°C";
            document.getElementById("wrapper-name").innerHTML = name;
            console.log("3\n");
            // Time
            let timeNow = new Date().getHours();
            let timeArr = [timeNow + 1, timeNow + 2, timeNow + 3, timeNow + 4, timeNow + 5];
            for (let i = 0; i < timeArr.length; i++) {
                if (timeArr[i] >= 24) {
                    timeArr[i] = timeArr[i] - 24;
                }

            }
            let time1 = timeArr[0];
            let time2 = timeArr[1];
            let time3 = timeArr[2];
            let time4 = timeArr[3];
            let time5 = timeArr[4];


            document.getElementById("wrapper-time1").innerHTML = time1 + ":00";
            document.getElementById("wrapper-time2").innerHTML = time2 + ":00";
            document.getElementById("wrapper-time3").innerHTML = time3 + ":00";
            document.getElementById("wrapper-time4").innerHTML = time4 + ":00";
            document.getElementById("wrapper-time5").innerHTML = time5 + ":00";
            console.log("4\n");
            // Weather daily data
            let tomorrowTemp = Math.round(parsedData.forecast.forecastday[1].day.avgtemp_c);
            let dATTemp = Math.round(parsedData.forecast.forecastday[2].day.avgtemp_c);
            // let tomorrowMain = parsedData.forecast.forecastday[1].day.condition.text;
            // let dATTempMain = parsedData.forecast.forecastday[2].day.condition.text;

            document.getElementById("wrapper-forecast-temp-today").innerHTML =
                temp + "°";
            document.getElementById("wrapper-forecast-temp-tomorrow").innerHTML =
                tomorrowTemp + "°";
            document.getElementById("wrapper-forecast-temp-dAT").innerHTML =
                dATTemp + "°";

            console.log("5\n");
            // Today
            let iconFullyUrlToday = parsedData.current.condition.icon;
            document.getElementById("wrapper-icon-today").src = iconFullyUrlToday;


            // Tomorrow

            let iconFullyUrlTomorrow = parsedData.forecast.forecastday[1].day.condition.icon;
            document.getElementById(
                "wrapper-icon-tomorrow"
            ).src = iconFullyUrlTomorrow;
            console.log("6\n");
            // Day after tomorrow
            let iconFullyUrlDAT = parsedData.forecast.forecastday[2].day.condition.icon;
            document.getElementById("wrapper-icon-dAT").src = iconFullyUrlDAT;

            // Icons hourly

            // ==============ALL HOURS AFTER
            const allHourAfter = parsedData.forecast.forecastday[0].hour.filter((item) => {
                return new Date(item.time).getHours() >= timeNow
            })
            console.log("7\n");
            if (timeNow > 20) {
                allHourAfter.push(parsedData.forecast.forecastday[1].hour[0]);
                allHourAfter.push(parsedData.forecast.forecastday[1].hour[1]);
                allHourAfter.push(parsedData.forecast.forecastday[1].hour[2]);
                allHourAfter.push(parsedData.forecast.forecastday[1].hour[3]);
                allHourAfter.push(parsedData.forecast.forecastday[1].hour[4]);
            }

            console.log(allHourAfter);
            console.log("8\n");
            // Hour now

            let iconFullyUrlHourNow = allHourAfter[0].condition.icon;
            document.getElementById(
                "wrapper-icon-hour-now"
            ).src = iconFullyUrlHourNow;

            // Hour1
            let iconFullyUrlHour1 = allHourAfter[1].condition.icon;
            document.getElementById("wrapper-icon-hour1").src = iconFullyUrlHour1;

            // Hour2
            let iconFullyUrlHour2 = allHourAfter[2].condition.icon;
            // let iconFullyUrlHour2 = iconBaseUrl + iconHour2 + iconFormat;
            document.getElementById("wrapper-icon-hour2").src = iconFullyUrlHour2;

            // Hour3
            let iconFullyUrlHour3 = allHourAfter[3].condition.icon;
            // let iconFullyUrlHour3 = iconBaseUrl + iconHour3 + iconFormat;
            document.getElementById("wrapper-icon-hour3").src = iconFullyUrlHour3;

            // Hour4
            let iconFullyUrlHour4 = allHourAfter[4].condition.icon;
            // let iconFullyUrlHour4 = iconBaseUrl + iconHour4 + iconFormat;
            document.getElementById("wrapper-icon-hour4").src = iconFullyUrlHour4;

            // Hour5
            let iconFullyUrlHour5 = allHourAfter[5].condition.icon;
            // let iconFullyUrlHour5 = iconBaseUrl + iconHour5 + iconFormat;
            document.getElementById("wrapper-icon-hour5").src = iconFullyUrlHour5;

            console.log("9\n");

            // Backgrounds

            const wrapperBg = document.getElementById('wrapper-bg');

            if (/(drizzle|rain)/i.test(main)) {
                wrapperBg.style.backgroundImage =
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/rain.gif')";
            } else if (/(thunderstorm|thunder)/i.test(main)) {
                wrapperBg.style.backgroundImage =
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/thunderstorm.gif')";

            }
            else if (/(fog|mist)/i.test(main)) {
                wrapperBg.style.backgroundImage =
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/fog.gif')";
            }
            else if (/(snow|blowing snow|pellets|sleet)/i.test(main)) {
                wrapperBg.style.backgroundImage =
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/snow.gif')";
            } else if (main === "Clean") {
                wrapperBg.style.backgroundImage =
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";

            } else if (/(cloudy|Overcast)/i.test(main)) {
                wrapperBg.style.backgroundImage =
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/clouds.gif')";
            } else {

                wrapperBg.style.backgroundImage =
                    "url('https://mdbgo.io/ascensus/mdb-advanced/img/clear.gif')";

            }







            wrapperBg.style.backgroundSize = 'cover';
            wrapperBg.style.backgroundRepeat = 'no-repeat';
            wrapperBg.style.backgroundPosition = 'center center';


        }
        fetchData();
    }, []);






    return (
        <section >
            <div className="container py-5">

                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-12">

                        <div id="wrapper-bg" className="card text-white bg-image shadow-4-strong"
                            style={{ backgroundImage: "url('img/clouds.gif')" }}>
                            {/* <!-- Main current data --> */}
                            <div className="card-header p-4 border-0">
                                <div className="text-center mb-3">
                                    <p className="h2 mb-1" id="wrapper-name"></p>
                                    <p className="mb-1" id="wrapper-description"></p>
                                    <p className="display-1 mb-1" id="wrapper-temp"></p>
                                    <span className="">Pressure: <span id="wrapper-pressure"></span></span>
                                    <span className="mx-2">|</span>
                                    <span className="">Humidity: <span id="wrapper-humidity"></span></span><br />
                                    <span className="">Sunrise: <span id="wrapper-sunrise"></span></span>
                                    <span className="mx-2">|</span>
                                    <span className="">Sunset: <span id="wrapper-sunset"></span></span>
                                </div>
                            </div>

                            {/* <!-- Hourly forecast --> */}
                            <div className="card-body p-4 border-top border-bottom mb-2">
                                <div className="row text-center">
                                    

                                    <div className="col-2 d-flex flex-column align-items-center">
                                        <strong className="d-block mb-2" id="wrapper-time-now">Now</strong>
                                        <img id="wrapper-icon-hour-now" src="" className="" alt="" />
                                        <strong className="d-block" id="wrapper-hour5"></strong>
                                    </div>
                                    <div className="col-2 d-flex flex-column align-items-center">
                                        <strong className="d-block mb-2" id="wrapper-time1"></strong>
                                        <img id="wrapper-icon-hour1" src="" className="" alt="" />
                                        <strong className="d-block" id="wrapper-hour5"></strong>
                                    </div>
                                    <div className="col-2 d-flex flex-column align-items-center">
                                        <strong className="d-block mb-2" id="wrapper-time2"></strong>
                                        <img id="wrapper-icon-hour2" src="" className="" alt="" />
                                        <strong className="d-block" id="wrapper-hour5"></strong>
                                    </div>
                                    <div className="col-2 d-flex flex-column align-items-center">
                                        <strong className="d-block mb-2" id="wrapper-time3"></strong>
                                        <img id="wrapper-icon-hour3" src="" className="" alt="" />
                                        <strong className="d-block" id="wrapper-hour5"></strong>
                                    </div>
                                    <div className="col-2 d-flex flex-column align-items-center">
                                        <strong className="d-block mb-2" id="wrapper-time4"></strong>
                                        <img id="wrapper-icon-hour4" src="" className="" alt="" />
                                        <strong className="d-block" id="wrapper-hour5"></strong>
                                    </div>
                                    <div className="col-2 d-flex flex-column align-items-center">
                                        <strong className="d-block mb-2" id="wrapper-time5"></strong>
                                        <img id="wrapper-icon-hour5" src="" className="" alt="" />
                                        <strong className="d-block" id="wrapper-hour5"></strong>
                                    </div>
                                </div>
                            </div>

                            {/* <!-- Daily forecast --> */}
                            <div className="card-body px-3">


                                <div className="lh-lg row align-items-center">
                                    <div className="jigishu col-5 col-lg-6 ">
                                        <strong>Today</strong>
                                    </div>

                                    <div className="jigishu col-4 col-lg-2 text-center">
                                        <img id="wrapper-icon-today" src="" className="w-100" alt="" />
                                    </div>

                                    <div className="jigishu col-3 col-lg-4  text-end">
                                        <span id="wrapper-forecast-temp-today"></span>
                                    </div>
                                </div>



                                <div className=" row align-items-center">
                                    <div className="jigishu col-5 col-lg-6">
                                        <strong>Tomorrow</strong>
                                    </div>

                                    <div className="jigishu col-4 col-lg-2 text-center">
                                        <img id="wrapper-icon-tomorrow" src="" className="w-100" alt="" />
                                    </div>

                                    <div className="jigishu col-3 col-lg-4 text-end">
                                        <span id="wrapper-forecast-temp-tomorrow">28</span>
                                    </div>
                                </div>

                                <div className="lh-lg row align-items-center">
                                    <div className="jigishu col-5 col-lg-6">
                                        <strong>Day after tomorrow</strong>
                                    </div>

                                    <div className="jigishu col-4 col-lg-2 text-center">
                                        <img id="wrapper-icon-dAT" src="" className="w-100" alt="" />
                                    </div>

                                    <div className="jigishu col-3 col-lg-4 text-end">
                                        <span id="wrapper-forecast-temp-dAT">28</span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </section>


    )
}

export default Weather