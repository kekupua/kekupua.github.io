let BASE_VALUE = 8;

export let getScaledSize = (scale) => {
    return `${scale * BASE_VALUE}px`;
}

export let sizes = {
    _001: '1px',
    _025: '2px',
    _050: '4px',
    _075: '6px',
    _100: `${BASE_VALUE}px`,
    _200: `${BASE_VALUE * 2}px`,
    _300: `${BASE_VALUE * 3}px`,
    _400: `${BASE_VALUE * 4}px`,
    _500: `${BASE_VALUE * 5}px`,
};

export default sizes;