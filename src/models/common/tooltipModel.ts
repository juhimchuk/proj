export class TooltipModel {
    header: string = "";
    data: {} = null;

    topPosition: number;
    leftPosition: number;
 
    public constructor(init?: Partial<TooltipModel>) {
        Object.assign(this, init);
    }
  }