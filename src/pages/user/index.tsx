import React from "react";
import BasePage from "~/_components/BasePage";
import { Card } from "~/components/ui/card";
import { api } from "~/utils/api";

const User = () => {
  const { data } = api.users.getUser.useQuery();
  console.log(data);

  return (
    <BasePage title="User">
      <div className="p-5">
        <Card title="User" className="w-[500px]">
          <div className="flex flex-col items-center justify-center gap-2 p-10 text-gray-600">
            <div className="flex h-[10rem] w-[10rem] flex-col gap-2 rounded-full">
              {data?.image ? (
                <img
                  src={data?.image}
                  alt=""
                  className="h-full w-full rounded-full object-cover"
                />
              ) : (
                ""
              )}
            </div>
            <div className="flex flex-col gap-2 p-5">
              <div>
                <span className="font-bold">Name: </span>
                {data?.name}
              </div>
              <div>
                <span className="font-bold">Email: </span>
                {data?.email}
              </div>
              {/* <div>
                <span className="font-bold">Role: </span>
                {data?.role}
              </div> */}
            </div>
          </div>
        </Card>
      </div>
    </BasePage>
  );
};

export default User;
