"use client";
import React, { useContext } from "react";
import Head from "next/head";
import Sidebar from "~/_components/Layout/Sidebar";
import Navbar from "~/_components/Layout/Navbar";
import BasePage from "~/_components/BasePage";
import { Button } from "~/components/ui/button";
import ShowTasks from "~/_components/ShowTasks";
import { AddTasks } from "~/_components/AddTasks";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";
import { useAppContext } from "~/context";

const Dashboard = () => {
  const task = useAppContext();
  console.log(task);
  
  return (
    <BasePage title="Dashboard">
      <div className="flex h-full flex-col gap-3 p-5">
        <Dialog>
          <DialogTrigger asChild>
            <div className="flex items-center justify-start ">
              <Button variant="outline" className="flex gap-2">
                {" "}
                <FaPlus />
                <h2>Add Task</h2>
              </Button>
            </div>
          </DialogTrigger>

          <DialogContent className="m-0 bg-white p-0">
            <AddTasks />
          </DialogContent>
          <ShowTasks />
        </Dialog>
      </div>
    </BasePage>
  );
};

export default Dashboard;
