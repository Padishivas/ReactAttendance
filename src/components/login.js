
import { useRef , useState} from "react";
import React from 'react';
import "../styles/login.css";
import { useNavigate,Link } from "react-router-dom";
import { BiLogoTwitter } from "react-icons/bi";

const LoginForm = () => {
  const navigate = useNavigate();
    const logForm = useRef();
    const [input,setInput] = useState({
      email:"",
      password:""
    })
    // const baseUrl = "https://students.codex.today/users/login"
    // fetch(baseUrl, {
    //     method : "POST",
    //     headers: {
    //         "Content-Type":"application/json"
    //     },
    //     body:JSON.stringify(formData)
    //       })
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    //     .catch(err => console.log(err))

  const handleSubmit = (e) => {
    e.preventDefault();

    const baseUrl = "https://students.codex.today/users/login";
      fetch(baseUrl, {
          method : "POST",
          headers: {
              "Content-Type":"application/json"
          },
          body:JSON.stringify(input)
            })
          .then(res => res.json())
          .then(data => {
            if(!data.err){
              localStorage.setItem('token', data.token);
              localStorage.setItem('email', data.email);
              localStorage.setItem("userid",data.userId);
              localStorage.setItem("loggedin",true);
               navigate("/");
            }
          else{
            alert("Wrong Email or Password")
          }
          })
          .catch(err => console.log(err))
  };


  return (
    <div className="reg">
      <div className="regleft">
          <img className="regimg" src="https://as2.ftcdn.net/v2/jpg/03/14/29/89/1000_F_314298924_fDVIJM7Begj8Kn6h4utaN5bv7794Xuz2.jpg" />
      </div>
      <div className="regright">
          <p className="t1">Not a member? <Link to="/register"><u>Sign up Now</u></Link></p>
          <h2>Sign in to Attendance Management Portal</h2>

          <div className='googtwit'>
          <div className='google'>
            <img className='googleimg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzC2JyZDZ_RaWf0qp11K0lcvB6b6kYNMoqtZAQ9hiPZ4cTIOB"/>
            <p className='googletext'>Sign in with google</p>
          </div>
          <div className='twitter'>
              <BiLogoTwitter/>
          </div>
        </div>

        <div className='hrline'>
          <div className='hr1'></div>
          <p className='hrtext'>Or</p>
          <div className='hr2'></div>
        </div>

          <form onSubmit={handleSubmit} action="" ref={logForm} className="login">
                <div>
                    <label for="">Email</label>
                    <input name="email" value={input.email} 
                        onChange={(e) => setInput({...input,[e.target.name]: e.target.value})} id="emplogin" className="inp"/>
                </div>
                <div>
                    <label for="">Password</label>
                    <input name="password" value={input.password} 
                        onChange={(e) => setInput({...input,[e.target.name]: e.target.value})} id="" className="inp"/>
                </div>
                <div className="btn"><button type="submit">Login</button></div>
            </form>
      </div>
    </div>
  );
};

export default LoginForm;