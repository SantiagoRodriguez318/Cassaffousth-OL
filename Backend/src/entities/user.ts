import { 
    Column, 
    Entity, 
    CreateDateColumn,
    UpdateDateColumn,
    PrimaryGeneratedColumn, 
    BaseEntity, 
    } from "typeorm";

@Entity('User')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn() //propiedad para ir agregando los id incrementalmente, osea 1,2,3 y así
    id: number

    @Column()
    firstname :string
    
    @Column()
    lastname :string
    
    @Column()
    active :boolean

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}   