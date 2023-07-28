
import React, { useRef, useState , useEffect } from 'react';
import { useNavigate,Link } from 'react-router-dom';
import "../styles/register.css";
import axios from 'axios';
import { BiLogoTwitter } from "react-icons/bi";


const RegisterForm = () => {
  const navigate = useNavigate();
  const [input,setInput] = useState({
    name:"",
    email:"",
    password:""
  })
    const regForm = useRef();
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("user",JSON.stringify(input));
    navigate("/login");
    const baseUrl = "https://students.codex.today/users/register"
  fetch(baseUrl, {
      method : "POST",
      headers: {
          "Content-Type":"application/json"
      },
      body:JSON.stringify(input)
        })
      .then(res => res.json())
      .then(data => console.log(data))
      .catch(err => console.log(err))
  };



  // const [products,setProducts] = useState([]);
  //   const fetchData = async () => {
  //       try {
  //           const {data} = await axios.post("https://students.codex.today/users/register")
  //           setProducts(data);
  //       } catch (error) {
  //           console.log(error);
  //       }
  //   }
  //   useEffect(()=> {
  //       fetchData();
  //   },[]);

 



  return (
    <div className="reg">
      <div className="regleft">
        <img className='regimg' src="https://as2.ftcdn.net/v2/jpg/02/68/10/25/1000_F_268102539_6BGGjD3CP9f7cD7a6h9bIO0xX7UnYqtU.jpg"/>
      </div>
      <div className='regright'>
        <p className='t1'>Already a Member? <Link to="/login"><u>Sign In</u></Link></p>
        <h2>Sign up to Attendance Management Portal</h2>
        <div className='googtwit'>
          <div className='google'>
            <img className='googleimg' src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjzC2JyZDZ_RaWf0qp11K0lcvB6b6kYNMoqtZAQ9hiPZ4cTIOB"/>
            <p className='googletext'>Sign up with google</p>
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

        <form onSubmit={handleSubmit} action="" className="register">
            <div>
                <label>Employee Name</label>
                <input name="name" value={input.name} 
                    onChange={(e) => setInput({...input,[e.target.name]: e.target.value})} className="inp" type="text" id="nm"/>
            </div>
            <div>
                <label>Employee Email</label>
                <input name="email" value={input.email} 
                    onChange={(e) => setInput({...input,[e.target.name]: e.target.value})} className="inp" type="email" id="em"/>
            </div>
            <div>
                <label>Password</label>
                <input name="password" value={input.password} 
                    onChange={(e) => setInput({...input,[e.target.name]: e.target.value})} className="inp" type="password" id="ps"/>
            </div>
            <div className="check">
                 <input className="chkbox" type="checkbox"/>
                 <p>Creating an account means you're okay with our Terms of Service, Privacy Policy, and our default Notification Settings.</p>
            </div>
            <div className="btn"><button type="submit">Register</button></div>
          </form>
      </div>
    </div>
  );
};

export default RegisterForm;
