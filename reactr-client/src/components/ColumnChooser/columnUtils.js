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

import {getColumns, writeColumns} from "../../connector/fusionSender";

function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

export function saveHiddenColumns(tableName, hiddenColumns) {
    const oldStorageColumnStates = getHiddenColumns(tableName);
    if (oldStorageColumnStates) {
        if ((arrayEquals(oldStorageColumnStates, hiddenColumns))) {
            return
        }
    }
    const newStorageColumnStates = {...oldStorageColumnStates};
    newStorageColumnStates[tableName] = hiddenColumns;
    const message = JSON.stringify(newStorageColumnStates)
    writeColumns(message);
}

export async function getHiddenColumns(tableName) {
    const localStorageColumnStateString = await getColumns();
    if (localStorageColumnStateString) {
        const localStorageColumnStates = JSON.parse(localStorageColumnStateString);
        if (localStorageColumnStates) {
            if (localStorageColumnStates?.hasOwnProperty(tableName)) {
                return localStorageColumnStates[tableName]
            }
        }
    }
    return null
}
