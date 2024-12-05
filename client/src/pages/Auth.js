import React,{useState, useContext} from 'react';
import Container from 'react-bootstrap/Container';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { NavLink, useLocation } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTRATION_ROUTE, SHOP_ROUTE } from '../utils/const';
import { registration,login } from '../http/userAPI';
import { observer } from 'mobx-react-lite';
import { Context } from '../index';
import { useNavigate } from 'react-router-dom'

const Auth = observer(() => {
    const location = useLocation()
    const {user} = useContext(Context) 
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const isLogin = location.pathname === LOGIN_ROUTE
    const navigate = useNavigate()

    const click = async () => {
        try{
            let data;
            if (isLogin){
                data= await login(email, password)
            }
            else{
                data = await registration(email, password)
            }
            user.setUser(user)
            user.setIsAuth(true)
            navigate(SHOP_ROUTE)

        } catch (e) {
            alert(e.responce.data.message) 
        }
        
       
    }

    return (
        <Container 
        className="d-flex justify-content-center align-items-center"
        style={{height: window.innerHeight-54}}
        >
            
            <Card style={{width:600}} className='p-5'>
                <h2 className='ml-auto'> {isLogin ? "Авторизация" : "Регистрация"} </h2>
                <Form className="d-flex flex-column">
                    <Form.Control
                        className="mt-3"
                        placeholder='Введите Ваш e-mail'
                        value={email}
                        onChange={e=>setEmail(e.target.value)}
                    />
                    <Form.Control
                        className="mt-3"
                        placeholder='Введите пароль'
                        value={password}
                        onChange={e=>setPassword(e.target.value)}
                        type = 'password'
                    />
                    <div className="d-flex justify-content-between mt-3 pl-3 pr-3">

                        <div>
                            <NavLink to={isLogin ? REGISTRATION_ROUTE : LOGIN_ROUTE}> {isLogin ? "Регистрация" : "Вход" } </NavLink>
                        </div>

                        <Button variant='outline-success' onClick={()=>click()}> {isLogin ? "Войти" : "Зарегистрироваться" } </Button>
                    
                    </div>

                </Form>
            </Card>
        </Container>
    );
})

export default Auth;