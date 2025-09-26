/**
 * Weather Chart Component
 * 12-hour temperature and rainfall chart using Chart.js
 */

// Function to initialize chart
function initWeatherChart() {
    console.log('Initializing weather chart...');
    
    const ctx = document.getElementById('rainHour');
    if (!ctx) {
        console.error('Canvas element with id "rainHour" not found');
        return;
    }
    
    console.log('Canvas element found:', ctx);
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded. Retrying in 1 second...');
        setTimeout(initWeatherChart, 1000);
        return;
    }

    console.log('Chart.js is loaded, creating chart...');

    // Sample data matching the image
    const chartData = {
        labels: ['17:00', '18:00', '19:00', '20:00', '21:00', '22:00', '23:00', '00:00', '01:00', '02:00', '03:00', '04:00'],
        datasets: [
            {
                label: 'Nhiệt độ',
                type: 'bar',
                data: [24.3, 24.9, 23.5, 23.5, 23.2, 23.3, 23.7, 23.6, 23.8, 23, 23.3, 23.8],
                backgroundColor: 'rgba(59, 130, 246, 0.7)', // Blue bars
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
                yAxisID: 'y',
                barThickness: 40,
            },
            {
                label: 'Khả năng có mưa',
                type: 'bar',
                data: [100, 80, 80, 100, 87, 89, 76, 89, 100, 100, 100, 100],
                backgroundColor: 'rgba(236, 72, 153, 0.7)', // Pink bars  
                borderColor: 'rgba(236, 72, 153, 1)',
                borderWidth: 1,
                yAxisID: 'y1',
                barThickness: 40,
            }
        ]
    };

    const config = {
        type: 'bar',
        data: chartData,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                title: {
                    display: false
                },
                legend: {
                    display: true,
                    position: 'top',
                    align: 'start',
                    labels: {
                        usePointStyle: true,
                        pointStyle: 'rect',
                        font: {
                            size: 12,
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                        }
                    }
                },
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            let label = context.dataset.label || '';
                            if (label) {
                                label += ': ';
                            }
                            if (context.datasetIndex === 0) {
                                label += context.parsed.y + '°C';
                            } else {
                                label += context.parsed.y + '%';
                            }
                            return label;
                        }
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)',
                        lineWidth: 1
                    },
                    ticks: {
                        font: {
                            size: 11,
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                        },
                        color: '#374151'
                    }
                },
                y: {
                    type: 'linear',
                    display: true,
                    position: 'left',
                    min: 0,
                    max: 120,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)',
                        lineWidth: 1
                    },
                    ticks: {
                        stepSize: 20,
                        callback: function(value) {
                            return value;
                        },
                        font: {
                            size: 11,
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                        },
                        color: '#374151'
                    }
                },
                y1: {
                    type: 'linear',
                    display: false,
                    position: 'right',
                    min: 0,
                    max: 120,
                    grid: {
                        drawOnChartArea: false,
                    },
                }
            },
            interaction: {
                intersect: false,
                mode: 'index'
            },
            layout: {
                padding: {
                    top: 30,
                    right: 10,
                    bottom: 10,
                    left: 10
                }
            }
        },
        plugins: [{
            id: 'dataLabels',
            afterDatasetsDraw: function(chart) {
                const ctx = chart.ctx;
                chart.data.datasets.forEach((dataset, i) => {
                    const meta = chart.getDatasetMeta(i);
                    if (!meta.hidden) {
                        meta.data.forEach((element, index) => {
                            // Draw the text in black
                            ctx.fillStyle = '#1f2937';
                            ctx.font = 'bold 11px "Segoe UI", Tahoma, Geneva, Verdana, sans-serif';
                            ctx.textAlign = 'center';
                            ctx.textBaseline = 'bottom';

                            const dataString = dataset.data[index].toString();
                            const suffix = i === 0 ? '°' : '%';
                            
                            // Position text above the bar
                            ctx.fillText(
                                dataString + suffix,
                                element.x,
                                element.y - 5
                            );
                        });
                    }
                });
            }
        }]
    };

    // Initialize the chart
    try {
        const rainHourChart = new Chart(ctx, config);
        console.log('Chart created successfully:', rainHourChart);
        
        // Make chart globally accessible for potential future updates
        window.weatherChart = rainHourChart;
    } catch (error) {
        console.error('Error creating chart:', error);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initWeatherChart);

// Also try to initialize when window loads (fallback)
window.addEventListener('load', function() {
    if (!window.weatherChart) {
        console.log('Fallback: trying to initialize chart on window load');
        initWeatherChart();
    }
});