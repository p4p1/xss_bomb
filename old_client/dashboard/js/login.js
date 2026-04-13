function logout()
{
  localStorage.removeItem("api_token");
  localStorage.removeItem("refreshToken");
  location.reload();
}
function login_user()
{
  var api_url = localStorage.getItem("url");
  const username = document.getElementById('login_username').value;
  const password = document.getElementById('login_password').value;
  const otp = document.getElementById('login_otp').value;

  var settings = {
    "url": `${api_url}/auth/login`,
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
    },
    "statusCode": {
      "400":function(response) { alert(response.responseJSON.msg); },
      "401":function(response) { alert(response.responseJSON.msg); },
      "500":function(response) { alert(response.responseJSON.msg); },
    },
    "data": JSON.stringify({
      "username": username,
      "password": password,
      "otp_code": otp,
      "notificationId": 'abcdefgh'
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    if (response.msg == "Logged in!") {
      localStorage.setItem("refreshToken", response.token);
      location.reload();
    } else {
      alert(response.msg);
    }
  });
}

var api_url = localStorage.getItem("url");

var api_token = localStorage.getItem("api_token");
if (api_token == null) {
  var refresh = localStorage.getItem("refreshToken");
  if (refresh !== null) {
    var settings = {
      "url": `${api_url}/auth/refresh`,
      "method": "GET",
      "timeout": 0,
      "headers": {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${refresh}`
      },
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      if (response.msg == "Logged in!") {
        localStorage.setItem("api_token", response.token);
        api_token = response.token;
        document.getElementById('login_area').innerHTML =`
              <li class="nav-item">
                <a class="nav-link" onClick="logout()">Logout</a>
              </li>
        `;
      } else {
        document.getElementById('login_area').innerHTML =`
              <li class="nav-item">
                <a class="nav-link" data-toggle="modal" data-target="#loginModal">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="modal" data-target="#registerModal">Register</a>
              </li>
        `;
      }
    });
  } else {
        console.log("setting login and register button");
        document.getElementById('login_area').innerHTML =`
              <li class="nav-item">
                <a class="nav-link" data-toggle="modal" data-target="#loginModal">Login</a>
              </li>
              <li class="nav-item">
                <a class="nav-link" data-toggle="modal" data-target="#registerModal">Register</a>
              </li>
      `;
  }
} else {
  var settings = {
    "url": `${api_url}/user/check`,
    "method": "GET",
    "statusCode": {
      "401":function() { localStorage.removeItem("api_token");location.reload(); },
    },
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${api_token}`
    },
  };

  $.ajax(settings).done(function (response) {
    if (response.msg == "Your session is valid!") {
      console.log("setting logout btn");
        document.getElementById('login_area').innerHTML =`
              <li class="nav-item">
                <a class="nav-link" onClick="logout()">Logout</a>
              </li>
      `;
    } else {
      localStorage.removeItem("api_token");
      location.reload();
    }
  });
}
