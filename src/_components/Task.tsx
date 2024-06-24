import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { HiOutlineStatusOnline } from "react-icons/hi";
import { MdAssignment } from "react-icons/md";
import { MdOutlinePriorityHigh } from "react-icons/md";
import { Priority } from "@prisma/client";
import { FaCircleDot } from "react-icons/fa6";
import { RiEditBoxLine } from "react-icons/ri";
import { timeAgo } from "~/utils/common";
import { DialogTrigger } from "~/components/ui/dialog";

const Task = ({ task, edit }: any) => {
  const {
    title,
    description,
    status,
    assignedTo,
    priority,
    createdBy,
    createdAt,
  } = task;
  console.log(createdAt);

  // Determine status color
  let statusColor;
  switch (status) {
    case "INPROGRESS":
      statusColor = "bg-yellow-500";
      break;
    case "COMPLETED":
      statusColor = "bg-green-500";
      break;
    case "CANCELLED":
      statusColor = "bg-red-500";
      break;
    default:
      statusColor = "bg-blue-500";
      break;
  }
  let priorityColor;
  switch (priority) {
    case "LOW":
      priorityColor = " bg-green-200  text-green-900";
      break;
    case "MEDIUM":
      priorityColor = " bg-yellow-200  text-yellow-900";
      break;
    case "HIGH":
      priorityColor = " bg-red-100  text-red-900";
      break;
    default:
      priorityColor = "bg-blue-500";
      break;
  }

  console.log(priority);

  return (
    <Card className="w-[400px]">
      <CardHeader className="gap-2 px-5 pt-8">
        <div className="flex w-full  items-start justify-between ">
          <CardTitle className="text-2xl">{title}</CardTitle>
          <DialogTrigger asChild onClick={() => edit(task)}>
            <button className="">
              <RiEditBoxLine />
            </button>
          </DialogTrigger>
        </div>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col justify-between">
        <hr />
        <div className="flex flex-col items-center justify-between gap-3 py-2 text-sm text-gray-500">
          <div className="flex w-full items-center justify-between gap-2 ">
            <div className="flex items-center gap-2">
              <MdAssignment />

              <b>assigned to</b>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-5 w-5 rounded-full border-2 border-gray-100`}>
                <img
                  src={assignedTo.image}
                  alt={assignedTo.name}
                  className="h-full w-full rounded-full"
                />
              </div>
              <span>{assignedTo.name}</span>
            </div>
          </div>
          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <HiOutlineStatusOnline />

              <b>status</b>
            </div>
            <div className="flex items-center gap-2">
              <div className={`h-3 w-3 rounded-full ${statusColor}`}></div>
              <span>{status.toLowerCase()}</span>
            </div>
          </div>

          <div className="flex w-full items-center justify-between gap-2">
            <div className="flex items-center gap-2">
              <FaCircleDot />

              <b>Priority</b>
            </div>
            <div
              className={
                `flex items-center gap-2  rounded-lg px-2 py-1 text-xs` +
                priorityColor
              }
            >
              <span>{priority.toLowerCase()}</span>
            </div>
          </div>
        </div>
        <div className="mt-10 flex w-full  items-start justify-between text-sm">
          <div className="flex  items-center justify-between gap-1 text-xs">
            Created by:{" "}
            <div className={`h-5 w-5 rounded-full border-2 border-gray-100 `}>
              <img
                src={createdBy.image}
                alt={createdBy.name}
                className="h-full w-full rounded-full"
              />
            </div>{" "}
            {createdBy.name}
          </div>
          <p className="text-xs"> {timeAgo(createdAt)}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Task;
