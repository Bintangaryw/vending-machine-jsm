"use client";

import { useEffect, useState } from "react";
import TransactionItem from "../components/TransactionItem";
import { transactionItemInterface } from "../types/transactionItem";
import { getAllTransactions } from "../lib/api";
import Link from "next/link";
import toast from "react-hot-toast";

export default function History() {
    const [transactions, setTransactions] = useState<transactionItemInterface[]>([]);

    useEffect(() => {
        const getTransactions = async () => {
            try {
                const response = await getAllTransactions();
                setTransactions(response);
            } catch (error) {
                toast.error("Gagal mengambil data transaksi");
            }
        };
        getTransactions();
    }, []);
    return (
        <div>
            <Link href="/">
                <div className="hover:font-bold">&#8592; Kembali</div>
            </Link>

            <div className="w-screen flex flex-col items-center justify-center">
                {transactions.map((transaction) => (
                    <TransactionItem key={transaction.id} transactionItem={transaction} />
                ))}
            </div>
        </div>
    );
}
