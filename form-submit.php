<?php

if(!isset($_POST['submit'])){
    echo "error; you need to submit the form";
}
$postdata = file_get_contents("php://input");
$request = json_decode($postdata);
$name = $request->name
$visitor_email = $request->email;
$message = $request->message;
echo $name;
//
//if(empty($name)||empty($visitor_email))
//{
//    echo "name aand email are mandatory";
//    exit;
//}
//$email_from = 'AlexStolzoff@gmail.com';
//$email_subject = "New Form Submission";
//$email_body = "You received a new message from user $name.\n".
//    "email address: $visitor_email\n".
//    "Here is the message:\n $message".
//$to = "AlexStolzoff@gmail.com";
//$headers = "From: $email_from \r\n";
//
//mail($to, $email_subject, $email_body, $headers);

//$name = $_POST['name'];
//$visitor_email = $_POST['email'];
//$message = $_POST['message'];
//console.log($name, $visitor_email, $message);
//
//
//
//
//    $email_from = 'AlexStolzoff@gmail.com';
//    $email_subject = "New Form Submission";
//    $email_body = "You have received a new message from the user $name.\n".
//        "Here is the message: \n $message".;
//        
//
//
//
//function IsInjected($str)
//{
//    $injections = array('(\n+)',
//    '(\r+)',
//    '(\t+)',
//    '(%0A+)',
//    '(%0D+)',
//    '(%08+)',
//    '(%09+)'
//                        );
//    $inject = join('|', $injections);
//    $inject = "/$inject/i";
//    
//    if(preg_match($inject,$str))
//    {
//        return true;
//    }
//    else{
//        return false;
//    }
//}
//    if(IsInjected($visitor_email))
//    {
//        echo "Bad email value!";
//        exit;
//    }
//                        
//
//
//    $to = "AlexStolzoff@gmail.com";
//    $headers = "From: $email_from \r\n";
//    $headers = "Reply-To: $visitor_email \r\n";
//    mail($to, $emaail_subject, $email_body, $headers);
?>







