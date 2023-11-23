import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function FormLogin(){
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loginStatus, setLoginStatus] = useState('')
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    function handleUsername(e){
        setUsername(e.target.value)
        setLoginStatus('')
    }

    function handlePassword(e){
        setPassword(e.target.value)
        setLoginStatus('')
    }

    function handleLogin(){

        if(username == "" || password == ""){
            setLoginStatus("Username dan password wajib diisi!")
            return
        }

        setLoading(true)

        const bodyPayload = {
            username: username,
            password: password
        }

        axios.post(`https://api.mudoapi.tech/login`, bodyPayload)
        .then(res => {
            localStorage.setItem('accessToken', res.data.data.token)
            setLoginStatus(res.data.message)
            navigate('/')
            setLoading(false)
        })
        .catch(err => {
            setLoginStatus(err.response.data.message)
            setLoading(false)
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
                <Button variant="primary" onClick={handleLogin} disabled={loading}>
                    {
                        loading ? 'Loading' : 'Login'
                    }
                </Button>
            </Form>
        </>
    )
}

export default FormLogin

