export function Exercise(values){
    const errors = {};

    if(!values.name || values.name.length<=0){
        errors.name = 'Name is required';
    }

    if(values.measureType==='' || values.measureType==='none'){
        errors.measureType = 'Please, select Measurement Type';
    }

    return errors;
}