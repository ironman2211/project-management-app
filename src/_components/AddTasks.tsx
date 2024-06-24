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
import { DatePicker } from "./DatePicker";
import { api } from "~/utils/api";
import { taskInput } from "~/types";
import { Priority, Status } from "@prisma/client";
import { useSession } from "next-auth/react";

interface TaskDetails {
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: Date;
  assignId: string;
}
export function AddTasks() {
  const [date, setDate] = React.useState<Date>(new Date());

  const initialTaskDetails: TaskDetails = {
    title: "",
    description: "",
    status: "",
    priority: "",
    dueDate: new Date(),
    assignId: "",
  };
  const { data: users } = api.users.getAllUserNameAndId.useQuery();
  const [task, settask] = React.useState<TaskDetails>(initialTaskDetails);
  const { mutate } = api.tasks.createTask.useMutation();

  const handleSubmit = () => {
    settask({
      ...task,
      dueDate: new Date(task.dueDate)
    });
    if (task.title.length > 0) {
      console.log(task);

      const result = taskInput.safeParse(task);
      if (!result.success) {
        console.log("Validation failed", result.error.format());
      } else {
        console.log("Validation succeeded", result.data);
        mutate(result.data);
        settask(initialTaskDetails);
      }
    }
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Create Task</CardTitle>
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
              <DatePicker date={date} setDate={setDate} />
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
