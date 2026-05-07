"use client";

import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// 定義驗證規則
const registerSchema = z.object({
  name: z.string()
    .min(1, "氏名を入力してください")
    .regex(/^[\u4E00-\u9FAF]+$/, "漢字で入力してください"),
  katakana: z.string()
    .min(1, "フリガナを入力してください")
    .regex(/^[\u30A0-\u30FF]+$/, "全角カタカナで入力してください"),
  gender: z.enum(["male", "female", "other"], {
    error: "性別を選択してください"
  }),
  birthday: z.string().min(1, "生年月日を入力してください"),
  email: z.string().email("メールアドレスを入力してください"),
  address: z.string().min(1, "住所を入れてください"),
  password: z.string()
    .min(8, "パスワードは8桁以上にしてください")
    .regex(/[A-Z]/, "大文字アルファベットが必要です")
    .regex(/[a-z]/, "小文字アルファベットが必要です")
    .regex(/[0-9]/, "数字が必要です"),
  note: z.string().optional(),
});

// 定義 TypeScript 型別
type RegisterFormData = z.infer<typeof registerSchema>;

// 定義"必須"文字UI
const RequiredBadge = () => (
  <span className="ml-2 bg-red-700 text-white text-[11px] px-1.5 py-0.5 rounded-sm font-bold">
    必須
  </span>
);

// 定義"任意"文字UI
const OptionalBadge = () => (
  <span className="ml-2 bg-gray-400 text-white text-[11px] px-1.5 py-0.5 rounded-sm font-bold">
    任意
  </span>
);

export default function RegisterPage() {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onBlur",
  });

  // 處理提交邏輯
  const onSubmit = (data: RegisterFormData) => {
    try {
    console.log("提交的原始資料：", data);

    // 將資料轉為 JSON 字串並存入 localStorage
    localStorage.setItem('userData', JSON.stringify(data));

    // 驗證是否真的存進去了
    const check = localStorage.getItem('userData');
    console.log("檢查儲存結果：", check);

    alert("登録が完了しました！");
    router.push('/');
  } catch (error) {
    console.error("儲存失敗：", error);
  }
  };

  // 統一處理樣式：若有錯誤則變紅
  const getFieldStyle = (fieldName: keyof RegisterFormData) => {
    return `w-full px-4 py-2 border rounded-lg focus:outline-none transition-all ${
      errors[fieldName] 
        ? "border-red-500 text-red-500 bg-red-50 focus:ring-1 focus:ring-red-500" 
        : "border-gray-300 focus:border-blue-500 text-gray-900 focus:ring-1 focus:ring-blue-500"
    }`;
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4 flex items-center justify-center">
      <div className="max-w-xl w-full bg-white rounded-3xl shadow-xl overflow-hidden">
        <div className="h-2 bg-blue-500 w-full" />
        <div className="p-8">

        {/* 回主頁連結 */}
        <Link href="/" className="text-sm text-blue-600 hover:text-blue-800 transition-colors mb-6 inline-block">
          ← ホームページへ
        </Link>

        <h1 className="text-3xl font-bold text-gray-800 mb-2">アカウントを作成</h1>
        <p className="text-gray-500 mb-8">ユーザー情報を入力してください</p>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          
          {/* 姓名 */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">お名前 <RequiredBadge/></label>
            <input 
              {...register("name")} 
              className={getFieldStyle("name")} 
              placeholder="漢字で入れてください" 
            />
            {errors.name && <p className="text-red-500 text-xs mt-1 font-medium">{errors.name.message}</p>}
          </div>
          {/* 日文發音 */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">お名前(カナ) <RequiredBadge/></label>
            <input
                {...register("katakana")}
                className={getFieldStyle("katakana")}
                placeholder="カタカナで入力してください"
            />
            {errors.katakana && <p className="text-red-500 text-xs mt-1 font-medium">{errors.katakana.message}</p>}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 性別 */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">性別 <RequiredBadge/></label>
              <select {...register("gender")} className={getFieldStyle("gender")}>
                <option value="">選択してください</option>
                <option value="male">男性</option>
                <option value="female">女性</option>
                <option value="other">その他</option>
              </select>
              {errors.gender && <p className="text-red-500 text-xs mt-1 font-medium">{errors.gender.message}</p>}
            </div>

            {/* 出生年月日 */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">生年月日 <RequiredBadge/></label>
              <input type="date" {...register("birthday")} className={getFieldStyle("birthday")} />
              {errors.birthday && <p className="text-red-500 text-xs mt-1 font-medium">{errors.birthday.message}</p>}
            </div>
          </div>

          {/* 信箱 */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">メールアドレス <RequiredBadge/></label>
            <input 
              type="email" 
              {...register("email")} 
              className={getFieldStyle("email")} 
              placeholder="hello@example.com" 
            />
            {errors.email && <p className="text-red-500 text-xs mt-1 font-medium">{errors.email.message}</p>}
          </div>

          {/* 地址 */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">住所 <RequiredBadge/></label>
            <input 
              {...register("address")} 
              className={getFieldStyle("address")} 
              placeholder="住所を入力してください" 
            />
            {errors.address && <p className="text-red-500 text-xs mt-1 font-medium">{errors.address.message}</p>}
          </div>

          {/* 密碼 */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">パスワード <RequiredBadge/></label>
            <input 
              type="password" 
              {...register("password")} 
              className={getFieldStyle("password")} 
              placeholder="八桁以上，大文字と小文字、数字を含める必要があります" 
            />
            {errors.password && <p className="text-red-500 text-xs mt-1 font-medium">{errors.password.message}</p>}
          </div>

          {/* 備註 */}
          <div>
            <label className="block text-sm font-semibold mb-2 text-gray-700">備考 <OptionalBadge/></label>
            <textarea 
              {...register("note")} 
              className={getFieldStyle("note")} 
              rows={3} 
              placeholder="ご自由に入力してください" 
            />
          </div>

          {/* 提交按鈕 */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 transition-all shadow-md active:scale-[0.98]"
          >
            登録を確認します
          </button>
        </form>
        </div>
      </div>
    </main>
  );
}