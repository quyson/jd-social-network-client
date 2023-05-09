import React from "react";
import axios from "axios";
import { useEffect } from "react";
import FacebookLogin from "react-facebook-login";

const Facebook = () => {
  const responseFacebook = (response) => {
    // Send Facebook access token to backend for authentication
    axios
      .post(
        "http://localhost:8000/auth/facebook",
        { access_token: response.accessToken },
        { withCredentials: true } // Allow session cookie to be stored in browser
      )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <FacebookLogin
      appId="2205879946273416"
      autoLoad={false}
      fields="name,email,picture"
      callback={responseFacebook}
      render={(renderProps) => (
        <button onClick={renderProps.onClick}>Facebook Login</button>
      )}
    />
  );
};

export default Facebook;
