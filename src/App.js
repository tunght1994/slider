import { useEffect, useState } from "react";
import "./App.css";
import test from "./images/video/bg-StandbyScreen.png";
import vide1 from "./images/video/cccd.mp4";
import vide from "./images/video/van_tay.mp4";
import Slide from "./ViewPager";

const mediaItemsT = {
  time: 10000,
  mediaItems : [
    { type: "video", src: vide1 },
    { type: "video", src: vide },
    { type: "image", src: test },
  ]
};

function App() {
  const [mediaItems, setMediaItems] = useState({});
  useEffect(() => {
    setMediaItems(mediaItemsT);
  }, []);
  return <Slide mediaItemsT={mediaItemsT} />;
}

export default App;
