<div align="center">
  <img src="https://github.com/user-attachments/assets/b35f4427-ed16-4abe-a5f1-ed73b5ff1316" alt="Food Tracker Banner" width="600" />


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

<table align="center">
  <tr>
    <th colspan="2" style="text-align: center;">Dashboard & Overview</th>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/debae506-f25a-47b2-b757-0eb81f489aae" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/310675e6-7f7e-4cab-bb6a-a481661c3d89" width="100%"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/2f088815-f752-4a5e-9346-dc7f77b9ce10" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/b5c87c3c-f24e-46f3-93bd-13345778d4a2" width="100%"/></td>
  </tr>
  <tr>
    <td><img src="https://github.com/user-attachments/assets/ea785f5e-f15c-4cae-912b-389d8a4c4a99" width="100%"/></td>
    <td><img src="https://github.com/user-attachments/assets/8d0da9cc-cf69-456a-800b-7cf2e523adac" width="100%"/></td>
  </tr>
</table>

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
