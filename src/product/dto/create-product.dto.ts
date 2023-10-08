export class CreateProductDto {
    
    readonly proveedorId:number;
    
    readonly name:string;

    readonly costToBuy:number;

    readonly priceToSell:number;

    readonly units:number;

    readonly categoryProductId: number;

}