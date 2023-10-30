import React from "react";
import Lottie from "lottie-react";
import sorry from "../assets/sorry.json";

function ErrorPage() {
  return (
    <div className="warning-bigbox">
      <div className="warning-box">
        <Lottie animationData={sorry} className="sorry-img"></Lottie>
        <p className="warning-text">
          Ah, it seems you're attempting to access DevNest on your mobile
          device. Unfortunately, DevNest is not currently accessible on mobile.
          Please try accessing it using your computer instead.
        </p>
      </div>
    </div>
  );
}

export default ErrorPage;
