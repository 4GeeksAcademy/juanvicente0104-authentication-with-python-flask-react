import React, { useState, useContext } from "react"
import { Context } from "../store/appContext"

const Login = () => {

    const { actions } = useContext(Context)

    //Define our user state as an JS object that can change with the input
    const [user, setUser] = useState({
        email: "",
        password: ""
    })

    //Define our function to handle the user change
    const handleChange = (event) => {
        setUser({
            ...user,
            [event.target.name]: event.target.value
        })
    }

    //Define a function to connect to the DB and verify the login!

    const handleLogin = async (event) => {
        event.preventDefault()
        console.log("Start session")
        let result = await actions.login(user)
        console.log(result)
        if (result == 400) {
            alert("Bad credentials")
        }
    }

    return (
        <form onSubmit={handleLogin}>
            <fieldset>
                <legend> Login </legend>
                <div className="mb-3">
                    <label htmlFor="TextInput" className="form-label"> Email </label>
                    <input
                        type="text"
                        placeholder="email@example.com"
                        className="form-control"
                        name="email"
                        value={user.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="TextInput" className="form-label">Password</label>
                    <input
                        type="password"
                        placeholder="password"
                        className="form-control"
                        name="password"
                        value={user.password}
                        onChange={handleChange}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
            </fieldset>
        </form>
    )
}

export default Login
