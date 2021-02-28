FROM node:latest
WORKDIR /backend

RUN npm install -g nodemon

COPY .env /
COPY . /backend/
RUN npm install
RUN chown -R node:node public/
EXPOSE 8080
CMD ["nodemon"]

