"use client";
import { useEffect, useState } from "react";
import AdminProductForm from "../components/AdminProductForm";
import AdminProductList from "../components/AdminProductList";
import { deleteProduct, getAllProducts, updateProduct } from "../lib/api";
import { productInterface } from "../types/product";
import Link from "next/link";
import toast from "react-hot-toast";

export default function Admin() {
    const [products, setProducts] = useState<productInterface[]>([]);
    const [editingProduct, setEditingProduct] = useState<productInterface | null>(null);

    useEffect(() => {
        const getProducts = async () => {
            try {
                const response = await getAllProducts();
                setProducts(response);
            } catch (error) {
                toast.error("Gagal mengambil data produk");
            }
        };
        getProducts();
    }, []);

    const getProductData = async () => {
        const response = await getAllProducts();
        setProducts(response);
    };

    const handleDeleteProduct = async (id: number) => {
        const confirmDelete = confirm("Yakin ingin menghapus produk ini?");
        if (!confirmDelete) return;

        try {
            await deleteProduct(id);
            getProductData();
        } catch (error) {
            toast.error("Gagal menghapus produk");
        }
    };

    const handleEditProduct = (product: productInterface) => {
        setEditingProduct(product);
    };

    const handleUpdateProduct = async (updatedProduct: productInterface) => {
        try {
            await updateProduct(updatedProduct.id, {
                productName: updatedProduct.productName,
                price: updatedProduct.price,
                stock: updatedProduct.stock,
            });
            toast.success("Produk berhasil diupdate");
            setEditingProduct(null);
            getProductData();
        } catch (error) {
            toast.error("Gagal mengupdate produk");
        }
    };

    return (
        <div className="w-screen">
            <Link href="/">
                <div className="hover:font-bold">&#8592; Kembali</div>
            </Link>

            <div className="my-5">
                <div className="p-2">Form Produk</div>
                <div>
                    <AdminProductForm onSuccessAdd={getProductData} editingProduct={editingProduct} onUpdate={handleUpdateProduct} />
                </div>
            </div>

            <div className="my-5">
                <div className="p-2">Tabel Produk</div>
                <div>
                    {products.map((product) => (
                        <AdminProductList key={product.id} product={product} onDelete={handleDeleteProduct} onEdit={handleEditProduct} />
                    ))}
                </div>
            </div>
        </div>
    );
}
