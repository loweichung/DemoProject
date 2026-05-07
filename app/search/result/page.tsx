"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
  Eye, 
  EyeOff, 
  User, 
  Mail, 
  MapPin, 
  Calendar, 
  UserCircle, 
  ArrowLeft, 
  Lock,
  Trash2
} from 'lucide-react';

interface UserDataType {
  name: string;
  katakana: string;
  gender: string;
  birthday: string;
  email: string;
  address: string;
  password: string;
  note?: string;
}

export default function ResultPage() {
  const router = useRouter();
  const [user, setUser] = useState<UserDataType | null>(() => {
    if (typeof window === 'undefined') return null;
    const savedData = localStorage.getItem('userData');
    return savedData ? JSON.parse(savedData) : null;
  });
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
        if (!user) {
      router.push('/search');
    }
  }, [router, user]);

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-gray-500">
        読み込み中...
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 py-10 px-4 flex flex-col items-center">
      <div className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-gray-100">
        <div className="h-3 bg-blue-500 w-full" />
        <div className="p-8 md:p-12">
          <div className="flex justify-between items-center mb-10">
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-2">
              <UserCircle className="w-8 h-8 text-blue-500" />
              アカウント詳細
            </h1>
            <Link href="/search" className="text-sm text-gray-400 hover:text-blue-500 flex items-center gap-1 transition-colors">
              <ArrowLeft className="w-4 h-4" /> 戻る
            </Link>
          </div>

          <div className="space-y-8">
            {/* 兩欄式顯示資料 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
              
              <DataField icon={<User />} label="氏名" value={user.name} />
              <DataField icon={<UserCircle />} label="フリガナ" value={user.katakana} />
              
              <DataField icon={<Calendar />} label="生年月日" value={user.birthday} />
              <DataField 
                icon={<User />} 
                label="性別" 
                value={user.gender === 'male' ? '男性' : user.gender === 'female' ? '女性' : 'その他'} 
              />

              <div className="md:col-span-2">
                <DataField icon={<Mail />} label="メールアドレス" value={user.email} />
              </div>

              <div className="md:col-span-2">
                <DataField icon={<MapPin />} label="住所" value={user.address} />
              </div>

              {/* 密碼欄位：具備切換功能 */}
              <div className="md:col-span-2 bg-gray-50 p-4 rounded-2xl border border-gray-100 transition-all hover:bg-gray-100">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="bg-blue-100 p-2 rounded-lg text-blue-600">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs text-gray-400 font-bold">パスワード</p>
                      <p className="text-lg font-mono tracking-wider text-gray-800">
                        {showPassword ? user.password : "••••••••••••"}
                      </p>
                    </div>
                  </div>
                  <button 
                    onClick={() => setShowPassword(!showPassword)}
                    className="p-3 text-gray-400 hover:text-blue-600 hover:bg-white rounded-full transition-all shadow-sm"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>
            </div>

            {/* 備註欄位 */}
            <div className="bg-amber-50 p-6 rounded-2xl border border-amber-100">
              <p className="text-xs text-amber-600 font-bold mb-2 uppercase tracking-widest">備考</p>
              <p className="text-gray-700 leading-relaxed italic">
                {user.note || "記入なし"}
              </p>
            </div>
          </div>

          {/* 按鈕區域 */}
          <div className="mt-12 flex flex-col md:flex-row gap-4">
            <Link 
              href="/" 
              className="flex-1 bg-gray-900 text-white text-center py-4 rounded-2xl font-bold hover:bg-black transition-all shadow-lg active:scale-95"
            >
              ホームへ戻る
            </Link>
            <button 
              onClick={() => {
                if(confirm("データを削除してログアウトしますか？")) {
                  localStorage.removeItem('userData');
                  router.push('/');
                }
              }}
              className="flex-1 border-2 border-red-100 text-red-500 py-4 rounded-2xl font-bold hover:bg-red-50 hover:border-red-200 transition-all flex items-center justify-center gap-2"
            >
              <Trash2 className="w-5 h-5" />
              データを削除
            </button>
          </div>
        </div>
      </div>
      
      <p className="mt-8 text-gray-400 text-xs">
        ※ このデータはブラウザのローカルストレージに保存されています
      </p>
    </main>
  );
}

// 輔助組件：顯示單行資料
function DataField({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
  return (
    <div className="flex items-start gap-3">
      <div className="mt-1 text-gray-300">
        {icon}
      </div>
      <div>
        <p className="text-xs text-gray-400 font-bold uppercase tracking-tight">{label}</p>
        <p className="text-lg text-gray-800 font-medium">{value || "---"}</p>
      </div>
    </div>
  );
}