import { Header } from "../../components/header";
import { Summary } from "../../components/summary";
import { SearchForm } from "./components/searchForm";
import { PriceHigthLigth, TransactionContainer, TransactionTable } from "./styles";

export function Transaction(){
    return (
      <div>
        <Header />
        <Summary />
        <TransactionContainer>
          <SearchForm />

          <TransactionTable>
            <tbody>
              <tr>
                <td width="50%">Desenvolvimento de Site</td>
                <td>
                  <PriceHigthLigth variant="income">
                    R$ 12.000,00
                  </PriceHigthLigth>
                </td>
                <td>Venda</td>
                <td>13/04/2022</td>
              </tr>
              <tr>
                <td width="50%">Hamburguer</td>
                <td>
                  <PriceHigthLigth variant="outcome">
                    - R$ 59,00
                  </PriceHigthLigth>
                </td>
                <td>Venda</td>
                <td>13/04/2022</td>
              </tr>
            </tbody>
          </TransactionTable>
        </TransactionContainer>
      </div>
    );
}



