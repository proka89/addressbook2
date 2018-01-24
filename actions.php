<?php
// DB parameters

define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PASS','');
define('DB_NAME','addressbook2');




if(!isset($_REQUEST) || !isset($_REQUEST['action'])){
  die('NEMAM AKCIJU');
}

switch ($_REQUEST['action']) {
    case 'delete':
        delete();
        break;
    case 'edit':
        edit();
        break;
    case 'users':
      getUsers();
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
    die('Nije setovan ID');
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
        $user->phone = $row['phone'];
        $user->email = $row['email'];
        $results[] = $user;
      }

    }
      echo  json_encode($results);
}
