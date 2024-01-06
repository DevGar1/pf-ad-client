import { useNavigate } from "react-router-dom";
import profile from "../assets/profile.png";

const Home = () => {
  const navigate = useNavigate();

  return (
    <>
      <div className="w-full h-full flex flex-col gap-2  py-6 px-4">
        <h1 className="text-[#003da5] text-4xl font-black">Transferencia de archivos</h1>
        <p className="font-medium">
          Esta página tiene como proposito el presentar el proyecto final de la materia de <b>aplicaicones distribuidas</b> el
          cual es un gestor de archivos, ademas de un servicio de streaming.
        </p>
      </div>
      <div className="w-fit relative h-full  flex items-center ">
        <img src={profile} className="object-contain top-0 w-full profile-shadow" />
      </div>
      <div className="w-full flex justify-between flex-wrap gap-4 items-center px-2 mb-10 h-[500px] my-6">
        <button
          onClick={() => navigate("/archivos")}
          className="bg-white text-[#003da5] w-[45%] h-32 py-2 px-4 rounded-2xl text-sm"
        >
          Listar archivos disponibles
        </button>
        <button onClick={() => navigate("/subir")} className="bg-white text-[#003da5] w-[45%] h-32 py-2 px-4 rounded-2xl text-sm">Subir archivo</button>
      </div>
    </>
  );
};

export default Home;
