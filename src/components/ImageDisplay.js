import React, { useState, useEffect } from "react";
import { Row, Col, Image } from "antd";
import "./result.css";
import "../App.css";
import placeholder from "../temp2.png";

function ImageDisplay(props) {
  const [imageLink, setImageLink] = useState(placeholder);
  const [images, setImages] = useState([]);

  let areaMetadata = props.metadata;
  let imageURL = props.imageURL;
  let selectedValue = props.selectedValue;

  useEffect(() => {
    fetch(imageURL)
      .then((res) => res.json())
      .then(
        (result) => {
          if (result.message === "invalid datetime format") {
            setImages([]);
          } else {
            setImages(result.items[0].cameras);
          }
          if (selectedValue != null) {
            var closestDistance = 0;
            var smallestImage = 0;

            let metadata = areaMetadata.find(
              (data) => data.name === selectedValue
            );
            let latitude = metadata?.label_location.latitude;
            let longitude = metadata?.label_location.longitude;
            for (let image in images) {
              let iLat = images[image].location.latitude;
              let iLong = images[image].location.longitude;
              let distance = Math.sqrt(
                Math.pow(latitude - iLat, 2) + Math.pow(longitude - iLong, 2)
              );
              if (image === "0") {
                closestDistance = distance;
              } else if (distance < closestDistance) {
                closestDistance = distance;
                smallestImage = image;
              }
            }
            setImageLink(images[smallestImage].image);
          } else {
            setImageLink(placeholder);
          }
        },

        (error) => {
          console.log("Error Getting Results");
        }
      );
  }, [selectedValue, areaMetadata, imageURL, images]);

  return (
    <div>
      <Row
        align="middle"
        style={{
          height: "45%",
          padding: "5px",
          fontFamily: "pompiere",
          fontSize: "x-large",
        }}
      >
        Traffic Situation:
      </Row>
      <Row align="middle" style={{ padding: "5px" }}>
        <Col span={24} align="middle">
          <Image src={imageLink} />
        </Col>
      </Row>
    </div>
  );
}

export default ImageDisplay;
