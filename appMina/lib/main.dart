import 'package:flutter/material.dart';
import './questionario.dart';
import './resultado.dart';

main() {
  runApp(new PerguntaApp());
}

class _PerguntaAppState extends State<PerguntaApp> {
  var _faseSelecionada = 0;
  var _pontuacaoTotal = 0;
  final _fasesDoCiclo = const [
    {
      'texto': 'Folícular inicial',
      'respostas': [
        {'texto': 'fase1', 'nota': 10},
        {'texto': 'fase1', 'nota': 5},
        {'texto': 'fase1', 'nota': 3},
        {'texto': 'fase1', 'nota': 2},
      ],
    },
    {
      'texto': 'Folicular final',
      'respostas': [
        {'texto': 'fase2', 'nota': 10},
        {'texto': 'fase2', 'nota': 5},
        {'texto': 'fase2', 'nota': 3},
        {'texto': 'fase2', 'nota': 2},
      ],
    },
    {
      'texto': 'Lutea inicial',
      'respostas': [
        {'texto': 'fase3', 'nota': 10},
        {'texto': 'fase3', 'nota': 5},
        {'texto': 'fase3', 'nota': 3},
        {'texto': 'fase3', 'nota': 2},
      ],
    },
    {
      'texto': 'Lutea final',
      'respostas': [
        {'texto': 'fase4', 'nota': 10},
        {'texto': 'fase4', 'nota': 5},
        {'texto': 'fase4', 'nota': 3},
        {'texto': 'fase4', 'nota': 2},
      ],
    }
  ];


  void _funcaoTipo1(int pontuacao) {
    setState(() {
      _faseSelecionada++;
      _pontuacaoTotal += pontuacao;
    });
    print(_faseSelecionada);
  }


  void _reiniciarQuestionario(){
    setState(() {
      _faseSelecionada = 0;
      _pontuacaoTotal = 0;
    });
  }
  bool get temFaseSelecionada {
    return _faseSelecionada < _fasesDoCiclo.length;
  }

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(
          title: Text('Mina'),
        ),
        body: temFaseSelecionada
            ? Questionario(
                faseSelecionada: _faseSelecionada,
                fasesDoCiclo: _fasesDoCiclo,
                funcaoTipo1: _funcaoTipo1)
            : Resultado(_pontuacaoTotal, _reiniciarQuestionario),
      ),
    );
  }
}

class PerguntaApp extends StatefulWidget {
  _PerguntaAppState createState() {
    return _PerguntaAppState();
  }
}
