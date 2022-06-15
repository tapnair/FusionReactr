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
import styles from "./parameterTable.module.css"
import {ColumnChooserButton} from "../ColumnChooser/columnChooser";
import {EditableCell} from "../EditableCell/editableCell";

// Define behavior for all columns in the table
export const parameterTableColumns = () => [
    {
        Header: ({allColumns}) => ColumnChooserButton({
            chooserName: 'parameterTableChooser',
            name: 'parameterTableChooserButton',
            allColumns
        }),
        id: 'expander',
        Cell: ExpanderCell,
        className: `${styles.left}`,
        disableGroupBy: true,
        Aggregated: () => '',
        headerClassName: `${styles.center}`
    },
    {
        Header: '#',
        id: 'rowIndex',
        Cell: ({rowNumber}) => rowNumber ? (<span>{rowNumber}</span>) : '',
        className: `${styles.center} ${styles.index}`,
        disableGroupBy: true,
    },
    {
        Header: 'Name',
        accessor: (d) => d.name,
        className: `${styles.left}`,
        aggregate: 'count',
        Aggregated: ({value}) => `${value}`,
    },
    {
        Header: 'Value',
        accessor: (d) => d.value,
        className: `${styles.left}`,
        aggregate: null,
        Cell: ({value}) => `${parseFloat(value).toFixed(3)}`,
        disableGroupBy: true,
    },
    {
        Header: 'Units',
        accessor: (d) => d.unit,
        className: `${styles.center}`,
        aggregate: 'count',
        Aggregated: ({value}) => `${value}`,
    },
    {
        Header: 'Expression',
        accessor: (d) => d.expression,
        className: `${styles.left}`,
        Cell: EditableCell,
        aggregate: null,
        disableGroupBy: true,
    },
    {
        Header: 'Created By',
        accessor: (d) => d.createdBy,
        className: `${styles.left}`,
        aggregate: countIfValue,
        Aggregated: ({value}) => `${value}`,

    },
    {
        Header: 'Role',
        accessor: (d) => d.role,
        className: `${styles.left}`,
        aggregate: countIfValue,
        Aggregated: ({value}) => `${value}`,
        disableGroupBy: true,
    },
    {
        Header: 'Parent',
        accessor: (d) => d.parent,
        className: `${styles.left}`,
        aggregate: countIfValue,
        Aggregated: ({value}) => `${value}`,
        disableGroupBy: true,
    },
    {
        Header: 'Comment',
        accessor: (d) => d.comment,
        className: `${styles.left}`,
        aggregate: countIfValue,
        Aggregated: ({value}) => `${value}`,
        disableGroupBy: true,
    },
    {
        Header: 'Favorite',
        accessor: (d) => d.isFavorite,
        Cell: ({value}) => (<span>{value ? "✔" : ""}</span>),
        className: `${styles.center}`,
        aggregate: countIfValue,
        Aggregated: ({value}) => `${value ? "✔" : ""}`,
    },
]


function countIfValue(leafValues) {
    const nonEmptyErrors = leafValues.filter(e => e);
    return nonEmptyErrors.length
}
