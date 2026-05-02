'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface Product
{
  id: string;
  name: string;
  code: string;
  price: string;
}

export default function Page() 
{
  const [products, setProducts] = useState<Product[]>([]);

  const [inputName, setInputName] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [inputPrice, setInputPrice] = useState("");

  const handleAppProduct = () => 
  {
    if (!inputName || !inputCode || !inputPrice){
      alert("請填寫所有欄位")
      return;
    };
    
    const newProduct: Product = {
      id: Date.now().toString(),
      name: inputName,
      code: inputCode,
      price: Number(inputPrice)
    };

    setProducts([...products, newProduct]);

    setInputName("");
    setInputCode("");
    setInputPrice("");
  };
  
  const handleDelete = (id: string) =>{
    if (confirm("確定要刪除這筆資料?")){
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      }
  };

  return (
    <div className="p-8 max-w-2xl mx-auto flex flex-col gap-10">
      <div className="flex flex-col gap-4 p-6 border rounded-lg shdow-sm">
        <h2 className="text-xl font-bold">新增產品</h2>
        <Input
          placeholder="請輸入產品名稱"
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <Input
          placeholder="請輸入產品編碼"
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <Input
          type="number"
          placeholder="請輸入產品價格"
          value={inputPrice}
          onChange={(e) => setInputPrice(e.target.value)}
        />
        <Button onClick={handleAppProduct}>新增產品資料</Button>
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">📋 產品清單 ({products.length} 筆)</h2>
        {products.length === 0 ? (
          <p className="text-gray-500 text-center p-8 border border-dashed rounded-lg">
            目前還沒有資料，請在上方新增！
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex justify-between items-center p-4 border rounded-md hover:bg-gray-50"
              >
                <div>
                  <p className="font-bold text-lg">{product.name}</p>
                  <p className="text-sm text-gray-500">編碼: {product.code}</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="font-bold text-blue-600 text-xl">
                    ${product.price}
                  </div>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => handleDelete(product.id)}
                  >
                    刪除
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
