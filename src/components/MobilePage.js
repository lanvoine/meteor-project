import React, { useState } from 'react';
import { Content, Header } from 'antd/lib/layout/layout';
import { Layout, Row, Col, DatePicker, TimePicker, Select, Card, Image } from 'antd';
import WeatherDisplay from './WeatherDisplay';
import ImageDisplay from './ImageDisplay';
import moment from 'moment'
import './result.css';
import '../App.css';

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
    const [checkSelect, setCheck] = useState(false);

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
        if (dateString == "") {
            setCheck(false)
        }
        dateSearch = dateString
        checkDate = true
        pullData()
    };

    const onChangeTime = (time, timeString) => {
        if (timeString == "") {
            setCheck(false)
        }
        timeSearch = timeString
        checkTime = true
        pullData()
    };
    
    const handleChange = (value) => {
        console.log(`selected ${value}`);
        setSelected(value)
        setCheck(true)
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
        }
    }

    return (
        <div>
            <Layout style={{minHeight:"100vh", height:"100%", overflow: "auto"}}>
                <Header>
                    WeatherPix
                </Header>
                    <Content className='content' style={{ padding: '50px 50px' }}>
                        <div className="site-layout-content">
                            <Row align="middle" style={{padding: "5px", fontFamily: "pompiere", fontSize: "x-large"}}>
                                Pick a Date, Time, and Location to begin
                            </Row>
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
                            <WeatherDisplay selectedValue={selectedValue} forecasts={forecasts} check={checkSelect}/>
                            <ImageDisplay metadata={areaMetadata} images={images} selectedValue={selectedValue} check={checkSelect}/>
                        </div>
                    </Content>
                </Layout>
        </div >
    );
}

export default MobilePage;