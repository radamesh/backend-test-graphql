// import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
// import { AddProductToCartInput, ChangeProductInput, CreateCartInput, GetCartRecoveryInput, InstallmentSuggestionInput, MaybeAddProductsToCart, MaybeChangeProduct, MaybeCreateCart, MaybeGetCartRecovery, Product, RemoveFromCartInput, RemoveItensFromCartInput, UpdateProductNumberInput, MaybeGetInstallmentSuggestionRecovery, MaybeUpdateProductNumberToCart, MaybeApplyCoupom, ApplyCupomInput, MaybeRemoveCoupom, RemoveCupomInput } from "./CartTypes";
// import { CartService } from "./CartService";
// import { MyContext } from "../MyContext";
// import { IncomingHttpHeaders } from "http";
// import { ErrorHandler } from "../../utils/ErrorHandler";
// import { CatalogService } from "../Catalog/CatalogService";
// import { GetStockProductRecovery } from "../Catalog/CatalogType";
// import { ErrorResponse } from "../BaseType";
//
// @Resolver()
// export class CartResolver {
//
//   private TAM_SKU = 9;
//
//   private api = new CartService();
//
//   private catalog = new CatalogService();
//
//   @Mutation(() => MaybeCreateCart)
//   async createCart(
//     @Ctx() ctx: MyContext,
//     @Arg("data") data: CreateCartInput
//   ) {
//     const header: IncomingHttpHeaders = ctx.req.headers;
//     return await this.api.createCart(data.storeId, data.userId, data.collaboratorId || "", data.oldCartId || "", header);
//   }
//
//   async hasStock(products: Product[], storeId: string, headers: any) {
//     const skusToUpdate = products.filter(product => !product.stockStatus).map(product => product.skuId);
//
//     if (skusToUpdate.length === 0) return products;
//     const skusNotToUpdate = products.filter(product => product.stockStatus).map(product => product.skuId);
//     const response: GetStockProductRecovery | ErrorResponse = await this.catalog.getStockProductRecovery('SAP', storeId, skusToUpdate, headers);
//
//     if (response instanceof GetStockProductRecovery) {
//       const stockDataMap: Record<string, Product> = {};
//
//       for (const product of products) {
//         stockDataMap[product.skuId] = product;
//       }
//
//       const stockResponses = response.data;
//
//       for (const stockData of stockResponses) {
//         const product = stockDataMap[stockData.skuId];
//         if (!stockData.purchasable) {
//           throw ErrorHandler.errorHandler('addProductToCart', `Product ${stockData.skuId} is not available`);
//         }
//
//         const offlineStockLevel = stockData.stock.offline.stockLevel;
//         const onlineStockLevel = stockData.stock.online.stockLevel;
//         if (product.quantity <= offlineStockLevel) {
//           product.stockStatus = 'INLOCALSTORE';
//         } else if (product.quantity <= onlineStockLevel) {
//           product.stockStatus = 'INSTOCK';
//         } else {
//           throw ErrorHandler.errorHandler('addProductToCart', `No stock for product ${stockData.skuId}`);
//         }
//       }
//     } else {
//       throw ErrorHandler.errorHandler('getStockProductRecovery', response);
//     }
//
//     const updatedProducts = products.filter(product => skusNotToUpdate.includes(product.skuId) || product.stockStatus);
//     return updatedProducts;
//   }
//
//
//   @Mutation(() => MaybeAddProductsToCart)
//   async addProductToCart(
//     @Ctx() ctx: MyContext,
//     @Arg('data', { validate: true }) data: AddProductToCartInput,
//   ) {
//     const header: IncomingHttpHeaders = ctx.req.headers;
//     const products = data.product;
//
//     for (const product of products) {
//       if(product.skuId.length != this.TAM_SKU) {
//
//         const skuResponse = await this.catalog.getSkuProductByEan(product.skuId, header);
//         this.validateResponse(skuResponse);
//
//         product.prodId = skuResponse.toString();
//         product.skuId = skuResponse.toString();
//       }
//     }
//     const updatedProducts = await this.hasStock(products, data.storeId, header);
//     return await this.api.addProductToCart(data.cartId, data.storeId, data.userId, updatedProducts, header);
//   }
//
//
//   @Mutation(() => MaybeAddProductsToCart)
//   async removeProductFromCart(
//     @Ctx() ctx: MyContext,
//     @Arg("data") data: RemoveFromCartInput
//   ) {
//     const header: IncomingHttpHeaders = ctx.req.headers;
//     return await this.api.removeProductFromCart(data.storeId, data.userId, data.cartId, data.itemId, header);
//   }
//
//   @Mutation(() => MaybeAddProductsToCart)
//   async removeProductsFromCart(
//     @Ctx() ctx: MyContext,
//     @Arg("data") data: RemoveItensFromCartInput
//   ) {
//     const header: IncomingHttpHeaders = ctx.req.headers;
//     return await this.api.removeProductsToCart(data.storeId, data.userId, data.cartId, data.itens, header);
//   }
//
//   @Mutation(() => MaybeUpdateProductNumberToCart)
//   async updateProductNumber(
//     @Ctx() ctx: MyContext,
//     @Arg("data") data: UpdateProductNumberInput
//   ) {
//     const header: IncomingHttpHeaders = ctx.req.headers;
//     return await this.api.updateProductNumber(data.storeId, data.userId, data.cartId, data.itemId, data.quantity, header);
//   }
//
//   @Query(() => MaybeGetCartRecovery)
//   async getCartRecovery(
//     @Ctx() ctx: MyContext,
//     @Arg('data') data: GetCartRecoveryInput
//   ) {
//     const header: IncomingHttpHeaders = ctx.req.headers;
//     return await this.api.getCartRecovery(data.storeId, data.cartId, data.userId, header);
//   }
//
//   @Mutation(() => MaybeChangeProduct)
//   async changeProduct(
//     @Ctx() ctx: MyContext,
//     @Arg('data') data: ChangeProductInput
//   ) {
//     const header: IncomingHttpHeaders = ctx.req.headers;
//     return await this.api.changeProduct(data.storeId, data.userId, data.collaboratorId, data, header);
//
//   }
//
//   @Query(() => MaybeGetInstallmentSuggestionRecovery)
//   async getInstallmentSuggestionRecovery(
//     @Ctx() ctx: MyContext,
//     @Arg('data') data: InstallmentSuggestionInput
//   ) {
//     const header: IncomingHttpHeaders = ctx.req.headers;
//     return await this.api.getInstallmentSuggestion(data.storeId, data.userId, data.cartId, header);
//   }
//
//   @Mutation(() => MaybeApplyCoupom)
//   async applyCoupomToCart(
//     @Ctx() ctx: MyContext,
//     @Arg('data') data: ApplyCupomInput,
//   ) {
//     const header: IncomingHttpHeaders = ctx.req.headers;
//     return await this.api.applyCartCoupom(data.storeId, data.userId, data.cartId, data.coupom, header);
//   }
//
//   @Mutation(() => MaybeRemoveCoupom)
//   async removeCoupomToCart(
//     @Ctx() ctx: MyContext,
//     @Arg('data') data: RemoveCupomInput,
//   ) {
//     const header: IncomingHttpHeaders = ctx.req.headers;
//     return await this.api.removeCartCoupom(data.storeId, data.userId, data.cartId, data.coupom, header);
//   }
//
//   private validateResponse(response: string | ErrorResponse) {
//     if(response instanceof ErrorResponse ) {
//       throw ErrorHandler.errorHandler('getSkuProductByEan', response);
//     }
//   }
// }
