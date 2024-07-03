<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\Like;
use App\Models\Post;
use App\Models\Notification;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class LikeController extends Controller
{
    public function handleLike(Request $request)
    {
        try {
            $user = Auth::user();
            
            $liked_activity = $request->activity_id;
            $existing = Like::where("activity_id", $liked_activity)
                ->where("user_id", $user->id)
                ->first();

            $activity = Activity::findorfail($liked_activity);


            if ($existing) {

                $existing->delete();
                $activity->update(["likes_count" => $activity->likes_count - 1,]);
                return response()->json([
                    "status" => "success",
                    "message" => "Activity unliked successfully",
                ]);
            }

            $like = Like::create([
                "activity_id" => $liked_activity,
                "user_id" => $user->id,
            ]);

            $activity->update(["likes_count" => $activity->likes_count + 1,]);

            $notification = Notification::create([
                "notification" => "liked your activity",
                "sender_id" => $user->id,
                "receiver_id" => $activity->user_id,
                "activity_id" => $activity->id,
            ]);

            return response()->json([
                "status" => "success",
                "message" => "Activity liked successfully",
                
            ]);
           
            
        } catch (Exception $ex) {
            return response()->json([
                "status" => "error",
                "message" => "An error occurred while trying to like activity",
            ]);
        }
    }

    public function getLikeCount($activity_id)
    {

        try {
            $count = Like::where("activity_id", $activity_id)->count();

            return response()->json([
                "status" => "success",
                "messsage" => "like count for activity retrieved",
                "count" => $count,

            ]);
        } catch (Exception $ex) {

            return response()->json([
                "status" => "error",
                "message" => "An error occurred when trying to get like count",
            ]);
        }
    }

    public function getUserLikedActivity()
    {
        try {
            $user = Auth::user();
            $user_liked_activities = Like::with("activity")->where("user_id", $user->id)->get();
            $count = Like::where("user_id", $user->id)->count();
            return response()->json([
                "status" => "success",
                "message" => "retrieved user liked acts ",
                "liked_activities" => $user_liked_activities,
                "count" => $count,

            ]);
        } catch (Exception $ex) {

            return response()->json([
                "status" => "error",
                "message" => "An error occurred when trying to get liked activities",
            ]);
        }
    }
    
    public function isLiked($activity_id)
    {
        try{
            $user = Auth::user();
            $is_liked= Like::where('user_id',$user->id)->where('activity_id',$activity_id)->exists();
            if($is_liked){
               return response()->json([
                
                'status' => 'success',
                'message' => 'you like activity: '.$activity_id,
            ]);
            }
            return response()->json([
                
                'status' => 'failed',
                'message' => 'you dont like activity: '.$activity_id,
            ]);
            
            
        }catch(Exception $ex){
            return response()->json([
                
                'status' => 'error',
                'message' => " an error occured while trying to get result",
            ]);
            
            
            
        }
        
        
        
        
    }
}
