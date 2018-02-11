# BorrowIt Client

This client is powered by React, and was built using `create-react-app`. Please consult the `create-react-app` [documentation](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md) if you have questions on how to do something (like adding a dependency or writing test files). 

We are using `npm` for this project as it has proven to be more reliable over various development ecosystems. (Don't forget to run `npm run install`)

Forms are built using [React-Final-Form](https://github.com/final-form/react-final-form). The docs can be quite difficult to understand so just ask [Ethan](https://github.com/ethan-arrowood) if you have any questions.

The client is built using [Bootstrap 4](https://getbootstrap.com/docs/4.0/getting-started/introduction/)

[Open Iconic](https://useiconic.com/open) Icons are also available using the bootstrap implementation method

All components can be found in the [`src/components`](/src/components) directory

You must create a `.env` file in the root of this directory and define the following variables:

```
REACT_APP_AUTH_SECRET=
REACT_APP_AUTH_USERNAME=
REACT_APP_AUTH_PASSWORD=
```

Whatever you set as the username and password is what will be used to login as an admin.