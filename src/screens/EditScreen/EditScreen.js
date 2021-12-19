import React from 'react'
import { useLocation, useParams } from "react-router-dom"

function EditScreen() {
    const {handle} = useParams()

    console.log(handle)
    return (
        <div>
            hello
        </div>
    )
}

export default EditScreen
