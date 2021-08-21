import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

class Auth with ChangeNotifier {
  String? _uid;
  String? _email;
  String? _photoUrl;
  String? _displayName;

  String? get getUid => _uid;
  String? get getEmail => _email;
  String? get getPhoto => _photoUrl;
  String? get getDisplayName => _displayName;

  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<String> signOut() async {
    String retVal = "error";
    try {
      await _auth.signOut();
      final googleSignIn = GoogleSignIn();
      await googleSignIn.signOut();

      _uid = null;
      _email = null;
      _displayName = null;
      _photoUrl = null;

      retVal = "success";
    } catch (e) {
      print(e);
    }
    return retVal;
  }

  Future<String> onStartUp() async {
    String retVal = "error";

    try {
      User? _firebaseUser = _auth.currentUser!;
      print(_firebaseUser);

      _uid = _firebaseUser.uid;
      _email = _firebaseUser.email!;
      _displayName = _firebaseUser.displayName!;
      _photoUrl = _firebaseUser.photoURL!;

      retVal = "success";
    } catch (e) {
      print(e);
    }
    return retVal;
  }

  Future<String> login(String email, String password) async {
    String retVal = "error";
    try {
      UserCredential user = await _auth.signInWithEmailAndPassword(
          email: email, password: password);

      _uid = user.user!.uid;
      _email = user.user!.email!;
      _displayName = user.user!.displayName!;
      _photoUrl = user.user!.photoURL!;

      retVal = "success";
    } on FirebaseAuthException catch (e) {
      retVal = e.message!;
    }
    return retVal;
  }

  Future<String> signUp(String email, String password, String name) async {
    String retVal = "error";

    try {
      UserCredential user = await _auth.createUserWithEmailAndPassword(
          email: email, password: password);
      await _auth.currentUser!.updateDisplayName(name);
      retVal = "success";
    } on FirebaseAuthException catch (e) {
      retVal = e.message!;
    }
    return retVal;
  }

  Future<bool> googleSignIn(BuildContext context) async {
    GoogleSignIn googleSignIn = GoogleSignIn();
    GoogleSignInAccount? googleUser = await googleSignIn.signIn();
    if (googleUser != null) {
      GoogleSignInAuthentication googleAuth = await googleUser.authentication;

      if (googleAuth.idToken != null && googleAuth.accessToken != null) {
        final AuthCredential credential = GoogleAuthProvider.credential(
            accessToken: googleAuth.accessToken, idToken: googleAuth.idToken);

        final UserCredential user =
            await _auth.signInWithCredential(credential);

        _uid = user.user!.uid;
        _email = user.user!.email!;
        _displayName = user.user!.displayName!;
        return true;
      } else {
        throw StateError('Missing Google Auth Token');
      }
    } else
      throw StateError('Sign in Aborted');
  }
}
