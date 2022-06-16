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
import Popper from "@mui/material/Popper";
import ClickAwayListener from "@mui/material/ClickAwayListener";
import SettingsIcon from '@mui/icons-material/Settings';
import IconButton from "@mui/material/IconButton";
import {saveHiddenColumns} from "./columnUtils";
import Box from "@mui/material/Box";
import Checkbox from "@mui/material/Checkbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

export const ColumnChooserButton = ({allColumns, state: tState, tableName}) => {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [open, setOpen] = React.useState(false);
    const id = open ? 'column-chooser-popper' : undefined;

    const handleClick = (event) => {
        open && saveHiddenColumns(tableName, tState.hiddenColumns)
        setAnchorEl(anchorEl ? null : event.currentTarget);
        setOpen((prev) => !prev);
    };

    const clickAway = () => {
        open && saveHiddenColumns(tableName, tState.hiddenColumns)
        setAnchorEl(null);
        setOpen(false);
    };

    return (
        <ClickAwayListener onClickAway={clickAway}>
            <div>
                <IconButton
                    id={'settings-icon-button'}
                    aria-label="settings"
                    onClick={handleClick}
                    sx={{marginLeft: '16px'}}
                >
                    <SettingsIcon color='secondary'/>
                </IconButton>
                <Popper id={id} open={open} anchorEl={anchorEl}>
                    <ColumnChooserMenu allColumns={allColumns}/>
                </Popper>
            </div>
        </ClickAwayListener>
    )
}

export const ColumnChooserMenu = ({allColumns}) => {
    return (
        <Box sx={{border: '1px solid black', marginLeft: 2, marginTop: 2}}>
            <List sx={{width: '100%', maxWidth: 360, bgcolor: 'background.paper'}} disablePadding dense>
                <ListItem sx={{bgcolor: 'background.title'}} disablePadding>
                    <ListItemButton>
                        <ListItemText
                            primary='Add/Remove Columns'
                            primaryTypographyProps={{
                                color: 'text.primary',
                                fontWeight: 'bold',
                                variant: 'body1',
                            }}
                        />
                    </ListItemButton>
                </ListItem>
                {allColumns.map(column => column.id !== 'expander' ? (
                    <ListItem key={column.id} disablePadding>
                        <ListItemButton sx={{
                            borderBottom: '1px solid #cccccc',
                        }}>
                            <ListItemIcon>
                                <Checkbox
                                    color="primary"
                                    edge="start"
                                    tabIndex={-1}
                                    disableRipple
                                    size='small'
                                    {...column.getToggleHiddenProps()}
                                    sx={{
                                        color: '#cccccc',
                                        '&.Mui-checked': {
                                            color: '#666666',
                                        },
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText
                                primary={column.Header}
                                primaryTypographyProps={{
                                    color: 'text.subtle',
                                    fontWeight: 'bold',
                                    variant: 'body1',
                                }}
                            />
                        </ListItemButton>
                    </ListItem>
                ) : '')}
            </List>
        </Box>
    )
}
