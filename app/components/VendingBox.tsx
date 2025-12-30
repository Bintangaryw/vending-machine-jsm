"use client";

import { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { getAllProducts, updateProductStock, createTransaction } from "../lib/api";
import { productInterface } from "../types/product";
import toast from "react-hot-toast";

export default function VendingBox() {
    const [money, setMoney] = useState(5000);
    const [products, setProducts] = useState<productInterface[]>([]);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await getAllProducts();
                setProducts(response);
            } catch (error) {
                console.error(error);
            }
        };
        getProducts();
    }, []);

    const handleBuy = async (product: productInterface) => {
        if (product.stock === 0) {
            toast.error("Stock habis!");
            return;
        } else if (money < product.price) {
            toast.error("Dana tidak cukup!");
            return;
        }

        const change = money - product.price;

        try {
            await updateProductStock(product.id, product.stock - 1);

            await createTransaction({
                productId: product.id,
                productName: product.productName,
                price: product.price,
                paid: money,
                change: change,
                date: new Date().toISOString(),
            });

            setProducts((prev) => prev.map((p) => (p.id === product.id ? { ...p, stock: p.stock - 1 } : p)));
            setMoney(change);

            toast.success(`Berhasil beli ${product.productName}. Kembalian Rp${change}`);
        } catch (error) {
            toast.error("Terjadi kesalahan saat pembelian.");
        }
    };

    return (
        <div className="w-screen">
            <div className="flex flex-col justify-between md:h-screen md:flex-row md:justify-between">
                <div className="h-full w-full md:w-4/5 p-4">
                    <div className="grid grid-cols-3 gap-3 md:grid-cols-5 md:gap-4">
                        {products.map((product) => (
                            <ProductCard key={product.id} product={product} onBuy={handleBuy} />
                        ))}
                    </div>
                </div>

                <div className="p-4 mt-4">
                    <div className="flex flex-row justify-center items-center mb-4">
                        <p>
                            Dana: Rp <span className="font-medium">{money}</span>{" "}
                        </p>
                        <button className="ml-5 cursor-pointer p-1 bg-[#674079] rounded text-white" onClick={() => setMoney(0)}>
                            Tarik Dana
                        </button>
                    </div>

                    <div className="mb-2">Tekan tombol di bawah untuk tambah dana</div>
                    <div className="flex flex-row justify-around">
                        <button className="cursor-pointer p-1.5 bg-[#674079] rounded text-white" onClick={() => setMoney(money + 2000)}>
                            2.000
                        </button>
                        <button className="cursor-pointer p-1.5 bg-[#674079] rounded text-white" onClick={() => setMoney(money + 5000)}>
                            5.000
                        </button>
                        <button className="cursor-pointer p-1.5 bg-[#674079] rounded text-white" onClick={() => setMoney(money + 10000)}>
                            10.000
                        </button>
                        <button className="cursor-pointer p-1.5 bg-[#674079] rounded text-white" onClick={() => setMoney(money + 20000)}>
                            20.000
                        </button>
                        <button className="cursor-pointer p-1.5 bg-[#674079] rounded text-white" onClick={() => setMoney(money + 50000)}>
                            50.000
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
