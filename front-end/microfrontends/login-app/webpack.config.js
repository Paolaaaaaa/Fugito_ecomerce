const { shareAll, ModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

const path = require('path');
module.exports= {
  entry:'.src/index',
  mode:'development',
  devServer:{
    port: 4201,
    static: path.join(__dirname,'dist')
  
  },
  output:{
    publicPath:'http://localhost:4201'
  },
  module:{
    rules:[
      {
              test: /\.jsx?$/,
              loader: 'babel-loader',
              exclude:/node_models/,


      }
    ]
  },
  plugins:[
    new ModuleFederationPlugin({
      name: 'loginApp',
      filename: 'remoteEntry.js',
      exposes: {
        './LoginModule': './src/app/login/login.module.ts',
        
      },
      shared: shareAll({
        singleton: true,
        strictVersion: true,
        requiredVersion: 'auto'
      })
    })
  ]


}