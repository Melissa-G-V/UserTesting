const generateID = require("../../src/utils/generateUUID")



describe("GenerateUUID",()=>{
    it("it must be possible to generate a new ID", () => {
        const id = generateID();

        expect(id).toBeDefined();
        expect(typeof id).toBe("string")
        expect(id).toHaveLength(36);
        console.log(id)
    })


})