"use client";

import { useEffect, useState } from "react";
import { createProduct } from "../lib/api";
import { productInterface } from "../types/product";
import toast from "react-hot-toast";

interface Props {
    onSuccessAdd: () => void;
    editingProduct: productInterface | null;
    onUpdate: (updatedProduct: productInterface) => void;
}

export default function AdminProductForm({ onSuccessAdd, editingProduct, onUpdate }: Props) {
    const [newProduct, setNewProduct] = useState({
        productName: "",
        price: 0,
        stock: 0,
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;

        setNewProduct((prev) => ({
            ...prev,
            [name]: name === "price" || name === "stock" ? Number(value) : value,
        }));
    };

    useEffect(() => {
        if (editingProduct) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setNewProduct({
                productName: editingProduct.productName,
                price: editingProduct.price,
                stock: editingProduct.stock,
            });
        }
    }, [editingProduct]);

    const onSubmitNewProduct = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!newProduct.productName || newProduct.price <= 0 || newProduct.stock < 0) {
            toast.error("Mohon isi semua field dengan benar");
            return;
        }
        try {
            if (editingProduct) {
                await onUpdate({
                    id: editingProduct.id,
                    productName: newProduct.productName,
                    price: newProduct.price,
                    stock: newProduct.stock,
                });
                setNewProduct({
                    productName: "",
                    price: 0,
                    stock: 0,
                });
            } else {
                await createProduct(newProduct);
                onSuccessAdd();
                setNewProduct({
                    productName: "",
                    price: 0,
                    stock: 0,
                });
                toast.success("Produk berhasil ditambahkan");
            }
        } catch (error) {
            toast.error("Gagal menambahkan produk");
        }
    };

    return (
        <div className="p-2">
            <form className="mb-4 space-y-2" onSubmit={onSubmitNewProduct}>
                <input name="productName" placeholder="Nama Produk" className="border p-1 w-full" required value={newProduct.productName} onChange={handleInputChange} />

                <input name="price" type="number" placeholder="Harga" className="border p-1 w-full" required value={newProduct.price} onChange={handleInputChange} />

                <input name="stock" type="number" placeholder="Stok" className="border p-1 w-full" required value={newProduct.stock} onChange={handleInputChange} />

                <button className="cursor-pointer bg-blue-500 p-1 rounded" type="submit">
                    {editingProduct ? "Update Produk" : "Tambah Produk"}
                </button>
            </form>
        </div>
    );
}
