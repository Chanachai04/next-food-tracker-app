import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-white to-blue-50 p-6 text-slate-800 relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-100/50 mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-200/50 mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>

      <div className="z-10 flex flex-col items-center text-center max-w-4xl mx-auto w-full">
        <h1 className="mb-6 text-5xl font-extrabold tracking-tight text-blue-600 md:text-6xl lg:text-7xl drop-shadow-sm">
          Welcome to Food Tracker
        </h1>
        <p className="mb-10 text-lg font-medium text-slate-500 md:text-xl lg:text-2xl max-w-2xl px-4">
          ติดตามและจัดการเมนูอาหารในแต่ละวันของคุณได้อย่างง่ายดายด้วยโทนสีที่สวยงามและสบายตา
        </p>

        <div className="relative mb-12 h-40 w-64 md:h-64 md:w-96 lg:h-80 lg:w-[32rem]">
          <div className="absolute -inset-4 bg-blue-200/50 rounded-[2.5rem] md:rounded-[3rem] blur-xl z-0 transition-opacity duration-500 group-hover:opacity-100"></div>
          <Image
            src="/foodtracker.jpg"
            alt="A delicious meal"
            fill
            style={{ objectFit: "cover" }}
            className="shadow-2xl transition-transform duration-500 hover:scale-[1.03] rounded-3xl md:rounded-[2rem] z-10 relative"
          />
        </div>

        <div className="mt-4 flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 w-full sm:w-auto px-4">
          <Link
            href="/register"
            className="w-full sm:w-auto transform rounded-full bg-blue-600 px-10 py-4 font-bold text-white shadow-xl shadow-blue-600/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-blue-600/50 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
          >
            เริ่มต้นใช้งาน (Register)
          </Link>
          <Link
            href="/login"
            className="w-full sm:w-auto transform rounded-full border-2 border-blue-600 bg-white/70 backdrop-blur-md px-10 py-4 font-bold text-blue-600 shadow-xl transition-all duration-300 hover:-translate-y-1 hover:bg-blue-50 hover:shadow-blue-600/20 focus:outline-none focus:ring-4 focus:ring-blue-300 active:scale-95"
          >
            เข้าสู่ระบบ (Login)
          </Link>
        </div>
      </div>
    </div>
  );
}
