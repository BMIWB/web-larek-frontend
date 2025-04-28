import { Model } from "./base/model";
import { IProduct } from "../types";

export class Product extends Model<IProduct> implements IProduct {
  description: string;
  id: string;
  image: string;
  title: string;
  price: number | null;
  category: string;
}