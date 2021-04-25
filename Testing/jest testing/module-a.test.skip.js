const { covertToOrdinalNubmer } = require('./module-a');

describe.skip("Ordinal Number", () => {
    test("101 should be 101st", () => {
        expect(covertToOrdinalNubmer(101)).toBe('101st');
    });

    test("1012 should be 1012nd", () => {
        expect(covertToOrdinalNubmer(1012)).toBe('1012nd');
    });

    test("3 should be 3rd", () => {
        expect(covertToOrdinalNubmer(3)).toBe('3rd');
    });

    test("36 should be 36th", () => {
        expect(covertToOrdinalNubmer(36)).toBe('36th');
    });

    test("-1 should throw error 'number is negative'", () => {
        expect(() => covertToOrdinalNubmer(-1)).toThrowError('number is negative');
    });

    test("a should throw error 'cannot convert a to ordinal number'", () => {
        expect(() => covertToOrdinalNubmer('a')).toThrowError("cannot convert a to ordinal number");
    });


    test("3.14 should throw error 'cannot convert float number'", () => {
        expect(() => covertToOrdinalNubmer(3.14)).toThrowError("cannot convert float number");
    });
})