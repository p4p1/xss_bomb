var token_endpoint = "";

function share_code()
{
  var title = document.getElementById('title_of_payload').value;
  var desc = document.getElementById('desc_of_payload').value;
  if (title.length > 0 && desc.length > 0) {
    var settings = {
      "url": `${api_url}/code/share`,
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
        "name": title,
        "description": desc
      }),
    };

    $.ajax(settings).done(function (response) {
      alert(response.msg);
    });
  } else {
    alert("Please set title and description before sharing");
  }
}

function get_code()
{
  var settings = {
    "url": `${api_url}/user/get_code`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${api_token}`
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    document.getElementById('code_content').innerHTML = "";
    document.getElementById('code_content').append(document.createTextNode(response.code));
  });
}
function handle_mime(mime) {
  var settings = {
    "url": `${api_url}/user/set_mime`,
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
      "mime": mime
    }),
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
  });
}

function handle_file(file) {
  const reader = new FileReader();
  reader.onload = function (event) {
    console.log('here');
    console.log(event.target.result);
    var settings = {
      "url": `${api_url}/user/set_code`,
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
        "code": event.target.result
      }),
    };

    $.ajax(settings).done(function (response) {
      console.log(response);
      location.reload();
    });
  };
  reader.readAsText(file);
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
    token_endpoint = response.token;
    get_code();
    document.getElementById('code_file_upload').addEventListener('change', function (e) {
      if (e.target.files[0]) {
        handle_file(e.target.files[0]);
      }
    }, false);
    document.getElementById('mime_type_set').addEventListener('change', function (e) {
      handle_mime(document.getElementById('mime_type_set').value);
    }, false);
  });
}
