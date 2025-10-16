"use client";

import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";
import { useRouter } from "next/navigation";
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

export default function Dashboard() {
  const router = useRouter();
  const [foods, setFoods] = useState<Foods[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await supabase.from("food_td").select("*");
      if (error) {
        alert("เกิดข้อผิดพลาดในการดึงข้อมูล");
        console.log(error);
        return;
      }
      if (data) {
        setFoods(data as Foods[]);
      }
    };
    fetchData();
  }, []);

  const handleDelete = (id: number) => {
    console.log(`Delete food item with ID: ${id}`);
    // Add logic to delete the item from the data source
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="container mx-auto max-w-4xl rounded-lg bg-white p-6 shadow-lg">
        <h1 className="mb-6 text-3xl font-bold text-blue-600">
          Food Dashboard
        </h1>

        {/* Search Bar and Add Food Button */}
        <div className="mb-6 flex flex-col items-center justify-between gap-4 md:flex-row">
          <Link href="/addfood">
            <div className="w-full transform rounded-full bg-green-500 px-6 py-2 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-green-600 md:w-auto">
              + Add Food
            </div>
          </Link>
        </div>

        {/* Food List Table */}
        <div className="overflow-x-auto">
          <table className="min-w-full rounded-lg bg-white shadow-md">
            <thead>
              <tr className="bg-gray-200 text-left text-gray-700">
                <th className="px-6 py-3 font-semibold">ชื่ออาหาร</th>
                <th className="px-6 py-3 font-semibold">มื้ออาหาร</th>
                <th className="px-6 py-3 text-right font-semibold">
                  การจัดการ
                </th>
              </tr>
            </thead>
            <tbody>
              {foods.map((food, key) => (
                <tr key={key}>
                  <td className="px-6 py-3">{food.foodname}</td>
                  <td className="px-6 py-3">{food.meal}</td>
                  <td className="px-6 py-3 text-right">
                    <Link href={`/editfood/${food.id}`}>
                      <button className="mr-2 transform rounded-full bg-blue-500 px-4 py-2 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-600">
                        แก้ไข
                      </button>
                    </Link>
                    <button
                      onClick={() => handleDelete(Number(food.id))}
                      className="transform rounded-full bg-red-500 px-4 py-2 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-red-600"
                    >
                      ลบ
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
