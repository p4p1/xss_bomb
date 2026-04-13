function register_user()
{
  var api_url = localStorage.getItem("url");
  const username = document.getElementById('username_register').value;
  const password = document.getElementById('password_register').value;
  const repeat_password = document.getElementById('repeat_password_register').value;

  if (password !== repeat_password) {
    document.getElementById('register_alert').innerHTML = `<div class="alert alert-danger" role="alert">Passwords do not match</div>`;
    setTimeout(function () {document.getElementById('register_alert').innerHTML = ''}, 5000);
    return;
  }
  var settings = {
    "url": `${api_url}/auth/register`,
    "method": "POST",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
    },
    "statusCode": {
      "400":function(response) { alert(response.responseJSON.msg); },
    },
    "data": JSON.stringify({
      "username": username,
      "password": password
    }),
  };

  $.ajax(settings).done(function (response) {
    if (response.msg == "Account created!") {
      document.getElementById("register_button_submit").remove();
      document.getElementById('register_modal_body').innerHTML = "";
      var qrcode = document.createElement('qr-code');
      var header = document.createElement('h3');
      qrcode.contents = response.code;
      qrcode.setAttribute('module-color', "#fff");
      qrcode.setAttribute('position-ring-color', "#fff");
      qrcode.setAttribute('position-center-color', "#fff");
      qrcode.addEventListener('codeRendered', () => {
        qrcode.animateQRCode('RadialRipple');
      });
      header.innerHTML = `Please scan this qrCode to use the OTP code during login! Or click <a href='${response.code}'>here</a>!`;
      document.getElementById('register_modal_body').appendChild(qrcode);
      document.getElementById('register_modal_body').appendChild(header);
    } else {
      alert(response.msg);
    }
  });
}
