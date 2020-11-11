const { it, describe, expect } = require('@jest/globals');
const { success } = require('./enhancer.js');
const enhancer = require('./enhancer.js');

// test away!
// - Items have `name`, `durability` and `enhancement`.
// - The item's `enhancement` it's a number from 0 to 20.
// - The item's `durability` it's a number from 0 to 100.
describe("Repair()", function () {
    it("Repair should restore durability 100", function () {
        //setup
        let actual = {
            "name": "test",
            "enhancement": 0,
            "durability": 0
        }
        const expected = {
            "name": "test",
            "enhancement": 0,
            "durability": 100
        }
        //execute
        actual = enhancer.repair(actual)
        //assert
        expect(actual.durability).toBe(expected.durability)
    })
})

describe("sucess()", () => {
    it("Success should increase enhancement by 1", function () {
        let actual = {
            "name": "test",
            "enhancement": 0,
            "durability": 0
        }
        const expected = {
            "name": "test",
            "enhancement": 1,
            "durability": 0
        }

        actual = enhancer.success(actual)
        expect(actual.enhancement).toBe(expected.enhancement)
    })
    it("Success should return new object with no changes if enhancement is 20", function () {
        let actual = {
            "name": "test",
            "enhancement": 20,
            "durability": 0
        }
        const expected = {
            "name": "test",
            "enhancement": 20,
            "durability": 0
        }

        actual = enhancer.success(actual)
        expect(actual.enhancement).toBe(expected.enhancement)
    })

})


// - If the item's enhancement is less than 15, the durability of the item is decreased by 5.
// - If the item's enhancement is 15 or more, the durability of the item is decreased by 10.
// - If the item's enhancement level is greater than 16, the enhancement level decreases by 1 (17 goes down to 16, 18 goes down to 17).

describe("fail()", () => {
    it("If enhancement < 15, durability decreased by 5.", () => {
        let actual = {
            "name": "test",
            "enhancement": 14,
            "durability": 100
        }
        const expected = {
            "name": "test",
            "enhancement": 20,
            "durability": 95
        }
        actual = enhancer.fail(actual)
        expect(actual.durability).toBe(expected.durability)

        actual.durability = 1
        expected.durability = 0
        actual = enhancer.fail(actual)
        expect(actual.durability).toBe(expected.durability)

        actual.durability = 5
        expected.durability = 0
        actual = enhancer.fail(actual)
        expect(actual.durability).toBe(expected.durability)


    })
    it("If enhancement >= 15, durability decreased by 10.", () => {
        let actual = {
            "name": "test",
            "enhancement": 15,
            "durability": 100
        }
        const expected = {
            "name": "test",
            "enhancement": 20,
            "durability": 90
        }
        actual = enhancer.fail(actual)
        expect(actual.durability).toBe(expected.durability)

        actual.durability = 8
        expected.durability = 0
        actual = enhancer.fail(actual)
        expect(actual.durability).toBe(expected.durability)
    })
    it("If enhancement > 16, enhancement decreased by 1.", () => {
        let actual = {
            "name": "test",
            "enhancement": 18,
            "durability": 100
        }
        const expected = {
            "name": "test",
            "enhancement": 17,
            "durability": 100
        }
        actual = enhancer.fail(actual)
        expect(actual.enhancement).toBe(expected.enhancement)
    })
})