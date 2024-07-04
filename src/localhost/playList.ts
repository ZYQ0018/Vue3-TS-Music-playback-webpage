const TOKENNAME = 'playList';
export const set = (token: any) => {
    localStorage.setItem(TOKENNAME, token);
};
export const get = () => {
    return localStorage.getItem(TOKENNAME);
};
export const remove = () => {
    localStorage.removeItem(TOKENNAME);
};
