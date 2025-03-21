import { zodResolver } from '@hookform/resolvers/zod';
import * as Dialog from '@radix-ui/react-dialog';
import { ArrowCircleDown, ArrowCircleUp, X } from 'phosphor-react';
import { Controller, useForm } from 'react-hook-form';
import { useContextSelector } from 'use-context-selector';
import * as z from "zod";
import { TransactionContext } from '../../contexts/transactionContext';
import { CloseButton, Content, Overlay, TrasactionType, TrasactionTypeButton } from './styles';


const newTransactionFormSchema =z.object({
  description: z.string(),
  price:z.number(),
  category: z.string(),
  type: z.enum(['income' , 'outcome']),
})


type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>

export function NewTransactionModal(){
  const createTransaction = useContextSelector(
    TransactionContext,
    (context) => {
      return context.createTransaction;
    }
  );

  const {
    control, 
    register,
    handleSubmit, 
    formState:{ isSubmitting},
    reset,
    } = useForm<NewTransactionFormInputs>({
    resolver:zodResolver(newTransactionFormSchema),
    defaultValues:{
      type:'income'
    }
  })


  
 async function handleCreateNewtransaction(data: NewTransactionFormInputs){
     const {description, price, category, type} = data

    await createTransaction({
      description,
      price,
      category,
      type,
    }) 
    
    reset()

  }

  return (
    <Dialog.Portal>
      <Overlay />

      <Content>
        <Dialog.Title> Nova Transação</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>

        <form onSubmit={handleSubmit(handleCreateNewtransaction)}>
          <input
            type="text"
            placeholder="Descrição"
            required
            {...register("description")}
          />
          <input
            type="number"
            placeholder="Preço"
            required
            {...register("price", { valueAsNumber: true })}
          />
          <input
            type="text"
            placeholder="Categoria"
            required
            {...register("category")}
          />

          <Controller
            control={control}
            name="type"
            render={({field}) => {

              return (
                <TrasactionType onValueChange={field.onChange} value={field.value}>
                  <TrasactionTypeButton variant="income" value="income">
                    <ArrowCircleUp size={24} />
                    Entrada
                  </TrasactionTypeButton>
                  <TrasactionTypeButton variant="outcome" value="outcome">
                    <ArrowCircleDown size={24} />
                    Saida
                  </TrasactionTypeButton>
                </TrasactionType>
              );
            }}
          />

          <button type="submit" disabled={isSubmitting}>
            cadastrar
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}