<?php
// DB parameters

define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PASS','');
define('DB_NAME','addressbook2');


if(!isset($_REQUEST) || !isset($_REQUEST['action'])){
  die('Action is not set');
}

switch ($_REQUEST['action']) {
    case 'delete':
        delete();
        break;
    case 'edit':
        editUser();
        break;
    case 'users':
      getUsers();
        break;
    case 'adduser':
      addUser();
}

function getDB(){
  $db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

  if ($db->connect_errno) {
      echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
  }
  return $db;
}

function delete() {

  if(empty($_POST['id'])){
    die('ID is not set');
  }

  $id = $_POST['id'];

  $query = "DELETE FROM contacts WHERE id = $id";

  $result = mysqli_query(getDB(),$query) or die ( mysqli_error());

  echo "success";

  exit;
}

function getUsers(){
  $result = mysqli_query(getDB(),"SELECT id, first_name, last_name, email, phone FROM contacts") or die($db->error);

  $results = [];
    if ($result->num_rows > 0){
      while($row = $result->fetch_assoc()){
        $user = new stdClass();
        $user->id = $row['id'];
        $user->name = $row['first_name'] . " " . $row['last_name'];
        $user->firstname = $row['first_name'];
        $user->lastname = $row['last_name'];
        $user->phone = $row['phone'];
        $user->email = $row['email'];
        $results[] = $user;
      }

    }
      echo  json_encode($results);
}

function addUser() {
  $sb = getDB();
  $first_name = mysqli_real_escape_string($sb, $_POST['firstname']);
  $last_name = mysqli_real_escape_string($sb, $_POST['lastname']);
  $email = mysqli_real_escape_string($sb, $_POST['email']);
  $phone = mysqli_real_escape_string($sb, $_POST['phone']);
  $sql = "INSERT INTO contacts (first_name, last_name, email, phone)
  VALUES ('$first_name', '$last_name', '$email', '$phone')";
  if(mysqli_query($sb, $sql)){
      echo "Contact added successfully";
  } else{
      echo "ERROR: Could not able to execute $sql. " . mysqli_error($sb);
  }
}

function editUser(){
  $sb = getDB();
  $id = $_REQUEST['id'];
  $query = "SELECT * FROM contacts WHERE id = $id";
  $result = mysqli_query($sb, $query) or die ( mysqli_error($sb));
  $to_encode = [];
  while($row = mysqli_fetch_assoc($result)) {
    $to_encode[] = $row;
  }
  echo json_encode($to_encode);

  $status = "";
  if(isset($_POST['new']) && $_POST['new']==1){
    $id = $_REQUEST['id'];
    $first_name = $_REQUEST['firstname'];
    $last_name = $_REQUEST['lastname'];
    $email = $_REQUEST['email'];
    $phone = $_REQUEST['phone'];
    $update = "UPDATE contacts SET first_name = '".$first_name."', last_name = '".$last_name."', email = '".$email."', phone = '".$phone."' WHERE id = '".$id."'";
    mysqli_query($db, $update) or die(mysqli_error());
  }
  //   $status = "Contact Updated Successfully.";
  //   echo '<p style="color:#FF0000;">'.$status.'</p>';
  // } else {
  //   echo 'Contacts are not updated';
  //   }
}
