import { SelectDayEventType } from './enums/selectDayEventType';

export class EventEmitterModel<TData> {
    data: TData;
    type: SelectDayEventType;

    public constructor(init?: Partial<EventEmitterModel<TData>>) {
        Object.assign(this, init);
    }
}