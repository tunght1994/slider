import { useEffect, useRef, useState } from "react";
import "./App.css";
import test from "./images/video/bg-StandbyScreen.png";
import vide1 from "./images/video/cccd.mp4";
import vide from "./images/video/van_tay.mp4";
import Slide from "./ViewPager";
import { useDispatch, useSelector } from "react-redux";
import { fetchMediaItems } from "./redux/slider/action";
import useConnectWsCamera from "./hook/useConnectWsCamera";

import face_loading from "./images/Lottie/face_loading.json";
import Lottie from "lottie-react";

export const mediaItemsT = {
  time: 10000,
  mediaItems: [
    { type: "video", src: vide1 },
    { type: "video", src: vide },
    { type: "image", src: test },
  ],
};

function App() {
  const lottieRef = useRef();

  const { cameraStreamUrl, count, errDevice, message } = useConnectWsCamera();

  const dispatch = useDispatch();
  const listMedia = useSelector((state) => state.mediaItemsSlice.listMedia);

  useEffect(() => {
    dispatch(fetchMediaItems());
  }, []);

  const handleLatestVideo = () => {
    console.log("call api here");
  };

  return (
    <>
      {!cameraStreamUrl ? (
        <Slide mediaItemsT={listMedia} handleLatestVideo={handleLatestVideo} />
      ) : (
        <div className="face-screen">
          <div className="block-face">
            <div id="liveView" className="block-avatar">
              {cameraStreamUrl && (
                <img
                  src={test}
                  alt="autobank"
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: "50%",
                    position: "relative",
                    zIndex: "21",
                  }}
                />
              )}
              <Lottie
                animationData={face_loading}
                loop={true}
                lottieRef={lottieRef}
                className="lottie"
              />
              {count && <div className="count">{count}</div>}
            </div>
          </div>
          <div className="block-text">
            {message || "Di chuyển khuôn mặt vào giữa vùng nhận diện"}
          </div>
        </div>
      )}
      ;
    </>
  );
}

export default App;
