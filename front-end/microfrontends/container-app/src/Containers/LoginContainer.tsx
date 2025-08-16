import { useEffect, useRef, useState } from 'react';



export default function LoginContainer() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [loading, setLoading]= useState(true);

  useEffect(() => {

    let canceled = false

    async function load() {

         const mod = await import('login_app/LoginMount');

         console.log(mod);

    if(!canceled && containerRef.current){
        await mod.mountLogin(containerRef.current);
        setLoading(false);
    }
        
    }
    load();
   


    return () => {
      canceled = true;
    };

  },[]);


  return(
    <div>
        {loading && <div>Cargando Login de Angular</div>}
        <div ref={containerRef}></div>
    </div>
  )




}