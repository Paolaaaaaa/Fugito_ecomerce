const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
module.exports=  withModuleFederationPlugin({
  // Mueve tu configuración de ModuleFederationPlugin aquí
  name: 'login_app',
  filename: 'remoteEntry.js',
  exposes: {
    './Login': './src/app/login-registration/pages/login/login.ts',

        './Register': './src/app/login-registration/pages/register/register.ts',

        './Autho':'./src/app/test.ts'

  },

  library:{
    type: 'var',
    name: 'login_app' 
  
  },
  shared: {

 "@angular/core": {
      singleton: true,
      strictVersion: true,
      requiredVersion: '20.1.7'
    },
    "@angular/common": {
      singleton: true,
      strictVersion: true,
      requiredVersion: '20.1.7'
    },
    "@angular/router": {
      singleton: true,
      strictVersion: true,
      requiredVersion: '20.1.7'
    },
    "@angular/forms": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    "@angular/compiler": {
      singleton: true,
      strictVersion: true,
      requiredVersion: 'auto'
    },
    "@angular/platform-browser": {
      singleton: true,
      strictVersion: true,
      requiredVersion: '20.1.7'
    },
    "rxjs": {
      singleton: true,
      strictVersion: true,
      requiredVersion: '7.8.0'
    },
  }
}, {
entry: './src/main.ts',
  mode:'development',
  devServer:{
    port: 4201,
    static: path.join(__dirname,'dist'),
    headers: {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
    "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
  }
  },

 
  output:{
    uniqueName:"login_app",
      publicPath:'http://localhost:4201/',

  },
  module:{
    rules:[
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude:/node_modules/,
      }
    ]
  },
  // Plugins que no son de Module Federation
  plugins:[
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    })
  ]
});