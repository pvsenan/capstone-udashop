# Udashop - Online shop

This is capstone project as part of udacity cloud developer nanodegree program. Fronted part of this project is implemented using react and backend is aws lambda functions with persistance using dynamodb

## Project setup

## Frontend

Use `npm` to install the project dependencies:


```bash
# Using npm..
cd to frontend
npm install
npm start


### Configuration

The project needs to be configured with your Auth0 domain and client ID in order for the authentication flow to work.

To do this, in the file `src/auth_config.json` replace the values with your own Auth0 application credentials:

```json
{
  "domain": "{YOUR AUTH0 DOMAIN}",
  "clientId": "{YOUR AUTH0 CLIENT ID}"
}
```

### Compiles and hot-reloads for development

```bash
npm start
```

## Deployment

### Compiles and minifies for production

```bash
npm run build
```

## Backend

Use `npm` to install the project dependencies:


```bash
# Using npm..
cd to backend
npm install


## Deployment

```bash
cd to backend
sls deploy

