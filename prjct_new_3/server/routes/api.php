<?php

use App\Http\Controllers\ActivityController;
use App\Http\Controllers\ActivityTypeController;
use App\Http\Controllers\ActivityPictureController;
use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookmarkController;
use App\Http\Controllers\CityController;
use App\Http\Controllers\CityPictureController;
use App\Http\Controllers\FollowController;
use App\Http\Controllers\LikeController;
use App\Http\Controllers\RatingController;
use App\Http\Controllers\CommentController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\NotificationController;
use App\Models\City;
use App\Models\Following;
use App\Models\Rating;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::group(["middleware" => "auth:api", "prefix" => "user"], function () {
    //user
    Route::post("logout", [AuthController::class, "logout"]);
    Route::get("getFollowings", [FollowController::class, "getFollowings"]);
    Route::get("getFollowers", [FollowController::class, "getFollowers"]); 
    
Route::get("getUserFollowings/{user_id}", [FollowController::class, "getUserFollowings"]);
Route::get("getUserFollowers/{user_id}", [FollowController::class, "getUserFollowers"]);

    
    
    Route::get("searchUsers", [AdminController::class, "searchUsers"]);
     Route::post("changePassword", [AuthController::class, "changePassword"]);
  
    Route::get("isFollowing/{user_id}", [FollowController::class, "isFollowing"]);
    Route::post("follow", [FollowController::class, "handleFollow"]);

    Route::get("profile", [AuthController::class, "getMyprofile"]);


    //like
    Route::post("like", [LikeController::class, "handleLike"]);
    Route::get("getLikeCount/{activity_id}", [LikeController::class, "getLikeCount"]);
    Route::get("getUserLikedActivity", [LikeController::class, "getUserLikedActivity"]);
    //bookmark
    Route::post("bookmark", [BookmarkController::class, "handleBookmark"]);
    Route::get("getBookmarkCount/{activity_id}", [BookmarkController::class, "getBookmarkCount"]);
    Route::get("getUserBookmarkedActivity", [BookmarkController::class, "getUserBookmarkedActivity"]);
    //rating
    Route::post("rating", [RatingController::class, "handleRating"]);
    Route::post("deleteRating/{rating_id}", [RatingController::class, "deleteRating"]);
    //comment
    Route::post("comment", [CommentController::class, "handleComment"]);
   
    Route::post("editComment/{comment_id}", [CommentController::class, "editComment"]);

    Route::post("deleteComment/{comment_id}", [CommentController::class, "deleteComment"]);
   
   
    //activity
  
    Route::get("getUserActivities", [ActivityController::class, "getUserActivities"]);
    Route::get("searchActivities", [ActivityController::class, "searchActivities"]);
    Route::get("searchUsers", [AdminController::class, "searchUsers"]);

    //activity
    Route::post("addActivity", [ActivityController::class, "addActivity"]);
    Route::post("editActivity/{activity_id}", [ActivityController::class, "editActivity"]);
    Route::post("deleteActivity/{activity_id}", [ActivityController::class, "deleteActivity"]);
    Route::post("addActivityMedia", [ActivityPictureController::class, "addActivityMedia"]);
    Route::post("addActivityMultiMedia", [ActivityPictureController::class, "addActivityMultiMedia"]);
    Route::post("deleteActivityMedia/{media_id}", [ActivityPictureController::class, "deleteActivityMedia"]);
    
    //notifications
    Route::get("getUserNotifications", [NotificationController::class, "getUserNotifications"]);
    Route::get("notificationsCount", [NotificationController::class, "notificationsCount"]);
    //user
  
//users
Route::get("getUser/{user_id}", [AdminController::class, "getUser"]);

    //chat
    Route::post("message", [ChatController::class, "message"]);
    Route::get("getAllChats", [ChatController::class, "getAllChats"]);
    Route::get("getChat/{receiver_id}", [ChatController::class, "getChat"]);
    Route::post("deleteMessage/{message_id}", [ChatController::class, "deleteMessage"]);
    Route::post("deleteChat/{receiver_id}", [ChatController::class, "deleteChat"]);
    Route::get("chats", [ChatController::class, "chats"]);
    Route::get("getLatestMessage/{receiver_id}", [ChatController::class, "getLatestMessage"]);
    

    Route::post("editProfile", [AuthController::class, "editProfile"]);

    //admin group
    Route::group(["prefix" => "admin", "middleware" => "admin"], function () {
        //city
        Route::post("addCity", [CityController::class, "addCity"]);
        Route::post("deleteCity/{city_id}", [CityController::class, "deleteCity"]);
        Route::post("editCity/{city_id}", [CityController::class, "editCity"]);
        Route::post("addCityMedia", [CityPictureController::class, "addCityMedia"]);
        Route::post("deleteCityMedia/{media_id}", [CityPictureController::class, "deleteCityMedia"]);

        //search
        Route::post("adminUserSearch", [AdminController::class, "adminUserSearch"]);
        Route::post("adminCitySearch", [AdminController::class, "adminCitySearch"]);
        Route::post("adminActivitySearch", [AdminController::class, "adminActivitySearch"]);


        Route::get("getActivityLikes/{activity_id}", [AdminController::class, "getActivityLikes"]);

        //activityType
     


        //comment

        //user

     
        Route::post("userPrivilege/{user_id}", [AdminController::class, "userPrivilege"]);
        Route::post("deleteUser/{user_id}", [AdminController::class, "deleteUser"]);

        //activity_types
        Route::post("addActivityType", [ActivityTypeController::class, "addActivityType"]);
        Route::post("editActivityType/{activity_type_id}", [ActivityTypeController::class, "editActivityType"]); 
        Route::post("deleteActivityType/{activity_type_id}", [ActivityTypeController::class, "deleteActivityType"]);

    });
});



