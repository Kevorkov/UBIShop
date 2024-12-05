import { observer } from 'mobx-react-lite';
import React, { useContext } from 'react';
import { Context } from '../index';
import { Button, ButtonGroup } from 'react-bootstrap';

const BrandBar = observer (() => {
    const {device} = useContext(Context)

    return (
        <ButtonGroup>
             {device.brands.map(brand=>
            <Button
                style={{cursor:'pointer'}}
                active={brand.id===device.selectedBrand.id}
                onClick={()=> device.setSelectedBrand(brand)}
                key={brand.id}
            >{brand.name}
            </Button>)} 
        </ButtonGroup>
    );
})

export default BrandBar;
