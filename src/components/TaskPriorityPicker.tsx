import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from './ui/select'
import React from 'react'
import { FormControl } from './ui/form'
import { ControllerRenderProps } from 'react-hook-form'

type Props = {
    field : ControllerRenderProps;
    className?: string
}

export default function TaskPriorityPicker({field, className}: Props) {
  return (
    <Select onValueChange={field.onChange} defaultValue={field.value}>
      <FormControl>
        <SelectTrigger className={className}>
          <SelectValue placeholder="Select a verified email to display" />
        </SelectTrigger>
      </FormControl>
      <SelectContent className=''>
        <SelectItem value="high">High</SelectItem>
        <SelectItem value="medium">Medium</SelectItem>
        <SelectItem value="low">Low</SelectItem>
      </SelectContent>
    </Select>
  )
}