import { Avatar } from "@mui/material";
import React, { useEffect, useState } from "react";
import {
  deleterating,
  getActivityratings,
  getActivityRatings,
} from "../helpers/activity.helpers";
import { formatDateToView, stringAvatar } from "../helpers/helpers";
import Lottie from "lottie-react";
import noResult from "../Assets/Lottie/noResult.json";
import SuccessMessageComponent from "./SuccessComponent";
import ErrorMessageComponent from "./ErrorComponent";

const RatingsComponent = (rate_id) => {
  const [ratings, setRatings] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const clearMessage = () => {
    setErrorMessage("");
    setSuccessMessage("");
  };
  //////////
  const handleGetActivityRatings = async () => {
    try {
      const res = await getActivityRatings(rate_id?.activity_id);
      console.log(rate_id?.activity_id);
      console.log(res);
      if (res.data.status === "success") {
        console.log(res);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleGetActivityRatings();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-3 py-2 gap-3 max-h-[600px] overflow-auto">
      {ratings.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-50 bg-slate-400 rounded-lg px-3 py-2">
          <Lottie animationData={noResult} loop={true} />
          <p>No ratings found</p>
        </div>
      ) : (
        ratings.map((rating) => (
          <div
            key={rating?.id}
            className="flex flex-col items-start justify-center bg-white px-3 py-2 rounded-lg w-full shadow-sm text-sm gap-3"
          >
            <div className="flex items-center justify-between w-full">
              <div className="flex items-start justify-start gap-2">
                {rating?.user.profile_picture ? (
                  <Avatar
                    className="shadow-lg"
                    src={`http://127.0.0.1:8000/api/profile_picture/${rating?.user.id}/${rating?.user?.profile_picture}`}
                  />
                ) : (
                  <Avatar
                    className="shadow-lg"
                    {...stringAvatar(rating?.user.name)}
                  />
                )}
                <div className="flex flex-col items-start justify-start">
                  <p className="font-bold">{rating?.user.name}</p>
                  <p className="text-xs italic">
                    {formatDateToView(rating?.created_at)}
                  </p>
                </div>
                {}
              </div>
              <div className="flex justify-end items-center gap-2 flex-col">
                <button
                  onClick={() => HandleDeleteRating(rating?.id)}
                  className="px-2 py-1 bg-red-500 text-white text-xs hover:opacity-80 transition-all self-start active:opacity-50 rounded-full"
                >
                  remove
                </button>
              </div>
            </div>
            <div>{rating?.content}</div>
          </div>
        ))
      )}
      {errorMessage && (
        <ErrorMessageComponent
          message={errorMessage}
          clearMessage={clearMessage}
        />
      )}
      {successMessage && (
        <SuccessMessageComponent
          message={successMessage}
          clearMessage={clearMessage}
        />
      )}
    </div>
  );
};

export default RatingsComponent;
