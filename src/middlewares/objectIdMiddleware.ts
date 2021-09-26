import { Request, Response, NextFunction } from "express";
import { StatusCodes } from "http-status-codes";
import { createHttpErrorResponse } from "../utils";
import { isValidMongooseObjectId } from "../utils/mongooseUtils";

export const objectIdMiddleware = ({ params: { id } ,t}: Request, res: Response, next: NextFunction) => !isValidMongooseObjectId(id) ? createHttpErrorResponse(res, StatusCodes.BAD_REQUEST, t("middleware:not_valid_object_id")) : next();