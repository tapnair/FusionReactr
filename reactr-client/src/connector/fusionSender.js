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
import {sampleData} from "./sample";

// Get and set data from Fusion 360 by communicating to the main addin
// For testing and development we check if the adsk object is present.
// If not then return sample data
export const getFusionParameters = async () =>
    !!window.adsk
        ? JSON.parse(await fusionRequest("getParameters", {no: 'message'}))
        : sampleData

export const updateFusionParameters = async (message) =>
    !!window.adsk
        ? JSON.parse(await fusionRequest("updateParameter", message))
        : sampleData

export const getColumns = async () =>
    !!window.adsk
        ? fusionRequest("getColumns", {no: 'message'})
        : window.localStorage.getItem("localStorageColumnStates")

export const writeColumns = (message) =>
    !!window.adsk
        ? fusionRequest("writeColumns", message)
        : window.localStorage.setItem("localStorageColumnStates", message)


// This is the actual call to the Fusion 360 API
const fusionRequest = async (action, message) =>
    !!window.adsk
        ? window.adsk.fusionSendData(action, JSON.stringify(message))
        : {no: 'fusion'}
