import React from 'react'
import {useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormControl, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from './ui/button';
import { useTasks } from '@/context/TaskManager';
import {z} from 'zod';
import { TaskCreationSchema } from '@/schemas/taskCreationSchema';
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from './ui/textarea';
import TaskDatePicker from './TaskDatePicker';
import TaskPriorityPicker from './TaskPriorityPicker';


//WHEN DEFAULT VALUE IS PASSED THEN IT MEANS A TASK IS MEANT TO BE EDITED
export default function TaskCreationForm({
    defaultValue,
    onEdit
}: {defaultValue?:z.infer<typeof TaskCreationSchema>,
    onEdit?: (taskFormData : z.infer<typeof TaskCreationSchema>)=>void;
}) {
    const form = useForm<z.infer<typeof TaskCreationSchema>>({
        resolver: zodResolver(TaskCreationSchema),
        defaultValues:{
            description:defaultValue?.description || "",
            dueDate:defaultValue?.dueDate || null,
            priority:defaultValue?.priority || "low",
            title: defaultValue?.title || ""
        }
    });
    const  {addTask} = useTasks()
    const handleTaskCreation = form.handleSubmit((taskFormData : z.infer<typeof TaskCreationSchema>)=>{
      if(!defaultValue) addTask(taskFormData);
      else onEdit(taskFormData);
      form.reset({
        description:'',
        dueDate:null,
        priority:null,
        title:""
      })
    })

    return (
        <Card>
          <CardHeader>
            <CardTitle>Add New Task</CardTitle>
            <CardDescription>Create a new task to manage your work</CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={handleTaskCreation} className="space-y-4">
                {/* TASK TITLE */}
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input maxLength={100} placeholder="Enter task title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* TASK DESCRIPTION */}
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea maxLength={500} className='resize-none' placeholder="Enter task description" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className='flex gap-4 items-start flex-wrap max-sm:flex-col'>    
                    {/* TASK DUE DATE */}
                    <FormField
                      control={form.control}
                      name="dueDate"
                      render={({ field }) => (
                        <FormItem className='flex-1 max-sm:w-full sm:min-w-80'>
                          <FormLabel>Due date</FormLabel>
                          <FormControl>
                            <TaskDatePicker className='w-full' field={field} /> 
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                      />
                    <FormField
                      control={form.control}
                      name="priority"
                      render={({ field }) => (
                        <FormItem className='flex-1 max-sm:w-full sm:min-w-80'>
                          <FormLabel>Priority</FormLabel>
                          <FormControl>
                            <TaskPriorityPicker className=' w-full' field={field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                </div>

                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </CardContent>
        </Card>
    )
}