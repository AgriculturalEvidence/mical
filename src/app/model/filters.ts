import {CustomLngLatBounds} from "../util/typings";

export abstract class Filter {
  abstract build(): object;

  compile(): string {
    return btoa(JSON.stringify(this.build()))
  }
}

export class EmptyFilter extends Filter{
  build(): object {
    return {};
  }
}

export class RegexFilter extends Filter {
  constructor(private str: string, private col: string) {
    super();
  }

  build(): object {
    return {
      [this.col] : { '$regex': this.str },
    };
  }
}

export enum Comparator {
  AND = '$and',
  OR = '$or',
  NOT = '$not'
}


export class CompoundFilter extends Filter {
  constructor(private op: Comparator, protected filters: Filter[]) {
    super();
  }
  build(): object {
    return { [this.op]: this.filters.map(f => f.build())};
  }
}

export class GeoFilter implements Filter {
  bnds: CustomLngLatBounds;

  build() {
    return undefined;
  }

  compile(): string {
    if (this.bnds === undefined) {
      return "";
    }
    let east = this.bnds.getEast();
    let west = this.bnds.getWest();
    let north = this.bnds.getNorth();
    let south = this.bnds.getSouth();
    let arr = [north, east, south, west];
    return arr.join(",");
  }
}
