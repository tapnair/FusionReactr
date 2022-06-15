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
import {useQuery} from "react-query";

import {ParameterTable} from "../ParameterTable/parameterTable";
import {getFusionParameters, updateFusionParameters} from "../../connector/fusionSender";


export const ParameterTableController = ({queryClient}) => {
    const {isLoading, error, data} = useQuery(
        "getParameters",
        () => getFusionParameters(),
        {refetchOnWindowFocus: false}
    );

    const updateExpression = ({row, value}) => updateFusionParameters({
        parameterName: row.original.name,
        parameterInput: {
            expression: value,
            comment: "",
            isFavorite: row.original.isFavorite,
        }
    }).then(() => queryClient.invalidateQueries('getParameters'))

    if (isLoading) return "Loading...";
    if (error) return "An error has occurred: " + error.message;

    return (
        <ParameterTable data={data} updateExpression={updateExpression}/>
    )
}
