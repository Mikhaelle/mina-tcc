import 'package:flutter/material.dart';

main() {
  runApp(new PerguntaApp());
}

class _PerguntaAppState extends State<PerguntaApp> {
  var _faseSelecionada = 0;

  void _funcaoTipo1() {
    setState(() {
      _faseSelecionada++;
    });
    print(_faseSelecionada);
  }

  @override
  Widget build(BuildContext context) {
    final fasesDoCiclo = [
      'Folícular inicial',
      'Folicular final',
      'Lutea inicial',
      'Lutea final',
    ];

    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Mina'),
        ),
        body: Column(
          children: <Widget>[
            Text(fasesDoCiclo[_faseSelecionada]),
            RaisedButton(
              child: Text('Dicas do dia'),
              onPressed: _funcaoTipo1,
            ),
            RaisedButton(
              child: Text('Previsão do dia'),
              onPressed: () => print('botao 2 clicado'),
            ),
            RaisedButton(
              child: Text('Previsão semanal'),
              onPressed: () {
                print('botao 3 clicado');
              },
            )
          ],
        ),
      ),
    );
  }
}

class PerguntaApp extends StatefulWidget {
  _PerguntaAppState createState() {
    return _PerguntaAppState();
  }
}
