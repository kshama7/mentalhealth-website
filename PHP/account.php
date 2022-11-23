<?php require_once("config.php");
if(!isset($_SESSION["login_sess"])) 
{
    header("location:login.php"); 
}
  $email=$_SESSION["login_email"];
  $findresult = mysqli_query($dbc, "SELECT * FROM users WHERE email= '$email'");
if($res = mysqli_fetch_array($findresult))
{
$username = $res['username']; 
$fname = $res['fname'];   
$lname = $res['lname'];  
$email = $res['email'];  

}
 ?> 
 <!DOCTYPE html>
<html>
<head>
    <title> My Account - Techno Smarter</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/css/bootstrap.min.css"> 
    <link rel="stylesheet" href="style1.css">
</head>
<body>
<div class="container">
    <div class="row">
        <div class="col-sm-3">
            
        </div>
        <div class="col-sm-6">
  <div class="login_form">
 <img src="logo.jpg" alt="HAPPY PILL" class="logo img-fluid"> <br> 
     
          <div class="row">
            <div class="col"></div>
           <div class="col-6"> 
             <?php if(isset($_GET['profile_updated'])) 
      { ?>
    <div class="successmsg">Profile saved ..</div>
      <?php } ?>
        <?php if(isset($_GET['password_updated'])) 
      { ?>
    <div class="successmsg">Password has been changed...</div>
      <?php } ?>
            <center>
            

  <p> Welcome! <span style="color:#33CC00"><?php echo $username; ?></span> </p>
  </center>
           </div>
            <div class="col"><p><a href="logout.php"><span style="color:red;">Logout</span> </a></p>
         </div>
          </div>

          <table class="table">
          <tr>
              <th>First Name </th>
              <td><?php echo $fname; ?></td>
          </tr>
          <tr>
              <th>Last Name </th>
              <td><?php echo $lname; ?></td>
          </tr>
          <tr>
              <th>Username </th>
              <td><?php echo $username; ?></td>
          </tr>
           <tr>
              <th>Email </th>
              <td><?php echo $email; ?></td>
          </tr>
          </table>

                <a href="edit.php"><button type="button" class="btn btn-primary">Edit Profile</button></a>
            
         <a href="happy_pill.html"><button type="button" class="btn btn-primary">Home</button></a>
            
        </div>
    </div>
</div> 
</body>
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/bootstrap@4.5.3/dist/js/bootstrap.bundle.min.js"></script>
</html>
