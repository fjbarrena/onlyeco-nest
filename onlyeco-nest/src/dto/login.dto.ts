import {ApiModelProperty} from "@nestjs/swagger";

export class LoginDTO {
    @ApiModelProperty()
    email: string = '';
    @ApiModelProperty()
    password: string = '';
    
    constructor(object?: LoginDTO) {
        if(object) {
            this.email = object.email;
            this.password = object.password;
        }
        else {
            this.email = '';
            this.password = '';
        }
    }
    
    public static create(email: string, password: string): LoginDTO {
        let newObject: LoginDTO = new LoginDTO();
    
        newObject.email = email;
        newObject.password = password;
        
        return newObject;
    }
}