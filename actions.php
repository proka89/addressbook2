<?php

// DB parameters

define('DB_HOST','localhost');
define('DB_USER','root');
define('DB_PASS','');
define('DB_NAME','addressbook2');

$db = new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

if ($db->connect_errno) {
    echo "Failed to connect to MySQL: (" . $db->connect_errno . ") " . $db->connect_error;
}

if (isset($_POST['action'])) {
    switch ($_POST['action']) {
        case 'delete':
            delete();
            break;
        case 'edit':
            addContact();
            break;
    }
}

function delete() {
  $id = $_POST['id'];

  $query = "DELETE FROM contacts WHERE id = $id";

  $result = mysqli_query($db,$query) or die ( mysqli_error());

  exit;
}
