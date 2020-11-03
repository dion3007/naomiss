# use a node base image
FROM node:12.14.0-alpine

# set maintainer
LABEL maintainer "hendri@aruna.id"

RUN apk add curl

# set a health check
HEALTHCHECK --interval=5s \
            --timeout=5s \
            CMD curl -f http://127.0.0.1:3000 || exit 1

# tell docker what port to expose
EXPOSE 3000

WORKDIR /usr/app

COPY . /usr/app

#Install Package module
RUN yarn

#Compile project
RUN npm run build

# start app
CMD ["npm","run","dev:development"]

