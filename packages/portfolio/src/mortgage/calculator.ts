export type Inputs = {
  price: number;
  down: number;
  downMode: "percent" | "dollars";
  rate: number;
  years: number;
  tax: number;
  insurance: number;
  hoa: number;
  pmi: number;
  maintenance: number;
  closing: number;
  prepaid: number;
  deposit: number;
};

// Illustrative planning assumptions, not market quotes or local tax estimates.
export const defaults: Inputs = {
  price: 900000,
  down: 20,
  downMode: "percent",
  rate: 6.5,
  years: 30,
  tax: 1,
  insurance: 1800,
  hoa: 0,
  pmi: 0.5,
  maintenance: 1,
  closing: 2,
  prepaid: 3000,
  deposit: 0,
};

export const limits: Record<Exclude<keyof Inputs, "downMode">, number> = {
  price: 100000000,
  down: 100000000,
  rate: 30,
  years: 40,
  tax: 20,
  insurance: 1000000,
  hoa: 100000,
  pmi: 10,
  maintenance: 20,
  closing: 20,
  prepaid: 10000000,
  deposit: 100000000,
};

export function validate(input: Inputs): Partial<Record<keyof Inputs, string>> {
  const errors: Partial<Record<keyof Inputs, string>> = {};
  for (const key of Object.keys(limits) as Array<keyof typeof limits>) {
    if (
      !Number.isFinite(input[key]) ||
      input[key] < 0 ||
      input[key] > limits[key]
    ) {
      errors[key] =
        `Enter a number from 0 to ${limits[key].toLocaleString("en-US")}.`;
    }
  }
  if (input.price <= 0) errors.price = "Enter a home price greater than $0.";
  if (![10, 15, 20, 30, 40].includes(input.years))
    errors.years = "Choose a supported loan term.";
  if (!["percent", "dollars"].includes(input.downMode))
    errors.downMode = "Choose % or $.";
  if (input.down > (input.downMode === "percent" ? 100 : input.price)) {
    errors.down =
      input.downMode === "percent"
        ? "Down payment cannot exceed 100%."
        : "Down payment cannot exceed the home price.";
  }
  return errors;
}

export function monthlyPayment(
  principal: number,
  annualRate: number,
  months: number,
) {
  if (principal === 0) return 0;
  if (annualRate === 0) return principal / months;
  const r = annualRate / 1200;
  // expm1/log1p keep near-zero rates numerically stable.
  return (principal * r) / -Math.expm1(-months * Math.log1p(r));
}

export function calculate(input: Inputs) {
  if (Object.keys(validate(input)).length)
    throw new RangeError("Invalid mortgage inputs");
  const downPayment =
    input.downMode === "percent"
      ? (input.price * input.down) / 100
      : input.down;
  const loan = input.price - downPayment;
  const downPercent = (downPayment / input.price) * 100;
  const months = input.years * 12;
  const principalInterest = monthlyPayment(loan, input.rate, months);
  const tax = (input.price * input.tax) / 1200;
  const insurance = input.insurance / 12;
  const pmi = downPercent < 20 ? (loan * input.pmi) / 1200 : 0;
  const maintenance = (input.price * input.maintenance) / 1200;
  const monthly = principalInterest + tax + insurance + input.hoa + pmi;
  const closingFees = (input.price * input.closing) / 100;
  const upfront = downPayment + closingFees + input.prepaid;
  const cashToClose = Math.max(0, upfront - input.deposit);
  let balance = loan;
  let totalInterest = 0;
  const schedule: {
    year: number;
    principal: number;
    interest: number;
    balance: number;
  }[] = [];
  for (let year = 1; year <= input.years; year++) {
    let yearPrincipal = 0;
    let yearInterest = 0;
    for (let month = 1; month <= 12; month++) {
      const interest = (balance * input.rate) / 1200;
      const principal = Math.min(
        balance,
        Math.max(0, principalInterest - interest),
      );
      balance = Math.max(0, balance - principal);
      yearPrincipal += principal;
      yearInterest += interest;
    }
    totalInterest += yearInterest;
    schedule.push({
      year,
      principal: yearPrincipal,
      interest: yearInterest,
      balance: balance < 0.01 ? 0 : balance,
    });
  }
  return {
    downPayment,
    downPercent,
    loan,
    principalInterest,
    tax,
    insurance,
    pmi,
    maintenance,
    monthly,
    budget: monthly + maintenance,
    closingFees,
    upfront,
    cashToClose,
    totalInterest,
    schedule,
  };
}

export const money = (value: number) =>
  new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(Object.is(value, -0) ? 0 : value);
