"use client";

import { supabase } from "@/lib/supabaseClient";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
type Foods = {
  id: string;
  foodname: string;
  meal: string;
  fooddate_at: string;
  food_image_url: string;
  user_id: string;
  created_at: string;
  update_at: string;
};
type UserTackers = {
  id: string;
  fullname: string;
  email: string;
  password: string;
  gender: string;
  user_image_url: string;
  created_at: string;
  update_at: string;
};
export default function Dashboard() {
  const [foods, setFoods] = useState<Foods[]>([]);
  const [users, setUsers] = useState<UserTackers[]>([]);
  const { id } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase
        .from("food_td")
        .select("*")
        .eq("user_id", id);
      if (error) {
        alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
        console.log(error);
        return;
      }
      if (data) {
        setFoods(data as Foods[]);
      }
    };
    const getUsers = async () => {
      const { data, error } = await supabase
        .from("user_tb")
        .select("*")
        .eq("id", id);

      if (error) {
        alert("An error occurred while fetching user data.");
        console.log(error);
        return;
      }
      if (data) {
        setUsers(data as UserTackers[]);
      }
    };
    fetchData();
    getUsers();
  }, [id]);

  const handleDelete = async (foodId: string, image_url: string) => {
    if (confirm("คุณต้องการลบรายการอาหารนี้ใช่หรือไม่")) {
      if (image_url) {
        const image_name = image_url.split("/").pop();
        const { error } = await supabase.storage
          .from("task_bk")
          .remove([image_name as string]);
        if (error) {
          alert("พบปัญหาในการลบรูปภาพ ออกจาก Storage");
          console.log(error.message);
          return;
        }
      }

      const { error } = await supabase
        .from("food_td")
        .delete()
        .eq("id", foodId);
      if (error) {
        alert("พบปัญหาในการลบข้อมูล");
        console.log(error.message);
        return;
      }

      setFoods(foods.filter((food) => food.id !== foodId));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white to-blue-50 p-4 sm:p-8 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/50 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="container mx-auto max-w-5xl rounded-[2rem] bg-white/80 backdrop-blur-xl p-6 sm:p-10 shadow-2xl border border-white/50 z-10 relative">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-extrabold text-blue-600 tracking-tight">
            Food Dashboard
          </h1>
          {users.map((user) => (
            <Link href={"/profile/" + user.id} key={user.id} className="transition-transform hover:scale-110 active:scale-95">
              <Image
                src={user.user_image_url || "/default-profile.png"}
                alt="User Profile"
                width={100}
                height={100}
                className="w-12 h-12 rounded-full object-cover border-2 border-blue-200 shadow-md"
              />
            </Link>
          ))}
        </div>

        {/* Search Bar and Add Food Button */}
        <div className="mb-8 flex flex-col items-center justify-between gap-4 md:flex-row">
          <Link href={"/addfood/" + id} className="w-full md:w-auto">
            <div className="w-full text-center rounded-full bg-blue-600 px-8 py-3 font-bold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-600/50 active:scale-95">
              + เพิ่มรายการอาหาร (Add Food)
            </div>
          </Link>
        </div>

        {/* Food List Table */}
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm border border-slate-100">
          <table className="min-w-full text-left text-sm whitespace-nowrap">
            <thead className="bg-slate-50/80 text-slate-600 uppercase tracking-wider text-xs border-b border-slate-200">
              <tr>
                <th className="px-6 py-4 font-semibold rounded-tl-2xl">ชื่ออาหาร (Food Name)</th>
                <th className="px-6 py-4 font-semibold">มื้ออาหาร (Meal)</th>
                <th className="px-6 py-4 font-semibold text-right rounded-tr-2xl">การจัดการ (Actions)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {foods.length === 0 ? (
                <tr>
                  <td colSpan={3} className="px-6 py-10 text-center text-slate-500 font-medium">ไม่มีรายการอาหารในขณะนี้</td>
                </tr>
              ) : (
                foods.map((food, key) => (
                  <tr key={key} className="hover:bg-blue-50/50 transition-colors">
                    <td className="px-6 py-4 font-medium text-slate-800">{food.foodname}</td>
                    <td className="px-6 py-4 text-slate-600 capitalize">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {food.meal}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                       <Link href={`/updatefood/${food.id}`}>
                        <button className="transform rounded-full bg-white border border-blue-500 px-4 py-2 text-sm font-semibold text-blue-600 shadow-sm transition-all hover:bg-blue-50 focus:ring-2 focus:ring-blue-200 active:scale-95">
                          แก้ไข
                        </button>
                      </Link>
                      <button
                        onClick={() => handleDelete(food.id, food.food_image_url)}
                        className="transform rounded-full bg-red-50 px-4 py-2 text-sm font-semibold text-red-600 border border-red-200 shadow-sm transition-all hover:bg-red-100 focus:ring-2 focus:ring-red-200 active:scale-95"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
