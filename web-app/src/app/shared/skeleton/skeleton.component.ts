import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-skeleton',
  templateUrl: './skeleton.component.html',
  styleUrls: ['./skeleton.component.scss'],
})
export class SkeletonComponent implements OnInit {
  @Input()
  count = 1;

  @Input() get theme(): { [klass: string]: string } {
    return this.styles;
  }
  set theme(value: { [klass: string]: string }) {
    this.styles = value;
  }

  styles: { [klass: string]: any } = {};

  items: Array<number> = [];

  @Input()
  public get circle(): BooleanInput {
    return this.circleValue;
  }
  public set circle(value: BooleanInput) {
    this.circleValue = coerceBooleanProperty(value);
  }
  private circleValue: BooleanInput = false;

  @Input()
  public get squareBorder(): BooleanInput {
    return this.squareBorderValue;
  }
  public set squareBorder(value: BooleanInput) {
    this.squareBorderValue = coerceBooleanProperty(value);
  }
  private squareBorderValue: BooleanInput = false;

  @Input()
  public get circleSmall(): BooleanInput {
    return this.circleSmallValue;
  }
  public set circleSmall(value: BooleanInput) {
    this.circleSmallValue = coerceBooleanProperty(value);
  }
  private circleSmallValue: BooleanInput = false;

  @Input()
  public get fieldXSmall(): BooleanInput {
    return this.fieldXSmallValue;
  }
  public set fieldXSmall(value: BooleanInput) {
    this.fieldXSmallValue = coerceBooleanProperty(value);
  }
  private fieldXSmallValue: BooleanInput = false;

  @Input()
  public get fieldSmall(): BooleanInput {
    return this.fieldSmallValue;
  }
  public set fieldSmall(value: BooleanInput) {
    this.fieldSmallValue = coerceBooleanProperty(value);
  }
  private fieldSmallValue: BooleanInput = false;

  @Input()
  public get fieldMedium(): BooleanInput {
    return this.fieldMediumValue;
  }
  public set fieldMedium(value: BooleanInput) {
    this.fieldMediumValue = coerceBooleanProperty(value);
  }
  private fieldMediumValue: BooleanInput = false;

  @Input()
  public get fieldLarge(): BooleanInput {
    return this.fieldLargeValue;
  }
  public set fieldLarge(value: BooleanInput) {
    this.fieldLargeValue = coerceBooleanProperty(value);
  }
  private fieldLargeValue: BooleanInput = false;

  constructor() {}

  ngOnInit(): void {
    this.styles = this.theme || {};
    this.items = Array.from({ length: this.count }, (_, index) => index);
  }
}
