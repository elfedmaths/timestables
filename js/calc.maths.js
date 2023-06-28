function getCalc(type){
    switch (type) {
        case 'int-mult-2x2':
            var int1 = randomInt(10, 99), int2 = randomInt(10, 99);
            var quest = `${int1} &times; ${int2}`;
            var ans = int1 * int2;
            break;

        /* -------------------- End -------------------- */
        default:
            var quest = 'More Questions Coming Soon';
            var ans = '-';
            break;
    }
    return [quest, ans];
}