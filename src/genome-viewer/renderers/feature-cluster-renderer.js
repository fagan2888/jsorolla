/*
 * Copyright (c) 2012 Francisco Salavert (ICM-CIPF)
 * Copyright (c) 2012 Ruben Sanchez (ICM-CIPF)
 * Copyright (c) 2012 Ignacio Medina (ICM-CIPF)
 *
 * This file is part of JS Common Libs.
 *
 * JS Common Libs is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * (at your option) any later version.
 *
 * JS Common Libs is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with JS Common Libs. If not, see <http://www.gnu.org/licenses/>.
 */

FeatureClusterRenderer.prototype = new Renderer({});

function FeatureClusterRenderer(args) {
    Renderer.call(this, args);
    // Using Underscore 'extend' function to extend and add Backbone Events
    _.extend(this, Backbone.Events);

    //set default args
    this.histogramHeight = 75;
    this.multiplier = 7;

    //set instantiation args
    _.extend(this, args);

};


FeatureClusterRenderer.prototype.render = function (features, args) {
    var middle = args.width / 2;
    var points = '';
    if (features.length > 0) {//Force first point at this.histogramHeight
        var firstFeature = features[0].value;
        var width = (firstFeature.end - firstFeature.start) * args.pixelBase;
        var x = this.getFeatureX(firstFeature, args);
        points = (x + (width / 2)) + ',' + this.histogramHeight + ' ';
    }

    var maxValue = 0;

    for (var i = 0, len = features.length; i < len; i++) {

        var feature = features[i].value;
        feature.start = parseInt(feature.start);
        feature.end = parseInt(feature.end);
        var width = (feature.end - feature.start);
        //get type settings object

        width = width * args.pixelBase;
//        points += [
//
//        ].join(' ');
        var x = this.getFeatureX(feature, args);
//        var x = _this.getFeatureX(feature, args);
//        var x = _this.getFeatureX(feature, args);
//        var x = _this.getFeatureX(feature, args);

        if (feature.features_count == null) {
//            var height = Math.log(features[i].absolute);
            if (feature.absolute != 0) {
                feature.features_count = Math.log(features[i].absolute);
            } else {
                feature.features_count = 0;
            }
        }

        var height = feature.features_count * this.multiplier;

        points += (x) + "," + (this.histogramHeight) + " ";
        points += (x) + "," + (this.histogramHeight - height) + " ";
        points += (x + width) + "," + (this.histogramHeight - height) + " ";
        points += (x + width) + "," + (this.histogramHeight) + " ";

    }
    if (features.length > 0) {//force last point at this.histogramHeight
        var lastFeature = features[features.length - 1].value;
        var width = (lastFeature.end - lastFeature.start) * args.pixelBase;
        var x = this.getFeatureX(lastFeature, args);
        points += (x + (width / 2)) + ',' + this.histogramHeight + ' ';

    }

    var pol = SVG.addChild(args.svgCanvasFeatures, "polyline", {
        "points": points,
        "stroke": "#000000",
        "stroke-width": 0.2,
        "fill": '#9493b1',
        "cursor": "pointer"
    });
};
