"use client";
import React, { useContext, useState } from "react";
import Head from "next/head";
import Sidebar from "~/_components/Layout/Sidebar";
import Navbar from "~/_components/Layout/Navbar";
import BasePage from "~/_components/BasePage";
import { Button } from "~/components/ui/button";
import ShowTasks from "~/_components/ShowTasks";
import { AddTasks } from "~/_components/AddTasks";
import { Dialog, DialogContent, DialogTrigger } from "~/components/ui/dialog";
import { FaPlus } from "react-icons/fa6";
import { Task } from "@prisma/client";
import { TaskDetails } from "~/interfaces";
import { blankTask } from "~/utils/common";

const Dashboard = () => {
  const [open, setOpen] = useState(false);
  const [currentTask, setCurrentTask] = useState<TaskDetails>(blankTask);
  console.log(currentTask);

  return (
    <BasePage title="Dashboard">
      <div className="flex h-fit flex-col gap-3  p-5">
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogTrigger asChild onClick={() => setCurrentTask(blankTask)}>
            <div className="flex items-center justify-start ">
              <Button variant="outline" className="flex gap-2">
                {" "}
                <FaPlus />
                <h2>Add Task</h2>
              </Button>
            </div>
          </DialogTrigger>

          <DialogContent className="m-0 bg-white p-0">
            <AddTasks taskProps={currentTask} setOpen={setOpen} />
          </DialogContent>
          <ShowTasks setCurrentTask={setCurrentTask} />
        </Dialog>
      </div>
    </BasePage>
  );
};

export default Dashboard;
