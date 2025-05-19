'use client'

import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import SimpleMDE from "react-simplemde-editor";

const NewIssuePage = () => {
  return (
    <div className="max-w-xl space-y-4">
      <TextField.Root placeholder="Title" />
      <SimpleMDE
        placeholder="Description"
      />
      <Button>Create new issue</Button>
    </div>
  )
}

export default NewIssuePage
