// utils.js

// Format credit card number by adding spaces after every 4 digits
export const formatCreditCardNumber = (value) => {
  return (
    value
      .replace(/\s/g, "")
      .match(/.{1,4}/g)
      ?.join(" ")
      .substr(0, 19) || ""
  );
};

// Format CVC by allowing only 3 digits
export const formatCVC = (value) => {
  return value.replace(/\D/g, "").slice(0, 3);
};

// Format expiration date by adding a slash after the first 2 digits
export const formatExpirationDate = (value) => {
  return (
    value
      .replace(/\s/g, "")
      .match(/.{1,2}/g)
      ?.join("/")
      .substr(0, 5) || ""
  );
};
