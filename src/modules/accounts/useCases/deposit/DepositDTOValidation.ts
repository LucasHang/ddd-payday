import { isDefined, isNumber, min } from '@core/logic/GuardValidators';
import { ValidationProps } from '@shared/validators/implementations/MyDtoValidator';

const validations: Array<ValidationProps> = [
    {
        property: 'accountId',
        propertyName: 'Account',
        validators: [isDefined()],
    },
    {
        property: 'value',
        propertyName: 'Value',
        validators: [isDefined(), isNumber(), min(0)],
    },
];

export default validations;
