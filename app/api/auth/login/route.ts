import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { supabase } from "@/lib/supabaseClient";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    // ดึง user จาก Supabase ด้วย email
    const { data, error } = await supabase
      .from("user_tb")
      .select("*")
      .eq("email", email)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 },
      );
    }

    // เปรียบเทียบ password ที่กรอกกับ hashed password ในฐานข้อมูล
    const isMatch = await bcrypt.compare(password, data.password);

    if (!isMatch) {
      return NextResponse.json(
        { error: "อีเมลหรือรหัสผ่านไม่ถูกต้อง" },
        { status: 401 },
      );
    }

    // ส่ง user data กลับ (ไม่ส่ง password กลับ)
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password: _password, ...userWithoutPassword } = data;
    return NextResponse.json({ user: userWithoutPassword });
  } catch {
    return NextResponse.json(
      { error: "เกิดข้อผิดพลาดในระบบ" },
      { status: 500 },
    );
  }
}
