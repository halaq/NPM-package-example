#### A Definitive Guide
# How to Build an NPM Package from Scratch

Before we go through the code and build an NPM package, we will take a quick journey through some important concepts that will be used in this post.

Are you ready?!

Since we are talking about NPM, we need to first understand what an NPM is and why we may need to build and publish a package on it!

[NPM](https://www.npmjs.com/) stands for Node Package Manager which is an open source project to help developers share their modules privately (within their team only) or publicly. It's also known as a command line client that allows developers to install and publish those packages.

The biggest advantage is that it makes your modules reusable and it saves your time and effort later. This is generally a good strategy to follow- build independent units which can be tested alone easily and can also be reused in other projects.
Well what do we need to build the package?

Babel:  This is a JavaScript compiler that converts ECMAScript 2015+ code into a compatible version in current and older browsers. It supports the latest version of Javascript- ES6 (also known as ES2015)- which comes with many great features but a big problem - the majority of browsers don't fully support them. It uses a Polyfill feature (@babel/polyfill), that are missing in many of the browsers' environment.

Briefly, we can say that it's a JS transpiler that converts new JS code into old ones through syntax transformers. It allows a piece of code that was written in ECMAScript 2015+ to be transformed into JavaScript which can be understood by any browser.
For instance, the arrow function is not supported in all browsers, babel transpiler converts it to the standard Javascript function.Webpack is the module bundler for modern JavaScript applications.

![Babel](https://cdn-images-1.medium.com/max/1600/1*RGCB9qdZlwzw4xknfV2YwQ.jpeg)
>For instance, the arrow function is not supported in all browsers, babel transpiler converts it to the standard Javascript function.

[Webpack](https://webpack.js.org/guides/getting-started/) is the module bundler for modern JavaScript applications.

But, what does that mean?

It compiles your module & makes sure that it has everything required to work as expected on the browser. When webpack processes the application, it builds something called dependency graph which maps all of the needed modules in your application into a small number of bundles - or, just one - to be loaded by the browser.

![Webpack](https://cdn-images-1.medium.com/max/1600/1*GytWTQHPJ3PvaJ2O_P1gOQ.jpeg)

How WebPack works

---

## First, let's build a module (React Component) with a local demo:
#### Step 1:
Create an NPM account by signing up [here](https://www.npmjs.com/signup)

#### Step 2: 
Create a new directory and initialize the NPM package.
Be sure to choose a name for your module that is not already in use on NPM (we can decide the best name for each module based on the module's requirements). I'm going to name mine: hala-test.

```
mkdir hala-test
cd hala-test
````

Create package.json file by npm init command. For scoped (private) modules , run:

```
npm init - scope=@scope-name
```

For unscoped modules, run:
```
npm init
```

Once you run the above command, you will find a package.json file in your module's directory. Each package.json file has a name following the NPM instructions for package naming, & a version which will be in the form of x.x.x, follows [semver spec](https://docs.npmjs.com/about-semantic-versioning).

#### Step 3: 
Add dependencies to your package.json file.

In this stage I'm going to use only 2 types of dependencies:

1. Development Dependencies: which is a type of dependency that you need at some point in the development process but not while running your code (e.g. Babel or WebPack dependencies). Use `- save-dev` as following to install them automatically:

```
npm install - save-dev webpack webpack-cli webpack-dev-server html-webpack-plugin style-loader css-loader babel-core babel-loader babel-preset-env babel-preset-react file-loader
```

2. Dependencies: the normal dependencies that you need when running your code. Use `- save` as following to install them automatically:

```
npm install - save react react-dom @babel/polyfill
```

As we said earlier, we will install polyfill feature to support all browsers & to solve cross browser problem with react. We will install it as a normal dependency, not a devDependency because this is a polyfill which will run before the source code.

#### Step 4:

Update the NPM scripts in the package.json file
Open the "package.json" in the hala-test directory and add the following NPM script:

```
{
  "name": "hala-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --mode development"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^2.1.1",
    "file-loader": "^3.0.1",
    "html-webpack-plugin": "^3.2.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.31.0",
    "webpack-cli": "^3.3.2",
    "webpack-dev-server": "^3.3.1"
  },
  "dependencies": {
    "@babel/polyfill": "^7.4.4",
    "react": "^16.8.6",
    "react-dom": "^16.8.6"
  }
}
```

start script will be used to run the module in our development environment.

#### Step 5: 
Add the following structure to your module root manually or by using terminal/cmd.

```
hala-test/
|
├── src
│   ├── elements
│        └── MyComponent.js
|   ├── assets
|        └── styles.css
|   └── index.js
|
├── demo
│   ├── index.html
│   ├── index.js
│   └── App.js 
|
├── webpack.config.js
├── .babelrc
└── README.md
```

#### Step 6: 

Write Babel & Webpack configurations.
In this simple example we will have 2 configurations files only, webpack.config.js & .babelrc.
webpack.config.js

A configuration file works as a common.js module. The config file is a place to put all of webpack configuration, loaders (new functionality for css, style, files … etc), and other specific information relating to the build.

```
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const htmlWebpackPlugin = new HtmlWebpackPlugin({
   template: path.join(__dirname, "demo/index.html"),
   filename: "./index.html"
});
module.exports = {
   entry: ["@babel/polyfill", path.join(__dirname, "demo/index.js")],
   output: {
        path: path.join(__dirname, "demo/dist"),
        filename: "bundle.js"
    },
   module: {
       rules: [
           {
               test: /\.(js|jsx)$/,
               use: "babel-loader",
               exclude: /node_modules/
           },
           {
               test: /\.css$/,
               use: ["style-loader", "css-loader"]
           },
           {
                test: /\.(png|jpg|gif|svg|ttf)$/,
                use: [
                  {
                    loader: 'file-loader',
                    options: {}
                  }
                ]
            }
       ]
   },
   plugins: [htmlWebpackPlugin],
   resolve: {
       extensions: [".js", ".jsx"]
   },
   devServer: {
       port: 3001,
       open: true
   }
};
```

.babelrc

Since we are working with babel, we need to give clear instructions in order for it to do anything. This is done by the babelrc file which is a config file that includes a list of required presets & plugins for our module.

There are different ways to add babel configurations to your module which you can read more about here, if interested.
For our simple module, we just need to define presets that can act as an array of Babel plugins or even a shareable options config.

```
{
  "presets": ["env", "react"]
}
```

#### Step 7: 

Write your own module.
We will create a module that will print "Hello from My Component" on the browser. All that you will need is to add the following code:

src/elements/MyComponent.js:

```
import React from 'react';
import '../assets/styles.css';
class MyComponent extends React.Component{
  render(){
    return(<h1>Hello from My Component</h1>);
  }
}
export default MyComponent;
src/assets/styles.css:

h1 {
   color: red;
}
src/index.js:

import "@babel/polyfill";
import MyComponent from './elements/MyComponent';
module.exports = {
  MyComponent: MyComponent,
};
```

demo/src/index.html:

```
<html>
<head>
   <title>My Component Demo</title>
   <meta charset="utf-8">
   <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
</head>
<body>
   <noscript>
       You need to enable JavaScript to run this app.
   </noscript>
   <div id="root"></div>
</body>
</html>
```

demo/src/index.js:

```
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
ReactDOM.render(<App />, document.getElementById('root'));
demo/src/App.js:

import React, { Component }  from 'react'; 
import ReactDOM from 'react-dom';
import React, { Component }  from 'react';
import { MyComponent } from '../src';
class App extends Component {
render() {
return (
      <div className="App">
        <MyComponent />
      </div>
    );
  }
}
export default App;
```

Now that everything is ready, run the following command to start the dev mode:
```
npm start
```

Open `localhost:3001` in your browser and you should see the demo page for the module. Make some changes, hit save and the page will automatically refresh.


---

## Now, we can publish a ready-to-use version of the module as an NPM package.
We want to publish a module with the minimum files needed to install. Right?

#### Step 1: 
Install the Babel CLI
```
npm install - save-dev babel-cli
```

#### Step 2: 
Update the package.json file by adding a transpile script which will allow Babel to transpile our module source files, as well as copy any non-source assets (e.g., .css files), into a target folder named dist & change the main entry point of our module to the transpiled version (dist folder).
```
{
  "name": "hala-test",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --mode development",
    "transpile": "babel src -d dist --copy-files"
  },
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^2.1.1",
    "file-loader": "^3.0.1",
    "html-webpack-plugin": "^3.2.0",
    "style-loader": "^0.23.1",
    "webpack": "^4.31.0",
    "webpack-cli": "^3.3.2",
    "webpack-dev-server": "^3.3.1"
  },
  "dependencies": {
    "@babel/polyfill": "^7.4.4",
    "react": "^16.8.6",
    "react-dom": "^16.8.6"
  }
}
```

#### Step 3: 

Run the following command:
```
npm run transpile
```

#### Step 4: 

Modify the package.json file to improve the module by:

1. Adding a prepublishOnly script which will run transpile script automatically by NPM every time we publish the module. This ensures that we always publish the latest version.

2. Adding peerDependencies which is a special type of dependency that will reduce package size and avoid the disaster of having multiple versions of React in the user's target project.

Install packages as a peerDependency causes NPM to not include React in the published package.

```
{
  "name": "hala-test",
  "version": "1.0.0",
  "description": "",
  "main": "dist/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "webpack-dev-server --mode development",
    "transpile": "babel src -d dist --copy-files",
    "prepublishOnly":"npm run transpile"
  },
  "author": "",
  "license": "ISC",
  "peerDependencies": {
    "react": "^16.8.6",
    "react-dom": "^16.8.6"
  },
  "devDependencies": {
    "babel-cli": "^6.26.0",
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "css-loader": "^1.0.1",
    "file-loader": "^1.1.11",
    "html-webpack-plugin": "^3.2.0",
    "style-loader": "^0.21.0",
    "webpack": "^4.30.0",
    "webpack-cli": "^3.3.0",
    "webpack-dev-server": "^3.3.1"
  },
  "dependencies": {
    "@babel/polyfill": "^7.4.3"
  }
}
```

#### Step 5: Let's inform NPM that there are files and folders in our module that can be omitted from the published package. 

Add .npmignore to the module root.

.npmignore:
```
src
demo
.babelrc
.gitignore
webpack.config.js
```

#### Step 6: 
Add a clear documentation for your package by updating the README.md file in the module directory with the following info:
Table of Contents: includes the main titles with a direct link to each section.

Brief Description: includes a description about the module work, main features and a link to online demo or GitHub source code.
Installation: includes how to install the package.

Usage: explains how to use the package clearly.
Properties: includes a table of all properties in the uploaded package.
Example: a piece of code (you can use App.js file in your demo code) that can help other developers who use your package to take and update based on their project requirements.

Finally, Login to your NPM account by terminal/cmd:
```
npm login
```

Now, we are finally ready to publish our module as an NPM package! Run the following command to get started:
```
npm publish
```

When you browse your profile on NPM, you should see that the new package has been added. Congratulations, you are all done!
