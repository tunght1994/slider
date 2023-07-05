import ReactPlayerCustom from "./ReactPlayerCustom";
import React, { useRef, useEffect, useCallback } from "react";
import Slider from "react-slick";
import "./Slide.css";

const VIDEO = ["VIDEO"];
let timeout = -1;
const SimpleSlider = ({ mediaItemsT }) => {
  const playerRef = useRef(null);

  const settings = {
    dots: false,
    infinite: true,
    autoplay: false,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const isVideo = (currentVideo) =>
    VIDEO.includes(
      currentVideo ? currentVideo?.tagName : getCurrentVideo()?.tagName
    );
  const getSliderWrapper = () => playerRef.current.innerSlider.list

  const getCurrentVideo = () =>
    getSliderWrapper().querySelector(".slick-active video") ||
    getSliderWrapper().querySelector(".slick-active img");

  const isHasData = () => Boolean(mediaItemsT.mediaItems.length)

  const handleEndVideo = useCallback(() => {
    // playerRef.current.slickNext();
    handleNextByTime()
  }, []);

  const playVideoCurrent = () => {
    const currentVideo = getCurrentVideo();
    if (isVideo(currentVideo)) {
      currentVideo.play();
      currentVideo.addEventListener("ended", handleEndVideo);
    } else{
      handleNextByTime(mediaItemsT.time)
    }
  };

  const handleNextByTime = (time = 0) => {
    timeout = setTimeout(() => {
      playerRef.current.slickNext();
    }, time);
  }

  const clearCurrent = () => {
    if (isVideo()) {
      getCurrentVideo().pause();
      getCurrentVideo().removeEventListener("ended", handleEndVideo);
      getCurrentVideo().currentTime = 0;
    }
    clearTimeout(timeout)
  };

  useEffect(() => {
    if (isHasData()) {
      playVideoCurrent()
    }
  }, [playerRef, mediaItemsT.mediaItems]);

  return (
    <Slider
      ref={playerRef}
      {...settings}
      beforeChange={(e) => {
        clearCurrent();
      }}
      afterChange={(e) => {
        playVideoCurrent();
      }}
    >
      {mediaItemsT.mediaItems.map((item, index) => (
        <div key={index}>
          {item.type === "image" && (
            <div>
              <img src={item.src} alt={`image ${index}`} style={{ height: "1920px", width: "1080px" }}/>
            </div>
          )}
          {item.type === "video" && (
            // <ReactPlayerCustom url={item.src} controls={true} />
            <div>
            <video
              playsInline
              style={{ height: "1920px", width: "1080px" }}
              muted
              controls={true}
              alt="All the devices"
              src={item.src}
            />
          </div>
          )}
        </div>
      ))}
    </Slider>
  );
};

export default SimpleSlider;
