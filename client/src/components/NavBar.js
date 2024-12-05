import React, { useContext } from 'react';
import { Context } from '../index';
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import {NavLink, useNavigate} from 'react-router-dom'
import { ADMIN_ROUTE, LOGIN_ROUTE, SHOP_ROUTE } from '../utils/const';
import Button from 'react-bootstrap/Button'
import {observer} from 'mobx-react-lite'

const NavBar = observer ( () => {
    
    const {user} = useContext(Context)
    const {device} = useContext(Context)

    const navigate = useNavigate() 

    const logOut = ()=>{
          user.setUser({})
          user.setIsAuth(false)
        }

    return (
    <Navbar bg="dark" data-bs-theme="dark">
        <Container>
            <NavLink style={{color:'white'}} to={SHOP_ROUTE} onClick={()=>{device.setSelectedType(''); device.setSelectedBrand('') }}> Главная </NavLink>        
        
            {user.isAuth ? 
                <Nav className="ml-auto" style={{color:'white'}}>
                    <Button variant={'outline-light'} className="mr-10" onClick={()=>navigate (`${ADMIN_ROUTE}`)}>Admin panel</Button>
                    <Button variant={'outline-light'} className="pl-10" onClick={()=>logOut()}>Exit</Button>
                </Nav>
                :
                <Nav className="ml-auto" style={{color:'white'}}>
                    <Button variant={'outline-light'} onClick={()=>navigate (`${LOGIN_ROUTE}`)} >Enter</Button>
                </Nav>
        }  
        </Container>
    </Navbar>
    );
}
)

export default NavBar;