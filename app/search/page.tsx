"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Search, Mail, User, ArrowLeft } from 'lucide-react';

const searchSchema = z.object({
  name: z.string().min(1, "お名前を入力してください"),
  email: z.string().email("有効なメールアドレスを入力してください"),
});

type SearchFormData = z.infer<typeof searchSchema>;

export default function SearchPage() {
  const router = useRouter();
  const [errorMsg, setErrorMsg] = useState("");

  const { register, handleSubmit, formState: { errors } } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: SearchFormData) => {
    // 從 LocalStorage 取得註冊的資料
    const savedData = localStorage.getItem('userData');
    
    if (savedData) {
      const userData = JSON.parse(savedData);
      console.log(userData);
      // 比對姓名與信箱是否一致
      if (userData.name === data.name && userData.email === data.email) {
        // 驗證成功，跳轉到結果頁面
        router.push('/search/result');
      } else {
        setErrorMsg("入力された情報が見つかりません。内容を確認してください。");
      }
    } else {
      setErrorMsg("登録されたデータがありません。");
    }
  };

  const getFieldStyle = (fieldName: keyof SearchFormData) => {
    return `w-full pl-10 pr-4 py-3 border rounded-xl transition-all ${
      errors[fieldName] || errorMsg ? 
          "border-red-500 text-red-500 bg-red-50 focus:ring-1 focus:ring-red-500" 
          : "border-gray-300 focus:border-blue-500 text-gray-900 focus:ring-1 focus:ring-blue-500"
    }`;
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="h-2 bg-emerald-500 w-full" />
        <div className="p-8">
          <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-emerald-600 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-1" /> ホームページへ
          </Link>

          <h1 className="text-2xl font-bold text-gray-800 mb-2">アカウント照会</h1>
          <p className="text-gray-500 mb-8">登録した情報を入力して、詳細を確認してください。</p>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            {/* 錯誤訊息提示 */}
            {errorMsg && <p className="text-red-600 text-sm bg-red-100 p-2 rounded text-center font-medium">{errorMsg}</p>}

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">お名前</label>
              <div className="relative">
                <User className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input {...register("name")} className={getFieldStyle("name")} placeholder="漢字で入力" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">メールアドレス</label>
              <div className="relative">
                <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-400" />
                <input {...register("email")} className={getFieldStyle("email")} placeholder="example@mail.com" />
              </div>
            </div>

            <button type="submit" className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-all shadow-lg">
              検索する
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}