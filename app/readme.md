# Genesis App

This is the source code of the main application

## Install

Clone repository and run:

```sh
$ npm install
```

## Requirements

node 5+

## Development

```sh
$ npm start
```

Go to [http://localhost:8080](http://localhost:8080).

## Production

If you want to run the project in production, set the `NODE_ENV` environment variable to `production`.

```sh
$ NODE_ENV=production npm start
```

Also build the production bundle:

```sh
$ npm run dist
```

## Tests

```sh
$ npm test
```

Only run specific tests

```sh
$ npm test -- NotFoundComponent
```

Coverage

```sh
$ npm test -- --coverage
```

## License

MIT © [DoApps](http://doapps.me)
