import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';


export class AuthService {
  private static instance: AuthService | null;
  private _service;

  private constructor(service: any) {
    this._service = service;
  }

  async createUserWithEmailAndPassword(email : string, password: string) {
    auth()
        .createUserWithEmailAndPassword(email, password)
        .then(() => {
          console.log('User account created & signed in!');
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            console.log('That email address is already in use!');
          }

          if (error.code === 'auth/invalid-email') {
            console.log('That email address is invalid!');
          }

          console.error(error);
        });
  }

  async login(email : string, password: string) {
    auth()
        .signInWithEmailAndPassword(email,password)
        .then((user)=>{ console.log(user); return user})
        .catch((error) =>{console.log(error)})
  }

  async logout() {
    auth()
        .signOut()
        .then(() => console.log('User signed out!'));
  }

  async onGoogleButtonPress() {
    // Get the users ID token
    try{

        // Get the users ID token
  const { idToken } = await GoogleSignin.signIn();

  // Create a Google credential with the token
  const googleCredential = auth.GoogleAuthProvider.credential(idToken);

  // Sign-in the user with the credential
  return auth().signInWithCredential(googleCredential);
    }catch(e) {
      console.log(e)
    }

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    auth().signInWithCredential(googleCredential).then((user)=>{
      console.log(user)
      return user.user;
    })
  }

  async getUser() {

  }

  async getTokenExpiration() {
    const response = await this._service.introspectAccessToken();
    return response.exp * 1000;
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
}
