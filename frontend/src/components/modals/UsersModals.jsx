import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { Avatar, modalClasses } from "@mui/material";
import { getUser } from "../../helpers/user.helpers";
import { stringAvatar, stringAvatar1 } from "../../helpers/helpers";
import axios from "axios";

import ModeCommentIcon from "@mui/icons-material/ModeComment";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import StarIcon from "@mui/icons-material/Star";
import PinDropIcon from "@mui/icons-material/PinDrop";
import {
  adminUserSearch,
  deleteUser,
  getAllUsers,
  userPrivilege,
} from "../../helpers/user.helpers";

const ManageUsersModal = ({
  isOpen,
  onRequestClose,
  modalUser,
  setErrorMessage,
  setSuccessMessage,
}) => {
  const [activities, setActivities] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const userGet = async (user_id) => {
    try {
      const res = await getUser(user_id);
      if (res.data.status === "success") {
        setActivities(res.data.user.activity);
        console.log(activities);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const delUser = async (id) => {
    try {
      const res = await deleteUser(id);
      if (res.data.status === "success") {
        setSuccessMessage(res.data.message);
        console.log(res.data);
      } else {
        setErrorMessage(res.data.message);
        console.log(res.data);
      }
    } catch (error) {
      setErrorMessage(error.message);
      console.error(error);
    }
  };

  const promoteDemote = async (id) => {
    try {
      const res = await userPrivilege(id);
      if (res.data.status === "success") {
        setSuccessMessage(res.data.message);
        console.log(res.data);

        //search(userFormData);
      } else {
        //setErrorMessage(res.data.message );
        console.log(res.data);
      }
    } catch (error) {
      //setErrorMessage(error.message)
      console.log(error);
    }
  };

  useEffect(() => {
    userGet(modalUser?.id);
  }, [modalUser]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={
        "w-full h-screen bg-black bg-opacity-30 p-20 flex justify-center items-center "
      }
    >
      <div className="flex flex-col justify-start gap-6 w-4/5 rounded-lg min-h-[450px] shadow-lg bg-slate-300 p-5">
        <div className="flex justify-between items-center">
          <h1>user info</h1>
          <button
            className="px-3 py-1 text-sm bg-red-600 text-white rounded-full hover:opacity-70 transition-all"
            onClick={() => onRequestClose()}
          >
            {" "}
            dismiss
          </button>
        </div>
        <div className="flex justify-start gap-3 items-center ">
          {modalUser?.profile_picture ? (
            <Avatar
              className="shadow-lg"
              sx={{ width: 120, height: 120 }}
              src={`http://127.0.0.1:8000/api/profile_picture/${modalUser?.id}/${modalUser?.profile_picture}`}
            />
          ) : (
            <Avatar className="shadow-lg" {...stringAvatar1(modalUser?.name)} />
          )}

          <div className="flex flex-col justify-center">
            <p className="text-2xl font-bold">{modalUser?.name}</p>
            <p className="">{modalUser?.email}</p>
            <div className="flex justify-start">
              <p
                className={
                  modalUser?.role_id === 1
                    ? ` bg-yellow-700 uppercase text-xs text-white px-2 rounded-full mt-1 shadow-lg`
                    : ` font-bold uppercase text-xs`
                }
              >
                {modalUser?.role_id === 1 ? "ADMIN" : "USER"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center ">
          <div className="flex items-center  px-3 gap-4">
            <div>{}0 following</div> <div>{}0 followers</div>
            <div>{}0 likes</div>
            <div>{} 0 comments</div>
            <div>{}0 bookmarks</div>
          </div>
          <div className="flex items-center justify-end gap-5">
            <button className="px-3 py-1 text-sm bg-red-600 text-white rounded-full hover:opacity-70 transition-all">
              delete
            </button>
            <button
              onClick={() => promoteDemote(modalUser?.id)}
              className={
                modalUser?.role_id === 1
                  ? "px-2 py-1 bg-red-500 text-white hover:opacity-70 active:opacity-50 text-sm rounded-full transition-all"
                  : "px-2 py-1 bg-green-600 text-white hover:opacity-70 active:opacity-50 text-sm rounded-full transition-all "
              }
            >
              promote
            </button>
          </div>
        </div>
        <div className=" flex flex-col gap-2 justify-start">
          <div className="  border-y-2  border-gray-600"></div>
          <div className="">
            <h1 className="font-bold text-xl uppercase ">activities</h1>
          </div>
        </div>
        <div className="flex flex-wrap justify-start gap-3 ">
          {activities?.length === 0 ? (
            <div>no results </div>
          ) : (
            activities?.map((activity) => (
              <div
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
                    <p class="text-lg font-bold">{activity?.activity_name}</p>
                    <p class="text-sm "></p>
                  </div>
                  <PinDropIcon></PinDropIcon>
                  <p class="px-2 text-xs italic"></p>
                </div>

                <div className="flex items-center justify-evenly p-2 rounded-full bg-white mx-3">
                  <div className="flex items-center justify-center">
                    <FavoriteIcon className="text-red-600 shadow-sm"></FavoriteIcon>
                    <p class="text-sm text-red-600 shadow-sm">
                      {activity?.likes_count}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <ModeCommentIcon className="text-gray-500 shadow-sm"></ModeCommentIcon>
                    <p class="text-sm text-gray-500 shadow-sm">
                      {activity?.comments_count}
                    </p>
                  </div>
                  <div className="flex items-center justify-center">
                    <BookmarkAddedIcon className="text-green-600 shadow-sm"></BookmarkAddedIcon>
                    <p class="text-sm text-red-green shadow-sm">
                      {activity?.bookmarks_count}
                    </p>
                  </div>
                </div>
                <div className="absolute flex justify-between items-center gap-1 top-3 right-3 shadow-lg text-yellow-600 bg-white px-3 font-bold text-xl py-1 rounded-full">
                  <StarIcon className="text-yellow-500"></StarIcon>3.2
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Modal>
  );
};

export default ManageUsersModal;
