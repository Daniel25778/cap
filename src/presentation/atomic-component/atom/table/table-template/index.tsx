import { Table, TableContainer } from '@mui/material';
import type { FC, ReactNode } from 'react';
import type { SxProps } from '@mui/material';

interface TableTemplateProps {
  tableHeader: ReactNode;
  tableBody: ReactNode;
  height?: number | string;
  sx?: SxProps;
}

export const TableTemplate: FC<TableTemplateProps> = ({ tableHeader, sx, tableBody, height }) => {
  return (
    <TableContainer
      className={'overflow-auto'}
      sx={{
        ...sx,
        height: height ?? '98%'
      }}
    >
      <Table
        stickyHeader
        sx={{
          position: 'relative'
        }}
      >
        {tableHeader}
        {tableBody}
      </Table>
    </TableContainer>
  );
};
