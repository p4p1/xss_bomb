FROM node:latest
WORKDIR /backend

RUN npm install -g nodemon

COPY . /backend/
RUN npm install
EXPOSE 8080
CMD ["nodemon"]

