import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FcGoogle } from 'react-icons/fc';
import { useGoogleLogin } from '@react-oauth/google';

import shareVideo from '../assets/share.mp4';
import logo from '../assets/logowhite.png';

import { client } from '../client';

const Login = () => {
  const navigate = useNavigate();

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      try {
        // Get user info from Google using the access token
        const res = await fetch('https://www.googleapis.com/oauth2/v3/userinfo', {
          headers: { 
            Authorization: `Bearer ${tokenResponse.access_token}`,
          },
        });

        const user = await res.json();
        localStorage.setItem('user', JSON.stringify(user));

        const { name, sub, picture } = user;

        const doc = {
          _id: sub,
          _type: 'user',
          userName: name,
          image: picture,
        };

        // Save to Sanity
        client.createIfNotExists(doc).then(() => {
          navigate('/', { replace: true });
        });

      } catch (error) {
        console.error('Google login or user info fetch failed:', error);
      }
    },
    onError: () => {
      console.error('Google login failed');
    },
  });

  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <video
          src={shareVideo}
          type="video/mp4"
          loop
          controls={false}
          muted
          autoPlay
          className="w-full h-full object-cover"
        />

        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-blackOverlay">
          <div className="p-5">
            <img src={logo} width="130px" alt="logo" />
          </div>

          <div className="shadow-2xl">
            <button
              onClick={() => login()}
              className="bg-mainColor flex justify-center items-center p-3 rounded-lg cursor-pointer outline-none"
            >
              <FcGoogle className="mr-4" /> Sign in with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
