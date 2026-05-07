import React from 'react';
import Link from 'next/link';
import { UserPlus, Search } from 'lucide-react';

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="max-w-4xl w-full text-center">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          アカウント管理ページ
        </h1>
        <p className="text-lg text-gray-600 mb-12">
          操作したい選択肢を押してください
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* 選項一：開創新帳號 */}
          <Link href="/register" className="group">
            <div className="h-64 flex flex-col items-center justify-center bg-white border-2 border-transparent rounded-2xl shadow-sm hover:shadow-xl hover:border-blue-500 transition-all duration-300 p-8">
              <div className="bg-blue-100 p-4 rounded-full mb-6 group-hover:bg-blue-500 transition-colors duration-300">
                <UserPlus className="w-10 h-10 text-blue-600 group-hover:text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">新しいアカウントを作成</h2>
              <p className="text-gray-500 mt-2 text-center">
                新しいアカウントを作成して、チームに入りましょう。
              </p>
            </div>
          </Link>

          {/* 選項二：查詢帳號 */}
          <Link href="/search" className="group">
            <div className="h-64 flex flex-col items-center justify-center bg-white border-2 border-transparent rounded-2xl shadow-sm hover:shadow-xl hover:border-emerald-500 transition-all duration-300 p-8">
              <div className="bg-emerald-100 p-4 rounded-full mb-6 group-hover:bg-emerald-500 transition-colors duration-300">
                <Search className="w-10 h-10 text-emerald-600 group-hover:text-white" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800">アカウントを探す</h2>
              <p className="text-gray-500 mt-2 text-center">
                ユーザー情報でアカウントを探しましょう。
              </p>
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}