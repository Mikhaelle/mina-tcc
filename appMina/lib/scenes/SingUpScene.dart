import 'package:appMina/models/auth.dart';
import 'package:appMina/scenes/HomeScene.dart';
import 'package:flutter/material.dart';
import 'package:provider/provider.dart';

class SingUpScene extends StatefulWidget {
  const SingUpScene({Key? key}) : super(key: key);

  @override
  _SingUpSceneState createState() => _SingUpSceneState();
}

class _SingUpSceneState extends State<SingUpScene> {
  TextEditingController _fullNameControler = TextEditingController();
  TextEditingController _emailControler = TextEditingController();
  TextEditingController _passwordControler = TextEditingController();
  //TextEditingController _confirmPasswordControler = TextEditingController(); Add later

  final GlobalKey<FormState> _formKey = GlobalKey<FormState>();

  void _signUp(
      String email, String password, String name, BuildContext context) async {
    Auth _auth = Provider.of<Auth>(context, listen: false);
    if (_formKey.currentState!.validate()) {
      _formKey.currentState!.save();

      try {
        String _returnString = await _auth.signUp(email, password, name);
        if (_returnString == "success") {
          Navigator.push(
              context, MaterialPageRoute(builder: (context) => HomeScene()));
        } else {
          ScaffoldMessenger.of(context).showSnackBar(SnackBar(
            content: Text(_returnString),
            duration: Duration(seconds: 2),
          ));
        }
      } catch (e) {
        print(e);
      }
    }
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
                            controller: _fullNameControler,
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
                          ),
                        ),
                        SizedBox(height: 20),
                        Container(
                          padding: EdgeInsets.only(right: 20, left: 20),
                          child: TextFormField(
                            controller: _emailControler,
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
                          ),
                        ),
                        SizedBox(height: 20),
                        Container(
                          padding: EdgeInsets.only(right: 20, left: 20),
                          child: TextFormField(
                            controller: _passwordControler,
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
                          ),
                        ),
                        SizedBox(height: 30),
                        ElevatedButton(
                          onPressed: () => _signUp(
                              _emailControler.text,
                              _passwordControler.text,
                              _fullNameControler.text,
                              context),
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
