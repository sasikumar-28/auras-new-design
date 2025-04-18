import { gql } from "@apollo/client";

export const CUSTOMER_LOGIN = gql`
  mutation SignInCustomer($draft: CustomerSignInDraft!) {
    customerSignIn(draft: $draft) {
      customer {
        id
        email
        password
      }
    }
  }
`;

export const CUSTOMER_CREATE = gql`
  mutation CreateCustomer($draft: CustomerSignUpDraft!) {
    customerSignUp(draft: $draft) {
      customer {
        id
        email
        password
      }
    }
  }
`;

export const CREATE_ORDER = gql`
  mutation CreateOrderFromCart($draft: OrderCartCommand!) {
    createOrderFromCart(draft: $draft) {
      id
      version
      orderState
      totalPrice {
        centAmount
        currencyCode
      }
      lineItems {
        id
        productId
        quantity
        price {
          value {
            centAmount
          }
        }
      }
      shippingAddress {
        streetName
        city
        state
        country
        postalCode
      }
    }
  }
`;

export const UPDATE_PAYMENT = gql`
  mutation UpdatePayment(
    $id: String!
    $version: Long!
    $transactionId: String!
    $fields: [CustomFieldInput!]!
  ) {
    updatePayment(
      version: $version
      id: $id
      actions: [
        {
          changeTransactionState: {
            transactionId: $transactionId
            state: Initial
          }
        }
        {
          setCustomType: { type: { key: "payment_info_type" }, fields: $fields }
        }
      ]
    ) {
      id
      version
      key
      interfaceId
      amountPlanned {
        type
        centAmount
        currencyCode
        fractionDigits
      }
      paymentMethodInfo {
        paymentInterface
        method
        nameAllLocales {
          value
        }
      }
      custom {
        type {
          id
        }
        customFieldsRaw {
          name
          value
        }
      }
      transactions {
        id
        timestamp
        type
        amount {
          type
          centAmount
          currencyCode
          fractionDigits
        }
        state
      }
    }
  }
`;

export const SHIPPING_ADDRESS = gql`
  mutation SetShippingAddress(
    $cartId: String!
    $version: Long!
    $address: AddressInput!
  ) {
    updateCart(
      id: $cartId
      version: $version
      actions: [{ setShippingAddress: { address: $address } }]
    ) {
      id
      version
      shippingAddress {
        streetName
        postalCode
        city
        state
        country
      }
    }
  }
`;
export const ADD_ADDRESS = gql`
  mutation AddAddress(
    $version: Long!
    $actions: [CartUpdateAction!]!
    $id: String!
  ) {
    updateCart(version: $version, actions: $actions, id: $id) {
      itemShippingAddresses {
        key
        id
        firstName
        lastName
        streetName
        city
        postalCode
        state
        phone
        email
      }
      version
    }
  }
`;

export const CREATE_CART = gql`
  mutation CreateCart($currency: Currency!, $country: Country) {
    createCart(draft: { currency: $currency, country: $country }) {
      id
      version
      createdAt
      lastModifiedAt
      lastModifiedBy {
        isPlatformClient
      }
      createdBy {
        isPlatformClient
      }
      lineItems {
        id
      }
      cartState
      totalPrice {
        type
        currencyCode
        centAmount
        fractionDigits
      }
      customLineItems {
        id
      }
      inventoryMode
      taxMode
      taxRoundingMode
      taxCalculationMode
      refusedGifts {
        id
      }
      origin
      itemShippingAddresses {
        key
      }
    }
  }
`;
