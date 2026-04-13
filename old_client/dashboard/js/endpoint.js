var type_of_endpoint = "";
var function_endpoint = { redirect: null, inject: null, title: null };
var token_endpoint = "abcdefg";

function set_type() {
  document.getElementById('type_of_endpoint').innerHTML = type_of_endpoint;
}

function create_string_function() {
  var string = "";
  var question_mark = false;

  if (function_endpoint.redirect !== null && function_endpoint.redirect.length != 0) {
    if (question_mark == false) {
      string = string + '?url=' + function_endpoint.redirect;
      question_mark = true;
    } else {
      string = string + '&url=' + function_endpoint.redirect;
    }
  }
  if (function_endpoint.inject !== null && function_endpoint.inject.length != 0) {
    if (question_mark == false) {
      string = string + '?inject=' + function_endpoint.inject;
      question_mark = true;
    } else {
      string = string + '&inject=' + function_endpoint.inject;
    }
  }
  if (function_endpoint.title !== null && function_endpoint.title.length != 0) {
    if (question_mark == false) {
      string = string + '?title=' + function_endpoint.title;
      question_mark = true;
    } else {
      string = string + '&title=' + function_endpoint.title;
    }
  }
  return string;
}

function set_redirect_url() {
  var val = document.getElementById('endpoint_redirect_url').value
  function_endpoint.redirect = val;
  document.getElementById('endpoint_functionality').innerHTML ='';
  document.getElementById('endpoint_functionality').appendChild(document.createTextNode(create_string_function()));
}

function set_code_inject() {
  var val = document.getElementById('endpoint_inject_code').value
  function_endpoint.inject = val;
  document.getElementById('endpoint_functionality').innerHTML ='';
  document.getElementById('endpoint_functionality').appendChild(document.createTextNode(create_string_function()));
}

function set_title_inject() {
  var val = document.getElementById('endpoint_title_edit').value
  function_endpoint.title = val;
  document.getElementById('endpoint_functionality').innerHTML ='';
  document.getElementById('endpoint_functionality').appendChild(document.createTextNode(create_string_function()));
}

function selected_type(type) {
  document.getElementById('endpoint_title_edit').disabled = false;
  document.getElementById('endpoint_inject_code').disabled = false;
  document.getElementById('endpoint_redirect_url').disabled = false;
  normal = document.getElementById('normal_checkbox');
  picture = document.getElementById('picture_checkbox');
  code = document.getElementById('code_checkbox');
  iframe = document.getElementById('iframe_checkbox');
  if (type == 1) {
    normal.checked = true;
    picture.checked = false;
    code.checked = false;
    iframe.checked = false;
    type_of_endpoint = '';
    document.getElementById('endpoint_title_edit').disabled = true;
  } else if (type == 2) {
    document.getElementById('endpoint_title_edit').disabled = true;
    document.getElementById('endpoint_inject_code').disabled = true;
    document.getElementById('endpoint_redirect_url').disabled = true;
    normal.checked = false;
    picture.checked = true;
    code.checked = false;
    iframe.checked = false;
    type_of_endpoint = '/pic';
  } else if (type == 3) {
    document.getElementById('endpoint_title_edit').disabled = true;
    document.getElementById('endpoint_redirect_url').disabled = true;
    normal.checked = false;
    picture.checked = false;
    code.checked = true;
    iframe.checked = false;
    type_of_endpoint = '/code';
  } else if (type == 4) {
    normal.checked = false;
    picture.checked = false;
    code.checked = false;
    iframe.checked = true;
    type_of_endpoint = '/frame';
  }
  set_type();
}

document.getElementById('endpoint_title_edit').disabled = true;
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
    document.getElementById('endpoint_link').innerHTML = api_url;
    document.getElementById('endpoint_tkn').innerHTML = response.token;
    token_endpoint = response.token;
    console.log(response.token);
  });
} else {
  document.getElementById('endpoint_link').innerHTML = "http://example_endpoint";
  document.getElementById('endpoint_tkn').innerHTML = token_endpoint;
}
