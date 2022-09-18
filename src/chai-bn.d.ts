/// <reference types="chai" />
/// <reference types="bignumber.js" />

declare module 'chai-bignumber' {

  function chaiBignumber(bignumber: BigNumber): (chai: Chai, utils: unknown) => void;

  namespace chaiBignumber {

  }

  export = chaiBignumber;
}

declare namespace Chai {
  // For BDD API
  interface Assertion extends LanguageChains, NumericComparison, TypeComparison {
    bignumber: Assertion;
  }

  interface NumberComparer {
    (value: number | Date | BigNumber.Instance, message?: string): Assertion;
  }
}
