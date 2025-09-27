/**
 * Daily Rainfall Chart Component
 * Multi-day rainfall chart using Chart.js
 */

// Function to initialize rainfall chart
function initRainfallChart() {
    console.log('Initializing rainfall chart...');
    
    const ctx = document.getElementById('rain');
    if (!ctx) {
        console.error('Canvas element with id "rain" not found');
        return;
    }
    
    console.log('Canvas element found:', ctx);
    
    // Check if Chart.js is loaded
    if (typeof Chart === 'undefined') {
        console.error('Chart.js is not loaded. Retrying in 1 second...');
        setTimeout(initRainfallChart, 1000);
        return;
    }

    console.log('Chart.js is loaded, creating rainfall chart...');

    // Sample rainfall data for daily forecast (7 days)
    const chartData = {
        labels: ['Hôm nay', 'CN 28/9', 'T2 29/9', 'T3 30/9', 'T4 1/10', 'T5 2/10', 'T6 3/10'],
        datasets: [
            {
                label: 'Lượng mưa (mm)',
                type: 'bar',
                data: [6.4, 12.8, 8.2, 15.5, 3.1, 9.7, 4.3],
                backgroundColor: 'rgba(59, 130, 246, 0.8)',
                borderColor: 'rgba(59, 130, 246, 1)',
                borderWidth: 1,
                yAxisID: 'y',
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
                            label += context.parsed.y + ' mm';
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
                    max: 20,
                    grid: {
                        display: true,
                        color: 'rgba(0, 0, 0, 0.1)',
                        lineWidth: 1
                    },
                    ticks: {
                        stepSize: 5,
                        callback: function(value) {
                            return value + ' mm';
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
            id: 'rainDataLabels',
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
                            const suffix = 'mm';

                            ctx.textBaseline = 'bottom';
                            const yOffset = 5;

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
        const rainfallChart = new Chart(ctx, config);
        console.log('Rainfall chart created successfully:', rainfallChart);
        
        // Make chart globally accessible for potential future updates
        window.rainfallChart = rainfallChart;
    } catch (error) {
        console.error('Error creating rainfall chart:', error);
    }
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initRainfallChart);

// Also try to initialize when window loads (fallback)
window.addEventListener('load', function() {
    if (!window.rainfallChart) {
        console.log('Fallback: trying to initialize rainfall chart on window load');
        initRainfallChart();
    }
});