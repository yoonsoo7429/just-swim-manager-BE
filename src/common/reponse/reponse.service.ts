import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Response } from 'express';

@Injectable()
export class ResponseService {
  success(res: Response, message: string, data: any = null) {
    return res.status(200).json({
      status: true,
      message: message,
      data: data,
    });
  }

  error(
    res: Response,
    message: string,
    statusCode: number = HttpStatus.BAD_REQUEST,
    errors: any = null,
  ) {
    throw new HttpException(
      {
        status: false,
        message,
        errors,
      },
      statusCode,
    );
  }

  unauthorized(res: Response, message: string) {
    return this.error(res, message, 401);
  }

  notFound(res: Response, message: string) {
    return this.error(res, message, 404);
  }

  conflict(res: Response, message: string) {
    return this.error(res, message, 409);
  }

  forbidden(res: Response, message: string) {
    return this.error(res, message, 403);
  }

  internalServerError(res: Response, message: string, errors: any = null) {
    return this.error(res, message, 500, errors);
  }
}
