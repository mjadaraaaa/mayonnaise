import React, { useEffect, useState } from "react";
import "animate.css";
import Lottie from "lottie-react";
import noResult from "../Assets/Lottie/noResult.json";
import PinDrop from "@mui/icons-material/PinDrop";
import Star from "@mui/icons-material/Star";
import { useNavigate } from "react-router-dom";
const ActivitiesComponent = ({ activities }) => {
  useEffect(() => {}, [activities]);
  const navigate = useNavigate();
  return (
    <div className="flex flex-wrap justify-start gap-6  max-h-[600px]">
      {activities?.length === 0 ? (
        <div>no results </div>
      ) : (
        activities?.map((activity) => (
          <div
            onClick={() => navigate(`/activity/${activity?.id}`)}
            key={activity?.id}
            className="relative gap-2 hover:shadow-2xl hover:opacity-85 text-gray-700 flex flex-col  h-72 bg-white hover:bg-yellow-600 hover:text-white rounded-md  w-52 overflow-hidden shadow-lg hover:scale-95 transition-all cursor-pointer"
          >
            <img
              className=" w-52 object-cover aspect-square shadow-lg"
              src={`http://127.0.0.1:8000/api/profile/${activity?.user_id}/${activity?.id}/${activity?.picture}`}
              alt=""
            ></img>
            <div className="flex items-center justify-between">
              <div className="flex items-end justify-start w-full px-2 gap-2">
                <p className="text-lg font-bold">{activity?.activity_name}</p>
              </div>
              <p className="px-2 text-xs italic"></p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default ActivitiesComponent;
