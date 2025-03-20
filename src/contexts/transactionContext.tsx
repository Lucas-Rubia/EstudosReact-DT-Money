import { createContext, ReactNode, useEffect, useState } from "react";

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createAt: string;
}



interface TransactionContextType {
  transaction: Transaction[];
}


export const TransactionContext = createContext({} as TransactionContextType)

interface TransactionProviderProps{
    children: ReactNode
}

export function TransactionProvider({children}:TransactionProviderProps){

     const [transaction, setTransaction] = useState<Transaction[]>([]);
    
      async function loadTransaction() {
        const reponse = await fetch("http://localhost:3333/transactions")
        const data = await reponse.json();
    
        setTransaction(data)
      }
    
      useEffect(() => {
        loadTransaction();
      })
    

    return(

        <TransactionContext.Provider value={{transaction}}>{children}</TransactionContext.Provider>
    )
}