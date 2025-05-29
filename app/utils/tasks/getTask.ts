import { prisma } from "@/prisma/client";

async function getTask(taskId: string) {
  const task = await prisma.task.findUnique({
    where: { id: parseInt(taskId) }
  })

  return task
}

export default getTask
