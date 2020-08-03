import 'package:flutter/material.dart';
import './questao.dart';
import './resposta.dart';

class Questionario extends StatelessWidget {
  final int faseSelecionada;
  final List<Map<String, Object>> fasesDoCiclo;
  final void Function(int) funcaoTipo1;

  Questionario({
    @required this.faseSelecionada,
    @required this.fasesDoCiclo,
    @required this.funcaoTipo1,
  });

  bool get temFaseSelecionada {
    return faseSelecionada < fasesDoCiclo.length;
  }

  @override
  Widget build(BuildContext context) {
    List<Map<String, Object>> respostas =
        temFaseSelecionada ? fasesDoCiclo[faseSelecionada]['respostas'] : null;
    return Column(
      children: <Widget>[
        Questao(fasesDoCiclo[faseSelecionada]['texto']),
        ...respostas.map((resp) {
          return Resposta(resp['texto'], () => funcaoTipo1(resp['nota']));
        }).toList(),
      ],
    );
  }
}
