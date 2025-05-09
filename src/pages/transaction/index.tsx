import { useContextSelector } from "use-context-selector";
import { Header } from "../../components/header";
import { Summary } from "../../components/summary";
import { TransactionContext } from "../../contexts/transactionContext";
import { dateFormatter, priceFormatter } from "../../utils/formatter";
import { SearchForm } from "./components/searchForm";
import { PriceHigthLigth, TransactionContainer, TransactionTable } from "./styles";



export function Transaction(){

  const transaction = useContextSelector(TransactionContext, (context) => {
    return context.transaction;
  });


    return (
      <div>
        <Header />
        <Summary />
        <TransactionContainer>
          <SearchForm />

          <TransactionTable>
            <tbody>
                {transaction.map(transaction => {
                  return (
                    <tr key={transaction.id}>
                      <td width="50%">{transaction.description}</td>
                      <td>
                        <PriceHigthLigth variant={transaction.type}>
                          {transaction.type === 'outcome' && '- '}
                          {priceFormatter.format(transaction.price)}
                        </PriceHigthLigth>
                      </td>
                      <td>{transaction.category}</td>
                      <td>{dateFormatter.format(new Date(transaction.createdAt))}</td>
                    </tr>
                  );
                })}
              
            </tbody>
          </TransactionTable>
        </TransactionContainer>
      </div>
    );
}



