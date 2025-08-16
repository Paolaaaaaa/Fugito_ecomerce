import { externalsType } from "@rspack/core";

export const mfConfig = {
  name: "container_app",


  remotes:{
login_app: `promise new Promise(resolve => {
    import('http://localhost:4201/remoteEntry.js').then(remote => resolve(remote));
  })`
 ,
 product_app:"product_app@http://localhost:4202/remoteEntry.js" 
} 
  
  
  
  
  ,
  exposes: {},
 shared:{
    React:{singleton:true},
    'react-dom':{singleton:true},
    'react-router-dom':{singleton:true}
  }

};
