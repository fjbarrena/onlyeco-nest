import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn} from "typeorm";


@Entity("travel_resource")
@Index("fk_travel_resource_travel_idx",["travelId",])
@Index("fk_travel_resource_travel_resource_type1_idx",["travelResourceTypeId",])
export class TravelResource {

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
        length:300,
        name:"value"
        })
    value:string;
        

    @Column("int",{ 
        nullable:false,
        name:"travelId"
        })
    travelId:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:3000,
        name:"extendedValue"
        })
    extendedValue:string;
        

    @Column("int",{ 
        nullable:false,
        name:"travelResourceTypeId"
        })
    travelResourceTypeId:number;
        
}
