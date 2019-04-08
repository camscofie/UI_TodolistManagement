import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FavoriteTodoListComponent } from './favorite-todo-list.component';

describe('FavoriteTodoListComponent', () => {
  let component: FavoriteTodoListComponent;
  let fixture: ComponentFixture<FavoriteTodoListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FavoriteTodoListComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FavoriteTodoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
