import axios from "axios";
import { auth } from "./auth.helpers";

const baseUrl = "http://127.0.0.1:8000/api/";


//cities

async function getAllCities(){

    try{
        const res =await axios.get(`${baseUrl}user/getAllCities`,auth());
        const data = res.data ;
        return {data};

    }catch(error){
        throw error ;
    }
}

async function getCity(city_id){

    try{
        const res = await axios.get(`${baseUrl}user/getCity/${city_id}`,auth());
        const data = res.data ;
        return {data};

    }catch(error){
        throw error ;
    }
}


async function getCityActivities(city_id){

    try{
        const res =await axios.get(`${baseUrl}user/getCityActivities/${city_id}`,auth());
        const data = res.data ;
        return {data};

    }catch(error){
        throw error ;
    }
}



async function addCityMedia({media}){

    try{
        const res = await axios.post(`${baseUrl}user/admin/addCityMedia`,{media},auth());
        const data = res.data ;
        return {data};

    }catch(error){
        throw error ;
    }
}


async function addCity({city_name,description,location,picture}){

    try{
        const res = await axios.post(`${baseUrl}user/admin/addCity`,{city_name,description,location,picture},auth());
        const data = res.data ;
        return {data};

    }catch(error){
        throw error ;
    }
}

async function editCity({city_name,description,location,picture}){

    try{
        const res = await axios.post(`${baseUrl}user/admin/editCity`,{city_name,description,location,picture},auth());
        const data = res.data ;
        return {data};

    }catch(error){
        throw error ;
    }
}




async function deletecity(city_id){

    try{
        const res = await axios.delete(`${baseUrl}user/admin/deletecity/${city_id}`,auth());
        const data = res.data ;
        return {data};

    }catch(error){
        throw error ;
    }
}








async function addActivityType({name,icon}){

    try{
        const res =await axios.post(`${baseUrl}user/admin/addActivityType`,{name,icon},auth());
        const data = res.data ;
        return {data};

    }catch(error){
        throw error ;
    }
}


async function editActivityType({name,icon},activity_type_id){

    try{
        const res =await axios.post(`${baseUrl}user/admin/editActivityType/${activity_type_id}`,{name,icon},auth());
        const data = res.data ;
        return {data};

    }catch(error){
        throw error ;
    }
}



//activities

async function searchActivities(query) {
    try {
      const res = await axios.get(
        `${baseUrl}user/searchActivities`,
        { search:query },
        auth()
      );
      if (res.status === 200) {
        const data = res.data;
        return { data };
      }
    } catch (error) {
      throw error;
    }
  }
  

async function getAllActivities(){

    try{
        const res =await axios.get(`${baseUrl}user/getAllActivities`,auth());
        const data = res.data 
        
        return {data};

    }catch(error){
        throw error ;
    }
    
}

async function getActivity(activity_id){

    try{
        const res =await axios.get(`${baseUrl}user/getActivity/${activity_id}`,auth());
        const data = res.data ;
        return {data};

    }catch(error){
        throw error ;
    }
}

async function getActivityComments(activity_id){

    try{
        const res = await axios.get(`${baseUrl}user/getActivityComments/${activity_id}`,auth());
        const data = res.data ;
        return {data};

    }catch(error){
        throw error ;
    }
}



async function deleteActivity(activity_id){

    try{
        const res =await axios.delete(`${baseUrl}user/deleteActivity/${activity_id}`,auth());
        const data = res.data ;
        return {data};

    }catch(error){
        throw error ;
    }
}




export { getAllCities, getCity,getCityActivities ,addCityMedia ,addCity ,editCity 
    ,deletecity ,addActivityType , editActivityType , searchActivities ,getAllActivities , getActivity, getActivityComments , deleteActivity };
