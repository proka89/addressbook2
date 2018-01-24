<!DOCTYPE html>
<html lang="en">
<head>
  <title>Addressbook</title>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="css/bootstrap.css">
  <link rel="stylesheet" href="css/custom.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
  <script src="js/bootstrap.js"></script>
</head>
<body>
<div class="container">
  <div class="row">
    <div class="col-sm-6">
      <h1>Addressbook</h1>
    </div>
    <div class="col-sm-6">
      <a href="#" class="add-btn btn btn-primary btn-md " role="button" data-toggle="modal" data-target="#addcontact-modal">Add Contact</a>
      <div class="modal fade" id="addcontact-modal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">Add Contact</h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <form action="actions.php" method="post">
                <div class="form-group">
                  <label>First Name:</label>
                  <input type="text" class="form-control" placeholder="Enter First Name" name="firstname">
                </div>
                <div class="form-group">
                  <label>Last Name:</label>
                  <input type="text" class="form-control" placeholder="Enter Last Name" name="lastname">
                </div>
                <div class="form-group">
                  <label>Email:</label>
                  <input type="email" class="form-control" placeholder="Enter email Address" name="email">
                </div>
                <div class="form-group">
                  <label>Phone Number:</label>
                  <input type="text" class="form-control" placeholder="Enter Phone Number" name="phone">
                </div>
                <button type="submit" class="btn btn-default submit">Submit</button>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
    <div class="col-lg-12">
      <table>
        <thead>
          <tr>
            <th width="190">Name</th>
            <th width="150">Phone</th>
            <th width="220">Email</th>
            <th width="170">Actions</th>
          </tr>
        </thead>
        <?php
          require 'actions.php';
          $result = $db->query("SELECT id, first_name, last_name, email, phone FROM contacts") or die($db->error);

            if ($result->num_rows > 0){
              while($row = $result->fetch_assoc()){
                $id = $row['id'];
                $name = $row['first_name'] . " " . $row['last_name'];
                $phone = $row['phone'];
                $email = $row['email'];
        ?>
        <tbody>
          <tr>
            <td><?php echo $name ?></td>
            <td><?php echo $phone ?></td>
            <td><?php echo $email ?></td>
            <td><div class="btn-group"><a href="edit_contact.php?id=<?php echo $row["id"]; ?>" class="btn btn-primary" role="button" >Edit</a><a href="#" class="btn btn-danger delete" role="button" id='<?php echo $id; ?>' value="delete">Delete</a></div></td>
          </tr>
        </tbody>
        <?php
              }
            } else {
              echo "Addressbook is empty";
            }
          $db->close();
        ?>
      </table>
    </div>
  </div>
</div>
<script src="js/script.js"></script>
</body>
</html>
