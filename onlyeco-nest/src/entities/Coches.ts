import {Index,Entity, PrimaryColumn, Column, OneToOne, OneToMany, ManyToOne, ManyToMany, JoinColumn, JoinTable, PrimaryGeneratedColumn} from "typeorm";


@Entity("coches")
export class Coches {

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
        length:45,
        name:"marca"
        })
    marca:string;
        
}
