import { FieldType } from "./field-type.enum";

export default interface FieldErrorSModel {
    field: FieldType[];
    location: string;
    messages: string[];
}