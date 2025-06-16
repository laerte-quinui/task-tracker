'use client'
import DatePicker from '@/app/components/DatePicker'
import ErrorMessage from '@/app/components/ErrorMessage'
import { Task } from '@/app/generated/prisma'
import { patchTaskSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, TextField } from '@radix-ui/themes'
import axios from 'axios'
import 'easymde/dist/easymde.min.css'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import { z } from 'zod'
import SelectStatus from './SelectStatus'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
  ssr: false,
})

type TaskFormData = z.infer<typeof patchTaskSchema>

const TaskForm = ({ task }: { task?: Task }) => {
  const router = useRouter()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TaskFormData>({
    resolver: zodResolver(patchTaskSchema),
  })

  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)
      if (task) await axios.patch('/api/tasks/' + task.id, data)
      else await axios.post('/api/tasks', data)
      router.push('/tasks')
      router.refresh()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setSubmitting(false)
    }
  })

  return (
    <form className="max-w-xl space-y-4" onSubmit={onSubmit}>
      <TextField.Root
        placeholder="Title"
        defaultValue={task?.title}
        {...register('title')}
      />
      <ErrorMessage>{errors.title?.message}</ErrorMessage>

      <Controller
        name="description"
        control={control}
        defaultValue={task?.description}
        render={({ field }) => (
          <SimpleMDE placeholder="Description" {...field} />
        )}
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>

      <Flex gap="4">
        <Controller
          name="status"
          control={control}
          defaultValue={task?.status || 'TO_DO'}
          render={({ field }) => <SelectStatus {...field} />}
        />

        <Flex direction="column">
          <Controller
            name="deadline"
            control={control}
            defaultValue={task?.deadline || new Date()}
            render={({ field }) => <DatePicker {...field} clearBtn={false} />}
          />
          <ErrorMessage>{errors.deadline?.message}</ErrorMessage>
        </Flex>
      </Flex>

      <Button disabled={isSubmitting} loading={isSubmitting} className="">
        {!task ? 'Create new task' : 'Save changes'}
      </Button>
    </form>
  )
}

export default TaskForm
