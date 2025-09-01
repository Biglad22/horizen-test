import { cn } from '@/lib/utils'
import { Popover, PopoverTrigger, PopoverContent } from '@radix-ui/react-popover'
import { CalendarIcon} from 'lucide-react'
import { format } from 'date-fns'
import React from 'react'
import { FormControl } from './ui/form'
import { Button } from './ui/button'
import { ControllerRenderProps } from 'react-hook-form'
import { Calendar } from './ui/calendar'

type Props = {
    field : ControllerRenderProps;
    className?:string
}

export default function TaskDatePicker({
    field,
    className
}: Props) {
    return (
        <Popover>
            <PopoverTrigger className='block' asChild>
              <FormControl>
                <Button
                  variant={"outline"}
                  className={cn(
                    "w-[240px] pl-3 text-left flex font-normal",
                    !field.value && "text-muted-foreground",
                    className
                  )}
                >
                  {field.value ? (
                    format(field.value, "PPP")
                  ) : (
                    <span>Pick a date</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-auto bg-background rounded-md shadow-md border p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value}
                onSelect={field.onChange}
                disabled={(date) =>
                  date < new Date() || date < new Date("1900-01-01")
                }
                captionLayout="dropdown"
              />
            </PopoverContent>
        </Popover>
    )
}