"use client";
import React, { use } from "react";
import { api } from "~/utils/api";
import Task from "./Task";
import { TaskDetails } from "~/interfaces";
import { title } from "process";
import { useAppContext } from "~/context";

const ShowTasks = ({ setCurrentTask }: any) => {
  const { data: tasks, isLoading, isError } = api.tasks.getAll.useQuery();
  const editTask = (task: TaskDetails) => {
    setCurrentTask(task);
  };
  const { setLoading } = useAppContext();
  if (isLoading) {
    setLoading(true);
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Error!</div>;
  }
  setLoading(false);
  return (
    <div className="flex flex-wrap justify-start gap-5 ">
      {tasks?.map((task) => <Task key={task.id} task={task} edit={editTask} />)}
    </div>
  );
};

export default ShowTasks;
