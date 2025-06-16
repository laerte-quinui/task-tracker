import { taskSchema } from '@/app/validationSchemas'
import { auth } from '@/auth'
import { prisma } from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  const session = await auth()
  if (!session) return NextResponse.json({}, { status: 401 })

  const body = await request.json()
  const deadline = new Date(body.deadline)

  const validation = taskSchema.safeParse({ ...body, deadline })
  if (!validation.success)
    return NextResponse.json(validation.error.errors, { status: 400 })

  const newTask = await prisma.task.create({
    data: {
      title: body.title,
      description: body.description,
      status: body.status,
      deadline,
    },
  })
  return NextResponse.json(newTask, { status: 201 })
}
