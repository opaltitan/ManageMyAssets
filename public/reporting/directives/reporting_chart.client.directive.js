/**
 * Created by Justin on 11/29/2015.
 */
angular.module('reporting').directive('myScatterChart', ['d3',
    function(d3){
        function draw(svg, width, height, data){

            // Define margin
            var margin = {top: 50, right: 20, bottom: 30, left: 40};
            var aWidth = width - margin.left - margin.right;
            var aHeight = height - margin.top - margin.bottom;
            var bHeight = height - margin.top;

            // Initial height and width drawing of the svg element
            svg
                .attr('width', width)
                .attr('height', height)
                .append('g')
                .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

            console.log(data);

            // Define x-scale
            var x = d3.scale.ordinal()
                .rangeRoundBands([0,aWidth],.1);
            //var x = d3.scale.ordinal()
            //    .rangePoints([0,aWidth],.1);

            // Define y-scale
            var y = d3.scale.linear()
                .rangeRound([aHeight,0]);

            // Define x-axis
            var xAxis = d3.svg.axis()
                .scale(x)
                .orient('bottom')
                .tickFormat(d3.time.format('%Y-%m-%d'));

            // Define y-axis
            var yAxis = d3.svg.axis()
                .scale(y)
                .orient('left')
                .tickFormat(d3.format('.2s'));

            // Define x and y domains
            x.domain(data.map(function(d){ return d.x; }));
            y.domain([0, d3.max(data, function(d){ return d.max_y; })]);

            // Draw x-axis
            svg.select('.x-axis')
                .attr('transform', 'translate(' + margin.left  + ', ' + bHeight + ')')
                .call(xAxis);

            // Draw y-axis
            svg.select('.y-axis')
                .attr('transform', 'translate(' + margin.left + ',' + margin.bottom + ')')
                //.attr('transform', 'translate(0)')
                .call(yAxis);

            // Add the new data points
            var chart_data = svg.selectAll('.data')
                .data(data)
                .enter()
                .append('g')
                .attr('class', 'g')
                .attr('transform', function(d) { return 'translate(' + x(d.x) + ',' + margin.top + ')'; })
                ;

            // Updated all data points
            chart_data.selectAll('rect')
                .data(function(d){ return d.y; })
                .enter()
                .append('rect')
                .attr('width', x.rangeBand() / 2)
                .attr('transform', 'translate(' + margin.left + ',-' + (margin.top) + ')')
                //.attr('x', function(d){ return x(d.x); })
                //.attr('y', aHeight)
                //.attr('height', function(d) { return y(d.amount); })
                .attr('y', function(d){ return y(d.amount) + margin.bottom; })
                .attr('height', function(d){ return aHeight - y(d.amount); });

            svg.selectAll('rect')
                .data(data)
                .exit()
                .remove()
                //.style('fill', function(d) { return '#98abc5'; })
            ;


        }

        return {
            restrict: 'E',
            scope: {
                data: '='
            },
            compile: function(element, attrs, transclude){
                // Create a SVG root element
                var svg = d3.select(element[0]).append('svg');
                svg.append('g').attr('class', 'data');
                svg.append('g').attr('class', 'x-axis axis');
                svg.append('g').attr('class', 'y-axis axis');

                // Return the link function
                return function(scope, element, attrs){
                    // Define the dimensions for the chart
                    var width = 800, height = 400;
                    // Grab the svg area from above
                    // This step wasn't in the book, but is necessary.
                    // Otherwise, the svg element doesn't get passed to draw() successfully.
                    var svg = d3.select('svg');

                    // Watch the data attribute of the scope
                    scope.$watch('data', function(newVal, oldVal, scope){
                        // Map the data to the internal format
                        var data = scope.data.map(function(d){
                            // Need to grab effective date for each Actual
                            var qDate = new Date(d.activityDetails.financial.effectiveDate);

                            var yItems = new Array();
                            var max = 0;
                            d.activityDetails.financial.statements.forEach(function(statement){
                                    statement.statementLineItems.forEach(function(lineItem){
                                        yItems.push({
                                            asset: d.asset.assetDetails.property.propertyName,
                                            coa: lineItem.lineItemCode,
                                            amount: lineItem.lineItemAmount
                                        });
                                        if(lineItem.lineItemAmount > max){
                                            max = lineItem.lineItemAmount;
                                        }
                                    });
                                });
                            return {
                                // Need to format the date properly for D3 to handle it
                                x: new Date(qDate.getFullYear(), qDate.getMonth(), qDate.getDate()),
                                max_y: max,
                                //items: yItems
                                // Need to figure out how to get D3 to project Line Item Amounts onto y axis
                                //y: d.activityDetails.financial.statements.statementLineItems.lineItemAmount
                                //y: 25
                                y: yItems
                            }
                        });
                        // Update the chart
                        draw(svg, width, height, data);
                    }, true);
                };
            }
        };

    }
]);