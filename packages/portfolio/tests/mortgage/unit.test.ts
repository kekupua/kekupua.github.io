import assert from "node:assert/strict";
import { test } from "node:test";
import {
  calculate,
  defaults,
  monthlyPayment,
  validate,
} from "../../src/mortgage/calculator";
const close = (actual: number, expected: number, tolerance = 0.01) =>
  assert.ok(Math.abs(actual - expected) < tolerance, `${actual} ≠ ${expected}`);
test("standard amortizing payment matches independently tabulated $300k / 6% / 30yr loan", () => {
  close(monthlyPayment(300000, 6, 360), 1798.65);
});
test("zero interest divides principal evenly and preserves amortization", () => {
  const r = calculate({ ...defaults, price: 360000, down: 0, rate: 0 });
  close(r.principalInterest, 1000);
  close(r.totalInterest, 0);
  close(r.schedule[0].principal, 12000);
  close(r.schedule[29].balance, 0);
});
test("near-zero interest remains stable", () =>
  close(monthlyPayment(360000, 0.000000001, 360), 1000));
test("monthly total includes taxes, insurance, HOA and PMI but keeps reserve separate", () => {
  const r = calculate({
    ...defaults,
    price: 300000,
    down: 10,
    rate: 0,
    hoa: 250,
    tax: 1.2,
    insurance: 1200,
    pmi: 0.6,
    maintenance: 2,
  });
  close(r.principalInterest, 750);
  close(r.tax, 300);
  close(r.insurance, 100);
  close(r.pmi, 135);
  close(r.monthly, 1535);
  close(r.maintenance, 500);
  close(r.budget, 2035);
});
test("PMI applies below, but not at or above, 20 percent", () => {
  assert.ok(calculate({ ...defaults, down: 19.99 }).pmi > 0);
  assert.equal(calculate({ ...defaults, down: 20 }).pmi, 0);
  assert.equal(calculate({ ...defaults, down: 25 }).pmi, 0);
});
test("dollar down payment has equivalent results", () => {
  assert.deepEqual(
    calculate(defaults),
    calculate({ ...defaults, downMode: "dollars", down: 180000 }),
  );
});
test("100 percent down has no loan or interest, but recurring ownership costs remain", () => {
  const r = calculate({ ...defaults, down: 100 });
  assert.equal(r.loan, 0);
  assert.equal(r.principalInterest, 0);
  assert.equal(r.pmi, 0);
  assert.equal(r.totalInterest, 0);
  assert.equal(r.monthly, 900);
  assert.ok(r.schedule.every((row) => row.balance === 0));
});
test("upfront costs and deposit are calculated without double counting", () => {
  const r = calculate({ ...defaults, deposit: 20000 });
  assert.equal(r.closingFees, 18000);
  assert.equal(r.upfront, 201000);
  assert.equal(r.cashToClose, 181000);
  assert.equal(calculate({ ...defaults, deposit: 300000 }).cashToClose, 0);
});
test("annual schedule conserves principal and matches total loan interest", () => {
  for (const years of [10, 15, 20, 30, 40]) {
    const r = calculate({ ...defaults, years });
    close(
      r.schedule.reduce((sum, row) => sum + row.principal, 0),
      r.loan,
    );
    close(r.totalInterest, r.principalInterest * years * 12 - r.loan);
    assert.equal(r.schedule.at(-1)?.balance, 0);
    assert.ok(r.schedule.every((row) => row.balance >= 0 && row.interest >= 0));
  }
});
test("invalid and nonfinite inputs never produce a misleading estimate", () => {
  for (const patch of [
    { price: 0 },
    { price: -1 },
    { price: Infinity },
    { rate: NaN },
    { down: 101 },
    { tax: -2 },
    { rate: 31 },
    { years: 0 },
    { years: 12 },
  ]) {
    assert.ok(Object.keys(validate({ ...defaults, ...patch })).length);
    assert.throws(() => calculate({ ...defaults, ...patch }), RangeError);
  }
  assert.throws(() =>
    calculate({ ...defaults, downMode: "dollars", down: defaults.price + 1 }),
  );
});
