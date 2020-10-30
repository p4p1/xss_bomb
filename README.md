XSS_BOMB
========

![xss_bomb](https://raw.githubusercontent.com/p4p1/xss_bomb/main/assets/logo.png)

A simple way to get notified when a payload hits your server.

### Description
XSS_bomb is a tool package with a mobile app a notification control server and a javascript payload.
When your XSS payload connects to the server it will send a notification to your mobile app and you will be able
to view wich payload hit from wich server.

Youtube demo: [https://youtu.be/XSesBLblqA4](https://youtu.be/XSesBLblqA4)

### Routes
| Route          | Parameters                                      | Description                                           |
| :------------- | :---------------------------------------------: |----------------------------------------------------: |
| /token         | { 'username': '', 'password': '', 'token': '' } | Register a token to the application                   |
| /message       |                                                 | send a custom notification to the registered devices. |
| /stager        |                                                 | Upload the stager on the page linked.                 |
| /pic           |                                                 | Returns a 1px size picture to include on a page.      |
| /notifications | { 'username': '', 'password': '' }              | Retreive all of the notifications from the server.    |
| /setstager     | { 'username': '', 'password': '', source: '' }  | Edit the stager hosted on the server.                 |

### Participate

If you find this project cool so not hesitate to contribute code and fork the project :)
