import { iAttachment, iBase } from '.';

export interface iUnit extends iBase {
  key: string;
  color: any;
  featured: iAttachment;
  types: string[];
}

export interface iAttribute extends iBase {
  name: string;
  materialUnitsExtended: iUnit[];
  disabled: boolean;
  disableds: string[];
}
