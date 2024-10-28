import { hash } from 'bcrypt'

export default defineEventHandler(async () => {

    await useDrizzle().delete(tables.users)
    await useDrizzle().delete(tables.productsToTags)
    await useDrizzle().delete(tables.products)
    await useDrizzle().delete(tables.categories)
    await useDrizzle().delete(tables.tags)

    const categories = await useDrizzle()
        .insert(tables.categories)
        .values(
            [ 
                { name: 'Category 1' },
                { name: 'Category 2' },
            ]
        ).returning()

    const products = await useDrizzle()
        .insert(tables.products)
        .values([
            { name: 'Product 1' , price: 2000, image: 'uuu', categoryId: categories[0].id },
            { name: 'Product 2' , price: 6000, image: 'uuu', categoryId: categories[0].id },
            { name: 'Product 3' , price: 5000, image: 'uuu', categoryId: categories[1].id },
            { name: 'Product 4' , price: 9000, image: 'uuu', categoryId: categories[1].id }
        ]).returning()

    const tags = await useDrizzle()
        .insert(tables.tags)
        .values([
            { name: 'Tag 1' },
            { name: 'Tag 2' },
            { name: 'Tag 3' },
            { name: 'Tag 4' },
            { name: 'Tag 5' },
        ]).returning()

    const productToTag = await useDrizzle()
            .insert(tables.productsToTags)
            .values([
                { productId: products[0].id, tagId: tags[0].id },
                { productId: products[0].id, tagId: tags[1].id },
                { productId: products[0].id, tagId: tags[4].id },
                { productId: products[1].id, tagId: tags[3].id },
                { productId: products[1].id, tagId: tags[2].id }
            ])

    const users = await useDrizzle().insert(tables.users)
            .values([
                { 
                    name: 'Ali', 
                    email: 'ali@gmail.com', 
                    password: await hash('123456', 10)
                },
                { 
                    name: 'Hussam', 
                    email: 'hussam@gmail.com', 
                    password: await hash('123456', 10)
                }
            ]).returning()


        return { msg: 'Done !' }
})