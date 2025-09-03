"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

// Mock data to simulate fetching an existing food item
const MOCK_FOOD_ITEM = {
  id: 1,
  name: "ผัดไทย",
  mealType: "dinner",
  date: "2025-09-03",
  image: "/default-food.png", // URL of the existing food image
};

export default function EditFood() {
  const [formData, setFormData] = useState({
    name: MOCK_FOOD_ITEM.name,
    mealType: MOCK_FOOD_ITEM.mealType,
    date: MOCK_FOOD_ITEM.date,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(
    MOCK_FOOD_ITEM.image
  );

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreviewImage(MOCK_FOOD_ITEM.image);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Logic to update the food item goes here
    console.log(`Updating food item with ID: ${MOCK_FOOD_ITEM.id}`, {
      ...formData,
      image: previewImage,
    });
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-2xl">
        <h1 className="mb-6 text-center text-3xl font-bold text-blue-600">
          แก้ไขรายการอาหาร
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Food Name Input */}
          <div>
            <label
              htmlFor="name"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              ชื่ออาหาร
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>

          {/* Meal Type Selection */}
          <div>
            <label
              htmlFor="mealType"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              มื้ออาหาร
            </label>
            <select
              id="mealType"
              value={formData.mealType}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            >
              <option value="">เลือกมื้ออาหาร</option>
              <option value="breakfast">มื้อเช้า</option>
              <option value="lunch">มื้อกลางวัน</option>
              <option value="dinner">มื้อเย็น</option>
              <option value="snack">ของว่าง</option>
            </select>
          </div>

          {/* Date Input */}
          <div>
            <label
              htmlFor="date"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              วัน/เดือน/ปี
            </label>
            <input
              id="date"
              type="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full rounded-md border border-gray-300 p-2 focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
              required
            />
          </div>

          {/* Image Input with Preview */}
          <div>
            <label
              htmlFor="foodImage"
              className="mb-1 block text-sm font-medium text-gray-700"
            >
              รูปอาหาร
            </label>
            <label
              htmlFor="foodImage"
              className="flex w-full cursor-pointer items-center justify-center rounded-md border border-blue-500 bg-blue-50 py-2.5 font-semibold text-blue-700 transition-colors hover:bg-blue-100"
            >
              เลือกรูปภาพใหม่
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
            <div className="text-center">
              <p className="mb-2 text-sm font-medium text-gray-700">
                Image Preview
              </p>
              <div className="relative mx-auto h-40 w-full overflow-hidden rounded-md border-2 border-blue-500 shadow-md">
                <Image
                  src={previewImage}
                  alt="Food Preview"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between space-x-4">
            <Link href="/dashboard" className="w-1/2">
              <div className="transform rounded-full border border-gray-300 bg-white py-2.5 text-center font-semibold text-gray-700 shadow-md transition-all duration-300 hover:scale-105 hover:bg-gray-100">
                ย้อนกลับ
              </div>
            </Link>
            <button
              type="submit"
              className="w-1/2 transform rounded-full bg-blue-600 py-2.5 font-semibold text-white shadow-md transition-all duration-300 hover:scale-105 hover:bg-blue-700"
            >
              บันทึก
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
