import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

const STREAM = "STREAM";
const COUNT = "COUNT";
const MESSAGE = "MESSAGE";
const DATA = "DATA";
const ERROR = "ERROR";
const CAMERA_START = "CAMERA_START"; //start camera
const CAMERA_STOP = "CAMERA_STOP"; //stop camera

const useConnectWsCamera = () => {
  const dispatch = useDispatch();
  const wsRef = useRef();
  const timerReconnect = useRef(0);
  const isUnmounted = useRef(false);
  const [wsConnected, setWsConnected] = useState(false);
  const [cameraStreamUrl, setCameraStreamUrl] = useState("");
  const [count, setCount] = useState(null);
  const [message, setMessage] = useState("");
  const [errDevice, setErrDevice] = useState("");

  const startCamera = () => {
    wsRef.current.send(CAMERA_START);
  };

  const stopCamera = () => {
    wsRef.current.send(CAMERA_STOP);
  };

  const connectWs = useCallback(() => {
    setWsConnected(false);
    wsRef.current = new WebSocket("ws://172.16.15.102:6868");
    wsRef.current.onopen = () => {
      console.log("connect");
      setWsConnected(true);
      clearTimeout(timerReconnect.current);
      startCamera();
    };
    wsRef.current.onmessage = (e) => {
      try {
        const type = '';
        switch (type) {
          case STREAM: {
            console.log('STREAM');
            break;
          }
          case COUNT: {
            setCount('COUNT');
            break;
          }
          case MESSAGE: {

            let message = "";

            setMessage(message);
            break;
          }
          case ERROR: {
            console.log("ERROR");
            break;
          }
          case DATA: {
            console.log("DATA");
            break;
          }
        }
      } catch (err) {
        console.log("cannot parse data", e.data, err);
      }
    };
    wsRef.current.close = () => {
      setWsConnected(false);
      if (isUnmounted.current) return;
      timerReconnect.current = setTimeout(connectWs, 1000);
    };
    wsRef.current.onerror = (e) => {
      console.log(e);
    };
  }, []);

  useEffect(() => {
    connectWs();
    return () => {
        isUnmounted.current = true;
        clearTimeout(timerReconnect.current);
        wsRef.current && wsConnected && stopCamera();
        wsRef.current && wsRef.current.close();
        setWsConnected(false);
      };
  }, []);

  return {
    cameraStreamUrl,
    count,
    errDevice,
    message
  }
}

export default useConnectWsCamera;
