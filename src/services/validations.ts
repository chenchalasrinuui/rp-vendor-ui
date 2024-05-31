
const regExpvaidations:any={
    "REQUIRED":{
        pattern:/./,
        error:"Required filed!!!"
    },
    "EMAIL":{
        pattern:/^[a-zA-Z]{1}[a-zA-Z0-9_$]{0,}@[a-zA-Z]{3,7}\.[a-zA-Z]{2,3}$/,
        error:"Should be a valid email format!!!"
    },
    "MIN5CHAR":{
        pattern:/.{5}/,
        error:"Minimum 5 chars!!!"
    }
}

function validate(inputControlObj:any){
    const {criteria,value} =inputControlObj;
    inputControlObj.error="";
    for(let text of criteria){
        const {pattern,error}=regExpvaidations[text]
        if(!pattern.test(value)){
            inputControlObj.error=error;
            break;
        }
    }
}
export function formLevelValidation(formControls:any,setFormControls:any){
    const clonedFormControl: any = JSON.parse(JSON.stringify(formControls))
    const dataObj:any={}
    clonedFormControl.forEach((obj: any) => {
        dataObj[obj.name]=obj.value;
        validate(obj)
    })

    const isFormValid=!clonedFormControl.some((obj:any)=>obj.error)
    setFormControls(clonedFormControl)

    return [isFormValid,dataObj]
}

export function fieldLevelValidation(eve:any,formControls:any,setFormControls:any){
    const { name, value } = eve.target;
    const clonedFormControl: any = JSON.parse(JSON.stringify(formControls))
    const inputControlObj: any = clonedFormControl.find((obj: any) => {
        return obj.name === name;
    })
    inputControlObj.value = value;
    validate(inputControlObj)
    setFormControls(clonedFormControl)
}