'use client';

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Product
{
  id: string;
  name: string;
  code: string;
  price: number;
}

export default function Page() 
{
  const [products, setProducts] = useState<Product[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [inputName, setInputName] = useState("");
  const [inputCode, setInputCode] = useState("");
  const [inputPrice, setInputPrice] = useState("");
  const [language, setLanguage] = useState("zh-TW");

  const translations: Record<string, any> = {
    "zh-TW": {
      title: "📦 新增產品",
      addBtn: "新增資料",
      saveEditBtn: "儲存修改",
      cancelEditBtn:"取消編輯",
      name: "請輸入產品名稱",
      code: "請輸入產品編碼",
      price: "請輸入產品價格",
      number: "筆",
      codeNumber: "編碼:",
      edit: "編輯",
      delete: "刪除",
      confirmDel: "確定要刪除這筆資料?",
      errorConfirm: "請填寫所有欄位",
      listTitle: "📋 產品清單",
      emptyState: "目前還沒有資料，請在上方新增！",
    },
    "en": {
      title: "📦 Add Product",
      addBtn: "Add Item",
      saveEditBtn: "Save Changes",
      cancelEditBtn: "Cancel",
      name: "Enter product name",
      code: "Enter product code",
      price: "Enter product price",
      number: "",
      codeNumber: "Code:",
      edit: "Edit",
      delete: "Delete",
      confirmDel: "Are you sure you want to delete this item?",
      errorConfirm: "Please fill in all fields.",
      listTitle: "📋 Product List",
      emptyState: "No data yet. Please add an item above!",
    },
    "jp": {
      title: "📦 商品を追加",
      addBtn: "追加",
      saveEditBtn: "変更を保存",
      cancelEditBtn: "キャンセル",
      name: "商品名を入力",
      code: "商品コードを入力",
      price: "価格を入力",
      codeNumber: "コード:",
      number: "件",
      edit: "編集",
      delete: "削除",
      confirmDel: "このデータを削除してもよろしいですか？",
      errorConfirm: "すべての項目を入力してください。",
      listTitle: "📋 商品リスト",
      emptyState: "データがありません。上で追加してください！",
    }
  };
  const t = translations[language];

  const handleSubmit = () => 
  {
    if (!inputName || !inputCode || !inputPrice){
      alert(t.errorConfirm)
      return;
    };
    
    if(editingId){
      const updatedProducts = products.map((product) =>
        product.id === editingId
          ? {...product, name:inputName, code:inputCode, price:Number(inputPrice)}
          : product
      );
      setProducts(updatedProducts);
      setEditingId(null);
    }
    else{
      const newProduct: Product = {
        id: Date.now().toString(),
        name: inputName,
        code: inputCode,
        price: Number(inputPrice),
      };
      setProducts([...products, newProduct]);
    }

    setInputName("");
    setInputCode("");
    setInputPrice("");
  };
  
  const handleDelete = (id: string) =>{
    if (confirm(t.confirmDel)){
      const updatedProducts = products.filter((product) => product.id !== id);
      setProducts(updatedProducts);
      }
  };

  const handleEdit = (product: Product) => {
    setEditingId(product.id);
    setInputName(product.name);
    setInputCode(product.code);
    setInputPrice(product.price.toString());
  };

  
  return (
    <div className="p-4 md:p8 max-w-2xl mx-auto flex flex-col gap-10">
      <div className="flex flex-col gap-4 p-6 border rounded-lg shdow-sm">
        <h2 className="text-xl font-bold">{t.title}</h2>
        <Input
          placeholder={t.name}
          value={inputName}
          onChange={(e) => setInputName(e.target.value)}
        />
        <Input
          placeholder={t.code}
          value={inputCode}
          onChange={(e) => setInputCode(e.target.value)}
        />
        <Input
          type="number"
          placeholder={t.price}
          value={inputPrice}
          onChange={(e) => setInputPrice(e.target.value)}
        />
        <Button onClick={handleSubmit}>{editingId ? t.saveEditBtn : t.addBtn}</Button>
        {editingId && (
          <Button
            variant="ghost"
            onClick={() => {
              setEditingId(null);
              setInputName("");
              setInputCode("");
              setInputPrice("");
            }}
          >
            {t.cancelEditBtn}
          </Button>
        )}
      </div>
      <div>
        <h2 className="text-xl font-bold mb-4">{t.listTitle} ({products.length}{t.number})</h2>
        {products.length === 0 ? (
          <p className="text-gray-500 text-center p-8 border border-dashed rounded-lg">
            {t.emptyState}
          </p>
        ) : (
          <div className="flex flex-col gap-3">
            {products.map((product) => (
              <div
                key={product.id}
                className="flex flex-col md:flex-row justify-between items-start md:items-center p-4 border rounded-md hover:bg-gray-50 gap-4"
              >
                <div>
                  <p className="font-bold text-lg">{product.name}</p>
                  <p className="text-sm text-gray-500">{t.codeNumber} {product.code}</p>
                </div>
                <div className="flex items-center justify-between w-full md:w-auto gap-4 border-t md:border-t-0 pt-3 md:pt-0">
                  <div className="font-bold text-blue-600 text-xl">
                    ${product.price}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(product)}
                    >
                      {t.edit}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(product.id)}
                    >
                      {t.delete}
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="fixed bottom-6 right-6 z-50 shadow-xl rounded-md bg-white">
        <Select value={language} onValueChange={setLanguage}>
          <SelectTrigger className="w-[140px]">
            <SelectValue placeholder="選擇語言" />
          </SelectTrigger>
          <SelectContent position="popper" side="top" sideOffset={4}>
            <SelectItem value="zh-TW">🇹🇼 繁體中文</SelectItem>
            <SelectItem value="en">🇺🇸 English</SelectItem>
            <SelectItem value="jp">🇯🇵 日本語</SelectItem>
          </SelectContent>
          </Select>
      </div>
    </div>
  );
}
