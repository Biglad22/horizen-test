import useLocalStorage from "@/hooks/useLocalStorage";
import { TaskCreationSchema } from "@/schemas/taskCreationSchema";
import { Task } from "@/types/Task";
import React, { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";
import z from "zod";


// Context type
interface TaskContextType {
  tasks: Task[];
  addTask: (task: z.infer<typeof TaskCreationSchema>) => void;
  editTask: (taskId : string, update: Partial<Task>) => void;
  markAsCompleted : (taskId : string) => void;
  markAsInCompleted : (taskId : string) => void;
  deleteTask: (id: string) => void;
  clearTasks:()=>void;
  findTask: (title: string) => Task[];
}

// Create context
const TaskContext = createContext<TaskContextType | undefined>(undefined);

// Provider component
export const TaskProvider = ({ children }: { children: ReactNode }) => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const {getItem, setItem} = useLocalStorage() 
   
    // Load from localStorage on mount
    useEffect(() => {
      const stored = getItem("tasks");
      if (stored) setTasks(stored);
    }, []);

    // Save to localStorage on change
    useEffect(() => {
      setItem("Tasks", tasks);
    }, [tasks]);

    const addTask = useCallback((newTask: z.infer<typeof TaskCreationSchema>) =>{
        const task: Task = {
            title: newTask.title!,
            completed: false,
            createdAt: new Date(),
            id: `${tasks.length + 1}`,
            description: newTask.description ?? "",
            dueDate: newTask.dueDate ?? undefined,
            priority : newTask.priority || "low",
        };

        setTasks((prev) => [...prev, task])
    },[tasks]);

    const editTask = useCallback((taskId : string, update: Partial<Task>) =>{
      setTasks((prev) => prev.map(task=>{
        if(task.id === taskId){
            return {...task, ...update}
        }
        return task;
      }));
    },[tasks])

    const clearTasks = useCallback(()=>{
        setTasks([])
    },[tasks])

    const markAsCompleted = useCallback((taskId:string)=>{
        editTask(taskId, {completed: true});
    },[tasks])
    const markAsInCompleted = useCallback((taskId:string)=>{
        editTask(taskId, {completed: false});
    },[tasks])
    
    const deleteTask = (id: string) =>
      setTasks((prev) => prev.filter((t) => t.id !== id));

    const findTask = (title: string) =>{
        if(!title) return tasks; 
        const target = tasks.filter((t) => t.title.includes(title));
        if(!target) return;
        return target;
    }

  return (
    <TaskContext.Provider value={{ tasks, markAsInCompleted, findTask, clearTasks, addTask, editTask, deleteTask, markAsCompleted }}>
      {children}
    </TaskContext.Provider>
  );
};

// Custom hook
export const useTasks = () => {
  const ctx = useContext(TaskContext);
  if (!ctx) throw new Error("useTasks must be used within TaskProvider");
  return ctx;
};