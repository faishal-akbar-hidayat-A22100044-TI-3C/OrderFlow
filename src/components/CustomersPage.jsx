import { useState } from "react";
import { motion } from "motion/react";
import {
  UserPlus,
  Search,
  X,
  Pencil,
  Trash2,
  Mail,
  Phone,
} from "lucide-react";

function CustomersPage() {
  const [showForm, setShowForm] = useState(false);

  const [customers, setCustomers] = useState([]);

  const [editingCustomerId, setEditingCustomerId] =
    useState(null);

  const [searchTerm, setSearchTerm] = useState("");

  const [customerForm, setCustomerForm] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setCustomerForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const resetForm = () => {
    setCustomerForm({
      name: "",
      email: "",
      phone: "",
    });

    setEditingCustomerId(null);
    setShowForm(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (editingCustomerId !== null) {
      setCustomers((previous) =>
        previous.map((customer) =>
          customer.id === editingCustomerId
            ? {
                ...customer,
                name: customerForm.name,
                email: customerForm.email,
                phone: customerForm.phone,
              }
            : customer
        )
      );
    } else {
      const newCustomer = {
        id: Date.now(),
        name: customerForm.name,
        email: customerForm.email,
        phone: customerForm.phone,
      };

      setCustomers((previous) => [
        ...previous,
        newCustomer,
      ]);
    }

    resetForm();
  };

  const handleEdit = (customer) => {
    setEditingCustomerId(customer.id);

    setCustomerForm({
      name: customer.name,
      email: customer.email,
      phone: customer.phone,
    });

    setShowForm(true);
  };

  const handleDelete = (id) => {
    setCustomers((previous) =>
      previous.filter((customer) => customer.id !== id)
    );
  };

  const filteredCustomers = customers.filter((customer) => {
    const search = searchTerm.toLowerCase();

    return (
      customer.name.toLowerCase().includes(search) ||
      customer.email.toLowerCase().includes(search) ||
      customer.phone.toLowerCase().includes(search)
    );
  });

  return (
    <div className="customers-page">
      {/* HEADER */}

      <motion.div
        className="page-header"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        <div>
          <span className="card-label">
            CUSTOMER MANAGEMENT
          </span>

          <h2>Pelanggan</h2>

          <p>
            Kelola data pelanggan yang terdaftar.
          </p>
        </div>

        <motion.button
          type="button"
          className="primary-button"
          onClick={() => {
            setEditingCustomerId(null);

            setCustomerForm({
              name: "",
              email: "",
              phone: "",
            });

            setShowForm(true);
          }}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
        >
          <UserPlus size={18} />

          <span>Tambah Pelanggan</span>
        </motion.button>
      </motion.div>

      {/* FORM */}

      {showForm && (
        <motion.div
          className="customer-form-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.3,
            ease: "easeOut",
          }}
        >
          <div className="form-header">
            <div>
              <span className="card-label">
                {editingCustomerId !== null
                  ? "EDIT CUSTOMER"
                  : "NEW CUSTOMER"}
              </span>

              <h3>
                {editingCustomerId !== null
                  ? "Edit Pelanggan"
                  : "Tambah Pelanggan"}
              </h3>
            </div>

            <button
              type="button"
              className="close-button"
              onClick={resetForm}
            >
              <X size={20} />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-grid">
              <div className="form-group">
                <label htmlFor="customer-name">
                  Nama Pelanggan
                </label>

                <input
                  id="customer-name"
                  name="name"
                  type="text"
                  placeholder="Contoh: Budi Santoso"
                  value={customerForm.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="customer-email">
                  Email
                </label>

                <input
                  id="customer-email"
                  name="email"
                  type="email"
                  placeholder="Contoh: budi@email.com"
                  value={customerForm.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="customer-phone">
                  Nomor Telepon
                </label>

                <input
                  id="customer-phone"
                  name="phone"
                  type="tel"
                  placeholder="Contoh: 08123456789"
                  value={customerForm.phone}
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
                whileTap={{ scale: 0.96 }}
              >
                Batal
              </motion.button>

              <motion.button
                type="submit"
                className="primary-button"
                whileTap={{ scale: 0.96 }}
              >
                {editingCustomerId !== null
                  ? "Simpan Perubahan"
                  : "Simpan Pelanggan"}
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      {/* SEARCH */}

      <motion.div
        className="customer-toolbar"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
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
            placeholder="Cari pelanggan..."
            value={searchTerm}
            onChange={(event) =>
              setSearchTerm(event.target.value)
            }
          />
        </div>
      </motion.div>

      {/* LIST */}

      {filteredCustomers.length === 0 ? (
        <motion.div
          className="empty-state"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.4,
            delay: 0.2,
            ease: "easeOut",
          }}
        >
          <UserPlus size={42} />

          <h3>
            {searchTerm
              ? "Pelanggan tidak ditemukan"
              : "Belum ada pelanggan"}
          </h3>

          <p>
            {searchTerm
              ? "Coba gunakan kata kunci pencarian lain."
              : "Pelanggan yang kamu tambahkan akan muncul di sini."}
          </p>
        </motion.div>
      ) : (
        <motion.div
          className="customers-table-wrapper"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{
            duration: 0.4,
            ease: "easeOut",
          }}
        >
          <table className="customers-table">
            <thead>
              <tr>
                <th>Pelanggan</th>
                <th>Email</th>
                <th>Telepon</th>
                <th>Aksi</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-name-cell">
                      <div className="customer-avatar">
                        {customer.name
                          .charAt(0)
                          .toUpperCase()}
                      </div>

                      <strong>
                        {customer.name}
                      </strong>
                    </div>
                  </td>

                  <td>
                    <div className="customer-contact">
                      <Mail size={14} />
                      <span>{customer.email}</span>
                    </div>
                  </td>

                  <td>
                    <div className="customer-contact">
                      <Phone size={14} />
                      <span>{customer.phone}</span>
                    </div>
                  </td>

                  <td>
                    <div className="customer-actions">
                      <motion.button
                        type="button"
                        className="icon-button"
                        onClick={() =>
                          handleEdit(customer)
                        }
                        whileTap={{ scale: 0.9 }}
                        title="Edit pelanggan"
                      >
                        <Pencil size={17} />
                      </motion.button>

                      <motion.button
                        type="button"
                        className="icon-button delete"
                        onClick={() =>
                          handleDelete(customer.id)
                        }
                        whileTap={{ scale: 0.9 }}
                        title="Hapus pelanggan"
                      >
                        <Trash2 size={17} />
                      </motion.button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      )}
    </div>
  );
}

export default CustomersPage;