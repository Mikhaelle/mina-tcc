import React from 'react';
import {Image, ScrollView} from 'react-native';
import aboutImage from '../../assets/images/about.png';
import {
  PeriodPhases,
  usePeriod,
} from '../../contexts/PeriodContext/PeriodContext';
import {Container, TotalText, View} from './AboutScene.css';

export const AboutScene: React.FC = () => {
  const {phase} = usePeriod();

  const textPhase = () => {
    if (phase === PeriodPhases.folicularInicial) {
      return (
        <TotalText>
          A fase folicular é a primeira fase do ciclo menstrual, começa com o
          início da menstruação e termina com a ovulação. {'\n'}A menstruação
          marca o início do ciclo menstrual e o fim do ciclo anterior e é
          caracterizada pelo fluxo sanguíneo vaginal. Ocorre quando não há
          fecundação no ciclo anterior e é composta por sangue e tecido uterino
          derivado da descamação das paredes internas do útero(endométrio).
          Normalmente, dura cerca de 5 dias, mas pode variar.{'\n'}
          Enquanto ocorre a menstruação e os hormônios estimulantes dos ovários
          (principalmente FSH) estão em concentração baixa, a fase é referida
          como fase folicular inicial. Essa é a fase responsável pelo
          desenvolvimento de folículos, dos quais um será selecionado e se
          transformará em um óvulo (corpos lutem), que dará início à ovulação.{' '}
          {'\n'}
          Alguns estudos demonstraram que no domínio cognitivo as funções
          verbais, espaciais e de memória variam ao longo do ciclo menstrual.
          {'\n'}
          Na fase folícular inicial, uma melhora no desempenho em tarefas
          espaciais foi relatada. No aspecto emocional, alguns estudos
          relacionaram a fase com um aumento na habilidade de reconhecimento
          facial de emoções.{'\n'}
        </TotalText>
      );
    } else if (phase === PeriodPhases.folicularFinal) {
      return (
        <TotalText>
          A fase folicular é a primeira fase do ciclo menstrual, começa com o
          início da menstruação e termina com a ovulação. {'\n'}
          Assim que um desses folículos é selecionado na fase folicular inicial,
          o FSH diminui gradativamente, e progressivamente a produção de
          estrogênios começará a aumentar. Os estrogénios produzidos pelo
          folículo em crescimento são responsáveis também pelo desenvolvimento
          do endométrio. Essa fase é normalmente referida como fase folicular
          final. {'\n'}
          De acordo com alguns estudos, uma melhora nas habilidades verbais foi
          identificada no final da fase folicular quando há altos níveis de
          estradiol. No aspecto emocional, alguns estudos relacionaram a fase
          com um aumento na habilidade de reconhecimento facial de emoções.
        </TotalText>
      );
    } else if (
      phase === PeriodPhases.luteaInicial ||
      phase === PeriodPhases.luteaFinal
    ) {
      return (
        <TotalText>
          Com o evento da ovulação, o folículo transforma-se em um corpo lúteo,
          e as células das paredes do folículo começam a produção de
          progesterona para preparar o endométrio para a chegada do óvulo no
          caso de concepção. Caso não haja fecundação, a progesterona decai
          progressivamente e causa novamente a menstruação, continuando assim o
          ciclo. {'\n'}A fase lútea tem duração de 14 dias e costuma ser
          constante nas mulheres, sem grande variação, mesmo que o tamanho do
          ciclo varie. É comum no final da fase lútea o aparecimeno do
          transtorno disfórico pré-menstrual(TDPM), que também ifluência
          significativamente os aspectos emocionais e comportamentais durante as
          fases do ciclo menstrual.{'\n'}
          Alguns estudos demonstraram que no domínio cognitivo, as funções
          verbais, espaciais e de memória variam ao longo do ciclo menstrual.{' '}
          {'\n'}
          Na fase lútea, uma melhora no desempenho em tarefas verbais e
          memoriais foi relatada. No aspecto emocional, existe uma piora na
          precisão do reconhecimento de emoções faciais, principalmente para
          emoções negativas, e existe um aumento na memória emocional,
          principalmente a recordação de itens negativos ou detalhes
          periféricos. {'\n'}
          As mulheres tendem a responder mais rapidamente a situações tristes e
          estressantes ou expressões faciais tristes. Relatou-se que quando os
          níveis de progesterona estão altos, as mulheres demonstram uma maior
          tendência a perceber expressões de medo.{'\n'}
          Também há evidências que o cortisol, hormônio do estresse, parece se
          elevar na fase lútea.
        </TotalText>
      );
    }
  };
  return (
    <Container>
      <ScrollView showsVerticalScrollIndicator={true}>
        <View>{textPhase()}</View>
      </ScrollView>
      <Image source={aboutImage}></Image>
    </Container>
  );
};
