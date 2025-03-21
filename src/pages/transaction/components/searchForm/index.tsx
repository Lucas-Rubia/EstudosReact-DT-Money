import { zodResolver } from "@hookform/resolvers/zod";
import { MagnifyingGlass } from "phosphor-react";
import { memo } from "react";
import { useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import * as z from "zod";
import { TransactionContext } from "../../../../contexts/transactionContext";
import { SearchFormContainer } from "./styles";

const searchFormschema = z.object({
    query: z.string(),
})


type SearchFormInputs = z.infer<typeof searchFormschema>


 function SearchFormComponent(){

  const featchTransaction = useContextSelector(TransactionContext, (context) => {
    return context.featchTransaction;
  })

    const {register, handleSubmit, formState:{isSubmitting}} = useForm<SearchFormInputs>({
        resolver: zodResolver(searchFormschema)
    }) 


    async function handleSearchTransactions(data: SearchFormInputs){
      await featchTransaction(data.query)
    }

    return (
      <SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
        <input
          type="text"
          placeholder="Busque por transações"
          {...register('query')}
        />

        <button type="submit" disabled={isSubmitting}>
          <MagnifyingGlass size={20} />
          Buscar
        </button>
      </SearchFormContainer>
    );
}


export const SearchForm = memo(SearchFormComponent)