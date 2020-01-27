export class Order{

  private _productGroup:ProductGroup;

  private _color:Color;

  private _length:Rod = {length:'0', price:0, id:0, imageUrl:''};
  private _rodCount:number;

  private _supportType:Support;
  //todo
  private _supportCount:number = 2;


  private _endingType:Ending;
  //todo
  private _endingCount:number = 2;

  private _circleType:Circle;
  //todo
  private _circleCount:number = 10;

  constructor(){}


  get productGroup(): ProductGroup {
    return this._productGroup;
  }

  set productGroup(value: ProductGroup) {
    this._productGroup = value;
  }

  get length(): Rod {
    return this._length;
  }

  set length(value: Rod) {
    this._length = value;
  }

  get rodCount(): number {
    return this._rodCount;
  }

  set rodCount(value: number) {
    this._rodCount = value;
  }

  get color(): Color {
    return this._color;
  }

  set color(value: Color) {
    this._color = value;
  }

  get supportType(): Support {
    return this._supportType;
  }

  set supportType(value: Support) {
    this._supportType = value;
  }

  get supportCount(): number {
    return this._supportCount;
  }

  set supportCount(value: number) {
    this._supportCount = value;
  }

  get circleType(): Circle {
    return this._circleType;
  }

  set circleType(value: Circle) {
    this._circleType = value;
  }

  get circleCount(): number {
    return this._circleCount;
  }

  set circleCount(value: number) {
    this._circleCount = value;
  }


  get endingType(): Ending {
    return this._endingType;
  }

  set endingType(value: Ending) {
    this._endingType = value;
  }

  get endingCount(): number {
    return this._endingCount;
  }

  set endingCount(value: number) {
    this._endingCount = value;
  }
}

export class ProductGroup {
  id: number;
  name: string;
  url: string;
}

export class Color {
  id: number;
  name: string;
  imageUrl: string;
}

export class Rod {
  id: number;
  length: string;
  imageUrl: string;
  price: number;
}

export class Support {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export class Ending {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}

export class Circle {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
}




