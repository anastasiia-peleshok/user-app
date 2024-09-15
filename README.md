# User Management Application

This is a Java Spring Boot application for managing users. It includes functionalities to create, update, delete, and view users, as well as search users by their first name.

## Features

- **User Management**: Create, update, delete, and view user details.
- **Search Users**: Filter users by their first name.
- **Validation**: Ensures email format is correct and birth date is in the past.

## Prerequisites

Before deploying this application to Heroku, ensure you have the following:

1. [Heroku CLI](https://devcenter.heroku.com/articles/heroku-cli) installed.
2. A [Heroku account](https://signup.heroku.com/).

## Deployment Guide

### Steps to Deploy on Heroku

1. **Log in to Heroku**: First, log in to your Heroku account using the CLI:
    ```sh
    heroku login
    ```
    Follow the prompts to authenticate.

2. **Create a Heroku Application**: Create a new Heroku application with a unique name:
    ```sh
    heroku create your-app-name
    ```
    Replace `your-app-name` with your desired application name.

3. **Add Necessary Add-ons**: If your application requires add-ons, such as ClearDB for MySQL, add them using:
    ```sh
    heroku addons:create punch8 --app your-app-name
    ```
    Replace `your-app-name` with your Heroku application name.

4. **Prepare Your Project**:
    - **Create `Procfile`**: In the root directory of your project, create a file named `Procfile` with the following content:
        ```
        web: ./mvnw spring-boot:run
        ```

5. **Commit Your Changes**: Ensure that all your changes are committed to your Git repository:
    ```sh
    git add .
    git commit -m "Prepare for Heroku deployment"
    ```

6. **Add Heroku Remote Repository**: If not added automatically during `heroku create`, add the Heroku remote repository:
    ```sh
    git remote add heroku https://git.heroku.com/your-app-name.git
    ```
    Replace `your-app-name` with the name of your Heroku application.

7. **Deploy Your Code**: Push your code to Heroku:
    ```sh
    git push heroku main
    ```

8. **Open Your Application**: Open your application in a web browser:
    ```sh
    heroku open --app your-app-name
    ```

9. **Monitor and Manage**: View logs to monitor your application:
    ```sh
    heroku logs --tail --app your-app-name
    ```

### Troubleshooting

- **Build Errors**: Check your build logs for errors and resolve them accordingly.
- **Runtime Errors**: Use `heroku logs` to debug issues with your application.

For more information on Heroku deployment, refer to the [Heroku Documentation](https://devcenter.heroku.com/categories/deployment).

## Development

To run the application locally:

1. Clone the repository:
    ```sh
    git clone https://github.com/your-repo-url.git
    ```

2. Navigate to the project directory:
    ```sh
    cd your-project-directory
    ```

3. Build and run the application:
    ```sh
    ./mvnw spring-boot:run
    ```

4. Open your browser and go to `http://localhost:8080` to see the application running locally.

