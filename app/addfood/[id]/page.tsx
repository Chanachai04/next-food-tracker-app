"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { supabase } from "@/lib/supabaseClient";
import { useParams, useRouter } from "next/navigation";

export default function AddFood() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [image_file, setImageFile] = useState<File | null>(null);
  const [foodname, setFoodname] = useState("");
  const [meal, setMeal] = useState("");
  const [fooddate_at, setFooddate_at] = useState("");

  const { id } = useParams();

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

    let image_url = "";
    if (image_file) {
      const new_image_file_name = `${Date.now()}-${image_file.name}`;

      // อัปโหลดรูปภาพไปยัง Supabase Storage
      const { error } = await supabase.storage
        .from("food_bk")
        .upload(new_image_file_name, image_file);
      if (error) {
        alert("เกิดข้อผิดพลาดในการอัปโหลดรูปภาพ");
        console.log(error.message);
        return;
      } else {
        // get url ของรูปภาพที่อัปโหลด
        const { data } = supabase.storage
          .from("food_bk")
          .getPublicUrl(new_image_file_name);
        image_url = data.publicUrl;
      }
    }

    const { data, error } = await supabase.from("food_td").insert({
      foodname: foodname,
      meal: meal,
      fooddate_at: fooddate_at,
      food_image_url: image_url,
      user_id: id,
    });

    if (error) {
      alert("เกิดข้อผิดพลาดในการเพิ่มรายการอาหาร");
      console.log(error);
      return;
    } else {
      alert("รายการอาหารถูกเพิ่มเรียบร้อยแล้ว");
      console.log(data);
      setFoodname("");
      setMeal("");
      setFooddate_at("");
      setPreviewImage(null);
      image_url = "";
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
          เพิ่มรายการอาหาร
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Food Name Input */}
          <div>
            <label
              htmlFor="foodName"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              ชื่ออาหาร
            </label>
            <input
              id="foodName"
              type="text"
              placeholder="กรอกชื่ออาหาร"
              className="w-full rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
              value={foodname}
              onChange={(e) => setFoodname(e.target.value)}
              required
            />
          </div>

          {/* Meal Type Selection */}
          <div>
            <label
              htmlFor="mealType"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              มื้ออาหาร
            </label>
            <select
              id="mealType"
              className="w-full rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all cursor-pointer"
              value={meal}
              onChange={(e) => setMeal(e.target.value)}
              required
            >
              <option value="" disabled className="text-slate-400">เลือกมื้ออาหาร</option>
              <option value="breakfast">มื้อเช้า (Breakfast)</option>
              <option value="lunch">มื้อกลางวัน (Lunch)</option>
              <option value="dinner">มื้อเย็น (Dinner)</option>
              <option value="snack">ของว่าง (Snack)</option>
            </select>
          </div>

          {/* Date Input */}
          <div>
            <label
              htmlFor="date"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              วัน/เดือน/ปี
            </label>
            <input
              id="date"
              type="date"
              className="w-full rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
              value={fooddate_at}
              onChange={(e) => setFooddate_at(e.target.value)}
              required
            />
          </div>

          {/* Image Input with Preview */}
          <div>
            <label
              htmlFor="foodImage"
              className="mb-1.5 block text-sm font-semibold text-slate-700"
            >
              รูปอาหาร
            </label>
            <label
              htmlFor="foodImage"
              className="flex w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/50 py-4 font-semibold text-blue-600 transition-all hover:bg-blue-50 hover:border-blue-400"
            >
              เลือกรูปภาพ (อัปโหลด)
            </label>
            <input
              id="foodImage"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="sr-only"
            />
          </div>

          {previewImage && (
            <div className="text-center animate-fade-in mt-4">
              <p className="mb-3 text-sm font-semibold text-slate-700">
                ตัวอย่างรูปภาพ (Preview)
              </p>
              <div className="relative mx-auto h-40 w-full overflow-hidden rounded-xl border-4 border-blue-100 shadow-xl">
                <Image
                  src={previewImage}
                  alt="Food Preview"
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            </div>
          )}

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
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
