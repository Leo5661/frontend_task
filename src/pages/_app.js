import TheamContext from "@/context/TheamContext";
import "@/styles/globals.css";
import { useEffect, useState } from "react";

export default function App({ Component, pageProps }) {
  const [appConfig, setConfig] = useState();

  const callApi = async () => {
    try {
      const res = await fetch("/api/config");
      const data = await res.json();
      setConfig(data);
    } catch (error) {
      console.log("response", error.message);
    }
  };

  useEffect(() => {
    callApi();
  }, []);

  return (
    <TheamContext.Provider value={{ ...appConfig }}>
      <Component {...pageProps} />
    </TheamContext.Provider>
  );
}
