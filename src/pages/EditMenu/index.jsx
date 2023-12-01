import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useParams } from 'react-router-dom';
import NavBar from '../../component/Navbar';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import apiMenu from '../../api/menu'

const initialPayload = {
    name: "",
    description: "",
    type: "beverage",
    imageUrl: "",
    price: 0,
}

function EditMenu() {
    const navigate = useNavigate()

    const [editMenuPayload, setEditMenuPayload] = useState(initialPayload)
    const {id} = useParams()
    const [disableButtonSave, setDisableButtonSave] = useState(false)
    const [messageError, setMessageError] = useState(false)

    useEffect(() => {
        getMenuDetail(id)
    }, [])

    function handleSetValue(e) {
        let {name, value} = e.target
        if(name == "price"){
            value = parseInt(value)
        }
        setEditMenuPayload({...editMenuPayload, [name]: value})
        setMessageError(false)
    }

    async function getMenuDetail(idMenu){

        const res = await apiMenu.apiGetMenuDetail(idMenu)
        if (res.status == '200'){
            setEditMenuPayload(res.data.data)
        } else {
            console.log(res)
        }

    }

    async function handleEditMenu(idMenu){
        setDisableButtonSave(true)

        const res = await apiMenu.apiEditMenu(idMenu, editMenuPayload)

        if (res.status == 200){
            navigate(`/menu/${idMenu}`)
            setDisableButtonSave(false)
        } else {
            console.log(res)
            setDisableButtonSave(false)
            setMessageError(true)
        }
        
    }



    return (
        <>
            <NavBar/>
            <Form className="col-2 m-auto mt-5">
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Nama Menu</Form.Label>
                    <Form.Control name="name" type="text" placeholder="" onChange={handleSetValue} value={editMenuPayload.name}/>
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Deskripsi</Form.Label>
                    <Form.Control name="description" type="text" placeholder="" onChange={handleSetValue} value={editMenuPayload.description} />
                    <Form.Text className="text-muted">
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Tipe Menu</Form.Label>
                    <Form.Select name="type" onChange={handleSetValue} defaultValue={editMenuPayload.type}>
                            <option value={"beverage"} >Minuman</option>
                            <option value={"main-dish"} >Makanan</option>
                    </Form.Select>
                    <Form.Text className="text-muted" >
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Url Image</Form.Label>
                    <Form.Control name="imageUrl" type="text" placeholder="" onChange={handleSetValue} value={editMenuPayload.imageUrl} />
                    <Form.Text className="text-muted" >
                    </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="">
                    <Form.Label>Harga($)</Form.Label>
                    <Form.Control name="price" type="number" placeholder="" onChange={handleSetValue} value={editMenuPayload.price} />
                    <Form.Text className="text-muted" >
                    </Form.Text>
                </Form.Group>

            
                <Button variant="primary" onClick={(e) => handleEditMenu(editMenuPayload.id)} disabled={disableButtonSave}>
                    SAVE
                </Button>
            </Form>

            {
                messageError ? (
                    <Alert key={'danger'} variant={'danger'} className='mt-3'>
                        Gagal Edit Data
                    </Alert>
                ) : null
                
            }
        </>
    )
}

export default EditMenu