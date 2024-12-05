import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import bigStar from '../assets/bigStar.png'
import { fetchOneDevice, deleteOneDevice } from "../http/deviceAPI";
import { useNavigate, useParams } from 'react-router-dom';
import { SHOP_ROUTE } from '../utils/const';

const Device = () => {

    const [device, setDevice] = useState({info:[]})

    const {id} = useParams()

    const navigate = useNavigate() 

    const deleteDevice = () => {
        deleteOneDevice(id).then(
        navigate(`${SHOP_ROUTE}`)).then(alert('Девайс успешно удалён'))
    }

    useEffect (()=>{
        fetchOneDevice(id).then(data=>{
            setDevice(data)
      })
    },[])

    

    return (
        <Container>
            <div className={"d-flex justify-content-between align-items-center"}>
            <Col md={4}>
                <Image widtg={300} height={300} src={process.env.REACT_APP_API_URL + device.img}/>
            </Col>
            <Col md={4}>
                <Row>
                    <h2>{device.name}</h2>
                    <div 
                        className={"d-flex justify-content-center align-items-center"}
                        style={{background:`url(${bigStar}) no-repeat center center`, width:240, height:240, backgroundSize:'cover', fontSize:64}}
                    
                    >{device.rating}</div>
                </Row>
            </Col>
            <Col md={4}> 
                <Card
                className={"d-flex flex-column justify-content-around align-items-center"}
                style={{width:240, height:240, fontSize:64, border:'5px solid lightgray'}}
                >
                    <h3> От {device.price} руб. </h3>
                    <Button> Добавить в карзину</Button>
                </Card>
            </Col>
            </div>
            <Row
            className={"d-flex flex-column mt-3"}
            >
                <h1>Характеристики</h1>
                {device.info.map((info, index)=>
                <Row key={info.id} 
                className={"mt-1"}
                style={{background: index % 2 === 0 ? 'lightgray':'transparent'}}
                 > {info.title}:{info.description}</Row>)} 
            </Row>
            <Row>
                    <Button onClick={deleteDevice} > Удалить девайс </Button>
            </Row>

        </Container>
    );
};

export default Device;