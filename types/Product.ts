import * as z from "zod";


export const DimensionsSchema = z.object({
    "width": z.number(),
    "height": z.number(),
    "depth": z.number(),
});
export type Dimensions = z.infer<typeof DimensionsSchema>;

export const MetaSchema = z.object({
    "createdAt": z.coerce.date(),
    "updatedAt": z.coerce.date(),
    "barcode": z.string(),
    "qrCode": z.string(),
});
export type Meta = z.infer<typeof MetaSchema>;

export const ReviewSchema = z.object({
    "rating": z.number(),
    "comment": z.string(),
    "date": z.coerce.date(),
    "reviewerName": z.string(),
    "reviewerEmail": z.string(),
});
export type Review = z.infer<typeof ReviewSchema>;

export const ProductSchema = z.object({
    "id": z.number(),
    "title": z.string(),
    "description": z.string(),
    "category": z.string(),
    "price": z.number(),
    "discountPercentage": z.number(),
    "rating": z.number(),
    "stock": z.number(),
    "tags": z.array(z.string()),
    "brand": z.string(),
    "sku": z.string(),
    "weight": z.number(),
    "dimensions": DimensionsSchema,
    "warrantyInformation": z.string(),
    "shippingInformation": z.string(),
    "availabilityStatus": z.string(),
    "reviews": z.array(ReviewSchema),
    "returnPolicy": z.string(),
    "minimumOrderQuantity": z.number(),
    "meta": MetaSchema,
    "images": z.array(z.string()),
    "thumbnail": z.string(),
});
export type IProduct = z.infer<typeof ProductSchema>;
