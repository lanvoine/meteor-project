import React, { useState } from "react";
import { Content, Header } from "antd/lib/layout/layout";
import { Layout, Row, Col, DatePicker, TimePicker, Select } from "antd";
import moment from "moment";
import "./result.css";
import "../App.css";
import WeatherDisplay from "./WeatherDisplay";
import ImageDisplay from "./ImageDisplay";
import fairDay from "../rsz_1cloud-blue-sky.jpg";

function Main(props) {
  const [areaMetadata, setMetadata] = useState([]);
  const [forecasts, setForecasts] = useState([]);
  const [disableLocation, setDisabled] = useState(true);
  const [selectedValue, setSelected] = useState();
  const [background, setBackgrd] = useState(fairDay);
  const [headerColor, setColor] = useState("#fffffff");
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [locations, setLocations] = useState([]);
  const [imageURL, setImageURL] = useState();

  const disabledDate = (current) => {
    return current && current.valueOf() > Date.now();
  };

  const disabledHours = () => {
    var selectedDate = new Date(date);
    var today = Date.now();
    var todayDate = new Date(today);

    if (
      selectedDate.getDate() === todayDate.getDate() &&
      selectedDate.getMonth() === todayDate.getMonth() &&
      selectedDate.getFullYear() === todayDate.getFullYear()
    ) {
      const hours = [];
      const currentHour = moment().hour();

      for (let i = currentHour + 1; i <= 24; i++) {
        hours.push(i);
      }

      return hours;
    }
  };

  const disabledMinutes = (selectedHour) => {
    var selectedDate = new Date(date);
    var today = Date.now();
    var todayDate = new Date(today);
    if (
      selectedDate.getUTCDate() === todayDate.getUTCDate() &&
      selectedDate.getUTCMonth() === todayDate.getUTCMonth() &&
      selectedDate.getUTCFullYear() === todayDate.getUTCFullYear()
    ) {
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
    if (dateString === "") {
      setDate(null);
      setSelected(null);
      setDisabled(true);
      setLocations([]);
    } else {
      setDate(dateString);
      pullData(dateString, time);
    }
  };

  const onChangeTime = (time, timeString) => {
    if (timeString === "") {
      setTime(null);
      setSelected(null);
      setDisabled(true);
      setLocations([]);
    } else {
      setTime(timeString);
      pullData(date, timeString);
    }
  };

  const handleChange = (value) => {
    console.log(`selected ${value}`);
    setSelected(value);
  };

  const pullData = (date, time) => {
    let momentObj = moment(date + time, "YYYY-MM-DDLT");
    let combined = momentObj.format("YYYY-MM-DD[T]HH:mm:ss");
    let weatherURL =
      "https://api.data.gov.sg/v1/environment/2-hour-weather-forecast?date_time=" +
      encodeURIComponent(combined);
    setImageURL(
      "https://api.data.gov.sg/v1/transport/traffic-images?date_time=" +
        encodeURIComponent(combined)
    );

    if (date != null && time != null) {
      fetch(weatherURL)
        .then((res) => res.json())
        .then(
          (result) => {
            var forecasts = [];
            console.log(result);
            if (result.message === "invalid datetime format") {
              setForecasts([]);
              forecasts = [];
              setMetadata([]);
            } else {
              setForecasts(result.items[0].forecasts);
              forecasts = result.items[0].forecasts;
              setMetadata(result.area_metadata);
            }

            setLocations(
              forecasts.map((forecast) => {
                return { value: forecast.area };
              })
            );
            setDisabled(forecasts.length === 0);
          },

          (error) => {
            console.log("Error Getting Results");
          }
        );
    }
  };

  return props.isMobile ? mobileUI(headerColor, background, onChangeDate, onChangeTime, disabledHours, disabledMinutes, disabledDate, disableLocation, handleChange, locations, areaMetadata, imageURL, selectedValue, forecasts, setBackgrd, setColor) : desktopUI(headerColor, background, onChangeDate, onChangeTime, disabledHours, disabledMinutes, disabledDate, disableLocation, handleChange, locations, areaMetadata, imageURL, selectedValue, forecasts, setBackgrd, setColor);
}

let desktopUI = (headerColor, background, onChangeDate, onChangeTime, disabledHours, disabledMinutes, disabledDate, disableLocation, handleChange, locations, areaMetadata, imageURL, selectedValue, forecasts, setBackgrd, setColor) => {
    return (
        <div>
          <Layout
            style={{
              minHeight: "100vh",
              height: "100%",
              overflow: "auto",
              backgroundImage: `url(${background})`,
            }}
          >
            <Header style={{ color: headerColor }}>WeatherPix</Header>
            <Content
              className="content"
              style={{ height: "100%", padding: "0px 50px" }}
            >
              <div className="site-layout-content">
                <Row align="middle">
                  <Col span={24} align="middle" style={{ height: "100%" }}>
                    <Row
                      align="middle"
                      style={{
                        padding: "5px",
                        fontFamily: "pompiere",
                        fontSize: "x-large",
                      }}
                    >
                      Pick a Date, Time, and Location to begin
                    </Row>
                    <Row align="middle" style={{ height: "10%", padding: "5px" }}>
                      <Col span={12} align="middle">
                        <DatePicker
                          onChange={onChangeDate}
                          disabledDate={disabledDate}
                          style={{
                            border: true,
                            borderColor: "#4b595e",
                            color: "#ffffff",
                            width: "100%",
                            textAlign: "center",
                            height: "5vh",
                          }}
                        />
                      </Col>
                      <Col span={12} align="middle">
                        <TimePicker
                          format="HH:mm"
                          disabledHours={disabledHours}
                          disabledMinutes={disabledMinutes}
                          onChange={onChangeTime}
                          style={{
                            border: true,
                            borderColor: "#4b595e",
                            color: "#ffffff",
                            width: "100%",
                            textAlign: "center",
                            height: "5vh",
                          }}
                        />
                      </Col>
                    </Row>
                    <Row align="middle" style={{ height: "45%", padding: "5px" }}>
                      <Col span={24} align="middle">
                        <Select
                          disabled={disableLocation}
                          placeholder="Select a Location"
                          size="large"
                          bordered
                          borderColor="#000000"
                          style={{
                            border: true,
                            borderColor: "#4b595e",
                            color: "#000000",
                            width: "100%",
                            textAlign: "start",
                          }}
                          onChange={handleChange}
                          options={locations}
                        />
                      </Col>
                    </Row>
                    <Row align="top" style={{ height: "45%", padding: "5px" }}>
                      <Col span={18} align="middle">
                        <ImageDisplay
                          metadata={areaMetadata}
                          imageURL={imageURL}
                          selectedValue={selectedValue}
                        />
                      </Col>
                      <Col span={1} align="middle"></Col>
                      <Col span={5} align="middle">
                        <WeatherDisplay
                          selectedValue={selectedValue}
                          forecasts={forecasts}
                          setBackgrd={setBackgrd}
                          setColor={setColor}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Content>
          </Layout>
        </div>
      );
}

let mobileUI = (headerColor, background, onChangeDate, onChangeTime, disabledHours, disabledMinutes, disabledDate, disableLocation, handleChange, locations, areaMetadata, imageURL, selectedValue, forecasts, setBackgrd, setColor) => {
    return (
    <div>
      <Layout
        style={{
          minHeight: "100vh",
          height: "100%",
          overflow: "auto",
          backgroundImage: `url(${background})`,
        }}
      >
        <Header style={{ color: headerColor }}>WeatherPix</Header>
        <Content className="content" style={{ padding: "0px 50px" }}>
          <div className="site-layout-content">
            <Row
              align="middle"
              style={{
                padding: "5px",
                fontFamily: "pompiere",
                fontSize: "x-large",
              }}
            >
              Pick a Date, Time, and Location to begin
            </Row>
            <Row align="middle" style={{ padding: "5px 5px" }}>
              <Col span={12} align="middle">
                <DatePicker
                  onChange={onChangeDate}
                  disabledDate={disabledDate}
                  style={{
                    border: true,
                    borderColor: "#4b595e",
                    color: "#ffffff",
                    width: "100%",
                    textAlign: "center",
                  }}
                />
              </Col>
              <Col span={12} align="middle">
                <TimePicker
                  minuteStep={15}
                  format="HH:mm"
                  disabledHours={disabledHours}
                  disabledMinutes={disabledMinutes}
                  onChange={onChangeTime}
                  style={{
                    border: true,
                    borderColor: "#4b595e",
                    color: "#ffffff",
                    width: "100%",
                    textAlign: "center",
                  }}
                />
              </Col>
            </Row>
            <Row align="middle" style={{ padding: "5px 5px" }}>
              <Col span={24} align="middle">
                <Select
                  disabled={disableLocation}
                  placeholder="Select a Location"
                  size="medium"
                  bordered
                  borderColor="#000000"
                  style={{
                    border: true,
                    borderColor: "#4b595e",
                    color: "#000000",
                    width: "100%",
                    textAlign: "start",
                  }}
                  onChange={handleChange}
                  options={locations}
                />
              </Col>
            </Row>
            <WeatherDisplay
              selectedValue={selectedValue}
              forecasts={forecasts}
              setBackgrd={setBackgrd}
              setColor={setColor}
            />
            <ImageDisplay
              metadata={areaMetadata}
              imageURL={imageURL}
              selectedValue={selectedValue}
            />
          </div>
        </Content>
      </Layout>
    </div>
  );
}

export default Main;
