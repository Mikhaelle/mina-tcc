import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';

export class AuthService {
  private static instance: AuthService | null;
  private _service;

  private constructor(service: any) {
    this._service = service;
  }

  static getInstance(service?: any) {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService(service);
    }
    return AuthService.instance;
  }

  static destroy() {
    AuthService.instance = null;
  }

  async createUserWithEmailAndPassword(
    email: string,
    password: string,
    displayName: string,
    setEmailError: any,
    setPasswordError: any,
  ) {
    auth()
      .createUserWithEmailAndPassword(email, password)
      .then(() => {
        console.log('User account created & signed in!');
        auth().currentUser?.updateProfile({displayName: displayName});
      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          setEmailError('Email já em uso!');
        }
        if (error.code === 'auth/invalid-email') {
          setEmailError('Email inválido!');
        }
        if (error.code === 'auth/invalid-password') {
          setPasswordError('Senha inválida! A senha precisa ter 6 dígitos.');
        }
        console.error(error);
      });
  }

  async login(
    email: string,
    password: string,
    setEmailError: any,
    setPasswordError: any,
  ) {
    auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        return user;
      })
      .catch(error => {
        if (error.code === 'auth/invalid-email') {
          setEmailError('Email inválido!');
        }
        if (error.code === 'auth/user-not-found') {
          setEmailError('Usuário não encontrado!');
        }
        if (error.code === 'auth/wrong-password') {
          setPasswordError('Usuário ou senha não coincidem!');
        }
      });
  }

  async logout() {
    auth()
      .signOut()
      .then(() => console.log('User signed out!'));
  }

  async resetPassword(email: string) {
    return auth()
      .sendPasswordResetEmail(email)
      .then(function (user) {
        return;
      })
      .catch(function (e) {
        console.log(e);
      });
  }

  async onGoogleButtonPress() {
    // Get the users ID token
    try {
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();

      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (e) {
      console.log(e);
    }

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    auth()
      .signInWithCredential(googleCredential)
      .then(user => {
        return user.user;
      });
  }

  async getUser() {}

  async getTokenExpiration() {
    const response = await this._service.introspectAccessToken();
    return response.exp * 1000;
  }
}
