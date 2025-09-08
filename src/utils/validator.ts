import { z } from "zod";
import { ValidationError } from "../errors/validation.error";

export class Validator {
    static validate<T>(schema: z.ZodType<T>, data: unknown): T {
        try {
            return schema.parse(data);
        } catch (error) {
            if (error instanceof z.ZodError) {
                throw new ValidationError(
                    'Validation failed',
                    z.treeifyError(error),
                );
            }

            throw error;
        }
    }
}
