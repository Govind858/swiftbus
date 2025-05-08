import { useRef, useState, useEffect } from "react";

const CameraComponent = () => {
  const videoRef = useRef(null);
  const [isCameraOpen, setIsCameraOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const streamRef = useRef(null);

  // Clean up function to ensure camera is stopped when component unmounts
  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const openCamera = async () => {
    try {
      setErrorMessage("");
      const constraints = { 
        video: { 
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      };
      
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraOpen(true);
      }
    } catch (error) {
      console.error("Error accessing camera:", error);
      setErrorMessage(`Camera error: ${error.message}`);
    }
  };

  const closeCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      if (videoRef.current) {
        videoRef.current.srcObject = null;
      }
      streamRef.current = null;
      setIsCameraOpen(false);
    }
  };

  return (
    <div className="flex flex-col items-center mt-4">
      {!isCameraOpen ? (
        <button
          onClick={openCamera}
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
        >
          Open Camera
        </button>
      ) : (
        <div className="mt-4 flex flex-col items-center">
          <div className="relative">
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline
              muted
              className="w-64 h-48 border border-gray-300 bg-black"
            />
          </div>
          <button
            onClick={closeCamera}
            className="mt-2 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:outline-none"
          >
            Close Camera
          </button>
        </div>
      )}
      {errorMessage && (
        <div className="mt-2 text-red-500">{errorMessage}</div>
      )}
    </div>
  );
};

export default CameraComponent;