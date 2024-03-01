import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { AuthService } from './auth.service';

describe('AUTH Service test', () => {
  let httpController: HttpTestingController;
  const apiUrl = `${environment.API_URL}/api/auth`;
  let tokenService: TokenService;
  let authService: AuthService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [AuthService, TokenService],
    });

    authService = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
    tokenService = TestBed.inject(TokenService);
  });

  afterEach(() => {
    httpController.verify();
  });

  it('Should exist auth service', () => {
    expect(authService).toBeTruthy();
  });

  describe('Login tests for', () => {
    it('Debería retornar un token', (done) => {
      // arrange
      const emailTest = 'isra@gmail.com';
      const passwordTest = 'password123';

      const stubToken = {
        access_token: 'successful',
      };

      //act
      authService.login(emailTest, passwordTest).subscribe((data) => {
        //assert
        expect(data).toEqual(stubToken);
        done();
      });

      //arrange http calls and mock
      const apiTest = `${apiUrl}/login`;
      const req = httpController.expectOne(apiTest);
      req.flush(stubToken);
      expect(req.request.body).toEqual({
        email: emailTest,
        password: passwordTest,
      });
      expect(req.request.method).toEqual('POST');
    });
    it('Debería guardar el token de respuesta', (done) => {
      // arrange
      const emailTest = 'isra@gmail.com';
      const passwordTest = 'password123';

      const stubToken = {
        access_token: 'successful',
      };
      // call through espía el método real pero no lo ejecuta realmente
      // Si no llamamos con Callthrough, se llamaría al método real y no queremos llamar
      // al método real bro
      spyOn(tokenService, 'saveToken').and.callThrough();

      //act
      authService.login(emailTest, passwordTest).subscribe((data) => {
        //assert
        expect(data).toEqual(stubToken);
        expect(tokenService.saveToken).toHaveBeenCalledTimes(1);
        expect(tokenService.saveToken).toHaveBeenCalledWith(
          stubToken.access_token,
        );
        done();
      });

      //arrange http calls and mock
      const apiTest = `${apiUrl}/login`;
      const req = httpController.expectOne(apiTest);
      req.flush(stubToken);
      expect(req.request.body).toEqual({
        email: emailTest,
        password: passwordTest,
      });
      expect(req.request.method).toEqual('POST');
    });
  });
});
