<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\City;
use App\Models\Like;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AdminController extends Controller
{

    public function adminUserSearch(Request $request)
    {

        try {
            if ($request->search) {
                $search = $request->search;
                $users = User::where('id',$search)->orwhere('name', 'like', "%$search%")->orwhere('email', 'like', "%$search%")->get();
                return response()->json([
                    'status' => 'success',
                    'users' => $users,

                ]);
            }
            $users = User::orderBy("created_at", "desc")->limit(5)->get();
            return response()->json([
                'status' => 'success',
                'users' => $users,

            ]);
        } catch (Exception $ex) {


            return response()->json([

                'status' => 'exception',
                'message' => 'there was an exception searching users',


            ]);
        }
    }

    public function adminActivitySearch(Request $request)
    {

        try {
            if ($request->search) {
                $search = $request->search;
                $activities = Activity::with('user')->with('city')->withCount('activityPictures')->with('activityPictures')->where('id',$search)->orwhere('activity_name', 'like', "%$search%")->orwhere('description', 'like', "%$search%")->get();
                return response()->json([
                    'status' => 'success',
                    'activities' => $activities,

                ]);
            }
            $activities = Activity::with('user')->with('city')->withCount('activityPictures')->with('activityPictures')->orderBy("created_at", "desc")->limit(5)->get();
            return response()->json([
                'status' => 'success',
                'activities' => $activities,

            ]);
        } catch (Exception $ex) {


            return response()->json([

                'status' => 'exception',
                'message' => 'there was an exception searching users',


            ]);
        }
    }

    public function adminCitySearch(Request $request)
    {

        try {
            if ($request->search) {
                $search = $request->search;
                $cities = City::with('cityPictures')->where('id',$search)->orwhere('city_name', 'like', "%$search%")->get();
                return response()->json([
                    'status' => 'success',
                    'cities' => $cities,

                ]);
            }
            $cities = City::with('cityPictures')->orderBy("created_at", "desc")->limit(4)->get();
            return response()->json([
                'status' => 'success',
                'cities' => $cities,

            ]);
        } catch (Exception $ex) {


            return response()->json([

                'status' => 'exception',
                'message' => 'there was an exception searching users',


            ]);
        }
    }



    public function searchUsers(Request $request)
    {
        try {
            $search = $request->search;
            $users = User::with('activity')->where('name', 'like', "%$search%")->get();

            return response()->json([
                'status' => 'success',
                'users' => $users,
            ]);
        } catch (Exception $ex) {


            return response()->json([

                'status' => 'exception',
                'message' => 'there was an exception searching users',


            ]);
        }
    }

   
    public function getUser($user_id) 
    {
        try {
            $user = User::with('activity')->withCount('follower')->withCount('followed')->findorfail($user_id);
            $count =User::withCount('activity')->findorfail($user_id);
            return response()->json([
                'status' => 'success',
                'user' => $user,
                'count'=>$count,
                

            ]);
        } catch (Exception $ex) {
            return response()->json([
                'status' => 'error',
                'message' => 'an error occured while trying to get user'.$ex,

            ]);
        }
    }

    public function getAllUsers() 
    {
        try {
            $users = User::with('activity')->get();

            return response()->json([
                'status' => 'success',
                'users' => $users,
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while retrieving all users.',
            ]);
        }
    }

    public function deleteUser($user_id) 
    {
        try {
            $user = User::findOrFail($user_id);
            $user->delete();
            return response()->json([
                'status' => 'success',
                'message' => 'deleted user successfully',
            ]);
        } catch (Exception $ex) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while trying to delete user.'.$ex,
            ]);
        }
    }

    
    public function userPrivilege($user_id)
    {
        try {
            $admin=Auth::user();

            $user = User::findOrFail($user_id);


            if($admin->id == $user->id){
                return response()->json([
                    'status' => 'failed',
                    'message' => 'you can demote your self',
                ]);


            }
            if ($user->role_id == 1) {
                $user->role_id = 2;
                $message = 'User demoted to a normal user';
            } else {
                $user->role_id = 1;
                $message = 'User promoted to admin';
            }

            $user->save();

            return response()->json([
                'status' => 'success',
                'message' => $message,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while updating user role.',
            ]);
        }
    }

    public function getActivityLikes($activity_id){
        try {
            $likes = Like::with("user")->where("activity_id", $activity_id)->get();
            return response()->json([
                'status' => 'success',
                'message' => "Likes retrieved successfully",
                'likes' => $likes,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'status' => 'error',
                'message' => 'An error occurred while getting likes',
            ]);
        }

    }
    //crud for cities & activities in their controllers
}
