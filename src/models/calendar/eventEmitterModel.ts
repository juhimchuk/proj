import { SelectDayEvent } from './enums/selectDayEvent';

export class EventEmitterModel<TData> {
    data: TData;
    type: SelectDayEvent; 
  

    public constructor(init?:Partial<EventEmitterModel<TData>>) {
        Object.assign(this, init);
    }
  }