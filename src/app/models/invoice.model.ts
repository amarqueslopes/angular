import { Product } from "./product.model";

export class Invoice {
    id?: any;
    invoiceNumber?: string;
    clientName?: string;
    postedDate?: Date;
    status?: string;
    products?: Array<Product> = [];
    value?: number;
}
