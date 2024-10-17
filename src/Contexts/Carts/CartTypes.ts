// import { Field, InputType, ObjectType, createUnionType } from "type-graphql";
// import { ErrorResponse } from "../BaseType";
// import { IsIn, IsNotEmpty, ValidateNested } from "class-validator";
//
// @ObjectType()
// export class CollaboratorCartType {
//   @Field({ nullable: true })
//   isCollaboratorCart?: boolean;
//   @Field({ nullable: true })
//   collaboratorDiscountPercent?: number;
//   @Field({ nullable: true })
//   holder?: string;
// }
//
// @ObjectType()
// export class CurrencyInfo {
//   @Field({ nullable: true })
//   currencyIso?: string;
//
//   @Field({ nullable: true })
//   formattedValue?: string;
//
//   @Field({ nullable: true })
//   priceType?: string;
//
//   @Field({ nullable: true })
//   value?: number;
// }
//
// @ObjectType()
// export class InstallmentCartType {
//   @Field({ nullable: true })
//   code?: string;
//
//   @Field({ nullable: true })
//   installments?: number;
//
//   @Field({ nullable: true })
//   feePercentage?: number;
//
//   @Field({ nullable: true })
//   applyFee?: boolean;
//
//   @Field({ nullable: true })
//   defaultOption?: boolean;
//
//   @Field(() => CurrencyInfo)
//   value?: CurrencyInfo;
//
//   @Field(() => [PaymentMode])
//   paymentModes: PaymentMode[];
// }
//
// type UpdateProductRecoveryType = {
//   statusCode: string;
//   quantityAdded: number;
//   quantity: number;
// }
//
// type GetCartRecoveryType = {
//   id: string;
//   guid: string;
//   entries: CartEntry[];
//   appliedVouchers: VoucherType[];
//   totalEntries: number;
//   totalItems: number;
//   genericCategory: string,
//   totalPrice: CurrencyInfo;
//   totalPriceWithoutDiscount: CurrencyInfo;
//   productDiscounts: CurrencyInfo;
//   orderDiscounts: CurrencyInfo;
//   totalDiscounts: CurrencyInfo;
//   subTotal: CurrencyInfo;
//   deliveryAddress: DeliveryAddressType;
//   deliveryOrderGroups: DeliveryGroupsType[];
//   paymentInfo: PaymentInfoType;
//   installment: InstallmentCartType;
//   collaborator: CollaboratorCartType;
// }
//
// type GetInstallmentSuggestionRecoveryType = {
//   installments: InstallmentCartType[];
// }
//
// @ObjectType()
// export class Entries {
//   @Field({ nullable: true })
//   entryNumber: number;
//
//   @Field({ nullable: true })
//   sku: string;
//
//   @Field({ nullable: true })
//   size: string;
//
//   @Field({ nullable: true })
//   color: string;
//
//   @Field({ nullable: true })
//   description: string;
//
//   @Field({ nullable: true })
//   price: string;
//
//   @Field({ nullable: true })
//   img: string;
//
//   @Field({ nullable: true })
//   deliveryType: string;
// }
//
// @ObjectType()
// export class CartRecovery {
//   @Field({ nullable: true })
//   code: string;
//
//   @Field({ nullable: true })
//   guid: string;
//
//   @Field(() => [VoucherType], { nullable: true })
//   appliedVouchers?: [VoucherType];
//
//   @Field(() => [Entries])
//   entries?: [Entries];
//
//   @Field({ nullable: true })
//   totalItems: string;
//
//   @Field(() => CurrencyInfo, { nullable: true })
//   totalPrice: CurrencyInfo;
// }
//
// @InputType()
// export class GetCartRecoveryInput {
//   @Field({ nullable: true })
//   @IsNotEmpty()
//   storeId: string;
//
//   @Field({ nullable: true })
//   userId: string;
//
//   @Field({ nullable: true })
//   cartId: string;
// }
//
// @ObjectType()
// export class ChangeProduct {
//   @Field({ nullable: true })
//   message: string;
//   constructor(message: string) {
//     this.message = message;
//   }
// }
//
// @InputType()
// export class ChangeProductItem {
//   @Field({ nullable: true })
//   id: string;
//
//   @Field({ nullable: true })
//   prodId: string;
//
//   @Field({ nullable: true })
//   quantity: number;
//
//   @Field({ nullable: false })
//   @IsNotEmpty()
//   skuId: string;
//
//   @Field({ nullable: true })
//   @IsIn(["INSTOCK", "INLOCALSTORE"])
//   stockStatus: string;
// }
//
// @InputType()
// export class RemoveCupomInput {
//
//   @Field({ nullable: true })
//   storeId: string;
//
//   @Field({ nullable: true })
//   userId: string;
//
//   @Field({ nullable: true })
//   cartId: string;
//
//   @Field({ nullable: true })
//   coupom: string;
// }
//
// @InputType()
// export class ApplyCupomInput {
//
//   @Field({ nullable: true })
//   storeId: string;
//
//   @Field({ nullable: true })
//   userId: string;
//
//   @Field({ nullable: true })
//   cartId: string;
//
//   @Field({ nullable: true })
//   coupom: string;
// }
//
// @InputType()
// export class ChangeProductInput {
//   @Field({ nullable: true })
//   storeId: string;
//   @Field({ nullable: true })
//   @IsNotEmpty()
//   userId: string;
//   @Field({ nullable: true })
//   collaboratorId: string;
//   @Field({ nullable: false })
//   @IsNotEmpty()
//   cartId: string;
//   @Field(() => ChangeProductItem, { nullable: false })
//   @IsNotEmpty()
//   @ValidateNested()
//   newItem: ChangeProductItem;
//   @Field(() => ChangeProductItem, { nullable: false })
//   @IsNotEmpty()
//   @ValidateNested()
//   oldItem: ChangeProductItem;
// }
//
// @InputType()
// export class CreateCartInput {
//
//   @Field({ nullable: true })
//   @IsNotEmpty()
//   storeId: string;
//
//   @Field({ nullable: true })
//   @IsNotEmpty()
//   userId: string;
//
//   @Field({ nullable: false })
//   @IsNotEmpty()
//   collaboratorId?: string;
//
//   @Field({ nullable: true })
//   oldCartId?: string;
//
//   constructor(storeId: string = "", email: string = "") {
//     this.storeId = storeId;
//     this.userId = email;
//   }
// }
//
// @InputType()
// export class UpdateProductNumberInput {
//   @Field({ nullable: true })
//   @IsNotEmpty()
//   storeId: string;
//
//   @Field({ nullable: true })
//   userId: string;
//
//   @Field({ nullable: true })
//   cartId: string;
//
//   @Field({ nullable: true })
//   itemId: string;
//
//   @Field({ nullable: true })
//   quantity: number;
// }
//
// @InputType()
// export class RemoveFromCartInput {
//   @Field({ nullable: true })
//   @IsNotEmpty()
//   storeId: string;
//
//   @Field({ nullable: true })
//   userId: string;
//
//   @Field({ nullable: true })
//   cartId: string;
//
//   @Field({ nullable: true })
//   itemId: string;
// }
//
// @InputType()
// export class RemoveItensFromCartInput {
//   @Field({ nullable: true })
//   @IsNotEmpty()
//   storeId: string;
//
//   @Field({ nullable: true })
//   userId: string;
//
//   @Field({ nullable: true })
//   cartId: string;
//
//   @Field({ nullable: true })
//   itemId: string;
//
//   @Field(() => [String])
//   itens: string[];
// }
//
// @InputType()
// export class InstallmentSuggestionInput {
//   @Field({ nullable: true })
//   @IsNotEmpty()
//   storeId: string;
//
//   @Field({ nullable: true })
//   userId: string;
//
//   @Field({ nullable: true })
//   cartId: string;
// }
//
// @ObjectType()
// export class CreateCart {
//
//   @Field({ nullable: true })
//   guid: string;
//
//   @Field({ nullable: true })
//   code: string;
//
//   @Field({ nullable: true })
//   type?: string;
//
//   constructor(guid: string, code: string, type: string) {
//     this.guid = guid;
//     this.code = code;
//     this.type = type;
//   }
// }
// @ObjectType()
// export class AddItemType {
//
//   @Field({ nullable: true })
//   quantity: number;
//
//   @Field({ nullable: true })
//   skuId: string;
//
//   @Field({ nullable: true })
//   quantityAdded: number;
//
//   @Field({ nullable: true })
//   statusCode: string;
//   constructor(quantity: number, skuId: string, quantityAdded: number, statusCode: string) {
//     this.quantity = quantity;
//     this.skuId = skuId;
//     this.quantityAdded = quantityAdded;
//     this.statusCode = statusCode;
//   }
// }
//
// @ObjectType()
// export class CartMessage {
//   @Field({ nullable: true })
//   message: string;
//
//   @Field(() => [AddItemType], { nullable: true })
//   itemsAdd: AddItemType[];
//
//   constructor(message: string, itemsAdd?: AddItemType[]) {
//     this.message = message;
//     if (itemsAdd) {
//       this.itemsAdd = itemsAdd;
//     }
//   }
// }
//
// @InputType()
// export class Product {
//   @Field({ nullable: true })
//   prodId: string;
//   @Field({ nullable: true })
//   skuId: string;
//   @Field({ nullable: true })
//   quantity: number;
//   @Field({ nullable: true })
//   @IsIn(["INSTOCK", "INLOCALSTORE"])
//   stockStatus: string;
// }
//
// @InputType()
// export class AddProductToCartInput {
//   @Field({ nullable: true })
//   @IsNotEmpty()
//   storeId: string;
//
//   @Field({ nullable: true })
//   userId: string;
//
//   @Field({ nullable: true })
//   cartId: string;
//
//   @Field(() => [Product])
//   @ValidateNested({ each: true })
//   product: Product[];
// }
//
// @ObjectType()
// export class CartPrice {
//   @Field({ nullable: true })
//   baseValue: number;
//
//   @Field({ nullable: true })
//   baseValueFormatted?: string;
//
//   @Field({ nullable: true })
//   percentDiscount?: number;
//
//   @Field({ nullable: true })
//   saleValue: number;
//
//   @Field({ nullable: true })
//   saleValueFormatted?: string;
//
//   @Field({ nullable: true })
//   currencyIso?: string;
//
//   @Field({ nullable: true })
//   priceType?: string;
// }
//
// @ObjectType()
// export class RegionDeliveryAddress {
//
//   @Field({ nullable: true })
//   countryIso?: string;
//
//   @Field({ nullable: true })
//   isocode?: string;
//
//   @Field({ nullable: true })
//   isocodeShort?: string;
//
//   @Field({ nullable: true })
//   name?: string;
// }
//
// @ObjectType()
// export class CountryDeliveryAddress {
//
//   @Field({ nullable: true })
//   name?: string;
//
//   @Field({ nullable: true })
//   isocode?: string;
// }
//
// @ObjectType()
// export class DeliveryAddressType {
//
//   @Field({ nullable: true })
//   id?: string;
//
//   @Field({ nullable: true })
//   cellphone?: string;
//
//   @Field({ nullable: true })
//   defaultAddress?: boolean;
//
//   @Field({ nullable: true })
//   email?: string;
//
//   @Field({ nullable: true })
//   district?: string;
//
//   @Field({ nullable: true })
//   firstName?: string;
//
//   @Field({ nullable: true })
//   formattedAddress?: string;
//
//   @Field({ nullable: true })
//   lastName?: string;
//
//   @Field({ nullable: true })
//   line1?: string;
//
//   @Field({ nullable: true })
//   line2?: string;
//
//   @Field({ nullable: true })
//   phone?: string;
//
//   @Field({ nullable: true })
//   postalCode?: string;
//
//   @Field({ nullable: true })
//   shippingAddress?: string;
//
//   @Field({ nullable: true })
//   title?: string;
//
//   @Field({ nullable: true })
//   titleCode?: string;
//
//   @Field({ nullable: true })
//   town?: string;
//
//   @Field({ nullable: true })
//   visibleInAddressBook?: string;
//
//   @Field(() => RegionDeliveryAddress, { nullable: true })
//   region?: RegionDeliveryAddress;
//
//   @Field(() => CountryDeliveryAddress, { nullable: true })
//   country?: CountryDeliveryAddress;
// }
//
// @ObjectType()
// export class DeliveryGroupsType {
//
//   @Field(() => [CartEntry])
//   entries: CartEntry[];
// }
//
// @ObjectType()
// export class PaymentCardType {
//
//   @Field({ nullable: true })
//   code?: string;
//
//   @Field({ nullable: true })
//   name?: string;
// }
//
// @ObjectType()
// export class PaymentInfoType {
//
//   @Field({ nullable: true })
//   accountHolderName?: string;
//
//   @Field({ nullable: true })
//   cardNumber?: string;
//
//   @Field({ nullable: true })
//   defaultPayment?: boolean;
//
//   @Field({ nullable: true })
//   expiryMonth?: string;
//
//   @Field({ nullable: true })
//   expiryYear?: string;
//
//   @Field({ nullable: true })
//   id?: string;
//
//   @Field({ nullable: true })
//   saved?: boolean;
//
//   @Field({ nullable: true })
//   subscriptionId?: string;
//
//   @Field(() => PaymentCardType, { nullable: true })
//   cardType?: PaymentCardType;
//
//   @Field(() => DeliveryAddressType, { nullable: true })
//   billingAddress?: DeliveryAddressType;
// }
//
// @ObjectType()
// export class UpdateProductRecovery {
//
//   @Field({ nullable: true })
//   statusCode: string;
//
//   @Field({ nullable: true })
//   quantityAdded: number;
//
//   @Field({ nullable: true })
//   quantity: number;
//
//   constructor(data: UpdateProductRecoveryType) {
//     this.statusCode = data.statusCode;
//     this.quantityAdded = data.quantityAdded;
//     this.quantity = data.quantity;
//   }
// }
//
// @ObjectType()
// export class GetCartRecovery {
//   @Field({ nullable: true })
//   id: string;
//
//   @Field({ nullable: true })
//   guid: string;
//
//   @Field(() => [VoucherType], { nullable: true })
//   appliedVouchers: VoucherType[];
//
//   @Field(() => [CartEntry])
//   entries: CartEntry[];
//
//   @Field({ nullable: true })
//   totalEntries?: number;
//
//   @Field({ nullable: true })
//   totalItems?: number;
//
//   @Field({ nullable: true })
//   genericCategory?: string;
//
//   @Field(()=> CurrencyInfo, {nullable:true})
//   totalPrice?: CurrencyInfo;
//
//   @Field(() => CurrencyInfo, { nullable: true })
//   totalPriceWithoutDiscount?: CurrencyInfo;
//
//   @Field(() => CurrencyInfo, { nullable: true })
//   productDiscounts?: CurrencyInfo;
//
//   @Field(() => CurrencyInfo, { nullable: true })
//   orderDiscounts?: CurrencyInfo;
//
//   @Field(() => CurrencyInfo, { nullable: true })
//   totalDiscounts?: CurrencyInfo;
//
//   @Field(() => CurrencyInfo, { nullable: true })
//   subTotal?: CurrencyInfo;
//
//   @Field(() => DeliveryAddressType, { nullable: true })
//   deliveryAddress?: DeliveryAddressType;
//
//   @Field(() => [DeliveryGroupsType], { nullable: true })
//   deliveryOrderGroups?: DeliveryGroupsType[];
//
//   @Field(() => PaymentInfoType, { nullable: true })
//   paymentInfo?: PaymentInfoType;
//
//   @Field(() => InstallmentCartType, { nullable: true })
//   installment?: InstallmentCartType;
//
//   @Field(() => CollaboratorCartType, { nullable: true })
//   collaborator?: CollaboratorCartType;
//
//   constructor(data: GetCartRecoveryType) {
//     this.id = data.id;
//     this.guid = data.guid;
//     this.appliedVouchers = data.appliedVouchers;
//     this.entries = data.entries;
//     this.totalEntries = data.totalEntries;
//     this.totalItems = data.totalItems;
//     this.genericCategory = data.genericCategory;
//     this.totalPrice = data.totalPrice;
//     this.totalPriceWithoutDiscount = data.totalPriceWithoutDiscount;
//     this.productDiscounts = data.productDiscounts;
//     this.orderDiscounts = data.orderDiscounts;
//     this.totalDiscounts = data.totalDiscounts;
//     this.subTotal = data.subTotal;
//     this.deliveryAddress = data.deliveryAddress;
//     this.deliveryOrderGroups = data.deliveryOrderGroups;
//     this.paymentInfo = data.paymentInfo;
//     this.installment = data.installment;
//     this.collaborator = data.collaborator;
//   }
// }
//
// @ObjectType()
// export class CartTotalPrice {
//   @Field({ nullable: true })
//   currencyIso: string;
//
//   @Field({ nullable: true })
//   baseValue: number;
//
//   @Field({ nullable: true })
//   value: number;
// }
//
// @ObjectType()
// export class ProductDiscount {
//   @Field({ nullable: true })
//   adjustedUnitPrice: number;
//
//   @Field({ nullable: true })
//   description: string;
// }
//
// @ObjectType()
// export class CartDeliveryMode {
//   @Field({ nullable: true })
//   estimatedDeliveryTimeValue?: string;
//
//   @Field({ nullable: true })
//   estimatedDeliveryTimeUnit?: string;
//
//   @Field({ nullable: true })
//   estimatedDeliveryDate?: string;
//
//   @Field({ nullable: true })
//   shippingMethod?: string;
//
//   @Field({ nullable: true })
//   freightCost?: number;
//
//   @Field({ nullable: true })
//   freightCostCurrency?: string;
// }
//
// @ObjectType()
// export class EntryDeliveryInfo extends CartDeliveryMode {
//
//   @Field({ nullable: true })
//   branchOriginPreview?: string;
//
//   @Field({ nullable: true })
//   deliveryTotalCost?: number;
//
//   @Field({ nullable: true })
//   description?: string;
//
//   @Field({ nullable: true })
//   displayName?: string;
//
//   @Field({ nullable: true })
//   fulfillmentMethod?: string;
//
//   @Field({ nullable: true })
//   id?: string;
//
//   @Field({ nullable: true })
//   isRecommendation?: boolean;
//
//   @Field({ nullable: true })
//   modalId?: string;
//
//   @Field({ nullable: true })
//   quantity?: number;
//
//   @Field({ nullable: true })
//   scheduledDay?: string;
//
//   @Field({ nullable: true })
//   state?: string;
// }
//
//
// @ObjectType()
// export class EntryStock {
//
//   @Field({ nullable: true })
//   isValueRounded: boolean;
//
//   @Field({ nullable: true })
//   stockLevelStatus: string;
//
//   @Field({ nullable: true })
//   stockLevel: number;
// }
//
// @ObjectType()
// export class VoucherType {
//
//   @Field({ nullable: true })
//   code: string;
//
//   @Field({ nullable: true })
//   freeShipping: boolean;
//
//   @Field({ nullable: true })
//   voucherCode: string;
// }
//
// @ObjectType()
// export class CartEntry {
//   @Field({ nullable: true })
//   entryNumber: number;
//
//   @Field({ nullable: true })
//   id: string;
//
//   @Field({ nullable: true })
//   description: string;
//
//   @Field({ nullable: true })
//   quantity: number;
//
//   @Field({ nullable: true })
//   url: string;
//
//   @Field({ nullable: true })
//   genericCategory: string;
//
//   @Field(() => [CartAttribute])
//   attributes: CartAttribute[];
//
//   @Field(() => CartPrice, { nullable: true })
//   price: CartPrice;
//
//   @Field(() => [CartMedia])
//   medias: CartMedia[];
//
//   @Field(() => EntryDeliveryInfo, { nullable: true })
//   deliveryInfo: EntryDeliveryInfo;
//
//   @Field(() => [CartDeliveryMode])
//   deliveryModes: CartDeliveryMode[];
//
//   @Field(() => CartTotalPrice)
//   totalPrice: CartTotalPrice;
//
//   @Field(() => EntryStock, { nullable: true })
//   stock: EntryStock;
//
//   @Field({ nullable: true })
//   stockStatus: string;
//
//   @Field(() => ProductDiscount, { nullable: true })
//   productDiscount?: ProductDiscount;
// }
//
// @ObjectType()
// export class CartAttribute {
//   @Field({ nullable: true })
//   id: string;
//
//   @Field({ nullable: true })
//   type?: string;
//
//   @Field({ nullable: true })
//   attributeName?: string;
//
//   @Field({ nullable: true })
//   value?: string;
//
//   @Field({ nullable: true })
//   enabled?: string;
// }
//
//
// @ObjectType()
// export class CartMedia {
//   @Field({ nullable: true })
//   smallImageUrl?: string;
//
//   @Field({ nullable: true })
//   zoomImageUrl?: string;
//
//   @Field({ nullable: true })
//   mediumImageUrl?: string;
//
//   @Field({ nullable: true })
//   thumbImageUrl?: string;
//
//   @Field({ nullable: true })
//   showcaseImageUrl?: string;
//
//   @Field({ nullable: true })
//   largeImageUrl?: string;
// }
//
// @ObjectType()
// export class PaymentMode {
//   @Field({ nullable: true })
//   code?: string;
//
//   @Field({ nullable: true })
//   name?: string;
//
//   @Field({ nullable: true })
//   description?: string;
//
//   @Field({ nullable: true })
//   isDefault?: boolean;
// }
//
// @ObjectType()
// export class GetInstallmentSuggestionRecovery {
//   @Field(() => [InstallmentCartType])
//   installments: InstallmentCartType[];
//
//   constructor(data: InstallmentCartType[]) {
//     this.installments = data;
//   }
// }
//
// export const MaybeCreateCart = createUnionType({
//   name: "MaybeCreateCart",
//   types: () => [CreateCart, ErrorResponse] as const
// });
//
// export const MaybeAddProductsToCart = createUnionType({
//   name: "MaybeAddProductsToCart",
//   types: () => [CartMessage, ErrorResponse] as const
// });
//
// export const MaybeUpdateProductNumberToCart = createUnionType({
//   name: "MaybeUpdateProductNumberToCart",
//   types: () => [UpdateProductRecovery, ErrorResponse] as const
// });
//
// export const MaybeGetCartRecovery = createUnionType({
//   name: "MaybeGetCartRecovery",
//   types: () => [GetCartRecovery, ErrorResponse] as const
// });
//
// export const MaybeChangeProduct = createUnionType({
//   name: "MaybeChangeProduct",
//   types: () => [ChangeProduct, ErrorResponse] as const
// });
//
// export const MaybeGetInstallmentSuggestionRecovery = createUnionType({
//   name: "MaybeGetInstallmentSuggestionRecovery",
//   types: () => [GetInstallmentSuggestionRecovery, ErrorResponse] as const
// });
//
// export const MaybeApplyCoupom = createUnionType({
//   name: "MaybeApplyCoupom",
//   types: () => [CartMessage, ErrorResponse] as const
// });
//
// export const MaybeRemoveCoupom = createUnionType({
//   name: "MaybeRemoveCoupom",
//   types: () => [CartMessage, ErrorResponse] as const
// });
