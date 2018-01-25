$(document).ready(function(){

loadUsers();
setActionAddUser();
});


function setActionDeleteUser(){
  $('.delete').click(function(){
    var ele = $(this).closest('tr');
    $.ajax({
       url: 'actions.php',
       type: 'POST',
       data: {id:ele.attr('id'), action:'delete' },
       success: function(response){
         if(response === 'success')
          ele.fadeOut().remove();
       },
       error: function(data){
         console.log(data);
       }
    });
  });
}

function loadUsers(){
  $.ajax({
     url: 'actions.php',
     type: 'POST',
     data: { action:'users' },
     success: function(data){
       var usersData = JSON.parse(data);
       console.log(data);
       printUsers(usersData);
       setActionDeleteUser();
       setActionEditUser();
     }
  });
}

function printUsers(data){
  document.getElementById("users").innerHTML = '';
  for (var i = 0; i < data.length; i++)
    printUser(data[i]);
}

function printUser(user){
  var renderUser = "";
  renderUser += "<tr id=\""+user.id+"\" >" + "<td>" + user.name + "</td>" + "<td>" + user.phone + "</td>" + "<td>" + user.email + "</td>";
  renderUser += "<td>" + '<div class="btn-group" >' + '<a href="#" class="btn btn-primary edit" role="button" data-toggle="modal" data-target="#editcontact-modal">'
    + 'Edit' + '</a>' + '<a href="#" class="btn btn-danger delete" role="button">' + 'Delete' + '</a>' + '</div>' + '</td>' + '</tr>';
    document.getElementById("users").innerHTML += renderUser;
}

function setActionAddUser(){
  var form = document.getElementById('userForm');
  form.onsubmit = function(){
    event.preventDefault();
    addNewUser(form);
    $('#addcontact-modal').modal('toggle');
    return false;
  }
}

function addNewUser(form){
  var data = {};
  data.firstname = form.firstname.value;
  data.lastname = form.lastname.value;
  data.email = form.email.value;
  data.phone = form.phone.value;
  data.action = 'adduser';
    $.ajax({
      url:"actions.php",
      method:"POST",
      data:data,
      success:function(data){
          loadUsers();
        }
    })
};

function setActionEditUser(){
  $('.edit').click(function(){
    var ele = $(this).closest('tr');
    $.ajax({
       url: 'actions.php',
       type: 'POST',
       data: {id:ele.attr('id'), action:'edit' },
       success: function(data){
         var editUserData = JSON.parse(data);
         console.log(editUserData);
         editUserForm(editUserData);
         console.log(data);
       }
     });
  });
}

function editUserForm(user) {
  document.getElementById("edit-user").innerHTML = '';
  var renderEditUserForm = "";
  renderEditUserForm += '<form name="form" action="" method="post">' +
  '<input type="hidden" name="new" value="1" />' + '<input name="id" type="hidden" value="" />' +
  '<div class="form-group">' + '<label>' + 'First Name:' + '</label>' +
  '<input type="text" name="firstname" placeholder="Enter First Name" class="form-control" required value="" />' + '</div>'
  + '<div class="form-group">' + '<label>' + 'Last Name:' + '</label>' +
  '<input type="text" name="lastname" placeholder="Enter Last Name" class="form-control" required value="" />' + '</div>' +
  '<div class="form-group">' + '<label>' + 'Email:' + '</label>' +
  '<input type="text" name="email" placeholder="Enter Email" class="form-control" required value="" />' + '</div>' +
  '<div class="form-group">' + '<label>' + 'Phone:' + '</label>' +
  '<input type="text" name="phone" placeholder="Enter Phone Number" class="form-control" required value="" />' + '</div>' +
  '<button type="submit" class="btn btn-default" name="submit" value="Update">Update</button>'
  + '</form>';
  renderEditUserForm += '</div>' + '</div>' + '</div>';
  document.getElementById("edit-user").innerHTML += renderEditUserForm;

}
