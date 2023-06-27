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
      }
    })


    const review = await db.review.create({
      data: {
        grade: faker.datatype.number({ min: 1, max: 5 }),
        comment: faker.lorem.paragraph(),
        idProduct: faker.datatype.number({ min: 1, max: i }), // Replace with appropriate range based on your products
        idUser: faker.datatype.number({ min: 1, max: i, precision: 1 }), // Replace with appropriate range based on your users
      },
    })

    const picture = await db.pictures.create({
      data: {
        name: faker.internet.userName(),
        href: faker.internet.url(),
        productId: faker.datatype.number({ min: 1, max: i }), // Replace with appropriate range based on your products
      },
    })

    const category = await db.category.create({
      data: {
        name: faker.commerce.department(),
      },
    })

    await db.category.update({
      where: { id: faker.datatype.number({ min: 1, max: i }) },
      data: { product: { connect: { id: faker.datatype.number({ min: 1, max: i }) } } },
    });

    const card = await db.card.create({
      data: {
        idUser: user.id, // Replace with appropriate range based on your users
      },
    })


    const wishList = await db.wishlist.create({
      data: {
        idUser: faker.datatype.number({ min: 1, max: i, precision: 1 }), // Replace with appropriate range based on your users
        name: faker.commerce.productName(),
      }
    })

    await db.wishlist.update({
      where: { id: faker.datatype.number({ min: 1, max: i }) },
      data: { products: { connect: { id: faker.datatype.number({ min: 1, max: i }) } } },
    });
    const bdc = await db.bDC.create({
      data: {
        idUser: faker.datatype.number({ min: 1, max: i, precision: 1 }), // Replace with appropriate range based on your users
        idAddressFact: faker.datatype.number({ min: 1, max: i, precision: 1 }), // Replace with appropriate range based on your addresses
        idAddressBase: faker.datatype.number({ min: 1, max: i, precision: 1 }), // Replace with appropriate range based on your addresses
        deliveryStatus: faker.helpers.arrayElement(["PENDING", "DELIVERED", "ERROR"]),
        totalPrice: faker.datatype.number({ min: 1, max: i, precision: 1 }),
        // Add appropriate fields for BDC model
      },
    })

    const bdcProduct = await db.product_BDC.create({
      data: {
        idBDC: faker.datatype.number({ min: 1, max: i, precision: 1 }), // Replace with appropriate range based on your BDCs
        idProduct: faker.datatype.number({ min: 1, max: i }), // Replace with appropriate range based on your products
        quantity: faker.datatype.number({ min: 1, max: i }),
      },
    })

    const productCard = await db.product_Card.create({
      data: {
        idCard: faker.datatype.number({ min: 1, max: i, precision: 1 }), // Replace with appropriate range based on your cards
        idProduct: faker.datatype.number({ min: 1, max: i }), // Replace with appropriate range based on your products
        quantity: faker.datatype.number({ min: 1, max: i }),
      },
    })
}
}

export default seed
