import React, {useEffect, useState} from "react";
import {Navigate, Outlet} from "react-router-dom";

function NotAllowed() {
  let isMobile = false;
  if (window.innerWidth <= 800) {
    isMobile = true;
  }
  return !isMobile ? <Outlet /> : <Navigate to="/error" />;
}

export default NotAllowed;