///

//likes




Route::get("getAllUsers", [AdminController::class, "getAllUsers"]);
//comments
Route::get("getCommentReplies/{replying_to_id}", [CommentController::class, "getCommentReplies"]);
Route::get("getComment/{comment_id}", [CommentController::class, "getComment"]);
Route::get("getUserComments", [CommentController::class, "getUserComments"]);
Route::get("getActivityComments/{activity_id}", [CommentController::class, "getActivityComments"]);

  //follow
//ratings
Route::get("getActivityRatings/{activity_id}", [RatingController::class, "getActivityRatings"]);



///
//activity 
Route::get("getActivity/{activity_id}", [ActivityController::class, "getActivity"]);
Route::get("getAllActivities", [ActivityController::class, "getAllActivities"]);
Route::get("randomActivities", [ActivityController::class,  "randomActivities"]);

//activity types
Route::get("getAllActivityTypes", [ActivityTypeController::class, "getAllActivityTypes"]);
Route::get("getActivityType/{activityType_id}", [ActivityTypeController::class, "getActivityType"]);


//auth
Route::post("login", [AuthController::class, "login"]);
Route::post("register", [AuthController::class, "register"]);


// city
Route::get("getCity/{city_id}", [CityController::class, "getCity"]);
Route::get("getAllCities", [CityController::class, "getAllCities"]);
Route::get("getCityActivities/{city_id}", [ActivityController::class, "getCityActivities"]);

//city media
Route::get('media/{city_id}/{filename}', function ($city_id, $filename) {
    $path = storage_path('app/public/city/' . $city_id . '/' . $filename);

    if (File::exists($path)) {
        return response()->file($path);
    } else {

        return response()->json(['error' => 'File not found'], 404);
    }
});
//city profile
Route::get('profile/{city_id}/{filename}', function ($city_id, $filename) {
    $path = storage_path('app/public/city/' . $city_id . '/profile/' . $filename);

    if (File::exists($path)) {
        return response()->file($path);
    } else {

        return response()->json(['error' => 'File not found'], 404);
    }
});


//activity_type
Route::get('icon/{activityType_id}/{icon}', function ($activityType_id,$icon) {
    $path = storage_path('app/public/activity_type/' . $activityType_id . '/icon/' . $icon);

    if (File::exists($path)) {
        return response()->file($path);
    } else {

        return response()->json(['error' => 'File not found'], 404);
    }
});
//activity media
Route::get('media/{user_id}/{activity_id}/{file_name}', function ($user_id, $activity_id, $file_name) {
    $path = storage_path('app/public/user/' . $user_id . '/activity/' . $activity_id . '/' . $file_name);

    if (File::exists($path)) {
        return response()->file($path);
    } else {
        return response()->json(['error' => 'File not found'], 404);
    }
});
//activity profile
Route::get('profile/{user_id}/{activity_id}/{file_name}', function ($user_id, $activity_id, $file_name) {
    $path = storage_path('app/public/user/' . $user_id . '/activity/' . $activity_id . '/profile/' . $file_name);

    if (File::exists($path)) {
        return response()->file($path);
    } else {
        return response()->json(['error' => 'File not found'], 404);
    }
});
//user profile_picture
Route::get('profile_picture/{user_id}/{file_name}', function ($user_id, $file_name) {
    $path = storage_path('app/public/user/' . $user_id . '/profile/' . $file_name);

    if (File::exists($path)) {
        return response()->file($path);
    } else {
        return response()->json(['error' => 'File not found'], 404);
    }
});
