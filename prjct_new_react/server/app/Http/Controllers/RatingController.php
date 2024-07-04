<?php

namespace App\Http\Controllers;

use App\Models\Activity;
use App\Models\User;
use App\Models\Rating;
use Error;
use Exception;
use Illuminate\Foundation\Auth\User as AuthUser;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class RatingController extends Controller
{
   public function handleRating(Request $request)
    {
        try {
            $user = Auth::user();
            $rated_activity = $request->activity_id;
            $existing = Rating::where('activity_id', $rated_activity)
                ->where('user_id', $user->id)
                ->first();

            if ($existing) {

                $activity = Activity::where('id', $rated_activity)->first();
                $activity->update(['rate_sum' =>  $activity->rate_sum + $request->rating - $existing->rating,]);
                $activity->update(['average_rate' => $activity->rate_sum / $activity->rate_count,]);


                $existing->update([
                    'content'=>$request->input('content',$existing->content),
                    'rating' => $request->rating,
                    

                ]);
                return response()->json([
                    'status' => 'success',
                    'message' => 'rating edited successfully',
                    'rating' => $existing,
                ]);
           
 }
            $rating = Rating::create([
                'rating' => $request->rating,
                'activity_id' => $rated_activity,
                'user_id' => $user->id,
                'content'=>$request->input('content'),
            ]);
        
            $activity = Activity::where('id', $rated_activity)->first();


            $activity->update(['rate_count' => $activity->rate_count  + 1,]);


            $activity->update(['rate_sum' =>  $activity->rate_sum + $request->rating,]);


            $activity->update(['average_rate' => $activity->rate_sum / $activity->rate_count,]);

            return response()->json([
                'status' => 'success',
                'message' => 'Activity rated successfully',
                'rating' => $rating,
            ]);
            
        } catch (Exception $ex) {
            return response()->json([
                'status' => 'error',
                'message' =>  $ex,
            ]);
        }
    }
    
     public function getActivityRatings($activity_id){
         
         
         try{
            
            
            $activity = Activity::findorfail($activity_id);
            $ratings = Rating::with('user')->where('activity_id',$activity->id)->get();
            
           
            return response()->json([
                'status' => 'success',
                'message' => 'user ratings successfully retrived',
                'ratings' => $ratings,
            ]);
             
             
         }catch(Exception $ex){
        
                  
            return response()->json([
                'status' => 'error',
                'message' =>  "an error occured while trying to get activity rating".$ex,
            ]);
        
             
         }
         
     }
     
     
     public function deleteRating($activity_id){
         
         
         try{
             $user= Auth::user();
            
            $rating = Rating::findorfail($activity_id);
            
            $rated_activity = Activity::findorfail($rating->activity_id);

   $rating->delete();
            
            $rated_activity ->update([
                "rate_count"=> $rated_activity->rate_count -1 ,
               
                


            ]);

            $rated_activity ->update([
                
                "rate_sum"=> $rated_activity->rate_sum - $rating->rating ,
                


            ]);

            if( $rated_activity -> rate_count == 0 ){

                 
            $rated_activity ->update([
                
                "average_rate"=> 0 ,
                


            ]);

            
            return response()->json([
                'status' => 'success',
                'message' => 'rating successfully deleted',
              
            ]);
             

            }
            
            $rated_activity->update([
                
                "average_rate"=> $rated_activity->rate_sum / $rated_activity->rate_count ,
                


            ]);
            


         
            
            return response()->json([
                'status' => 'success',
                'message' => 'rating successfully deleted',
              
            ]);
             
             
         }catch(Exception $ex){
        
                  
            return response()->json([
                'status' => 'error',
                'message' =>  "an error occured while trying to delete rating".$ex,
            ]);
        
             
         }
         
     }
     
     
     
    
    
}
