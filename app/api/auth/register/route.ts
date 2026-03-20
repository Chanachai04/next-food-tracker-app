import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { fullname, email, password, gender, user_image_url } =
      await request.json();

    // Hash password ด้วย salt 10 rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // บันทึกข้อมูลลง user_tb ด้วย hashed password
    const { error } = await supabase.from("user_tb").insert({
      fullname,
      email,
      password: hashedPassword,
      gender,
      user_image_url,
    });

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "ลงทะเบียนสำเร็จ" });
  } catch {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในระบบ" },
      { status: 500 }
    );
  }
}
