import type { Availability, IRating } from '../../types/Product';
import { IProductAdapter } from './interfaces/IProductAdapter';
import type { IProduceResponse } from './interfaces/IProductRequest';

/**
 * Pattern: Adapter (ProductAdapter)
 * Benefit: Normalizes different product formats from external providers
 * to a consistent interface, decoupling the rest of the application
 * from changes in external providers.
 */
export class ProductAdapter extends IProductAdapter {
  getAvailableProducts(product: any): Availability {
    return product.availabilityStatusV2.value;
  }
  getBrand(product: any): string {
    return product.brand;
  }
  getCatalogProductType(product: any): string {
    return product.catalogProductType;
  }
  getDepartment(product: any): string {
    return product.department;
  }
  getRating(product: any): IRating {
    return {
      averageRating: product.rating.averageRating,
      numberOfReviews: product.rating.numberOfReviews,
    };
  }
  getPrice(product: any): number {
    return product.priceInfo.linePriceDisplay;
  }
  getThumbnail(product: any): string {
    return product.imageInfo.thumbnailUrl;
  }
  getName(product: any): string {
    return product.name;
  }
  getDescription(product: any): string {
    return product.description;
  }
  getId(product: any): string {
    return product.id;
  }
  getCount(products: any): number {
    return products.item.props.pageProps.initialData.searchResult.aggregatedCount;
  }
  getPriceValue(product: any): number {
    return Number(
      String(product.priceInfo.linePriceDisplay).replace(/([A-Za-z]*\s|\$)/g, '') ||
        10.99,
    );
  }

  normalizeProduct(products: any): IProduceResponse {
    const filteredProducts: any[] =
      products.item.props.pageProps.initialData.searchResult.itemStacks[0].items;
    const count = this.getCount(products);
    const onlyProducts = filteredProducts.filter(
      (p) => p.__typename.toLowerCase() === 'product',
    );

    return this.normalize(onlyProducts, count);
  }
}
