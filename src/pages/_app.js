import TheamContext from "@/context/TheamContext";
import "@/styles/globals.css";
import { useReducer, useState } from "react";

const initialState = {
  id: "",
  logo: "",
  mainColor: "",
  hasUserSection: "",
};

export default function App({ Component, pageProps }) {
  const appConfig = useState({});

  return (
    <TheamContext.Provider value={appConfig}>
      <Component {...pageProps} />
    </TheamContext.Provider>
  );
}
