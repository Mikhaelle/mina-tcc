import 'package:appMina/scenes/SingUpScene.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';
import 'package:google_sign_in/google_sign_in.dart';

class LoginScene extends StatefulWidget {
  //const LoginScene({ Key? key }) : super(key: key);

  @override
  _LoginSceneState createState() => _LoginSceneState();
}

class _LoginSceneState extends State<LoginScene> {
  final FirebaseAuth _auth = FirebaseAuth.instance;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  late String _email, _password;

  checkAutentication() async {
    _auth.authStateChanges().listen(
      (User? user) {
        if (user != null) {
          Navigator.pushReplacementNamed(context, "/");
        }
      },
    );
  }

  Future<UserCredential> googleSignIn() async {
    GoogleSignIn googleSignIn = GoogleSignIn();
    GoogleSignInAccount? googleUser = await googleSignIn.signIn();
    if (googleUser != null) {
      GoogleSignInAuthentication googleAuth = await googleUser.authentication;

      if (googleAuth.idToken != null && googleAuth.accessToken != null) {
        final AuthCredential credential = GoogleAuthProvider.credential(
            accessToken: googleAuth.accessToken, idToken: googleAuth.idToken);

        final UserCredential user =
            await _auth.signInWithCredential(credential);

        await Navigator.pushReplacementNamed(context, "/");

        return user;
      } else {
        throw StateError('Missing Google Auth Token');
      }
    } else
      throw StateError('Sign in Aborted');
  }

  @override
  void initState() {
    super.initState();
    this.checkAutentication();
  }

  Future<void> login() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();

      try {
        await _auth.signInWithEmailAndPassword(
            email: _email, password: _password);
      } on FirebaseAuthException catch (e) {
        showError(e.code);
      }
    }
  }

  showError(String errormessage) {
    showDialog(
      context: context,
      builder: (BuildContext context) {
        return AlertDialog(
          title: Text('ERROR'),
          content: Text(errormessage),
          actions: <Widget>[
            TextButton(
                onPressed: () {
                  Navigator.of(context).pop();
                },
                child: Text('ok'))
          ],
        );
      },
    );
  }

  navigateToSignUp() async {
    Navigator.push(
        context, MaterialPageRoute(builder: (context) => SingUpScene()));
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: Theme.of(context).accentColor,
      body: SingleChildScrollView(
        child: Container(
          child: Column(
            children: <Widget>[
              SizedBox(height: 80),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  Container(
                    child: Image(
                      image: AssetImage("images/logo.png"),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 40),
              Container(
                child: Form(
                  key: _formKey,
                  child: Column(
                    children: <Widget>[
                      Container(
                        padding: EdgeInsets.only(right: 20, left: 20),
                        child: TextFormField(
                          validator: (input) {
                            if (input!.isEmpty) return 'Entre com o Email';
                          },
                          decoration: InputDecoration(
                            filled: true,
                            fillColor: Colors.white,
                            focusedBorder: OutlineInputBorder(
                              borderSide: BorderSide(color: Colors.white),
                              borderRadius: BorderRadius.circular(25.7),
                            ),
                            enabledBorder: UnderlineInputBorder(
                              borderSide: BorderSide(color: Colors.white),
                              borderRadius: BorderRadius.circular(25.7),
                            ),
                            labelText: 'Email',
                            prefixIcon: Icon(Icons.email),
                          ),
                          onSaved: (input) => _email = input!,
                        ),
                      ),
                      SizedBox(height: 20),
                      Container(
                        padding: EdgeInsets.only(left: 20, right: 20),
                        child: TextFormField(
                          validator: (input) {
                            if (input!.length < 6)
                              return 'Senha minima tem 6 caracteres';
                          },
                          decoration: InputDecoration(
                              filled: true,
                              fillColor: Colors.white,
                              focusedBorder: OutlineInputBorder(
                                borderSide: BorderSide(color: Colors.white),
                                borderRadius: BorderRadius.circular(25.7),
                              ),
                              enabledBorder: UnderlineInputBorder(
                                borderSide: BorderSide(color: Colors.white),
                                borderRadius: BorderRadius.circular(25.7),
                              ),
                              labelText: 'Senha',
                              prefixIcon: Icon(Icons.lock)),
                          obscureText: true,
                          onSaved: (input) => _password = input!,
                        ),
                      )
                    ],
                  ),
                ),
              ),
              SizedBox(height: 10),
              Row(
                mainAxisAlignment: MainAxisAlignment.end,
                children: <Widget>[
                  Container(
                    padding: EdgeInsets.only(right: 20),
                    child: TextButton(
                      onPressed: () {},
                      child: Text(
                        'Esqueceu a senha ?',
                        style: TextStyle(fontSize: 14, color: Colors.black),
                      ),
                    ),
                  ),
                ],
              ),
              SizedBox(height: 10),
              Container(
                child: ElevatedButton(
                  onPressed: () => login(),
                  child: Text(
                    'Entrar',
                    style: TextStyle(fontSize: 18, color: Colors.white),
                  ),
                  style: ElevatedButton.styleFrom(
                    padding: EdgeInsets.only(left: 110, right: 110),
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(20),
                    ),
                  ),
                ),
              ),
              SizedBox(height: 20),
              SignInButton(
                Buttons.Google,
                mini: false,
                text: "Entrar com conta Google",
                onPressed: googleSignIn,
                shape: RoundedRectangleBorder(
                  borderRadius: BorderRadius.circular(20),
                ),
                padding: EdgeInsets.only(left: 30, right: 30),
              ),
              SizedBox(height: 20),
              TextButton(
                  onPressed: navigateToSignUp,
                  child: Text(
                    'CRIAR CONTA',
                    style: TextStyle(fontSize: 14, color: Colors.blue),
                  )),
              SizedBox(height: 40),
            ],
          ),
        ),
      ),
    );
  }
}
