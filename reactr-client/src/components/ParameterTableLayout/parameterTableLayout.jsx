/*
 * Copyright (c) 2022 Patrick Rainsberry
 * Permission to use, copy, modify, and distribute this software in object code form
 * for any purpose and without fee is hereby granted, provided that the above copyright
 * notice appears in all copies and that both that copyright notice and the limited
 * warranty and restricted rights notice below appear in all supporting documentation.
 *
 * THIS PROGRAM IS PROVIDED "AS IS" AND WITH ALL FAULTS. THE PUBLISHER SPECIFICALLY
 * DISCLAIMS ANY IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.
 * THE PUBLISHER DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
 * UNINTERRUPTED OR ERROR FREE.
 */
import React from 'react';

import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import TableBody from "@mui/material/TableBody";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";
import Paper from "@mui/material/Paper";

import {ParameterTableHeader} from "../ParameterTableHeader/parameterTableHeader";
import {ExpanderCell} from "../ExpanderCell/expanderCell";

export const ParameterTableLayout = (
    {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    }
) => {
    return (
        <Paper sx={{width: '100%', overflow: 'hidden'}}>
            <TableContainer sx={{height: '100vh', px: '5px'}}>
                <Table stickyHeader size="small" {...getTableProps()}>
                    <ParameterTableHeader headerGroups={headerGroups}/>
                    <TableBody {...getTableBodyProps()}>{rows.map((row, i) => {
                        prepareRow(row);
                        const rowProps = row.getRowProps();
                        return (
                            <TableRow {...rowProps} >{row.cells.map(cell => (
                                <TableCell
                                    {...cell.getCellProps()}
                                    style={row.isGrouped ? {background: '#cccccc'} : null}
                                    sx={{fontSize: 'medium'}}
                                >{cell.isGrouped
                                    ? (
                                        <>
                                            <ExpanderCell row={row}/>
                                            {' '}
                                            {cell.render('Cell')}
                                            ({row.subRows.length})
                                        </>
                                    )
                                    : cell.isAggregated
                                        ? (cell.render('Aggregated', {rowNumber: i + 1}))
                                        : cell.isPlaceholder
                                            ? null
                                            : (cell.render('Cell', {rowNumber: i + 1}))
                                }</TableCell>
                            ))}</TableRow>
                        )
                    })}</TableBody>
                </Table>
            </TableContainer>
        </Paper>)
}

