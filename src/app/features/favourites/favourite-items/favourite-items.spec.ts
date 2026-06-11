import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FavouriteItems } from './favourite-items';

describe('FavouriteItems', () => {
  let component: FavouriteItems;
  let fixture: ComponentFixture<FavouriteItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FavouriteItems],
    }).compileComponents();

    fixture = TestBed.createComponent(FavouriteItems);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
