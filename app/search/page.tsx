"use client";

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Mail, Phone, ArrowLeft, CheckCircle2 } from 'lucide-react';

// 1. 定義搜尋驗證規則
const searchSchema = z.object({
  phoneNumber: z.string().min(8, "電話番号を入力してください"),
  email: z.string().email("メールアドレスを入力してください"),
});

type SearchFormData = z.infer<typeof searchSchema>;

export default function SearchPage() {
  const router = useRouter();
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    formState: { errors },
  } = useForm<SearchFormData>({
    resolver: zodResolver(searchSchema),
  });

  const onSubmit = (data: SearchFormData) => {
    console.log("捜索している:", data);
    // 模擬後端查詢邏輯
    setIsSubmitted(true);
  };

  // 統一樣式處理
  const getFieldStyle = (fieldName: keyof SearchFormData) => {
    return `w-full pl-10 pr-4 py-3 border rounded-lg focus:outline-none transition-all ${
      errors[fieldName]
        ? "border-red-500 bg-red-50 text-red-900"
        : "border-gray-300 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500"
    }`;
  };

  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        
        {/* 上方裝飾條 */}
        <div className="h-2 bg-emerald-500 w-full" />

        <div className="p-8">
          {!isSubmitted ? (
            <>
              <Link href="/" className="flex items-center text-sm text-gray-500 hover:text-emerald-600 mb-6 transition-colors">
                <ArrowLeft className="w-4 h-4 mr-1" /> ホームページへ戻ります
              </Link>

              <h1 className="text-2xl font-bold text-gray-800 mb-2">アカウント情報を探します</h1>
              <p className="text-gray-500 mb-8">お客様の情報を入力してください。アカウントの詳細をメールアドレス宛に送信いたします。</p>

              <form className="space-y-6">
                {/* 電話號碼 */}
                <div className="relative">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">登録した電話番号</label>
                  <div className="relative">
                    <Phone className={`absolute left-3 top-3.5 w-5 h-5 ${errors.phoneNumber ? "text-red-400" : "text-gray-400"}`} />
                    <input
                      {...register("phoneNumber")}
                      type="tel"
                      className={getFieldStyle("phoneNumber")}
                      placeholder="080-XXXX-XXXX"
                    />
                  </div>
                  {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber.message}</p>}
                </div>

                {/* 電子郵件 */}
                <div className="relative">
                  <label className="block text-sm font-semibold mb-2 text-gray-700">メールアドレス</label>
                  <div className="relative">
                    <Mail className={`absolute left-3 top-3.5 w-5 h-5 ${errors.email ? "text-red-400" : "text-gray-400"}`} />
                    <input
                      {...register("email")}
                      type="email"
                      className={getFieldStyle("email")}
                      placeholder="example@mail.com"
                    />
                  </div>
                  {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>}
                </div>

                <button
                  type="submit"
                  className="w-full bg-emerald-600 text-white font-bold py-3 rounded-xl hover:bg-emerald-700 transition-all shadow-lg active:scale-[0.98]"
                >
                  送信する
                </button>
              </form>
            </>
          ) : (
            /* 提交成功後的顯示視窗 */
            <div className="text-center py-8 animate-in fade-in zoom-in duration-300">
              <div className="flex justify-center mb-6">
                <div className="bg-emerald-100 p-4 rounded-full">
                  <CheckCircle2 className="w-16 h-16 text-emerald-600" />
                </div>
              </div>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">申請が提出されました！</h2>
              <p className="text-gray-600 mb-8 leading-relaxed">
                ご入力いただいた情報が正しければ、数分以内にアカウント情報がお客様のメールアドレスに送信されます。ご確認ください。
              </p>
              <button
                onClick={() => router.push('/')}
                className="w-full bg-gray-800 text-white font-bold py-3 rounded-xl hover:bg-gray-900 transition-all"
              >
                ホームページへ
              </button>
            </div>
          )}
        </div>
      </div>
    </main>
  );
}