import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

import {
  revenueData,
  orderChartData,
  orderStatusData,
} from "../data/chartData";

function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function DashboardCharts() {
  return (
    <section className="charts-section">

      {/* =========================
          REVENUE CHART
      ========================= */}

      <div className="chart-card revenue-chart">

        <div className="chart-header">

          <div>
            <span className="card-label">
              REVENUE
            </span>

            <h2>
              Pendapatan
            </h2>
          </div>

          <span className="chart-period">
            7 Hari
          </span>

        </div>

        <div className="chart-container">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <LineChart
              data={revenueData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#edf0f6"
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{
                  fill: "#8b93a5",
                  fontSize: 11,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tickFormatter={(value) =>
                  `${Math.round(value / 1000)}K`
                }
                tick={{
                  fill: "#8b93a5",
                  fontSize: 11,
                }}
              />

              <Tooltip
                cursor={{
                  stroke: "#dce3f3",
                  strokeDasharray: "4 4",
                }}
                contentStyle={{
                  border: "1px solid #e5e9f2",
                  borderRadius: "12px",
                  background: "#ffffff",
                  boxShadow:
                    "0 12px 30px rgba(30, 41, 59, 0.12)",
                  padding: "10px 13px",
                }}
                labelStyle={{
                  color: "#172033",
                  fontWeight: 700,
                  marginBottom: 5,
                }}
                itemStyle={{
                  color: "#4263eb",
                  fontSize: 12,
                  fontWeight: 600,
                }}
                formatter={(value) => [
                  formatCurrency(value),
                  "Pendapatan",
                ]}
              />

              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#4263eb"
                strokeWidth={3}
                dot={{
                  r: 3,
                  fill: "#ffffff",
                  stroke: "#4263eb",
                  strokeWidth: 2,
                }}
                activeDot={{
                  r: 6,
                  fill: "#ffffff",
                  stroke: "#4263eb",
                  strokeWidth: 3,
                }}
              />

            </LineChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* =========================
          ORDERS CHART
      ========================= */}

      <div className="chart-card orders-chart">

        <div className="chart-header">

          <div>
            <span className="card-label">
              ORDERS
            </span>

            <h2>
              Pesanan
            </h2>
          </div>

          <span className="chart-period">
            7 Hari
          </span>

        </div>

        <div className="chart-container">

          <ResponsiveContainer
            width="100%"
            height="100%"
          >

            <BarChart
              data={orderChartData}
              margin={{
                top: 10,
                right: 10,
                left: 0,
                bottom: 0,
              }}
            >

              <CartesianGrid
                strokeDasharray="3 3"
                vertical={false}
                stroke="#edf0f6"
              />

              <XAxis
                dataKey="day"
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{
                  fill: "#8b93a5",
                  fontSize: 11,
                }}
              />

              <YAxis
                axisLine={false}
                tickLine={false}
                tickMargin={10}
                tick={{
                  fill: "#8b93a5",
                  fontSize: 11,
                }}
              />

              <Tooltip
                cursor={{
                  fill: "rgba(66, 99, 235, 0.04)",
                }}
                contentStyle={{
                  border: "1px solid #e5e9f2",
                  borderRadius: "12px",
                  background: "#ffffff",
                  boxShadow:
                    "0 12px 30px rgba(30, 41, 59, 0.12)",
                  padding: "10px 13px",
                }}
                labelStyle={{
                  color: "#172033",
                  fontWeight: 700,
                  marginBottom: 5,
                }}
                itemStyle={{
                  color: "#4263eb",
                  fontSize: 12,
                  fontWeight: 600,
                }}
              />

              <Bar
                dataKey="orders"
                fill="#4263eb"
                radius={[
                  8,
                  8,
                  3,
                  3,
                ]}
                maxBarSize={34}
              />

            </BarChart>

          </ResponsiveContainer>

        </div>

      </div>


      {/* =========================
          ORDER STATUS
      ========================= */}

      <div className="chart-card status-chart">

        <div className="chart-header">

          <div>
            <span className="card-label">
              ORDER STATUS
            </span>

            <h2>
              Status Pesanan
            </h2>
          </div>

        </div>

        <div className="status-chart-content">

          {/* =========================
              DONUT
          ========================= */}

          <div className="donut-container">

            <ResponsiveContainer
              width="100%"
              height="100%"
            >

              <PieChart>

                <Pie
                  data={orderStatusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={58}
                  outerRadius={84}
                  paddingAngle={4}
                  stroke="none"
                >

                  <Cell fill="#4263eb" />
                  <Cell fill="#63a0ff" />
                  <Cell fill="#f3b33d" />
                  <Cell fill="#aeb7c7" />

                </Pie>

                <Tooltip
                  contentStyle={{
                    border: "1px solid #e5e9f2",
                    borderRadius: "12px",
                    background: "#ffffff",
                    boxShadow:
                      "0 12px 30px rgba(30, 41, 59, 0.12)",
                    padding: "10px 13px",
                  }}
                  labelStyle={{
                    color: "#172033",
                    fontWeight: 700,
                  }}
                  itemStyle={{
                    color: "#4263eb",
                    fontSize: 12,
                    fontWeight: 600,
                  }}
                  formatter={(value) => [
                    `${value}%`,
                    "Persentase",
                  ]}
                />

              </PieChart>

            </ResponsiveContainer>

          </div>


          {/* =========================
              STATUS LEGEND
          ========================= */}

          <div className="status-legend">

            {orderStatusData.map(
              (status, index) => (

                <div
                  className="legend-item"
                  key={status.name}
                >

                  <div className="legend-name">

                    <span
                      className={`legend-dot legend-dot-${index}`}
                    />

                    <span>
                      {status.name}
                    </span>

                  </div>

                  <strong>
                    {status.value}%
                  </strong>

                </div>

              )
            )}

          </div>

        </div>

      </div>

    </section>
  );
}

export default DashboardCharts;