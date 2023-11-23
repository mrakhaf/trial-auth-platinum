import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';

function FormLogin(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginStatus, setLoginStatus] = useState('')

    function handleUsername(e){
        setUsername(e.target.value)
    }

    function handlePassword(e){
        setPassword(e.target.value)
    }

    function handleLogin(){
        const bodyPayload = {
            username: username,
            password: password
        }

        axios.post(`https://api.mudoapi.tech/login`, bodyPayload)
        .then(res => {
            setLoginStatus(res.data.message)
        })
        .catch(err => {
            console.log(err.response)
            setLoginStatus(err.response)
        })
    }

    return (
        <>
            {
                loginStatus.length ? <p>{loginStatus}</p> : null
            }
            <Form className="col-2 m-auto mt-5">
                <Form.Group className="mb-3" controlId="formBasicUsername">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="username" placeholder="Enter username" onChange={handleUsername} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" placeholder="Password" onChange={handlePassword}/>
                </Form.Group>
                <Button variant="primary" onClick={handleLogin}>
                    Login
                </Button>
            </Form>
        </>
    )
}

export default FormLogin

