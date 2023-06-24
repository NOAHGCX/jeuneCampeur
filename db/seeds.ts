import db from "./index"
import { fakerFR as faker } from "@faker-js/faker"
import { SecurePassword } from "@blitzjs/auth/secure-password"

const seed = async () => {
  let i = 1
  for ( i ; i < 101; i++) {
    const username = faker.internet.userName()
    const gender = faker.person.sexType()
    const firstName = faker.person.firstName(gender)
    const lastName = faker.person.lastName()
    const email = faker.internet.email({ firstName, lastName })
    const password = faker.internet.password({ length: 10 })
    console.log(email, password)
    const hashedPassword = await SecurePassword.hash(password.trim())
    const phone = faker.phone.number()

    const user = await db.user.create({
      data: {
        username: username,
        first_name: firstName,
        last_name: lastName,
        birth_date: faker.date.past(50),
        hashedPassword: hashedPassword,
        email: email,
        phone: phone,
        role: "ADMIN",
        connection_nb: 0,
        purchase_month: 0,
        purchase_year: 0,
      },
    })

    const addressFact = await db.address_Fact.create({
      data: {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        number: parseInt(faker.location.buildingNumber()),
        road: faker.location.street(),
        city: faker.location.city(),
        department: faker.location.state(),
        country: faker.location.country(),
        postcode: faker.location.zipCode(),
        complimentary: faker.location.secondaryAddress(),
        userID: user.id,
      },
    })

    const addressBase = await db.address_Base.create({
      data: {
        number: parseInt(faker.location.buildingNumber()),
        road: faker.location.street(),
        city: faker.location.city(),
        department: faker.location.state(),
        country: faker.location.country(),
        postcode: faker.location.zipCode(),
        complimentary: faker.location.secondaryAddress(),
        userID: user.id,
      },
    })

    const productName = faker.commerce.productName()
    const price = faker.commerce.price()
    const stock = faker.datatype.number(100)
    const description = faker.commerce.productDescription()
    const sellMonth = faker.datatype.number(100)
    const sellYear = faker.datatype.number(100)

    const product = await db.product.create({
      data: {
        name: productName,
        price: parseInt(price),
        stock: stock,
        description: description,
        sell_month: sellMonth,
        sell_year: sellYear,
      },
    })

    const picture = await db.pictures.create({
      data: {
        name: faker.internet.userName(),
        href: faker.internet.url(),
      },
    })

    const productPictures = await db.product_Pictures.create({
      data: {
        idProduct: product.id,
        idPicture:  picture.id
      },
    })

    const category = await db.category.create({
      data: {
        name: faker.commerce.department(),
      },
    })

    const productCategory = await db.product_Category.create({
      data: {
        idProduct: product.id,
        idCategory: faker.datatype.number({ min: 1, max: i }),
        },
    })

    const card = await db.card.create({
      data: {
        idUser: faker.datatype.number({ min: 1, max: i }), // Replace with appropriate range based on your users
      },
    })

    const productCard = await db.product_Card.create({
      data: {
        idProduct: faker.datatype.number({ min: 1, max: i }), // Replace with appropriate range based on your products
        idCard: faker.datatype.number({ min: 1, max: i }), // Replace with appropriate range based on your cards
      },
    })

    const wishlist = await db.wishlist.create({
      data: {
        name: faker.lorem.word(),
        idUser: faker.datatype.number({ min: 1, max: i }), // Replace with appropriate range based on your users
        idProduct: faker.datatype.number({ min: 1, max: i }), // Replace with appropriate range based on your products
      },
    })

    const productWishlist = await db.product_Wishlist.create({
      data: {
        idProduct: faker.datatype.number({ min: 1, max: i }), // Replace with appropriate range based on your products
        idWishlist: faker.datatype.number({ min: 1, max: i }), // Replace with appropriate range based on your wishlists
      },
    })

    const review = await db.review.create({
      data: {
        grade: faker.datatype.number({ min: 1, max: 5 }),
        comment: faker.lorem.paragraph(),
        idProduct: faker.datatype.number({ min: 1, max: i }), // Replace with appropriate range based on your products
        idUser: faker.datatype.number({ min: 1, max: i, precision: 1 }), // Replace with appropriate range based on your users
      },
    })

    const bdc = await db.bDC.create({
      data: {
        // Add appropriate fields for BDC model
      },
    })
  }
}

export default seed
