export default function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F2F3F5]">
      <div className="bg-white p-20 rounded-2xl shadow-sm w-[612px] h-[628px]">
        {children}
      </div>
    </div>
  );
}
