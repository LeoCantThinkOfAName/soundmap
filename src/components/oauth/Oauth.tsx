import React, { useEffect, useContext, useState } from "react";

// context
import { UserContext } from "./../../context/UserContext";

// function
import createTag from "./createTag";
import fetchContentful from "./fetchContentFul";
import Avatar from "./../avatar/Avatar";

// interface
declare global {
  interface Window {
    gapi: any;
  }
}

export default function Oauth() {
  const [tag, setTag] = useState(null);
  const { user, setUser } = useContext(UserContext);

  const initUser = (profile: any) => {
    fetchContentful(profile.getId(), (userData: any) => {
      setUser({
        name: profile.getName(),
        id: profile.getId(),
        img: profile.getImageUrl(),
        contentfulId: userData.contentfulId,
        favList: userData.favList,
      });
    });
  };

  const initAuth = () => {
    setTag(true);
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
      if (user === null) {
        attachSignin();
      }
    });
  };

  useEffect(() => {
    if (tag === null) {
      createTag(initAuth);
    } else {
      initAuth();
    }
  }, [user]);

  return <Avatar />;
}
