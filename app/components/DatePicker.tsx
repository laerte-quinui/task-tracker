import { useState } from 'react'
import TailwindDatePicker from 'tailwind-datepicker-react'
import { IOptions } from 'tailwind-datepicker-react/types/Options'

const DatePicker = ({ ...props }) => {
  const [show, setShow] = useState(false)

  const options: IOptions = {
    clearBtn: props.clearBtn,
    datepickerClassNames: 'h-fit',
    theme: {
      background: '!bg-slate-50',
      todayBtn:
        '!cursor-pointer !rounded-md !py-1 !bg-lime-500 hover:!bg-lime-600 !text-slate-800',
      clearBtn:
        '!cursor-pointer !bg-slate-300 !border-slate-300 !text-slate-500 hover:!bg-slate-200  hover:!border-slate-200 !rounded-md !py-1',
      icons: '!bg-slate-50 hover:!bg-slate-200 !text-slate-600 !cursor-pointer',
      text: '!text-slate-600 hover:!bg-slate-200',
      disabledText: '!text-slate-300 hover:!bg-slate-200',
      input:
        '!bg-transparent !border-gray-300 !text-gray-800 !py-1.5 !rounded-md dark:focus:!ring-red-400 focus:!border-gray-300',
      inputIcon: '',
      selected: '!bg-lime-500 hover:!bg-lime-400 !text-slate-800',
    },
  }

  return (
    <TailwindDatePicker
      {...props}
      show={show}
      setShow={setShow}
      classNames="relative"
      options={options}
    />
  )
}

export default DatePicker
