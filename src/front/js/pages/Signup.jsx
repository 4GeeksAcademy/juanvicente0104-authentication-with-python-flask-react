import React, { useState, useContext } from "react"
import { Context } from "../store/appContext"

const Signup = () => {

    const { actions } = useContext(Context)

    const [user, setUser] = useState({
        "email": "",
        "username": "",
        "password": "",
        "gender": "",
        "rol":""
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
        let result = await actions.signup(user)
        console.log(result)
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
                    onChange={handleChange}/>
                </div>
                <div className="mb-3">
                    <label htmlFor="disabledSelect" className="form-label">Gender</label>
                    <select 
                    id="disabledSelect" 
                    className="choose gender"
                    name="gender"
                    value={user.gender}
                    onChange={handleChange}>
                        <option>male</option>
                        <option>female</option>
                        <option>other</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="disabledSelect" className="form-label">Rol</label>
                    <select 
                    id="disabledSelect" 
                    className="choose rol"
                    name="rol"
                    value={user.rol}
                    onChange={handleChange}>
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