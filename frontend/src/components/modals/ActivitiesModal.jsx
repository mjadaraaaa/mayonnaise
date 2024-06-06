import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Avatar, modalClasses } from "@mui/material";
import { getUser } from "../../helpers/user.helpers";
import { stringAvatar, stringAvatar1 } from "../../helpers/helpers";
import axios from "axios";
import "animate.css";

import CommentIcon from "@mui/icons-material/Comment";
import InsertPhotoIcon from "@mui/icons-material/InsertPhoto";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PinDropIcon from "@mui/icons-material/PinDrop";
import MediaComponent from "../MediaComponent";
import { LikesComponent } from "../LikesComponent";
import { CommentsComponent } from "../CommentsComponent";

const falseState = {
  media: false,
  likes: false,
  comments: false,
};
const ManageActivitiesModal = ({
  isOpen,
  onRequestClose,
  modalActivity,

  setSuccessMessage,
}) => {
  const [state, setState] = useState({
    media: true,
    likes: false,
    comments: false,
  });
  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };
  const [activityPictures, setActivityPictures] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [mainImage, setMainImage] = useState("");
  const [animateImage, setAnimateImage] = useState(false);

  useEffect(() => {
    setActivityPictures(modalActivity?.activity_pictures);
    setMainImage(modalActivity?.activity_pictures[0]?.media);
  }, [modalActivity?.id]);

  const handleImageChange = (newImage) => {
    if (mainImage === newImage) {
      return;
    }
    setAnimateImage(true);
    setTimeout(() => {
      setMainImage(newImage);
      setAnimateImage(false);
    }, 200);
  };
  const { media, likes, comments } = state;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={
        "w-full h-screen bg-black bg-opacity-30 flex justify-center p-10 items-start "
      }
    >
      <div className=" relative  flex flex-col  justify-start gap-6 w-2/5 min-w-[450px] rounded-lg min-h-[350px] max-h-[800px] shadow-lg bg-slate-300 p-8 overflow-auto scroll-smooth ">
        <div></div>
        <div></div>
        <div className="relative flex  justify-center   ">
          <img
            className="h-[300px]  w-full object-cover aspect-square rounded-md shadow-md"
            src={`http://127.0.0.1:8000/api/profile/${modalActivity?.user_id}/${modalActivity?.id}/${modalActivity?.picture}`}
            alt=""
          />
          <div className=" flex justify-center  absolute  top-3/4 ">
            {modalActivity?.user.profile_picture ? (
              <Avatar
                className="shadow-xl border-2 border-slate-300  "
                sx={{ width: 120, height: 120 }}
                src={`http://127.0.0.1:8000/api/profile_picture/${modalActivity?.user.id}/${modalActivity?.user.profile_picture}`}
              />
            ) : (
              <Avatar
                className="shadow-xl border-2 border-slate-300"
                {...stringAvatar1(modalActivity?.user.name)}
              />
            )}
          </div>
        </div>
        <div className=" absolute top-8 right-8 flex justify-between items-center">
          <button
            className="px-3 py-1 text-sm bg-red-600 text-white rounded-full hover:opacity-70 transition-all"
            onClick={() => onRequestClose()}
          >
            {" "}
            dismiss
          </button>
        </div>

        <div className="flex flex-col gap-5 justify-Start mt-4">
          <div className="flex flex-col  sticky">
            <div className="flex items-center justify-start gap-3">
              <h1 className="   text-2xl font-bold  ">
                {modalActivity?.activity_name}{" "}
              </h1>{" "}
              <h1 className="  text-sm  text-gray-800 ">
                ( id : {modalActivity?.id} )
              </h1>{" "}
            </div>
            <h1 className="   text-sm text-gray-800 ">
              By {modalActivity?.user.name}
            </h1>
          </div>
          <p className="   text-xs text-black">
            {modalActivity?.description}hello hello This is a test regarding
            description please remove when adding description{" "}
          </p>
          <div className="flex justify-start py-2 ">
            <PinDropIcon></PinDropIcon>
            <p className="text-black font-mono">
              {modalActivity?.location} {modalActivity?.city.city_name}
            </p>
          </div>
          <div className="flex gap-4  justify-evenly items-center  ">
            <div
              onClick={() => togglePage("media")}
              className={
                media
                  ? `flex w-full px-3 py-1 hover:bg-white rounded-sm transition-all cursor-pointer justify-center items-center gap-1  text-gray-700 border-b-4 border-white`
                  : `flex w-full px-3 py-1 hover:bg-white rounded-sm transition-all cursor-pointer justify-center items-center gap-1  text-gray-700`
              }
            >
              <InsertPhotoIcon />
              <h1 className="text-md">
                {modalActivity?.activity_pictures_count}
              </h1>
            </div>
            <div
              onClick={() => togglePage("likes")}
              className={
                likes
                  ? `flex px-3 w-full py-1 hover:bg-red-500  hover:text-white rounded-sm transition-all cursor-pointer justify-center items-center gap-1  text-gray-700 border-b-4 border-red-500`
                  : `flex px-3 w-full py-1 hover:bg-red-500  hover:text-white rounded-sm transition-all cursor-pointer justify-center items-center gap-1  text-gray-700`
              }
            >
              <FavoriteIcon />
              <h1 className="text-md">{modalActivity?.likes_count}</h1>
            </div>

            <div
              onClick={() => togglePage("comments")}
              className={
                comments
                  ? `flex px-3 w-full py-1 hover:bg-gray-500  hover:text-white rounded-sm transition-all cursor-pointer justify-center items-center gap-1  text-gray-700 border-b-4 border-gray-500`
                  : `flex px-3 w-full py-1 hover:bg-gray-500  hover:text-white rounded-sm transition-all cursor-pointer justify-center items-center gap-1  text-gray-700`
              }
            >
              <CommentIcon />
              <h1 className="text-md">{modalActivity?.comments_count}</h1>
            </div>
          </div>
          {media && <MediaComponent activity={modalActivity}></MediaComponent>}
          {likes && <LikesComponent></LikesComponent>}
          {comments && <CommentsComponent></CommentsComponent>}
        </div>
      </div>
    </Modal>
  );
};

export default ManageActivitiesModal;
