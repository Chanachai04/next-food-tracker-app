<div align="center">
  <img src="https://github.com/user-attachments/assets/606945e3-5977-4fca-bfc0-e677cbb52bdd" alt="Food Tracker Banner" width="600" />
  <br/>
  <br/>
  <h1>🍔 Food Tracker</h1>
  <p><strong>แอปพลิเคชันบันทึกและติดตามการกินอาหาร โดดเด่นด้วยดีไซน์ทันสมัย<br/>พัฒนาด้วย Next.js, React, Tailwind CSS และ Supabase</strong></p>
</div>

<br/>

## ✨ ฟีเจอร์หลัก

- **บันทึกการกินอย่างง่ายดาย:** จดบันทึกและติดตามอาหารที่กินในแต่ละวันได้อย่างสะดวก
- **UI/UX ที่สวยงามและทันสมัย:** ออกแบบด้วย Tailwind CSS รองรับการใช้งานทุกขนาดหน้าจอได้อย่างสวยงาม
- **ทำงานรวดเร็ว:** ขับเคลื่อนด้วย Next.js App Router เพื่อประสิทธิภาพสูงสุดของการโหลดหน้าเว็บ
- **ระบบหลังบ้านที่ปลอดภัย:** จัดการฐานข้อมูลและระบบล็อกอินอย่างมั่นคงด้วย Supabase

## 💻 เทคโนโลยีที่ใช้

- **Framework:** [Next.js v15](https://nextjs.org/)
- **UI Library:** [React v19](https://react.dev/)
- **การตกแต่ง (Styling):** [Tailwind CSS v4](https://tailwindcss.com/)
- **ฐานข้อมูล (Backend/DB):** [Supabase](https://supabase.com/)
- **ภาษาโปรแกรม:** [TypeScript](https://www.typescriptlang.org/)

## 📸 ภาพตัวอย่างแอปพลิเคชัน

ชมหน้าตาของแอปพลิเคชันเบื้องต้น:

<details>
<summary><b>คลิกเพื่อดูรูปภาพเพิ่มเติม</b></summary>
<br/>

|                                                     Dashboard & Overview                                                      |                                                        Details & Forms                                                        |
| :---------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/user-attachments/assets/1a51b342-5ed8-468b-83c0-dcb1fe0e5576" alt="Screenshot 2" width="100%"/>  | <img src="https://github.com/user-attachments/assets/90d11b08-6d79-4102-8b90-5c1d1befa493" alt="Screenshot 3" width="100%" /> |
| <img src="https://github.com/user-attachments/assets/38b4a28f-9790-47ac-8147-c9a48fd68f95" alt="Screenshot 4" width="100%" /> | <img src="https://github.com/user-attachments/assets/252c4240-0b23-4d46-b711-f5462d6c5efe" alt="Screenshot 5" width="100%" /> |

<img src="https://github.com/user-attachments/assets/35ece88a-a4d8-4491-a6c2-939395ab7134" alt="Screenshot 6" width="100%" />

</details>

## 🚀 วิธีติดตั้งและเริ่มต้นใช้งาน

ทำตามขั้นตอนด้านล่างเพื่อรันโปรเจกต์นี้บนเครื่องของคุณ

### สิ่งที่ต้องมีเบื้องต้น (Prerequisites)

- [Node.js](https://nodejs.org/en) (แนะนำให้ใช้เวอร์ชัน 20 ขึ้นไป)
- npm, yarn, pnpm, หรือ bun

### ขั้นตอนการติดตั้ง

1. **โคลน (Clone) โปรเจกต์นี้:**

   ```bash
   git clone https://github.com/your-username/next-food-tracker-app.git
   cd next-food-tracker-app
   ```

2. **ติดตั้ง Dependencies:**

   ```bash
   npm install
   # หรือ yarn install, pnpm install
   ```

3. **ตั้งค่าตัวแปร Environment:**
   สร้างไฟล์ `.env.local` ไว้ที่โฟลเดอร์หลักของโปรเจกต์ และใส่ค่าเชื่อมต่อ Supabase ของคุณลงไป:

   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **รันเซิร์ฟเวอร์แบบนักพัฒนา (Development Server):**

   ```bash
   npm run dev
   # หรือ yarn dev, pnpm dev
   ```

5. **เปิดแอปพลิเคชัน:**
   เปิดเบราว์เซอร์แล้วไปที่ลิงก์ [http://localhost:3000](http://localhost:3000) เพื่อดูผลลัพธ์
