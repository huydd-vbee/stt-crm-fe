import React from 'react';
import {
  Typography,
  CardContent,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material';
import { StyledOrderDetailCard } from './index.style';

const CardComponent = ({ rows, iconHeader, title }) => (
  <StyledOrderDetailCard>
    <CardContent>
      <div className="header-card-style">
        <img src={iconHeader} alt="icon" />
        <Typography variant="h6">{title}</Typography>
      </div>
    </CardContent>
    <CardContent>
      <Table aria-label="simple table">
        <TableBody>
          {rows && rows.map((row) => (
            <TableRow className="style-border-table"  key={row.name}>
              <TableCell className="style-title-table">{row.name}</TableCell>
              <TableCell className="style-data-table" align={row.align || "left"}>
                {row.content}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </CardContent>
  </StyledOrderDetailCard>
);
export default CardComponent;
