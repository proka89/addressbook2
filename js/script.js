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
       printUsers(usersData);
       setActionDeleteUser();
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
  renderUser += "<td>" + '<div class="btn-group" >' + '<a href="#" class="btn btn-primary" role="button">'
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
