import { productInterface } from "../types/product";

interface AdminProductList {
    product: productInterface;
    onDelete: (id: number) => void;
    onEdit: (product: productInterface) => void;
}

export default function AdminProductList({ product, onDelete, onEdit }: AdminProductList) {
    return (
        <div className="md:grid md:grid-cols-3 md:gap-4 flex flex-col items-center mb-4">
            <div className="w-[75%] flex justify-between p-2 border-2 rounded mb-2">
                <div>
                    <p>Produk: {product.productName}</p>
                    <p>Harga: {product.price}</p>
                    <p>Stok: {product.stock}</p>
                </div>
                <div className="flex flex-col">
                    <button onClick={() => onDelete(product.id)} className="cursor-pointer bg-red-400 p-0.5 rounded mb-2">
                        Hapus
                    </button>
                    <button onClick={() => onEdit(product)} className="cursor-pointer bg-green-400 p-0.5 rounded">
                        Edit
                    </button>
                </div>
            </div>
        </div>
    );
}
