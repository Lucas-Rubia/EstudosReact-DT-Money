import { ThemeProvider } from "styled-components";
import { TransactionProvider } from "./contexts/transactionContext";
import { Transaction } from "./pages/transaction";
import { GlobalStyles } from "./styles/global";
import { defaultTheme } from "./styles/theme/default";

export function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <GlobalStyles />
      <TransactionProvider>
        <Transaction />
      </TransactionProvider>
    </ThemeProvider>
  );
}

export default App
