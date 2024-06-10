
const regExpvaidations: any = {
    "REQUIRED": {
        pattern: /./,
        error: "Required filed!!!"
    },
    "EMAIL": {
        pattern: /^[a-zA-Z]{1}[a-zA-Z0-9_$]{0,}@[a-zA-Z]{3,7}\.[a-zA-Z]{2,3}$/,
        error: "Should be a valid email format!!!"
    },
    "MIN5CHAR": {
        pattern: /.{5}/,
        error: "Minimum 5 chars!!!"
    },
    "PHONE": {
        pattern: /^[0-9]{10}$/,
        error: "Exactly 10 digits!!!"
    }
}

function validate(inputControlObj: any) {
    const { criteria, value } = inputControlObj;
    inputControlObj.error = "";
    for (let text of criteria) {
        const { pattern, error } = regExpvaidations[text]
        if (!pattern.test(value)) {
            inputControlObj.error = error;
            break;
        }
    }
}
export function formLevelValidation(formControls: any, setFormControls: any) {
    const clonedFormControl: any = JSON.parse(JSON.stringify(formControls))
    const dataObj: any = {}
    clonedFormControl.forEach((obj: any) => {
        dataObj[obj.name] = obj.value;
        validate(obj)
    })

    const isFormValid = !clonedFormControl.some((obj: any) => obj.error)
    setFormControls(clonedFormControl)

    return [isFormValid, dataObj]
}

export function fieldLevelValidation(eve: any, formControls: any, setFormControls: any) {
    const { name, value } = eve.target;
    const clonedFormControl: any = JSON.parse(JSON.stringify(formControls))
    const inputControlObj: any = clonedFormControl.find((obj: any) => {
        return obj.name === name;
    })
    inputControlObj.value = value;
    validate(inputControlObj)
    setFormControls(clonedFormControl)
}

export function setDataToForm(formControls: any, setFormControls: any, data: any) {
    const clonedFormControl: any = JSON.parse(JSON.stringify(formControls))
    clonedFormControl.forEach((obj: any) => {
        obj.value = data[obj.name]
    })
    setFormControls(clonedFormControl)
}

export function clearFormData(formControls: any, setFormControls: any) {
    const clonedFormControl: any = JSON.parse(JSON.stringify(formControls))
    clonedFormControl.forEach((obj: any) => {
        obj.value = "";
    })
    setFormControls(clonedFormControl)
}