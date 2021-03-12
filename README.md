XSS_BOMB
========
*Test website security with ease.*

![xss_bomb](https://raw.githubusercontent.com/p4p1/xss_bomb/main/assets/logo.png)

xss_bomb is a mobile app made to notify you when your xss payload is executed
on a remote target and you do not have the luxury of directly knowing when the
payload is ran on a target device. You can download the app for free in the
release page. You can also contribute, if you wish to learn more about this
app and it's api navigate to the wiki. DO NOT USE THIS SERVICE FOR ILLEGAL
PURPOSES.

## Installation (Phone)
[<img src="https://raw.githubusercontent.com/p4p1/xss_bomb/main/assets/get-it-on-google-play.png" align="left" height="80" width="250" >](https://play.google.com/store/apps/details?id=com.p4p1.xss_bomb)
You can help me out by buying this app on the android play store for $2
or you can download for free from the releases page :) I keep the releases updated as much
as the play store version. There is no benefit or advantage to paying for this app other
than helping me out.

## Installation (Server)
For the server you can create your own instance and host it online using docker.
It can be local or private / public if you decide to share the link or not you can edit
the public-instance.json file and send a pull request if you wish to be featured as a
server on the list during startup of the app :)

## Project architecture

```
xss_bomb/
├── app/                    # The source code of the front-end app
│   └── [React Native Source Code]
├── assets/                 # Image files for the logo and such
│   └── [Source Code]
├── backend/                # The source code of the back-end
│   └── [Node Js Source Code]
├── data/                   # Folder containing the database
│   └── [Database Raw Files]
├── logs/                   # Folder containing the log file with every requests
│   └── xss_bomb.log
├── docker-compose.yml      # The Docker file used to launch the database and back-end
├── LICENSE
├── public_instances.json   # The file with approved servers that can be used by the front-end
└── README.md
```

## Privacy and other things
If you dont want someone seeing your requests and data do not use a public instance I host
my personnal instance on leosmith.xyz and I decided to make it public for people to try out
the app. If you dont trust me. Don't use my instance spin up yours and connect to it.

## Screenshots

<img src="https://raw.githubusercontent.com/p4p1/xss_bomb/main/assets/log_file.png" >

<img src="https://raw.githubusercontent.com/p4p1/xss_bomb/main/assets/pick_server.jpg" align="left" height="450" width="200" >
<img src="https://raw.githubusercontent.com/p4p1/xss_bomb/main/assets/login.jpg" align="left" height="450" width="200" >
<img src="https://raw.githubusercontent.com/p4p1/xss_bomb/main/assets/inspect_requests.jpg" align="left" height="450" width="200" >
<img src="https://raw.githubusercontent.com/p4p1/xss_bomb/main/assets/navbar.jpg" align="left" height="450" width="200" >
<img src="https://raw.githubusercontent.com/p4p1/xss_bomb/main/assets/edit_code.jpg" align="left" height="450" width="200" >
<img src="https://raw.githubusercontent.com/p4p1/xss_bomb/main/assets/profile_page.jpg" align="left" height="450" width="200" >
<img src="https://raw.githubusercontent.com/p4p1/xss_bomb/main/assets/save_del_request.jpg" align="left" height="450" width="200" >
