import restrictedUsernames from './constants/restrictedUsernames';

export const capitalize = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const isUsernameRestricted = username => {
    return restrictedUsernames.some(restricted => username.toLowerCase() === restricted.toLowerCase() || username.toLowerCase().includes(restricted.toLowerCase()));
}