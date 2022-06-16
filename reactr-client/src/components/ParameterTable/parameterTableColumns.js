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

import React from "react";
import {ExpanderCell} from "../ExpanderCell/expanderCell";
import {ColumnChooserButton} from "../ColumnChooser/columnChooser";
import {EditableCell} from "../EditableCell/editableCell";

// Define behavior for all columns in the table
export const parameterTableColumns = () => [
    {
        Header: (T) => ColumnChooserButton(T),
        id: 'expander',
        Cell: ExpanderCell,
        disableGroupBy: true,
        Aggregated: () => '',
    },
    {
        Header: '#',
        id: 'rowIndex',
        Cell: ({rowNumber}) => rowNumber ? (<span>{rowNumber}</span>) : '',
        disableGroupBy: true,
    },
    {
        Header: 'Name',
        accessor: (d) => d.name,
        aggregate: 'count',
        Aggregated: ({value}) => `${value}`,
    },
    {
        Header: 'Value',
        accessor: (d) => d.value,
        aggregate: null,
        Cell: ({value}) => `${parseFloat(value).toFixed(3)}`,
        disableGroupBy: true,
    },
    {
        Header: 'Units',
        accessor: (d) => d.unit,
        aggregate: 'count',
        Aggregated: ({value}) => `${value}`,
    },
    {
        Header: 'Expression',
        accessor: (d) => d.expression,
        Cell: EditableCell,
        aggregate: null,
        disableGroupBy: true,
    },
    {
        Header: 'Created By',
        accessor: (d) => d.createdBy,
        aggregate: countIfValue,
        Aggregated: ({value}) => `${value}`,

    },
    {
        Header: 'Role',
        accessor: (d) => d.role,
        aggregate: countIfValue,
        Aggregated: ({value}) => `${value}`,
        disableGroupBy: true,
    },
    {
        Header: 'Parent',
        accessor: (d) => d.parent,
        aggregate: countIfValue,
        Aggregated: ({value}) => `${value}`,
        disableGroupBy: true,
    },
    {
        Header: 'Comment',
        accessor: (d) => d.comment,
        aggregate: countIfValue,
        Aggregated: ({value}) => `${value}`,
        disableGroupBy: true,
    },
    {
        Header: 'Favorite',
        accessor: (d) => d.isFavorite,
        Cell: ({value}) => (<span>{value ? "✔" : ""}</span>),
        aggregate: countIfValue,
        Aggregated: ({value}) => `${value ? "✔" : ""}`,
    },
]


function countIfValue(leafValues) {
    const nonEmptyErrors = leafValues.filter(e => e);
    return nonEmptyErrors.length
}
