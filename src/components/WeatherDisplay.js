import React, { useState, useEffect } from "react";
import { Row, Col, Card, Image } from "antd";
import "./result.css";
import "../App.css";
import rain from "../rain.png";
import partcloud from "../partcloud.png";
import cloudy from "../cloudy.png";
import sun from "../sun.png";
import thunderstorm from "../thunderstorm.png";
import moon from "../crescent-moon.png";
import mooncloud from "../mooncloud.png";
import wind from "../wind.png";
import fairNight from "../rsz_1night-sky.jpg";
import fairDay from "../rsz_1cloud-blue-sky.jpg";
import cldDay from "../rsz-cloudy-day.jpg";
import cldNight from "../rsz-cloudy-night.jpg";
import lRain from "../rsz-lightrain.jpg";
import shwr from "../rsz-showers.jpg";
import thndr from "../rsz-thunderstorm.jpg";
import windy from "../rsz_windy.jpg";

function WeatherDisplay({ setBackgrd, forecasts, selectedValue, setColor }) {
  const [cardBackground, setCardBack] = useState("#ffffff");
  const [cardTextColor, setCardTextColor] = useState("#000000");
  const [cardImage, setCardImage] = useState(sun);
  const [cardForecast, setCardForecast] = useState("None");

  useEffect(() => {
    if (selectedValue != null) {
      let forecast = forecasts.find(
        (forecast) => forecast.area === selectedValue
      )?.forecast;

      if (forecast === undefined) {
        setCardBack("#ffffff");
        setCardTextColor("#000000");
        setCardImage(sun);
        setBackgrd(fairDay);
        setColor("#ffffff");
      } else if (forecast === "Fair (Night)") {
        setCardBack("#1B2430");
        setCardTextColor("#ffffff");
        setBackgrd(fairNight);
        setCardImage(moon);
        setColor("#ffffff");
      } else if (forecast === "Partly Cloudy (Day)") {
        setCardBack("#4b595e");
        setCardTextColor("#ffffff");
        setCardImage(partcloud);
        setBackgrd(cldDay);
        setColor("#ffffff");
      } else if (forecast === "Partly Cloudy (Night)") {
        setCardBack("#4b595e");
        setCardTextColor("#ffffff");
        setCardImage(mooncloud);
        setBackgrd(cldNight);
        setColor("#ffffff");
      } else if (forecast === "Fair (Day)") {
        setCardBack("#bdf7ff");
        setCardTextColor("#4b595e");
        setCardImage(sun);
        setBackgrd(fairDay);
        setColor("#ffffff");
      } else if (forecast === "Cloudy") {
        setCardBack("#4b595e");
        setCardTextColor("#ffffff");
        setCardImage(cloudy);
        setBackgrd(cldDay);
        setColor("#ffffff");
      } else if (forecast === "Light Rain") {
        setCardBack("#6393a4");
        setCardTextColor("#ffffff");
        setCardImage(rain);
        setBackgrd(lRain);
      } else if (forecast === "Showers") {
        setCardBack("#4c6972");
        setCardTextColor("#ffffff");
        setCardImage(rain);
        setBackgrd(shwr);
        setColor("#ffffff");
      } else if (forecast === "Thundery Showers") {
        setCardBack("#091A31");
        setCardTextColor("#ffffff");
        setCardImage(thunderstorm);
        setBackgrd(thndr);
        setColor("#ffffff");
      } else if (forecast === "Fair & Warm") {
        setCardBack("#bdf7ff");
        setCardTextColor("#4b595e");
        setCardImage(sun);
        setBackgrd(fairDay);
        setColor("#ffffff");
      } else if (forecast === "Moderate Rain") {
        setCardBack("#4c6972");
        setCardTextColor("#ffffff");
        setCardImage(rain);
        setBackgrd(shwr);
        setColor("#ffffff");
      } else if (forecast === "Light Showers") {
        setCardBack("#6393a4");
        setCardTextColor("#ffffff");
        setCardImage(rain);
        setBackgrd(lRain);
      } else if (forecast === "Passing Showers") {
        setCardBack("#6393a4");
        setCardTextColor("#ffffff");
        setCardImage(rain);
        setBackgrd(lRain);
      } else if (forecast === "Windy") {
        setCardBack("#808080");
        setCardTextColor("#ffffff");
        setCardImage(wind);
        setBackgrd(windy);
      } else if (forecast === "Heavy Thundery Showers with Gusty Winds") {
        setCardBack("#091A31");
        setCardTextColor("#ffffff");
        setCardImage(thunderstorm);
        setBackgrd(thndr);
        setColor("#ffffff");
      }

      setCardForecast(forecast);
    } else {
      setCardBack("#ffffff");
      setCardTextColor("#000000");
      setCardImage(sun);
      setBackgrd(fairDay);
      setColor("#ffffff");
    }
  }, [selectedValue, forecasts, setBackgrd, setColor]);

  return (
    <div>
      <Row
        align="middle"
        style={{
          height: "45%",
          fontFamily: "pompiere",
          fontSize: "x-large",
          padding: "5px",
        }}
      >
        Weather Forecast:
      </Row>
      <Row align="middle" style={{ padding: "5px" }}>
        <Col span={24} align="middle">
          <Card
            style={{
              fontFamily: "pompiere",
              fontSize: "x-large",
              color: cardTextColor,
              background: cardBackground,
              border: true,
              borderColor: "#4b595e",
              width: "100%",
              textAlign: "middle",
              height: "100%",
            }}
          >
            <Image src={cardImage} height={100} />
            <p />
            <p>{cardForecast}</p>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

export default WeatherDisplay;
