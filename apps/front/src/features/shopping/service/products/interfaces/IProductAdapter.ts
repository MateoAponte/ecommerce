import type { Availability, IProduct, IRating } from '../../../types/Product';
import type { IProduceResponse } from './IProductRequest';

export abstract class IProductAdapter {
  abstract getAvailableProducts(product: any): Availability;
  abstract getBrand(product: any): string;
  abstract getCatalogProductType(product: any): string;
  abstract getDepartment(product: any): string;
  abstract getRating(product: any): IRating;
  abstract getPrice(product: any): number;
  abstract getThumbnail(product: any): string;
  abstract getPriceValue(product: any): number;
  abstract getName(product: any): string;
  abstract getDescription(product: any): string;
  abstract getId(product: any): string;
  abstract getCount(product: any): number;

  abstract normalizeProduct(products: any): IProduceResponse;

  normalizeData(products: any[]): IProduct[] {
    return products.map((product) => ({
      availability: this.getAvailableProducts(product),
      brand: this.getBrand(product),
      catalogProductType: this.getCatalogProductType(product),
      department: this.getDepartment(product),
      id: this.getId(product),
      name: this.getName(product),
      price: this.getPrice(product),
      priceValue: this.getPriceValue(product),
      rating: this.getRating(product),
      thumbnail: this.getThumbnail(product),
      image: this.getThumbnail(product),
      category: this.getDepartment(product),
    }));
  }

  normalize(products: any[], count: number): IProduceResponse {
    return {
      products: this.normalizeData(products),
      total: count,
    };
  }
}
