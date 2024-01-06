import { useParams } from "react-router-dom";

const Streaming = () => {
  const { file } = useParams();

  return (
    <div>
      <h2 className="text-[#003da5] text-4xl font-black mb-6">Video Streaming</h2>

        <div className="w-full h-full px-8 flex justify-center items-center">
      <video className="w-full" controls autoPlay>
        <source src={`http://localhost:5000/video/${file}`} type="video/mp4" />
      </video>
    </div>
    </div>
  );
};

export default Streaming;
