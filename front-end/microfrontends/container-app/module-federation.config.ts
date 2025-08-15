import { externalsType } from "@rspack/core";

export const mfConfig = {
  name: "container_app",


  remotes:{
login_app: `promise new Promise(resolve => {
    import('http://localhost:4201/remoteEntry.js').then(remote => resolve(remote));
  })`
  }  ,
  exposes: {},
 shared:{
    React:{singleton:true},
    'react-dom':{singleton:true},
    'react-router-dom':{singleton:true}
  }

};
