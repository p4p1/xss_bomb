function validURL(str) {var a  = document.createElement('a');a.href = str;return (a.host && a.host != window.location.host);}

async function get_api_list() {
  const response = await fetch("https://raw.githubusercontent.com/p4p1/xss_bomb/main/public_instances.json");
  const jsonData = await response.json();
  for (var i = 0; i < jsonData.length; i++) {
    var li = document.createElement('li');
    li.className = 'list-group-item';
    var a = document.createElement('a');
    a.href = '#';
    a.id = jsonData[i].link;
    a.appendChild(document.createTextNode(jsonData[i].link));
    a.addEventListener("click", function(e){localStorage.setItem("url", e.target.id); location.reload();}, jsonData[i]);
    li.appendChild(a)
    document.getElementById('server_list').appendChild(li);
  }
}
function manual_instance() {
  const data = document.getElementById('url_input').value;

  if (validURL(data)) {
    fetch(data).then((responce) => responce.text()).then((text_data) => {
      if (text_data.includes("Welcome to XSS_BOMB ")) {
        var new_data = data;
        if (data[data.length - 1] == '/') {
          new_data = data.substring(0, data.length - 1);
        }
        localStorage.setItem("url", new_data);
        location.reload();
      } else {
        alert("URL not working");
      }
    }).catch(() => {
      alert("URL not working");
    });
  } else {
    alert("Invalid URL");
  }
}

function set_server_banner() {
  if (localStorage.getItem("url") != null) {
    document.getElementById('server_name').innerText = localStorage.getItem("url");
  }
}

set_server_banner();
get_api_list();
