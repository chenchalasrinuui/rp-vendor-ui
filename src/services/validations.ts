
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

function validate(inputControlObj: any, inputControls: any) {
    const { criteria, value, compare } = inputControlObj;
    inputControlObj.error = "";
    for (let text of criteria) {
        if (text === "COMPARE") {
            const compareObj1 = inputControls.find((obj: any) => obj.name === compare[0])
            const compareObj2 = inputControls.find((obj: any) => obj.name === compare[1])
            if (compareObj1.value && compareObj2.value && compareObj1.value !== compareObj2.value) {
                inputControlObj.error = "Password mismatch";
                break;
            }

        } else {
            const { pattern, error } = regExpvaidations[text]
            if (!pattern.test(value)) {
                inputControlObj.error = error;
                break;
            }
        }
    }
}
export function formLevelValidation(formControls: any, setFormControls: any) {
    const clonedFormControl: any = JSON.parse(JSON.stringify(formControls))
    const dataObj: any = {}
    clonedFormControl.forEach((obj: any) => {
        dataObj[obj.name] = obj.value;
        validate(obj, clonedFormControl)
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
    validate(inputControlObj, clonedFormControl)
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