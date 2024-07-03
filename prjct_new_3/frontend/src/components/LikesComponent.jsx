import React, { useEffect, useState } from "react";
import { getActivityLikes } from "../helpers/activity.helpers";
import { Avatar } from "@mui/material";
import { stringAvatar } from "../helpers/helpers";
import Lottie from "lottie-react";
import noResult from "../Assets/Lottie/noResult.json";

export const LikesComponent = ({ activity_id }) => {
  const [likes, setLikes] = useState([]);

  const getLikes = async () => {
    try {
      const res = await getActivityLikes(activity_id);
      if (res.data.status == "success") {
        setLikes(res.data.likes);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getLikes();
  }, [activity_id]);
  return (
    <div className="flex flex-col items-center justify-center px-4 py-2 gap-2 max-h-[600px] overflow-auto">
      {likes.length === 0 ? (
        <div className="flex flex-col items-center justify-center text-gray-50 bg-slate-400 rounded-lg px-3 py-2">
          <Lottie
            animationData={noResult}
            loop={true}
            className=" w-full"
          ></Lottie>
          <p>No Likes found</p>
        </div>
      ) : (
        likes.map((like) => (
          <div
            key={like.id}
            className="flex hover:opacity-80 transition-all cursor-default items-center justify-start w-full gap-2 py-1 px-2 bg-white rounded-lg shadow"
          >
            {like?.user.profile_picture ? (
              <Avatar
                className="shadow-lg"
                src={`http://127.0.0.1:8000/api/profile_picture/${like?.user.id}/${like?.user.profile_picture}`}
              />
            ) : (
              <Avatar
                className="shadow-lg"
                {...stringAvatar(like?.user.name)}
              />
            )}

            <div className="flex flex-col items-start justify-center">
              <p className="text-sm">{like.user.name}</p>
              <p className="text-xs">{like.user.email}</p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};
