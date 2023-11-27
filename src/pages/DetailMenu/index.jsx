import { useEffect, useState } from "react"
import NavBar from "../../component/Navbar"
import { useParams } from "react-router-dom"
import axios from "axios"
import { Link } from "react-router-dom"

function DetailMenu(){
    const {id} = useParams()
    const [menu, setMenu] = useState({})

    useEffect(() => {
        getMenu(id)
    }, [])

    const getMenu = (idMenu) => {
        axios.get(`https://api.mudoapi.tech/menu/${idMenu}`)
        .then(res => {
            setMenu(res.data.data)
        })
        .catch(err => console.log(err))
    }

    return (
        <>
            <NavBar/>
            <p>Name : {menu.name}</p>
            <p>Desc : {menu.description}</p>
            <p>Price : {menu.priceFormatted}</p>
            <Link to={`/edit/${menu.id}`}>
                <button>Edit</button>
            </Link>
        </>
    )
}

export default DetailMenu