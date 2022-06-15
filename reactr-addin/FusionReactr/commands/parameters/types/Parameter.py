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
import adsk.fusion
import adsk.core

app = adsk.core.Application.get()


class Parameter:

    def __init__(self, parameter: adsk.fusion.Parameter, sub_id=''):
        um = app.activeProduct.unitsManager

        self.parameter = parameter

        self.token = parameter.entityToken

        self.value = um.formatInternalValue(parameter.value, parameter.unit, False)
        self.expression = parameter.expression
        self.unit = parameter.unit
        self.comment = parameter.comment
        self.isUserParameter = True
        self.isFavorite = parameter.isFavorite

        self.is_deletable = parameter.isDeletable

        if parameter.objectType == adsk.fusion.UserParameter.classType():
            parameter: adsk.fusion.UserParameter
            self.is_user_parameter = True
            self.role = "N/A"
            self.component = parameter.design.rootComponent
            data_file = parameter.design.parentDocument.dataFile
            version_id = data_file and data_file.versionId
            self.created_by = "User"

        else:
            parameter: adsk.fusion.ModelParameter
            self.is_user_parameter = False
            self.role = parameter.role
            self.component = parameter.component
            version_id = parameter.component.parentDesign.parentDocument.dataFile.versionId
            self.created_by = parameter.createdBy.name

        self.id = f'{version_id}-parameter-{parameter.name}-{sub_id}'
        self.name = parameter.name
        self.versionId = version_id

        self.has_dependants = True if parameter.dependentParameters.count > 0 else False
        self.dependents = self.get_dependents()

    def get_dependents(self):
        dependents = []
        for i in range(self.parameter.dependentParameters.count):
            dependent = self.parameter.dependentParameters.item(i)
            _parameter = Parameter(dependent, self.id)
            dependents.append(_parameter.make_dict())
        if len(dependents) > 0:
            return dependents
        else:
            return None

    def make_dict(self):
        return {
            "id": self.id,
            "isUserParameter": self.is_user_parameter,
            "name": self.name,
            "versionId": self.versionId,
            "token": self.token,
            "value": self.value,
            "expression": self.expression,
            "unit": self.unit,
            "comment": self.comment,
            "isFavorite": self.isFavorite,
            "is_deletable": self.is_deletable,
            "hasDependants": self.has_dependants,
            "role": self.role,
            "subRows": self.dependents,
            "parent": self.component.name,
            "createdBy": self.created_by,
        }
