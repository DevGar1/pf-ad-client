import { Outlet } from "react-router-dom";
const Home = () => {
  return (
    <div className="w-full h-screen bg-[#E3F2FD] ">
      <main className="w-full h-full flex flex-col items-center overflow-scroll px-4 py-8">
        <Outlet />
      </main>
    </div>
  );
};

export default Home;
