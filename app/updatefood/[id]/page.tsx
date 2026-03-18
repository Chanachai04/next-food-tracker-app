"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function EditFood() {
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [image_file, setImageFile] = useState<File | null>(null);
  const { id } = useParams();
  const [foodname, setFoodName] = useState("");
  const [meal, setMeal] = useState("");
  const [foodDateAt, setFoodDateAt] = useState("");
  const [old_image_file, setOldImageFile] = useState<string>("");
  const [userId, setUserId] = useState("");
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("food_td")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        alert("พบปัญหาในการดึงข้อมูลงานเก่า");
        console.log(error.message);
        return;
      }

      if (data) {
        setUserId(data.user_id);
        setFoodName(data.foodname);
        setMeal(data.meal);
        let formattedDate = "";
        const rawDate = data.fooddate_at;

        if (rawDate) {
          if (rawDate.includes("/")) {
            const [mm, dd, yyyy] = rawDate.split("/");
            formattedDate = `${yyyy}-${mm.padStart(2, "0")}-${dd.padStart(
              2,
              "0"
            )}`;
          } else if (rawDate.includes("T")) {
            formattedDate = new Date(rawDate).toISOString().split("T")[0];
          } else {
            formattedDate = rawDate;
          }
        }

        setFoodDateAt(formattedDate);
        setUserId(data.user_id);
        setPreviewImage(data.food_image_url);
        setOldImageFile(data.food_image_url);
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

  const handleUploadAndUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    let image_url = old_image_file;

    if (image_file) {
      if (old_image_file) {
        const oldImageName = old_image_file.split("/").pop();
        if (oldImageName) {
          const { error: removeError } = await supabase.storage
            .from("food_bk")
            .remove([oldImageName]);
          if (removeError) {
            console.log("ลบรูปเก่าไม่สำเร็จ:", removeError.message);
          }
        }
      }

      const fileExt = image_file.name.split(".").pop();
      const fileName = `${Date.now()}.${fileExt}`;

      const { error: uploadError } = await supabase.storage
        .from("food_bk")
        .upload(fileName, image_file);

      if (uploadError) {
        alert("อัปโหลดรูปภาพไม่สำเร็จ");
        console.log(uploadError.message);
        return;
      }

      const { data: urlData } = supabase.storage
        .from("food_bk")
        .getPublicUrl(fileName);

      image_url = urlData.publicUrl;
    }

    const { error: updateError } = await supabase
      .from("food_td")
      .update({
        foodname,
        meal,
        food_image_url: image_url,
        fooddate_at: foodDateAt,
        updated_at: new Date().toISOString(),
      })
      .eq("id", id);

    if (updateError) {
      alert("เกิดข้อผิดพลาดในการบันทึกการแก้ไขข้อมูล");
      console.error(updateError.message);
      return;
    } else {
      alert("บันทึกแก้ไขข้อมูลเรียบร้อย");
      setOldImageFile(image_url);
      setImageFile(null);
      router.push(`/dashboard/${userId}`);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-white to-blue-50 p-4 relative overflow-hidden py-10">
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/50 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="w-full max-w-md rounded-[2rem] bg-white/80 backdrop-blur-xl p-8 sm:p-10 shadow-2xl border border-white/50 z-10">
        <h1 className="mb-8 text-center text-3xl font-extrabold text-blue-600 tracking-tight">
          แก้ไขรายการอาหาร
        </h1>

        <form onSubmit={handleUploadAndUpdate} className="space-y-5">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              ชื่ออาหาร
            </label>
            <input
              type="text"
              value={foodname}
              onChange={(e) => setFoodName(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              มื้ออาหาร
            </label>
            <select
              value={meal}
              onChange={(e) => setMeal(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all cursor-pointer"
              required
            >
              <option value="" disabled className="text-slate-400">เลือกมื้ออาหาร</option>
              <option value="breakfast">มื้อเช้า (Breakfast)</option>
              <option value="lunch">มื้อกลางวัน (Lunch)</option>
              <option value="dinner">มื้อเย็น (Dinner)</option>
              <option value="snack">ของว่าง (Snack)</option>
            </select>
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              วัน/เดือน/ปี
            </label>
            <input
              type="date"
              value={foodDateAt}
              onChange={(e) => setFoodDateAt(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white/50 p-3 text-slate-800 focus:border-blue-500 focus:bg-white focus:outline-none focus:ring-4 focus:ring-blue-500/20 transition-all"
              required
            />
          </div>

          <div>
            <label className="mb-1.5 block text-sm font-semibold text-slate-700">
              รูปอาหาร
            </label>
            <label
              htmlFor="foodImage"
              className="flex w-full cursor-pointer items-center justify-center rounded-xl border-2 border-dashed border-blue-300 bg-blue-50/50 py-4 font-semibold text-blue-600 transition-all hover:bg-blue-50 hover:border-blue-400"
            >
              เลือกรูปภาพใหม่ (อัปโหลด)
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

          <div className="flex pt-4 space-x-4">
            <Link href={`/dashboard/${userId}`} className="w-1/2">
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
