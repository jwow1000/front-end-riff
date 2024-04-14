// this is the register page
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signUp } from "../../services/users.js";
import logo from "../../../public/Riff.png";
import "./Register.css";

function Register({ setUser, setTrigUser }) {
  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    first_name: "",
    last_name: "",
    profilePic: "",
    isError: false,
    errorMsg: "",
  });

  const registerHandleChange = (e) => {
    const { name, value } = e.target;

    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const registerHandleSubmit = async (e) => {
    e.preventDefault();
    if (registerForm.password !== registerForm.passwordConfirmation) {
      setRegisterForm({
        ...registerForm,
        isError: true,
        errorMsg: "Password and password confirmation do not match.",
      });
    } 

      try {
        const userData = await signUp(registerForm); 
        setUser(userData);
        setTrigUser((prevUserTrig) => !prevUserTrig);
        console.log('user name has been set')
        navigate("/"); 
      } catch (error) {
        console.error(error); // need to atuthenticate the username to ensure its unique.
        let errorMessage = "failed to set user with user data";
        setRegisterForm((prev) => ({
          ...prev,
          isError: true,
          errorMsg: errorMessage,
        }));
      }
  };

  const renderRegisterError = () => {
    const toggleForm = registerForm.isError ? "dangerButt-Register" : "butt-Register";
    
    if (registerForm.isError) {
      return (
        <button type="submit" className={toggleForm}>
          {registerForm.errorMsg}
        </button>
      );
    } else {
     
      return <button type="submit" className={toggleForm}>Register</button>;
    }
  };


  const {
    username,
    email,
    password,
    passwordConfirmation,
    first_name,
    last_name,
    profilePic,
  } = registerForm;


  return (
    <div className ='register-back'>
    <div className="root-Register">
      <div id="logo-container-Register">
        <img src={logo} alt="the RIff logo" id="logo-Register" />
        <h2 style={{
          "textAlign": "left",
          "lineHeight": "0rem",
          }}
        > Riff </h2>
      </div>
      <div className="registerFormRoot-Register">
        <form className="registerForm-Register" onSubmit={registerHandleSubmit}>
          <h1 className="register-text-Register"> 
            Register for the 
            <br /> 
            <span className="riffSpan-Register">Riff</span> 
            <br />
            Experience 
          </h1>
          
          <p className="placeHolder-username-Register">Username:</p>
          <input className="user-txt"
            type="text"
            name="username"
            value={username}
            onChange={registerHandleChange}
            required
            autoComplete="off"
          />
        
          <p className="placeHolder-email-Register">email:</p>
          <input className='email-txt'
            type="text"
            name="email"
            value={email}
            onChange={registerHandleChange}
            required
            autoComplete="off"
          />
        
      
          <p className="placeHolder-password-Register">password</p>
          <input className ='password-txt'
            type="password"
            name="password"
            value={password}
            onChange={registerHandleChange}
            required
          />
      
      
          <p className="placeHolder-passwordConfirmation-Register">
            password confirmation
          </p>
          <input className='password-confirm'
            type="password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={registerHandleChange}
            required
          />
    
      
          <p className="placeHolder-firstName-Register">first name:</p>
          <input className = 'first-name'
            type="text"
            name="first_name"
            value={first_name}
            onChange={registerHandleChange}
            required
            autoComplete="off"
          />
      

          <p className="placeHolder-lastName-Register">last name:</p>
          <input className='last-name'
            type="text"
            name="last_name"
            value={last_name}
            onChange={registerHandleChange}
            required
            autoComplete="off"
          />
    
        
          <p className="placeHolder-profilePic-Register">
            profile picture url:
          </p>
          <input className ='profile-url'
            type="text"
            name="profilePic"
            value={profilePic}
            onChange={registerHandleChange}
            required
            autoComplete="off"
        />
            {(renderRegisterError)()}  
          </form>
         
        </div>
        </div>
        </div>
    
    
  );
}


export default Register;
