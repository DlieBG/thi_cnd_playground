import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Step } from "./step.entity";

@Entity()
export class Recipe {
    @PrimaryGeneratedColumn()
    id: string;

    @Column()
    name: string;

    @Column()
    author: string;

    @Column()
    description: string;

    @Column('json')
    steps: Step[];
}
