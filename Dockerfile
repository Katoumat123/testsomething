FROM node:14.16

RUN mkdir /usr/src/app
WORKDIR /usr/src/app/client

COPY . /usr/src/app
RUN npm install

EXPOSE 3000

<<<<<<< HEAD
CMD ["npm","start"]

=======
CMD ["npm","start"]
>>>>>>> d74ee5ec51e1995e5c1156019460919d05aafe31
