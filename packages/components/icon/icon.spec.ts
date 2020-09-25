import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Icon } from './icon.component';
import { IconModule } from './icon.module';

describe('Icon', () => {
  let component: Icon;
  let fixture: ComponentFixture<Icon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IconModule],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Icon);
    component = fixture.componentInstance;
    component.name = 'clock';
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
