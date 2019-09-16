<?php require_once ('includes/session.php');?>
<?php require_once ('includes/functions.php');?>
<?php

if (isset($_REQUEST['login'])) {    
    $email = $_POST['email'];
    $pass = $_POST['password'];
    $password = md5($pass);

    //Because the password has been encripted in the JSON file, we'd have to encript it too
    //as it is coming from the input before we compare.

    $json_data = file_get_contents('data.json');
    $data = json_decode($json_data,true); //adding true turns it into an assoociative array

    /**
     * Line 14 gets the data.json file and Line 15 turns it into a PHP array    
    */

    foreach($data as $key => $value){
        if ($value['email'] == $email && $value['password'] == $password) {
            $_SESSION['user_id'] = $value['email'];             
            redirect_to('secret-page.php');
        }
        $message = "Incorrect Credentials";
    }
    if (!empty($message)) {
        echo $message;
    }
}

/**
 * From Line 18, we loop through the associative array created (i.e the Json file)
 * and compare with the user input. if the user input matches any of the data in our array
 * we then store the user's email into a session variable called 'user_id' then we redirect
 * to our secret page. 
 * 
 */

?>