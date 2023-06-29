import React, { useEffect, useRef } from "react";

const ReactPlayerCustom = (props) => {
  const playerRef = useRef(null);
  useEffect(() => {
    var isPlaying =
          playerRef.current.currentTime > 0 &&
          !playerRef.current.paused &&
          !playerRef.current.ended &&
          playerRef.current.readyState > playerRef.current.HAVE_CURRENT_DATA;
    
        if (!isPlaying && props.playing) {
          const  playPromise = playerRef.current.play();
            console.log(playPromise)
          if (playPromise !== undefined) {
            playPromise.then(_ => {
              // Automatic playback started!
              // Show playing UI.

            })
            .catch(error => {
              console.log(error)

            });
          }
        }
    
        // return
    }, [props.playing]);

  useEffect(() => {
    playerRef.current.addEventListener("ended", function () {
      props.onEnded();
    });
  }, [props]);

  return (
    <div>
      <video
        playsInline
        // style={{ height: "100%", width: "100%" }}
        muted
        controls={true}
        alt="All the devices"
        src={props.url}
        onEnded={() => {
          props.onEnded();
        }}
        ref={playerRef}
      />
    </div>
  );
};

export default ReactPlayerCustom;
