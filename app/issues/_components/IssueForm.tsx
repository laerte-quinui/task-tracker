'use client'
import ErrorMessage from "@/app/components/ErrorMessage";
import { Issue } from "@/app/generated/prisma";
import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { z } from "zod";

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), { ssr: false })

type IssueFormData = z.infer<typeof createIssueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
  const router = useRouter()
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
    resolver: zodResolver(createIssueSchema)
  })

  const [isSubmitting, setSubmitting] = useState(false)

  const onSubmit = handleSubmit(async (data) => {
    try {
      setSubmitting(true)
      await axios.post('/api/issues', data)
      router.push('/issues')
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (err) {
      setSubmitting(false)
    }
  })

  return (
    <form
      className="max-w-xl space-y-4"
      onSubmit={onSubmit}
    >
      <TextField.Root
        placeholder="Title"
        defaultValue={issue?.title}
        {...register('title')}
      />
      <ErrorMessage>{errors.title?.message}</ErrorMessage>

      <Controller
        name="description"
        control={control}
        defaultValue={issue?.description}
        render={
          ({field})=> <SimpleMDE placeholder="Description" {...field} />
        }
      />
      <ErrorMessage>{errors.description?.message}</ErrorMessage>

      <Button
        disabled={isSubmitting}
        loading={isSubmitting}
      >
        {!issue ? 'Create new issue' : 'Save changes'}
      </Button>
    </form>
  )
}

export default IssueForm
