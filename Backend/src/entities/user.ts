import { 
    Column, 
    Entity, 
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    PrimaryGeneratedColumn,
    } from "typeorm";

@Entity('user')
export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique: true, nullable: false})
    Dni: number;

    @Column({nullable: false})
    firstname :string;
    
    @Column({nullable: false})
    lastname :string;
    
    @Column({unique: true, nullable: true})
    email :string;

    @Column({
        default:true
    })
    active :boolean;

    @Column({ type: 'boolean', default: false })
    confirmacion: boolean;

    @Column({ type: 'varchar', length: 6, nullable: true })
    confirmationCode: string | null; // <-- Nuevo campo para el código

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;


    @Column({
        default:false
    })
    Rol: boolean;

}   