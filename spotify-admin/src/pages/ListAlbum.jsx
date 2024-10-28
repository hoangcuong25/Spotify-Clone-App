/* eslint-disable react/jsx-key */
import React, { useEffect, useState } from 'react'
import { assets } from '../assets/admin-assets/assets'
import axios from 'axios'
import { url } from '../App'
import { toast } from 'react-toastify'

const ListAlbum = () => {

    const [data, setData] = useState([])

    const fetchAlbums = async () => {
        try {
            const response = await axios.get(`${url}/api/album/listAlbum`)

            if (response.data && response.data.success) {
                setData(response.data.albums)
            }

        } catch {
            toast.error("Error occured")
        }
    }

    const removeAlbum = async (id) => {
        try {
            const respond = await axios.post(`${url}/api/album/remove`, { id })

            if (respond.data && respond.data.success) {
                toast.success(respond.data.success)
                await fetchAlbums()
            }
        } catch {
            toast.error("Error occured")
        }
    }

    useEffect(() => {
        fetchAlbums()
    }, [])

    return (
        <div>
            <p>All Albums List</p>
            <br />
            <div>
                <div className='sm:grid hidden grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5 bg-gray-100'>
                    <b>Image</b>
                    <b>Name</b>
                    <b>Description</b>
                    <b>Album Color</b>
                    <b>Action</b>
                </div>
                {data.map((item, index) => {
                    return (
                        <div key={index} className='grid grid-cols-[1fr-1fr-1fr] sm:grid-cols-[0.5fr_1fr_2fr_1fr_0.5fr] items-center gap-2.5 p-3 border border-gray-300 text-sm mr-5'>
                            <img src={item.image} alt="" />
                            <p>{item.name}</p>
                            <p>{item.desc}</p>
                            <input type="color" value={item.bgColor} />
                            <p onClick={() => removeAlbum(item._id)} className='cursor-pointer'>X</p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default ListAlbum