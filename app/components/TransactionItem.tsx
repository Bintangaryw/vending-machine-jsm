import { transactionItemInterface } from "../types/transactionItem";

interface TransactionItemProps {
    transactionItem: transactionItemInterface;
}

export default function TransactionItem({ transactionItem }: TransactionItemProps) {
    return (
        <div className="bg-[#e7cef2] w-95 m-2 p-2 rounded">
            <div className=" p-2 rounded font-bold text-center">
                <div>Transaction Item</div>
            </div>
            <div className="bg-white p-2 text-xs">
                <div className="flex flex-row justify-between">
                    <p>Produk</p>
                    <p className="font-medium">{transactionItem.productName}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p>Harga</p>
                    <p className="font-medium">Rp {transactionItem.price}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p>Terbayar</p>
                    <p className="font-medium">Rp {transactionItem.paid}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p>Kembalian</p>
                    <p className="font-medium">Rp {transactionItem.change}</p>
                </div>
                <div className="flex flex-row justify-between">
                    <p>Tanggal</p>
                    <p className="font-medium">{transactionItem.date}</p>
                </div>
            </div>
        </div>
    );
}
