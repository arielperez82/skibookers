const EPSILON = 0.0001;
export class BudgetRange {
    constructor(
      public readonly min: number,
      public readonly max: number
    ) {
      if (min < 0) throw new Error('Budget minimum cannot be negative');
      if (max < min) throw new Error('Budget maximum cannot be less than minimum');
    }
  
    static fromStringRange(rangeString: string): BudgetRange {
      const cleaned = rangeString.replace(/€/g, '').replace(/\s/g, '');

      // <number>
      const lessMatch = cleaned.match(/^<\s*(\d+)$/);
      if (lessMatch) {
        const max = parseFloat(lessMatch[1]);
        return new BudgetRange(0, max - EPSILON);
      }
      // number1-number2
      const rangeMatch = cleaned.match(/^(\d+(\.\d+)?)-(\d+(\.\d+)?)$/);
      if (rangeMatch) {
        const min = parseFloat(rangeMatch[1]);
        const max = parseFloat(rangeMatch[3]);
        return new BudgetRange(min, max);
      }

      // number+
      const plusMatch = cleaned.match(/^(\d+(\.\d+)?)\+$/);
      if (plusMatch) {
        const min = parseFloat(plusMatch[1]);
        return new BudgetRange(min, Number.MAX_SAFE_INTEGER);
      }

      throw new Error(`Invalid budget range format: ${rangeString}`);
    }
  
    contains(amount: number): boolean {
      return amount >= this.min && amount <= this.max;
    }
  
    containsRange(other: BudgetRange): boolean {
      // Returns true if this range overlaps with the other range
      return this.max >= other.min && this.min <= other.max;
    }
  
    toString(): string {
      if (this.max === Number.MAX_SAFE_INTEGER) {
        return `${this.min}+`;
      }
      if (this.min === 0) {
        return `<${this.max + EPSILON}`;
      }
      return `${this.min}-${this.max}`;
    }
  
    equals(other: BudgetRange): boolean {
      return this.min === other.min && this.max === other.max;
    }
  }