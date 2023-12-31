[![Blitz.js](https://raw.githubusercontent.com/blitz-js/art/master/github-cover-photo.png)](https://blitzjs.com)

Projet réalisé par Tom Beaupuis et Noah Attia

# jeuneCampeur

## Requirement

Install Postgresql with pgAdmin4 (https://www.pgadmin.org/download/)
Install Node.js (https://nodejs.org/fr/download)
Install Docker ([https://nodejs.org/fr/download](https://www.docker.com/products/docker-desktop/))
Install Blitz.js with "npm install -g blitz" (https://blitzjs.com/docs/get-started)

## DB Creation

Go into PgADmin4
Create a new server
Create a new db called "masterCamp" (right click on "Databases")
Create a new user called "superadmin" with password "superadmin" give him every priviliges (right click on "Login/Group Roles"

## Initialiting project

Pull the project repo
Open a terminal on it and write "npm install"
Create a new docker "in the terminal":
  -docker network create extern
  -docker-compose up -d
  -check your docker desktop app
Create database:
  -blitz prisma migrate dev
  -blitz db seed (to add fake data)
  -blitz prisma studio (to check )

Run your app in the development mode.
  -blitz dev
Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Routing on the website

Main website:
  -http://localhost:3000/ := main page
  -http://localhost:3000/auth/login := login page
  -http://localhost:3000/auth/signup := signup page
  -http://localhost:3000/auth/forgot-password := forgot-password page
  -http://localhost:3000/product/[id] := product page
  -http://localhost:3000/profil/mes-commandes := orders page
  -http://localhost:3000/profil/mes-wishlists := wishlists page
  -http://localhost:3000/profil/mes-informations := profil informations page
  -http://localhost:3000/panier := card page
Admin website:
  -http://localhost:3000/admin/product := product admin page
  -http://localhost:3000/admin/product/addProductPage  := product add page
  -http://localhost:3000/admin/product/1  := product modification page
  -http://localhost:3000/admin/address_base  := address_base page
  -http://localhost:3000/admin/address_base/addAddressBasePage  := address_base add page
  -http://localhost:3000/admin/address_fact  := address_fact page
  -http://localhost:3000/admin/address_fact/addAddressFactPage  := address_fact add page
  -http://localhost:3000/admin/bdc  := bdc page
  -http://localhost:3000/admin/bdc/1  := items contain in specific bdc page
  -http://localhost:3000/admin/card  := card page
  -http://localhost:3000/admin/pictures  := pictures page
  -http://localhost:3000/admin/pictures/addPicturePage  := pictures add page
  -http://localhost:3000/admin/review  := review page
  -http://localhost:3000/admin/review/addReviewPage  := review add page
  -http://localhost:3000/admin/user  := user page
  -http://localhost:3000/admin/user/addUserPage  := user add page
  -http://localhost:3000/admin/wishlist  := wishlist page
  -http://localhost:3000/admin/wishlist/1  := items contain in specific wishlist page

## Admin website

There is no security at the moment for the admin page, to make it easier to test
We only need to add: Page.authenticate = { role: "ADMIN" }, on the end of our components to make it avalaible

## Environment Variables

Ensure the `.env.local` file has required environment variables:

```
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>@localhost:5432/masterCamp
```

Ensure the `.env.test.local` file has required environment variables:

```
DATABASE_URL=postgresql://<YOUR_DB_USERNAME>@localhost:5432/masterCamp_test
```


## Commands

Blitz comes with a powerful CLI that is designed to make development easy and fast. You can install it with `npm i -g blitz`

```
  blitz [COMMAND]

  dev       Start a development server
  build     Create a production build
  start     Start a production server
  export    Export your Blitz app as a static application
  prisma    Run prisma commands
  generate  Generate new files for your Blitz project
  console   Run the Blitz console REPL
  install   Install a recipe
  help      Display help for blitz
  test      Run project tests
```

You can read more about it on the [CLI Overview](https://blitzjs.com/docs/cli-overview) documentation.

## What's included?

Here is the starting structure of the app.

```
masterCamp
├── src/
│   ├── api/
│   ├── auth/
│   │   ├── components/
│   │   │   ├── LoginForm.tsx
│   │   │   └── SignupForm.tsx
│   │   ├── mutations/
│   │   │   ├── changePassword.ts
│   │   │   ├── forgotPassword.test.ts
│   │   │   ├── forgotPassword.ts
│   │   │   ├── login.ts
│   │   │   ├── logout.ts
│   │   │   ├── resetPassword.test.ts
│   │   │   ├── resetPassword.ts
│   │   │   └── signup.ts
│   │   ├── pages/
│   │   │   ├── forgot-password.tsx
│   │   │   ├── login.tsx
│   │   │   ├── reset-password.tsx
│   │   │   └── signup.tsx
│   │   └── validations.ts
│   ├── core/
│   │   ├── components/
│   │   │   ├── Form.tsx
│   │   │   └── LabeledTextField.tsx
│   │   └── layouts/
│   │       └── Layout.tsx
│   ├── pages/
│   │   ├── _app.tsx
│   │   ├── _document.tsx
│   │   ├── 404.tsx
│   │   ├── index.test.tsx
│   │   └── index.tsx
│   └── users/
│       ├── hooks/
│       │   └── useCurrentUser.ts
│       └── queries/
│           └── getCurrentUser.ts
├── db/
│   ├── migrations/
│   ├── index.ts
│   ├── schema.prisma
│   └── seeds.ts
├── integrations/
├── mailers/
│   └── forgotPasswordMailer.ts
├── public/
│   ├── favicon.ico
│   └── logo.png
├── test/
│   ├── setup.ts
│   └── utils.tsx
├── .eslintrc.js
├── babel.config.js
├── blitz.config.ts
├── vitest.config.ts
├── package.json
├── README.md
├── tsconfig.json
└── types.ts
```

These files are:

- The `src/` folder is a container for most of your project. This is where you’ll put any pages or API routes.

- `db/` is where your database configuration goes. If you’re writing models or checking migrations, this is where to go.

- `public/` is a folder where you will put any static assets. If you have images, files, or videos which you want to use in your app, this is where to put them.

- `integrations/` is a folder to put all third-party integrations like with Stripe, Sentry, etc.

- `test/` is a folder where you can put test utilities and integration tests.

- `package.json` contains information about your dependencies and devDependencies. If you’re using a tool like `npm` or `yarn`, you won’t have to worry about this much.

- `tsconfig.json` is our recommended setup for TypeScript.

- `.babel.config.js`, `.eslintrc.js`, `.env`, etc. ("dotfiles") are configuration files for various bits of JavaScript tooling.

- `blitz.config.ts` is for advanced custom configuration of Blitz. [Here you can learn how to use it](https://blitzjs.com/docs/blitz-config).

- `vitest.config.ts` contains config for Vitest tests. You can [customize it if needed](https://vitejs.dev/config/).

You can read more about it in the [File Structure](https://blitzjs.com/docs/file-structure) section of the documentation.

### Tools included

Blitz comes with a set of tools that corrects and formats your code, facilitating its future maintenance. You can modify their options and even uninstall them.

- **ESLint**: It lints your code: searches for bad practices and tell you about it. You can customize it via the `.eslintrc.js`, and you can install (or even write) plugins to have it the way you like it. It already comes with the [`blitz`](https://github.com/blitz-js/blitz/tree/canary/packages/eslint-config) config, but you can remove it safely. [Learn More](https://blitzjs.com/docs/eslint-config).
- **Husky**: It adds [githooks](https://git-scm.com/docs/githooks), little pieces of code that get executed when certain Git events are triggerd. For example, `pre-commit` is triggered just before a commit is created. You can see the current hooks inside `.husky/`. If are having problems commiting and pushing, check out ther [troubleshooting](https://typicode.github.io/husky/#/?id=troubleshoot) guide. [Learn More](https://blitzjs.com/docs/husky-config).
- **Prettier**: It formats your code to look the same everywhere. You can configure it via the `.prettierrc` file. The `.prettierignore` contains the files that should be ignored by Prettier; useful when you have large files or when you want to keep a custom formatting. [Learn More](https://blitzjs.com/docs/prettier-config).

## Learn more

Read the [Blitz.js Documentation](https://blitzjs.com/docs/getting-started) to learn more.

The Blitz community is warm, safe, diverse, inclusive, and fun! Feel free to reach out to us in any of our communication channels.

- [Website](https://blitzjs.com)
- [Discord](https://blitzjs.com/discord)
- [Report an issue](https://github.com/blitz-js/blitz/issues/new/choose)
- [Forum discussions](https://github.com/blitz-js/blitz/discussions)
- [How to Contribute](https://blitzjs.com/docs/contributing)
- [Sponsor or donate](https://github.com/blitz-js/blitz#sponsors-and-donations)
