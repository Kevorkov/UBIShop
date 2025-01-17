import React, { useState, useContext, useEffect } from 'react';
import {Button, Col, Dropdown, Form, Modal, Row} from 'react-bootstrap';
import { Context } from '../../index';
import { fetchTypes, fetchBrands, createDevice } from "../../http/deviceAPI";
import { observer } from 'mobx-react-lite';


const CreateDevice = observer (({show, onHide}) => {

  const {device} = useContext(Context)
  
  const [name,setName] = useState('')
  const [price,setPrice] = useState(0)
  const [file,setFile] = useState(null)
  const [info, setInfo] = useState([])

  useEffect(()=>{
    fetchTypes().then(data=>{
        device.setTypes(data)
    })
    fetchBrands().then(data=>{
        device.setBrands(data)
    })
},[])

  const addInfo = ()=>{
    setInfo([...info,{title:'', description:'', number: Date.now()}] )
  }

  const changeInfo = (key, value, number)=>{
    setInfo(info.map(i => i.number === number ? {...i,[key]:value} : i))
  }

  const removeInfo = (number)=>{
    setInfo(info.filter(i => i.number !== number))
  }

  const selectFile = e => {
    setFile(e.target.files[0])
  }

  const addDevice = () => {   
    const formData = new FormData()
    formData.append('name', name)
    formData.append('price', `${price}`)
    formData.append('img', file)
    formData.append('brandId', device.selectedBrand.id)
    formData.append('typeId', device.selectedType.id)
    formData.append('info', JSON.stringify(info))
    createDevice(formData).then(data => onHide())
  }
        
    return (
<Modal
        show={show}
        onHide={onHide}
        size="lg"
        centered
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
            Добавить устройство
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
            <Form >
              <Dropdown className='mt-3 mb-2'>
                <Dropdown.Toggle> {device.selectedType.name || "Выберите тип"} </Dropdown.Toggle>
                <Dropdown.Menu> 
                  {device.types.map(type => <Dropdown.Item onClick={()=>{device.setSelectedType(type)}} key={type.id}> {type.name} </Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown className='mt-3 mb-2'>
                <Dropdown.Toggle> {device.selectedBrand.name || "Выберите брэнд"} </Dropdown.Toggle>
                <Dropdown.Menu> 
                  {device.brands.map(brand => <Dropdown.Item onClick={()=>{device.setSelectedBrand(brand)}} key={brand.id}> {brand.name} </Dropdown.Item>)}
                </Dropdown.Menu>
              </Dropdown>
              <Form.Control 
                            value={name}
                            onChange={e=>setName(e.target.value)} 
                            placeholder={'Введите название устройства'} 
                            className='mt-3 mb-2' />
              <Form.Control 
                            value={price}
                            onChange={e=>setPrice(Number(e.target.value))}              
                            placeholder={'Введите цену устройства'} 
                            className='mt-3 mb-2' 
                            type="number"/>
              <Form.Control 
                            className='mt-3 mb-2' 
                            type="file"
                            onChange = {selectFile} />
              <hr/>
              <Button variant={'outline-dark'} 
              onClick={addInfo}
              > Добавить новое свойство </Button>
              {
                info.map(i=>
                <Row className='mt-3' key={i.number}> 
                  <Col md={4}>
                    <Form.Control 
                        placeholder={'Введите название свойства'}
                        value = {i.title}
                        onChange = {(e)=>{changeInfo('title', e.target.value, i.number)}}
                    />
                  </Col>
                  <Col md={4}>
                    <Form.Control 
                        value = {i.description}
                        onChange = {(e)=>{changeInfo('description', e.target.value, i.number)}}
                        placeholder={'Введите значение свойства'}/>
                  </Col>
                  <Col md={4}>
                    <Button variant={'outline-danger'} onClick={()=>removeInfo(i.number)}> Удалить </Button>
                  </Col>
                </Row>)
              }
                       
            </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={onHide} variant={'outline-danger'} >Закрыть</Button>
        <Button onClick={addDevice} variant={'outline-success'} >Добавить</Button>
      </Modal.Footer>
    </Modal>
    );
});

export default CreateDevice;