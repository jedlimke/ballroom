# Ballroom Microservice
[![Tests](https://github.com/jedlimke/ballroom/actions/workflows/tests.yml/badge.svg)](https://github.com/jedlimke/ballroom/actions/workflows/tests.yml)

This project demonstrates a basic API for calculating dance partners based on available leaders, followers, and their respective dance styles. The environment is fully Dockerized, enabling development and testing within a consistent containerized setup.

## Getting Started

### Why Docker Compose?

Although the project currently consists of a single service, Docker Compose simplifies the workflow by:
- Automating container creation and configuration.
- Mapping the project directory into the container for seamless local development with hot reloading.
- Providing a single command to build and run the environment.

### Setup Instructions

1. **Build and Start the Docker Container**:
   Stay attached:
   ```bash
   docker-compose up --build
   ```
   OR do NOT stay attached:
   ```bash
   docker-compose up -d --build
   ```
   This will:
   - Build a Node.js-based development container.
   - Map the project directory into the container under `/app`.
   - Install dependencies inside the container.

2. **Access the Running Container**:
   ```bash
   docker exec -it ballroom_dev bash
   ```

3. **Stop the Container**:
   ```bash
   docker-compose down
   ```

### Using Dev Containers for Development

For seamless development with full IDE support, this project is configured to use [Dev Containers](https://code.visualstudio.com/docs/devcontainers/containers) with Visual Studio Code.

#### Setup Instructions for Dev Containers

1. **Install Prerequisites**:
   - [Docker](https://www.docker.com/products/docker-desktop) (Desktop version for Windows/Mac or Docker CLI for Linux).
   - [Visual Studio Code](https://code.visualstudio.com/).
   - [Remote - Containers Extension](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers).

2. **Open the Project in Dev Containers**:
   - Open the Command Palette in VS Code (`Ctrl+Shift+P` or `Cmd+Shift+P` on macOS).
   - Select **"Dev Containers: Reopen in Container"**.
   - VS Code will build and open the development environment inside a container.

3. **Workflow Inside the Dev Container**:
   - Code changes made locally will be reflected in the container.
   - Run commands directly in the VS Code terminal (e.g., `npm run dev` or `npm test`).
   - Use linting and formatting extensions for a seamless experience.

4. **Alternative: Use Docker Compose**:
   - If you’re not using Dev Containers, the existing Docker Compose setup (`docker-compose up`) will still work as described.


---

## Running the Application

### Start the Server

1. Ensure the container is running:
   ```bash
   docker-compose up --build
   ```

2. Access the API:
   - By default, the server listens on **port 3000**.
   - Use POST /calculate-partners to send a request. Example payload:
     ```json
     {
       "total_leaders": 2,
       "total_followers": 2,
       "dance_styles": ["Salsa", "Tango"],
       "leader_knowledge": {
         "1": ["Tango", "Salsa", "Charleston"],
         "2": ["Salsa", "Waltz", "Two-step"]
       },
       "follower_knowledge": {
         "A": ["Two-step"],
         "B": ["Tango", "Salsa", "Waltz"]
       },
       "dance_duration_minutes": 60
     }
     ```
     Response:
     ```json
     {
       "average_dance_partners": 1
     }
     ```

3. Logs for the application can be seen in the terminal running `docker-compose`.

---

## Running Tests

This project uses **Jest** for unit and integration testing.

### Run Tests Locally in the Container

1. **Access the Running Container**:
   ```bash
   docker exec -it ballroom_dev bash
   ```

2. **Run Tests**:
   Inside the container:
   ```bash
   npm test
   ```

### Run Tests with GitHub Actions

1. Tests are automatically run via GitHub Actions whenever changes are pushed to the repository or a pull request is created.
2. The workflow builds the Docker image and runs the tests inside a containerized environment.

#### Locally simulating a run through GitHub Actions with `act`

Sometimes, GitHub Actions don't do what we expect. `act` allows us to locally simulate a workflow without pushing code to GitHub ad nauseum.

1. Install `act` ([GitHub repository](https://github.com/nektos/act)) to simulate GitHub Actions workflows locally.
2. Run the workflow:
   ```bash
   act -j test
   ```
3. Ensure Docker is running and `act` is configured correctly (e.g., specifying the container architecture if using an Apple M-series chip).

---

## Development Workflow

1. All development happens inside the container, with local changes automatically reflected via hot reloading.
2. **Scripts**:
   - Start the app: `npm run dev`
   - Run tests: `npm test`
   - Lint the code: `npm run lint`
   - Build the app: `npm run build`
