import { FormGroup, ValidatorFn } from '@angular/forms';

export function CheckingPasswordsValidator(targetKey: string, toMatchKey: string): ValidatorFn {
    return (group: FormGroup): { [key: string]: boolean } => {
        const target = group.controls[targetKey]
        const toMatch = group.controls[toMatchKey]
        const isMatch = target.value === toMatch.value
        if (!isMatch && target.valid && toMatch.valid) {
            toMatch.setErrors({ isequal: true })
            return { 'isequal': true }
        }
        if (isMatch && toMatch.hasError('equalValue')) {
            toMatch.setErrors(null)
        }
        return null
    }
}