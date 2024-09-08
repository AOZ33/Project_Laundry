import {
    Button,
    Modal,
    ModalContent,
    Table,
    TableBody,
    TableCell,
    TableColumn,
    TableHeader,
    TableRow,
    useDisclosure,
  } from "@nextui-org/react";
  import { useDispatch, useSelector } from "react-redux";
  import ButtonPrimary from "../ButtonPrimary";
  
  
  const DetailBill = ({ billDetails }) => {
    const bills = useSelector((state) => state.bill.bill);
    const dispatch = useDispatch();
    const { isOpen, onOpen, onOpenChange } = useDisclosure();
  
    return (
      <>
        <ButtonPrimary 
          onPress={onOpen}
          text={"Detail"}
          className={"mt-7"}>
          </ButtonPrimary>
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          isDismissable={false}
          radius="md"
          size="4xl"
          className="bg-[#f9f4ef]"
          hideCloseButton
        >
          <ModalContent>
            {(onClose) => {
              return (
                <>
                  <div className="flex flex-col items-center justify-center px-4 pt-4 pb-4">
                    <Table aria-label="Bill">
                      <TableHeader>
                        <TableColumn>CODE BILLS</TableColumn>
                        <TableColumn>DATES</TableColumn>
                        <TableColumn>PRODUCT</TableColumn>
                        <TableColumn>QUANTITY</TableColumn>
                        <TableColumn>TOTAL</TableColumn>
                      </TableHeader>
  
                      <TableBody>
                        {billDetails.map((bill) => {
                          return (
                            <TableRow key={`${bill.id}`}>
                              <TableCell>{bill.id?.slice(0, 8)}</TableCell>
                              <TableCell>
                                {new Date(bill.createdAt).toLocaleString()}
                              </TableCell>
                              <TableCell>{bill.product.name}</TableCell>
                              <TableCell>{bill.qty}</TableCell>
                              <TableCell>
                                {bill.qty * bill.product.price}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      </TableBody>
                    </Table>
                  </div>
                  <div className="flex items-end justify-end pb-4 pr-4">
                    <Button onPress={onClose} 
                    className="bg-red-600 text-white mb-4
                               hover:bg-white hover:text-red-600 
                                 hover:border hover:border-red-600">
                      Close
                    </Button>
                  </div>
                </>
              );
            }}
          </ModalContent>
        </Modal>
      </>
    );
  };
  
  export default DetailBill;