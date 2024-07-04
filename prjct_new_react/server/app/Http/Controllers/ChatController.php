<?php

namespace App\Http\Controllers;

use App\Models\Chat;
use App\Models\User;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;


class ChatController extends Controller
{
    public function message(Request $request){
        try{
        $sender = Auth::user();

        $message = Chat::create([
            "message"=>$request->message,
            "sender_id"=>$sender->id,
            "receiver_id"=>$request->receiver_id,
            "isdeleted_sender"=>0,
            "isdeleted_receiver"=>0,

        ]);

        return response()->json([

            "status"=>"success",
            "message"=>"message sent successfully",
            "message"=>$message,



        ]);

        
    }catch(Exception $ex ){

        return response()->json([

            "status"=>"error",
            "message"=>" an error occured while sending message ",
            

        ]);


    }


    }
    
    
     public function getAllChats(){
    try{
    $user = Auth::user();
    $sender_id = $user->id ;
    
    $chats = Chat::query()->where(function ($query) use ($sender_id) {
        $query->where('sender_id', $sender_id)->where(function ($subquery) { 
        
               $subquery->where('isdeleted_sender', 0);
            });
    })
    ->orWhere(function ($query) use ($sender_id) {
        $query->where('receiver_id', $sender_id)->where(function ($subquery) { 
                $subquery->where('isdeleted_receiver',0);
            });
    })->get();
    
    
    return response()->json([

        "status"=>"success",
        "message"=>"chats retrieved successfully",
        "chats"=>$chats,

    ]);


    }catch(Exception $ex){

        
        return response()->json([

            "status"=>"error",
            "message"=>" an error occured while retrieving all chats",
     
        ]);




    }


   }
   
   
   public function getChat($receiver_id){


    try {

        $sender = Auth::user();
$sender_id = $sender->id;
$chat = Chat::query()
    ->where(function ($query) use ($sender_id, $receiver_id) {
        $query->where('sender_id', $sender_id)->where('receiver_id', $receiver_id)->where(function ($subquery) { 
        
               $subquery->where('isdeleted_sender', 0);
            });
    })
    ->orWhere(function ($query) use ($sender_id, $receiver_id) {
        $query->where('sender_id', $receiver_id)->where('receiver_id', $sender_id)->where(function ($subquery) { 
                $subquery
                    ->Where('isdeleted_receiver', 0);
            });
    })->get();
    
        return response()->json([

            "status"=>"success",
            "message"=>"chats retrieved successfully",
            "chat"=>$chat,
    
    
    
        ]);


        
    } catch (Exception $ex) {

         
        return response()->json([

            "status"=>"error",
            "message"=>" an error occured while retrieving chats ",
            



        ]);

       
    }




   }
   
   
   
   public function deleteMessage($message_id){
    try{
    $user = Auth::user();

    $message = Chat::findorfail($message_id);
        if($message->sender_id !== $user->id && $message->receiver_id !== $user->id   ){

            return response()->json([

                "status"=>"error",
                "message"=>" only user can delete his messages",
                
        
        
        
            ]);
        

        }
         if($message->sender_id == $user->id ){
             $message->update([
                 
                 "isdeleted_sender"=>1,
                 
                 ]);
         }else{
               $message->update([
                 
                 "isdeleted_receiver"=>1,
                 
                 ]);
             
             
             
         }


   

    return response()->json([

        "status"=>"success",
        "message"=>"message deleted successfully",
       



    ]);

    
}catch(Exception $ex ){

    return response()->json([

        "status"=>"error",
        "message"=>" an error occured while deleting message ",
        



    ]);

    
}
       
       
   }
   
   
   
   
   public function deleteChat($receiver_id){


    try {

 $sender = Auth::user();
$sender_id = $sender->id;
$messages = Chat::query()
  ->where(function ($query) use ($sender_id, $receiver_id) {
    $query->where('sender_id', $sender_id)
      ->where('receiver_id', $receiver_id);
  })
  ->orWhere(function ($query) use ($sender_id, $receiver_id) {
    $query->where('sender_id', $receiver_id)
      ->where('receiver_id', $sender_id);
  })
  ->get();
  
   foreach($messages as $message){
       
        if($message->sender_id == $sender_id ){
             $message->update([
                 
                 "isdeleted_sender"=>1,
                 
                 ]);
         }else{
               $message->update([
                 
                 "isdeleted_receiver"=>1,
                 
                 ]);
             
             
             
         }


       
   }


     
        return response()->json([

            "status"=>"success",
            "message"=>"chat deleted successfully",
         
    
        ]);


        
    } catch (Exception $ex) {

         
        return response()->json([

            "status"=>"error",
            "message"=>" an error occured while deleting chat",
            



        ]);

       
    }




   }
   
 public function chats() {
  try {
    $user = Auth::user();
    $sender_id = $user->id;

    $chats = Chat::with(['sender', 'receiver']) 
      ->where(function ($query) use ($sender_id) {
        $query->where('sender_id', $sender_id)
          ->orWhere('receiver_id', $sender_id)
          ->where(function ($subquery) {
            $subquery->where('isdeleted_sender', 0)
              ->orWhere('isdeleted_receiver', 0);
          });
      })
      ->get();
    

    $usernames = [];
    foreach ($chats as $chat) {
     
      if(in_array($chat->sender,$usernames)){
         
      }
      else if($chat->sender->id !== $user->id ) {
        $usernames[] = $chat->sender;
      
      } else if(in_array($chat->receiver,$usernames)){
         
      }
      else if ($chat->receiver->id !== $user->id ) {
        $usernames[] = $chat->receiver;
              }
    }
    

    return response()->json([
      "status" => "success",
      "message" => "chats retrieved successfully",
      "chats" => $usernames,
    ]);
  } catch (Exception $ex) {
    return response()->json([
      "status" => "error",
      "message" => "an error occurred while retrieving chats",
    ]);
  }
}


 public function getLatestMessage($receiver_id) {
     
    try {

        $sender = Auth::user();
$sender_id = $sender->id;
$chat = Chat::query()
    ->where(function ($query) use ($sender_id, $receiver_id) {
        $query->where('sender_id', $sender_id)->where('receiver_id', $receiver_id)->where(function ($subquery) { 
        
               $subquery->where('isdeleted_sender', 0);
            });
    })
    ->orWhere(function ($query) use ($sender_id, $receiver_id) {
        $query->where('sender_id', $receiver_id)->where('receiver_id', $sender_id)->where(function ($subquery) { 
                $subquery
                    ->Where('isdeleted_receiver', 0);
            });
    })->orderBy('created_at', 'desc')->limit(1)->get();
    
        return response()->json([

            "status"=>"success",
            "message"=>"message retrieved successfully",
            "chat"=>$chat,
    
    
    
        ]);


        
    } catch (Exception $ex) {

         
        return response()->json([

            "status"=>"error",
            "message"=>" an error occured while latest message",
            
        ]);

       
    }


   }
   

  
    
}
