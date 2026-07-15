function encodeAm(mode) {
    switch (mode?.toLowerCase()) {
        case 'сушка':     return [1, 0, 0];
        case 'хранение':  return [0, 1, 0];
        case 'охлаждение': return [0, 0, 1];
        default:           return [0, 1, 0]; // По умолчанию хранение
    }
}

module.exports = { encodeAm }
