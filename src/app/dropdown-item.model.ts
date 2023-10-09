export interface DropdownItem {
    id: number;
    itemName: string;
  }

  export class DropdownItem {
    constructor(public id: number, public itemName: string) {}
  }