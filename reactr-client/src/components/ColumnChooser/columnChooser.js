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
import styles from "./columnChooser.module.css";
import {ClickAwayListener, Popper} from "@mui/material";

import {getColumns, writeColumns} from "../../connector/fusionSender";


function arrayEquals(a, b) {
    return Array.isArray(a) &&
        Array.isArray(b) &&
        a.length === b.length &&
        a.every((val, index) => val === b[index]);
}

function writeLocalStorageColumnStates(newStorageColumnStates) {
    const message = JSON.stringify(newStorageColumnStates)
    writeColumns(message);
}

export function saveHiddenColumns(tableName, hiddenColumns) {
    const oldStorageColumnStates = getLocalStorageColumnStates();
    if (oldStorageColumnStates?.hasOwnProperty(tableName)) {
        if ((arrayEquals(oldStorageColumnStates[tableName], hiddenColumns))) {
            return
        }
    }
    const newStorageColumnStates = {...oldStorageColumnStates};
    newStorageColumnStates[tableName] = hiddenColumns;
    writeLocalStorageColumnStates(newStorageColumnStates);
}


async function getLocalStorageColumnStates() {
    const localStorageColumnStateString = await getColumns();

    if (localStorageColumnStateString) {
        const localStorageColumnStates = JSON.parse(localStorageColumnStateString);
        if (localStorageColumnStates) {
            return localStorageColumnStates
        }
    }
    return {}
}

export function getHiddenColumns(tableName) {
    const defaultColumns = {
        ParameterTable: ['Favorite', 'Comment', 'Parent'],
    }
    const oldStorageColumnStates = getLocalStorageColumnStates();
    // console.log('**********************************getHiddenColumns**************************');
    // console.log(oldStorageColumnStates);
    if (oldStorageColumnStates?.hasOwnProperty(tableName)) {
        return oldStorageColumnStates[tableName]
    }
    return defaultColumns[tableName] ?? []
}




export const ColumnChooserButton = ({name, allColumns, chooserName}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);

    const [open, setOpen] = React.useState(false);

    const handleClick = (event) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setOpen((prev) => !prev);
    };

    const handleClickAway = () => {
        console.log('click away');
        // setAnchorEl(null);
        setOpen(false);
    };

    const id = open ? 'simple-popper' : undefined;

    return (
        // FIXME not working
        <ClickAwayListener onClickAway={handleClickAway}>
            <>
                <div id={name} className={styles.columnChooserBtn} onClick={handleClick}>⚙</div>
                <Popper id={id} open={open} anchorEl={anchorEl}>
                    <ColumnChooser allColumns={allColumns} chooserName={chooserName}/>
                </Popper>
            </>
        </ClickAwayListener>
    )
}

export const ColumnChooser = ({allColumns, chooserName}) => {
    return (
        <div id={chooserName} style={{
            // display: 'none'
        }} className={styles.columnChooser}>
            <div className={styles.columnChooserContainer}>
                <div className={styles.columnChooserTitle}>Add/Remove Columns</div>
                {allColumns.map(column => column.id !== 'expander' ? (
                    <div key={column.id} className={styles.columnChooserItem}>
                        <label className={styles.columnChooserCb}>
                            <input className={styles.columnChooserCb} type="checkbox"
                                   {...column.getToggleHiddenProps()} />
                            {' '}{column.Header}
                        </label>
                    </div>
                ) : '')}
            </div>
        </div>
    )
}
