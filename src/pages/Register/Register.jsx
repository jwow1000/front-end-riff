// this is the register page
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import './Register.css';



function Register({User}) {

  const navigate = useNavigate();

  const [registerForm, setRegisterForm] = useState({

    username: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    first_name: "",
    last_name: "",
    profile_pic: "",
    isError: false,
    errorMsg: ""

  })

  const registerHandleChange = (e) => {
    const {name, value} = e.target;

    setRegisterForm((prev) => ({
      ...prev,
      [name]: value,
    }));

  };

  const registerHandleSubmit = async (e) => {
    e.preventDefualt();
    if(registerForm.password !== registerForm.passwordConfirmation){
      setRegisterForm({
        ...registerForm,
        isError: true,
        errorMsg: "Password and password confirmation do not match.",
      });
      return;
    }

    try {
      const userData = await signUp(registerForm); //this needs to be brought in from services
      User(userData)
      
      // navigate("") need to navigate to the main feed!
    } catch (error) {
      // need to atuthenticate the username to ensure its unique.
      let errorMessage = "Username already exist"
      setRegisterForm(prev => ({
        ...prev,
        isError: true,
        errorMsg: errorMessage
      }));
    }
  }

    const renderRegisterError = () => {
      if (registerForm.isError) {
        return <p className="register-error">{registerForm.errorMsg}</p>
      }
    }

    const {
      username,
      email,
      password,
      passwordConfirmation,
      first_name,
      last_name,
      profile_pic
    } = registerForm;


  return (
    <div className="root-Register">
      <div className="registerFormRoot-Register">
        <form className="registerForm-Register" onSubmit={registerHandleSubmit}>
          <h1>Register</h1>
          {renderRegisterError()}
          <div className="form-username-Register">
            <p className="placeHolder-username-Register">Username:</p>
            <input 
            type="text"
            name="username"
            value={username}
            onChange={registerHandleChange}
            required
            autoComplete="off" 
            />
          </div>
          <div className="form-email-Register">
            <p className="placeHolder-email-Register">email:</p>
            <input 
            type="text"
            name="email"
            value={email}
            onChange={registerHandleChange}
            required
            autoComplete="off" 
            />
          </div>
          <div className="form-password-Register">
            <p className="placeHolder-password-Register">password</p>
            <input 
            type="password"
            name="password"
            value={password}
            onChange={registerHandleChange}
            required
            />
          </div>
          <div className="form-passwordConfirmation-Register">
            <p className="placeHolder-passwordConfirmation-Register">password confirmation</p>
            <input 
            type="password"
            name="passwordConfirmation"
            value={passwordConfirmation}
            onChange={registerHandleChange}
            required
            />
          </div>
          <div className="form-firstName-Register">
            <p className="placeHolder-firstName-Register">Username:</p>
            <input 
            type="text"
            name="first_name"
            value={first_name}
            onChange={registerHandleChange}
            required
            autoComplete="off" 
            />
          </div>
          <div className="form-lastName-Register">
            <p className="placeHolder-lastName-Register">Username:</p>
            <input 
            type="text"
            name="last_name"
            value={last_name}
            onChange={registerHandleChange}
            required
            autoComplete="off" 
            />
          </div>
          <div className="form-profilePic-Register">
            <p className="placeHolder-profilePic-Register">profile picture url:</p>
            <input 
            type="text"
            name="profile_pic"
            value={profile_pic}
            onChange={registerHandleChange}
            required
            autoComplete="off" 
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Register