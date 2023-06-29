import React, { useState, useEffect, useRef } from "react";
import ReactPlayer from "react-player";
import "./Slide.css";

const Slide = ({ mediaItems }) => {
  
  const playerRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [videoEnded, setVideoEnded] = useState(false);
  const [typeMedia, setTypeMedia] = useState(mediaItems[0].type);

  useEffect(() => {
    const timeout = videoEnded
      ? setTimeout(
          goToNextSlide,
          typeMedia === "video" && videoEnded ? 0 : 10000
        )
      : null;
      console.log(playerRef.current);

    return () => clearTimeout(timeout);
  }, [activeIndex, mediaItems.length, videoEnded]);

  const goToPrevSlide = () => {
    setActiveIndex((prevIndex) =>
      prevIndex === 0 ? mediaItems.length - 1 : prevIndex - 1
    );
  };

  const goToNextSlide = () => {
    const nextIndex =
      activeIndex === mediaItems.length - 1 ? 0 : activeIndex + 1;
    setTypeMedia(mediaItems[nextIndex].type);
    setVideoEnded(mediaItems[nextIndex].type === "image");
    setActiveIndex(nextIndex);
  };


  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

  return (
    <div className="slide-container">
      <button className="prev-button" onClick={goToPrevSlide}>
        Prev
      </button>
      <button className="next-button" onClick={goToNextSlide}>
        Next
      </button>
      <div className="media-container">
        {mediaItems.map((item, index) => (
          <div
            key={index}
            className={`media ${
              index === activeIndex
                ? "slide-active"
                : index === activeIndex - 1 ||
                  (activeIndex === 0 && index === mediaItems.length - 1)
                ? "slide-previous"
                : "slide-next"
            }`}
          >
            {item.type === "image" && (
              <img src={item.src} alt={`image ${index}`} />
            )}
            {item.type === "video" && (
              <ReactPlayer
                ref={playerRef}
                url={item.src}
                controls={true}
                width="100%"
                height="100%"
                playing={index === activeIndex}
                onEnded={handleVideoEnded}
              />

            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Slide;
