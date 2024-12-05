import React from 'react';
import { Card, Col, Image } from 'react-bootstrap';
import star from '../assets/star.png'
import { useNavigate } from 'react-router-dom';
import { DEVICE_ROUTE } from '../utils/const';

const DeviceItem = ({device}) => {

    const navigate = useNavigate()

    return (
        <Col md={3} className='mt-3' onClick={()=>navigate(`${DEVICE_ROUTE}/${device.id}`)}>
           <Card 
           style={{cursor:'pointer', width:182,}} 
           border={'black'}
           >
            <Image width={150} height={150} src={process.env.REACT_APP_API_URL + device.img} className='m-3'/>
           
           <div className="d-flex justify-content-between align-items-center mt-1">
                <div className="text-black-50">
                    Брэнд
                </div>
                <div className="d-flex justify-content-between align-items-center">
                    <div>{device.rating}</div>
                    <Image width={10} height={10} src={star}/>
                </div>
           </div>
           <div>
                {device.name}   
           </div>
           </Card>
        </Col>
    );
};

export default DeviceItem;