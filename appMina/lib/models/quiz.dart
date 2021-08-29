class Quiz {
  String? uid;
  bool? isAnswered;
  DateTime? answeredData;
  DateTime? lastMenses;
  int? mensesDuration;
  bool? isRegularCicle;
  int? cicloTime;
  bool? isHormonalMethod;

  Quiz({
    this.uid,
    this.isAnswered,
    this.answeredData,
    this.lastMenses,
    this.mensesDuration,
    this.isRegularCicle,
    this.cicloTime,
    this.isHormonalMethod,
  });
}
