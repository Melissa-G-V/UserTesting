const request = require("supertest");
const app = require("../../src/app");
const {cpf} = require("cpf-cnpj-validator");
const conection = require("../../src/database")




describe("Users",()=>{
    afterAll(()=>{
        conection.close();
    })
    
    it("it must be possible to create a new user", async () => {
        const response = await request(app).post("/user").send(
            {
                name:"daniel",
                cpf: cpf.generate(),
                email:"danoninho@gmail.com",
                cellphone:"539754569000",
                password:"abcderf"
            }
        );
    
        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveProperty("id")
           
    });

    


    it("it must be possible to find only one user by id", async () => {
        const response = await request(app).get("/user/1").send()
        
        
        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveLength(1);   
    });



    it("it must be possible to update existing user", async () => {
        let response = await request(app).post("/user").send(
            {
                name:"melissa",
                cpf: cpf.generate(),
                email:"melissagomesvictor@gmail.com",
                cellphone:"539754569000",
                password:"abcderf"
            }
        );

        response = await request(app).put("/user/2").send(
            {
                name:"rogeria",
                cpf: cpf.generate(),
                email:"LoveLove@gmail.com",
                cellphone:"539754569444",
                password:"123456"
            }
        );
        expect(response.ok).toBeTruthy();
        expect(response.body.okay).toEqual("Ok, User has been updated")
    });

    it("it must be possible to find all users", async () => {
        const response = await request(app).get("/user").send()

        console.log(response)
        expect(response.ok).toBeTruthy();
        expect(response.body).toHaveLength(2); 
    });


    it("it must be possible to delete existing user", async () => {
        let response = await request(app).post("/user").send(
            {
                name:"MyTest",
                cpf: cpf.generate(),
                email:"danone@gmail.com",
                cellphone:"539754569000",
                password:"abcderf"
            }
        );
    
        response = await request(app).delete("/user/3").send();
    
        expect(response.ok).toBeTruthy();
        expect(response.body.okay).toEqual("Ok, User has been deleted")
    });




});