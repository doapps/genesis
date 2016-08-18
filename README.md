<p align="center"><img src="https://raw.githubusercontent.com/doapps/genesis/master/static-files/logo-120.png"></p>
# Genesis
Genesis is the official project builder from [DoApps](http://doapps.me/). It provides all necessary project structure for managing and start up a new project.

## Status
Genesis is currently in production. Now in v1.0.0

## Approach
This project aims to build the project structure given by the [dspp](http://doapps.me/) repository with the nesting and constructing the files described in the factory files.
The app will begin asking for the project name, namespace and device targets. This will require the permissions for Google Drive (our main store house-keeper), Slack(for channel creation), Gitlab(for project repositories) and Trello(for project tracking).

## Possible future features
There are a RFC file which handle the proposals and comments for change in the building process of the structure (This is not public).

## Development

### Install

Clone repository and run:

```
npm install
```

### Requirements

node 4.5+

### Running the app

```
npm start
```

Go to [http://localhost:8080](http://localhost:8080).

### Production

If you want to run the project in production, set the `NODE_ENV` environment variable to `production`.

```
NODE_ENV=production npm start
```

Also build the production bundle:

```
npm run dist
```

To push directly on github pages simply run the command:

```
npm run publish-site
```

### Tests

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
