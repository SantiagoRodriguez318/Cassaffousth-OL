import { 
    Column, 
    Entity, 
    CreateDateColumn,
    UpdateDateColumn,
    BaseEntity,
    PrimaryGeneratedColumn,
    } from "typeorm";

    import { IsNumber, IsString, MaxLength} from 'class-validator';
    import { TipoDNI } from '../enum';


@Entity('user')

export class User extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({unique: true, nullable: false})
    @IsNumber()
    @MaxLength(10, { message: 'El DNI no puede exceder los 10 dígitos.' })
    Dni: number;

    @Column({type: 'enum', enum: TipoDNI, default: TipoDNI.DNI})  // Columna para el tipo de DNI
    TipoDNI: string;

    @Column({nullable: false})
    Nombre: string;
    
    @Column({nullable: false})
    Apellido: string;
    
    @Column({unique: true, nullable: true})
    @IsString()
    @MaxLength(100, { message: 'El email no puede exceder los 100 caracteres.' })
    Email: string;

    @Column({nullable: false})
    @IsString()
    Contraseña: string;

    @Column({nullable: false, unique: true})
    @IsNumber()
    @MaxLength(15, { message: 'El número de teléfono no puede exceder los 15 dígitos.' })
    Telefono: number;

    @Column({default:true})
    active :boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @Column({default:'Usuario'})
    Rol: string;

}   
