import { FieldType } from "../server-models/field-type.enum";

export default interface FieldErrorVM {
    field: FieldType;
    message: string;
}