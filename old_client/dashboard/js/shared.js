var page = 0;

function set_code(dl_id)
{
  var settings = {
    "url": `${api_url}/code/dl/${dl_id}`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${api_token}`
    },
  };

  $.ajax(settings).done(function (response) {
    alert("you have updated your code to the selected one!");
  });
}

function get_page()
{
  var settings = {
    "url": `${api_url}/code/${page}`,
    "method": "GET",
    "timeout": 0,
    "headers": {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${api_token}`
    },
  };

  $.ajax(settings).done(function (response) {
    for (var i = 0; i < response.length; i++) {
      var wraper_div = document.createElement('div');
      var card_div = document.createElement('div');
      var header_div = document.createElement('div');
      var header_span = document.createElement('span');
      var body_div = document.createElement('div');
      var body_code = document.createElement('pre');
      var footer_div = document.createElement('div');

      wraper_div.className = "col-xl-4";
      card_div.className = "card mb-4 request-card";
      header_div.className = "card-header";
      body_div.className = "card-body";
      body_div.setAttribute('style', "overflow-y:scroll;scroll-behavior: auto ;scroll-behavior: smooth ;");
      footer_div.className = "card-footer";
      header_div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="1em" viewBox="0 0 640 512"><!--! Font Awesome Free 6.4.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license (Commercial License) Copyright 2023 Fonticons, Inc. --><style>svg{fill:#ffffff}</style><path d="M392.8 1.2c-17-4.9-34.7 5-39.6 22l-128 448c-4.9 17 5 34.7 22 39.6s34.7-5 39.6-22l128-448c4.9-17-5-34.7-22-39.6zm80.6 120.1c-12.5 12.5-12.5 32.8 0 45.3L562.7 256l-89.4 89.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l112-112c12.5-12.5 12.5-32.8 0-45.3l-112-112c-12.5-12.5-32.8-12.5-45.3 0zm-306.7 0c-12.5-12.5-32.8-12.5-45.3 0l-112 112c-12.5 12.5-12.5 32.8 0 45.3l112 112c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256l89.4-89.4c12.5-12.5 12.5-32.8 0-45.3z"/></svg>';
      header_div.setAttribute('id', response[i]._id);
      header_span.setAttribute('id', response[i]._id);
      header_div.addEventListener("click", function(e) {set_code(e.target.id)});


      header_span.appendChild(document.createTextNode(response[i].name));
      header_div.appendChild(header_span);
      body_code.appendChild(document.createTextNode(response[i].code));
      body_div.appendChild(body_code);
      footer_div.appendChild(document.createTextNode(response[i].description));
      card_div.appendChild(header_div);
      card_div.appendChild(body_div);
      card_div.appendChild(footer_div);
      wraper_div.appendChild(card_div);
      document.getElementById('payload_wraper_location').appendChild(wraper_div);
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
    document.getElementById('payload_wraper_location').innerHTML = '';
    get_page();
  });
}
