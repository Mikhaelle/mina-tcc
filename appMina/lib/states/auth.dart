import 'package:appMina/models/quiz.dart';
import 'package:appMina/models/user.dart';
import 'package:appMina/services/quizDatabase.dart';
import 'package:appMina/services/userDatabase.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:google_sign_in/google_sign_in.dart';

class Auth with ChangeNotifier {
  late OurUser _currentUser;

  OurUser? get getCurrentUser => _currentUser;

  final FirebaseAuth _auth = FirebaseAuth.instance;

  Future<String> signOut() async {
    String retVal = "error";
    try {
      await _auth.signOut();
      final googleSignIn = GoogleSignIn();
      await googleSignIn.signOut();
      _currentUser = OurUser();

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
      _currentUser = await UserDatabase().getUserInfo(_firebaseUser.uid);
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

      _currentUser = await UserDatabase().getUserInfo(user.user!.uid);
      retVal = "success";
    } on FirebaseAuthException catch (e) {
      retVal = e.message!;
    }
    return retVal;
  }

  Future<String> signUp(String email, String password, String name) async {
    String retVal = "error";
    OurUser _user = OurUser();
    Quiz _quiz = Quiz();

    try {
      UserCredential _userAuth = await _auth.createUserWithEmailAndPassword(
          email: email, password: password);
      _user.uid = _userAuth.user!.uid;
      _user.email = _userAuth.user!.email;
      _user.name = name;
      _user.photoUrl = null;
      _user.quizAnswered = false;
      _user.groupId = null;
      String _returnString = await UserDatabase().createUser(_user);

      _quiz.isAnswered = false;
      _quiz.uid = _userAuth.user!.uid;
      QuizDatabse().createQuiz(_quiz);

      if (_returnString == "success") {
        _currentUser = await UserDatabase().getUserInfo(_userAuth.user!.uid);
        retVal = "success";
      }
    } on FirebaseAuthException catch (e) {
      retVal = e.message!;
    }
    return retVal;
  }

  Future<bool> googleSignIn(BuildContext context) async {
    GoogleSignIn googleSignIn = GoogleSignIn();
    OurUser _user = OurUser();
    Quiz _quiz = Quiz();

    GoogleSignInAccount? googleUser = await googleSignIn.signIn();
    if (googleUser != null) {
      GoogleSignInAuthentication googleAuth = await googleUser.authentication;

      if (googleAuth.idToken != null && googleAuth.accessToken != null) {
        final AuthCredential credential = GoogleAuthProvider.credential(
            accessToken: googleAuth.accessToken, idToken: googleAuth.idToken);

        final UserCredential _authResult =
            await _auth.signInWithCredential(credential);
        if (_authResult.additionalUserInfo!.isNewUser) {
          _user.uid = _authResult.user!.uid;
          _user.email = _authResult.user!.email;
          _user.name = _authResult.user!.displayName;
          UserDatabase().createUser(_user);

          _quiz.isAnswered = false;
          _quiz.uid = _authResult.user!.uid;
          QuizDatabse().createQuiz(_quiz);
        }
        _currentUser = await UserDatabase().getUserInfo(_authResult.user!.uid);
        return true;
      } else {
        throw StateError('Missing Google Auth Token');
      }
    } else
      throw StateError('Sign in Aborted');
  }
}
