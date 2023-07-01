import ReactPlayerCustom from "./ReactPlayerCustom";
import React, { useRef, useEffect, useCallback } from "react";
import Slider from "react-slick";
import "./Slide.css";

const VIDEO = ["VIDEO"];
let timeout = -1;
const SimpleSlider = ({ mediaItems }) => {
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

  const isHasData = () => Boolean(mediaItems.length)

  const handleEndVideo = useCallback(() => {
    // playerRef.current.slickNext();
    handleNextByTime(1000)
  }, []);

  const playVideoCurrent = () => {
    const currentVideo = getCurrentVideo();
    if (isVideo(currentVideo)) {
      currentVideo.play();
      currentVideo.addEventListener("ended", handleEndVideo);
    } else {
      handleNextByTime(3000)
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
      playVideoCurrent();
    }
  }, [playerRef, mediaItems]);

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
      {mediaItems.map((item, index) => (
        <div key={index}>
          {item.type === "image" && (
            <div>
              <img src={item.src} alt={`image ${index}`} />
            </div>
          )}
          {item.type === "video" && (
            <ReactPlayerCustom url={item.src} controls={true} />
          )}
        </div>
      ))}
    </Slider>
  );
};

export default SimpleSlider;
