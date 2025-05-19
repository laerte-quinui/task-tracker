'use client'

import { createIssueSchema } from "@/app/validationSchemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Text, TextField } from "@radix-ui/themes";
import axios from "axios";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import { z } from "zod";

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
  const router = useRouter()
  const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
    resolver: zodResolver(createIssueSchema)
  })

  return (
    <form
      className="max-w-xl space-y-4"
      onSubmit={handleSubmit(async (data)=> {
        await axios.post('/api/issues', data)
        router.push('/issues')
      })}
    >
      <TextField.Root placeholder="Title" {...register('title')} />
      {errors.title && <Text color="red" as="p">{errors.title.message}</Text>}

      <Controller
        name="description"
        control={control}
        render={
          ({field})=> <SimpleMDE placeholder="Description" {...field} />
        }
      />
      {errors.description && <Text color="red" as="p">{errors.description.message}</Text>}

      <Button>Create new issue</Button>
    </form>
  )
}

export default NewIssuePage
