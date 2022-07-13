import React  from 'react';
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


function WeatherDisplay(props) {
    var cardBack = "#ffffff"
    var cardText = "#000000"
    var image = sun
    var areaForecast = "None"
    var forecasts = props.forecasts
    var selectedValue = props.selectedValue
    var check = props.check

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
        } else if (forecast == "Fair (Night)") {
            cardBack = "#1B2430"
            cardText = "#ffffff"
            image = moon
        } else if (forecast == "Partly Cloudy (Day)") {
            cardBack = "#4b595e"
            cardText = "#ffffff"
            image = partcloud
        } else if (forecast == "Partly Cloudy (Night)") {
            cardBack = "#4b595e"
            cardText = "#ffffff"
            image = mooncloud
        } else if (forecast == "Fair (Day)") {
            cardBack = "#bdf7ff"
            cardText = "#4b595e"
            image = sun
        } else if (forecast == "Cloudy") {
            cardBack = "#4b595e"
            cardText = "#ffffff"
            image = cloudy
        } else if (forecast == "Light Rain") {
            cardBack = "#6393a4"
            cardText = "#ffffff"
            image = rain
        } else if (forecast == "Showers") {
            cardBack = "#4c6972"
            cardText = "#ffffff"
            image = rain
        } else if (forecast == "Thundery Showers") {
            cardBack = "#091A31"
            cardText = "#ffffff"
            image = thunderstorm
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
                    <p>Forecast: {areaForecast}</p>
                </Card>
            </Col>
        </div>
    );
}

export default WeatherDisplay;