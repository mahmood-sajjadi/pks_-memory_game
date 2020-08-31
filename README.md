# About this repo
This is an interview test from PKS. there is no real use case for this code but all technical discussions and challenges are welcome :blush:

# Dependencies
* NodeJS 12 (nvm is preferred, .nvmrc exists)
* Yarn 1.22 or above
* Typescript 3.8.0
* Jest
* Es-Lint with typescript support
* Prettier
* emotionJs

# Setup local :computer:
## Clone repo
```bash
git clone https://github.com/mahmood-sajjadi/pks_-memory_game.git
cd pks_-memory_game
```

## Add environment settings
```bash
cp .env.example .env
```
open `.env` file and change the settings based on your need

## Install dependencies
npm is not allowed. please use yarn and gain benefit of having exact same dependency versions with the help of yarn.lock
`yarn install`

# Usage

## Available Scripts

In the project directory, you can run:

### `yarn start` :running:

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn test:debug` :bug:

Launches the test runner in the debug mode.<br />
If you are using VsCode IDE, debug option for code and test is available in IDE too.

### `yarn lint`
As it is an small project not too many custom rules added, but default rules are available

### `yarn format`
As it is an small project not too many custom rules added, but default rules are available

### `yarn build` :fire:

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

## Contributing
The original purpose of this repository is to pass the answer of this coding challenge back to PKS.
But I want to use this opportunity to ask all of you to review and suggest better way(performance and quality) to implement this app.
I tried to implement everything in few hours(including basic setup of repo) so there are many ways to improve this code, you are welcome to help me on this :wink:
to do that please
* create an issue in github in this repo https://github.com/mahmood-sajjadi/pks_-memory_game/issues
* or fork this project and do the changes.

## What I like to do later
* adding husky hooks
* add more eslit rules and prettier
* adding more inline-comments and maybe tsdoc to auto generate documentation
* adding UI for end of the game(winning)
* adding time before start of the game
* counting number of wrong clicks
* adding more unit tests
* adding end to end testing with cypress
* add better responsive design (support mobile)
* add keyboard support and accessibility
* improve random card selection service for better performance
