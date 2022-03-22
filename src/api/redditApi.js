
/* Aca se encuentran los consumos a las Apis con fetch que seran llamadas en su momento en la vista */

export const getAllHot = async () => {
    const response = await fetch(
        'https://api.reddit.com/r/pics/hot.json'
    );
    const data = await response.json();
    return data;
};

export const getAllRising = async () => {
    const response = await fetch(
        'https://api.reddit.com/r/pics/rising.json'
    );
    const data = await response.json();
    return data;
};

export const getAllNew = async () => {
    const response = await fetch(
        'https://api.reddit.com/r/pics/new.json'
    );
    const data = await response.json();
    return data;
};

export const getAllTop = async () => {
    const response = await fetch(
        'https://api.reddit.com/r/pics/top.json'
    );
    const data = await response.json();
    return data;
};