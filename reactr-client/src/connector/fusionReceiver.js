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

// Configure the max number of retries if the adsk object hasn't been loaded
const MAX_RETRIES = 5

// In some cases, especially with larger page loads like with React,
// the adsk object may not be available immediately during page load.
// In that case we will retry a few times to ensure our event handler is registered.
export function checkADSK(queryClient) {
    let attempts = 0;
    const adskWaiter = setInterval(function () {
        if (attempts > MAX_RETRIES) {
            clearInterval(adskWaiter);
        } else if (window.adsk) {
            clearInterval(adskWaiter);
            window.fusionJavaScriptHandler = {
                handle: handleFusionMessage(queryClient),
            };
        }
        attempts += 1;
    }, 500);
}

// This is where we handle incoming messages from Fusion.
// Configuring more actions can allow you to handle a variety of scenarios
const handleFusionMessage = (queryClient) =>
    (action, messageString) => {
        try {
            // This action is fired when a documentActivated occurs in Fusion
            // This indicates the user has opened or created a new document.
            // In that case we will invalidate the getParameters query
            // This will trigger the Parameter Table Controller to refetch parameter data for the model
            if (action === "newFile") {
                queryClient.invalidateQueries('getParameters');
            }

            // Handle debugger requests
            else if (action === "debugger") {
                debugger;

            } else {
                // Generic catch all for undefined actions.
                // It is important to still return SOMETHING to the Fusion Add-in
                return `Unexpected command type: ${action}`;
            }
        } catch (e) {
            // Log any errors that occur
            console.log(e);
        }

        // In some cases you could return more interesting data here
        // Use the same json string encoding technique above
        // For example if the add-in was requesting some status or other information
        return "OK";
    }
