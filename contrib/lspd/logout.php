<?php
session_start();
session_destroy();

setcookie("identifier","",time()-(3600*24*365));
setcookie("securitytoken","",time()-(3600*24*365));

header('Location: login.php');
?>
