import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

function Loginpage() {

    const [username, setUsername] = React.useState();
    const [password, setPassword] = React.useState();

    const history = useHistory();
    
    const handleUsername = (event) => {
        setUsername(event.target.value);
        console.log(username)
    };

    const handlePassword = (event) => {
        setPassword(event.target.value);
        console.log(password)
    };

    const submitLogin = (e) => {
        e.preventDefault();

        axios.post('https://u8fpqfk2d4.execute-api.ap-southeast-1.amazonaws.com/techtrek2020/login',
            JSON.stringify({ username, password }),
            {
                headers: {
                    "x-api-key": 'ttP2UvBYv87loHrose0BX6WnjdqGwRl78QQMtuYy',
                    'Content-Type': 'application/json'
                },
            })
            .then((res) => {
                // console.log(res.data);
                // Auth?.setLoggedIn(true);
                sessionStorage.setItem("isLoggedIn", true);
                let expiry = new Date();
					expiry.setSeconds(expiry.getSeconds() + 60);
                sessionStorage.setItem("expiry",expiry);
                sessionStorage.setItem("custID", res.data["custID"])
                history.push("/");
            }).catch((error) => {
                alert("You have entered the wrong email or username.")
                console.log(error)
            });
    }

    return (
        <div className="container">
            <div className="col-sm" />
            <div className="col-sm">
                <br />
                <form>
                    <h2>Login</h2>
                    <br />

                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className="form-control" placeholder="Enter Username" onChange={handleUsername} />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input type="text" className="form-control" placeholder="Enter Password" onChange={handlePassword} />
                    </div>

                    <br />

                    <button type="submit" className="btn btn-primary btn-block" onClick={e => submitLogin(e)}>Submit</button>
                </form>
            </div>
            <div className="col-sm" />
        </div>
    );
}

export default Loginpage;