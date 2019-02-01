import {User} from './user.model';
import {Action} from './action.model';

export interface Message {
    from: string;
    message: any;
    topic: string;
    tripId: string;
}