## Instructions

### Getting started

Rename .env.example to .env . Trello and Spotify's keys and tokens will be
provided privatelly.

```sh
  mv .env.example .env
```

Install all of the dependencies with:

```sh
  yarn
```

Compile Typescript to Javascript in dist folder and run the project with:

```sh
  yarn start
```

**_Important_**: The whole process will take almost 17 seconds because of ts
compilation, several API calls and a setTimeout() to prevent trello's 429 Rate
limit error.
