import { apiClientWalmart } from '../../../../common/infra/http/client';
import type { IProduceResponse, IProductRequest } from './interfaces/IProductRequest';
import { ProductAdapter } from './ProductAdapter';

export class ProductService {
  static async loadProducts(payload: IProductRequest): Promise<IProduceResponse> {
    const { data } = await apiClientWalmart.get<any>(
      `?keyword=${payload.criteria}&page=${payload.page}&sortBy=best_match`,
    );

    const newData = new ProductAdapter().normalizeProduct(data);

    return {
      products: newData.products,
      total: newData.total,
    };
  }
}
