import React, { useEffect, useContext, useState } from "react";

// context
import { UserContext } from "./../../context/UserContext";

// function
import createTag from "./createTag";
import Avatar from "./../avatar/Avatar";

// interface
declare global {
  interface Window {
    gapi: any;
  }
}

export default function Oauth() {
  const [init, setInit] = useState(false);
  const { user, setUser } = useContext(UserContext);

  const initUser = (profile: any) => {
    setUser({
      name: profile.getName(),
      id: profile.getId(),
      img: profile.getImageUrl(),
    });
  };

  useEffect(() => {
    createTag(() => {
      const gapi = window.gapi;
      let auth2: any;

      gapi.load("auth2", () => {
        auth2 = gapi.auth2.init({
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          scope: "profile",
        });

        auth2.isSignedIn.listen(() => {
          if (auth2.isSignedIn.get() === true) {
            initUser(auth2.currentUser.get().getBasicProfile());
          }
        });

        const attachSignin = () => {
          auth2.attachClickHandler(
            document.getElementById("loginBtn"),
            {},
            (googleUser: any) => {
              const profile = googleUser.getBasicProfile();
              initUser(profile);
            },
            (error: any) => {
              alert(JSON.stringify(error, undefined, 2));
            }
          );
        };
        attachSignin();
        setInit(true);
      });
    });
  }, []);

  return <Avatar />;
}
