export const NO_EMPTY_RULE = [
    v => !!v || 'Pole jest wymagane'
];

export const NUMBER_ONLY_RULE = [
    v => !!v || 'Pole jest wymagane',
    v => !isNaN(v) || 'Pole musi być liczbą'
];

export const INTEGER_ONLY_RULE = [
    v => v % 1 === 0 || 'Pole musi być liczbą całkowitą',
    v => !!v || 'Pole jest wymagane',
    v => !isNaN(v) || 'Pole musi być liczbą całkowitą'
];