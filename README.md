XSS_BOMB
========

A simple way to get notified when a payload hits your server.

### Description
XSS_bomb is a tool package with a mobile app a notification control server and a javascript payload.
When your XSS payload connects to the server it will send a notification to your mobile app and you will be able
to view wich payload hit from wich server.

Youtube demo: [https://youtu.be/XSesBLblqA4](https://youtu.be/XSesBLblqA4)

### Routes
| Route         | Description                                           |
| :------------ | ----------------------------------------------------: |
| /token        | Register a token to the application                   |
| /message      | send a custom notification to the registered devices. |
| /stager       | Upload the stager on the page linked.                 |
| /pic          | Returns a 1px size picture to include on a page.      |
