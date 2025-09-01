// TODO: Create the TaskCard component
// Requirements:
// - Display task title, description, priority, due date
// - Show completion status
// - Include edit and delete buttons
// - Use proper TypeScript types
// - Apply priority color coding
// - Make it responsive

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Priority, Task } from "@/types/Task";
import { Badge } from "./ui/badge";
import { format } from "date-fns";
import clsx from "clsx";
import { Check, PenBox, Trash2, X } from "lucide-react";
import { useTasks } from "@/context/TaskManager";
import { useState } from "react";
import TaskCreationForm from "./TaskCreationForm";
import z from "zod";
import { TaskCreationSchema } from "@/schemas/taskCreationSchema";

const PriorityBadge = ({priority} : {priority : Priority}) =>{
  const badgeStyle = clsx(
    "uppercase block rounded-sm px-2 py-0.5 text-xs track-wide dark:text-white text-black",
    priority === "high" && "bg-priority-high",
    priority === "medium" && "bg-priority-medium",
    priority === "low" && "bg-priority-low",
  )
  return(
    <small className={badgeStyle}>
      {priority}
    </small>
  )
}

export const TaskCard = (task: Task) => {
  const {deleteTask, markAsCompleted, markAsInCompleted, editTask} = useTasks();
  const handleDeletion = () => deleteTask(task.id);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const handleEditing = (newData : z.infer<typeof TaskCreationSchema>) => {
    editTask(task.id, newData);
    setIsEditing(false);
  }
  const handleStatusChange = ()=>{
    if(!task.completed){
      markAsCompleted(task.id);
      return;
    }
    markAsInCompleted(task.id)
  }
  const buttonStyle = clsx("flex-1 flex items-center transition-all duration-300 gap-2 [>&svg]:size-6")
  return (
    <>
      {
        isEditing ? (
          <TaskCreationForm defaultValue={task} onEdit={(newData) => handleEditing(newData)}/> 
        ) : (
          <Card>
            {/* Implement your TaskCard component here */}
            <CardTitle>
              <CardHeader>
                <div className="flex items-center w-full gap-4 justify-between">
                  <h5 className="capitalize text-xl sm:text-2xl flex-1 line-clamp-2 font-medium" title={task.title}>
                    {task.title}
                  </h5>
                  <PriorityBadge priority={task.priority} />
                </div>
                {
                  task.description &&(
                    <p className="text-sm sm:text-base text-muted-foreground font-normal">
                      {task.description}
                    </p>       
                  )
                }
                <div className="flex items-center gap-4  flex-wrap">
                  {task.dueDate && (<small className="text-xs sm:text-sm text-muted-foreground font-normal">
                    <span>
                      Due:{" "}
                    </span>
                    <span >
                      {task.dueDate ? format(new Date(task.dueDate), "PPP") : "No due date"}
                    </span>
                  </small>)}
                  <Badge variant={task.completed? "default" : "outline"} className="transition duration-300">
                    {task.completed? "Completed" : "In completed"}
                  </Badge>
                </div>          
              </CardHeader>
              <CardFooter>
                <div className="flex items-center flex-wrap sm:w-1/2 gap-2">
                  <Button variant="secondary" className={`${task.completed && "border border-white"} ${buttonStyle}`} onClick={handleStatusChange}>
                    <span>
                      {
                        !task.completed ? (
                          <Check />
                        ) : (
                          <X />
                        )
                      }
                    </span>
                    <span>
                      {`Mark as ${task.completed ? "in-completed" : "completed"}`}
                    </span>
                  </Button>
                  <Button variant="outline" className={buttonStyle} onClick={()=>{setIsEditing(true)}}>
                    <span>
                      <PenBox />
                    </span>
                    <span>
                      Edit
                    </span>
                  </Button>
                  <Button variant="destructive" className={buttonStyle} onClick={handleDeletion}>
                    <span>
                      <Trash2 />
                    </span>
                    <span>
                      Delete
                    </span>
                  </Button>
                </div>
              </CardFooter>
            </CardTitle>
          </Card>
        )
      }
    </>
  );
};