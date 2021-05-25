FROM node:14.16

RUN mkdir /usr/src/app
WORKDIR /usr/src/app/client

COPY . /usr/src/app
RUN npm install

EXPOSE 3000

CMD ["npm","start"]

