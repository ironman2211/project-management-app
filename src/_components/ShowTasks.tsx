"use client";
import React, { use } from "react";
import { api } from "~/utils/api";
import Task from "./Task";
import { TaskDetails, TaskResponse } from "~/interfaces";
import { title } from "process";
import { useAppContext } from "~/context";

const ShowTasks = ({
  setCurrentTask,
}: {
  setCurrentTask: React.Dispatch<React.SetStateAction<TaskDetails>>;
}) => {
  const { data: tasks, isLoading, isError } = api.tasks.getAll.useQuery();
  const editTask = (task: TaskResponse) => {
    const taskdetails: TaskDetails = {
      id: task.id,
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
      deadline: task.deadline,
      assignId: task.assignId,
    };
    setCurrentTask(taskdetails);
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
