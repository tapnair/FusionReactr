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

export const themeOptions = {
    palette: {
        type: 'light',
        primary: {
            main: '#000000',
            light: '#000000',
            dark: '#000000',
            contrastText: '#ffffff',
        },
        secondary: {
            main: '#ffffff',
            light: '#ffffff',
            dark: '#ffffff',
            contrastText: '#000000',
        },
        error: {
            main: '#d74e26',
            light: '#d74e26',
            dark: '#d74e26',
            contrastText: '#ffffff',
        },
        success: {
            main: '#2bc275',
            light: '#2bc275',
            dark: '#2bc275',
            contrastText: '#ffffff',
        },
        background: {
            default: '#cccccc',
            paper: '#ffffff',
        },
        status: {
            IDLE: '#cccccc',
            idle: '#cccccc',
            ERROR: '#d74e26',
            error: '#d74e26',
            RUNNING: '#5f60ff',
            COMPLETED: '#2bc275',
            success: '#2bc275',
        },
        text: {
            primary: '#000000',
            secondary: '#ffffff',
            disabled: '#666666',
            hint: '#666666',
            subtle: '#666666'
        },
    },
    shape: {
        borderRadius: 4,
    },
    spacing: 8,
    components: {
        MuiTableCell: {
            styleOverrides: {
                head: {
                    backgroundColor: '#000000',
                    color: '#ffffff'
                },
            }
        }
    },
    overrides: {
        MuiAppBar: {
            colorInherit: {
                backgroundColor: '#689f38',
                color: '#fff',
            },
        },
    },
};
