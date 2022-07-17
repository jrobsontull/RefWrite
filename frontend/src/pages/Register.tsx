import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthAPI from '../utils/auth.api';

const Register = (): JSX.Element => {
  const [newUser, setNewUser] = useState({
    email: null,
    firstName: null,
    lastName: null,
    pass: null,
    confirmPass: null,
  });

  const updateGenericProp = (newValue: string, propName: string) => {
    setNewUser((prevDetails) => ({ ...prevDetails, [propName]: newValue }));
  };

  const submitHandler = () => {};

  return (
    <div className="register">
      <div className="brand">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 43.19 41.03"
          fill="#766DF4"
          className="logo"
        >
          <title>RefWrite Logo</title>
          <path d="M5.05,40.72c-.79-.48-.57-.84-.22-1.21a2.2,2.2,0,0,1,3-.19,2.11,2.11,0,0,0,3,0,5.93,5.93,0,0,1,3.27-1.17c3-.15,5.73-1.46,8.46-2.62,1.67-.71,3.3-1.53,5-2.3-1-5.13,1-9.58,2.59-14.08.68-1.87,1.53-3.67,2.32-5.5.39-.91.63-1.73-.34-2.51a1.51,1.51,0,0,1-.32-1.9C32.82,6.84,33.88,4.42,35,2a1.72,1.72,0,0,1,.57-.77A7.64,7.64,0,0,1,41,.11a1.73,1.73,0,0,1,1.36,1.83,10.54,10.54,0,0,1-.59,2.69C41,6.82,40.25,9,39.44,11.16c-.35.9-.9,1.73-1.2,2.65-1.41,4.41-2.74,8.84-4.17,13.25a8.75,8.75,0,0,1-1.47,3c-1.68,1.91-3.43,3.82-5.89,4.81-3.43,1.38-6.79,3-10.32,4-2.11.62-4.34.74-6.3,2A2.31,2.31,0,0,1,8,40.73C7,40,6,39.63,5.05,40.72ZM34.34,11.58c-1.81,5-4.33,9.68-5.47,15.05l3.49,2c1.63-5.36,3.2-10.5,4.81-15.8C36.66,11.75,35.94,11.41,34.34,11.58Zm3.75-.74c1.07-2.64,2.08-5.11,3.07-7.58a2.15,2.15,0,0,0,.15-.71c0-1.12-.55-1.66-1.66-1.46-.71.12-1.42.33-2.14.44a2.37,2.37,0,0,0-1.87,1.55c-.87,2-1.76,4-2.61,6a5.21,5.21,0,0,0-.24,1.08ZM31.62,29.49l-3.06-1.67L28.25,31l1.54.39Z" />
          <path d="M2.05,34.66a.87.87,0,0,1,.14-1.45,1.46,1.46,0,0,1,1.92-.1c1.14,1.25,2.31.7,3.44.23s2.17-1.12,3.24-1.7a2,2,0,0,1,2.5.15c.73.65,1.29.35,1.94-.09,1.52-1,3.07-2,4.61-3a1.69,1.69,0,0,1,2.13,0,2.5,2.5,0,0,0,1.46.11,3.12,3.12,0,0,0,.95-.37.85.85,0,0,1-.33,1.35c-1.08.67-2.1.41-3.25-.46-1.34.84-2.74,1.71-4.13,2.6-.45.28-.84.64-1.28.93a1.92,1.92,0,0,1-2.57-.08c-.77-.7-1.48-.27-2.23.1-1.34.67-2.69,1.3-4.08,1.87a2.08,2.08,0,0,1-2.81-.66c-.08-.12-.28-.15-.45-.23Z" />
          <path d="M6.72,28.35c1.53-1,2.74-1.78,4-2.52s2.25-1.16,3.56-.42c.24.14.71,0,1-.15,1.32-.54,2.61-1.12,3.93-1.66.49-.21,1.05-.55,1.51.31a4,4,0,0,1-.74.55c-1.64.72-3.27,1.44-4.94,2.08a1.68,1.68,0,0,1-1.34-.11,1.47,1.47,0,0,0-1.71,0c-1.25.76-2.51,1.51-3.7,2.35s-1.63.93-2.65-.24a1.25,1.25,0,0,0-1.81-.3c-1.11.67-2.24,1.3-3.33,1.93-.63-.36-.68-.76-.19-1.08,1.21-.75,2.42-1.5,3.69-2.13a1.69,1.69,0,0,1,2.18.57A7,7,0,0,1,6.72,28.35Z" />
        </svg>
        <h1>RefWrite</h1>
      </div>
      <div className="form">
        <h2>Start your 30-day free trial</h2>
        <p className="message">
          You will be subscribed to the starter plan by default. You can change
          at any time.
        </p>
        <div className="input-row">
          <input
            type="email"
            placeholder="jonh.doe@xyz.com"
            tabIndex={1}
            onChange={(e) => updateGenericProp(e.target.value, 'email')}
          />
        </div>
        <div className="input-row split">
          <input
            type="text"
            placeholder="First name"
            tabIndex={2}
            onChange={(e) => updateGenericProp(e.target.value, 'firstName')}
          />
          <input
            type="text"
            placeholder="Last name"
            tabIndex={3}
            onChange={(e) => updateGenericProp(e.target.value, 'lastName')}
          />
        </div>
        <div className="input-row">
          <input
            type="password"
            placeholder="Password"
            tabIndex={4}
            onChange={(e) => updateGenericProp(e.target.value, 'pass')}
          />
        </div>
        <div className="input-row">
          <input
            type="password"
            placeholder="Password (confirm)"
            tabIndex={4}
            onChange={(e) => updateGenericProp(e.target.value, 'confirmPass')}
          />
        </div>
        <div className="checkbox">
          <input type="checkbox" id="tandc" />
          <label htmlFor="tandc">
            I accept the <Link to={'/'}>Terms of Use</Link> and{' '}
            <Link to={'/'}>Privacy Policy</Link>
          </label>
        </div>
        <div className="btn primary noselect">Start trial</div>
      </div>
      <p id="login-msg">
        Have an account already? <Link to={'/login'}>Log in</Link>
      </p>
    </div>
  );
};

export default Register;
