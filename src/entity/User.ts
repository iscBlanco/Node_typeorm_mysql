import { Column, CreateDateColumn , Entity,  PrimaryGeneratedColumn , Unique ,  UpdateDateColumn} from "typeorm";
import { MinLength, IsNotEmpty, IsEmail} from "class-validator";
import * as bcryptjs from "bcryptjs"

@Entity()
@Unique(['username'])
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @MinLength(6)
    @IsEmail()
    @IsNotEmpty()
    username: string;

    @Column()
    @MinLength(6)
    @IsNotEmpty()
    password: string;

    @Column()
    @IsNotEmpty()
    role: string;


    @Column()
    @CreateDateColumn()
    createdAt: Date;

    @Column()
    @UpdateDateColumn()
    UpdatedAt: Date;

    hashPassword():void{
        const salt = bcryptjs.genSaltSync(10);
        this.password = bcryptjs.hashSync(this.password, salt)
    }

    checkPassword(password: string): boolean{
        return bcryptjs.compareSync(password, this.password)
    }


}
