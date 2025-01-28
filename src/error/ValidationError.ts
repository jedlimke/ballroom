import { HttpStatusCodes } from "../constants/HttpStatusCodes";

export class ValidationError extends Error {
  statusCode: number;

  constructor(message: string, statusCode = HttpStatusCodes.BAD_REQUEST) {
    super(message);
    this.statusCode = statusCode;
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}
