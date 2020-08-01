import 'package:flutter/material.dart';

main(){
  runApp(new PerguntaApp());
}

class PerguntaApp extends StatelessWidget{
  Widget build(BuildContext context){
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Mina'),
        ),
        body: Text('Começando app'),
      ),
      
    );
  }
}
