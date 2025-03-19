import * as Dialog from '@radix-ui/react-dialog';
import LogoImg from "../../assests/logo.svg";
import { NewTransactionModal } from '../newTransactionModal';
import { HeaderContainer, HeaderContent, NewTransactionButton } from "./styles";

export function Header(){
    return (
      <HeaderContainer>
        <HeaderContent>
          <img src={LogoImg} alt="" />

          <Dialog.Root>
            <Dialog.Trigger asChild>
              <NewTransactionButton> Nova transação</NewTransactionButton>
            </Dialog.Trigger>

            <NewTransactionModal />
          </Dialog.Root>
        </HeaderContent>
      </HeaderContainer>
    );
}