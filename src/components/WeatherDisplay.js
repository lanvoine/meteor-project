import React, { useState }  from 'react';
import { Row, Col, Card, Image } from 'antd';
import './result.css';
import '../App.css';
import rain from '../rain.png'
import partcloud from '../partcloud.png'
import cloudy from '../cloudy.png'
import sun from '../sun.png'
import thunderstorm from '../thunderstorm.png'
import moon from '../crescent-moon.png'
import mooncloud from '../mooncloud.png'
import wind from '../wind.png'
import fairNight from '../rsz_1night-sky.jpg'
import fairDay from '../rsz_1cloud-blue-sky.jpg'
import cldDay from '../rsz-cloudy-day.jpg'
import cldNight from '../rsz-cloudy-night.jpg'
import lRain from '../rsz-lightrain.jpg'
import shwr from '../rsz-showers.jpg'
import thndr from '../rsz-thunderstorm.jpg'
import windy from '../rsz_windy.jpg'

function WeatherDisplay({setBackgrd, forecasts, selectedValue, check, setColor}) {
    var cardBack = "#ffffff"
    var cardText = "#000000"
    var image = sun
    var areaForecast = "None"
    // var forecasts = forecasts
    // var selectedValue = selectedValue
    // var check = check

    if (check) {
        var forecast = "None"
        if (selectedValue != "") {
            for (let cast in forecasts) {
                if (forecasts[cast].area == selectedValue) {
                    forecast = forecasts[cast].forecast
                }
            }
        }
        if (forecast == "None") {
            cardBack = "#ffffff"
            cardText = "#000000"
            image = sun
            setBackgrd(fairDay)
            setColor("#ffffff")
        } else if (forecast == "Fair (Night)") {
            cardBack = "#1B2430"
            cardText = "#ffffff"
            setBackgrd(fairNight)
            image = moon
            setColor("#ffffff")
        } else if (forecast == "Partly Cloudy (Day)") {
            cardBack = "#4b595e"
            cardText = "#ffffff"
            image = partcloud
            setBackgrd(cldDay)
            setColor("#ffffff")
        } else if (forecast == "Partly Cloudy (Night)") {
            cardBack = "#4b595e"
            cardText = "#ffffff"
            image = mooncloud
            setBackgrd(cldNight)
            setColor("#ffffff")
        } else if (forecast == "Fair (Day)") {
            cardBack = "#bdf7ff"
            cardText = "#4b595e"
            image = sun
            setBackgrd(fairDay)
            setColor("#ffffff")
        } else if (forecast == "Cloudy") {
            cardBack = "#4b595e"
            cardText = "#ffffff"
            image = cloudy
            setBackgrd(cldDay)
            setColor("#ffffff")
        } else if (forecast == "Light Rain") {
            cardBack = "#6393a4"
            cardText = "#ffffff"
            image = rain
            setBackgrd(lRain)
        } else if (forecast == "Showers") {
            cardBack = "#4c6972"
            cardText = "#ffffff"
            image = rain
            setBackgrd(shwr)
            setColor("#ffffff")
        } else if (forecast == "Thundery Showers") {
            cardBack = "#091A31"
            cardText = "#ffffff"
            image = thunderstorm
            setBackgrd(thndr)
            setColor("#ffffff")
        } else if (forecast == "Fair & Warm") {
            cardBack = "#bdf7ff"
            cardText = "#4b595e"
            image = sun
            setBackgrd(fairDay)
            setColor("#ffffff")
        } else if (forecast == "Moderate Rain") {
            cardBack = "#4c6972"
            cardText = "#ffffff"
            image = rain
            setBackgrd(shwr)
            setColor("#ffffff")
        } else if (forecast == "Light Showers") {
            cardBack = "#6393a4"
            cardText = "#ffffff"
            image = rain
            setBackgrd(lRain)
        } else if (forecast == "Passing Showers") {
            cardBack = "#6393a4"
            cardText = "#ffffff"
            image = rain
            setBackgrd(lRain)
        } else if (forecast == "Windy") {
            cardBack = "#808080"
            cardText = "#ffffff"
            image = wind
            setBackgrd(windy)
        } else if (forecast == "Heavy Thundery Showers with Gusty Winds") {
            cardBack = "#091A31"
            cardText = "#ffffff"
            image = thunderstorm
            setBackgrd(thndr)
            setColor("#ffffff")
        }
        areaForecast = forecast
    }

    return (
        <div>
            <Row align="middle" style={{height: "45%", fontFamily: "pompiere", fontSize: "x-large"}}>
                Weather Forecast:
            </Row>
            <Col span={24} align="middle">
                <Card style={{ fontFamily:"pompiere", fontSize: "x-large", color: cardText, background: cardBack, border: true, borderColor: "#4b595e", width: "100%", textAlign: "middle", height: "100%"}}>
                    <Image src={image} height={100}/>
                    <p/>
                    <p>{areaForecast}</p>
                </Card>
            </Col>
        </div>
    );
}

export default WeatherDisplay;