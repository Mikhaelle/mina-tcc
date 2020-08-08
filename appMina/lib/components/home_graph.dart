import 'package:flutter/material.dart';
import 'package:syncfusion_flutter_gauges/gauges.dart';

class HomeGraph extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    double secondMarkerValue = 1;
    return Container(
        child: SfRadialGauge(
      axes: <RadialAxis>[
        RadialAxis(
            minimum: 1,
            maximum: 28,
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
                        children: [
                          Text('$secondMarkerValue',
                              style: TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.bold)),
                          Text('Max',
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
                  endValue: 4,
                  color: Colors.red[100],
                  startWidth: 30,
                  endWidth: 30),
              GaugeRange(
                  startValue: 4,
                  endValue: 11,
                  color: Colors.grey[200],
                  startWidth: 30,
                  endWidth: 30),
              GaugeRange(
                  startValue: 11,
                  endValue: 17,
                  color: Colors.green[100],
                  startWidth: 30,
                  endWidth: 30),
              GaugeRange(
                  startValue: 17,
                  endValue: 24,
                  color: Colors.grey[200],
                  startWidth: 30,
                  endWidth: 30),
              GaugeRange(
                  startValue: 24,
                  endValue: 28,
                  color: Colors.yellow[100],
                  startWidth: 30,
                  endWidth: 30),
            ]),
      ],
    ));
  }
}

double _borderWidth = 5;
double _firstMarkerValue = 1;
double _markerSize = 30;
