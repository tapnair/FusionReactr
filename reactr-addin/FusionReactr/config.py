#  Copyright (c) 2022 Patrick Rainsberry
#  Permission to use, copy, modify, and distribute this software in object code form
#  for any purpose and without fee is hereby granted, provided that the above copyright
#  notice appears in all copies and that both that copyright notice and the limited
#  warranty and restricted rights notice below appear in all supporting documentation.
#
#  THIS PROGRAM IS PROVIDED "AS IS" AND WITH ALL FAULTS. THE PUBLISHER SPECIFICALLY
#  DISCLAIMS ANY IMPLIED WARRANTY OF MERCHANTABILITY OR FITNESS FOR A PARTICULAR USE.
#  THE PUBLISHER DOES NOT WARRANT THAT THE OPERATION OF THE PROGRAM WILL BE
#  UNINTERRUPTED OR ERROR FREE.

import os

DEBUG = True

# Set true to run local dev server
# If set False, Execute: npm run build
# This will build the latest changes to static site
REACT_DEV = True

ADDIN_NAME = os.path.basename(os.path.dirname(__file__))
COMPANY_NAME = "Autodesk"

# Name for a directory in user home to store data
user_dir_name = f'{ADDIN_NAME}'

# Design Workspace
design_workspace = 'FusionSolidEnvironment'

# Tabs
design_utilities_tab_id = f'ToolsTab'
design_utilities_tab_name = f'UTILITIES'

# Panels
react_demo_panel_name = 'REACTR'
react_demo_panel_id = f'{ADDIN_NAME}_react_demo_panel'
react_demo_panel_after = 'SolidScriptsAddinsPanel'

# Palettes
parameter_table_palette_name = 'Fusion 360 Reactr'
parameter_table_palette_id = f'{ADDIN_NAME}_parameter_table_palette_id '

if REACT_DEV:
    parameter_table_palette_url = 'http://localhost:3000/'
else:
    parameter_table_palette_url = os.path.join(os.path.dirname(os.path.abspath(__file__)),
                                               'reactr-client', 'build', '')


# Reference for use in some commands
all_workspace_names = [
    'FusionSolidEnvironment', 'GenerativeEnvironment', 'PCBEnvironment', 'PCB3DEnvironment', 'Package3DEnvironment',
    'FusionRenderEnvironment', 'Publisher3DEnvironment', 'SimulationEnvironment', 'CAMEnvironment', 'DebugEnvironment',
    'FusionDocumentationEnvironment', 'ElectronEmptyLbrEnvironment', 'ElectronDeviceEnvironment',
    'ElectronFootprintEnvironment', 'ElectronSymbolEnvironment', 'ElectronPackageEnvironment'
]
