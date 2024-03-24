XSS_BOMB
========
*Test website security with ease.*

![xss_bomb](https://leosmith.wtf/projects/xss_bomb/favicon.png)

xss_bomb is a backend made to notify you when your xss payload is executed
on a remote target and you do not have the luxury of directly knowing when the
payload is ran on a target device. You can download the app for free in the
release page. You can also contribute, if you wish to learn more about this
app and it's api navigate to the wiki. DO NOT USE THIS SERVICE FOR ILLEGAL
PURPOSES.

## Installation (Server | API)
For the server you can create your own instance and host it online using docker.
It can be local or private / public if you decide to share the link or not you can edit
the public-instance.json file and send a pull request if you wish to be featured as a
server on the list during startup of the app :)

## Application Programming Interface Documentation
The API documentation is available inside of the wiki and on postman [here](https://documenter.getpostman.com/view/10616927/Tz5p6y9A)

## Project architecture

```
xss_bomb/
├── app/                    # The source code of the front-end app
│   └── [React Native Source Code]
├── assets/                 # Image files for the logo and such
│   └── [Images]
├── backend/                # The source code of the back-end
│   └── [Node Js Source Code]
├── data/                   # Folder containing the main database
│   └── [MongoDB Raw Files]
├── redis/                  # Folder containing the database for the refresh tokens
│   └── [Redis Raw Files]
├── logs/                   # Folder containing the log file with every requests
│   └── xss_bomb.log
├── docker-compose.yml      # The Docker file used to launch the database and back-end
├── LICENSE
├── public_instances.json   # The file with approved servers that can be used by the front-end
└── README.md
```

## Privacy and other things
If you dont want someone seeing your requests and data do not use a public instance I host
my personnal instance on xss.leosmith.wtf it does not allow you to create accounts since I don't
wan't to be seeing your bits on my db instance but you can publish your own instance publicly if you
want and I'll add them to the public list if you message me.

## Screenshots

![image](https://github.com/p4p1/xss_bomb/assets/19672114/78e9301d-01ef-4406-ae11-fd1829b2cc27)

