import { z } from "zod";

const Priority = ["high", "medium", "low"] as const;

export const TaskCreationSchema = z.object({
    title: z.string().min(1, { message: "Please provide a title" }),
    description: z.string().optional(),
    priority: z.enum(Priority).optional(),
    dueDate: z.date({message: "Please specify a due date for this task"})})