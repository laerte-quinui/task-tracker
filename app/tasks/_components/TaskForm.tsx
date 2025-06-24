'use client'
import DatePicker from '@/app/components/DatePicker'
import ErrorMessage from '@/app/components/ErrorMessage'
import { Task } from '@/app/generated/prisma'
import { patchTaskSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button, Flex, Grid, Heading, Text, TextField } from '@radix-ui/themes'
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
      if (task) await axios.patch(`/api/tasks/${task.id}`, data)
      else await axios.post('/api/tasks', data)
      router.push('/tasks')
      router.refresh()
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setSubmitting(false)
    }
  })

  return (
    <>
      <Heading className="text-stone-900">
        {task ? 'Edit task' : 'New task'}
      </Heading>
      <form className="max-w-xl space-y-4 mt-6" onSubmit={onSubmit}>
        <Flex direction="column" gap="1">
          <Text as="label" className="text-stone-500 font-medium">
            Title
          </Text>
          <TextField.Root
            placeholder="Do scrumbled eggs..."
            defaultValue={task?.title}
            {...register('title')}
          />
          <ErrorMessage>{errors.title?.message}</ErrorMessage>
        </Flex>

        <Flex direction="column" gap="1">
          <Text as="label" className="text-stone-500 font-medium">
            Description
          </Text>
          <Controller
            name="description"
            control={control}
            defaultValue={task?.description}
            render={({ field }) => (
              <SimpleMDE
                placeholder="To do: buy eggs, buy salt, buy pan..."
                {...field}
              />
            )}
          />
          <ErrorMessage>{errors.description?.message}</ErrorMessage>
        </Flex>

        <Grid columns="2" gap="4">
          <Flex direction="column" gap="1">
            <Text as="label" className="text-stone-500 font-medium">
              Status
            </Text>
            <Controller
              name="status"
              control={control}
              defaultValue={task?.status || 'TO_DO'}
              render={({ field }) => <SelectStatus {...field} />}
            />
          </Flex>

          <Flex direction="column" gap="1">
            <Text as="label" className="text-stone-500 font-medium">
              Deadline
            </Text>
            <Controller
              name="deadline"
              control={control}
              defaultValue={task?.deadline || new Date()}
              render={({ field }) => <DatePicker {...field} clearBtn={false} />}
            />
          </Flex>
        </Grid>

        <Button disabled={isSubmitting} loading={isSubmitting} className="">
          {!task ? 'Create new task' : 'Save changes'}
        </Button>
      </form>
    </>
  )
}

export default TaskForm
