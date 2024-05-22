import { Media } from './media.interface';
import { UserData } from './user-data.interface';

export interface NewsDetail{
    id: number;
    title: string;
    description: string;
    content: string;
    user: UserData;
    mediaList: Media[];
}