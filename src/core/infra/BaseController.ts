import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

export default abstract class BaseController {
    // or even private
    protected req!: Request;

    protected res!: Response;

    protected abstract executeImplementation(): Promise<void | any>;

    public async execute(req: Request, res: Response): Promise<void> {
        this.req = req;
        this.res = res;

        try {
            await this.executeImplementation();
        } catch (error) {
            this.fail(error);
        }
    }

    public static jsonResponse(res: Response, code: number, message: string): Response {
        return res.status(code).json({ message });
    }

    public ok<T>(res: Response, dto?: T): Response {
        if (dto) {
            return res.status(StatusCodes.OK).json(dto);
        }
        return res.sendStatus(StatusCodes.OK);
    }

    public fail(error: Error | string): Response {
        console.error(error);

        return this.res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({
            message: 'Não foi possível realizar a requisição',
        });
    }

    public clientError(message?: string): Response {
        return BaseController.jsonResponse(this.res, StatusCodes.BAD_REQUEST, message || 'Unauthorized');
    }

    public unauthorized(message?: string): Response {
        return BaseController.jsonResponse(this.res, StatusCodes.UNAUTHORIZED, message || 'Unauthorized');
    }

    public paymentRequired(message?: string): Response {
        return BaseController.jsonResponse(
            this.res,
            StatusCodes.PAYMENT_REQUIRED,
            message || 'Payment required',
        );
    }

    public forbidden(message?: string): Response {
        return BaseController.jsonResponse(this.res, StatusCodes.FORBIDDEN, message || 'Forbidden');
    }

    public notFound(message?: string): Response {
        return BaseController.jsonResponse(this.res, StatusCodes.NOT_FOUND, message || 'Not found');
    }

    public conflict(message?: string): Response {
        return BaseController.jsonResponse(this.res, StatusCodes.CONFLICT, message || 'Conflict');
    }

    public tooMany(message?: string): Response {
        return BaseController.jsonResponse(
            this.res,
            StatusCodes.TOO_MANY_REQUESTS,
            message || 'Too many requests',
        );
    }
}
