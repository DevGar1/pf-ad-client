import axios from "axios";
import { useEffect, useState } from "react";
import ioClient from "socket.io-client";

import { useNavigate } from "react-router-dom";

const Arcvhivos = () => {
  const [socket, setSocket] = useState(null);
  const [progress, setProgress] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  const [files, setFiles] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get("http://localhost:5000/listar").then(({ data }) => {
      console.log(data);
      const { archivos } = data;
      setFiles(archivos);
    });
  }, []);

  const downloadFile = async (fileName = "") => {
    const splittedData = fileName.split(".");
    const extension = splittedData[splittedData.length - 1];
    if (extension === "mp4") {
      navigate(`/video/${fileName}`);
    }
    setIsLoading(true);

    await axios
      .post("http://localhost:5000/descargar", { archivo: fileName, socketId: socket.id }, { responseType: "blob" })
      .then(({ data }) => {
        const blob = new Blob([data], { type: "application/octet-stream" });
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.setAttribute("download", `${fileName}`);
        document.body.appendChild(link);
        link.click();
        setIsLoading(false);
        setProgress(0);
      });
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
        });
      });
      setSocket(newSocket);
    } catch (error) {
      console.log("------>");
    }
  }, [socket]);

  return (
    <div className="w-full">
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
      <h2 className="text-[#003da5] text-4xl font-black mb-6">Archivos disponibles</h2>
      <div className="w-full py-8 h-full overflow-scroll ">
        {files.map((file) => {
          const splittedData = file.split(".");
          const extension = splittedData[splittedData.length - 1];
          return (
            <div key={file} className="w-full flex justify-between mb-4">
              <p>{file}</p>
              <button
                onClick={() => downloadFile(file)}
                className="bg-[#003da5] rounded-2xl text-white px-5 hover:cursor-pointer h-fit py-2"
              >
                {extension === "mp4" ? "Ver" : "Descargar"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Arcvhivos;
