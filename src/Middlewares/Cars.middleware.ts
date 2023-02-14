import { NextFunction, Request, Response } from 'express';
import { Types } from 'mongoose';

class ValidId {
  public static verify(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const { id } = req.params;

    if (!Types.ObjectId.isValid(id)) { 
      return res.status(422).json({ message: 'Invalid mongo id' }); 
    }

    next();
  }
}

export default ValidId;