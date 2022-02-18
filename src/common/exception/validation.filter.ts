import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import { ValidationException } from './validation.exception';

@Catch(ValidationException)
export class ValidationFilter implements ExceptionFilter {
  catch(exception: ValidationException, host: ArgumentsHost): any {
    let ctx = host.switchToHttp(),
      response = ctx.getResponse();

    return response.status(422).json({
      status: false,
      code: 422,
      message: exception.name,
      errors: exception.validationErrors,
    });
  }
}
