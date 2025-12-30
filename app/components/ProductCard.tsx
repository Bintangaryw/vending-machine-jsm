import Image from "next/image";
import { productInterface } from "../types/product";

interface ProductCardProps {
    product: productInterface;
    onBuy: (product: productInterface) => void;
}

export default function ProductCard({ product, onBuy }: ProductCardProps) {
    return (
        <div className="flex flex-col justify-around p-1 hover:shadow-xl">
            <div className="flex justify-center items-center">
                <Image src="/productsImg/energy-drink.png" alt="drink" width={75} height={10} />
            </div>

            <div>
                <p className="font-medium text-center">{product.productName}</p>
                <p>
                    Harga: <span className="font-medium">Rp {product.price}</span>{" "}
                </p>
                <p>
                    Stock: <span className="font-medium">{product.stock}</span>{" "}
                </p>
                <div className="flex items-center justify-end">
                    <button className="cursor-pointer p-1 bg-[#674079] text-white border-1 rounded" onClick={() => onBuy(product)}>
                        Beli
                    </button>
                </div>
            </div>
        </div>
    );
}
