


## LAPORAN API
  <h1>Welcome to Laporan</h1>

## 🔮 Features
    - REST API
    - SWAGGER

 
 
 ## 🧰 Installation
Follow these steps to install and set up the KosKita API:
1. **Clone the repository:**

   ```bash
   git clone https://github.com/IrsanJam/Laporan.git
   
2. **Move to Cloned Repository Folder**

    ```bash
    cd LAPORAN
    
3. **Update dependecies**
    
    ```bash
    npm install

4. **Import Database laporan, location file in root**
    
    ```bash
    laporan.sql

    using mysql and check connection

5. **Run Laporan**  
    ```bash
    npm run start: dev

## Akses
- **Base URL Untuk Rest API** - localhost:3000
- **Base URL Untuk Swagger** - localhost:3000/api-docs
  
## Detail API
# Marketing
- **GET: /marketing** - mendapatkan semua data marketing
- **GET: /marketing/{id}** - mendapatkan satu marketing
- **POST: /marketing** - menyimpan data marketing baru
- **PATCH: /marketing/{id}** - mengupdate satu data marketing
- **DELETE: /marketing/{id}** - menghapus satu data marketing

# Penjualan
- **GET: /penjualan** - mendapatkan semua data penjualan
- **GET: /penjualan/{id}** - mendapatkan satu penjualan
- **POST: /penjualan** - menyimpan data penjualan baru
- **PATCH: /penjualan/{id}** - mengupdate satu data penjualan
- **DELETE: /penjualan/{id}** - menghapus satu data penjualan


# Omset
- **GET: /omset** - mendapatkan semua data omset data ini berasal dari join table marketing dan penjualan untuk        mendapatkan komisi

# Pembayaran
- **GET: /pembayaran** - mendapatkan semua data pembayaran data ini berasal dari referensi table penjualan
- **GET: /pembayaran/{id}** - mendapatkan satu pembayaran
- **POST: /pembayaran** - menyimpan data pembayaran baru, dan akan menyimpan data balance, sehingga jika pembayaran sesuai akan menampilkan lunas / tidak

