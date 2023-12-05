import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { Alert } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const initialPayload = {
    name: "",
    description: "",
    type: "beverage",
    imageUrl: "",
    price: 0,
}

function FormCreateMenu(){
    const navigate = useNavigate()

    const [addMenuPayload, setAddMenuPayload] = useState(initialPayload)
    const [messageAddMenu, setMessageAddMenu] = useState('')
    const [loading, setLoading] = useState(false)

    function handleSetValue(e) {
        let {name, value} = e.target
        setAddMenuPayload({...addMenuPayload, [name]: value})
    }

    function handleAddMenu(){   
        setLoading(true)

        const token = localStorage.getItem('accessToken')

        addMenuPayload.price = parseInt(addMenuPayload.price)

        axios.post(`https://api.mudoapi.tech/menu`, 
            addMenuPayload,
            {
                headers: {
                    Authorization: token,
                }
            }
        )
        .then(res => {
            setMessageAddMenu(res.data.messageTitle)
            setLoading(false)
            navigate('/')
        })
        .catch(err => {
            console.log(err)
            setMessageAddMenu(err.response.data.messageTitle)
            setLoading(false)
            navigate('/')
        })
    }


    return (
        <>
            <Form className="col-2 m-auto mt-5">
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Nama Menu</Form.Label>
                    <Form.Control name="name" type="text" placeholder="" onChange={handleSetValue} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Deskripsi</Form.Label>
                    <Form.Control name="description" type="text" placeholder="" onChange={handleSetValue} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Tipe Menu</Form.Label>
                    <Form.Select name="type" onChange={handleSetValue}>
                            <option value={"beverage"}>Minuman</option>
                            <option value={"main-dish"}>Makanan</option>
                    </Form.Select>
                    <Form.Text className="text-muted" >
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Url Image</Form.Label>
                    <Form.Control name="imageUrl" type="text" placeholder="" onChange={handleSetValue} />
                    <Form.Text className="text-muted" >
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Harga($)</Form.Label>
                    <Form.Control name="price" type="number" placeholder="" onChange={handleSetValue} />
                    <Form.Text className="text-muted" >
                    </Form.Text>
                </Form.Group>

            
                <Button variant="primary" onClick={handleAddMenu} disabled={loading}>
                    ADD
                </Button>
            </Form>

            {
                messageAddMenu == "Success" ? (
                    <Alert key={'success'} variant={'success'} className='mt-3'>
                        Sukses Tambah Menu
                    </Alert>
                ) : messageAddMenu != "" ? (
                    <Alert key={'danger'} variant={'danger'} className='mt-3'>
                        {messageAddMenu}
                    </Alert>
                ) : (
                    null
                )

                
            }

            
        </>
    )
}

export default FormCreateMenu