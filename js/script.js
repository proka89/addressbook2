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
         editUsersForm(editUserData);
         console.log(data);
         $('.update').click(function(){
           var editForm = document.getElementById('edit-userform');
             editForm.onsubmit = function(){
               event.preventDefault();
               editexistingUser(editForm);
               $('#editcontact-modal').modal('toggle');
               return false;
             }
            function editexistingUser(editForm){
             var editData = {};
             editData.firstname = editForm.firstname.value;
             editData.lastname = editForm.lastname.value;
             editData.email = editForm.email.value;
             editData.phone = editForm.phone.value;
             editData.action = 'update';
             editData.id = ele.attr('id');
             $.ajax({
                url: 'actions.php',
                type: 'POST',
                data: editData,
                success: function(data){
                  loadUsers();
                }
              })
            }
         })
       }
     });
  });
}

function editUsersForm(data){
  document.getElementById("edit-user").innerHTML = '';
  for(var i=0; i < data.length; i++) {
    editUserForm(data[i]);
  }
}


function editUserForm(user) {
  var renderEditUserForm = "";
    renderEditUserForm += '<form name="form" id="edit-userform" action="actions.php" method="post">' + '<input name="id" type="hidden" value="' + user.id + '" />' +
    '<div class="form-group">' + '<label>' + 'First Name:' + '</label>' +
    '<input type="text" name="firstname" placeholder="Enter First Name" class="form-control" required value="' + user.first_name + '" />' + '</div>'
    + '<div class="form-group">' + '<label>' + 'Last Name:' + '</label>' +
    '<input type="text" name="lastname" placeholder="Enter Last Name" class="form-control" required value="' + user.last_name + '" />' + '</div>' +
    '<div class="form-group">' + '<label>' + 'Email:' + '</label>' +
    '<input type="text" name="email" placeholder="Enter Email" class="form-control" required value="' + user.email + '" />' + '</div>' +
    '<div class="form-group">' + '<label>' + 'Phone:' + '</label>' +
    '<input type="text" name="phone" placeholder="Enter Phone Number" class="form-control" required value="' + user.phone + '" />' + '</div>' +
    '<button type="submit" class="btn btn-default update" name="submit" value="Update">Update</button>'
    + '</form>';
    renderEditUserForm += '</div>' + '</div>' + '</div>';
    document.getElementById("edit-user").innerHTML += renderEditUserForm;
}
