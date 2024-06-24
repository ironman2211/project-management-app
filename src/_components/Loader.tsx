import React from "react";
import { Puff } from "react-loader-spinner";

const Loader = () => {
    
  return (
    <div className="flex items-center justify-center h-screen w-screen bg-gray-100 bg-opacity-50 fixed top-0 left-0 z-50">
      <Puff
        visible={true}
        height={80}
        width={80}
        color="#4fa94d"
        ariaLabel="puff-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </div>
  );
};

export default Loader;
