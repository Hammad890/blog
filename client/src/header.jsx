import {Link} from "react-router-dom";
import { useContext,useEffect} from "react";
import { userContext } from "./context.js";
export default function Header() {
  const {userInfo, setUserInfo}=useContext(userContext);
  const username= userInfo?.username

  useEffect(()=>{
      fetch('https://blog-nine-phi-73.vercel.app/users/profile',{
        method: 'Get',
        credentials: 'include'
      }).then(response=>{
        response.json().then(userInfo=>{
          setUserInfo(userInfo);
        });
      });
 },[])

 function logout (){
   fetch('https://blog-nine-phi-73.vercel.app/users/logout',{
    method: 'Post',
    credentials: 'include'
   })
   setUserInfo(null);
  }
    return (
        <header>
          <img style={{height: '120px'}} src="https://cdn.logojoy.com/wp-content/uploads/2018/05/30164225/572-768x591.png" alt=".blog" />
          <nav>
          {username &&(
              <>
                <Link to="/create">Create new post</Link>
                <a href="/" onClick={logout}>Logout({username}) </a>
              </>
          )}
          {!username && (
              <>
                <Link to="/login">Login</Link>
                <Link to="/register">Register</Link>
              </>
          )}
            <>
            <a href="#contact-us">Contact Us</a>
            <a href="#about-us">About Us</a>
            </>
          </nav>
        </header>
      );
    }
