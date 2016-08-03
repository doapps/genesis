<p align="center"><img src="https://raw.githubusercontent.com/doapps/genesis/master/app/static-files/logo-dark.png"></p>
# Genesis
Genesis is the official project builder from [DoApps](http://doapps.me/). It provides all necessary project structure for managing and start up a new project.

## Status
Genesis is currently in development and hence unstable (Until its soon launch :rocket:). For now is a super-basic tool but the goal is automatize all the manual work.

## Approach
This project aims to build the project structure given by this repository. i.e. Will build the same tree from the `project` directory.
The app will begin asking for the project name, namespace and device targets. This will require the permissions for Google Drive (our main store house-keeper), Slack(for channel creation) and Gitlab(for project repositories). Anyway you can fork this repository and customize by your own interest.

## Repository Structure
The `app` folder keeps the React based web application. Meanwhile the `project` folder stores the template-structure.

## Current features
Will be posted soon.

## Possible future features
There are a RFC file which handle the proposals and comments for change in the building process of the structure.

## TODO list
- [x] Main Screens (Mockup)
- [ ] Web App
- [ ] Third Party Integrations
- [ ] Testing

## Development

### Install

Clone repository and run:

```
npm install
```

### Requirements

node 5+

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
