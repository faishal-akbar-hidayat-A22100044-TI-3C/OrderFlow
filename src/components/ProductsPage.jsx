import { useEffect, useMemo, useState } from "react";
import { motion, AnimatePresence } from "motion/react";

import {
  PackagePlus,
  Search,
  X,
  Pencil,
  Trash2,
  AlertTriangle,
} from "lucide-react";

import { orders } from "../data/orders";

// =========================
// BUAT PRODUK AWAL DARI ORDERS
// =========================

const createInitialProducts = () => {
  const productMap = new Map();

  orders.forEach((order) => {
    if (!order.product) {
      return;
    }

    if (!productMap.has(order.product)) {
      productMap.set(order.product, {
        id: `order-product-${order.product}`,
        name: order.product,
        category: "Elektronik",
        price: order.total,
        stock: 10,
      });
    }
  });

  return Array.from(productMap.values());
};

// =========================
// BACA PRODUK DARI LOCAL STORAGE
// =========================

const getInitialProducts = () => {
  try {
    const savedProducts = localStorage.getItem(
      "orderflow-products"
    );

    if (savedProducts) {
      const parsedProducts = JSON.parse(
        savedProducts
      );

      if (
        Array.isArray(parsedProducts) &&
        parsedProducts.length > 0
      ) {
        return parsedProducts;
      }
    }

    return createInitialProducts();
  } catch (error) {
    console.error(
      "Gagal membaca data produk:",
      error
    );

    return createInitialProducts();
  }
};

