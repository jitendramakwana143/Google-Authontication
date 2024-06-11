import React, { useState, useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

export default function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem('userToken');
    if (storedToken) {
      const decode = jwtDecode(storedToken);
      setUser({
        name: decode.name,
        email: decode.email,
        photo: decode.picture
      });
    }
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handleLoginSuccess = (credentialResponse) => {
    const decode = jwtDecode(credentialResponse?.credential);
    console.log(decode);
    setUser({
      name: decode.name,
      email: decode.email,
      photo : decode.picture
    });
    localStorage.setItem('userToken', credentialResponse?.credential);
  };

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    setUser(null);
  };

  return (
    <div>
      

      {user ? (
        <div class="card" style={{width: "18rem"}}>
        {user.photo ? (
              <img
                src={user.photo}
                alt={user.name}
                referrerPolicy="no-referrer"
              />
            ) : (
              ""
            )}
          <div class="card-body">
            <h5 class="card-title">Name: {user.name}</h5>
            <p class="card-text">
            Email: {user.email}
            </p>
            <a  class="btn btn-primary" onClick={handleLogout}>
              logout
            </a>
          </div>
        </div>
      ) : (
        <GoogleLogin
          onSuccess={handleLoginSuccess}
          onError={() => console.log("Login Failed")}
          useOneTap
        />
      )}
    </div>
  );
}
