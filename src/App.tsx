import { ThemeProvider } from "styled-components";
import { Transaction } from "./pages/transaction";
import { GlobalStyles } from "./styles/global";
import { defaultTheme } from "./styles/theme/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <Transaction />
    </ThemeProvider>
  );
}

export default App
