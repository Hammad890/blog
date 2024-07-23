import { useContext,useState } from "react";
import { useNavigate } from "react-router-dom";
import { userContext } from "../context";

export default function Login (){
    const [username,setUsername]= useState('');
    const [password,setPassword]= useState('');
    const {setUserInfo}= useContext(userContext)
    const navigate = useNavigate()
    
    const handleLogin= async(e)=>{
        e.preventDefault();
        let res = await fetch ('http://localhost:5001/users/login',{
            method: 'Post',
            body: JSON.stringify({username,password}),
            headers:{'Content-Type' : 'application/json'},
            credentials: "include",
        })
        if (res.ok){
            const userInfo = await res.json();
            setUserInfo(userInfo);
            navigate('/')
        }else{
            const errorResponse = await res.json();
            alert(errorResponse.error || 'Wrong credentials');
        }
    }
    return(
        <form className="login" onSubmit={handleLogin}>
            <h1>Login</h1>
            <input type="text"
            placeholder="username"
            value={username}
            onChange={e=>setUsername(e.target.value)}
             />
             <input type="password"
             placeholder="password"
             value={password}
             onChange={e=>setPassword(e.target.value)}
              />
              <button>Login</button>
        </form>
    );
}