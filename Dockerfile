FROM node:22

# Install java runtime to enable running firebase emulators.
RUN apt-get update && apt-get install -y openjdk-17-jre-headless

WORKDIR /usr/src/app

# Copy project files
COPY . .

# Copy custom firebase config for running inside a container
COPY firebase.docker.json ./firebase.json

# Install project dependencies
RUN npm install

RUN npm --prefix functions install

RUN npm --prefix admin install

# Install Firebase CLI globally
RUN npm install -g firebase-tools

# Expose emulator reserved ports (UI, Functions, Firestore)
EXPOSE 5000 5001 5002 5003 5004

CMD ["npm", "run", "serve"]

