import {emailRuls} from "validation/global";

export function Verification(values){
    const errors = {
        ...emailRuls(values),
    };

    if(!values.verificationCode){
        errors.verificationCode = 'Veryfication Code is required';
    }else if(values.verificationCode.length<=2){
        errors.verificationCode = 'Invalid Veryfication Code';
    }

    return errors;
}