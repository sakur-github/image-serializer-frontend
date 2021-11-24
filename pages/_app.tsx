import "../styles/globals.css";
import "react-image-crop/dist/ReactCrop.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "layout/theme";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "layout/createEmotionCache";
import { usePing } from "src/hooks/usePing";

const clientSideEmotionCache = createEmotionCache();

function MyApp(props: any) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  usePing();

  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
