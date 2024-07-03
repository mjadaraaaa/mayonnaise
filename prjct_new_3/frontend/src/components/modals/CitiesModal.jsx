import React, { useEffect, useState } from "react";
import { Modal } from "@mui/material";
import { deleteCity, getCityActivities } from "../../helpers/activity.helpers";
import StarIcon from "@mui/icons-material/Star";
import ActivitiesComponent from "../ActivitiesComponents";
import LocationCityIcon from "@mui/icons-material/LocationCity";
import Carousel, { CarouselDefault } from "../Carousel";
import { FilePenLine, Trash2, X } from "lucide-react";

const falseState = {
  cityActs: false,
  cityPics: false,
};

const ManageCitiesModal = ({
  isOpen,
  onRequestClose,
  modalCity,
  setSuccess,
  updateCities,
}) => {
  const [cityActivities, setCityActivities] = useState();

  const [cityPictures, setCityPictures] = useState([]);
  const [state, setState] = useState({
    cityPics: true,
    cityActs: false,
  });

  const togglePage = (page) => {
    setState({ ...falseState, [page]: true });
  };
  //   const [cityActs, cityPics] = state;

  const cityActivitiesGet = async (id) => {
    try {
      const res = await getCityActivities(id);
      console.log(res);
      if (res.data.status === "success") {
        setCityActivities(res.data.activities);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteCity = async () => {
    try {
      const res = await deleteCity(modalCity?.id);
      console.log(res);
      if (res.data.status === "success") {
        updateCities();
        onRequestClose();
        setSuccess(res.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log(modalCity);
    cityActivitiesGet(modalCity?.id);
    setCityPictures(modalCity?.city_pictures);
  }, [modalCity?.id]);

  return (
    <Modal
      open={isOpen}
      onClose={onRequestClose}
      className="flex w-full h-screen  bg-opacity-30 justify-center p-10 items-start "
    >
      <div className="p-3 relative  flex flex-col w-2/5 min-w-[400px] justify-start max-h-[750px]  items-center gap-5 rounded-lg shadow-lg bg-slate-300 overflow-auto ">
        <Carousel>
          {modalCity?.city_pictures.map((cityImage) => (
            <img
              className=" object-cover"
              src={`http://127.0.0.1:8000/api/media/${modalCity?.id}/${cityImage?.media}`}
              alt=""
            />
          ))}
        </Carousel>

        <div className="flex flex-col self-start  gap-2 ">
          <h1 className="font-bold text-xl capitalize">
            {modalCity?.city_name}
          </h1>
          <p className=" text-sm text-gray-700">
            {modalCity?.description ? modalCity?.description : "description"}
          </p>
        </div>
        <div className=""></div>
        <ActivitiesComponent className="" activities={cityActivities} />
        <div className=" flex gap-3 justify-between w-full  items-center absolute right-0 rounded-full px-5">
          <div className="flex gap-4 items-center justify-start">
            <button className="px-2 py-1 rounded-md bg-slate-500 text-sm text-white hover:opacity-80 active:opacity-50 transition-all">
              <FilePenLine className="w-8" />
            </button>
            <button
              onClick={() => handleDeleteCity()}
              className="px-2 py-1 rounded-md bg-red-600 text-sm text-white hover:opacity-80 active:opacity-50 transition-all"
            >
              <Trash2 className="w-8" />
            </button>
          </div>
          <button
            className="flex justify-center items-center text-lg p-1 bg-red-600 rounded-full px-2 hover:opacity-80 transition-all"
            onClick={() => {
              onRequestClose();
            }}
          >
            <X className="text-white w-5" />
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ManageCitiesModal;
