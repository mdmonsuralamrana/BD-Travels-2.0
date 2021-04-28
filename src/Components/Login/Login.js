import style from './Login.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useContext, useState } from 'react';
import { UserContext } from '../../App';
import { useHistory, useLocation } from "react-router";
import { createUserWithEmailAndPassword, handleFbSignIn, handleGoogleSignIn, handleSignOut, initializeLoginFrameWork, signInWithEmailAndPassword } from './LoginManager';

function Login() {
  const [newUser, setNewUser] = useState(false);
  const [user, setUser] = useState({
    isSignedIn: false,
    name: '',
    email: '',
    password: '',
    photo: ''
  })

  initializeLoginFrameWork()

  const [loggedInUser, setLoggedInUser] = useContext(UserContext)

  const history = useHistory();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: "/" } };

  const googleSignIn = () => {
    handleGoogleSignIn()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
  }

  const fbSignIn = () => {
    handleFbSignIn()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
        history.replace(from);
      })
  }

  const signOut = () => {
    handleSignOut()
      .then(res => {
        setUser(res);
        setLoggedInUser(res);
      })
  }

  const handleBlur = event => {
    let isFieldValid = true;
    if (event.target.name === 'email') {
      isFieldValid = /\S+@\S+\.\S+/.test(event.target.value)
    }
    if (event.target.password === 'password') {
      const isPasswordValid = event.target.value.length >= 8;
      const passwordHasNumber = /\d{1}/.test(event.target.value);
      isFieldValid = isPasswordValid && passwordHasNumber;
    }
    if (isFieldValid) {
      //[...cart, newItem]
      const newUserInfo = { ...user };
      newUserInfo[event.target.name] = event.target.value;
      setUser(newUserInfo);
    }
  }

  const handleSubmit = (event) => {
    if (newUser && user.email && user.password) {
      createUserWithEmailAndPassword(user.name, user.email, user.password)
        .then(res => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
          console.log(res);
        })
    }

    if (!newUser && user.email && user.password) {
      signInWithEmailAndPassword(user.email , user.password)
        .then(res => {
          setUser(res);
          setLoggedInUser(res);
          history.replace(from);
          console.log(res);
        })
    }
    event.preventDefault();
  }

    return (
      <div className="login-page">
        <h3>Create an account</h3>
        <input type="checkbox" onChange={() => setNewUser(!newUser)} name="newUser" id="newUser" />
        <label htmlFor="newUser">New User? Sign Up</label>

        <form className="login-form" onSubmit={handleSubmit}>
          {newUser && <input type="text" onBlur={handleBlur} name="name" placeholder="Your Name" />}
          <br />
          <br />
          <input type="email" onBlur={handleBlur} name="email" placeholder="Enter Your Email.." required />
          <br />
          <br />
          <input type="password" onBlur={handleBlur} name="password" placeholder="Enter Your Password.."  required />
          <br />
          <br />
          <button type="button" className="btn btn-info">
            <input type="submit" value={newUser ? 'Sign up' : 'Sign In'} />
          </button>
          <br />
          <br />

          <div style={{ borderTop: "2px solid #fff ", marginLeft: 20, marginRight: 20 }}> <h3>Or</h3> </div>

        </form>
        <p style={{ color: 'red' }}>{user.error}</p>
        {
          user.success && <p style={{ color: 'green' }}>Name:{user.name}</p>
        }

        <br />
        <button type="button" className="d-grid gap-2 col-6 mx-auto btn btn-warning" onClick={fbSignIn}>Sign in with Facebook</button>
        <br />
        <br />
        {
          user.isSignedIn ? <button type="button" className="d-grid gap-2 col-6 mx-auto btn btn-danger" onClick={signOut}>Sign out</button> :
            <button type="button" className="d-grid gap-2 col-6 mx-auto btn btn-primary" onClick={googleSignIn}> <i className="fab fa-google"></i> Sign in With Google</button>
        }
      </div>
    );
}

  export default Login;
