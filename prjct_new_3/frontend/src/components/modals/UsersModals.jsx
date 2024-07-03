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
import { X } from "lucide-react";

const ManageUsersModal = ({
  isOpen,
  onRequestClose,
  modalUser,
  setErrorMessage,
  setSuccessMessage,
  updateUsers,
  userActivity,
  onNext,
}) => {
  const [activities, setActivities] = useState();
  const [user, setUser] = useState();
  const [aactivity, setAactivity] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [count, setCount] = useState();

  const userGet = async (user_id) => {
    try {
      console.log(user_id);
      const res = await getUser(user_id);
      console.log(res);
      if (res.data.status === "success") {
        setActivities(res.data.user.activity);
        setUser(res.data.user);
        setCount(res.data.count);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const promoteDemote = async (id) => {
    try {
      const res = await userPrivilege(id);
      if (res.data.status === "success") {
        console.log(res.data);
        userGet(modalUser);
        setSuccessMessage(res.data.message);
      } else {
        setErrorMessage(res.data.message);
        console.log(res.data);
      }
    } catch (error) {
      //setErrorMessage(error.message)
      console.log(error);
    }
  };

  const handleDeleteUser = async () => {
    try {
      const res = await deleteUser(modalUser);
      console.log(res);
      if (res.data.status === "success") {
        onRequestClose();
        setSuccessMessage(res.data.message);
        updateUsers();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(modalUser);
    userGet(modalUser);
  }, [modalUser]);

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className={
        "w-full h-screen bg-black bg-opacity-30 p-20 flex justify-center items-center "
      }
    >
      <div className="flex flex-col justify-start gap-6 w-4/5 rounded-lg min-h-[450px] max-h-[750px] overflow-auto shadow-lg bg-slate-300 p-5">
        <div className="flex justify-between items-center">
          <h1>user info</h1>
          <button
            className="flex justify-center items-center text-lg p-1 bg-red-600 rounded-full px-2 hover:opacity-80 transition-all"
            onClick={() => {
              onRequestClose();
            }}
          >
            <X className="text-white w-5" />
          </button>
        </div>
        <div className="flex justify-start gap-3 items-center ">
          {user?.profile_picture ? (
            <Avatar
              className="shadow-lg"
              sx={{ width: 120, height: 120 }}
              src={`http://127.0.0.1:8000/api/profile_picture/${user?.id}/${user?.profile_picture}`}
            />
          ) : (
            <Avatar className="shadow-lg" {...stringAvatar1(user?.name)} />
          )}

          <div className="flex flex-col justify-center">
            <p className="text-2xl font-bold">{user?.name}</p>
            <p className="">{user?.email}</p>
            <div className="flex justify-start">
              <p
                className={
                  user?.role_id === 1
                    ? ` bg-yellow-700 uppercase text-xs text-white px-2 rounded-full mt-1 shadow-lg`
                    : ` font-bold uppercase text-xs`
                }
              >
                {user?.role_id === 1 ? "ADMIN" : "USER"}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div className="flex items-center justify-start gap-4 text-sm">
            <div className="bg-gray-100 px-3 py-1 rounded-full">
              <span className=" font-bold">{count?.followed_count}</span>{" "}
              following
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full">
              <span className=" font-bold">{count?.follower_count}</span>{" "}
              followers
            </div>
            <div className="bg-gray-100 px-3 py-1 rounded-full">
              <span className=" font-bold">{count?.activity_count}</span>{" "}
              Activities
            </div>
          </div>
          <div className="flex items-center justify-end gap-5">
            <button
              onClick={() => handleDeleteUser()}
              className="px-3 py-1 text-sm bg-red-600 text-white rounded-full hover:opacity-70 transition-all"
            >
              delete
            </button>
            <button
              onClick={() => promoteDemote(user?.id)}
              className={`px-2 py-1 text-white hover:opacity-70 active:opacity-50 text-sm rounded-full transition-all ${
                user?.role_id === 1 ? "bg-red-500" : "bg-green-500"
              }`}
            >
              {user?.role_id === 1 ? "demote" : "promote"}
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
                onClick={() => {
                  userActivity = activity?.id;
                  onRequestClose();
                }}
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
                    <p className="text-lg font-bold">
                      {activity?.activity_name}
                    </p>
                  </div>
                  <PinDropIcon></PinDropIcon>
                  <p className="px-2 text-xs italic"></p>
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
