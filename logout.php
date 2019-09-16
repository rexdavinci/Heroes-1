<?php
require_once("includes/functions.php");


// Find the session
session_start();

//Unset all session variables

$_SESSION = array();

//destroy the session cookie
if (isset($_COOKIE[session_name()])){
    setcookie(session_name()," ", time()-42000, '/');
}

//Destroy the session
session_destroy();

redirect_to("secret-page.php?logout=1");