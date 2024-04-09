import { Link, useNavigate } from "react-router-dom";
import './Login.css'; 



function Login({ User }) {
  const navigate = useNavigate();

  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
    isError: false,
    errorMsg: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setLoginForm((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const loginSubmit = async (e) => {
    e.preventDefault()

    try {
      const user = await login(loginForm) //need to import login from services

      if(user){
        User(user)
        // neeed to navigate to the main-feed page

      } else {
        setLoginForm({
          ...loginForm,
          isError: true,
          errorMsg: "Invalid Credentials",
          username: "",
          password: ""
        })
      }
    } catch (error) {
      console.error(error);
      setLoginForm({
        ...loginForm,
        isError: true,
        errorMsg: "Invalid Credentials",
        username: "",
        password: "",
      });
    }
  }

  const formError = () => {
    const toggleForm = loginForm.isError ? "danger": ""
    
    if (loginForm.isError) {
      return (
        <button type="submit" className={toggleForm}> {loginForm.errorMsg} </button>
      )
    } else {
      return <button type="submit">Log In</button>
    }
  }

  return (
    <div className="root-Login">
      <div className="root-loginForm-Login">
        <form onSubmit={loginSubmit} className="loginForm-Login">
          <h1 className="login-text-Login"> Login </h1>
          <p className="username-text-Login"> Enter Username </p>
          <input
            type='text'
            name='username'
            value={loginForm.username}
            onChange={handleChange}
            required
            autoComplete="off"
          />
          <p className="password-text-Login"> Enter Password </p>
          <input
            type='password'
            name='password'
            value={loginForm.password}
            onChange={handleChange}
            required
            autoComplete="off"
          />

          {formError()}

          <Link to="/register">
            <p className="link-register-Login"> No account? Register here! </p>
          </Link>
        </form>
      </div>
    </div>
  )
}

export default Login