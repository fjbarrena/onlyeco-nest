import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn} from "typeorm";


@Entity("travel_day_by_day")
@Index("fk_travel_day_by_day_travel1_idx",["travelId",])
export class TravelDayByDay {

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
        name:"dayNumber"
        })
    dayNumber:number;
        

    @Column("int",{ 
        nullable:false,
        name:"travelId"
        })
    travelId:number;
        

    @Column("varchar",{ 
        nullable:false,
        length:250,
        name:"faIcon"
        })
    faIcon:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:250,
        name:"title"
        })
    title:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:7,
        name:"faColorHex"
        })
    faColorHex:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:7,
        name:"backgroundColorHex"
        })
    backgroundColorHex:string;
        

    @Column("varchar",{ 
        nullable:false,
        length:1000,
        name:"description"
        })
    description:string;
        
}
