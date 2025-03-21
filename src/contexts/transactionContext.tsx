import { ReactNode, useCallback, useEffect, useState } from "react";
import { createContext } from "use-context-selector";
import { api } from "../lib/axios";

interface Transaction {
  id: number;
  description: string;
  type: 'income' | 'outcome';
  price: number;
  category: string;
  createdAt: string;
}

interface CreateTransactionInput {
  description: string,
  price: number,
  category: string,
  type: 'income' | 'outcome'
}

interface TransactionContextType {
  transaction: Transaction[];
  featchTransaction:(query?: string) => Promise<void>
  createTransaction: (data:CreateTransactionInput) => Promise<void>
}

interface TransactionProviderProps{
  children: ReactNode
}

export const TransactionContext = createContext({} as TransactionContextType)

export function TransactionProvider({children}:TransactionProviderProps){

     const [transaction, setTransaction] = useState<Transaction[]>([]);
    
      const featchTransaction = useCallback(async (query?:string) =>   {
        const response = await api.get('transactions', {
          params: {
            _sort: 'createdAt',
            _order: 'desc',
            q: query,
          }
        });
    
        setTransaction(response.data)
      },[])

    const createTransaction = useCallback(
      async (data: CreateTransactionInput) => {
        const { description, price, category, type } = data;

        const response = await api.post("transactions", {
          description,
          price,
          category,
          type,
          createdAt: new Date(),
        });

        setTransaction((state) => [response.data, ...state]);
      },
      []
    );

    
      useEffect(() => {
        featchTransaction();
      }, []); 
    

    return(

        <TransactionContext.Provider value={{transaction, featchTransaction, createTransaction}}>{children}</TransactionContext.Provider>
    )
}