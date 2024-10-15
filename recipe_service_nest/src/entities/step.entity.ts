import { Column } from "typeorm";
import { QuantifiedIngredient } from "./quantified-ingredient.entity";

export class Step {
    @Column('json')
    ingredients: QuantifiedIngredient[];

    @Column('json')
    description: string;
}
