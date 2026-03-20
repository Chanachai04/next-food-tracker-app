"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function Register() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [image_file, setImageFile] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");

  const router = useRouter();
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setImageFile(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // บันทึกรูปภาพไปยัง Supabase Storage
    let image_url = "";
    if (image_file) {
      const new_image_file_name = `${Date.now()}-${image_file.name}`;

      // อัปโหลดรูปภาพไปยัง Supabase Storage
      const { error } = await supabase.storage
        .from("user_bk")
        .upload(new_image_file_name, image_file);
      if (error) {
        alert("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
        console.log(error.message);
        return;
      } else {
        // get url ของรูปภาพที่อัปโหลด
        const { data } = supabase.storage
          .from("user_bk")
          .getPublicUrl(new_image_file_name);
        image_url = data.publicUrl;
      }
    }

    // บันทึกข้อมูลผ่าน API route (hash password ฝั่ง server)
    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullname: fullName,
        email: email,
        password: password,
        gender: gender,
        user_image_url: image_url,
      }),
    });

    const result = await res.json();

    if (!res.ok) {
      alert(result.error || "เกิดข้อผิดพลาดในการลงทะเบียน");
      console.log(result.error);
      return;
    } else {
      alert("บันทึกข้อมูลเรียบร้อย");
      setFullName("");
      setEmail("");
      setPassword("");
      setGender("");
      setPreviewImage(null);
      image_url = "";
      router.push("/login");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white to-blue-50 p-4 text-slate-800 relative overflow-hidden py-10">
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/50 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-md rounded-[2rem] bg-white/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl border border-white/50 z-10">
        <h1 className="mb-8 text-center text-3xl font-extrabold text-blue-600 tracking-tight">
          ลงทะเบียน
        </h1>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label
              htmlFor="name"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              ชื่อ-นามสกุล
            </label>
            <input
              id="name"
              type="text"
              placeholder="กรอกชื่อ-นามสกุลของคุณ"
              className="w-full rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

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
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-slate-700">
              เพศ
            </label>
            <div className="flex space-x-6">
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 transition-all"
                  onChange={(e) => setGender(e.target.value)}
                />
                <span className="ml-2 text-slate-700 font-medium">ชาย</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 transition-all"
                  onChange={(e) => setGender(e.target.value)}
                />
                <span className="ml-2 text-slate-700 font-medium">หญิง</span>
              </label>
            </div>
          </div>

          <div>
            <label
              htmlFor="profileImage"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              รูปโปรไฟล์
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full rounded-xl border border-slate-200 bg-white/50 p-2 text-sm text-slate-500 file:mr-4 file:cursor-pointer file:rounded-lg file:border-0 file:bg-blue-50 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-blue-700 hover:file:bg-blue-100 transition-all"
            />
          </div>

          {previewImage && (
            <div className="mb-6 text-center animate-fade-in">
              <p className="text-sm font-semibold text-slate-700 mb-3">ตัวอย่างรูปโปรไฟล์</p>
              <div className="relative mx-auto h-32 w-32 overflow-hidden rounded-full border-4 border-blue-100 shadow-xl">
                <Image
                  src={previewImage}
                  alt="Profile Preview"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          )}

          <button
            type="submit"
            className="w-full mt-4 transform rounded-full bg-blue-600 py-3 font-bold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-600/50 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
          >
            ลงทะเบียน (Register)
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-slate-600">
          มีบัญชีผู้ใช้แล้วใช่ไหม?{" "}
          <Link
            href="/login"
            className="font-bold text-blue-600 hover:text-blue-700 hover:underline transition-colors"
          >
            เข้าสู่ระบบที่นี่
          </Link>
        </div>
      </div>
    </div>
  );
}
