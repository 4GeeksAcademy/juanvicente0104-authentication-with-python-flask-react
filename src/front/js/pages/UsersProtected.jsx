import React, { useContext } from "react"
import { Context } from "../store/appContext"
import { useNavigate, Navigate } from "react-router-dom" /* Import function to redirec (useNavigate outside the jsx) */

const UsersProtected = () => {
    const { store } = useContext(Context)
    let navigate = useNavigate()
    return (

        <>
            {
                store.token == null ?
                    <Navigate to="/login"/> :
                    (
                        <h1>Welcome to your private route</h1>
                    )
            }
        </>
    )
}

export default UsersProtected