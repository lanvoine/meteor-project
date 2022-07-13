import React, { useState } from 'react';
import { Content, Header } from 'antd/lib/layout/layout';
import { Layout, Row, Col, DatePicker, TimePicker, Select } from 'antd';
import moment from 'moment'
import './result.css';
import '../App.css';
import WeatherDisplay from './WeatherDisplay';
import ImageDisplay from './ImageDisplay';
import fairDay from '../rsz_1cloud-blue-sky.jpg'

var checkDate = false
var checkTime = false
var dateSearch = ""
var timeSearch = ""

var optionList = [{
  }]

function DesktopPage(props) {
    const [areaMetadata, setMetadata] = useState([]);
    const [forecasts, setForecasts] = useState([]);
    const [images, setImages] = useState([]);
    const [disableLocation, setDisabled] = useState(true);
    const [selectedValue, setSelected] = useState("None");
    const [checkSelect, setCheck] = useState(false);
    const [background, setBackgrd] = useState(fairDay);
    const [hColor, setColor] = useState("#fffffff");

    const disabledDate = (current) => {
        return current && current.valueOf() > Date.now();
    };

    const disabledHours = () => {
        var testDate = new Date(dateSearch)
        var today = Date.now()
        var todayDate = new Date(today)

        if (testDate.getDate() == todayDate.getDate() && testDate.getMonth() == todayDate.getMonth() && testDate.getFullYear() == todayDate.getFullYear()) {
            console.log("test")
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
            <Layout style={{minHeight:"100vh", height:"100%", overflow: "auto", backgroundImage: `url(${background})`}}>
                <Header style={{color: hColor}}>
                    WeatherPix
                </Header>
                    <Content className='content' style={{ height: "100%", padding: '50px 50px' }}>
                        <div className="site-layout-content">
                        <Row align="middle">
                            <Col span={16} align="middle" style={{height: "100%"}}>
                            <Row align="middle" style={{padding: "5px", fontFamily: "pompiere", fontSize: "x-large"}}>
                                Pick a Date, Time, and Location to begin
                            </Row>
                                <Row align="middle" style={{height: "10%", padding: "5px"}}>
                                    <Col span={11} align="middle">
                                        <DatePicker onChange={onChangeDate} disabledDate={disabledDate} style={{ border: true, borderColor: "#4b595e", color: "#ffffff", width: "100%", textAlign: 'center', height: '5vh' }} />
                                    </Col>
                                    <Col span={2} align="middle"></Col>
                                    <Col span={11} align="middle">
                                        <TimePicker minuteStep={15} format="HH:mm" disabledHours={disabledHours} disabledMinutes={disabledMinutes} onChange={onChangeTime} style={{ border: true, borderColor: "#4b595e", color: "#ffffff", width: "100%", textAlign: 'center', height: '5vh' }} />
                                    </Col>
                                </Row>
                                <Row align="middle" style={{height: "45%", padding: "5px"}}>
                                    <Col span={24} align="middle">
                                        <Select
                                            disabled={disableLocation}
                                            placeholder="Select a Location"
                                            style={{
                                                border: true, borderColor: "#4b595e", color: "#000000", width: "100%", textAlign: 'start', height: '10%'
                                            }}
                                            onChange={handleChange}
                                            options={optionList}
                                        />
                                    </Col> 
                                </Row>
                                <ImageDisplay metadata={areaMetadata} images={images} selectedValue={selectedValue} check={checkSelect}/>
                            </Col>
                            <Col span={1} align="middle"></Col>
                            <Col span={7} align="middle">
                                <WeatherDisplay selectedValue={selectedValue} forecasts={forecasts} check={checkSelect} setBackgrd={setBackgrd} setColor={setColor}/>
                            </Col>
                        </Row>
                        </div>
                    </Content>
                </Layout>
        </div >
    );
}

export default DesktopPage;