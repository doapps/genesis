# Genesis App

This is the source code of the main application

## Install

Clone repository and run:

```
npm install
```

## Requirements

node 5+

## Development

```
npm start
```

Go to [http://localhost:8080](http://localhost:8080).

## Production

If you want to run the project in production, set the `NODE_ENV` environment variable to `production`.

```
NODE_ENV=production npm start
```

Also build the production bundle:

```
npm run dist
```

## Tests

```
npm test
```

Only run specific tests

```
npm test -- NotFoundComponent
```

Coverage

```
npm test -- --coverage
```

## License

MIT © [DoApps](http://doapps.me)
