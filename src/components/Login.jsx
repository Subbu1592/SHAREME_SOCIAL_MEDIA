import React, { useEffect } from "react";
import GoogleLogin from "react-google-login";
import { useNavigate } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import sharevideo from "../assets /share.mp4";
import logo from "../assets /logo.png";
import { gapi } from "gapi-script";
import { client } from "../client";

const Login = () => {
  const navigate = useNavigate();
  // useEffect(() => {
  //   function start() {
  //     gapi.client.init({
  //       clientId: process.env.REACT_APP_GOOGLE_API_TOKEN,
  //       scope: "email",
  //     });
  //   }
  //   gapi.load("client:auth2", start);
  // }, []);

  // const onSuccess = (response) => {
  //   navigate("/", { replace: true });
  //   // console.log("SUCCESS", response);
  // };
  // const onFailure = (response) => {
  //   navigate("/login", { replace: true });
  //   // console.log("FAILED", response);
  // };
  // const onLogoutSuccess = () => {
  //   navigate("/login", { replace: true });
  //   alert("LOGOUT SUCCESFULL");
  //   //  console.log('SUCESS LOG OUT');
  // };

  const responseGoogle = (response) => {
    localStorage.setItem("user", JSON.stringify(response.profileObj));
    const { name, googleId, imageUrl } = response.profileObj;
    const doc = {
      _id: googleId,
      _type: "user",
      userName: name,
      image: imageUrl,
    };
    client.createIfNotExists(doc).then(() => {
      navigate("/", { replace: true });
    });
  };

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full ">
        <video
          src={sharevideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-blackOverlay">
          <div className="p-5">
            <img src={logo} alt="logo" width={"130px"} />
          </div>
          {/* //   renderProps is comming from GoogleLogin */}
          <div className="shadow-2xl">
            <GoogleLogin
              clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
              render={(renderProps) => (
                <button
                  type="button"
                  className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}>
                  <FcGoogle className="mr-4" /> Sign in with google
                </button>
              )}
              //   onsucces and onfailure are comming from GoogleLogin
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              // onSuccess={onSuccess}
              // onFailure={onFailure}
              // onLogoutSuccess={onLogoutSuccess}
              cookiePolicy="single_host_origin"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
