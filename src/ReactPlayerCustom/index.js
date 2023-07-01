
const ReactPlayerCustom = (props) => {

  return (
    <div>
      <video
        playsInline
        style={{ height: "1080px", width: "1920px" }}
        muted
        controls={props.controls}
        alt="All the devices"
        src={props.url}
      />
    </div>
  );
};

export default ReactPlayerCustom;
