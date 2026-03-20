import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { id, password } = await request.json();

    // Hash password ใหม่ด้วย salt 10 rounds
    const hashedPassword = await bcrypt.hash(password, 10);

    // อัปเดต hashed password ในฐานข้อมูล
    const { error } = await supabase
      .from("user_tb")
      .update({ password: hashedPassword })
      .eq("id", id);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 400 }
      );
    }

    return NextResponse.json({ message: "อัปเดตรหัสผ่านสำเร็จ" });
  } catch {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในระบบ" },
      { status: 500 }
    );
  }
}
