import { Column } from "typeorm";

export class QuantifiedIngredient {
    @Column('json')
    ingredient: string;

    @Column('json')
    quantity: number;
}
