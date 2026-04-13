function set_username() {
  var input_uname = document.getElementById('change_username').value;

  console.log(input_uname);
  if (input_uname.length > 0) {
    var settings = {
      "url": `${api_url}/user/change_username`,
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${api_token}`
      },
      "statusCode": {
        "400":function(response) { alert(response.responseJSON.msg); },
        "401":function(response) { alert(response.responseJSON.msg); },
        "500":function(response) { alert(response.responseJSON.msg); },
      },
      "data": JSON.stringify({
        "username": input_uname,
      }),
    };

    $.ajax(settings).done(function (response) {
      logout();
      alert(response.msg);
    });
  } else {
    alert("Please enter username!");
  }
}

function set_password() {
  var input_pass = document.getElementById('change_password').value;

  if (input_pass.length > 0) {
    var settings = {
      "url": `${api_url}/user/change_password`,
      "method": "POST",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${api_token}`
      },
      "statusCode": {
        "400":function(response) { alert(response.responseJSON.msg); },
        "401":function(response) { alert(response.responseJSON.msg); },
        "500":function(response) { alert(response.responseJSON.msg); },
      },
      "data": JSON.stringify({
        "password": input_pass,
      }),
    };

    $.ajax(settings).done(function (response) {
      logout();
      alert(response.msg);
    });
  } else {
    alert("Please enter password!");
  }
}

if (api_token != null && api_url != null) {
  var settings = {
    "url": `${api_url}/user/get_api`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${api_token}`
    },
  };

  $.ajax(settings).done(function (response) {
    document.getElementById('set_user_btn').disabled = false;
    document.getElementById('set_user_btn').addEventListener('click', function(e){set_username()});
    document.getElementById('set_pass_btn').disabled = false;
    document.getElementById('set_pass_btn').addEventListener('click', function(e){set_password()});
  });
}
