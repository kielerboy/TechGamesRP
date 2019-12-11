<?php

require_once 'function.php';

session_start();

if(isset($_COOKIE["identifier"]) && isset($_COOKIE["securitytoken"])) {
    header('Location: dashboard.php');
}

$pdo = new PDO('mysql:host=localhost;dbname=ragemp', 'ragemp', 'ragemp');

$msg = "";

if (isset($_POST['submit'])) {
    $username = $_POST['username'];
    $password = $_POST['password'];

    $statement = $pdo->prepare("SELECT id, password FROM accounts WHERE username= :username");
    $result = $statement->execute(array('username' => $username));
    $sql = $statement->fetch();

    if ($sql !== false && password_verify($password, $sql['password'])) {
        $_SESSION['user_id'] = $sql['id'];

        if(isset($_POST['remember'])) {
            $identifier = random_string();
            $securitytoken = random_string();

            $insert = $pdo->prepare("INSERT INTO securitytokens (user_id, identifier, securitytoken) VALUES (:user_id, :identifier, :securitytoken)");
            $insert->execute(array('user_id' => $sql['id'], 'identifier' => $identifier, 'securitytoken' => sha1($securitytoken)));
            setcookie("identifier", $identifier, time() + (3600*24*365));
            setcookie("securitytoken", $securitytoken, time() + (3600*24*365));
        } else {
            $identifier = random_string();
            $securitytoken = random_string();

            $insert = $pdo->prepare("INSERT INTO securitytokens (user_id, identifier, securitytoken) VALUES (:user_id, :identifier, :securitytoken)");
            $insert->execute(array('user_id' => $sql['id'], 'identifier' => $identifier, 'securitytoken' => sha1($securitytoken)));
            setcookie("identifier", $identifier, time() + (3600*24*365));
            setcookie("securitytoken", $securitytoken, time() + (3600*24*365));
        }
        header('Location: dashboard.php');
    } else {
        $msg = "Benutzerkennung Ungültig";
    }
}
?>

<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Los Santos Police Departement - PC System</title>
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta/css/bootstrap.min.css" integrity="sha384-/Y6pD6FV/Vv2HJnA6t+vslU6fwYXjCFtcEpHbNJ0lyAFsXTsjBbfaDjzALeQsN6M" crossorigin="anonymous">
</head>
<body>

<div class="container" style="margin-top: 100px;">
    <div class="row justify-content-center">
        <div class="col-md-6 col-md-offset-3" align="center">
            <img src="images/logo.png"><br><br>

            <?php if ($msg != "") echo $msg . "<br><br>"; ?>

            <form method="post" action="login.php">
                <input class="form-control" name="username" type="text" placeholder="Benutzerkennung"><br>
                <input class="form-control" minlength="5" name="password" type="password" placeholder="Passwort"><br>

                <input type="checkbox" name="remember" id="remember" <?php if(isset($_COOKIE["identifier"]) && isset($_COOKIE["securitytoken"])) { ?> checked <?php } ?> />
                <label for="remember-me">Remember me</label>

                <input class="btn btn-primary" name="submit" type="submit" value="Anmelden"><br>
            </form>

        </div>
    </div>
</div>

</body>
</html>