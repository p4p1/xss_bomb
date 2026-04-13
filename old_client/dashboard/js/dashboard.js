var page = 0;

function class_per_method(method) {
    if (method == 'GET')
        return "method-get";
    if (method == 'POST')
        return "method-post";
    if (method == 'PUT')
        return "method-put";
    if (method == 'DELETE')
        return "method-delete";
    if (method == 'PATCH')
        return "method-patch";
}

function display_notification(data)
{
  document.getElementById('request_date').innerHTML = '';
  document.getElementById('request_ip').innerHTML = '';
  document.getElementById('request_ua').innerHTML = '';
  document.getElementById('request_header').innerHTML = '';
  document.getElementById('request_body').innerHTML = '';
  var settings = {
    "url": `${api_url}/user/get_notification/${data._id}`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${api_token}`
    },
  };

  $.ajax(settings).done(function (response) {
    console.log(response);
    var span = document.createElement('span');
    span.className = class_per_method(data.method);
    span.appendChild(document.createTextNode(data.method));
    var keys = Object.keys(response[0].header[0]);

    for (var i = 0; i < keys.length; i++) {
      var tr = document.createElement('tr');
      var td_key = document.createElement('td');
      var td_val = document.createElement('td');
      td_key.appendChild(document.createTextNode(keys[i]));
      td_val.appendChild(document.createTextNode(response[0].header[0][keys[i]]));
      tr.appendChild(td_key);
      tr.appendChild(td_val);
      document.getElementById('request_header').appendChild(tr);
    }

    document.getElementById('request_date').appendChild(document.createTextNode(data.date));
    document.getElementById('request_ip').appendChild(document.createTextNode(data.ipAddress));
    document.getElementById('request_ua').appendChild(document.createTextNode(data.userAgent));
    document.getElementById('request_body').appendChild(document.createTextNode(response[0].body));
  });
}

function get_page()
{
  var settings = {
    "url": `${api_url}/user/notifications/${page}`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${api_token}`
    },
  };

  $.ajax(settings).done(function (response) {
    for (var i = 0; i < response.length; i++) {
      var li = document.createElement('li');
      var span = document.createElement('span');
      span.className = class_per_method(response[i].method);
      span.appendChild(document.createTextNode(response[i].method));
      li.className = 'list-group-item';
      li.appendChild(span)
      li.setAttribute('id', JSON.stringify(response[i]));
      li.addEventListener("click", function(e){display_notification(JSON.parse(e.target.id))});
      li.appendChild(document.createTextNode(" - " + response[i].link));
      document.getElementById('user_requests').appendChild(li);
    }
    if (response.length > 0) {
      page = page + 1;
    }
  });
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
        document.getElementById('main_endpoint_link').innerHTML = api_url + '/api/' + response.token;
        document.getElementById('main_endpoint_link').addEventListener("click", function(e){navigator.clipboard.writeText(api_url + '/api/' + response.token);});
        document.getElementById('pic_endpoint_link').innerHTML = api_url + '/api/' + response.token + '/pic';
        document.getElementById('pic_endpoint_link').addEventListener("click", function(e){navigator.clipboard.writeText(api_url + '/api/' + response.token + "/pic");});
        document.getElementById('code_endpoint_link').innerHTML = api_url + '/api/' + response.token + '/code';
        document.getElementById('code_endpoint_link').addEventListener("click", function(e){navigator.clipboard.writeText(api_url + '/api/' + response.token + "/code");});
        document.getElementById('ws_endpoint_link').innerHTML = api_url.replace('https', 'wss').replace('http', "ws") + '/' + response.token;
        document.getElementById('ws_endpoint_link').addEventListener("click", function(e){navigator.clipboard.writeText(api_url.replace('https', 'wss').replace('http', 'ws') + '/' + response.token);});
        document.getElementById('user_requests').innerHTML = '';
        document.getElementById('load_more_btn').addEventListener("click", function(e){get_page()});
        get_page();
  });
}

var ws_page = 0;

function get_page_ws()
{
  var settings = {
    "url": `${api_url}/websocket/${ws_page}`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${api_token}`
    },
  };

  $.ajax(settings).done(function (response) {
    for (var i = 0; i< response.length; i++) {
      var content = document.createTextNode(response[i].content);
      document.getElementById("websocket_data_container").appendChild(content);
    }
    if (response.length > 0) {
      ws_page = ws_page + 1;
    }
  });
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
    document.getElementById('websocket_data_container').innerHTML = '';
    //document.getElementById('load_more_ws_btn').classList.remove("disabled");
    document.getElementById('load_more_ws_btn').addEventListener("click", function(e){get_page_ws()});
    get_page_ws();
  });
}

