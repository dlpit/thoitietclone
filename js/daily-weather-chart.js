/**
 * Daily Weather Chart Component
 * Multi-day temperature and rainfall chart using Chart.js
 */

// Function to initialize daily chart
function initDailyWeatherChart() {
    console.log('Initializing daily weather chart...');
    
    const ctx = document.getElementById('myChart');
    if (!ctx) {
        console.error('Canvas element with id "myChart" not found');
        return;
    }
    
    console.log('Canvas element found:', ctx);
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded. Retrying in 1 second...');
        setTimeout(initDailyWeatherChart, 1000);
        return;
    }

    console.log('Chart.js is loaded, creating daily chart...');

    // Sample data for daily forecast (7 days)
    const chartData = {
        labels: ['Hôm nay', 'CN 28/9', 'T2 29/9', 'T3 30/9', 'T4 1/10', 'T5 2/10', 'T6 3/10'],
        datasets: [
            {
                label: 'Nhiệt độ',
                type: 'line',
                data: [24.2, 25.8, 23.5, 26.2, 24.8, 25.1, 26.5],
                backgroundColor: 'rgba(59, 130, 246, 0.2)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(59, 130, 246, 1)',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 5,
                tension: 0.35,
                fill: false,
                spanGaps: true,
                yAxisID: 'y',
            },
            {
                label: 'Khả năng có mưa',
                type: 'line',
                data: [85, 70, 90, 60, 75, 80, 65],
                backgroundColor: 'rgba(236, 72, 153, 0.2)',
                borderColor: 'rgba(236, 72, 153, 1)',
                borderWidth: 2,
                pointBackgroundColor: 'rgba(236, 72, 153, 1)',
                pointBorderColor: '#ffffff',
                pointBorderWidth: 2,
                pointRadius: 4,
                pointHoverRadius: 5,
                tension: 0.35,
                fill: false,
                spanGaps: true,
                yAxisID: 'y1',
            }
        ]
    };

    const config = {
        type: 'line',
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
                    max: 100,
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
                    display: true,
                    position: 'right',
                    min: 0,
                    max: 100,
                    grid: {
                        drawOnChartArea: false,
                    },
                    ticks: {
                        stepSize: 20,
                        callback: function(value) {
                            return value + '%';
                        },
                        font: {
                            size: 11,
                            family: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif"
                        },
                        color: '#374151'
                    }
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
            id: 'dailyDataLabels',
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

                            const dataString = dataset.data[index].toString();
                            const suffix = i === 0 ? '°' : '%';
                            
                            // Both datasets are lines now
                            ctx.textBaseline = 'bottom';
                            const yOffset = 10;

                            ctx.fillText(
                                dataString + suffix,
                                element.x,
                                element.y - yOffset
                            );
                        });
                    }
                });
            }
        }]
    };

    // Initialize the chart
    try {
        const dailyWeatherChart = new Chart(ctx, config);
        console.log('Daily chart created successfully:', dailyWeatherChart);
        
        // Make chart globally accessible for potential future updates
        window.dailyWeatherChart = dailyWeatherChart;
    } catch (error) {
        console.error('Error creating daily chart:', error);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initDailyWeatherChart);

// Also try to initialize when window loads (fallback)
window.addEventListener('load', function() {
    if (!window.dailyWeatherChart) {
        console.log('Fallback: trying to initialize daily chart on window load');
        initDailyWeatherChart();
    }
});