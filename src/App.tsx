import { CssBaseline, createTheme } from "@mui/material";
import "./App.css";
import { ThemeProvider } from "@mui/system";
import { BrowserRouter } from "react-router-dom";
import { getDesignTokens } from "./theme/index";
import MainRouter from "./router";
import { useAppDispatch, useTheme } from "./features/hook";
import { useEffect, useState, useMemo } from "react";
import { getMeThunk } from "./features/asyncThunks";
import { getToken } from "./utils/token";
import jwt_decode from "jwt-decode";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

function App() {
  const [state, setState] = useState<null | number>(null);
  const dispatch = useAppDispatch();
  const token = getToken();
  const decoded: { sub: number } | null | "" = token && jwt_decode(token);
  useEffect(() => {
    decoded !== null && setState(Number(decoded.sub));
  }, [decoded, token]);
  useEffect(() => {
    state && dispatch(getMeThunk({ id: state }));
  }, [dispatch, state]);

  const mode = useTheme();

  const theme = useMemo(() => createTheme(getDesignTokens(mode)), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ToastContainer style={{ width: "auto" }} position="top-right" />
      <BrowserRouter>
        <MainRouter />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
