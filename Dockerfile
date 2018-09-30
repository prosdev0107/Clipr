# Use the docker image node:9.4
FROM node:alpine

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json .
# For npm@5 or later, copy package-lock.json as well
# COPY package.json package-lock.json .

RUN npm install -g npm-install-peers

# Bundle app source
COPY . .

EXPOSE 3000

CMD [ "npm", "start" ]


# Run npm install
#RUN npm install -g npm-install-peers

# Build
#RUN REACT_APP_STAGE=staging CI=true npm run build --bind localhost

# Start the app.
#RUN rm -rf public
#RUN mv /var/app/current/build /var/app/current/public

# Expose the port of the app thats running in the container.
#EXPOSE 3000

# docker build -t cliprfront .
# docker run -d -it -p 3000:3000 cliprfront /bin/bash