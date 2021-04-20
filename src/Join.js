import {React, useContext, useState} from "react";
import {AuthContext} from "./index";
import  firebase from "firebase/app";
require('firebase/auth');

const Join = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword]= useState("");
    const [error, setErrors] = useState("");

    const Auth = useContext(AuthContext);
    const handleForm = e => {
        e.preventDefault();
       firebase.auth().createUserWithEmailAndPassword(email, password).then(res => {
           if(res.user)
           Auth.setLoggedIn(true);
       }).catch(e => {
           setErrors(e.message);
       });
    };

    const joinwithGoogle =  ()=>{
        const joingoogle = new firebase.auth.GoogleAuthProvider();
        firebase.auth()
    .signInWithPopup(joingoogle)
    .then((result) => {
        console.log(result);
        Auth.setLoggedIn(true);
    });
    
    };

    return(
        <div>
            <h1>Join</h1>
            <form onSubmit={e => handleForm(e)}>
                <input
                value={email}
                onChange={e => setEmail(e.target.value)}
                name="email"
                type="email"
                placeholder="email">
                </input>
                <input onChange={e => setPassword(e.target.value)}
                name="password"
                type="password"
                value="{password}"
                placeholder="password">
                </input>
                <hr />
                <button className="googleBtn" type="button" onClick={() => joinwithGoogle()}>
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                        alt="logo">
                    </img>
                    Join With Google
                </button>
                <button type="submit">Login</button>
                <span>{error}</span>
            </form>
        </div>
    );
};
export default Join;