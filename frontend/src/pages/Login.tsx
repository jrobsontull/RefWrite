import { Link } from 'react-router-dom';

const Login = (): JSX.Element => {
  return (
    <div className="login">
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
        <div className="input-row">
          <svg
            viewBox="0 0 25 19"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id="email"
          >
            <path
              d="M0 16.9784V5.34115C0.0391033 5.35394 0.0770539 5.37011 0.113435 5.38947L10.2545 12.2529C11.7292 13.2493 13.256 13.2573 14.7228 12.2667C18.0661 10.0084 21.4075 7.74899 24.747 5.48843C24.8185 5.4401 24.8922 5.39523 24.9955 5.32849V5.52985C24.9955 9.22637 24.9955 12.9233 24.9955 16.6206C24.9959 16.8265 24.9715 17.0316 24.9229 17.2315C24.6518 18.3189 23.7454 18.9977 22.5702 18.9989H12.5879C9.20452 18.9989 5.82036 18.9989 2.43546 18.9989C2.1177 19.0099 1.80095 18.9568 1.50359 18.8426C1.20624 18.7285 0.934207 18.5555 0.703299 18.3338C0.313081 17.9633 0.120241 17.4893 0 16.9784Z"
              fill="#CBD5E1"
            />
            <path
              d="M0 2.02392C0.0397023 1.8824 0.0748673 1.73857 0.121376 1.59935C0.440129 0.638588 1.29657 0.0195603 2.3345 0C2.81433 0 3.28962 0 3.77399 0C10.0303 0 16.2867 0 22.543 0C23.2712 0 23.9042 0.219766 24.3977 0.776661C25.3312 1.82717 25.1633 3.39775 24.0108 4.19282C22.4919 5.24102 20.956 6.26391 19.4281 7.29946L13.9684 10.9906C12.9225 11.6982 12.0763 11.6982 11.0304 10.9906C7.82703 8.82287 4.62362 6.64592 1.40546 4.49428C0.71918 4.03518 0.169019 3.51396 0 2.66711V2.02392Z"
              fill="#CBD5E1"
            />
          </svg>
          <input type="email" placeholder="E-mail address" />
        </div>
        <div className="input-row">
          <svg
            viewBox="0 0 25 33"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            id="padlock"
          >
            <path
              d="M11.7844 0H13.2173C13.4615 0.0419669 13.7037 0.0879307 13.9499 0.127899C17.5121 0.695452 20.4648 3.76903 20.7575 7.32223C20.8826 8.82705 20.814 10.3478 20.8322 11.8607C20.8322 12.0185 20.8322 12.1784 20.8322 12.3663H21.702C23.6617 12.3663 24.9978 13.6812 24.9978 15.6157C24.9978 20.3213 24.9978 25.0263 24.9978 29.7306C24.9978 31.669 23.6658 32.99 21.7121 32.992H15.8592C11.6397 32.992 7.42025 32.992 3.20077 32.992C1.43077 32.992 0.0220379 31.6651 0.0159832 29.9584C0.0011827 25.1049 0.0011827 20.25 0.0159832 15.3939C0.024027 14.6793 0.286897 13.9906 0.758143 13.4494C1.22939 12.9081 1.87867 12.5493 2.59126 12.4362C3.09986 12.3583 3.62259 12.3743 4.16953 12.3463V11.9906C4.16953 10.6896 4.15742 9.3926 4.16953 8.09163C4.19782 6.39463 4.75633 4.74798 5.76827 3.3781C6.78021 2.00822 8.19588 0.982386 9.82062 0.441652C10.4644 0.243808 11.1325 0.147883 11.7844 0ZM18.051 12.3663C18.051 11.2771 18.051 10.216 18.051 9.15479C18.064 8.53267 18.0343 7.9104 17.9622 7.29225C17.5243 4.42252 14.5917 2.33416 11.7057 2.80779C8.88011 3.27342 6.96884 5.48768 6.95269 8.31945C6.95269 9.56446 6.95269 10.8115 6.95269 12.0565C6.95269 12.1584 6.95269 12.2563 6.96682 12.3663H18.051ZM12.4948 17.8719C11.9123 17.8784 11.3463 18.0649 10.876 18.4052C10.4056 18.7456 10.0543 19.2228 9.87107 19.7704C9.68593 20.3142 9.68168 20.9024 9.85894 21.4487C10.0362 21.9951 10.3856 22.4708 10.856 22.806C10.9484 22.8652 11.0228 22.9482 11.0712 23.0461C11.1195 23.1439 11.14 23.253 11.1305 23.3616C11.1183 24.2409 11.1305 25.1222 11.1305 26.0015C11.1268 26.1731 11.1458 26.3444 11.187 26.5111C11.2757 26.818 11.4703 27.0843 11.737 27.2636C12.0036 27.4429 12.3254 27.5238 12.6462 27.4923C12.9791 27.4632 13.2893 27.3128 13.5167 27.0703C13.7441 26.8277 13.8726 26.5103 13.8773 26.1794C13.8955 25.2461 13.8934 24.3128 13.8773 23.3816C13.8657 23.2678 13.8861 23.153 13.9364 23.05C13.9866 22.947 14.0646 22.8598 14.1619 22.798C14.6308 22.4613 14.9785 21.9847 15.154 21.438C15.3294 20.8914 15.3233 20.3034 15.1367 19.7604C14.9518 19.2112 14.5973 18.7334 14.1232 18.3945C13.6491 18.0556 13.0795 17.8728 12.4948 17.8719Z"
              fill="#CBD5E1"
            />
          </svg>
          <input type="password" placeholder="Password" />
        </div>
        <p id="forgot-pass">
          <Link to={'/forgot-password'}>Forgot password?</Link>
        </p>
        <div className="btn primary noselect">Log in to your account</div>
      </div>
      <p id="register-msg">
        Just getting started? <Link to={'/register'}>Create an Account</Link>
      </p>
    </div>
  );
};

export default Login;