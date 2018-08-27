import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn} from "typeorm";


@Entity("travel_request_info")
@Index("fk_travel_request_info_travel1_idx",["travelId",])
export class TravelRequestInfo {

    @Column("int",{ 
        generated:true,
        nullable:false,
        primary:true,
        name:"id"
        })
        @PrimaryGeneratedColumn()
    id:number;
        

    @Column("int",{ 
        nullable:false,
        name:"travelId"
        })
    travelId:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:255,
        name:"name"
        })
    name:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:500,
        name:"contactData"
        })
    contactData:string;
        

    @Column("text",{ 
        nullable:false,
        name:"customerRequest"
        })
    customerRequest:string;
        

    @Column("timestamp",{ 
        nullable:false,
        default:"CURRENT_TIMESTAMP",
        name:"creationDate"
        })
    creationDate:Date;
        
}
