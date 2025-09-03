"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

// Define a type for our food item
type FoodItem = {
  id: number;
  name: string;
  mealType: string;
};

// Mock data for food items
const MOCK_FOOD_DATA: FoodItem[] = [
  { id: 1, name: "ผัดไทย", mealType: "มื้อเย็น" },
  { id: 2, name: "ข้าวผัดกะเพรา", mealType: "มื้อกลางวัน" },
  { id: 3, name: "ส้มตำ", mealType: "มื้อกลางวัน" },
  { id: 4, name: "ข้าวมันไก่", mealType: "มื้อเย็น" },
  { id: 5, name: "ก๋วยเตี๋ยวเรือ", mealType: "มื้อเช้า" },
  { id: 6, name: "ผัดซีอิ๊ว", mealType: "มื้อเย็น" },
  { id: 7, name: "ต้มยำกุ้ง", mealType: "มื้อกลางวัน" },
  { id: 8, name: "แกงเขียวหวาน", mealType: "มื้อกลางวัน" },
  { id: 9, name: "ยำวุ้นเส้น", mealType: "มื้อเย็น" },
  { id: 10, name: "ไข่เจียว", mealType: "มื้อเช้า" },
];

const ITEMS_PER_PAGE = 5;

export default function Dashboard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const router = useRouter();
  // Filter data based on search term
  const filteredData = MOCK_FOOD_DATA.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate items for the current page
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentItems = filteredData.slice(startIndex, endIndex);

  // Calculate total pages
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1 on new search
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleEdit = (id: number) => {
    router.push("/updatefood");
    console.log(`Edit food item with ID: ${id}`);
    // Add logic to navigate to an edit page or show a modal
  };

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
          <div className="flex w-full md:w-auto">
            <input
              type="text"
              placeholder="ค้นหาชื่ออาหาร..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full rounded-l-lg border border-gray-300 p-2 focus:border-blue-500 focus:outline-none"
            />
            <button
              onClick={() => console.log("Searching...")}
              className="rounded-r-lg bg-blue-600 px-4 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
            >
              ค้นหา
            </button>
          </div>
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
              {currentItems.length > 0 ? (
                currentItems.map((item) => (
                  <tr
                    key={item.id}
                    className="border-b border-gray-200 hover:bg-gray-50"
                  >
                    <td className="px-6 py-4">{item.name}</td>
                    <td className="px-6 py-4">{item.mealType}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleEdit(item.id)}
                        className="mr-2 rounded-md bg-yellow-500 px-3 py-1 text-white hover:bg-yellow-600"
                      >
                        แก้ไข
                      </button>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="rounded-md bg-red-500 px-3 py-1 text-white hover:bg-red-600"
                      >
                        ลบ
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={3}
                    className="px-6 py-4 text-center text-gray-500"
                  >
                    ไม่พบข้อมูลอาหารที่ตรงกับคำค้นหา
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center space-x-2">
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index}
                onClick={() => handlePageChange(index + 1)}
                className={`rounded-md px-4 py-2 font-semibold transition-colors ${
                  currentPage === index + 1
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {index + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
