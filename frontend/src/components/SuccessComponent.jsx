import React, { useState, useEffect } from "react";
import Lottie from "lottie-react";


const SuccessMessageComponent = ({ message, clearMessage }) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false);
      clearMessage();
    }, 4000);

    return () => {
      clearTimeout(timer);
    };
  });

  return visible ? (
    <div className="text-sm font-light p-3 rounded-lg bg-white text-green-700 flex items-center justify-between z-50 shadow-lg animate__animated animate__slideInDown ">
      
      <p>{message}</p>
    </div>
  ) : null;
};

export default SuccessMessageComponent;
