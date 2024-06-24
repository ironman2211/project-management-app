import React from "react";
import { Puff } from "react-loader-spinner";
import { useAppContext } from "~/context";

const Loader = () => {
  const { loading } = useAppContext();
  if (loading)
    return (
      <div className="fixed left-0 top-0 z-50 flex h-screen w-screen items-center justify-center bg-gray-100 bg-opacity-50">
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
