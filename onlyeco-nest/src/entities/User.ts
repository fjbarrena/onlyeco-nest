import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn} from "typeorm";


@Entity("user")
export class User {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"id"
        })
        @PrimaryGeneratedColumn()
    id:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        name:"loginEmail"
        })
    loginEmail:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"name"
        })
    name:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"surname1"
        })
    surname1:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:100,
        name:"surname2"
        })
    surname2:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:512,
        name:"encryptedPassword"
        })
    encryptedPassword:string;
        

    @Column("int",{ 
        nullable:false,
        name:"badLoginCounter"
        })
    badLoginCounter:number;
        

    @Column("datetime",{ 
        nullable:false,
        name:"lastConnectionDate"
        })
    lastConnectionDate:Date;
        

    @Column("datetime",{ 
        nullable:false,
        name:"creationDate"
        })
    creationDate:Date;
        

    @Column("datetime",{ 
        nullable:false,
        name:"lastModificationDate"
        })
    lastModificationDate:Date;
        

    @Column("varchar",{ 
        nullable:true,
        length:100,
        name:"roles"
        })
    roles:string;
        

    @Column("int",{ 
        nullable:false,
        name:"ecoPoints"
        })
    ecoPoints:number;
        
}
