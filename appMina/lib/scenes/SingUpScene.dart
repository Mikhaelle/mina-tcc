import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

class SingUpScene extends StatefulWidget {
  const SingUpScene({Key? key}) : super(key: key);

  @override
  _SingUpSceneState createState() => _SingUpSceneState();
}

class _SingUpSceneState extends State<SingUpScene> {
  FirebaseAuth _auth = FirebaseAuth.instance;
  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  late String _name, _email, _password;

  checkAuthentication() async {
    _auth.authStateChanges().listen((user) async {
      if (user != null) {
        Navigator.pushReplacementNamed(context, "/");
      }
    });
  }

  @override
  void initState() {
    super.initState();
    this.checkAuthentication();
  }

  signUp() async {
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();

      try {
        UserCredential user = await _auth.createUserWithEmailAndPassword(
            email: _email, password: _password);

        await _auth.currentUser!.updateDisplayName(_name);
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
                  child: Text('OK'))
            ],
          );
        });
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
                                if (input!.isEmpty) return 'Nome';
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
                                labelText: 'Nome',
                                prefixIcon: Icon(Icons.person),
                              ),
                              onSaved: (input) => _name = input!),
                        ),
                        SizedBox(height: 20),
                        Container(
                          padding: EdgeInsets.only(right: 20, left: 20),
                          child: TextFormField(
                              validator: (input) {
                                if (input!.isEmpty) return 'Email';
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
                              onSaved: (input) => _email = input!),
                        ),
                        SizedBox(height: 20),
                        Container(
                          padding: EdgeInsets.only(right: 20, left: 20),
                          child: TextFormField(
                              validator: (input) {
                                if (input!.length < 6)
                                  return 'Provide Minimum 6 Character';
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
                                prefixIcon: Icon(Icons.lock),
                              ),
                              obscureText: true,
                              onSaved: (input) => _password = input!),
                        ),
                        SizedBox(height: 30),
                        ElevatedButton(
                          onPressed: () => signUp(),
                          child: Text(
                            'Criar conta',
                            style: TextStyle(fontSize: 18, color: Colors.white),
                          ),
                          style: ElevatedButton.styleFrom(
                            padding: EdgeInsets.only(left: 110, right: 110),
                            shape: RoundedRectangleBorder(
                              borderRadius: BorderRadius.circular(20),
                            ),
                          ),
                        ),
                      ],
                    ),
                  ),
                ),
              ],
            ),
          ),
        ));
  }
}
