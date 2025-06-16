'use client'
import { Card } from '@radix-ui/themes'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from 'recharts'

interface Props {
  statusQtd: {
    toDo: number
    doing: number
    done: number
  }
}

const TaskChart = ({ statusQtd: { toDo, doing, done } }: Props) => {
  const data = [
    { label: 'To do', value: toDo },
    { label: 'Doing', value: doing },
    { label: 'Done', value: done },
  ]

  return (
    <Card>
      <ResponsiveContainer width="100%" height={500}>
        <BarChart data={data} margin={{ top: 16 }}>
          <XAxis dataKey="label" />
          <YAxis />
          <CartesianGrid strokeDasharray="8 8" vertical={false} />
          <Bar
            dataKey="value"
            barSize="24"
            radius={6}
            style={{ fill: 'var(--accent-8)' }}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  )
}

export default TaskChart
