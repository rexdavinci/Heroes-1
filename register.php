<?php
if (isset($_REQUEST['btn-sign-up'])) {
    $name = $_POST['fullname'];
    $email = $_POST['email'];
    $pass = $_POST['password'];
    $password = md5($pass);

    $new_data=array(
        "name"=>$name,
        "email"=>$email,
        "password"=>$password
    );

    $json_data = file_get_contents('data.json');
    $data = json_decode($json_data,true); //adding true turns it into an assoociative array

    array_push($data,$new_data);
    $encoded_pushed_data = json_encode($data,JSON_PRETTY_PRINT);

   file_put_contents($json_data,$encoded_pushed_data);

}