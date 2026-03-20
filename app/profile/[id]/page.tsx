"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function Profile() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [image_file, setImageFile] = useState<File | null>(null);
  const [old_image_file, setOldImageFile] = useState<string>("");

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [gender, setGender] = useState("");
  const { id } = useParams();
  const router = useRouter();
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("user_tb")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert("พบปัญหาในการดึงข้อมูลผู้ใช้");
        console.log(error.message);
        return;
      }

      if (data) {
        setFullName(data.fullname);
        setEmail(data.email);
        // ไม่โหลด hashed password กลับมาแสดงในฟอร์ม
        setGender(data.gender);
        setPreviewImage(data.user_image_url);
        setOldImageFile(data.user_image_url);
      }
    };
    fetchData();
  }, [id]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result as string);
      reader.readAsDataURL(file);
      setImageFile(file);
    } else {
      setPreviewImage(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let image_url = old_image_file;

    if (image_file) {
      if (old_image_file) {
        const oldImageName = old_image_file.split("/").pop();
        if (oldImageName) {
          const { error: removeError } = await supabase.storage
            .from("user_bk")
            .remove([oldImageName]);
          if (removeError) {
            console.log("ลบรูปเก่าไม่สำเร็จ:", removeError.message);
          }
        }
      }

      const fileExt = image_file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("user_bk")
        .upload(fileName, image_file);

      if (uploadError) {
        alert("อัปโหลดรูปภาพไม่สำเร็จ");
        console.log(uploadError.message);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("user_bk")
        .getPublicUrl(fileName);

      image_url = urlData.publicUrl;
    }

    // ถ้ามีการเปลี่ยนรหัสผ่าน → hash ผ่าน API route
    if (newPassword) {
      const pwRes = await fetch("/api/auth/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, password: newPassword }),
      });

      if (!pwRes.ok) {
        const pwResult = await pwRes.json();
        alert(pwResult.error || "อัปเดตรหัสผ่านไม่สำเร็จ");
        return;
      }
    }

    // อัปเดตข้อมูลอื่นๆ (ยกเว้น password)
    const { error: updateError } = await supabase
      .from("user_tb")
      .update({
        fullname: fullName,
        email,
        gender,
        user_image_url: image_url,
      })
      .eq("id", id);

    if (updateError) {
      alert("อัปเดตข้อมูลไม่สำเร็จ");
      console.log(updateError.message);
    } else {
      alert("บันทึกข้อมูลเรียบร้อยแล้ว");
      setOldImageFile(image_url);
      setImageFile(null);
      setNewPassword("");
      router.push("/dashboard/" + id);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white to-blue-50 p-4 relative overflow-hidden py-10">
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/50 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-md rounded-[2rem] bg-white/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl border border-white/50 z-10">
        <h1 className="mb-8 text-center text-3xl font-extrabold text-blue-600 tracking-tight">
          แก้ไขข้อมูลโปรไฟล์
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Image Preview */}
          <div className="text-center">
            <p className="mb-3 text-sm font-semibold text-slate-700">รูปโปรไฟล์</p>
            <div className="relative mx-auto mb-5 h-32 w-32 overflow-hidden rounded-full border-4 border-blue-100 shadow-xl">
              {previewImage ? (
                <Image
                  src={previewImage}
                  alt="Profile Preview"
                  fill
                  style={{ objectFit: "cover" }}
                />
              ) : (
                <Image
                  src={"/default-profile.png"}
                  alt="Profile Preview"
                  fill
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>

            <label
              htmlFor="profileImage"
              className="inline-flex cursor-pointer items-center justify-center rounded-full border border-blue-500 bg-blue-50 px-6 py-2.5 font-semibold text-blue-700 transition-colors hover:bg-blue-100 shadow-sm"
            >
              เลือกรูปภาพใหม่
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
          </div>

          {/* Form Inputs */}
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
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
              required
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              รหัสผ่านใหม่ (เว้นว่างหากไม่ต้องการเปลี่ยน)
            </label>
            <input
              id="password"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
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
                  checked={gender === "male"}
                  onChange={() => setGender("male")}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 transition-all"
                />
                <span className="ml-2 text-slate-700 font-medium">ชาย</span>
              </label>
              <label className="inline-flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  checked={gender === "female"}
                  onChange={() => setGender("female")}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-slate-300 transition-all"
                />
                <span className="ml-2 text-slate-700 font-medium">หญิง</span>
              </label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex pt-4 space-x-4">
            <Link href={"/dashboard/" + id} className="w-1/2">
              <div className="w-full transform rounded-full border border-slate-300 bg-white/50 py-3 text-center font-bold text-slate-600 shadow-sm transition-all hover:bg-white hover:text-slate-800 active:scale-95">
                ย้อนกลับ
              </div>
            </Link>
            <button
              type="submit"
              className="w-1/2 transform rounded-full bg-blue-600 py-3 font-bold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-600/50 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
            >
              บันทึกแก้ไข
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
