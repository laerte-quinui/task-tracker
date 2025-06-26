import { patchTaskSchema } from '@/app/validationSchemas'
import { auth } from '@/auth'
import { prisma } from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await auth()
  if (!session) return NextResponse.json({}, { status: 401 })

  const user = await prisma.user.findUnique({
    where: { email: session!.user!.email! },
  })
  if (!user) return NextResponse.json({}, { status: 404 })

  const body = await request.json()
  const deadline = body.deadline ? new Date(body.deadline) : undefined

  const validation = patchTaskSchema.safeParse({ ...body, deadline })
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 })

  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  })
  if (!task)
    return NextResponse.json("The task doesn't exists", { status: 404 })

  const updatedTask = await prisma.task.update({
    where: { id: parseInt(id) },
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      deadline,
      userId: user.id,
    },
  })

  return NextResponse.json(updatedTask)
}

export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const session = await auth()
  if (!session) return NextResponse.json({}, { status: 401 })

  const task = await prisma.task.findUnique({
    where: { id: parseInt(id) },
  })
  if (!task)
    return NextResponse.json("The task doesn't exists", { status: 404 })

  await prisma.task.delete({
    where: { id: parseInt(id) },
  })

  return NextResponse.json({})
}
