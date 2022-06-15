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
import json
import adsk.core
import adsk.fusion

from .types.Parameter import Parameter

app = adsk.core.Application.get()
ui = app.userInterface


def get_design() -> adsk.fusion.Design:
    return app.activeDocument.products.itemByProductType('DesignProductType')


def process_request(html_args: adsk.core.HTMLEventArgs):
    message_data: dict = json.loads(html_args.data)
    message_action = html_args.action

    # Read message sent from palette javascript and react appropriately.
    ACTION_MAP = {
        'getParameters': get_parameters,
        'updateParameter': update_parameter
    }
    action_function = ACTION_MAP.get(message_action)

    if action_function:
        result = action_function(message_data)

    else:
        result = 'no valid action'

    # IMPORTANT Set the returnData field
    # This is the response to the original javascript request
    html_args.returnData = json.dumps(result)


# Get the active document parameter table
def get_parameters(message_data):
    design = get_design()
    all_user_parameters = []
    parameter: adsk.fusion.UserParameter
    for parameter in design.allParameters:
        all_user_parameters.append(Parameter(parameter))
    results = {
        'userParameters': [p.make_dict() for p in all_user_parameters]
    }
    return results


# Update a single parameter in the active document
def update_parameter(message_data):
    design = get_design()

    parameter_name = message_data.get('parameterName', False)
    parameter_input = message_data.get('parameterInput', {})
    parameter_expression = parameter_input.get('expression', False)
    parameter_comment = parameter_input.get('comment', "")
    parameter_is_favorite = parameter_input.get('isFavorite', "")

    update_parameter_result = {
        "name": parameter_name,
        "status": "",
        "oldExpression": "",
        "newExpression": parameter_expression,
        "comment": parameter_comment,
        "isFavorite": parameter_is_favorite,
        "image_string": "",
    }

    workspace = ui.workspaces.itemById("FusionSolidEnvironment")
    if not workspace.isActive:
        workspace.activate()

    ui.activeSelections.clear()
    um = design.unitsManager

    if design.designType == adsk.fusion.DesignTypes.ParametricDesignType:
        all_parameters = design.allParameters
        this_parameter = all_parameters.itemByName(parameter_name)

        if this_parameter is not None:
            unit_type = this_parameter.unit
            update_parameter_result["oldExpression"] = this_parameter.expression

            if parameter_expression != "":
                if um.isValidExpression(parameter_expression, unit_type):
                    if parameter_expression != this_parameter.expression:
                        this_parameter.expression = parameter_expression

                else:
                    update_parameter_result['status'] = "Invalid Expression"

            if parameter_comment != "":
                this_parameter.comment = parameter_comment

            if parameter_is_favorite != "":
                this_parameter.isFavorite = parameter_is_favorite

            _parameter = None
            if isinstance(this_parameter, adsk.fusion.ModelParameter):
                _parameter = Parameter(this_parameter)
                update_parameter_result['status'] = "Updated Model Parameter"

            elif isinstance(this_parameter, adsk.fusion.UserParameter):
                update_parameter_result['status'] = "Updated User Parameter"
                _parameter = Parameter(this_parameter)

            else:
                update_parameter_result['status'] = "Parameter doesn't exist"

            if _parameter:
                update_parameter_result['parameter'] = _parameter.make_dict()

        else:
            update_parameter_result['status'] = "Parameter doesn't exist"
    else:
        update_parameter_result['status'] = "Design isn't parametric"

    results = {'updateParameterInVersion': update_parameter_result}
    return results

