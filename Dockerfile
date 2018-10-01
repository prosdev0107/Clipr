# Use the docker image node:9.4
FROM node:9.6.1 as builder

# Create app directory
WORKDIR /app

# Get dependencies
COPY package*.json /app/

# install and cache app dependencies
RUN npm install -g --silent
RUN npm install -g npm-install-peers --silent

# Copy source code
COPY ./ /app/

# Build app
RUN REACT_APP_STAGE=staging CI=true npm run build && ls

FROM nginx:1.15

# Move app to nginx working directory
COPY --from=builder /app/build/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]


# Copy the default nginx.conf provided by tiangolo/node-frontend
# COPY --from=build-stage /nginx.conf /etc/nginx/conf.d/default.conf



# CMD [ "npm", "start" ]


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