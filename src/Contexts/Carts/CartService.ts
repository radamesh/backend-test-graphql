// import { IncomingHttpHeaders } from "http";
// import { Headers } from "../Headers";
// import { addCustomTagHeaders, loggerError, loggerInfo, setLogFormat } from "../../utils/Logger";
// import {
//   CartMessage, ChangeProduct,
//   ChangeProductInput,
//   CreateCart,
//   GetCartRecovery,
//   GetInstallmentSuggestionRecovery,
//   Product,
//   UpdateProductRecovery,
// } from "./CartTypes";
// import { ErrorResponse } from "../BaseType";
// import { BaseApi } from "../../service/base-api/baseApi";
// import { ErrorHandler } from "../../utils/ErrorHandler";
//
// const URL_PAPH = "/v1/carts/";
//
// export class CartService {
//
//   public getHeader = new Headers();
//   private api = new BaseApi().getApi(`${process.env.BASE_CART_URL}`);
//
//   async createCart(
//     storeId: string,
//     userIdOrEmail: string,
//     collaboratorId: string,
//     oldCartId: string,
//     header: IncomingHttpHeaders
//   ): Promise<CreateCart | ErrorResponse> {
//     const headers = this.getHeader.createCartHeader(storeId, userIdOrEmail, collaboratorId, oldCartId, header);
//     try {
//       const response = await this.api.post(URL_PAPH + `create`, {}, {
//         headers: headers
//       });
//       const { guid, code, type } = response.data;
//       loggerInfo("createCart", addCustomTagHeaders(headers, { "cartId": code }),
//         setLogFormat({
//           severity: "INFO",
//           status: 200,
//           message: `RESOLVER CART MUTATION createCart {user: ${userIdOrEmail}, header: {application: ${header.application}, company: ${header.company}}}`
//         }));
//       return new CreateCart(guid, code, type);
//     } catch (error: any) {
//       return ErrorHandler.errorHandler('createCart', error, { header: headers });
//     }
//   }
//
//   async changeProduct(storeId: string, userId: string, collaboratorId: string, data: ChangeProductInput, header: IncomingHttpHeaders): Promise<ChangeProduct | ErrorResponse> {
//     const headers = this.getHeader.createCartHeader(storeId, userId, collaboratorId, '', header);
//     try {
//       await this.api.post(URL_PAPH + `changeitem`, data, {
//         headers: headers
//       });
//       loggerInfo(
//         "changeProduct",
//         headers,
//         setLogFormat({
//           severity: "INFO",
//           status: 200,
//           message: `RESOLVER CART MUTATION changeProduct { header: {application: ${header.application}, company: ${header.company}}}, data: "Operação concluida com sucesso."`,
//         })
//       );
//       return new ChangeProduct(`Operação concluida com sucesso.`);
//     } catch (error: any) {
//       return ErrorHandler.errorHandler('changeProduct', error, { header: headers });
//     }
//   }
//
//   async removeProductFromCart(
//     storeId: string,
//     userIdOrEmail: string,
//     cartId: string,
//     itemId: string,
//     header: IncomingHttpHeaders
//   ): Promise<CartMessage | ErrorResponse> {
//     const headers = this.getHeader.cartHeader(storeId, userIdOrEmail, header);
//     try {
//       const response = await this.api.delete(URL_PAPH + `${cartId}/items/${itemId}`, {
//         headers: headers
//       });
//
//       if (response.data instanceof Error) {
//         return ErrorHandler.errorHandler('removeProductFromCart', response.data, { header: headers });
//       }
//       loggerInfo("removeProductFromCart", headers, setLogFormat({ severity: "INFO", status: 200, message: `RESOLVER CART MUTATION createCart {user: ${userIdOrEmail}, header: {application: ${header.application}, company: ${header.company}}}, data: "Item removido do carrinho."` }));
//       return new CartMessage("Item removido do carrinho.");
//     } catch (error: any) {
//       return ErrorHandler.errorHandler('removeProductFromCart', error, { header: headers });
//     }
//   }
//
//   async removeProductsToCart(
//     storeId: string,
//     userIdOrEmail: string,
//     cartId: string,
//     data: string[],
//     header: IncomingHttpHeaders
//   ): Promise<CartMessage | ErrorResponse> {
//     const headers = this.getHeader.createAddProductHeader(storeId, userIdOrEmail, header);
//     try {
//       if (data.length > 0) {
//         for (const itemId of data) {
//           const response = await this.api.delete(URL_PAPH + `${cartId}/items/${itemId}`, {
//             headers: headers
//           });
//
//           if (response.data instanceof Error) {
//             return ErrorHandler.errorHandler('removeProductFromCart', response.data, { header: headers });
//           }
//           loggerInfo("removeProductFromCart", headers, setLogFormat({ severity: "INFO", status: 200, message: `RESOLVER CART MUTATION deleteCart {user: ${userIdOrEmail}, header: {application: ${header.application}, company: ${header.company}}}, data: "Itens removidos do carrinho."` }));
//         }
//
//         return new CartMessage("Itens removidos do carrinho.");
//       }
//
//       return new CartMessage("Não possui itens para serem removidos.");
//     } catch (error: any) {
//       return ErrorHandler.errorHandler('removeProductFromCart', error, { header: headers });
//     }
//   }
//
//   async updateProductNumber(
//     storeId: string,
//     userId: string,
//     cartId: string,
//     itemId: string,
//     quantity: number,
//     header: IncomingHttpHeaders
//   ): Promise<UpdateProductRecovery | ErrorResponse> {
//     const headers = this.getHeader.cartHeader(storeId, userId, header);
//     try {
//       const response = await this.api.put(URL_PAPH + `${cartId}/items/${itemId}`, { quantity }, {
//         headers: headers
//       });
//       loggerInfo("updateProductNumber", headers, setLogFormat({ severity: "INFO", status: 200, message: `RESOLVER CART MUTATION createCart {user: ${userId}, header: {application: ${header.application}, company: ${header.company}}}, data: ${response}` }));
//       return new UpdateProductRecovery(response.data);
//     } catch (error: any) {
//       return ErrorHandler.errorHandler('updateProductNumber', error, { header: headers });
//     }
//   }
//
//   async addProductToCart(cartId: string, storeId: string, userIdOrEmail: string, data: Product[], header: IncomingHttpHeaders)
//     : Promise<CartMessage | ErrorResponse> {
//     const headers = this.getHeader.createAddProductHeader(storeId, userIdOrEmail, header);
//     try {
//       const response = await this.api.post(URL_PAPH + `${cartId}/items`, data, {
//         headers: headers
//       });
//       const { status } = response;
//       loggerInfo("addProductToCart", headers, setLogFormat({ severity: "INFO", status, message: `RESOLVER CART MUTATION addProductToCart {cartId: ${cartId}, header: {application: ${header.application}, company: ${header.company}}}` }));
//       return new CartMessage(`Operação concluida com sucesso.`, response.data.itemsAdd);
//     }
//     catch (error: any) {
//       return ErrorHandler.errorHandler('addProductToCart', error, { header: headers });
//     }
//   }
//
//   async getCartRecovery(storeId: string, cartId: string, email: string, header: IncomingHttpHeaders)
//     : Promise<GetCartRecovery | ErrorResponse> {
//     const headers = this.getHeader.cartHeader(storeId, email, header);
//     try {
//       const response = await this.api.get(URL_PAPH + `entries?cartId=${cartId}`, {
//         headers: headers
//       });
//       loggerInfo("getCartRecovery", headers, setLogFormat({ severity: "INFO", status: 200, message: `RESOLVER CART MUTATION getCartRecovery {cartId: ${cartId}, header: {application: ${header.application}, company: ${header.company}}}` }));
//       return new GetCartRecovery(response.data);
//     } catch (error: any) {
//       return ErrorHandler.errorHandler('getCartRecovery', error, { header: headers });
//     }
//   }
//
//   async getInstallmentSuggestion(storeId: string, userId: string, cartId: string, header: IncomingHttpHeaders)
//     : Promise<GetInstallmentSuggestionRecovery | ErrorResponse> {
//     const headers = this.getHeader.cartHeader(storeId, userId, header);
//     try {
//       const response = await this.api.get(URL_PAPH + `installment-suggestion?cartId=${cartId}`, {
//         headers: headers
//       });
//       loggerError("getInstallmentSuggestion", headers, setLogFormat({ severity: "INFO", status: 200, message: `RESOLVER CART MUTATION getCartRecovery {cartId: ${cartId}, header: {application: ${header.application}, company: ${header.company}}}` }));
//       return new GetInstallmentSuggestionRecovery(response.data);
//     } catch (error: any) {
//       return ErrorHandler.errorHandler('getCartRecovery', error, { header: headers });
//     }
//   }
//
//   async applyCartCoupom(
//     storeId: string,
//     userIdOrEmail: string,
//     cartId: string,
//     coupom: string,
//     header: IncomingHttpHeaders
//   ): Promise<CartMessage | ErrorResponse> {
//     const headers = this.getHeader.cartHeader(storeId, userIdOrEmail, header);
//     try {
//       const response = await this.api.post(URL_PAPH + `${cartId}/promotions/${coupom}`, {}, {
//         headers: headers
//       });
//
//       const { status } = response;
//       loggerInfo("applyCartCoupom", headers, setLogFormat({ severity: "INFO", status, message: `RESOLVER CART MUTATION applyCartCoupom {cartId: ${cartId}, header: {application: ${header.application}, company: ${header.company}}}` }));
//
//       return new CartMessage(`Coupom aplicado com sucesso.`);
//     } catch (error: any) {
//       return ErrorHandler.errorHandler('applyCartCoupom', error, { header: headers });
//     }
//   }
//
//   async removeCartCoupom(
//     storeId: string,
//     userIdOrEmail: string,
//     cartId: string,
//     coupom: string,
//     header: IncomingHttpHeaders
//   ): Promise<CartMessage | ErrorResponse> {
//     const headers = this.getHeader.cartHeader(storeId, userIdOrEmail, header);
//     try {
//       const response = await this.api.delete(URL_PAPH + `${cartId}/promotions/${coupom}`, {
//         headers: headers
//       });
//
//       if (response.data instanceof Error) {
//         return ErrorHandler.errorHandler('removeCartCoupom', response.data, { header: headers });
//       }
//       loggerInfo("removeCartCoupom", headers, setLogFormat({ severity: "INFO", status: 200, message: `RESOLVER CART MUTATION removeCartCoupom {user: ${userIdOrEmail}, header: {application: ${header.application}, company: ${header.company}}}, data: "Coupom removido do carrinho."` }));
//       return new CartMessage("Coupom removido do carrinho.");
//     } catch (error: any) {
//       return ErrorHandler.errorHandler('removeCartCoupom', error, { header: headers });
//     }
//   }
//
// }
