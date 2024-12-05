import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import {Container,ListGroup} from 'react-bootstrap';
import { Context } from '../index';

const TypeBar = observer(() => {

    const {device} = useContext(Context)

    return (
    <Container>
        <ListGroup>
             {device.types.map(type=>
            <ListGroup.Item 
                style={{cursor:'pointer'}}
                active={type.id===device.selectedType.id}
                onClick={()=> device.setSelectedType(type)}
                key={type.id}

            >{type.name}
            </ListGroup.Item>)} 
        </ListGroup>
    </Container>
    );
});

export default TypeBar;

