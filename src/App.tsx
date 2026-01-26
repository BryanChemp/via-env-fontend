import { BrowserRouter } from "react-router-dom";
import { AppRoutes } from "./app/router/AppRoutes";
import { ThemeProvider } from "styled-components";
import { lightTheme } from "./shared/theme/lightTheme";
import { GlobalStyles } from "./GlobalStyles";


function App() {
  return (
    <ThemeProvider theme={lightTheme}>
      <GlobalStyles/>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
