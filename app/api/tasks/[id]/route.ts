import { taskSchema } from '@/app/validationSchemas'
import { auth } from '@/auth'
import { prisma } from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) return NextResponse.json({}, { status: 401 })

  const body = await request.json()
  const deadline = new Date(body.deadline)
  const validation = taskSchema.safeParse({ ...body, deadline })
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 })

  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  })
  if (!task)
    return NextResponse.json("The task doesn't exists", { status: 404 })

  const updatedTask = await prisma.task.update({
    where: { id: parseInt(params.id) },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      deadline,
    },
  })

  return NextResponse.json(updatedTask)
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth()
  if (!session) return NextResponse.json({}, { status: 401 })

  const task = await prisma.task.findUnique({
    where: { id: parseInt(params.id) },
  })
  if (!task)
    return NextResponse.json("The task doesn't exists", { status: 404 })

  await prisma.task.delete({
    where: { id: parseInt(params.id) },
  })

  return NextResponse.json({})
}
