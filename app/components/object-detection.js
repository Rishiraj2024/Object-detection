"use client"
import React, { useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
import { renderPredictions } from "../utils/renderPredictions";
import { load as cocossdload } from "@tensorflow-models/coco-ssd";
import * as tf from "@tensorflow/tfjs";
let detectnterval;
export function  ObjectDetection() {
  const [isLoading, setIsLoading] = useState(true);
  const webcamRef = useRef(null);
const canvasRef=useRef(null)
  const runcoco = async () => {
    setIsLoading(true)
    const net = await cocossdload();
   detectnterval=setInterval(()=>{
runObjectDetecition(net)
   },10)
    setIsLoading(false); // show webcam now
  };
async function runObjectDetecition(net){
     if (webcamRef.current?.video?.readyState === 4) {
            canvasRef.current.width = webcamRef.current.video.videoWidth;

       canvasRef.current.height = webcamRef.current.video.videoHeight;
       const detectedObjects=await net.detect(webcamRef.current.video,undefined,0.6)
      const context=canvasRef.current.getContext("2d")
      renderPredictions(detectedObjects,context)
}}
  const showMyVideo = () => {
    if (webcamRef.current?.video?.readyState === 4) {
      const video = webcamRef.current.video;
      video.width = video.videoWidth;
      video.height = video.videoHeight;
    }
  };

  useEffect(() => 
    {
    runcoco();
    showMyVideo()
  }, []);

  return (
    <div className="mt-8">
      {isLoading ? (
        <div className="gradient-text text-xl font-bold">Loading AI Model...</div>
      ) : (
        <div className="relative flex justify-center items-center bg-gradient-to-b from-white via-green-300 to-gray-600 p-1.5 rounded-md">
          <Webcam
            ref={webcamRef}
            className="rounded-md w-full h-[400px] lg:h-[720px]"
            audio={false}
            onUserMedia={showMyVideo}
            videoConstraints={{ facingMode: "user" }}
          />

          <canvas ref={canvasRef} className="absolute top-0 left-0 z-99999 w-full lg:h-[720px]"
          />
        </div>
      )}
    </div>
  );
}
 
