import { useEffect, useState } from "react";
import { motion } from "motion/react";

import {
  Settings,
  User,
  Bell,
  X,
  Save,
  Check,
} from "lucide-react";

function SettingsPage({ profile, setProfile }) {
  const [showProfile, setShowProfile] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const [formData, setFormData] = useState(profile);

  const [notifications, setNotifications] = useState({
    orders: true,
    activity: true,
  });

  const [showSaved, setShowSaved] = useState(false);

  useEffect(() => {
    const savedNotifications = localStorage.getItem(
      "orderflow_notifications"
    );

    if (savedNotifications) {
      try {
        const parsedNotifications = JSON.parse(
          savedNotifications
        );

        setNotifications({
          orders:
            parsedNotifications.orders ?? true,
          activity:
            parsedNotifications.activity ?? true,
        });
      } catch {
        setNotifications({
          orders: true,
          activity: true,
        });
      }
    }
  }, []);

  useEffect(() => {
    setFormData(profile);
  }, [profile]);

  const openProfile = () => {
    setFormData(profile);
    setShowProfile(true);
  };

  const closeProfile = () => {
    setShowProfile(false);
    setFormData(profile);
  };

  const openNotifications = () => {
    setShowNotifications(true);
  };

  const closeNotifications = () => {
    setShowNotifications(false);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const showSuccessMessage = () => {
    setShowSaved(true);

    setTimeout(() => {
      setShowSaved(false);
    }, 2000);
  };

  const handleSave = (event) => {
    event.preventDefault();

    setProfile(formData);

    localStorage.setItem(
      "orderflow_profile",
      JSON.stringify(formData)
    );

    setShowProfile(false);

    showSuccessMessage();
  };

  const handleNotificationChange = (type) => {
    setNotifications((current) => {
      const updated = {
        ...current,
        [type]: !current[type],
      };

      localStorage.setItem(
        "orderflow_notifications",
        JSON.stringify(updated)
      );

      return updated;
    });

    showSuccessMessage();
  };

  return (
    <div className="settings-page">

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
            APPLICATION SETTINGS
          </span>

          <h2>
            Pengaturan
          </h2>

          <p>
            Atur preferensi aplikasi
            OrderFlow.
          </p>

        </div>

      </motion.div>


      {/* =========================
          GENERAL SETTINGS
      ========================= */}

      <motion.div
        className="settings-card"
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

        <div className="settings-card-header">

          <div>

            <span className="card-label">
              GENERAL
            </span>

            <h3>
              Pengaturan Umum
            </h3>

          </div>

          <div className="settings-header-icon">
            <Settings size={20} />
          </div>

        </div>


        {/* =========================
            PROFILE
        ========================= */}

        <div
          className="settings-option"
          onClick={openProfile}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();
              openProfile();
            }
          }}
        >

          <div className="settings-option-info">

            <div className="settings-option-icon">
              <User size={20} />
            </div>

            <div>

              <strong>
                Profil Administrator
              </strong>

              <p>
                {profile.name} · {profile.email}
              </p>

            </div>

          </div>

        </div>


        {/* =========================
            NOTIFICATION
        ========================= */}

        <div
          className="settings-option"
          onClick={openNotifications}
          role="button"
          tabIndex={0}
          onKeyDown={(event) => {
            if (
              event.key === "Enter" ||
              event.key === " "
            ) {
              event.preventDefault();
              openNotifications();
            }
          }}
        >

          <div className="settings-option-info">

            <div className="settings-option-icon">
              <Bell size={20} />
            </div>

            <div>

              <strong>
                Notifikasi
              </strong>

              <p>
                Atur pemberitahuan pesanan
                dan aktivitas administrator.
              </p>

            </div>

          </div>

        </div>

      </motion.div>


      {/* =========================
          SAVE MESSAGE
      ========================= */}

      {showSaved && (

        <motion.div
          className="settings-saved"
          initial={{
            opacity: 0,
            y: 10,
          }}
          animate={{
            opacity: 1,
            y: 0,
          }}
        >

          <Check size={16} />

          Pengaturan berhasil disimpan.

        </motion.div>

      )}


      {/* =========================
          PROFILE MODAL
      ========================= */}

      {showProfile && (

        <div
          className="modal-overlay"
          onClick={closeProfile}
        >

          <motion.div
            className="product-modal"
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >

            {/* =========================
                MODAL HEADER
            ========================= */}

            <div className="form-header">

              <div>

                <span className="card-label">
                  ADMINISTRATOR
                </span>

                <h3>
                  Profil Administrator
                </h3>

              </div>

              <button
                type="button"
                className="close-button"
                onClick={closeProfile}
                aria-label="Tutup"
              >

                <X size={18} />

              </button>

            </div>


            {/* =========================
                PROFILE FORM
            ========================= */}

            <form onSubmit={handleSave}>

              <div className="form-grid">

                <div className="form-group">

                  <label htmlFor="admin-name">
                    Nama
                  </label>

                  <input
                    id="admin-name"
                    name="name"
                    type="text"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Masukkan nama"
                    required
                  />

                </div>


                <div className="form-group">

                  <label htmlFor="admin-email">
                    Email
                  </label>

                  <input
                    id="admin-email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Masukkan email"
                    required
                  />

                </div>

              </div>


              {/* =========================
                  FORM ACTIONS
              ========================= */}

              <div className="form-actions">

                <button
                  type="button"
                  className="secondary-button"
                  onClick={closeProfile}
                >
                  Batal
                </button>

                <button
                  type="submit"
                  className="primary-button"
                >

                  <Save size={15} />

                  Simpan

                </button>

              </div>

            </form>

          </motion.div>

        </div>

      )}


      {/* =========================
          NOTIFICATION MODAL
      ========================= */}

      {showNotifications && (

        <div
          className="modal-overlay"
          onClick={closeNotifications}
        >

          <motion.div
            className="product-modal"
            initial={{
              opacity: 0,
              scale: 0.96,
              y: 10,
            }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
            }}
            transition={{
              duration: 0.2,
              ease: "easeOut",
            }}
            onClick={(event) => {
              event.stopPropagation();
            }}
          >

            {/* =========================
                NOTIFICATION HEADER
            ========================= */}

            <div className="form-header">

              <div>

                <span className="card-label">
                  NOTIFICATION SETTINGS
                </span>

                <h3>
                  Pengaturan Notifikasi
                </h3>

              </div>

              <button
                type="button"
                className="close-button"
                onClick={closeNotifications}
                aria-label="Tutup"
              >

                <X size={18} />

              </button>

            </div>


            {/* =========================
                NOTIFICATION CONTROLS
            ========================= */}

            <div className="notification-settings">

              {/* NOTIFICATION ORDERS */}

              <div className="notification-row">

                <div>

                  <strong>
                    Notifikasi Pesanan
                  </strong>

                  <p>
                    Tampilkan pemberitahuan
                    ketika ada pesanan baru.
                  </p>

                </div>

                <button
                  type="button"
                  className={`toggle ${
                    notifications.orders
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleNotificationChange(
                      "orders"
                    )
                  }
                  aria-label="Notifikasi pesanan"
                  aria-pressed={
                    notifications.orders
                  }
                >

                  <span className="toggle-circle" />

                </button>

              </div>


              {/* NOTIFICATION ACTIVITY */}

              <div className="notification-row">

                <div>

                  <strong>
                    Notifikasi Aktivitas
                  </strong>

                  <p>
                    Tampilkan pemberitahuan
                    aktivitas administrator.
                  </p>

                </div>

                <button
                  type="button"
                  className={`toggle ${
                    notifications.activity
                      ? "active"
                      : ""
                  }`}
                  onClick={() =>
                    handleNotificationChange(
                      "activity"
                    )
                  }
                  aria-label="Notifikasi aktivitas"
                  aria-pressed={
                    notifications.activity
                  }
                >

                  <span className="toggle-circle" />

                </button>

              </div>

            </div>


            {/* =========================
                NOTIFICATION ACTION
            ========================= */}

            <div className="form-actions">

              <button
                type="button"
                className="primary-button"
                onClick={closeNotifications}
              >
                Selesai
              </button>

            </div>

          </motion.div>

        </div>

      )}

    </div>
  );
}

export default SettingsPage;