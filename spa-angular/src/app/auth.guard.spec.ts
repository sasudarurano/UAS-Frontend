import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
  let guard: AuthGuard;
  let routerSpy: jasmine.SpyObj<Router>;

  beforeEach(() => {
    const spy = jasmine.createSpyObj('Router', ['navigate']);
    TestBed.configureTestingModule({
      providers: [AuthGuard, { provide: Router, useValue: spy }],
    });
    guard = TestBed.inject(AuthGuard);
    routerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
  });

  it('should allow navigation if token exists', () => {
    spyOn(localStorage, 'getItem').and.returnValue('mockToken');
    expect(guard.canActivate()).toBeTrue();
  });

  it('should redirect to /auth if token does not exist', () => {
    spyOn(localStorage, 'getItem').and.returnValue(null);
    expect(guard.canActivate()).toBeFalse();
    expect(routerSpy.navigate).toHaveBeenCalledWith(['/auth']);
  });
});