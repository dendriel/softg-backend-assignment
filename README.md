# Softg Games Manager

This project provides a backoffice for managing games data. It has the following features:

- Web Admin for Create, Update, Delete and List available games
- A tool for importing data from a JSON file into Firestore


# Local Development

This project requires the following tools:

- Node package manager (NPM)
- [Firebase CLI](https://firebase.google.com/docs/cli)
- REST Client (VS Code Externsion) for executing the test request from `functions/http-requests`
- Docker CLI / Docker Server

> Before anything else, initialize the projects at the root, `functions` and `admin` by running `npm i` commands.


## Commands

The following commands are available from the project root:

- `serve` - builds the frontend and backend and serve them via firebase emulator
- `buildImage` - builds a docker-image to execute the whole application inside a container
- `start` - starts the docker image built using `buildImage`
  - The frontend should be accessible at the URL `http://127.0.0.1:5002/`
- `seed` - loads data from `games.json` into the firestore database

The commands `buildImage`, `start` and `seed` can be executed in order so we can have the solution running over docker and loaded with testing data.

## Commits

This project follows Conventional Commits for writting semantic commits messages.

- https://www.conventionalcommits.org/en/v1.0.0/#specification
- https://callmeryan.medium.com/semantic-commit-messages-bcd60f75de1f


# TODOs

I've added a few TODOs over at some parts of the code for improvements or features that could be a V2 for this solution.