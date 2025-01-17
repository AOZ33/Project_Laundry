import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm, Controller } from "react-hook-form";
import { getBill, postBill } from "../../store/actions/billAction";
import { getProduct } from "../../store/actions/productAction";
import { getCustomer } from "../../store/actions/customerAction";
import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { VscDiffAdded } from "react-icons/vsc";
import ButtonPrimary from "../ButtonPrimary";

const CreateBill = () => {
  const products = useSelector((state) => state.product.product);
  const customers = useSelector((state) => state.customer.customer);
  const bills = useSelector((state) => state.bill.bill);
  const dispatch = useDispatch();
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const form = useForm({
    defaultValues: {
      customers: "",
      products: "",
      qty: "",
      total: 0,
    },
  });

  useEffect(() => {
    dispatch(getProduct());
    dispatch(getCustomer());
    dispatch(getBill());
  }, [dispatch]);

  const calculate = (qty, price) => qty * price;

  const submitButton = async (data) => {
    const payload = {
      customerId: data.customers,
      billDetails: [
        {
          product: {
            id: data.products,
          },
          qty: data.qty,
        },
      ],
    };
    await dispatch(postBill(payload));
    console.log(data);
    onOpenChange(false);
  };

  return (
    <>
      <Tooltip content={"Create Bill"}>
        <Button
          onPress={onOpen}
          isIconOnly
          color="default"
          variant="light"
          className="font-semibold text-lg"
        >
          <VscDiffAdded />
        </Button>
      </Tooltip>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="lg">
        <ModalContent>
          {(onClose) => {
            return (
              <form onSubmit={form.handleSubmit(submitButton)}>
                <ModalHeader className="font-semibold text-xl my-4">
                  Create Bill
                </ModalHeader>
                <ModalBody className="space-y-2 ">
                  <Controller
                    name="customers"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <Select {...field}
                          label="Nama Konsumen"
                          placeholder="Pilih Nama Konsumen">
                          {customers.map((customer) => {
                            return (
                              <SelectItem key={customer.id} value={customer.id}>
                                {customer.name}
                              </SelectItem>
                            );
                          })}
                        </Select>
                      );
                    }}
                  />

                  <Controller
                    name="products"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <Select
                          {...field}
                          label="Pilih Paket Laundry"
                          placeholder="Pilih Paket Laundry"
                          onChange={(e) => {
                            field.onChange(e);
                            const selectedProduct = products.find(
                              (product) => product.id === e
                            );
                            if (selectedProduct) {
                              form.setValue(
                                "total",
                                calculate(
                                  form.getValues("qty"),
                                  selectedProduct.price
                                )
                              );
                            } else {
                              form.setValue("total", 0);
                            }
                          }}
                        >
                          {products.map((product) => {
                            return (
                              <SelectItem key={product.id} value={product.id}>
                                {product.name}
                              </SelectItem>
                            );
                          })}
                        </Select>
                      );
                    }}
                  />

                  <Controller
                    name="qty"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          label="Qty()"
                          placeholder="0"
                          type="number"
                          onChange={(e) => {
                            const qty = parseFloat(e.target.value);
                            field.onChange(qty);
                            const selectedProduct = products.find(
                              (product) =>
                                product.id === form.getValues("products")
                            );
                            form.setValue(
                              "total",
                              calculate(qty, selectedProduct?.price || 0)
                            );
                          }}
                        />
                      );
                    }}
                  />

                  <Controller
                    name="total"
                    control={form.control}
                    render={({ field }) => {
                      return (
                        <Input
                          {...field}
                          label="Total Harga"
                          type="number"
                          isDisabled
                          size="sm"
                          value={form.watch("total")}
                        />
                      );
                    }}
                  />
                </ModalBody>
                <ModalFooter className="my-2">
                  <Button 
                  onPress={onClose} 
                  className="bg-red-600 text-white mb-4
                             hover:bg-white hover:text-red-600 
                               hover:border hover:border-red-600">
                    Close
                  </Button>
                  {/* <Button type="submit" color="primary">
                    Submit
                  </Button> */}
                  <ButtonPrimary 
                  type="submit"
                  text={"Submit"}/>
                </ModalFooter>
              </form>
            );
          }}
        </ModalContent>
      </Modal>
    </>
  );
};

export default CreateBill;