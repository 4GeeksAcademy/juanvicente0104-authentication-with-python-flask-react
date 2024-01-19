import React, { useState, useContext } from "react"
import { Context } from "../store/appContext"
import { useNavigate } from "react-router-dom";

const Signup = () => {

    const { actions } = useContext(Context)

    const navigate = useNavigate()

    const [user, setUser] = useState({
        "email": "",
        "username": "",
        "password": "",
        "gender": "",
        "rol": ""
    });

    //Define our function to handle the user change
    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    const handleSignup = async (event) => {
        event.preventDefault()
        console.log(user)

        // Verifica que todos los campos requeridos estén completos
        if (user.email === "" || user.username === "" || user.password === "" || user.gender === "" || user.rol === "") {
            alert("Se deben llenar todos los datos para continuar")
            return
        }
        else {
            let result = await actions.signup(user)
            console.log(result)

            if (result === 400) {
                alert("Este usuario ya existe")
            }
            else if (result === 201) {
                alert("Registro exitoso")
                navigate("/login")
            }
            else {
                alert("No se pudo completar el registro. Intente despues")
            }
        }
    }

    return (
        <form onSubmit={handleSignup}>
            <fieldset>
                <legend>Signup</legend>
                <div className="mb-3">
                    <label htmlFor="TextInput" className="form-label">Email</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="example@email.com"
                        name="email"
                        value={user.email}
                        onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="TextInput" className="form-label">Username</label>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="username"
                        name="username"
                        value={user.username}
                        onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="TextInput" className="form-label">Password</label>
                    <input
                        type="password"
                        className="form-control"
                        placeholder="password"
                        name="password"
                        value={user.password}
                        onChange={handleChange} />
                </div>

                <div className="mb-3">
                    <label htmlFor="disabledSelect" className="form-label">Gender</label>
                    <select
                        className="form-control"
                        name="gender"
                        value={user.gender}
                        onChange={handleChange}>
                        <option selected>Select the gender</option>
                        <option>male</option>
                        <option>female</option>
                        <option>other</option>
                    </select>
                </div>

                <div className="mb-3">
                    <label htmlFor="disabledSelect" className="form-label">Rol</label>
                    <select
                        className="form-control"
                        name="rol"
                        value={user.rol}
                        onChange={handleChange}>
                        <option selected>Select the rol</option>
                        <option>admin</option>
                        <option>general</option>
                    </select>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </fieldset>
        </form>


    )
}

export default Signup