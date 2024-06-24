"use client";
import * as React from "react";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { toast } from "react-hot-toast";
import { DatePicker } from "./DatePicker";
import { api } from "~/utils/api";
import { taskInput, updateInput } from "~/types";
import { Priority, Status } from "@prisma/client";
import { TaskDetails } from "~/interfaces";
import { blankTask } from "~/utils/common";
import { title } from "process";

export function AddTasks({
  taskProps,
  setOpen,
}: {
  taskProps: TaskDetails;
  setOpen: any;
}) {
  const { data: users } = api.users.getAllUserNameAndId.useQuery();
  const [task, settask] = React.useState<TaskDetails>(taskProps);
  const [isUpdate] = React.useState(taskProps !== blankTask);

  const trpc = api.useContext();

  const [loading, setloading] = React.useState(false);
  const { mutate: addMutation } = api.tasks.createTask.useMutation({
    onMutate: () => setloading(true),
    onSettled: async () => {
      setloading(false);
      await trpc.tasks.getAll.invalidate();
      toast.success("Task Added successfully");
    },
  });

  const { mutate: updateMutation } = api.tasks.updateTask.useMutation({
    onMutate: () => setloading(true),
    onSettled: async () => {
      setloading(false);
      await trpc.tasks.getAll.invalidate();
      toast.success("Task Added successfully");
    },
  });

  const handleSubmit = () => {
    if (!isUpdate) {
      // Create a new task
      const result = taskInput.safeParse(task);
      if (!result.success) {
        console.log("Validation failed", result.error.format());
        toast.error(
          result.error.format()._errors.join(", ") || "Invalid Input",
        );
      } else {
        addMutation(result.data);
        console.log("Validation succeeded", result.data);
        settask(blankTask);
        setOpen(false);
      }
    } else {
      // Update a task
      const result = updateInput.safeParse(task);
      if (!result.success) {
        console.log("Validation failed", result.error.format());
        toast.error(
          result.error.format()._errors.join(", ") || "Invalid Input",
        );
      } else {
        updateMutation(result.data);
        console.log("Validation succeeded", result.data);
        settask(blankTask);
        setOpen(false);
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">
          {isUpdate ? "Update" : "Create"} Task
        </CardTitle>
        <CardDescription>please specify all fields</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Task Name</Label>
              <Input
                id="name"
                placeholder="Name of your project"
                value={task.title}
                onChange={(e) => settask({ ...task, title: e.target.value })}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Task Description</Label>
              <Input
                id="name"
                placeholder="Name of your project"
                value={task.description}
                onChange={(e) =>
                  settask({ ...task, description: e.target.value })
                }
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Status </Label>
              <Select
                value={task.status}
                onValueChange={(value) => settask({ ...task, status: value })}
              >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {Object.values(Status).map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {priority}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Priority </Label>
              <Select
                value={task.priority}
                onValueChange={(value) => settask({ ...task, priority: value })}
              >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {Object.values(Priority).map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Due Date</Label>
              <DatePicker
                date={task.deadline}
                setDate={(date: Date) => {
                  settask({ ...task, deadline: date });
                }}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="framework">Assign To </Label>
              <Select
                value={task.assignId}
                onValueChange={(value) => settask({ ...task, assignId: value })}
              >
                <SelectTrigger id="framework">
                  <SelectValue placeholder="Select" />
                </SelectTrigger>
                <SelectContent position="popper">
                  {users?.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="outline">Cancel</Button>
        <Button onClick={handleSubmit}>Deploy</Button>
      </CardFooter>
    </Card>
  );
}
