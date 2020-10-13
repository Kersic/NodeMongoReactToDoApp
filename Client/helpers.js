export const colorRegex = new RegExp('^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$');

export const toDatePickerString = (date) => {
    return date.toISOString().slice(0, 10);
}