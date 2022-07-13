import React, { useState } from 'react';
import { Content, Header } from 'antd/lib/layout/layout';
import { Layout, Row, Col, DatePicker, TimePicker, Select, Card, Menu, Image } from 'antd';
import moment from 'moment'
import './result.css';
import '../App.css';

const items = [
    {
      label: 'Home Page',
      key: '/',
    },
]

var checkDate = false
var checkTime = false
var dateSearch = ""
var timeSearch = ""

var optionList = [{
  }]

function MobilePage(props) {
    const [areaMetadata, setMetadata] = useState([]);
    const [forecasts, setForecasts] = useState([]);
    const [images, setImages] = useState([]);
    const [disableLocation, setDisabled] = useState(true);
    const [selectedValue, setSelected] = useState("None");
    const [areaForecast, setareaForcast] = useState("None");
    const [cardBack, setcardBack] = useState("#ffffff");
    const [cardText, setcardText] = useState("#000000");
    const [imageLink, setImageLink] = useState("data:image/png;base64,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");
    const onClick = (e) => {
        console.log('click ', e);
    };

    const disabledDate = (current) => {
        return current && current.valueOf() > Date.now();
    };

    const disabledHours = () => {
        var testDate = new Date(dateSearch)
        var today = Date.now()
        var todayDate = new Date(today)
        if (testDate.getUTCDate() == todayDate.getUTCDate() && testDate.getUTCMonth() == todayDate.getUTCMonth() && testDate.getUTCFullYear() == todayDate.getUTCFullYear()) {
            const hours = [];
            const currentHour = moment().hour();
        
            for (let i = currentHour + 1; i <= 24; i++) {
            hours.push(i);
            }
        
            return hours;
        }
    };
      
    const disabledMinutes = (selectedHour) => {
        var testDate = new Date(dateSearch)
        var today = Date.now()
        var todayDate = new Date(today)
        if (testDate.getUTCDate() == todayDate.getUTCDate() && testDate.getUTCMonth() == todayDate.getUTCMonth() && testDate.getUTCFullYear() == todayDate.getUTCFullYear()) {
            const minutes = [];
            const currentMinute = moment().minute();
            if (selectedHour === moment().hour()) {
                for (let i = currentMinute; i <= 60; i++) {
                minutes.push(i);
                }
            }
            return minutes;
        }
    };
    
    const onChangeDate = (date, dateString) => {
        dateSearch = dateString
        checkDate = true
        pullData()
    };

    const onChangeTime = (time, timeString) => {
        timeSearch = timeString
        checkTime = true
        pullData()
    };
    
    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setSelected(value)
        renderImage(value)
        renderForecast(value)
    };
    
    const pullData = () => {
        var momentObj = moment(dateSearch + timeSearch, 'YYYY-MM-DDLT');
        var combined = momentObj.format('YYYY-MM-DD[T]HH:mm:ss');
        var weatherURL = "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=" + encodeURIComponent(combined);
        var imageURL = "https://api.data.gov.sg/v1/transport/traffic-images?date_time=" + encodeURIComponent(combined);
        console.log(checkDate, checkTime)
        var forecasts = []
        if (checkDate == true && checkTime == true){
            fetch(weatherURL)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.message == 'invalid datetime format') {
                        setForecasts([])
                        forecasts = []
                        setMetadata([])
                    } else {
                        setForecasts(result.items[0].forecasts)
                        forecasts = result.items[0].forecasts
                        setMetadata(result.area_metadata)
                    }

                    var temp = []
                    if (forecasts.length == 0) {
                        optionList = forecasts
                        setDisabled(true)
                    }
                    else {
                        setDisabled(false)
                        for (let fore in forecasts) {
                            temp.push({value: forecasts[fore].area})
                        }
                        optionList = temp
                    }
                },

                (error) => {
                console.log("Error Getting Results")
                }
            )

            fetch(imageURL)
            .then(res => res.json())
            .then(
                (result) => {
                    if (result.message == 'invalid datetime format') {
                        setImages([])
                    } else {
                        setImages(result.items[0].cameras)
                    }
                },

                (error) => {
                console.log("Error Getting Results")
                }
            )
            // checkDate = false
            // checkTime = false
        }
    }

    const renderForecast = (selectedValue) => {
        var forecast = "None"
        if (selectedValue != "") {
            for (let cast in forecasts) {
                if (forecasts[cast].area == selectedValue) {
                    forecast = forecasts[cast].forecast
                }
            }
        }
        if (forecast == "None") {
            setcardBack("#ffffff")
            setcardText("#000000")
        } else if (forecast == "Fair (Night)") {
            setcardBack("#1B2430")
            setcardText("#ffffff")
        } else if (forecast == "Partly Cloudy (Day)") {
            setcardBack("#4b595e")
            setcardText("#ffffff")
        } else if (forecast == "Partly Cloudy (Night)") {
            setcardBack("#4b595e")
            setcardText("#ffffff")
        } else if (forecast == "Fair (Day)") {
            setcardBack("#bdf7ff")
            setcardText("#4b595e")
        } else if (forecast == "Cloudy") {
            setcardBack("#4b595e")
            setcardText("#ffffff")
        } else if (forecast == "Light Rain") {
            setcardBack("#6393a4")
            setcardText("#ffffff")
        } else if (forecast == "Showers") {
            setcardBack("#4c6972")
            setcardText("#ffffff")
        } else if (forecast == "Thundery Showers") {
            setcardBack("#091A31")
            setcardText("#ffffff")
        }
        setareaForcast(forecast)
    }

    const renderImage = (selectedValue) => {
        console.log(images)
        var closestDistance = 0
        var smallestImage = 0
        var latitude = 0
        var longitude = 0
        if (selectedValue != "") {
            for (let data in areaMetadata) {
                if (areaMetadata[data].name == selectedValue) {
                    latitude = areaMetadata[data].label_location.latitude
                    longitude = areaMetadata[data].label_location.longitude
                    break
                }
            }
            for (let image in images) {
                var iLat = images[image].location.latitude
                var iLong = images[image].location.longitude
                var distance = Math.sqrt( Math.pow((latitude-iLat), 2) + Math.pow((longitude-iLong), 2) );
                console.log(distance)
                if (image == 0) {
                    closestDistance = distance
                }
                else if (distance < closestDistance) {
                    closestDistance = distance
                    smallestImage = image
                }
            }
            console.log(images[smallestImage].image)
            console.log(closestDistance)
            setImageLink(images[smallestImage].image)
        }
    }


    return (
        <div>
            <Layout style={{height:"100vh", overflow: "auto"}}>
                <Header>
                    WeatherPix
                </Header>
                    <Content className='content' style={{ padding: '50px 50px' }}>
                        <div className="site-layout-content">
                            <Row align="middle" style={{padding: '5px 5px'}}>
                                <Col span={12} align="middle" style={{ height: 100}}>
                                    <DatePicker onChange={onChangeDate} disabledDate={disabledDate} style={{ border: true, borderColor: "#4b595e", color: "#ffffff", width: "100%", textAlign: 'center', height: 100}} />
                                </Col>
                                <Col span={12} align="middle">
                                    <TimePicker minuteStep={15} format="HH:mm" disabledHours={disabledHours} disabledMinutes={disabledMinutes} onChange={onChangeTime} style={{ border: true, borderColor: "#4b595e", color: "#ffffff", width: "100%", textAlign: 'center', height: 100 }} />
                                </Col>
                                
                            </Row>
                            <Row align="middle" style={{padding: '5px 5px'}}>
                                <Col span={24} align="middle">
                                    <Select
                                        disabled={disableLocation}
                                        placeholder="Select a Location"
                                        height={100}
                                        style={{
                                            border: true, borderColor: "#4b595e", color: "#000000", width: "100%", textAlign: 'start'
                                        }}
                                        onChange={handleChange}
                                        options={optionList}
                                        
                                    />
                                </Col> 
                            </Row>
                            <Row align="middle" style={{padding: '5px 5px'}}>
                                <Col span={24} align="middle">
                                    <Card style={{ color: cardText, background: cardBack, border: true, borderColor: "#4b595e", width: "100%", textAlign: "start", height: "100%"}}>
                                        <p>Area: {selectedValue}</p>
                                        <p>Forecast: {areaForecast}</p>
                                    </Card>
                                </Col>
                            </Row>
                            <Row align="middle" style={{padding: '5px 5px'}}>
                                <Col span={24} align="middle">
                                    <Image
                                        height={100}
                                        src={imageLink}
                                        fallback="data:image/png;base64,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"
                                    />
                                </Col>                            
                            </Row>
                        </div>
                    </Content>
                </Layout>
        </div >
    );
}

export default MobilePage;