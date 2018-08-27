import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn} from "typeorm";


@Entity("travel")
export class Travel {

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
        length:100,
        name:"title"
        })
    title:string;
        

    @Column("text",{ 
        nullable:false,
        name:"description"
        })
    description:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        name:"since"
        })
    since:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        name:"toLast"
        })
    toLast:string;
        

    @Column("int",{ 
        nullable:false,
        name:"sincePrice"
        })
    sincePrice:number;
        

    @Column("int",{ 
        nullable:false,
        name:"ecoLevel"
        })
    ecoLevel:number;
        

    @Column("int",{ 
        nullable:false,
        name:"criteria1"
        })
    criteria1:number;
        

    @Column("int",{ 
        nullable:false,
        name:"criteria2"
        })
    criteria2:number;
        

    @Column("int",{ 
        nullable:false,
        name:"criteria3"
        })
    criteria3:number;
        

    @Column("int",{ 
        nullable:false,
        name:"criteria4"
        })
    criteria4:number;
        

    @Column("int",{ 
        nullable:false,
        name:"criteria5"
        })
    criteria5:number;
        

    @Column("int",{ 
        nullable:false,
        name:"criteria6"
        })
    criteria6:number;
        

    @Column("tinyint",{ 
        nullable:false,
        name:"active"
        })
    active:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:500,
        name:"shortDescription"
        })
    shortDescription:string;
        

    @Column("datetime",{ 
        nullable:true,
        name:"automaticExpirationDate"
        })
    automaticExpirationDate:Date;
        

    @Column("text",{ 
        nullable:true,
        name:"ecoReasons"
        })
    ecoReasons:string;
        

    @Column("text",{ 
        nullable:true,
        name:"prices"
        })
    prices:string;
        
}
