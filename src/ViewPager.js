import ReactPlayerCustom from "./ReactPlayerCustom";
import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
// import './Slide.css'

const  SimpleSlider = ({mediaItems}) => {
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

    return () => clearTimeout(timeout);
  }, [activeIndex, mediaItems.length, videoEnded]);

  const goToNextSlide = () => {
    const nextIndex =
      activeIndex === mediaItems.length - 1 ? 0 : activeIndex + 1;
    setTypeMedia(mediaItems[nextIndex].type);
    setVideoEnded(mediaItems[nextIndex].type === "image");
    setActiveIndex(nextIndex);
    playerRef?.current?.slickNext();
  };


  const handleVideoEnded = () => {
    setVideoEnded(true);
  };

    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1
    };
    return (
      
      <Slider ref ={playerRef} {...settings} afterChange={(e) => {
        setActiveIndex(e)
      }}>
      {mediaItems.map((item, index) => (
        <div
          key={index}
        >
          {item.type === "image" && (
            <div><img src={item.src} alt={`image ${index}`} /></div>
          )}
          {item.type === "video" && (
            <ReactPlayerCustom
              url={item.src}
              controls={true}
              playing={index === activeIndex}
              onEnded={handleVideoEnded}
            />
          )}
        </div>
      ))}
    </Slider>
    );
  
}

export default SimpleSlider