import axios from "axios";
import { useEffect, useState } from "react";
import ioClient from "socket.io-client";

import profile from "../assets/profile.png";
const UploadFile = () => {
  const [socket, setSocket] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("archivo", selectedFile);
      formData.append("socketId", socket.id);

      // Ajusta la URL del servidor según tu configuración
      const response = await axios.post("http://localhost:5000/guardar", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Respuesta del servidor:", response.data);
    } catch (error) {
      console.error("Error al subir el archivo:", error);
    }
  };

  useEffect(() => {
    if (socket) return;
    try {
      const newSocket = ioClient("http://localhost:4000", { reconnection: false });
      console.log(newSocket);
      newSocket.on("connect", () => {
        setSocket(newSocket);
        newSocket.on("progress", (progress) => {
          setProgress(parseInt(progress));
          if (progress > 99){
            setProgress(0)
            setIsLoading(false);
            return;
          }
          setProgress(progress);
        });
      });
      setSocket(newSocket);
    } catch (error) {
      console.log("------>");
    }
  }, [socket]);

  return (
    <div className="w-full h-full">
      {isLoading && (
        <div className="absolute top-0 left-0 w-full h-screen flex justify-center items-center bg-[rgba(0,0,0,0.8)]">
          <div className="w-full px-9 flex flex-col items-center">
            <div className="h-6 w-full bg-white rounded-2xl">
              <div style={{ width: `${progress}%` }} className="h-full bg-[#003da5] rounded-2xl"></div>
            </div>
            <p className="text-white mt-4">Cargango...</p>
          </div>
        </div>
      )}
      <h2 className="text-[#003da5] text-4xl font-black mb-6">Subir archivo al servidor</h2>
      <div>
        <div className="flex justify-center">
          <label htmlFor="fileInput" className="custom-input-label flex flex-col items-center">
            <img src={profile} alt="Icono Subir Archivo" />
            <button className="bg-[#003da5] rounded-2xl text-white px-5 hover:cursor-pointer py-2">
              {selectedFile ? "Cambiar" : "Browser"}
            </button>
          </label>
          <input type="file" id="fileInput" className="hidden custom-file-input" onChange={handleFileChange} />
        </div>
        {selectedFile && (
          <div className="flex flex-col py-4 gap-4">
            <p> ✗ {selectedFile.name}</p>
            <div>
              <button onClick={handleUpload} className="bg-[#003da5] rounded-2xl text-white px-5 hover:cursor-pointer py-2">
                Subir archivo
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UploadFile;
