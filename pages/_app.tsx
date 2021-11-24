import "../styles/globals.css";
import "react-image-crop/dist/ReactCrop.css";
import { ThemeProvider } from "@mui/material/styles";
import theme from "layout/theme";
import { CacheProvider } from "@emotion/react";
import createEmotionCache from "layout/createEmotionCache";

const clientSideEmotionCache = createEmotionCache();

function MyApp(props: any) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;
  return (
    <CacheProvider value={emotionCache}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
      </ThemeProvider>
    </CacheProvider>
  );
}

export default MyApp;
