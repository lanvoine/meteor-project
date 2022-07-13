import React  from 'react';
import { Row, Col, Image } from 'antd';
import './result.css';
import '../App.css';
import temp from '../temp2.png'

function ImageDisplay(props) {
    var imageLink = temp

    var areaMetadata = props.metadata
    var images = props.images
    var selectedValue = props.selectedValue
    var check = props.check
    
    var closestDistance = 0
    var smallestImage = 0
    var latitude = 0
    var longitude = 0

    if (check) {
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
            if (image == 0) {
                closestDistance = distance
            }
            else if (distance < closestDistance) {
                closestDistance = distance
                smallestImage = image
            }
        }
        imageLink = images[smallestImage].image
    }

    return (
        <div>
            <Row align="middle" style={{height: "45%", padding: "5px", fontFamily: "pompiere", fontSize: "x-large"}}>
                Traffic Situation:
            </Row>
            <Row align="middle" style={{ padding: "5px"}}>
                <Col span={24} align="middle">
                    <Image
                        src={imageLink}
                    />
                </Col>
            </Row>
        </div>
    );
}

export default ImageDisplay;