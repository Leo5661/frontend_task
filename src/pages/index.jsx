import Image from 'next/image'
import { Inter } from 'next/font/google'
import Nav from '@/components/Nav'
import { useContext, useEffect, useState } from 'react';
import TheamContext from '@/context/TheamContext';

const inter = Inter({ subsets: ['latin'] })

const APP_ID = process.env.APP_ID;

export async function getServerSideProps(context){
  let url;
  if(APP_ID === undefined){
    url = "https://api-test.innoloft.com/configuration/1";
  } else {
    url = `https://api-test.innoloft.com/configuration/${APP_ID}`;
  }
  const res = await fetch(url);
  const data = await res.json();
  return{
    props:{
      data
    }
  }
}

export default function Home({data}) {

  const [appConfig, setConfig] = useContext(TheamContext);
  const configData = data;
  useEffect(() => {
    console.log(data);
    setConfig(appConfig => ({...appConfig, ...configData}));
    console.log(appConfig);
  }, [data])
  
  return (
    <main className={`flex flex-col item-center ${inter.className}`}>
      <Nav />
      <div className="content flex justify-center grow h-screen">
        {JSON.stringify(data)}
      </div>
    </main>
  )
}
