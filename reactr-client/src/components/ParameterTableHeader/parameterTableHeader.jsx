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
import * as React from 'react';
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableCell from "@mui/material/TableCell";

export const ParameterTableHeader = ({headerGroups}) => {
    return (
        <TableHead>{headerGroups.map(headerGroup => (
            <TableRow {...headerGroup.getHeaderGroupProps()}>{headerGroup.headers.map(column => (
                <TableCell
                    padding='none'
                    {...column.getHeaderProps()}
                    sx={{
                        color: 'text.secondary',
                        fontWeight: 'bold',
                        fontSize: 'medium'
                    }}
                >
                    {column.canGroupBy
                        ? (<span {...column.getGroupByToggleProps()}>
                                    {column.isGrouped ? '⊠ ' : '⧉ '}
                        </span>) : null
                    }
                    <span {...column.getSortByToggleProps()}>
                        {column.render('Header')}
                    </span>
                    <span>
                        {column.isSorted ? column.isSortedDesc ? ' ▽' : ' △' : '  '}
                    </span>
                </TableCell>
            ))}</TableRow>
        ))}</TableHead>
    )
}
