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

import {useExpanded, useGroupBy, useSortBy, useTable} from "react-table";

import {ParameterTableLayout} from "../ParameterTableLayout/parameterTableLayout";
import {parameterTableColumns} from "./parameterTableColumns";
import {getHiddenColumns} from "../ColumnChooser/columnChooser";

export const ParameterTable = ({data, updateExpression}) => {

    const [columns, memoData] = React.useMemo(() => {
        const columns = parameterTableColumns();
        const tableData = data?.userParameters ?? [];
        return [columns, tableData];
    }, [data]);

    const initialHiddenColumns = React.useMemo(
        () => getHiddenColumns("ParameterTable"),
        []
    );

    const tableInstance = useTable(
        {
            columns,
            data: memoData,
            expandSubRows: true,
            autoResetExpanded: true,
            initialState: {
                hiddenColumns: initialHiddenColumns
            },
            updateExpression
        },
        useGroupBy,
        useSortBy,
        useExpanded,
    );

    return (
        <ParameterTableLayout{...tableInstance}/>
    )
}
