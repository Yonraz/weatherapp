# weatherapp

## Setup

* Clone the repository

```sh
git clone https://github.com/Yonraz/weatherapp.git
```

* install client dependencies

```sh
cd weatherapp
cd client
npm install
```

* run client

```sh
npm run dev
```

* open a new terminal and move into the server folder

```sh
cd server
npm install
```

* create a .env file in the server folder and add the following:

```sh
WEATHER_API_KEY=37c6eeac2a3f45879b2124936240109
WEATHER_API_BASE_URL=http://api.weatherapi.com/v1
```

* run the server:

```sh
npm run start
```

The app should now be accessible on localhost through ports client:5173 and server:8000
