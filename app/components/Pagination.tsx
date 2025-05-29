'use client'
import { ArrowLeft01Icon, ArrowLeftDoubleIcon, ArrowRight01Icon, ArrowRightDoubleIcon } from '@hugeicons/core-free-icons'
import { HugeiconsIcon } from '@hugeicons/react'
import { Flex, IconButton, Text, Tooltip } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

interface Props {
  currentPage: number,
  pageSize: number,
  itemsTotal: number,
}

const Pagination = ({
  currentPage,
  pageSize,
  itemsTotal
}: Props ) => {

  const router = useRouter()
  const searchParams = useSearchParams()

  const pagesTotal = Math.ceil(itemsTotal / pageSize)
  if(itemsTotal <= pageSize) return null

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams)
    params.set('page', page.toString())
    router.push('?' + params.toString())
  }

  return (
    <Flex align='center' justify='between'>
      <Text color='gray'>Page {currentPage} of {pagesTotal}</Text>

      <Flex gap='2'>
        <Tooltip content='First page'>
          <IconButton
            color='gray'
            variant='outline'
            disabled={currentPage === 1}
            onClick={() => changePage(1)}
          >
            <HugeiconsIcon icon={ArrowLeftDoubleIcon} />
          </IconButton>
        </Tooltip>

        <Tooltip content='Previous page'>
          <IconButton
            color='gray'
            variant='outline'
            disabled={currentPage === 1}
            onClick={() => changePage(currentPage - 1)}
          >
            <HugeiconsIcon icon={ArrowLeft01Icon} />
          </IconButton>
        </Tooltip>

        <Tooltip content='Next page'>
          <IconButton
            color='gray'
            variant='outline'
            disabled={currentPage === pagesTotal}
            onClick={() => changePage(currentPage + 1)}
          >
            <HugeiconsIcon icon={ArrowRight01Icon} />
          </IconButton>
        </Tooltip>

        <Tooltip content='Last page'>
          <IconButton
            color='gray'
            variant='outline'
            disabled={currentPage === pagesTotal}
            onClick={() => changePage(pagesTotal)}
          >
            <HugeiconsIcon icon={ArrowRightDoubleIcon} />
          </IconButton>
        </Tooltip>
      </Flex>
    </Flex>
  )
}

export default Pagination
