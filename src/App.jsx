import { useState } from "react";
import { motion } from "motion/react";

import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Settings,
  TrendingUp,
  Clock3,
  CheckCircle2,
  Wallet,
} from "lucide-react";

import "./App.css";
import { orders } from "./data/orders";
import DashboardCharts from "./components/DashboardCharts";
import OrdersPage from "./components/OrdersPage";
import ProductsPage from "./components/ProductsPage";
import SettingsPage from "./components/SettingsPage";

function formatCurrency(value) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

function App() {
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const [profile, setProfile] = useState({
    name: "Wowo",
    email: "adminwowo@orderflow.com",
    role: "Administrator",
  });

  const totalRevenue = orders.reduce(
    (sum, order) => sum + order.total,
    0
  );

  const displayedOrders = showAllOrders
    ? orders
    : orders.slice(0, 5);

  const stats = [
    {
      label: "Total Pesanan",
      value: "1,248",
      change: "+12.5%",
      icon: ShoppingCart,
    },
    {
      label: "Sedang Diproses",
      value: "86",
      change: "+8.2%",
      icon: Clock3,
    },
    {
      label: "Pesanan Selesai",
      value: "1,104",
      change: "+14.8%",
      icon: CheckCircle2,
    },
    {
      label: "Pendapatan",
      value: formatCurrency(totalRevenue),
      change: "+18.4%",
      icon: Wallet,
    },
  ];

  const handlePageChange = (page) => {
    setActivePage(page);
    setShowAllOrders(false);
  };

  return (
    <div className="app">

      {/* =========================
          SIDEBAR
      ========================= */}

      <motion.aside
        className="sidebar"
        initial={{
          x: -30,
          opacity: 0,
        }}
        animate={{
          x: 0,
          opacity: 1,
        }}
        transition={{
          duration: 0.45,
          ease: "easeOut",
        }}
      >

        <div className="brand">

          <div className="brand-text">
            <strong>
              OrderFlow
            </strong>

            <span>
              Order Management
            </span>
          </div>

        </div>


        <nav className="navigation">

          <motion.button
            type="button"
            className={`nav-item ${
              activePage === "dashboard"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handlePageChange("dashboard")
            }
            whileTap={{
              scale: 0.97,
            }}
          >
            <LayoutDashboard size={19} />

            <span>
              Dashboard
            </span>

          </motion.button>


          <motion.button
            type="button"
            className={`nav-item ${
              activePage === "orders"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handlePageChange("orders")
            }
            whileTap={{
              scale: 0.97,
            }}
          >
            <ShoppingCart size={19} />

            <span>
              Pesanan
            </span>

          </motion.button>


          <motion.button
            type="button"
            className={`nav-item ${
              activePage === "products"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handlePageChange("products")
            }
            whileTap={{
              scale: 0.97,
            }}
          >
            <Package size={19} />

            <span>
              Produk
            </span>

          </motion.button>


          <motion.button
            type="button"
            className={`nav-item ${
              activePage === "settings"
                ? "active"
                : ""
            }`}
            onClick={() =>
              handlePageChange("settings")
            }
            whileTap={{
              scale: 0.97,
            }}
          >
            <Settings size={19} />

            <span>
              Pengaturan
            </span>

          </motion.button>

        </nav>

      </motion.aside>


      {/* =========================
          MAIN CONTENT
      ========================= */}

      <main className="main-content">


        {/* =========================
            TOPBAR
        ========================= */}

        <motion.header
          className="topbar"
          initial={{
            y: -20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
          transition={{
            duration: 0.4,
            delay: 0.1,
            ease: "easeOut",
          }}
        >

          <div>

            <p className="eyebrow">
              ORDER MANAGEMENT
            </p>

            <h1>
              {activePage === "orders"
                ? "Pesanan"
                : activePage === "products"
                ? "Produk"
                : activePage === "settings"
                ? "Pengaturan"
                : "Dashboard"}
            </h1>

          </div>


          {/* =========================
              PROFILE TOPBAR
          ========================= */}

          <div className="profile">

            <div className="avatar">
              {profile.name
                ? profile.name
                    .charAt(0)
                    .toUpperCase()
                : "A"}
            </div>

            <div className="profile-info">

              <strong>
                {profile.name}
              </strong>

              <span>
                {profile.role}
              </span>

            </div>

          </div>

        </motion.header>


        {/* =========================
            DASHBOARD
        ========================= */}

        {activePage === "dashboard" && (

          <section className="content">

            <motion.div
              className="welcome-card"
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.45,
                delay: 0.2,
                ease: "easeOut",
              }}
            >

              <div>

                <span className="card-label">
                  OVERVIEW
                </span>

                <h2>
                  Selamat datang di OrderFlow
                </h2>

                <p>
                  Kelola pesanan, produk, dan
                  pelanggan dari satu dashboard.
                </p>

              </div>

              <div className="welcome-icon">
                <TrendingUp size={28} />
              </div>

            </motion.div>


            {/* =========================
                STATISTICS
            ========================= */}

            <div className="stats-grid">

              {stats.map((stat, index) => {

                const Icon = stat.icon;

                return (
                  <motion.div
                    className="stat-card"
                    key={stat.label}
                    initial={{
                      y: 20,
                      opacity: 0,
                    }}
                    animate={{
                      y: 0,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.4,
                      delay:
                        0.25 + index * 0.08,
                      ease: "easeOut",
                    }}
                  >

                    <div className="stat-top">

                      <div className="stat-icon">
                        <Icon size={20} />
                      </div>

                      <span className="stat-change">
                        {stat.change}
                      </span>

                    </div>

                    <span className="stat-label">
                      {stat.label}
                    </span>

                    <strong className="stat-value">
                      {stat.value}
                    </strong>

                  </motion.div>
                );
              })}

            </div>


            {/* =========================
                CHARTS
            ========================= */}

            <motion.div
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.45,
                delay: 0.6,
                ease: "easeOut",
              }}
            >

              <DashboardCharts />

            </motion.div>


            {/* =========================
                RECENT ORDERS
            ========================= */}

            <motion.section
              className="orders-section"
              initial={{
                y: 20,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.45,
                delay: 0.7,
                ease: "easeOut",
              }}
            >

              <div className="section-header">

                <div>

                  <span className="card-label">
                    RECENT ORDERS
                  </span>

                  <h2>
                    Pesanan Terbaru
                  </h2>

                </div>

                <motion.button
                  type="button"
                  className="view-all"
                  onClick={() =>
                    setShowAllOrders(
                      (previous) => !previous
                    )
                  }
                  whileTap={{
                    scale: 0.96,
                  }}
                  whileHover={{
                    scale: 1.02,
                  }}
                >

                  {showAllOrders
                    ? "Tampilkan lebih sedikit"
                    : "Lihat semua"}

                </motion.button>

              </div>


              <div className="table-wrapper">

                <table>

                  <thead>

                    <tr>
                      <th>ID Pesanan</th>
                      <th>Pelanggan</th>
                      <th>Produk</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Tanggal</th>
                    </tr>

                  </thead>

                  <tbody>

                    {displayedOrders.map(
                      (order) => (

                        <tr key={order.id}>

                          <td className="order-id">
                            {order.id}
                          </td>

                          <td>
                            {order.customer}
                          </td>

                          <td>
                            {order.product}
                          </td>

                          <td className="order-total">
                            {formatCurrency(
                              order.total
                            )}
                          </td>

                          <td>

                            <span
                              className={`status status-${order.status
                                .toLowerCase()
                                .replace(
                                  /\s+/g,
                                  "-"
                                )}`}
                            >
                              {order.status}
                            </span>

                          </td>

                          <td className="order-date">
                            {order.date}
                          </td>

                        </tr>

                      )
                    )}

                  </tbody>

                </table>

              </div>

            </motion.section>

          </section>

        )}


        {/* =========================
            ORDERS PAGE
        ========================= */}

        {activePage === "orders" && (

          <motion.section
            className="content"
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >

            <OrdersPage />

          </motion.section>

        )}


        {/* =========================
            PRODUCTS PAGE
        ========================= */}

        {activePage === "products" && (

          <motion.section
            className="content"
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >

            <ProductsPage />

          </motion.section>

        )}


        {/* =========================
            SETTINGS PAGE
        ========================= */}

        {activePage === "settings" && (

          <motion.section
            className="content"
            initial={{
              y: 20,
              opacity: 0,
            }}
            animate={{
              y: 0,
              opacity: 1,
            }}
            transition={{
              duration: 0.4,
              ease: "easeOut",
            }}
          >

            <SettingsPage
              profile={profile}
              setProfile={setProfile}
            />

          </motion.section>

        )}

      </main>

    </div>
  );
}

export default App;