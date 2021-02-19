import { AbstractControl, AsyncValidatorFn, ValidationErrors } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ServerService } from '../services/server.service';

export class IDValidator {
    static createValidator(ServerService: ServerService): AsyncValidatorFn {
        return (control: AbstractControl): Observable<ValidationErrors> => {
            return ServerService.getallusersid(control.value).pipe(
                map((result: boolean) => result ? null : { invalidAsync: true })
            )
        }
    }
}