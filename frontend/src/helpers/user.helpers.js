import axios from "axios";
import { auth } from "./auth.helpers";
const baseUrl = "http://127.0.0.1:8000/api/";


async function searchUsers(query) {

    try{
        const res = await axios.get(`${baseUrl}user/searchUsers`,{users : query},auth());
        const data =res.data ;
        return {data};
    }catch(error){
        throw error ;

    }


}

async function getMyProfile() {

    try{
        const res = await axios.get(`${baseUrl}user/profile`,auth());
        const data =res.data ;
        return {data};
    }catch(error){
        throw error ;


    }


}

async function getUser(user_id) {//with activities

    try{
        const res = await axios.get(`${baseUrl}user/getUser/${user_id}`,auth());
        const data =res.data ;
        return {data};
    }catch(error){
        throw error ;

    }


}




async function getAllUsers() {

    try{
        const res = await axios.get(`${baseUrl}user/getAllUsers`,auth());
        const data =res.data ;
        return {data};
    }catch(error){
        throw error ;

    }

}


async function deleteUser(user_id) {

    try{
        const res = await axios.delete(`${baseUrl}user/admin/deleteUser/${user_id}`,auth());
        const data =res.data ;
        return {data};
    }catch(error){
        throw error ;

    }
}

async function deleteComment(comment_id) {

    try{
        const res = await axios.delete(`${baseUrl}user/deleteComment/${comment_id}`,auth());
        const data =res.data ;
        return {data};
    }catch(error){
        throw error ;

    }
}


async function userPrivilege(user_id) {

    try{
        const res = await axios.post(`${baseUrl}user/admin/userPrivilege/${user_id}`,undefined,auth());
        const data =res.data ;
        return {data};
    }catch(error){
        throw error ;

    }
}
















export {getUser ,getAllUsers, deleteUser ,userPrivilege 
    , deleteComment , getMyProfile ,searchUsers };