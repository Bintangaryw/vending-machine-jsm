import Image from "next/image";
import VendingBox from "./components/VendingBox";
import Link from "next/link";

export default function Home() {
    return (
        <div className="flex flex-col ">
            <div>
                <Link href="/history" className="hover:font-bold">
                    <div className="p-2 flex flex-row items-center">
                        <h1>Transaksi</h1>
                        <p>&#8594;</p>
                    </div>
                </Link>

                <Link href="/admin" className="hover:font-bold">
                    <div className="p-2 flex flex-row items-center ">
                        <h1>Admin</h1>
                        <p> &#8594; </p>
                    </div>
                </Link>
            </div>

            <div className="pt-3">
                <div>
                    <VendingBox />
                </div>
            </div>
        </div>
    );
}
