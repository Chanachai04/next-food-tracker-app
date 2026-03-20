"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // เรียก API route เพื่อตรวจสอบรหัสผ่านด้วย bcrypt
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.error || "ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง");
      console.log(result.error);
      return;
    }

    router.push("/dashboard/" + result.user.id);
    console.log("Login form submitted!");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white to-blue-50 p-4 text-slate-800 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/50 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-md rounded-[2rem] bg-white/80 backdrop-blur-xl p-8 shadow-2xl border border-white/50 z-10">
        <h1 className="mb-6 text-center text-3xl font-extrabold text-blue-600 tracking-tight">
          เข้าสู่ระบบ
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="email"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              อีเมล
            </label>
            <input
              id="email"
              type="email"
              placeholder="กรอกอีเมลของคุณ"
              className="w-full rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              รหัสผ่าน
            </label>
            <input
              id="password"
              type="password"
              placeholder="กรอกรหัสผ่านของคุณ"
              className="w-full rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button
            type="submit"
            className="w-full mt-2 transform rounded-full bg-blue-600 py-3 font-bold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-600/50 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
          >
            เข้าสู่ระบบ (Login)
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-600">
          ยังไม่มีบัญชีผู้ใช้?{" "}
          <Link
            href="/register"
            className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            ลงทะเบียนที่นี่
          </Link>
        </div>
      </div>
    </div>
  );
}
