const { success, failed } = require("../helpers/response");
const { v4: uuidv4 } = require("uuid");
const userModel = require("../models/users.model");
const bcrypt = require("bcrypt");

module.exports = {
  getAllUsers: async (req, res) => {
    try {
      userModel
        .getAll()
        .then((result) => {
          success(res, result, "success", "Berhasil Mendapatkan Data Users");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Data Users");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan Data Users");
    }
  },

  getUserDetail: async (req, res) => {
    try {
      const id = req.params.id;
      userModel
        .getById(id)
        .then((result) => {
          success(res, result, "success", "Berhasil Mendapatkan Detail User");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mendapatkan Detail User");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mendapatkan Detail User");
    }
  },

  addUser: async (req, res) => {
    try {
      const { home_id, pass, username, email, role, token } = req.body;
      const id = uuidv4();

      userModel
        .create({ id, home_id, pass, username, email, role, token })
        .then((result) => {
          success(
            res,
            { ...result, id },
            "success",
            "Berhasil Menambahkan User"
          );
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menambahkan User");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menambahkan User");
    }
  },

  updateUser: async (req, res) => {
    try {
      const { id, home_id, pass, username, email, role, token } = req.body;

      userModel
        .update({ id, home_id, pass, username, email, role, token })
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Mengubah User");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Mengubah User");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Mengubah User");
    }
  },

  deleteUser: async (req, res) => {
    try {
      const id = req.params.id;

      userModel
        .delete(id)
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Menghapus User");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Menghapus User");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Menghapus User");
    }
  },
  bindingHome: async (req, res) => {
    try {
      const id = req.params.id;
      const { home_id } = req.body;

      userModel
        .binding({ id, home_id })
        .then((result) => {
          success(res, { ...result, id }, "success", "Berhasil Binding User");
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Binding User");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Binding User");
    }
  },
  login: async (req, res) => {
    try {
      const body = req.body;
      const { email, password } = body;
      userModel
        .getDataEmail(email)
        .then((result) => {
          if (result.length === 0) {
            throw new Error("Email atau Kata Sandi Salah");
          }
          // else if (result[0].token.toString().length === 6) {
          //   throw new Error(
          //     "Akun anda belum aktif silahkan aktifkan akun anda"
          //   );
        // } 
          else {
            bcrypt.compare(password, result[0].password).then(async (match) => {
              if (match) {
                const {
                  nama,
                  email,
                  password,
                  role,
                  dibuat,
                  diupdate,
                  id,
                  jenis_kelamin,
                  agama,
                  tanggal_lahir,
                  alamat,
                  token,
                  ktp,
                  no_hp,
                } = result[0];
                const tokenData = {
                  nama,
                  email,
                  password,
                  role,
                  dibuat,
                  diupdate,
                  id,
                  jenisKelamin: jenis_kelamin,
                  agama,
                  tanggalLahir: tanggal_lahir,
                  alamat,
                  token,
                  ktp,
                  noHp: no_hp,
                };
                // const token = await jwtToken(tokenData);
                success(res, tokenData, "success", "Berhasil Masuk");
              } else {
                failed(
                  res,
                  "Email atau Kata Sandi Salah",
                  "failed",
                  "Gagal Masuk"
                );
              }
            });
          }
        })
        .catch((err) => {
          failed(res, err.message, "failed", "Gagal Masuk");
        });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Masuk");
    }
  },
  register: async (req, res) => {
    try {
      const { home_id, pass, username, email, role, token } = req.body;

      const getEmail = await userModel.getDataEmail(email);
      if (getEmail.length !== 0) {
        throw new Error("Email Telah Digunakan!");
      }
      bcrypt.hash(pass, 10, async (err, hash) => {
        if (err) {
          failed(res, err.message, "failed", "Gagal Hash Kata Sandi"); // tampilan jika err
        }

        const id = uuidv4();

        if (send) {
          userModel
            .create({
              id,
              home_id,
              username,
              email,
              password: hash,
              role,
            })
            .then((result) => {
              success(res, { ...result, id }, "success", "Berhasil Mendaftar");
            })
            .catch((err) => {
              failed(res, err.message, "failed", "Gagal Mendaftar");
            });
        } else {
          console.log(send);

          failed(res, "Gagal Kirim Email", "failed", "Gagal Mendaftar");
        }
      });
    } catch (err) {
      failed(res, err.message, "failed", "Gagal Memasukan Data");
    }
  },
};
