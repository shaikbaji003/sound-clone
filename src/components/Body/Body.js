import React, { useEffect, useRef, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import Head from "../Navbar/Head";
import Footer from "../Footer/Footer";
import { useSelector } from "react-redux";

const Body = () => {
  const { isPlaying, sound } = useSelector((state) => state.player);
  const audioRef = useRef(null);
  const [pathName, setPathname] = useState("");
  let location = useLocation();
  // console.log(sound);
  useEffect(() => {
    setPathname(window.location.pathname);
  }, [location]);

  return (
    <div className="flex">
      <Head />
      <div className="mainContent">
        <Outlet />
      </div>
      {isPlaying &&
        sound &&
        pathName !== "/profile" &&
        pathName !== "/upload" && (
          <div className="audioBar">
            <div className="audio">
              <div className="audioDetails">
                <img
                  src={sound.thumbnail}
                  alt="Thumbnail"
                  className="audioThumbnail"
                />

                <audio key={sound._id} autoPlay controls ref={audioRef}>
                  <source src={sound.audio_url} type="audio/mp3" />
                  Your browser does not support the audio tag.
                </audio>
                <div className="audioTitle">{sound.title}</div>
              </div>
            </div>
          </div>
        )}
      <Footer />
    </div>
  );
};

export default Body;
