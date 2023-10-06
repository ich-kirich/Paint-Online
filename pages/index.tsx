import MainPage from "@/components/MainPage/MainPage";
import { StyledEngineProvider } from "@mui/material";
import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Paint Online</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <StyledEngineProvider injectFirst>
        <MainPage />
      </StyledEngineProvider>
    </>
  );
}
