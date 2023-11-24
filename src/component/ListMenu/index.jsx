import { useState, useEffect } from 'react'
// import './style.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

const ListMenu = () => {

    const [menus, setMenus] = useState([])
    const [name, setName] = useState("")
    const [type, setType] = useState("")
    const [reset, setReset] = useState(false)
    const [deleteMessage, setDeleteMessage] = useState('')

    useEffect(() => {
        getMenus('', '')
    }, [])

    const getMenus = (dataName, dataType) => {
        axios.get(`https://api.mudoapi.tech/menus?name=${dataName}&type=${dataType}&perPage=100&page=1`)
        .then(res => {
            setMenus(res.data.data.Data)
        })
        .catch(err => console.log(err))
    }

    const handleSubmit = (e) => {
        setReset(true)
        getMenus(name, type)
    }

    const handleChangeName = (e) => {
        setName(e.target.value)
    }

    const handleChangeType = (e) => {
        setType(e.target.value)
    }

    const resetMenu = (e) => {
        setReset(false)
        setType("")
        setName("")
        getMenus('', '')
    }

    function handleDelete(e, id){
        e.preventDefault()
        const token = localStorage.getItem('accessToken')
        axios.delete(`https://api.mudoapi.tech/menu/${id}`, 
            {
                headers: {
                    Authorization: token
                }
            }
        )
        .then(res => {
            console.log(res.data.message)
            getMenus(name, type)
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <form className='mt-5'>
                <div className="search-car d-flex justify-content-center">
                    <div className="row shadow bg-white rounded p-3 mb-5 mx-auto">
                        <div className="col-sm">
                            <p>Makanan</p>
                            <input type="text" className="form-control" placeholder="Ketik Nama Makanan" aria-label="Username" aria-describedby="basic-addon1" onChange={handleChangeName} value={name}></input>
                        </div>
                        <div className="col-sm">
                            <p>Kategori</p>
                            <select className="form-select text-muted" aria-label="Default select example" onChange={handleChangeType} value={type}>
                                <option value={""}>Pilih</option>
                                <option value={"beverage"}>Minuman</option>
                                <option value={"main-dish"}>Makanan</option>
                            </select>
                        </div>
                        
                        {
                            
                            reset ? (
                                <div className="col-sm col-md-2 d-flex align-items-end">
                                    <button type="button" className="btn btn-success" onClick={resetMenu}>Reset</button>
                                </div>
                            ) : (
                                <div className="col-sm col-md-2 d-flex align-items-end">
                                    <button type="button" className="btn btn-success" onClick={handleSubmit}>Cari</button>
                                </div>
                            )
                        }

                    </div>
                </div>
                <Link to={'/create-menu'}>
                    <button type="button" className="btn btn-warning">ADD MENU</button>
                </Link>
                <div className="justify-content-center">
                    { menus.length ? (
                            menus.map((menu, id) => (
                                <div key={id}>
                                    <div >
                                        <h1>{menu.name} </h1>
                                        <h2>{menu.description}</h2>
                                    </div>
                                    <Link to={`menu/${menu.id}`}>
                                        <button>detail</button>
                                    </Link>
                                    <button onClick={(e) => handleDelete(e, menu.id)}>delete</button>
                                </div>    
                            ))
                        ) : (
                            <h1></h1>
                    )
                    }
                </div>
            </form>
        </>
    )
}

export default ListMenu