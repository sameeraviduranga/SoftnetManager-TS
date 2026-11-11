import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
export const fromDayjs = (date) => {
    return date && dayjs.isDayjs(date) && date.isValid() ? date.format("YYYY-MM-DD") : null;

}

export const toDayjs = (date) => {
    return date ? dayjs(date) : null;

}