import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';
import '../../../models/user.dart';

class HomeGraph extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container();
  }
}

/*class HomeGraph extends StatelessWidget {
  final User userLogin;

  HomeGraph(this.userLogin);

  @override
  Widget build(BuildContext context) {
    double _firstMarkerValue =
        DateTime.now().difference(userLogin.cicleDate).inDays.toDouble();
    double secondMarkerValue =
        DateTime.now().difference(userLogin.cicleDate).inDays.toDouble();
    double minimum = 0;
    double maximum = userLogin.cicleSize.toDouble();
    DateTime markday = DateTime.now();

    double _borderWidth = 5;
    double _markerSize = 30;
    print(userLogin.cicleDate.day.toDouble());
    print(userLogin.cicleDate.add(Duration(days: userLogin.cicleSize)));
    return Container(
        child: SfRadialGauge(
      axes: <RadialAxis>[
        RadialAxis(
            minimum: minimum,
            maximum: maximum,
            interval: 1,
            startAngle: 270,
            endAngle: 260,
            showLabels: false,
            showAxisLine: false,
            radiusFactor: 0.8,
            canScaleToFit: true,
            annotations: <GaugeAnnotation>[
              GaugeAnnotation(
                  angle: 175,
                  positionFactor: 0,
                  widget: Container(
                      width: 150,
                      height: 150,
                      decoration: BoxDecoration(
                        color: Colors.blue[100],
                        borderRadius: BorderRadius.all(Radius.circular(150)),
                      ),
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.spaceAround,
                        children: [
                          Text('${markday.day}',
                              style: TextStyle(
                                  fontSize: 24, fontWeight: FontWeight.bold)),
                          Text('de ${markday.month}',
                              style: TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.bold))
                        ],
                      ))),
            ],
            pointers: <MarkerPointer>[
              MarkerPointer(
                value: _firstMarkerValue,
                enableDragging: false,
                borderColor: const Color(0xFFFFCD60),
                borderWidth: _borderWidth,
                color: Colors.white,
                markerHeight: _markerSize,
                markerWidth: _markerSize,
                markerType: MarkerType.circle,
              ),
              MarkerPointer(
                value: secondMarkerValue,
                color: Colors.orange,
                onValueChangeEnd: (value) => secondMarkerValue = value,
                onValueChanged: (value) => secondMarkerValue = value,
                enableDragging: true,
                markerHeight: _markerSize,
                borderWidth: _borderWidth,
                markerWidth: _markerSize,
                markerType: MarkerType.circle,
              ),
            ],
            ranges: <GaugeRange>[
              GaugeRange(
                  startValue: 0,
                  endValue: userLogin.periodSize != null
                      ? userLogin.periodSize.toDouble()
                      : 4,
                  color: Colors.red[100],
                  startWidth: 30,
                  endWidth: 30),
              GaugeRange(
                  startValue: userLogin.periodSize != null
                      ? userLogin.periodSize.toDouble()
                      : 4,
                  endValue: maximum - 17,
                  color: Colors.grey[200],
                  startWidth: 30,
                  endWidth: 30),
              GaugeRange(
                  startValue: maximum - 17,
                  endValue: maximum - 11,
                  color: Colors.green[100],
                  startWidth: 30,
                  endWidth: 30),
              GaugeRange(
                  startValue: maximum - 11,
                  endValue: maximum - 3,
                  color: Colors.grey[200],
                  startWidth: 30,
                  endWidth: 30),
              GaugeRange(
                  startValue: maximum - 3,
                  endValue: maximum,
                  color: Colors.yellow[100],
                  startWidth: 30,
                  endWidth: 30),
            ]),
      ],
    ));
  }
}*/
