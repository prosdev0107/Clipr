# Use the docker image node:9.4
FROM node:9.4

# Into which the source will be copied inside the destination container.
WORKDIR /app

# It will copy the existing files to the `/app` directory.
COPY . /app

# Run npm install
RUN npm install -g npm-install-peers

# Build
CMD REACT_APP_STAGE=staging CI=true npm run build --bind localhost

# Start the app.
CMD rm -rf public
CMD mv build public

# Expose the port of the app thats running in the container.
EXPOSE 3000

# docker build -t cliprfront .
# docker run -d -it -p 3000:3000 cliprfront /bin/bash