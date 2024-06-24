"use client";
import React from "react";
import { api } from "~/utils/api";
import Task from "./Task";
import { TaskDetails } from "~/interfaces";
import { title } from "process";

const ShowTasks = ({ setCurrentTask }: any) => {
  const { data: tasks, isLoading, isError } = api.tasks.getAll.useQuery();
  const editTask = (task: TaskDetails) => {
    setCurrentTask(task);
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;
  return (
    <div className="flex flex-wrap gap-5 justify-start ">
      {tasks?.map((task) => <Task key={task.id} task={task} edit={editTask} />)}
    </div>
  );
};

export default ShowTasks;
