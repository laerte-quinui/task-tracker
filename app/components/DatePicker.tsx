'use client'

import { Calendar03Icon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { IconButton, TextField } from '@radix-ui/themes'
import { ChangeEvent, KeyboardEvent, useEffect, useState } from 'react'
import { formatDate } from '../utils/formatDate'
import { Calendar } from './Calendar'
import { Popover, PopoverContent, PopoverTrigger } from './Popover'

function isValidDate(date: Date | undefined) {
  if (!date) return false
  return !isNaN(date.getTime())
}

const DatePicker = ({ ...props }) => {
  const initialDate =
    props.value && isValidDate(props.value) ? props.value : new Date()
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState<Date | undefined>(initialDate)
  const [month, setMonth] = useState<Date | undefined>(initialDate)
  const [value, setValue] = useState(formatDate(initialDate))

  useEffect(() => {
    if (props.value && isValidDate(props.value)) {
      setDate(props.value)
      setMonth(props.value)
      setValue(formatDate(props.value))
    }
  }, [props.value])

  return (
    <div className="relative flex gap-2">
      <TextField.Root
        id="date"
        value={value}
        placeholder="Pick a date"
        onChange={(e: ChangeEvent<HTMLInputElement>) => {
          const inputValue = e.target.value
          setValue(inputValue)
          const parsedDate = new Date(inputValue)
          if (
            isValidDate(parsedDate) &&
            formatDate(parsedDate) === inputValue
          ) {
            setDate(parsedDate)
            setMonth(parsedDate)
            if (props.onChange) props.onChange(parsedDate)
          } else if (props.onChange) {
            props.onChange(undefined)
          }
        }}
        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === 'ArrowDown') {
            e.preventDefault()
            setOpen(true)
          }
        }}
      >
        <TextField.Slot side="right">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <IconButton size="2" id="date-picker" variant="ghost">
                <HugeiconsIcon icon={Calendar03Icon} size="18px" />
                <span className="sr-only">Select date</span>
              </IconButton>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto overflow-hidden p-0"
              align="end"
              alignOffset={-8}
              sideOffset={10}
            >
              <Calendar
                mode="single"
                selected={date}
                // captionLayout="dropdown"
                month={month}
                onMonthChange={setMonth}
                onSelect={(date: Date | undefined) => {
                  setDate(date)
                  setValue(formatDate(date))
                  setOpen(false)
                  if (props.onChange) props.onChange(date)
                }}
              />
            </PopoverContent>
          </Popover>
        </TextField.Slot>
      </TextField.Root>
    </div>
  )
}

export default DatePicker
