import { FieldType } from "app/models/server-models/field-type.enum";
import { LAST_NAME, FIRST_NAME, PASSWORD, EMAIL } from "app/constants/field-names";

export const mapFieldTypeToName = {
    [FieldType.LAST_NAME]: LAST_NAME,
    [FieldType.FIRST_NAME]: FIRST_NAME,
    [FieldType.PASSWORD]: PASSWORD,
    [FieldType.EMAIL]: EMAIL
}

export const validateUrl = (myURL: string) => {
    var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i'); // fragment locator
  return !!pattern.test(myURL);
 }
