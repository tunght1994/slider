import { useEffect, useState } from "react";
import "./App.css";
import test from "./images/video/bg-StandbyScreen.png";
import vide1 from "./images/video/cccd.mp4";
import vide from "./images/video/van_tay.mp4";
import Slide from "./ViewPager";
import { useDispatch, useSelector } from "react-redux";
import { fetchMediaItems } from "./redux/slider/action";

export const mediaItemsT = {
  time: 10000,
  mediaItems : [
    { type: "video", src: vide1 },
    { type: "video", src: vide },
    { type: "image", src: test },
  ]
};

function App() {
  const dispatch = useDispatch()
  const listMedia = useSelector(state => state.mediaItemsSlice.listMedia)

  useEffect(() => {
    dispatch(fetchMediaItems())
  }, []);


  return <Slide mediaItemsT={listMedia} />;
}

export default App;