function ProductsPage() {
  const [products, setProducts] = useState(
    getInitialProducts
  );

  const [searchQuery, setSearchQuery] = useState("");

  const [showForm, setShowForm] = useState(false);

  const [editingProductId, setEditingProductId] =
    useState(null);

  const [deleteProduct, setDeleteProduct] =
    useState(null);

  const [productForm, setProductForm] = useState({
    name: "",
    category: "",
    price: "",
    stock: "",
  });

  // =========================
  // SIMPAN PRODUK
  // =========================

  useEffect(() => {
    try {
      localStorage.setItem(
        "orderflow-products",
        JSON.stringify(products)
      );
    } catch (error) {
      console.error(
        "Gagal menyimpan data produk:",
        error
      );
    }
  }, [products]);

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
  // FORM CHANGE
  // =========================

  const handleChange = (event) => {
    const { name, value } = event.target;

    setProductForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  // =========================
  // RESET FORM
  // =========================

  const resetForm = () => {
    setProductForm({
      name: "",
      category: "",
      price: "",
      stock: "",
    });

    setEditingProductId(null);
    setShowForm(false);
  };

  // =========================
  // TAMBAH PRODUK
  // =========================

  const handleAddProduct = () => {
    setSearchQuery("");

    setEditingProductId(null);

    setProductForm({
      name: "",
      category: "",
      price: "",
      stock: "",
    });

    setShowForm(true);
  };

  // =========================
  // SIMPAN / EDIT PRODUK
  // =========================

  const handleSubmit = (event) => {
    event.preventDefault();

    const name = productForm.name.trim();
    const category = productForm.category.trim();
    const price = Number(productForm.price);
    const stock = Number(productForm.stock);

    if (!name || !category) {
      return;
    }

    if (editingProductId !== null) {
      // EDIT PRODUK

      setProducts((previous) =>
        previous.map((product) =>
          product.id === editingProductId
            ? {
                ...product,
                name,
                category,
                price,
                stock,
              }
            : product
        )
      );
    } else {
      // CEK NAMA PRODUK DUPLIKAT

      const duplicateProduct = products.some(
        (product) =>
          product.name.toLowerCase() ===
          name.toLowerCase()
      );

      if (duplicateProduct) {
        window.alert(
          "Produk dengan nama tersebut sudah ada."
        );

        return;
      }

      // TAMBAH PRODUK BARU

      const newProduct = {
        id: `product-${Date.now()}`,
        name,
        category,
        price,
        stock,
      };

      setProducts((previous) => [
        ...previous,
        newProduct,
      ]);
    }

    setSearchQuery("");

    resetForm();
  };

  // =========================
  // EDIT PRODUK
  // =========================

  const handleEdit = (product) => {
    setSearchQuery("");

    setEditingProductId(product.id);

    setProductForm({
      name: product.name,
      category: product.category,
      price: String(product.price),
      stock: String(product.stock),
    });

    setShowForm(true);
  };

  // =========================
  // BUKA KONFIRMASI HAPUS
  // =========================

  const handleDelete = (id) => {
    const product = products.find(
      (item) => item.id === id
    );

    if (!product) {
      return;
    }

    setDeleteProduct(product);
  };

  // =========================
  // KONFIRMASI HAPUS
  // =========================

  const confirmDelete = () => {
    if (!deleteProduct) {
      return;
    }

    const id = deleteProduct.id;

    setProducts((previous) =>
      previous.filter(
        (item) => item.id !== id
      )
    );

    setSearchQuery("");

    if (editingProductId === id) {
      resetForm();
    }

    setDeleteProduct(null);
  };

  // =========================
  // SEARCH
  // =========================

  const filteredProducts = useMemo(() => {
    const query = searchQuery
      .toLowerCase()
      .trim();

    if (!query) {
      return products;
    }

    return products.filter((product) => {
      return (
        product.name
          .toLowerCase()
          .includes(query) ||
        product.category
          .toLowerCase()
          .includes(query)
      );
    });
  }, [products, searchQuery]);

  // =========================
  // RENDER
  // =========================

  return (
    <div className="products-page">

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
            PRODUCT MANAGEMENT
          </span>

          <h2>Produk</h2>

          <p>
            Kelola seluruh produk yang tersedia.
          </p>
        </div>

        <motion.button
          type="button"
          className="primary-button"
          onClick={handleAddProduct}
          whileTap={{
            scale: 0.96,
          }}
          whileHover={{
            scale: 1.02,
          }}
        >
          <PackagePlus size={18} />

          <span>Tambah Produk</span>
        </motion.button>
      </motion.div>

      {/* =========================
          FORM MODAL
      ========================= */}

      <AnimatePresence>
        {showForm && (
          <motion.div
            className="modal-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <motion.div
              className="product-form-card product-modal"
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="form-header">
                <div>
                  <span className="card-label">
                    {editingProductId !== null
                      ? "EDIT PRODUCT"
                      : "NEW PRODUCT"}
                  </span>

                  <h3>
                    {editingProductId !== null
                      ? "Edit Produk"
                      : "Tambah Produk"}
                  </h3>
                </div>

                <button
                  type="button"
                  className="close-button"
                  onClick={resetForm}
                  aria-label="Tutup"
                >
                  <X size={20} />
                </button>
              </div>

              <form onSubmit={handleSubmit}>

                <div className="form-grid">

                  {/* NAMA PRODUK */}

                  <div className="form-group">
                    <label htmlFor="name">
                      Nama Produk
                    </label>

                    <input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Contoh: Laptop ASUS Vivobook"
                      value={productForm.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* KATEGORI */}

                  <div className="form-group">
                    <label htmlFor="category">
                      Kategori
                    </label>

                    <input
                      id="category"
                      name="category"
                      type="text"
                      placeholder="Contoh: Elektronik"
                      value={productForm.category}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* HARGA */}

                  <div className="form-group">
                    <label htmlFor="price">
                      Harga
                    </label>

                    <input
                      id="price"
                      name="price"
                      type="number"
                      placeholder="Contoh: 12500000"
                      min="0"
                      value={productForm.price}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  {/* STOK */}

                  <div className="form-group">
                    <label htmlFor="stock">
                      Stok
                    </label>

                    <input
                      id="stock"
                      name="stock"
                      type="number"
                      placeholder="Contoh: 10"
                      min="0"
                      value={productForm.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>

                </div>

                <div className="form-actions">

                  <motion.button
                    type="button"
                    className="secondary-button"
                    onClick={resetForm}
                    whileTap={{
                      scale: 0.96,
                    }}
                  >
                    Batal
                  </motion.button>

                  <motion.button
                    type="submit"
                    className="primary-button"
                    whileTap={{
                      scale: 0.96,
                    }}
                  >
                    {editingProductId !== null
                      ? "Simpan Perubahan"
                      : "Simpan Produk"}
                  </motion.button>

                </div>

              </form>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =========================
          DELETE CONFIRMATION MODAL
      ========================= */}

      <AnimatePresence>
        {deleteProduct && (
          <motion.div
            className="modal-overlay"
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: 1,
            }}
            exit={{
              opacity: 0,
            }}
          >
            <motion.div
              className="delete-modal"
              initial={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              animate={{
                opacity: 1,
                scale: 1,
                y: 0,
              }}
              exit={{
                opacity: 0,
                scale: 0.95,
                y: 20,
              }}
              transition={{
                duration: 0.2,
                ease: "easeOut",
              }}
              onClick={(event) =>
                event.stopPropagation()
              }
            >

              <div className="delete-modal-icon">
                <AlertTriangle size={24} />
              </div>

              <div className="delete-modal-content">

                <h3>
                  Hapus Produk?
                </h3>

                <p>
                  Apakah kamu yakin ingin
                  menghapus produk{" "}
                  <strong>
                    "{deleteProduct.name}"
                  </strong>
                  ?
                </p>

              </div>

              <div className="delete-modal-actions">

                <motion.button
                  type="button"
                  className="secondary-button"
                  onClick={() =>
                    setDeleteProduct(null)
                  }
                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  Batal
                </motion.button>

                <motion.button
                  type="button"
                  className="delete-confirm-button"
                  onClick={confirmDelete}
                  whileTap={{
                    scale: 0.96,
                  }}
                >
                  <Trash2 size={17} />
                  Hapus Produk
                </motion.button>

              </div>

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

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
        <div className="search-box">

          <Search size={18} />

          <input
            type="text"
            placeholder="Cari produk..."
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
      </motion.div>

      {/* =========================
          PRODUK KOSONG
      ========================= */}

      {products.length === 0 ? (

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
          <PackagePlus size={42} />

          <h3>
            Belum ada produk
          </h3>

          <p>
            Tambahkan produk menggunakan
            tombol Tambah Produk.
          </p>
        </motion.div>

      ) : filteredProducts.length === 0 ? (

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
            Produk tidak ditemukan
          </h3>

          <p>
            Tidak ada produk yang cocok
            dengan pencarian "{searchQuery}".
          </p>
        </motion.div>

      ) : (

        /* =========================
           PRODUCT TABLE
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
                <th>Produk</th>
                <th>Kategori</th>
                <th>Harga</th>
                <th>Stok</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>

              {filteredProducts.map(
                (product) => (
                  <tr key={product.id}>

                    <td className="product-name">
                      {product.name}
                    </td>

                    <td>
                      {product.category}
                    </td>

                    <td>
                      {formatCurrency(
                        product.price
                      )}
                    </td>

                    <td>
                      {product.stock}
                    </td>

                    <td>
                      <div className="product-actions">

                        <motion.button
                          type="button"
                          className="icon-button"
                          onClick={() =>
                            handleEdit(product)
                          }
                          whileTap={{
                            scale: 0.9,
                          }}
                          title="Edit produk"
                        >
                          <Pencil size={17} />
                        </motion.button>

                        <motion.button
                          type="button"
                          className="icon-button delete"
                          onClick={() =>
                            handleDelete(
                              product.id
                            )
                          }
                          whileTap={{
                            scale: 0.9,
                          }}
                          title="Hapus produk"
                        >
                          <Trash2 size={17} />
                        </motion.button>

                      </div>
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

export default ProductsPage;