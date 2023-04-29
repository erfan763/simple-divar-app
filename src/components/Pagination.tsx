import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import { Dispatch, SetStateAction, useState } from 'react'
import { Stack, Pagination, PaginationItem, Box } from '@mui/material'

export default function CustomePagination({
  total,
  pagination,
  setPagination,
}: {
  total?: number
  pagination: {
    page: number
    pageSize: number
  }
  setPagination: Dispatch<
    SetStateAction<{
      page: number
      pageSize: number
    }>
  >
}) {
  const handlePagination = (event: any, value: any) => {
    setPagination({
      ...pagination,
      page: value,
    })
  }
  return (
    <Box display="flex" justifyContent="center">
      {total && total / pagination.pageSize > 1 && (
        <Stack mt={4} mb={4}>
          <Pagination
            count={Math.ceil(total / pagination.pageSize)}
            onChange={handlePagination}
            renderItem={(item: any) => (
              <PaginationItem
                components={{
                  previous: ArrowBackIcon,
                  next: ArrowForwardIcon,
                }}
                {...item}
              />
            )}
          />
        </Stack>
      )}
    </Box>
  )
}
