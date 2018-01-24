$(document).ready(function(){

loadUsers();
setActionDeleteUser();



});


function setActionDeleteUser(){
  $('.delete').click(function(){
    var id = $(this).attr('id');
    var ele = $(this).closest('tr');
    $.ajax({
       url: 'actions.php',
       type: 'POST',
       data: { action:'delete' },
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
       printUser(usersData);
     }
  });
}

function printUser(data){
  console.log(data);
  var renderUsers = "";
  for (var i = 0; i < data.length; i++) {
    renderUsers += "<tr>" + "<td>" + data[i].name + "</td>" + "<td>" + data[i].phone + "</td>" + "<td>" + data[i].email + "</td>";
    renderUsers += "<td>" + '<div class="btn-group" >' + '<a href="#" class="btn btn-primary" role="button">'
    + 'Edit' + '</a>' + '<a href="#" class="btn btn-danger delete" role="button" id="<?php echo $id; ?>">' + 'Delete' + '</a>' + '</div>' + '</td>' + '</tr>';
  }
  $('#users').html(renderUsers);
}
