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

export const EditableCell = ({row, value: initialValue, updateExpression}) => {

    // We need to keep and update the state of the cell normally
    const [value, setValue] = React.useState(initialValue);
    const [lastValue, setLastValue] = React.useState(initialValue);

    const onChange = e => setValue(e.target.value)
    const onFocus = () => setLastValue(value)

    // updateExpression is a custom function that we supplied to our table instance
    // We'll only update the external data when the input is blurred and the value is changed
    const onBlur = () => (value !== lastValue) && updateExpression({row, value})

    // If the initialValue is changed external, sync it up with our state
    React.useEffect(() => setValue(initialValue), [initialValue])

    return <input value={value} onChange={onChange} onBlur={onBlur} onFocus={onFocus}/>
}

