import { useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Card,
  CardHeader,
} from "@nextui-org/react";
import DetailBill from "../components/bills/DetailBill";
import CreateBill from "../components/bills/CreateBill";
import { useDispatch, useSelector } from "react-redux";
import { getBill } from "../store/actions/billAction";
import NavBar from '../components/NavBar';


const PelangganPage = () => {
  const bills = useSelector((state) => state.bill.bill);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBill());
  }, [dispatch]);

  return (
    <>
        <NavBar />
        <Card className="bg-[#f9f4ef] mb-4">
          <CardHeader>
            <h3 className="text-2xl font-bold mb-4">Tambah & Detail Transaksi</h3>
          </CardHeader>
          <div className="flex justify-center items-center h-screen">
            <Table aria-label="Bills" className="w-3/5 h-4/5">
              <TableHeader className="text-lg font-semibold">
                <TableColumn>ID</TableColumn>
                <TableColumn>NAME</TableColumn>
                <TableColumn className="flex justify-center items-center">
                  <div>TRANSAKSI</div>
                  <div className="absolute right-5">
                    <CreateBill />
                  </div>
                </TableColumn>
              </TableHeader>

              <TableBody>
                {bills.map((bill) => {
                  return (
                    <TableRow key={bill.id}>
                      <TableCell>{bill.customer.id.slice(0, 8)}</TableCell>
                      <TableCell>{bill.customer.name}</TableCell>
                      <TableCell className="flex justify-center">
                        <DetailBill billDetails={bill.billDetails} />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>
        </Card>
    </>
  );
};

export default PelangganPage;