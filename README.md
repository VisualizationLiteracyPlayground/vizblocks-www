<div align="center">
  <sub>Created by <a href="https://gilgameshtc.github.io/">Travis Ching Jia Yea</a>
</div>

## Quick start

1.  Make sure that you have Node.js v8.15.1 and npm v5 or above installed.

## Local Development

* npm install
* modify webpack.base.babel environment plugin
  * API_HOST: 'http://127.0.0.1:8080/api/'
  * ASSET_HOST: 'http://127.0.0.1:8080/api/asset'
  * PROJECT_HOST: 'http://127.0.0.1:8080/api/project'
* npm start
* NOTE: Do not commit your changes to the webpack.base.babel file and the package-lock.json file

## Documentation

- [**The Hitchhiker's Guide to `react-boilerplate`**](docs/general/introduction.md): An introduction for newcomers to this boilerplate.
- [Overview](docs/general): A short overview of the included tools
- [**Commands**](docs/general/commands.md): Getting the most out of this boilerplate
- [Testing](docs/testing): How to work with the built-in test harness
- [Styling](docs/css): How to work with the CSS tooling
- [Your app](docs/js): Supercharging your app with Routing, Redux, simple
  asynchronicity helpers, etc.
- [**Troubleshooting**](docs/general/gotchas.md): Solutions to common problems faced by developers.

## License

This project is licensed under the MIT license, Copyright (c) 2019 Maximilian
Stoiber. For more information see `LICENSE.md`.
