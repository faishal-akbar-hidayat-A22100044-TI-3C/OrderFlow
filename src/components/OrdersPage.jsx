import { useMemo, useState } from "react";
import { motion } from "motion/react";

import {
  Search,
  X,
  ShoppingCart,
  ListFilter,
  Clock3,
  LoaderCircle,
  Truck,
  CheckCircle2,
  ChevronDown,
} from "lucide-react";

import { orders } from "../data/orders";

function OrdersPage() {
  const [searchQuery, setSearchQuery] =
    useState("");

  const [statusFilter, setStatusFilter] =
    useState("Semua");

  const [showStatusMenu, setShowStatusMenu] =
    useState(false);

  // =========================
  // FORMAT CURRENCY
  // =========================

  const formatCurrency = (value) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  // =========================
  // STATUS CONFIG
  // =========================

  const statusOptions = [
    {
      value: "Semua",
      label: "Semua Status",
      icon: ListFilter,
    },
    {
      value: "Menunggu",
      label: "Menunggu",
      icon: Clock3,
    },
    {
      value: "Diproses",
      label: "Diproses",
      icon: LoaderCircle,
    },
    {
      value: "Dikirim",
      label: "Dikirim",
      icon: Truck,
    },
    {
      value: "Selesai",
      label: "Selesai",
      icon: CheckCircle2,
    },
  ];

  const selectedStatus = statusOptions.find(
    (status) => status.value === statusFilter
  );

  const SelectedStatusIcon =
    selectedStatus?.icon || ListFilter;

  // =========================
  // FILTER PESANAN
  // =========================

  const filteredOrders = useMemo(() => {
    const query = searchQuery
      .toLowerCase()
      .trim();

    return orders.filter((order) => {
      const matchesSearch =
        !query ||
        [
          order.id,
          order.customer,
          order.email,
          order.phone,
          order.product,
          order.status,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      const matchesStatus =
        statusFilter === "Semua" ||
        order.status === statusFilter;

      return (
        matchesSearch &&
        matchesStatus
      );
    });
  }, [searchQuery, statusFilter]);

  // =========================
  // PILIH STATUS
  // =========================

  const handleStatusChange = (status) => {
    setStatusFilter(status);
    setShowStatusMenu(false);
  };

  // =========================
  // RENDER
  // =========================

  return (
    <div className="orders-page">

      {/* =========================
          HEADER
      ========================= */}

      <motion.div
        className="page-header"
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
        <div>
          <span className="card-label">
            ORDER MANAGEMENT
          </span>

          <h2>Pesanan</h2>

          <p>
            Daftar pesanan pelanggan.
          </p>
        </div>

        <div className="product-summary">
          <ShoppingCart size={20} />

          <span>
            {orders.length} Pesanan
          </span>
        </div>
      </motion.div>

      {/* =========================
          TOOLBAR
      ========================= */}

      <motion.div
        className="product-toolbar"
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
          delay: 0.1,
          ease: "easeOut",
        }}
      >

        {/* SEARCH */}

        <div className="search-box">
          <Search size={18} />

          <input
            type="text"
            placeholder="Cari pesanan..."
            value={searchQuery}
            onChange={(event) =>
              setSearchQuery(
                event.target.value
              )
            }
          />

          {searchQuery && (
            <button
              type="button"
              className="search-clear"
              onClick={() =>
                setSearchQuery("")
              }
              title="Hapus pencarian"
            >
              <X size={16} />
            </button>
          )}
        </div>

        {/* =========================
            STATUS FILTER
        ========================= */}

        <div className="status-filter-wrapper">

          <button
            type="button"
            className="status-filter-button"
            onClick={() =>
              setShowStatusMenu(
                (previous) => !previous
              )
            }
          >
            <SelectedStatusIcon size={17} />

            <span>
              {selectedStatus?.label}
            </span>

            <ChevronDown
              size={16}
              className={
                showStatusMenu
                  ? "rotate"
                  : ""
              }
            />
          </button>

          {showStatusMenu && (
            <motion.div
              className="status-filter-menu"
              initial={{
                y: -5,
                opacity: 0,
              }}
              animate={{
                y: 0,
                opacity: 1,
              }}
              transition={{
                duration: 0.15,
              }}
            >

              {statusOptions.map(
                (status) => {
                  const StatusIcon =
                    status.icon;

                  return (
                    <button
                      type="button"
                      key={status.value}
                      className={`status-filter-option ${
                        statusFilter ===
                        status.value
                          ? "active"
                          : ""
                      }`}
                      onClick={() =>
                        handleStatusChange(
                          status.value
                        )
                      }
                    >
                      <StatusIcon
                        size={17}
                      />

                      <span>
                        {status.label}
                      </span>
                    </button>
                  );
                }
              )}

            </motion.div>
          )}

        </div>

      </motion.div>

      {/* =========================
          DATA KOSONG
      ========================= */}

      {filteredOrders.length === 0 ? (

        <motion.div
          className="empty-state"
          initial={{
            y: 20,
            opacity: 0,
          }}
          animate={{
            y: 0,
            opacity: 1,
          }}
        >
          <Search size={42} />

          <h3>
            Pesanan tidak ditemukan
          </h3>

          <p>
            Tidak ada pesanan yang
            cocok dengan pencarian
            atau filter.
          </p>
        </motion.div>

      ) : (

        /* =========================
           ORDER TABLE
        ========================= */

        <motion.div
          className="products-table-wrapper"
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
            delay: 0.2,
            ease: "easeOut",
          }}
        >

          <table className="products-table">

            <thead>
              <tr>
                <th>ID Pesanan</th>
                <th>Pelanggan</th>
                <th>Email</th>
                <th>No. HP</th>
                <th>Produk</th>
                <th>Total</th>
                <th>Status</th>
                <th>Tanggal</th>
              </tr>
            </thead>

            <tbody>

              {filteredOrders.map(
                (order) => (
                  <tr key={order.id}>

                    {/* ID */}

                    <td className="order-id">
                      {order.id}
                    </td>

                    {/* PELANGGAN */}

                    <td>
                      {order.customer}
                    </td>

                    {/* EMAIL */}

                    <td>
                      {order.email || "-"}
                    </td>

                    {/* NO HP */}

                    <td>
                      {order.phone || "-"}
                    </td>

                    {/* PRODUK */}

                    <td>
                      {order.product}
                    </td>

                    {/* TOTAL */}

                    <td className="order-total">
                      {formatCurrency(
                        order.total
                      )}
                    </td>

                    {/* STATUS */}

                    <td>
                      <span
                        className={`status status-${order.status
                          .toLowerCase()
                          .replace(
                            /\s+/g,
                            "-"
                          )}`}
                      >

                        {order.status ===
                          "Menunggu" && (
                          <Clock3
                            size={15}
                          />
                        )}

                        {order.status ===
                          "Diproses" && (
                          <LoaderCircle
                            size={15}
                          />
                        )}

                        {order.status ===
                          "Dikirim" && (
                          <Truck
                            size={15}
                          />
                        )}

                        {order.status ===
                          "Selesai" && (
                          <CheckCircle2
                            size={15}
                          />
                        )}

                        <span>
                          {order.status}
                        </span>

                      </span>
                    </td>

                    {/* TANGGAL */}

                    <td className="order-date">
                      {order.date}
                    </td>

                  </tr>
                )
              )}

            </tbody>

          </table>

        </motion.div>
      )}
    </div>
  );
}

export default OrdersPage;