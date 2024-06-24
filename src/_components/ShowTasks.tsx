"use client";
import React from "react";
import { api } from "~/utils/api";
import Task from "./Task";

const ShowTasks = () => {
  const { data: tasks, isLoading, isError } = api.tasks.getAll.useQuery();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error!</div>;
  return <div className="flex gap-5">{tasks?.map((task) => <Task key={task.id} task={task} />)}</div>;
};

export default ShowTasks;
