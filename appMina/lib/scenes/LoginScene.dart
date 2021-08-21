import 'dart:async';
import 'package:appMina/models/auth.dart';
import 'package:appMina/scenes/home/HomeScene.dart';
import 'package:appMina/scenes/SingUpScene.dart';
import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
import 'package:flutter_signin_button/flutter_signin_button.dart';
import 'package:provider/provider.dart';

class LoginScene extends StatefulWidget {
  //const LoginScene({ Key? key }) : super(key: key);

  @override
  _LoginSceneState createState() => _LoginSceneState();
}

class _LoginSceneState extends State<LoginScene> {
  TextEditingController _emailControler = TextEditingController();
  TextEditingController _passwordControler = TextEditingController();

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  void _login(String email, String password, BuildContext context) async {
    Auth _auth = Provider.of<Auth>(context, listen: false);

    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();

      try {
        String _returnString = await _auth.login(email, password);
        if (_returnString == "success") {
          // checar se ja respondeu questionário, se sim ir pra home

          Navigator.push(
              context, MaterialPageRoute(builder: (context) => HomeScene()));
        } else {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
            content: Text(_returnString),
            duration: Duration(seconds: 2),
          ));
        }
      } on FirebaseAuthException catch (e) {
        //showError(e.code);
      }
    }
  }

  void _googleSignIn(BuildContext context) async {
    Auth _auth = Provider.of<Auth>(context, listen: false);

    try {
      if (await _auth.googleSignIn(context)) {
        // checar se ja respondeu questionário, se sim ir pra home

        Navigator.push(
            context, MaterialPageRoute(builder: (context) => HomeScene()));
      }
    } on FirebaseAuthException catch (e) {
      //showError(e.code);
    }
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
                          controller: _emailControler,
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
                        ),
                      ),
                      SizedBox(height: 20),
                      Container(
                        padding: EdgeInsets.only(left: 20, right: 20),
                        child: TextFormField(
                          controller: _passwordControler,
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
                  onPressed: () => _login(
                      _emailControler.text, _passwordControler.text, context),
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
                onPressed: () => _googleSignIn(context),
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
