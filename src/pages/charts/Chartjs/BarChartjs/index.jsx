import Chart from 'chart.js/auto'
import { useEffect } from 'react'
import { borderRadiusConfig, floatingConfig, horizontalConfig, stackedConfig, groupStackConfig, verticalConfig } from './data'

// components
import { PageBreadcrumb } from '../../../../components'

const BarChartjs = () => {
	useEffect(() => {
		const borderRadiusTag = document.getElementById('border-radius-example') 
		const borderRadiusChart = new Chart(borderRadiusTag, borderRadiusConfig)

		const floatingTag = document.getElementById('floating-example') 
		const floatingChart = new Chart(floatingTag, floatingConfig)

		const horizontalTag = document.getElementById('horizontal-example') 
		const horizontalChart = new Chart(horizontalTag, horizontalConfig)

		const stackedTag = document.getElementById('stacked-example') 
		const stackedChart = new Chart(stackedTag, stackedConfig)

		const groupStackTag = document.getElementById('group-stack-example') 
		const groupStackChart = new Chart(groupStackTag, groupStackConfig)

		const verticalTag = document.getElementById('vertical-example') 
		const verticalChart = new Chart(verticalTag, verticalConfig)

		return () => {
			borderRadiusChart.destroy()
			floatingChart.destroy()
			horizontalChart.destroy()
			stackedChart.destroy()
			groupStackChart.destroy()
			verticalChart.destroy()
		}
	})

	return (
		<>
			<PageBreadcrumb title="Chartjs" subName="Charts" />
			<div className="grid md:grid-cols-2 gap-6">
				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Border Radius</h4>
						<div className="mt-3" style={{ height: 320 }}>
							<canvas id="border-radius-example" data-colors="#3e60d5,#47ad77"></canvas>
						</div>
					</div>
				</div>

				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Floating</h4>
						<div className="mt-3" style={{ height: 320 }}>
							<canvas id="floating-example" data-colors="#3e60d5,#47ad77"></canvas>
						</div>
					</div>
				</div>

				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Horizontal</h4>
						<div className="mt-3" style={{ height: 320 }}>
							<canvas id="horizontal-example" data-colors="#3e60d5,#47ad77"></canvas>
						</div>
					</div>
				</div>

				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Stacked</h4>
						<div className="mt-3" style={{ height: 320 }}>
							<canvas id="stacked-example" data-colors="#3e60d5,#47ad77"></canvas>
						</div>
					</div>
				</div>

				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Stacked with Groups</h4>
						<div className="mt-3" style={{ height: 320 }}>
							<canvas id="group-stack-example" data-colors="#3e60d5,#47ad77"></canvas>
						</div>
					</div>
				</div>

				<div className="card">
					<div className="p-6">
						<h4 className="card-title mb-4">Vertical</h4>
						<div className="mt-3" style={{ height: 320 }}>
							<canvas id="vertical-example" data-colors="#3e60d5,#47ad77"></canvas>
						</div>
					</div>
				</div>
			</div>
		</>
	)
}

export default BarChartjs
